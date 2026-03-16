import { db } from "./prisma";
import { differenceInHours } from "date-fns";

/**
 * Task 64: Algorithmic Refund Policy Manager
 * Dynamically calculates refund eligibility and percentage.
 * Rules:
 * - > 48h departure: 90% refund (Standard), 100% (Gold/Platinum)
 * - 24-48h: 75% refund
 * - 6-24h: 50% refund
 * - < 6h: 0% refund (unless 'Emergency' reason provided & Loyalty > Gold)
 */
export async function calculateDynamicRefund(
  bookingId: string, 
  reason: string = "REGULAR"
) {
  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: { 
        user: true,
        schedule: true
    }
  });

  if (!booking || booking.status !== "CONFIRMED") {
    return { success: false, reason: "Pesanan tidak valid untuk refund." };
  }

  const hoursToDeparture = differenceInHours(booking.schedule.departureTime, new Date());
  const loyaltyLevel = booking.user?.loyaltyLevel || "BRONZE";

  let refundPercentage = 0;
  let status = "REJECTED";

  if (hoursToDeparture > 48) {
    refundPercentage = (loyaltyLevel === "GOLD" || loyaltyLevel === "PLATINUM") ? 100 : 90;
    status = "APPROVED";
  } else if (hoursToDeparture > 24) {
    refundPercentage = 75;
    status = "APPROVED";
  } else if (hoursToDeparture > 6) {
    refundPercentage = 50;
    status = "APPROVED";
  } else {
    // Late refund logic
    if (reason === "EMERGENCY" && (loyaltyLevel === "GOLD" || loyaltyLevel === "PLATINUM")) {
        refundPercentage = 25;
        status = "APPROVED_EXCEPTION";
    } else {
        refundPercentage = 0;
        status = "REJECTED_LATE";
    }
  }

  const refundAmount = (booking.totalAmount * refundPercentage) / 100;

  return {
    bookingId,
    status,
    hoursToDeparture,
    loyaltyLevel,
    refundPercentage,
    refundAmount,
    note: status === "REJECTED_LATE" ? "Refund ditolak karena kurang dari 6 jam sebelum keberangkatan." : "Refund dihitung berdasarkan kebijakan waktu dinamis."
  };
}
