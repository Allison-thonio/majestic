// Client-side Rate Limiter utility
// NOTE: In production, server-side rate limiting middleware must be added to API routes
// This is a client-side protection only and can be bypassed

const RateLimiter = {
  counts: {} as Record<string, number>,
  windows: {} as Record<string, number>,

  check(key: string, maxCalls: number, windowMs: number): boolean {
    const now = Date.now();
    if (!this.windows[key] || now - this.windows[key] > windowMs) {
      this.windows[key] = now;
      this.counts[key] = 0;
    }
    this.counts[key]++;
    return this.counts[key] <= maxCalls;
  },

  getRemainingTime(key: string, windowMs: number): number {
    const windowStart = this.windows[key];
    if (!windowStart) return 0;
    const elapsed = Date.now() - windowStart;
    return Math.max(0, windowMs - elapsed);
  },

  reset(key: string): void {
    delete this.counts[key];
    delete this.windows[key];
  },
};

export default RateLimiter;
