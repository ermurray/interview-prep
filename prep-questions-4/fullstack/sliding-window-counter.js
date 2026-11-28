// Series 4 · 5.4 Sliding-window counter rate limiter
// (Series 1-3: 5.4 sliding window log / token bucket / fixed window. Concept: rate limiting.)
//
// The sliding window log (series 1) is exact but stores a timestamp per request. The fixed window
// (series 3) is cheap but lets through 2x the limit at a window edge. The sliding window counter is
// the compromise many API gateways use: two counters per key, and a weighted estimate.
//   - new SlidingWindowCounter({ limit, windowMs, now = Date.now }). Use the injected now() for time.
//   - Windows are aligned to multiples of windowMs, as in the fixed window. Keep the count of allowed
//     requests in the current window and in the previous one.
//   - estimate(key) = previousCount * (1 - elapsed / windowMs) + currentCount, where elapsed is how far
//     now is into the current window. If the previous window is not the one just before the current one
//     (the key was idle for a whole window or more), previousCount is 0.
//   - allow(key): if estimate(key) < limit, count this request in the current window and return true;
//     otherwise return false. Rejected requests are not counted.
//   - estimate(key) on its own never counts a request.
//
// example input:
//   limit 10, windowMs 1000. 10 requests at t = 500, then requests at t = 1250
// example output: at t = 1250 the estimate starts at 10 * 0.75 = 7.5, so 3 more are allowed (7.5, 8.5, 9.5)

class SlidingWindowCounter {
  constructor({ limit, windowMs, now = Date.now }) {
    // your solution here
  }

  estimate(key) {
    // your solution here
  }

  allow(key) {
    // your solution here
  }
}

export { SlidingWindowCounter };
