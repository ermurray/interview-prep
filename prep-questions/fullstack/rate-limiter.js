// 5.4 Rate limiter. Implement an in-memory sliding-window or token-bucket limiter as middleware. Then explain
//  how you'd make it work across multiple instances (Redis, atomic ops).
//  - RateLimiter({ limit, windowMs, now = Date.now }).allow(key) returns true if the request is allowed.
//    Sliding window: at most `limit` allowed requests per key in any `windowMs` window. Rejected requests
//    do not count against the limit. Use the injected `now()` for time.
//  - rateLimitMiddleware(limiter, keyFn = req => req.ip) returns Express-style (req, res, next):
//    allowed -> next(); blocked -> res.status(429).send('Too Many Requests').
// example input:  const rl = new RateLimiter({ limit: 2, windowMs: 1000 }); rl.allow('a'); rl.allow('a'); rl.allow('a');
// example output: true, true, false

class RateLimiter {
  constructor({ limit, windowMs, now = Date.now }) {
    // your solution here
  }

  allow(key) {
    // your solution here
  }
}

const rateLimitMiddleware = (limiter, keyFn = (req) => req.ip) => {
  // your solution here
};

export { RateLimiter, rateLimitMiddleware };
