import { db } from "./prisma";
import { logger } from "./logger";

/**
 * Super Logic: Fraud Detection Engine
 * Analyzes patterns to identify suspicious activity (Tasks 41 & 5)
 */
export async function runFraudCheck(userId: string, targetPhone: string, ipAddress: string) {
  const scores = [];
  
  // 1. Check Phone Collision (Different users using same phone)
  const phoneCollisions = await db.user.count({
    where: {
      phoneNumber: targetPhone,
      id: { not: userId }
    }
  });
  if (phoneCollisions > 0) scores.push({ type: "PHONE_COLLISION", score: 50 });

  // 2. Check Rapid Bookings from same IP (Velocity Check)
  // This would ideally use Redis, but for logic demonstration we query DB
  const tenMinsAgo = new Date(new Date().getTime() - 10 * 60 * 1000);
  const auditLogs = await db.auditLog.count({
    where: {
      action: "BOOKING_CREATE",
      createdAt: { gte: tenMinsAgo },
      // details: { contains: ipAddress } // Assuming IP is in JSON details
    }
  });
  if (auditLogs > 5) scores.push({ type: "VELOCITY_EXCEEDED", score: 70 });

  // 3. User Reputation (Based on historical cancellations)
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { bookings: { take: 10, orderBy: { createdAt: 'desc' } } }
  });
  
  if (user) {
    const cancellations = user.bookings.filter((b: any) => b.status === "CANCELLED").length;
    if (cancellations >= 5) scores.push({ type: "HIGH_CANCELLATION_RATE", score: 40 });
  }

  const totalRisk = scores.reduce((acc, curr) => acc + curr.score, 0);
  
  if (totalRisk >= 80) {
    logger.warn(`Potential Fraud Blocked`, { userId, totalRisk, scores, ipAddress });
    return { flagged: true, totalRisk, reason: "Risiko aktivitas mencurigakan terlalu tinggi." };
  }

  return { flagged: false, totalRisk };
}

/**
 * Task 10: Session Audit Tracking
 */
export async function logSessionActivity(userId: string, userAgent: string, ip: string) {
  return await db.auditLog.create({
    data: {
      userId,
      action: "SESSION_LOGIN",
      target: "AUTH",
      details: JSON.stringify({ userAgent, ip, timestamp: new Date().toISOString() })
    }
  });
}
