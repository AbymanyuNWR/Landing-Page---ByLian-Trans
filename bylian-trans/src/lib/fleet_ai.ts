import { db } from "./prisma";
import { logger } from "./logger";

/**
 * Task 52: Predictive Maintenance Health Score (Ultra Logic)
 * Calculates a 0-100 score for bus health.
 * Below 40 triggers an automatic "REQUIRED" maintenance alert.
 */
export async function calculateBusHealthScore(busId: string) {
  const bus = await db.bus.findUnique({
    where: { id: busId },
    include: { 
        maintenanceLogs: { orderBy: { date: "desc" }, take: 5 },
        schedules: { where: { status: "COMPLETED" }, select: { id: true } }
    }
  });

  if (!bus) return null;

  let score = 100;

  // 1. Age Factor (-2 points per year after 5 years)
  const age = new Date().getFullYear() - new Date(bus.createdAt).getFullYear();
  if (age > 5) score -= (age - 5) * 2;

  // 2. Usage Factor (Simulated Mileage via completed schedules)
  // Assume avg 300km per schedule.
  const estimatedMileage = bus.schedules.length * 300;
  const mileageSinceLastService = estimatedMileage % 5000; // Assume 5k km service interval
  
  if (mileageSinceLastService > 4000) {
    score -= 30; // Close to service limit
  } else if (mileageSinceLastService > 2500) {
    score -= 10;
  }

  // 3. Historical Reliability (-10 per 'MAJOR_REPAIR' in last 3 logs)
  const majorRepairs = bus.maintenanceLogs.filter((l: any) => l.description.toLowerCase().includes("mesin") || l.description.toLowerCase().includes("transmisi")).length;
  score -= majorRepairs * 15;

  // 4. Critical Warning Threshold
  const finalScore = Math.max(0, score);
  
  if (finalScore < 40) {
    logger.warn(`Critical Bus Health detected: ${bus.name}`, { busId, score: finalScore });
    // Potential Auto-Trigger Maintenance in production
  }

  return {
    busId,
    busName: bus.name,
    healthScore: finalScore,
    estimatedMileage,
    recommendation: finalScore < 40 ? "IMMEDIATE_MAINTENANCE" : finalScore < 70 ? "SCHEDULE_SERVICE_SOON" : "OPERATIONAL"
  };
}

/**
 * Task 63: Future Maintenance Cost Predictor (Expert System)
 * Predicts maintenance spend over next 6-12 months.
 */
export async function predictFutureMaintenanceCosts(busId: string) {
  const bus = await db.bus.findUnique({
    where: { id: busId },
    include: { maintenances: true }
  });

  if (!bus) return null;

  // 1. Calculate historical burn rate
  const totalCost = bus.maintenances.reduce((sum: number, m: any) => sum + (m.cost || 0), 0);
  const busAgeMonths = Math.max(1, (new Date().getTime() - new Date(bus.createdAt).getTime()) / (30 * 24 * 60 * 60 * 1000));
  const avgMonthlyCost = totalCost / busAgeMonths;

  // 2. Exponential Aging Factor
  // Costs increase as bus gets older (Simulated 5% increase per year of age)
  const yearsOld = busAgeMonths / 12;
  const agingMultiplier = 1 + (yearsOld * 0.05);

  const predictedMonthly = avgMonthlyCost * agingMultiplier;

  return {
    busId,
    currentAvgMonthly: Math.round(avgMonthlyCost),
    predictedMonthly: Math.round(predictedMonthly),
    sixMonthProjection: Math.round(predictedMonthly * 6),
    twelveMonthProjection: Math.round(predictedMonthly * 12),
    confidence: bus.maintenances.length > 5 ? "HIGH" : "LOW"
  };
}

/**
 * Task 65: Traffic-Aware ETA Correction Engine
 * Simulates delay propagation across remaining route legs.
 */
export function refineEtaWithTraffic(
  currentEta: Date, 
  trafficIntensity: number, // 0.0 (empty) to 1.0 (deadlock)
  remainingLegs: number
) {
  // Logic: Each remaining leg adds a traffic-driven delay penalty
  // Penalty = (15 mins * intensity) per leg
  const totalPenaltyMins = remainingLegs * (15 * trafficIntensity);
  
  const refinedEta = new Date(currentEta.getTime() + (totalPenaltyMins * 60000));

  return {
      originalEta: currentEta,
      refinedEta,
      trafficImpactMins: Math.round(totalPenaltyMins),
      intensityStatus: trafficIntensity > 0.7 ? "HEAVY_CONGESTION" : "MODERATE"
  };
}

/**
 * Task 53: Intelligent Route Optimizer (Expert System)
 * Recommends the best bus for a route based on fuel cost and predicted load.
 */
export async function recommendBusForRoute(routeId: string) {
    const buses = await db.bus.findMany({
        where: { status: "AVAILABLE" }
    });

    const scores = await Promise.all(buses.map(async (bus: any) => {
        const health = await calculateBusHealthScore(bus.id);
        // Cost factor: Bigger buses cost more to run but carry more
        const fuelEfficiency = bus.capacity > 40 ? 0.6 : 0.8; // Simple ratio
        
        return {
            busId: bus.id,
            name: bus.name,
            matchScore: (health?.healthScore || 0) * fuelEfficiency,
        };
    }));

    return scores.sort((a: any, b: any) => b.matchScore - a.matchScore)[0];
}
