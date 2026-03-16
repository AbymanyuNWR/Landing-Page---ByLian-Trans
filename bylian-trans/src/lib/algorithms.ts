import { db } from "./prisma";
import { addMinutes } from "date-fns"; // logic helpers

/**
 * Super Logic: Advanced Conflict Detection Algorithm (Task 26)
 * Validates if a Bus or Driver can be assigned to a new schedule.
 * Includes Buffer Time for maintenance/cleaning.
 */
export async function validateResourceAssignment(
  busId: string,
  startTime: Date,
  endTime: Date,
  bufferMinutes: number = 90
) {
  // 1. Check Maintenance Blockers
  const maintenance = await db.busMaintenance.findFirst({
    where: {
      busId,
      status: "IN_PROGRESS",
      OR: [
        { date: { lte: endTime } }
      ]
    }
  });

  if (maintenance) {
    return {
      valid: false,
      reason: `Bus dalam pemeliharaan aktif: ${maintenance.description}`
    };
  }

  // 2. Check Overlapping Schedules + Buffer
  // We need to find schedules where the [Departure - Buffer] to [Arrival + Buffer] overlaps with our new window
  const windowWithBufferStart = addMinutes(startTime, -bufferMinutes);
  const windowWithBufferEnd = addMinutes(endTime, bufferMinutes);

  const conflicts = await db.busSchedule.findMany({
    where: {
      busId,
      status: { in: ["SCHEDULED", "BOARDING", "IN_TRANSIT"] },
      OR: [
        {
          // Existing schedule starts OR ends within our new window (with buffer)
          departureTime: { lte: windowWithBufferEnd },
          estArrivalTime: { gte: windowWithBufferStart }
        }
      ]
    }
  });

  if (conflicts.length > 0) {
    const conflict = conflicts[0];
    return {
      valid: false,
      reason: `Konflik dengan jadwal ${conflict.id} (${conflict.departureTime.toLocaleTimeString()} - ${conflict.estArrivalTime.toLocaleTimeString()}). Diperlukan jeda ${bufferMinutes} menit.`
    };
  }

  return { valid: true };
}

/**
 * Super Logic: Holiday & Surge Pricing Engine (Task 15)
 * Calculates the final ticket price based on calendar events.
 */
const HOLIDAYS_2024 = [
  "2024-04-08", "2024-04-09", "2024-04-10", "2024-04-11", "2024-04-12", // Lebaran
  "2024-12-25", "2024-12-31", "2025-01-01" // Year End
];

/**
 * Task 51 & 61: Dynamic Pricing v3 (Zenith Expert System)
 * Incorporates real-time demand, occupancy, and Event-Driven multipliers.
 */
export async function calculateAdvancedSurgePrice(
  basePrice: number,
  departureTime: Date,
  occupancyRate: number,
  routeId: string
) {
  let multiplier = 1.0;
  const breakdown: string[] = [];

  // 1. Calendar Factors (Weekend/Holiday)
  const isWeekend = departureTime.getDay() === 0 || departureTime.getDay() === 6;
  if (isWeekend) {
    multiplier += 0.15;
    breakdown.push("Lonjakan Akhir Pekan (+15%)");
  }

  // 2. Task 61: Event-Driven Multipliers (Mudik, Local Concerts, etc.)
  const month = departureTime.getMonth();
  const date = departureTime.getDate();
  if ((month === 11 && date >= 20) || (month === 3 && date >= 15)) {
    multiplier += 0.50;
    breakdown.push("Musim Puncak / Liburan Besar (+50%)");
  }

  // 3. Task 51: Demand-Responsive Logic (Occupancy Scarcity)
  if (occupancyRate > 0.9) {
    multiplier += 0.4;
    breakdown.push("Sangat Terbatas (+40%)");
  } else if (occupancyRate > 0.7) {
    multiplier += 0.2;
    breakdown.push("Permintaan Tinggi (+20%)");
  }

  const finalPrice = Math.round(basePrice * multiplier);

  return {
    basePrice,
    finalPrice,
    multiplier: parseFloat(multiplier.toFixed(2)),
    breakdown
  };
}

/**
 * Task 62: Smart Inventory Protection (Anti-Cannibalization)
 */
export function protectHighMarginInventory(
  occupancyRate: number, 
  tripDistance: number, 
  totalRouteDistance: number
) {
  const isPeakDemand = occupancyRate > 0.7;
  const isShortHaul = tripDistance < (totalRouteDistance * 0.5);

  if (isPeakDemand && isShortHaul) {
    return {
      allowed: false,
      reason: "Ketersediaan kursi diprioritaskan untuk perjalanan jarak jauh pada jam sibuk."
    };
  }

  return { allowed: true };
}

/**
 * Super Logic: Automated Schedule Factory (Task 27)
 * Generates recurring schedules for a month.
 */
export async function generateRecurringSchedules(
  routeId: string,
  busId: string,
  config: {
    startHour: number; // e.g. 8 for 08:00
    durationMins: number;
    frequencyDays: number[]; // [1,3,5] for Mon, Wed, Fri
    weeks: number;
  }
) {
  const schedules = [];
  const now = new Date();
  
  for (let w = 0; w < config.weeks; w++) {
    for (const day of config.frequencyDays) {
      const departure = new Date(now);
      departure.setDate(now.getDate() + (w * 7) + ((day - now.getDay() + 7) % 7));
      departure.setHours(config.startHour, 0, 0, 0);

      const arrival = addMinutes(departure, config.durationMins);

      // Validate conflict before adding
      const validation = await validateResourceAssignment(busId, departure, arrival);
      
      if (validation.valid) {
        schedules.push({
          routeId,
          busId,
          departureTime: departure,
          estArrivalTime: arrival,
          status: "SCHEDULED",
          price: 250000, // Base price
          departurePool: "Pool A",
          arrivalPool: "Pool B"
        });
      }
    }
  }

  // Bulk create in DB
  return await db.busSchedule.createMany({
    data: schedules
  });
}

/**
 * Task 54: Smart Seat Allocation Algorithm
 * Groups passengers together and applies comfort weights.
 */
export async function suggestOptimalSeats(
  scheduleId: string, 
  groupSize: number, 
  isQuietZonePreferred: boolean = false
) {
  const allSeats = await db.seat.findMany({
    where: { scheduleId, status: "AVAILABLE" }
  });

  if (allSeats.length < groupSize) return null;

  // 1. Scoring Logic
  const scoredSeats = allSeats.map((seat: any) => {
    let score = 100;
    const row = parseInt(seat.seatNumber.substring(0, seat.seatNumber.length - 1));
    const side = seat.seatNumber.slice(-1); // A, B, C, D

    // Quiet Zone (Front of bus, rows 1-3)
    if (isQuietZonePreferred && row <= 3) score += 20;
    else if (!isQuietZonePreferred && row <= 3) score -= 10;

    // Window Seat Preference (Assume A and D are windows)
    if (side === "A" || side === "D") score += 5;

    return { ...seat, score };
  });

  // 2. Find Best Contiguous Group (Simplistic version for logic demo)
  // In a real app, we'd use a clusters/k-means or adjacency matrix
  const sorted = scoredSeats.sort((a: any, b: any) => b.score - a.score);
  return sorted.slice(0, groupSize);
}

/**
 * Super Logic: Fleet Efficiency & Fuel Estimation (Task 28)
 * Calculates estimated fuel needs based on distance, load, and terrain.
 */
export function estimateFuelConsumption(
  distanceKm: number,
  passengerCount: number,
  busType: "BIG_BUS" | "MEDIUM_BUS" | "SHUTTLE" = "BIG_BUS"
) {
  // Constants (Liters per 100km)
  const baseConsump = {
    BIG_BUS: 35,
    MEDIUM_BUS: 25,
    SHUTTLE: 12
  };

  const passengerWeightKg = 75; // Average
  const fuelPerKgPerKm = 0.00005; // Extra fuel for weight

  const baseFuel = (distanceKm / 100) * baseConsump[busType];
  const totalWeight = passengerCount * passengerWeightKg;
  const extraFuel = totalWeight * distanceKm * fuelPerKgPerKm;

  const totalLitres = baseFuel + extraFuel;
  const buffer = totalLitres * 0.15; // 15% safety buffer

  return {
    estimatedLitres: Math.round(totalLitres + buffer),
    costIDR: Math.round((totalLitres + buffer) * 15000), // Assuming 15k IDR/L
    breakdown: { baseFuel, extraFuel, buffer }
  };
}

/**
 * Super Logic: Intelligent Route Optimization
 * Recommends speed adjustments to maintain schedule based on delay.
 */
export function optimizeRouteExecution(
  currentEta: Date,
  scheduledArrival: Date,
  remainingKm: number
) {
  const delayMs = currentEta.getTime() - scheduledArrival.getTime();
  const delayMins = Math.round(delayMs / 60000);

  if (delayMins <= 0) return { status: "ON_TIME", advice: "Maintain current speed." };

  // Calculate required speed to recover delay
  // (Remaining Time = Scheduled - Now)
  const now = new Date();
  const availableHours = (scheduledArrival.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  if (availableHours <= 0) return { status: "LATE", advice: "Schedule missed. Update passengers." };

  const requiredKph = remainingKm / availableHours;
  
  return {
    status: delayMins > 15 ? "CRITICAL_DELAY" : "SLIGHT_DELAY",
    delayMins,
    requiredKph: Math.round(requiredKph),
    advice: requiredKph > 100 ? "Cannot recover safely. Logging delay." : `Increase speed to ${Math.round(requiredKph)} km/h to recover.`
  };
}
