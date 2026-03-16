import { db } from "./prisma";
import { subMonths, differenceInDays } from "date-fns";

/**
 * Task 56: Customer Churn Prediction Engine
 * Predicts if a user is "At Risk" based on booking frequency decline.
 */
export async function predictCustomerChurn(userId: string) {
  const now = new Date();
  const threeMonthsAgo = subMonths(now, 3);

  // 1. Get user's booking history
  const bookings = await db.booking.findMany({
    where: { 
      userId,
      status: "CONFIRMED"
    },
    orderBy: { createdAt: "desc" },
    take: 10
  });

  if (bookings.length < 2) return { status: "NEUTRAL", score: 0, reason: "Insufficient data" };

  // 2. Calculate recency & frequency
  const lastBookingDate = bookings[0].createdAt;
  const daysSinceLastBooking = differenceInDays(now, lastBookingDate);
  
  // Calculate average interval between previous bookings
  let totalInterval = 0;
  for (let i = 0; i < bookings.length - 1; i++) {
    totalInterval += differenceInDays(bookings[i].createdAt, bookings[i+1].createdAt);
  }
  const avgInterval = totalInterval / (bookings.length - 1);

  // 3. Logic: If days since last booking is > 2.5x their average interval, they are at risk
  let score = 0;
  let status = "LOW_RISK";

  if (daysSinceLastBooking > avgInterval * 3) {
    score = 0.9;
    status = "HIGH_RISK";
  } else if (daysSinceLastBooking > avgInterval * 1.5) {
    score = 0.6;
    status = "MEDIUM_RISK";
  }

  return { 
    status, 
    score, 
    lastBookingDays: daysSinceLastBooking,
    avgIntervalDays: Math.round(avgInterval),
    prediction: status === "HIGH_RISK" ? "Likely to Churn" : "Healthy"
  };
}

/**
 * Task 60: Dynamic Customer Lifetime Value (CLV) Scoring
 * Predicts the long-term value of a user.
 */
export async function calculateCustomerCLV(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      bookings: {
        where: { status: "CONFIRMED" },
        select: { totalPrice: true }
      }
    }
  });

  if (!user) return null;

  const totalSpent = user.bookings.reduce((sum: number, b: any) => sum + b.totalPrice, 0);
  const bookingCount = user.bookings.length;
  
  if (bookingCount === 0) return { clv: 0, rank: "NEW" };

  const avgOrderValue = totalSpent / bookingCount;
  
  // Simple CLV Projection: (Avg Order Value * Booking Frequency) * Margin * Lifespan
  // Here we use a simplified multiplier based on age of account
  const accountAgeMonths = Math.max(1, differenceInDays(new Date(), user.createdAt) / 30);
  const monthlyFrequency = bookingCount / accountAgeMonths;
  
  // Project for next 12 months
  const predictedClv = avgOrderValue * monthlyFrequency * 12;

  let rank = "BRONZE";
  if (predictedClv > 10000000) rank = "ELITE"; // 10jt
  else if (predictedClv > 5000000) rank = "PLATINUM"; // 5jt
  else if (predictedClv > 1000000) rank = "GOLD"; // 1jt

  return {
    totalSpent,
    predictedNextYearValue: Math.round(predictedClv),
    rank,
    score: Math.min(100, (predictedClv / 10000000) * 100)
  };
}
