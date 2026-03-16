import { redis } from "./redis";

/**
 * Simple Fixed Window Rate Limiter using Redis
 * @param identifier Unique ID (IP address, User ID)
 * @param limit Max requests allowed in the window
 * @param windowSeconds Window size in seconds
 */
export async function rateLimit(
  identifier: string,
  limit: number = 10,
  windowSeconds: number = 60
) {
  if (!redis) return { success: true, remaining: limit, reset: 0 };

  const key = `ratelimit:${identifier}`;
  
  try {
    const current = await redis.get<number>(key);
    
    if (current !== null && current >= limit) {
      const ttl = await redis.ttl(key);
      return { 
        success: false, 
        remaining: 0, 
        reset: ttl > 0 ? ttl : windowSeconds 
      };
    }

    const multi = redis.multi();
    multi.incr(key);
    if (current === null) {
      multi.expire(key, windowSeconds);
    }
    
    const results = await multi.exec();
    const newCount = results[0] as number;

    return {
      success: true,
      remaining: Math.max(0, limit - newCount),
      reset: windowSeconds
    };
  } catch (error) {
    console.error("Rate Limit Error:", error);
    // Fail open in case of Redis issues to avoid blocking real users
    return { success: true, remaining: 1, reset: 0 };
  }
}
