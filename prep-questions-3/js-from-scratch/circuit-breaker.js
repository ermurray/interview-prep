// Series 3 · 2.5 createCircuitBreaker(fn, { failureThreshold, resetMs, now })
// (Series 1: 2.5 retry · Series 2: 2.5 pollUntil. Concept: resilient async calls.)
//
// Wrap an async function in a circuit breaker, so a failing dependency gets time to recover instead of
// being hammered with calls.
//   - breaker.call(...args) calls fn(...args) and settles the same way, while the circuit is 'closed'.
//   - Count consecutive failures. A success resets the count. When it reaches failureThreshold, the
//     circuit becomes 'open'.
//   - While 'open', call() rejects straight away with an Error named 'CircuitOpenError', without
//     calling fn.
//   - Once resetMs has passed since it opened, the circuit is 'half-open'. The next call() is a trial:
//     if it succeeds the circuit closes (count back to 0); if it fails, the circuit opens again for
//     another resetMs. Other calls made while the trial is running reject with CircuitOpenError.
//   - breaker.state is 'closed', 'open' or 'half-open'. Use the injected now() for time.
//
// example input:
//   const b = createCircuitBreaker(callPaymentApi, { failureThreshold: 3, resetMs: 30000 });
//   // three calls fail in a row
// example output: b.state is 'open'; the next call rejects with CircuitOpenError without calling the API

const createCircuitBreaker = (fn, { failureThreshold = 5, resetMs = 30000, now = Date.now } = {}) => {
  // your solution here
  // return { call(...args) {}, get state() {} };
};

export { createCircuitBreaker };
