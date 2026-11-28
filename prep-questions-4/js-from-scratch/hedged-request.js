// Series 4 · 2.5 hedge(fn, { delayMs, maxAttempts })
// (Series 1-3: 2.5 retry / pollUntil / circuit breaker. Concept: resilient async calls. Hedging cuts tail latency.)
//
// Start a request, and if it hasn't answered after delayMs, start a backup one too, then take whichever
// answers first.
//   - fn(attempt) starts attempt number 0, 1, 2, ... and returns a promise.
//   - Attempt 0 starts straight away. While nothing has succeeded, another attempt starts every delayMs,
//     up to maxAttempts attempts in total.
//   - If an attempt fails, the next one starts straight away (no need to wait for the timer), as long as
//     attempts remain.
//   - Resolve with the first attempt to succeed; later results are ignored and no new attempts start.
//   - If every attempt fails, reject with the error of the attempt that failed last.
//
// example input:  hedge((i) => fetchFromReplica(i), { delayMs: 50, maxAttempts: 3 })
// example output: replica 0 at 0ms; if it's slow, replica 1 at 50ms; the first answer wins

const hedge = (fn, { delayMs = 100, maxAttempts = 2 } = {}) => {
  // your solution here
};

export { hedge };
