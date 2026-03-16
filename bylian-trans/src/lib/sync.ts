import { db } from "./prisma";
import { midtransCoreApi } from "./midtrans";
import { generateTicketPdfBuffer } from "./pdf";
import { sendEmail } from "./email";
import TicketConfirmation from "../../emails/TicketConfirmation";
import { sendTicketWhatsApp } from "./whatsapp";
import { awardLoyaltyPoints } from "./loyalty";

/**
 * Syncs pending payments with Midtrans API to handle missing webhooks (Task 20)
 */
export async function syncPendingPayments() {
  const fiveMinutesAgo = new Date(new Date().getTime() - 5 * 60 * 1000);

  try {
    const pendingBookings = await db.booking.findMany({
      where: {
        status: "PENDING",
        createdAt: { lt: fiveMinutesAgo },
        payment: { isNot: null }
      },
      include: {
        user: true,
        schedule: {
          include: { route: true }
        },
        passengers: {
          include: { seat: true }
        },
        payment: true
      }
    });

    let syncCount = 0;

    for (const booking of pendingBookings) {
      try {
        const midtransStatus = await midtransCoreApi.transaction.status(booking.bookingCode);
        const { transaction_status } = midtransStatus;

        if (transaction_status === "settlement" || transaction_status === "capture") {
          // Sync to confirmed
          await db.$transaction(async (tx: any) => {
            await tx.booking.update({
              where: { id: booking.id },
              data: { status: "CONFIRMED" }
            });

            await tx.seat.updateMany({
              where: { id: { in: booking.passengers.map((p: any) => p.seatId) } },
              data: { status: "BOOKED" }
            });

            await tx.payment.update({
              where: { bookingId: booking.id },
              data: { status: "SUCCESS" }
            });

            await tx.bookingStatusLog.create({
              data: {
                bookingId: booking.id,
                status: "CONFIRMED",
                reason: "Synced with Midtrans API (Success)",
                changedBy: "SYSTEM_SYNC"
              }
            });
          });

          // Send Ticket Email & WhatsApp (Tasks 22 & 33)
          try {
            const pdfBuffer = await generateTicketPdfBuffer(booking);
            await sendEmail({
              to: booking.customerEmail,
              subject: `[Bylian Trans] E-Ticket Anda (Recovered) - ${booking.bookingCode}`,
              react: TicketConfirmation({
                bookingCode: booking.bookingCode,
                customerName: booking.user?.name || booking.passengers[0].name,
                route: `${booking.schedule.route.origin} - ${booking.schedule.route.destination}`,
                date: booking.schedule.departureTime,
                time: new Date(booking.schedule.departureTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB",
                seats: booking.passengers.map((p: any) => p.seat.seatNumber),
                total: booking.totalAmount,
              }),
              attachments: [{ filename: `E-Ticket-${booking.bookingCode}.pdf`, content: pdfBuffer }]
            });

            // WhatsApp Delivery
            await sendTicketWhatsApp(booking);

          } catch (e) {
            console.error("Sync Comms Error:", e);
          }

          // Award Loyalty Points (Task 38)
          if (booking.userId) {
            await awardLoyaltyPoints(booking.userId, booking.totalAmount, booking.id);
          }

          syncCount++;
        } else if (transaction_status === "expire" || transaction_status === "cancel") {
            // Sync to expired/cancelled
            await db.$transaction(async (tx: any) => {
                await tx.booking.update({
                  where: { id: booking.id },
                  data: { status: transaction_status === "expire" ? "EXPIRED" : "CANCELLED" }
                });
    
                await tx.seat.updateMany({
                  where: { id: { in: booking.passengers.map((p: any) => p.seatId) } },
                  data: { status: "AVAILABLE" }
                });
    
                await tx.payment.update({
                  where: { bookingId: booking.id },
                  data: { status: "FAILED" }
                });
    
                await tx.bookingStatusLog.create({
                  data: {
                    bookingId: booking.id,
                    status: transaction_status === "expire" ? "EXPIRED" : "CANCELLED",
                    reason: `Synced with Midtrans API (${transaction_status})`,
                    changedBy: "SYSTEM_SYNC"
                  }
                });
              });
              syncCount++;
        }
      } catch (err: any) {
        console.error(`Error syncing booking ${booking.bookingCode}:`, err.message);
      }
    }

    return { synced: syncCount };
  } catch (error: any) {
    console.error("Sync Error:", error.message);
    return { error: error.message };
  }
}
