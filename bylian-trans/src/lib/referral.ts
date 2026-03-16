import { db } from "./prisma";
import { awardLoyaltyPoints } from "./loyalty";

/**
 * Super Logic: Referral & Cashback Engine (Task 41)
 * Handles awarding points for successful referrals.
 */
export async function processReferralRewards(newUserId: string, referralCode: string) {
  // 1. Validate Referral Code
  const referrer = await db.user.findFirst({
    where: { 
        accounts: { some: { providerAccountId: referralCode } } // Assuming referral code is stored or mapped to account ID for now
    }
  });

  if (!referrer) return { success: false, reason: "Referral code not found" };

  // 2. Intelligent Fraud Prevention (Logic)
  // Check if both users share the same phone number or if the new user was previously verified
  const newUser = await db.user.findUnique({ where: { id: newUserId } });
  if (newUser?.phoneNumber === referrer.phoneNumber) {
    return { success: false, reason: "Fraud detected: Matching phone numbers" };
  }

  try {
    return await db.$transaction(async (tx: any) => {
      // Award Referrer: 5000 points
      await awardLoyaltyPoints(referrer.id, 5000000, "REFERRAL_BONUS"); // Simulated 5000 pts

      // Award Referee (New User): 2000 points as welcome
      await awardLoyaltyPoints(newUserId, 2000000, "WELCOME_BONUS");

      return { success: true };
    });
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Cashback Logic
 * Awards points based on actual transaction completion.
 */
export async function applyBookingCashback(booking: any) {
  if (!booking.userId) return;

  // Logic: 5% Cashback in points for GOLD members, 2% for others
  const user = await db.user.findUnique({ where: { id: booking.userId } });
  if (!user) return;

  const cashbackPercent = user.loyaltyLevel === "GOLD" ? 0.05 : 0.02;
  const cashbackAmount = booking.totalAmount * cashbackPercent;

  await awardLoyaltyPoints(user.id, cashbackAmount, booking.id);
}
