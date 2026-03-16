import { db } from "@/lib/prisma";
import { auth } from "@/auth";
import { validatePromoCode } from "@/lib/pricing";
import { calculateAdvancedSurgePrice } from "@/lib/algorithms";

interface PassengerInput {
  name: string;
  idNumber: string;
  gender: "MALE" | "FEMALE";
  birthDate: string;
  seatNumber: string;
}

interface CreateBookingInput {
  scheduleId: string;
  passengers: PassengerInput[];
  customerEmail: string;
  customerPhone: string;
  promoCode?: string;
  specialNotes?: string;
}

export const createBooking = async (input: CreateBookingInput) => {
  const session = await auth();
  const userId = session?.user?.id;

  const { scheduleId, passengers, customerEmail, customerPhone, promoCode, specialNotes } = input;

  try {
    const result = await db.$transaction(async (tx: any) => {
      // 1. Get schedule and check existence
      const schedule = await tx.busSchedule.findUnique({
        where: { id: scheduleId },
        include: { route: true }
      });

      if (!schedule) throw new Error("Jadwal tidak ditemukan!");

      // 1b. Late Booking Prevention (Task 17)
      const now = new Date();
      const departureTime = new Date(schedule.departureTime);
      const diffMs = departureTime.getTime() - now.getTime();
      const diffMins = Math.round(diffMs / 60000);

      if (diffMins < 30) {
        throw new Error("Pemesanan sudah ditutup untuk jadwal ini (batas 30 menit sebelum keberangkatan).");
      }

      // 1c. Multi-Passenger Validation (Task 14)
      if (!passengers || passengers.length === 0) {
        throw new Error("Minimal harus ada 1 penumpang.");
      }

      // 2. Prevent booking if seats are taken
      const seatNumbers = passengers.map(p => p.seatNumber);
      
      const takenSeats = await tx.seat.findMany({
        where: {
          scheduleId,
          seatNumber: { in: seatNumbers },
          status: { not: "AVAILABLE" }
        }
      });

      if (takenSeats.length > 0) {
        throw new Error(`Kursi ${takenSeats.map((s: any) => s.seatNumber).join(", ")} sudah dipesan atau dikunci.`);
      }

      // 3. Dynamic Pricing Logic (Task 15 / Advanced Task 51)
      const occupancyRate = schedule.bookedSeats / (schedule.totalSeats || 40);
      const { finalPrice: unitPrice, breakdown } = await calculateAdvancedSurgePrice(
        schedule.price, 
        departureTime, 
        occupancyRate, 
        schedule.routeId
      );
      const subtotal = unitPrice * passengers.length;
      
      if (breakdown.length > 0) {
        console.log(`[Pricing] Applied multipliers for schedule ${scheduleId}: ${breakdown.join(", ")}`);
      }
      
      // 3b. Promo Code logic (Task 16)
      let discountAmount = 0;
      let promoId = undefined;

      if (promoCode) {
        const promoResult = await validatePromoCode(promoCode, subtotal, userId);
        discountAmount = promoResult.discountAmount;
        promoId = promoResult.id;

        // Update quota
        await tx.promoCode.update({
          where: { id: promoId },
          data: { quotaUsed: { increment: 1 } }
        });
      }

      const totalAmount = subtotal - discountAmount;

      // 4. Create Booking
      const booking = await tx.booking.create({
        data: {
          bookingCode: `BY-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
          scheduleId,
          userId,
          promoId,
          customerEmail,
          customerPhone,
          specialNotes,
          subtotal,
          discountAmount,
          totalAmount,
          status: "PENDING",
          expiresAt: new Date(new Date().getTime() + 15 * 60 * 1000), // 15 mins expiry
        }
      });

      // 5. Link Passengers to Seats and Update Seat Status
      for (const p of passengers) {
        const seat = await tx.seat.upsert({
          where: {
            scheduleId_seatNumber: {
              scheduleId,
              seatNumber: p.seatNumber
            }
          },
          update: {
            status: "LOCKED" 
          },
          create: {
            scheduleId,
            seatNumber: p.seatNumber,
            status: "LOCKED"
          }
        });

        await tx.bookingPassenger.create({
          data: {
            bookingId: booking.id,
            seatId: seat.id,
            name: p.name,
            idNumber: p.idNumber,
            gender: p.gender,
            birthDate: new Date(p.birthDate),
          }
        });
      }

      // 6. Log initial status
      await tx.bookingStatusLog.create({
        data: {
          bookingId: booking.id,
          status: "PENDING",
          reason: "Booking created by customer",
          changedBy: userId || "SYSTEM"
        }
      });

      return booking;
    });

    return { success: true, booking: result };
  } catch (error: any) {
    console.error("Booking Transaction Error:", error.message);
    return { success: false, error: error.message };
  }
};
