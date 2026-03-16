import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { redis } from "@/lib/redis";

/**
 * Task 46: Uptime Monitoring / Health Check
 */
export async function GET() {
  const timestamp = new Date().toISOString();
  const status: any = {
    status: "UP",
    timestamp,
    services: {
      database: "DOWN",
      redis: "DOWN",
    },
  };

  try {
    // Check Database
    await db.$queryRaw`SELECT 1`;
    status.services.database = "UP";
  } catch (error: any) {
    status.status = "DEGRADED";
    status.services.database = `ERROR: ${error.message}`;
  }

  try {
    // Check Redis
    if (redis) {
      await redis.ping();
      status.services.redis = "UP";
    } else {
      status.services.redis = "DISABLED";
    }
  } catch (error: any) {
    status.status = "DEGRADED";
    status.services.redis = `ERROR: ${error.message}`;
  }

  const statusCode = status.status === "UP" ? 200 : 503;
  return NextResponse.json(status, { status: statusCode });
}
