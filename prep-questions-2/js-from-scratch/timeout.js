// Series 2 · 2.2 timeout(promise, ms)
// (Series 1 counterpart: 2.2 throttle. Concept: racing timers against async work.)
//
// Return a promise that settles the same way as `promise` if it settles within ms milliseconds.
// Otherwise, reject with an Error whose name is 'TimeoutError'.
//   - Clear the timer once `promise` settles, so it does not keep the process alive.
//   - Explain when you would reach for AbortSignal.timeout(ms) instead.
//
// example input:  timeout(fetchUser(), 50)    // fetchUser takes 200ms
// example output: rejects after ~50ms with an Error named 'TimeoutError'

const timeout = (promise, ms) => {
  // your solution here
};

export { timeout };
