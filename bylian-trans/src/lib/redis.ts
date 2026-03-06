import { Redis } from '@upstash/redis';

// Initialize Redis client only if env vars are present (prevents crash in build/dev before setup)
export const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
export const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis = (redisUrl && redisToken)
    ? new Redis({
        url: redisUrl,
        token: redisToken,
    })
    : null;

/** Helper safely sets a value in redis if connection exists */
export async function setCache(key: string, value: any, ttlSeconds?: number) {
    if (!redis) return false;
    try {
        if (ttlSeconds) {
            await redis.setex(key, ttlSeconds, JSON.stringify(value));
        } else {
            await redis.set(key, JSON.stringify(value));
        }
        return true;
    } catch (error) {
        console.error("Redis Set Error:", error);
        return false;
    }
}

/** Helper safely gets a value from redis if connection exists */
export async function getCache<T>(key: string): Promise<T | null> {
    if (!redis) return null;
    try {
        const data = await redis.get(key);
        if (!data) return null;
        return typeof data === 'string' ? JSON.parse(data) : data;
    } catch (error) {
        console.error("Redis Get Error:", error);
        return null;
    }
}

/** Delete a cache key */
export async function deleteCache(key: string) {
    if (!redis) return false;
    try {
        await redis.del(key);
        return true;
    } catch (error) {
        console.error("Redis Del Error:", error);
        return false;
    }
}
