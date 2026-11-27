// Series 2 · 2.5 pollUntil(fn, { intervalMs, timeoutMs, signal })
// (Series 1 counterpart: 2.5 retry. Concept: async loops with delays, timeouts and AbortSignal.)
//
// Call fn (which may be async) repeatedly until it returns a truthy value, then resolve with that value.
//   - Call fn immediately, then wait intervalMs after each falsy result before calling it again.
//   - If timeoutMs passes without a truthy result, reject with an Error named 'TimeoutError'.
//   - If fn throws or rejects, stop and reject with that error.
//   - If signal is (or becomes) aborted, stop and reject (with signal.reason).
//
// example input:  pollUntil(() => getJob(id).then((j) => j.status === 'done' && j), { intervalMs: 1000, timeoutMs: 30000 })
// example output: resolves with the finished job, or rejects with a TimeoutError after 30s

const pollUntil = (fn, { intervalMs = 100, timeoutMs = Infinity, signal } = {}) => {
  // your solution here
};

export { pollUntil };
