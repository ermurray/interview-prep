// Series 2 · 5.4 Token-bucket rate limiter
// (Series 1 counterpart: 5.4 Sliding-window rate limiter. Concept: rate limiting.)
//
// Implement a token bucket. Then explain how it differs from a sliding window (bursts), and how you'd
// share one bucket across many server instances.
//   - new TokenBucket({ capacity, refillPerSecond, now = Date.now }): the bucket starts full, holding
//     `capacity` tokens.
//   - Tokens are added continuously at refillPerSecond (fractions included), and never above capacity.
//     Use the injected now() for time.
//   - tryRemove(count = 1): if the bucket holds at least count tokens, remove them and return true;
//     otherwise remove nothing and return false.
//   - tokens (getter): the current number of tokens, after refilling.
//
// example input:  const b = new TokenBucket({ capacity: 2, refillPerSecond: 1 }); b.tryRemove(); b.tryRemove(); b.tryRemove();
// example output: true, true, false; one second later, tryRemove() is true again

class TokenBucket {
  constructor({ capacity, refillPerSecond, now = Date.now }) {
    // your solution here
  }

  get tokens() {
    // your solution here
  }

  tryRemove(count = 1) {
    // your solution here
  }
}

export { TokenBucket };
