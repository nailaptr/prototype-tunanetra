interface RateLimitInfo {
  count: number;
  resetAt: number;
}

// In-memory store for rate limiting. 
// In a real production app with multiple instances, use Redis or DB.
const limits = new Map<string, RateLimitInfo>();

export function checkRateLimit(userId: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const userLimit = limits.get(userId);

  if (!userLimit || now > userLimit.resetAt) {
    limits.set(userId, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (userLimit.count >= limit) {
    return false;
  }

  userLimit.count += 1;
  return true;
}
