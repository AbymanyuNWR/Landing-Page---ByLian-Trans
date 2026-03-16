import { db } from "./prisma";

/**
 * Task 58: AI-Driven Anomaly Detection for Security
 * Detects suspicious activity such as "Impossible Travel".
 */
export async function detectSecurityAnomaly(userId: string, currentIp: string, currentCity: string) {
  // 1. Get last successful login
  const lastLogin = await db.auditLog.findFirst({
    where: { 
      userId,
      action: "LOGIN_SUCCESS"
    },
    orderBy: { createdAt: "desc" }
  });

  if (!lastLogin) return { anomaly: false, reason: "First login" };

  const lastMeta = lastLogin.newData as any;
  if (!lastMeta?.city || lastMeta.city === currentCity) {
    return { anomaly: false, reason: "Same location" };
  }

  // 2. "Impossible Travel" Logic
  // If city changed, check distance/time ratio
  // Simplified logic: City change within < 1 hour is suspicious for long distances
  const timeDiffMinutes = (new Date().getTime() - new Date(lastLogin.createdAt).getTime()) / 60000;
  
  if (timeDiffMinutes < 60 && lastMeta.city !== currentCity) {
    // Flag anomaly
    await db.auditLog.create({
      data: {
        userId,
        action: "SECURITY_ANOMALY",
        entity: "USER",
        entityId: userId,
        description: `Impossible Travel Detected: ${lastMeta.city} to ${currentCity} in ${Math.round(timeDiffMinutes)} mins`,
        newData: {
          previousCity: lastMeta.city,
          currentCity,
          timeDiffMinutes,
          ip: currentIp
        }
      } as any
    });

    return { 
      anomaly: true, 
      type: "IMPOSSIBLE_TRAVEL", 
      riskScore: 0.95,
      message: "Security alert: Account access from unusual location." 
    };
  }

  // 3. Check for unusual login hours (Extreme night logins for daytime-only users)
  const currentHour = new Date().getHours();
  // Simplified: 2 AM - 4 AM is high risk if not usual
  if (currentHour >= 2 && currentHour <= 4) {
      // In a real app, we'd compare against average login hour
      return { anomaly: true, type: "UNUSUAL_TIME", riskScore: 0.4 };
  }

  return { anomaly: false };
}

/**
 * Validates if an IP is from a known high-risk block or proxy
 * (Mock implementation for "Super Logic" demo)
 */
export async function isHighRiskIp(ip: string) {
    const highRiskRanges = ["10.0.0.", "192.168."]; // Just examples
    const isSuspicious = highRiskRanges.some(range => ip.startsWith(range));
    
    if (isSuspicious) {
        return { risk: "HIGH", reason: "Potential Proxy/VPN detected" };
    }
    return { risk: "LOW" };
}
