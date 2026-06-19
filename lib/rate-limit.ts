/**
 * Tiny in-memory rate limiter for form route handlers.
 * Good enough to slow casual abuse on a single instance. For serverless at scale,
 * swap for a shared store (Upstash Redis) later. Keyed by IP + bucket name.
 */

type Hit = { count: number; resetAt: number };
const store = new Map<string, Hit>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): { ok: boolean; remaining: number } {
  const now = Date.now();
  const hit = store.get(key);

  if (!hit || now > hit.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  hit.count += 1;
  if (hit.count > limit) return { ok: false, remaining: 0 };
  return { ok: true, remaining: limit - hit.count };
}

/** Best effort client IP from common proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return headers.get("x-real-ip") || "unknown";
}
