"use server";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";

export async function getUserLoyaltyAction() {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthenticated" };

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
          loyaltyLevel: true,
          loyaltyPoints: true,
          name: true
      }
    });

    if (!user) throw new Error("User not found");

    // Logic for next tier
    const tiers = [
        { name: "BRONZE", min: 0, max: 5000 },
        { name: "SILVER", min: 5001, max: 20000 },
        { name: "GOLD", min: 20001, max: 50000 },
        { name: "PLATINUM", min: 50001, max: Infinity }
    ];

    const currentTierIndex = tiers.findIndex(t => t.name === user.loyaltyLevel);
    const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;
    
    let progress = 0;
    if (nextTier) {
        progress = ((user.loyaltyPoints - tiers[currentTierIndex].min) / (nextTier.min - tiers[currentTierIndex].min)) * 100;
    } else {
        progress = 100;
    }

    // Dynamic Benefits
    const benefits = [
        { name: "Prioritas Boarding", min: "SILVER", active: user.loyaltyLevel !== "BRONZE" },
        { name: "Free Snack & Drink", min: "GOLD", active: ["GOLD", "PLATINUM"].includes(user.loyaltyLevel) },
        { name: "Kursi Depan Gratis", min: "GOLD", active: ["GOLD", "PLATINUM"].includes(user.loyaltyLevel) },
        { name: "Refund 100%", min: "PLATINUM", active: user.loyaltyLevel === "PLATINUM" },
        { name: "Priority Support 24/7", min: "PLATINUM", active: user.loyaltyLevel === "PLATINUM" },
    ];

    return { 
        success: true, 
        data: {
            ...user,
            nextTier: nextTier?.name || "MAX TIER",
            progress: Math.min(100, Math.max(0, progress)),
            benefits
        }
    };
  } catch (error: any) {
    return { error: error.message };
  }
}
