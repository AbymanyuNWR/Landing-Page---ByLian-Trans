import { logger } from "./logger";

/**
 * Task 44: Performance Monitoring & Slow Query Discovery
 * Higher Order Function to time execution of operations (Database or External API)
 */
export async function trackPerformance<T>(
  name: string,
  fn: () => Promise<T>,
  thresholdMs: number = 500
): Promise<T> {
  const start = performance.now();
  try {
    const result = await fn();
    const end = performance.now();
    const duration = end - start;

    if (duration > thresholdMs) {
      logger.warn(`Performance Bottleneck Detected: ${name}`, {
        duration: `${duration.toFixed(2)}ms`,
        threshold: `${thresholdMs}ms`,
      });
    } else {
      logger.debug(`Performance Trace: ${name}`, { duration: `${duration.toFixed(2)}ms` });
    }

    return result;
  } catch (error: any) {
    const end = performance.now();
    logger.error(`Performance Error in ${name}`, {
      duration: `${(end - start).toFixed(2)}ms`,
      error: error.message,
    });
    throw error;
  }
}

/**
 * Super Logic: Intelligent ETA Prediction Algorithm
 * Predicts Arrival at next stops based on current speed and distance.
 */
export function predictArrivalAtStops(
  currentLat: number,
  currentLng: number,
  stops: Array<{ lat: number, lng: number, city: string }>,
  avgSpeedKph: number = 60
) {
  // Haversine helper inside
  const getDist = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  return stops.map(stop => {
    const distance = getDist(currentLat, currentLng, stop.lat, stop.lng);
    const hours = distance / Math.max(avgSpeedKph, 1); // Avoid div zero
    const mins = Math.round(hours * 60);

    return {
      city: stop.city,
      distanceKm: distance.toFixed(1),
      estimatedMins: mins,
      predictedArrival: new Date(new Date().getTime() + mins * 60000).toISOString()
    };
  });
}
