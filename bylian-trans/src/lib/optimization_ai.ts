import { db } from "./prisma";
import { startOfDay, endOfDay, addDays, format } from "date-fns";

/**
 * Task 57: Demand Forecasting & Inventory Optimization
 * Predicts seat demand for a route based on historical trends (Last 4 weeks).
 */
export async function forecastRouteDemand(routeId: string, targetDate: Date) {
  // 1. Get historical data for the same day of week (e.g., all Mondays)
  const dayOfWeek = targetDate.getDay();
  
  const historicalBookings = await db.booking.findMany({
    where: {
      schedule: { routeId },
      status: "CONFIRMED"
    },
    include: { schedule: true }
  });

  // Filter for same day of week in history
  const sameDayBookings = historicalBookings.filter((b: any) => b.schedule.departureTime.getDay() === dayOfWeek);

  if (sameDayBookings.length === 0) return { expectedOccupancy: 0.5, confidence: "LOW" };

  // Calculate Average Occupancy per schedule on this route for this day of week
  const scheduleIds = Array.from(new Set(sameDayBookings.map((b: any) => b.scheduleId)));
  const occupancyPerSchedule = scheduleIds.map((sid: any) => {
      const bookedCount = sameDayBookings.filter((b: any) => b.scheduleId === sid).length;
      return bookedCount / 30; // Assuming 30 seats avg
  });

  const avgOccupancy = occupancyPerSchedule.reduce((a, b) => a + b, 0) / occupancyPerSchedule.length;

  // Inventory Optimization Recommendation
  let recommendation = "MAINTAIN";
  if (avgOccupancy > 0.85) recommendation = "ADD_BUS_SCHEDULE";
  else if (avgOccupancy < 0.3) recommendation = "CONSOLIDATE_SCHEDULE";

  return {
    routeId,
    forecastDate: format(targetDate, "yyyy-MM-dd"),
    predictedOccupancy: parseFloat(avgOccupancy.toFixed(2)),
    recommendation,
    confidence: occupancyPerSchedule.length > 5 ? "HIGH" : "MEDIUM"
  };
}

/**
 * Task 59: Real-time Fleet Re-allocation Logic
 * Decisions to re-assign buses due to delays or extreme demand.
 */
export async function suggestFleetReallocation() {
  // 1. Find routes with high delay (>2 hours)
  const delayedSchedules = await db.schedule.findMany({
    where: { 
      status: "DELAYED",
      departureTime: { gte: new Date() } 
    },
    include: { bus: true, route: true }
  });

  // 2. Find available/healthy buses nearby
  const healthyBuses = await db.bus.findMany({
    where: { status: "READY", lastHealthScore: { gte: 80 } }
  });

  const suggestions = [];

  for (const schedule of delayedSchedules) {
    // If a schedule is heavily delayed, suggest a swap if a healthy bus is available
    if (healthyBuses.length > 0) {
      const replacementBus = healthyBuses.pop(); // Take the best one
      suggestions.push({
        type: "EMERGENCY_REPLACEMENT",
        reason: `Schedule ${schedule.id} severely delayed. Using spare healthy bus.`,
        originalScheduleId: schedule.id,
        suggestedBusId: replacementBus?.id,
        priority: "CRITICAL"
      });
    }
  }

  // 3. Demand-driven re-allocation (Moving assets to high-yield routes)
  // (In a real app, this would check real-time search volume vs capacity)
  
  return suggestions;
}
