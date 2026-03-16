import { db } from "./prisma";

/**
 * Task 38: Point Calculation Engine
 * Awards 1 point for every 1,000 IDR spent.
 */
export async function awardLoyaltyPoints(userId: string, amount: number, bookingId: string) {
  const points = Math.floor(amount / 1000);
  
  if (points <= 0) return null;

  try {
    return await db.$transaction(async (tx: any) => {
      // 1. Update User's total points
      const user = await tx.user.update({
        where: { id: userId },
        data: {
          loyaltyPoints: { increment: points }
        }
      });

      // 2. Log the transaction
      await tx.loyaltyTransaction.create({
        data: {
          userId,
          bookingId,
          points,
          type: "EARNED",
          description: `Poin dari pesanan #${bookingId.substring(0, 8)}`
        }
      });

      // 3. Task 40: Tier Progression (Automatic check)
      await updateLoyaltyTier(userId, tx);

      return { points, newTotal: user.loyaltyPoints };
    });
  } catch (error: any) {
    console.error("Loyalty Award Error:", error.message);
    return null;
  }
}

/**
 * Task 40: Tier Progression Logic
 * BRONZE: 0-5,000 pts
 * SILVER: 5,001-20,000 pts
 * GOLD: 20,001-50,000 pts
 * PLATINUM: >50,000 pts
 */
async function updateLoyaltyTier(userId: string, tx: any) {
  const user = await tx.user.findUnique({ where: { id: userId } });
  if (!user) return;

  const pts = user.loyaltyPoints;
  let newLevel = "BRONZE";

  if (pts > 50000) newLevel = "PLATINUM";
  else if (pts > 20000) newLevel = "GOLD";
  else if (pts > 5000) newLevel = "SILVER";

  if (user.loyaltyLevel !== newLevel) {
    await tx.user.update({
      where: { id: userId },
      data: { loyaltyLevel: newLevel }
    });
  }
}

/**
 * Task 39: Voucher Redemption
 * Exchange points for a discount voucher
 */
export async function redeemPointsForVoucher(userId: string, pointsToRedeem: number) {
  // Simple rule: 10,000 points = 50,000 IDR voucher
  if (pointsToRedeem < 10000) return { error: "Poin tidak cukup (Min. 10.000)" };

  try {
    return await db.$transaction(async (tx: any) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user || user.loyaltyPoints < pointsToRedeem) {
        throw new Error("Poin tidak mencukupi");
      }

      const discountValue = (pointsToRedeem / 10000) * 50000;
      const voucherCode = `LV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      // 1. Deduct Points
      await tx.user.update({
        where: { id: userId },
        data: { loyaltyPoints: { decrement: pointsToRedeem } }
      });

      // 2. Log Transaction
      await tx.loyaltyTransaction.create({
        data: {
          userId,
          points: pointsToRedeem,
          type: "REDEEMED",
          description: `Tukar ${pointsToRedeem} poin untuk voucher ${discountValue}`
        }
      });

      // 3. Create Voucher
      const voucher = await tx.loyaltyVoucher.create({
        data: {
          userId,
          code: voucherCode,
          discountValue,
          expiresAt: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days
        }
      });

      return { success: true, voucher };
    });
  } catch (error: any) {
    return { error: error.message };
  }
}

/**
 * Marks a loyalty voucher as used
 */
export async function useLoyaltyVoucher(voucherCode: string, userId: string) {
  const voucher = await db.loyaltyVoucher.findUnique({
    where: { code: voucherCode }
  });

  if (!voucher || voucher.userId !== userId || voucher.isUsed || new Date(voucher.expiresAt) < new Date()) {
    return { error: "Voucher tidak valid atau sudah digunakan" };
  }

  return await db.loyaltyVoucher.update({
    where: { id: voucher.id },
    data: { isUsed: true }
  });
}

/**
 * Task 55: Behavioral Loyalty Engine (Ultra Logic)
 * Detects "Streaks" and awards significant bonus points.
 * Rule: 3 Completed trips in 60 days = 50,000 pts bonus.
 */
export async function checkAndAwardLoyaltyStreak(userId: string) {
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  const recentTrips = await db.booking.findMany({
    where: {
      userId,
      status: "CONFIRMED",
      createdAt: { gte: sixtyDaysAgo }
    },
    orderBy: { createdAt: "desc" }
  });

  if (recentTrips.length >= 3) {
    // Check if streak was already awarded in this window
    const recentBonus = await db.loyaltyTransaction.findFirst({
      where: {
        userId,
        type: "EARNED",
        description: { contains: "STREAK_BONUS" },
        createdAt: { gte: sixtyDaysAgo }
      }
    });

    if (!recentBonus) {
      await awardLoyaltyPoints(userId, 50000, "STREAK_BONUS_3_TRIPS");
      return { success: true, message: "Streak Loyalty Bonus Awarded!" };
    }
  }

  return { success: false, tripsInWindow: recentTrips.length };
}
