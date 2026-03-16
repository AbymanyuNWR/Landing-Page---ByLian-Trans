import { db } from "@/lib/prisma";
import { refineEtaWithTraffic } from "@/lib/fleet_ai";

/**
 * Task 68: Traffic-Aware ETA Correction API
 */
export async function getEtaCorrection(scheduleId: string) {
    try {
        const schedule = await db.busSchedule.findUnique({
            where: { id: scheduleId }
        });

        if (!schedule) throw new Error("Jadwal tidak ditemukan");

        // Simulate traffic intensity (in real world, call Google Maps or similar)
        const mockTraffic = 0.4 + (Math.random() * 0.4); // 0.4 to 0.8
        
        const result = refineEtaWithTraffic(
            schedule.estArrivalTime,
            mockTraffic,
            3 // Assume 3 stops remaining
        );

        return { success: true, ...result };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * Task 23: Maintenance Blocking Logic
 * Checks if a bus is available for a schedule (not in maintenance)
 */
export async function isBusAvailable(busId: string, startTime: Date, endTime: Date) {
  // 1. Check Maintenance Status
  const activeMaintenance = await db.busMaintenance.findFirst({
    where: {
      busId,
      status: "IN_PROGRESS"
    }
  });

  if (activeMaintenance) {
    return { 
      available: false, 
      reason: `Bus sedang dalam pemeliharaan: ${activeMaintenance.description}` 
    };
  }

  // 2. Task 26: Schedule Conflict Detection
  // Check if bus is already assigned to another schedule that overlaps
  const overlappingSchedule = await db.busSchedule.findFirst({
    where: {
      busId,
      status: { in: ["SCHEDULED", "BOARDING", "IN_TRANSIT"] },
      OR: [
        {
          departureTime: { lte: endTime },
          estArrivalTime: { gte: startTime }
        }
      ]
    }
  });

  if (overlappingSchedule) {
    return {
      available: false,
      reason: "Bus sudah terjadwal untuk perjalanan lain pada waktu tersebut."
    };
  }

  return { available: true };
}

/**
 * Helper to register maintenance
 */
export async function startMaintenance(busId: string, description: string) {
  return await db.busMaintenance.create({
    data: {
      busId,
      description,
      status: "IN_PROGRESS",
      date: new Date()
    }
  });
}

/**
 * Helper to complete maintenance
 */
export async function completeMaintenance(maintenanceId: string, cost?: number) {
  return await db.busMaintenance.update({
    where: { id: maintenanceId },
    data: {
      status: "COMPLETED",
      cost,
      updatedAt: new Date()
    }
  });
}
