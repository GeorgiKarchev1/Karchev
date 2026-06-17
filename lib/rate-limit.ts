import { NextRequest } from 'next/server'

/**
 * Lightweight in-memory fixed-window rate limiter.
 *
 * Note: state lives in a single serverless instance's memory, so under a large
 * distributed flood Vercel may spread requests across instances and weaken the
 * limit. It still effectively throttles a single attacker hammering one endpoint
 * (the common abuse case) with zero extra infra. For strict global limits,
 * swap the store for Upstash Redis (@upstash/ratelimit).
 */

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

export function getClientIp(req: NextRequest): string {
  // Prefer the platform-set header (Vercel writes the real client IP to
  // x-real-ip and overwrites it on every request). x-forwarded-for is
  // client-controllable, so it's only a last-resort fallback.
  const real = req.headers.get('x-real-ip')
  if (real) return real.trim()
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return 'unknown'
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  retryAfter: number // seconds until the window resets
}

/**
 * @param key       unique bucket key (e.g. `submit-lead:<ip>`)
 * @param limit     max requests allowed per window
 * @param windowMs  window length in milliseconds
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()
  const existing = buckets.get(key)

  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { success: true, remaining: limit - 1, retryAfter: 0 }
  }

  if (existing.count >= limit) {
    return {
      success: false,
      remaining: 0,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    }
  }

  existing.count += 1
  return { success: true, remaining: limit - existing.count, retryAfter: 0 }
}

// Opportunistically drop expired buckets so the Map can't grow unbounded.
let lastSweep = Date.now()
export function maybeSweep(): void {
  const now = Date.now()
  if (now - lastSweep < 60_000) return
  lastSweep = now
  buckets.forEach((bucket, key) => {
    if (now >= bucket.resetAt) buckets.delete(key)
  })
}
