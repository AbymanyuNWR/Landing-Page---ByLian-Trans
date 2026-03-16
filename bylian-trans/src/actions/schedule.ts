"use server";

import { generateRecurringSchedules, calculateAdvancedSurgePrice } from "@/lib/algorithms";
import { auth } from "@/auth";
import { db } from "@/lib/prisma";

/**
 * Task 27: Automated Schedule Generator Action
 * Can be called from Admin Dashboard
 */
export async function createBatchSchedules(data: {
  routeId: string;
  busId: string;
  startHour: number;
  durationMins: number;
  frequencyDays: number[];
  weeks: number;
}) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    return { error: "Unauthorized access" };
  }

  try {
    const result = await generateRecurringSchedules(
      data.routeId,
      data.busId,
      {
        startHour: data.startHour,
        durationMins: data.durationMins,
        frequencyDays: data.frequencyDays,
        weeks: data.weeks
      }
    );

    return { success: true, count: result.count };
  } catch (error: any) {
    return { error: error.message };
  }
}

/**
 * Task 66: Real-time Dynamic Search API
 * Fetches schedules and applies dynamic pricing for results.
 */
export async function searchSchedules(params: {
    origin: string;
    destination: string;
    date: string;
}) {
    try {
        const dateObj = new Date(params.date);
        const startOfDay = new Date(dateObj.setHours(0, 0, 0, 0));
        const endOfDay = new Date(dateObj.setHours(23, 59, 59, 999));

        const rawSchedules = await db.busSchedule.findMany({
            where: {
                departureTime: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
                // Add city matching logic here if needed, or routeId
                route: {
                    origin: { contains: params.origin, mode: "insensitive" },
                    destination: { contains: params.destination, mode: "insensitive" }
                }
            },
            include: {
                bus: true,
                route: true,
                _count: {
                    select: { bookings: true }
                }
            }
        });

        const schedulesWithPricing = await Promise.all(
            rawSchedules.map(async (sch: any) => {
                const occupancyRate = (sch.bookedSeats || 0) / (sch.totalSeats || 40);
                const pricing = await calculateAdvancedSurgePrice(
                    sch.price,
                    sch.departureTime,
                    occupancyRate,
                    sch.routeId
                );

                return {
                    id: sch.id,
                    busName: sch.bus.name,
                    busClass: sch.bus.type, // e.g. EXECUTIVE
                    departureTime: sch.departureTime,
                    arrivalTime: sch.estArrivalTime,
                    departurePool: sch.departurePool,
                    arrivalPool: sch.arrivalPool,
                    basePrice: sch.price,
                    finalPrice: pricing.finalPrice,
                    breakdown: pricing.breakdown,
                    availableSeats: (sch.totalSeats || 40) - (sch.bookedSeats || 0),
                    duration: "8 Jam", // Simplification
                    facilities: ["AC", "Toilet", "Snack"] // Mock from bus type usually
                };
            })
        );

        return { success: true, schedules: schedulesWithPricing };
    } catch (error: any) {
        console.error("Search Error:", error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Task 67: Real-time Seat Scoring API
 * Fetches seats for a schedule and applies quality scoring.
 */
export async function getScheduleSeats(scheduleId: string) {
    try {
        const schedule = await db.busSchedule.findUnique({
            where: { id: scheduleId },
            include: { bus: true }
        });

        if (!schedule) throw new Error("Jadwal tidak ditemukan");

        // Fetch all seats (existing ones in DB)
        const dbSeats = await db.seat.findMany({
            where: { scheduleId }
        });

        // Map into a full set of seats based on bus capacity
        // This is a simplified version; real logic would use a template
        const letters = schedule.bus.type.includes("2-1") ? ["A", "B", "C"] : ["A", "B", "C", "D"];
        const rows = 10;
        const allSeats = [];

        for (let r = 1; r <= rows; r++) {
            for (const L of letters) {
                const seatNum = `${r}${L}`;
                const dbSeat = dbSeats.find((s: any) => s.seatNumber === seatNum);
                
                // Base Score Logic (Simplified for frontend display)
                let score = 50;
                if (L === "A" || L === "D") score += 30; // Window
                if (r <= 3) score += 20; // Front

                allSeats.push({
                    id: dbSeat?.id || `new-${seatNum}`,
                    seatNumber: seatNum,
                    status: dbSeat?.status || "AVAILABLE",
                    price: schedule.price,
                    score: score
                });
            }
        }

        return { 
            success: true, 
            seats: allSeats,
            layout: schedule.bus.type.includes("2-1") ? "2-1" : "2-2" 
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
