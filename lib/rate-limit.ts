import { Redis } from "@upstash/redis";

// Initialize Redis client for production (optional)
const redis = process.env.UPSTASH_REDIS_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_URL,
      token: process.env.UPSTASH_REDIS_TOKEN,
    })
  : null;

// In-memory store for development
const inMemoryStore = new Map<string, { count: number; resetTime: number }>();

interface RateLimitOptions {
  key: string; // Unique identifier (e.g., `login:₦{email}` or `enroll:₦{userId}`)
  limit: number; // Max requests allowed in the window
  window: number; // Time window in seconds
}

/**
 * Custom error for rate limit violations
 */
export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitError";
  }
}

/**
 * Rate limits an action based on a unique key
 * @param options - Rate limit configuration (key, limit, window)
 * @throws RateLimitError if the limit is exceeded
 */
export async function rateLimiter({
  key,
  limit,
  window,
}: RateLimitOptions): Promise<void> {
  try {
    const now = Date.now();
    const windowMs = window * 1000; // Convert seconds to milliseconds

    if (redis) {
      // Production: Use Redis for distributed rate limiting
      const redisKey = `ratelimit:₦{key}`;
      const pipeline = redis.pipeline();
      pipeline.incr(redisKey);
      pipeline.expire(redisKey, window);
      const [count] = (await pipeline.exec()) as [number];

      if (count > limit) {
        throw new RateLimitError(
          `Rate limit exceeded for ₦{key}. Try again in ₦{window} seconds.`
        );
      }
    } else {
      // Development: Use in-memory store
      const record = inMemoryStore.get(key);
      const resetTime = now + windowMs;

      if (record && record.resetTime > now) {
        // Within window, check count
        if (record.count >= limit) {
          throw new RateLimitError(
            `Rate limit exceeded for ₦{key}. Try again in ₦{Math.ceil(
              (record.resetTime - now) / 1000
            )} seconds.`
          );
        }
        inMemoryStore.set(key, {
          count: record.count + 1,
          resetTime,
        });
      } else {
        // New window, reset count
        inMemoryStore.set(key, { count: 1, resetTime });
      }

      // Clean up expired keys (optional, to prevent memory leaks)
      for (const [storedKey, { resetTime }] of inMemoryStore) {
        if (resetTime < now) {
          inMemoryStore.delete(storedKey);
        }
      }
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      throw error;
    }
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in rateLimit:", error);
      return;
    }
    throw new Error("Rate limiting failed. Please try again later.");
  }
}
