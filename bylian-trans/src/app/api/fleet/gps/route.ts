import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { setCache } from "@/lib/redis";
import { REDIS_KEYS } from "@/lib/constants";

/**
 * Bus GPS Ingest API (Task 24 & 29)
 * Used by physical GPS devices or driver app to POST location data
 */
export async function POST(request: Request) {
  try {
    // 1. Validate API Key (Optional but recommended, using a simple header for now)
    const apiKey = request.headers.get("x-gps-key");
    if (apiKey !== process.env.GPS_INGEST_KEY && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { busId, latitude, longitude, speed, heading } = body;

    if (!busId || latitude === undefined || longitude === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Persist to Postgres (Audit Trail / Task 24)
    const location = await db.busLocation.create({
      data: {
        busId,
        latitude,
        longitude,
        speed: speed || 0,
        heading: heading || 0,
      }
    });

    // 3. Update Current Bus Status (Task 24)
    await db.busStatus.upsert({
      where: { busId },
      update: {
        currentLat: latitude,
        currentLng: longitude,
        lastUpdate: new Date(),
        statusText: speed > 5 ? "Berjalan" : "Berhenti"
      },
      create: {
        busId,
        currentLat: latitude,
        currentLng: longitude,
        lastUpdate: new Date(),
        statusText: "Berjalan"
      }
    });

    // 4. Cache in Redis for ultra-fast tracking (Task 29)
    await setCache(`${REDIS_KEYS.BUS_LOCATION}:${busId}`, {
      lat: latitude,
      lng: longitude,
      speed: speed || 0,
      heading: heading || 0,
      updatedAt: new Date().toISOString()
    }, 60); // 1 minute TTL for safety, but usually overwritten every few seconds

    // 5. Task 32: Speeding Monitor
    if (speed > 100) {
      console.warn(`[Alert] Bus ${busId} is speeding: ${speed} km/h`);
      // Here we could trigger a notification or audit log
    }

    return NextResponse.json({ success: true, timestamp: location.timestamp });
  } catch (error: any) {
    console.error("GPS Ingest Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
