import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/prisma";
import { generateTicketPdfBuffer } from "@/lib/pdf";
import { sendEmail } from "@/lib/email";
import TicketConfirmation from "../../../../../emails/TicketConfirmation";
import { sendTicketWhatsApp } from "@/lib/whatsapp";
import { awardLoyaltyPoints } from "@/lib/loyalty";

/**
 * Midtrans Webhook Handler (Task 18 & 19)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      payment_type,
    } = body;

    // 1. Signature Verification (Task 19)
    const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
    const hashed = crypto
      .createHash("sha512")
      .update(order_id + status_code + gross_amount + serverKey)
      .digest("hex");

    if (hashed !== signature_key) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
    }

    // 2. Process Transaction Status
    const booking = await db.booking.findUnique({
      where: { bookingCode: order_id },
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

    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    // Wrap in transaction to ensure atomicity
    await db.$transaction(async (tx: any) => {
      // Create/Update Payment record
      await tx.payment.upsert({
        where: { bookingId: booking.id },
        update: {
          transactionId: body.transaction_id,
          paymentMethod: payment_type,
          status: transaction_status === "settlement" || transaction_status === "capture" ? "SUCCESS" : 
                  transaction_status === "expire" ? "FAILED" : "PENDING"
        },
        create: {
          bookingId: booking.id,
          transactionId: body.transaction_id,
          amount: parseFloat(gross_amount),
          paymentMethod: payment_type,
          status: transaction_status === "settlement" || transaction_status === "capture" ? "SUCCESS" : "PENDING"
        }
      });

      // Log the webhook payload
      const paymentRecord = await tx.payment.findUnique({ where: { bookingId: booking.id } });
      await tx.paymentWebhookLog.create({
        data: {
          paymentId: paymentRecord.id,
          payload: body,
          signature: signature_key,
          status: "processed"
        }
      });

      if (transaction_status === "settlement" || transaction_status === "capture") {
        // CONFIRM BOOKING
        await tx.booking.update({
          where: { id: booking.id },
          data: { status: "CONFIRMED" }
        });

        // Update Seats to BOOKED
        const seatIds = booking.passengers.map((p: any) => p.seatId);
        await tx.seat.updateMany({
          where: { id: { in: seatIds } },
          data: { status: "BOOKED" }
        });

        await tx.bookingStatusLog.create({
          data: {
            bookingId: booking.id,
            status: "CONFIRMED",
            reason: "Payment settled via Midtrans",
            changedBy: "MIDTRANS_WEBHOOK"
          }
        });

        // 3. SEND E-TICKET (Task 22 & 33)
        try {
          const pdfBuffer = await generateTicketPdfBuffer(booking);
          
          await sendEmail({
            to: booking.customerEmail,
            subject: `[Bylian Trans] E-Ticket Anda - ${booking.bookingCode}`,
            react: TicketConfirmation({
              bookingCode: booking.bookingCode,
              customerName: booking.user?.name || booking.passengers[0].name,
              route: `${booking.schedule.route.origin} - ${booking.schedule.route.destination}`,
              date: booking.schedule.departureTime,
              time: new Date(booking.schedule.departureTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB",
              seats: booking.passengers.map((p: any) => p.seat.seatNumber),
              total: booking.totalAmount,
            }),
            attachments: [
              {
                filename: `E-Ticket-${booking.bookingCode}.pdf`,
                content: pdfBuffer
              }
            ]
          });

          // WhatsApp Delivery (Task 33)
          await sendTicketWhatsApp(booking);

        } catch (commsError: any) {
          console.error("Communication Error:", commsError.message);
        }

        // 4. AWARD LOYALTY POINTS (Task 38)
        if (booking.userId) {
          await awardLoyaltyPoints(booking.userId, booking.totalAmount, booking.id);
        }

      } else if (transaction_status === "expire" || transaction_status === "cancel" || transaction_status === "deny") {
// ...
        // CANCEL/EXPIRE BOOKING
        await tx.booking.update({
          where: { id: booking.id },
          data: { status: transaction_status === "expire" ? "EXPIRED" : "CANCELLED" }
        });

        // Release Seats
        const seatIds = booking.passengers.map((p: any) => p.seatId);
        await tx.seat.updateMany({
          where: { id: { in: seatIds } },
          data: { status: "AVAILABLE" }
        });

        await tx.bookingStatusLog.create({
          data: {
            bookingId: booking.id,
            status: transaction_status === "expire" ? "EXPIRED" : "CANCELLED",
            reason: `Payment ${transaction_status} via Midtrans`,
            changedBy: "MIDTRANS_WEBHOOK"
          }
        });
      }
    });

    return NextResponse.json({ message: "OK" });
  } catch (error: any) {
    console.error("Midtrans Webhook Error:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
