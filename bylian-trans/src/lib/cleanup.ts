import { db } from "./prisma";

/**
 * Cleanup function to release expired bookings and their seats
 */
export async function cleanupExpiredBookings() {
  const now = new Date();

  try {
    const result = await db.$transaction(async (tx) => {
      // 1. Find expired pending bookings
      const expiredBookings = await tx.booking.findMany({
        where: {
          status: "PENDING",
          expiresAt: { lt: now }
        },
        include: {
          passengers: {
            include: {
              seat: true
            }
          }
        }
      });

      if (expiredBookings.length === 0) return { count: 0 };

      const bookingIds = expiredBookings.map(b => b.id);
      const seatIds = expiredBookings.flatMap(b => b.passengers.map(p => p.seatId));

      // 2. Update Booking Status to EXPIRED
      await tx.booking.updateMany({
        where: { id: { in: bookingIds } },
        data: { status: "EXPIRED" }
      });

      // 3. Update Seat Status back to AVAILABLE
      await tx.seat.updateMany({
        where: { id: { in: seatIds } },
        data: { status: "AVAILABLE" }
      });

      // 4. Create Audit Logs for each expiration
      for (const booking of expiredBookings) {
        await tx.bookingStatusLog.create({
          data: {
            bookingId: booking.id,
            status: "EXPIRED",
            reason: "Auto-expired due to payment timeout",
            changedBy: "SYSTEM_CLEANUP"
          }
        });
      }

      return { count: expiredBookings.length };
    });

    if (result.count > 0) {
      console.log(`[Cleanup] Expired ${result.count} bookings.`);
    }
    return result;
  } catch (error: any) {
    console.error("Cleanup Error:", error.message);
    return { error: error.message };
  }
}
