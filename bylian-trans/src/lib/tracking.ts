import { db } from "./prisma";

/**
 * Calculates distance between two coordinates in km (Haversine formula)
 */
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Task 30: Geo-fencing Alerts
 * Checks if buses are nearing their destination pool
 */
export async function checkGeoFences() {
  const activeSchedules = await db.busSchedule.findMany({
    where: { status: "IN_TRANSIT" },
    include: {
      bus: { include: { status: true } },
      route: true
    }
  });

  const alerts = [];

  for (const schedule of activeSchedules) {
    if (!schedule.bus.status) continue;

    const { currentLat, currentLng } = schedule.bus.status;
    
    // For simplicity, let's assume we have pool locations. 
    // In a real app, pools would have lat/lng in the database.
    // For now, we'll use dummy coordinates for the destination pool.
    const destLat = -6.2088; // Example: Jakarta coordinate
    const destLng = 106.8456;

    const distance = getDistance(currentLat, currentLng, destLat, destLng);

    if (distance < 5) {
      alerts.push({
        busId: schedule.busId,
        bookingCode: schedule.id,
        message: `Bus ${schedule.bus.name} berjarak ${distance.toFixed(1)}km dari tujuan (${schedule.arrivalPool}).`
      });
      // Here you would trigger a real notification (WhatsApp/Push)
    }
  }

  return alerts;
}

/**
 * Task 31: Delay Calculation
 * Automatically updates schedule status if late
 */
export async function updateScheduleDelays() {
  const now = new Date();

  // Find schedules that should have arrived but aren't marked as ARRIVED
  const lateSchedules = await db.busSchedule.findMany({
    where: {
      status: { in: ["SCHEDULED", "BOARDING", "IN_TRANSIT"] },
      estArrivalTime: { lt: now }
    }
  });

  let updatedCount = 0;

  for (const schedule of lateSchedules) {
    await db.busSchedule.update({
      where: { id: schedule.id },
      data: { status: "DELAYED" }
    });
    updatedCount++;
  }

  return { updated: updatedCount };
}
