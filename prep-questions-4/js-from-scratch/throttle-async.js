// Series 4 · 2.2 throttleAsync(fn, intervalMs)
// (Series 1-3: 2.2 throttle / timeout / delay. Concept: spacing out async calls in time.)
//
// Wrap an async function so its calls start at most once every intervalMs, like a client keeping under
// an API's rate limit. Unlike throttle, no call is dropped: they queue up.
//   - Each call returns a promise that settles with that call's own result.
//   - Calls start in the order they were made. The first starts immediately; each later one starts
//     intervalMs after the previous one STARTED (not after it finished).
//   - After a quiet period, the next call starts immediately again.
//   - A call that rejects doesn't stop the queue.
// Use setTimeout and Date.now() for timing (the tests mock both).
//
// example input:  const get = throttleAsync(fetchJson, 100); get('/a'); get('/b'); get('/c');
// example output: fetchJson('/a') starts at 0ms, '/b' at 100ms, '/c' at 200ms

const throttleAsync = (fn, intervalMs) => {
  // your solution here
};

export { throttleAsync };
