// Series 3 · 5.4 Fixed-window rate limiter with headers
// (Series 1: 5.4 sliding window · Series 2: 5.4 token bucket. Concept: rate limiting.)
//
// Implement a fixed-window limiter that also tells clients when to retry. Then compare it with sliding
// windows and token buckets: what happens to a burst at the edge of a window?
//   - new FixedWindowLimiter({ limit, windowMs, now = Date.now }). Use the injected now() for time.
//   - Windows are aligned to multiples of windowMs: the window holding time t starts at
//     Math.floor(t / windowMs) * windowMs. Each key's count starts again at 0 in every new window.
//   - check(key) returns { allowed, remaining, retryAfterMs }:
//       allowed: true while the key has made fewer than `limit` allowed requests this window (and then
//         counts this one), otherwise false. Blocked requests are not counted;
//       remaining: how many more requests are allowed this window (never below 0);
//       retryAfterMs: 0 when allowed; when blocked, the ms left until the next window starts.
//   - rateLimitHeaders(result, limit) returns the HTTP headers for a result:
//       { 'X-RateLimit-Limit': String(limit), 'X-RateLimit-Remaining': String(result.remaining) }
//     plus 'Retry-After' (whole seconds, rounded up, as a string) when the request was blocked.
//
// example input:  const l = new FixedWindowLimiter({ limit: 2, windowMs: 1000 }); l.check('ip'); l.check('ip'); l.check('ip');
// example output: { allowed: true, remaining: 1, ... }, { allowed: true, remaining: 0, ... }, { allowed: false, remaining: 0, retryAfterMs: <ms to next window> }

class FixedWindowLimiter {
  constructor({ limit, windowMs, now = Date.now }) {
    // your solution here
  }

  check(key) {
    // your solution here
  }
}

const rateLimitHeaders = (result, limit) => {
  // your solution here
};

export { FixedWindowLimiter, rateLimitHeaders };
