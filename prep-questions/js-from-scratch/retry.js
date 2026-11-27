// 2.5 retry(fn, { retries, backoffMs, signal }). Retry a failing async function with exponential backoff and
//  jitter. Make it abortable with an AbortSignal.
//  - fn is called up to retries + 1 times in total. Resolve with the first success; if every attempt fails,
//    reject with the last error.
//  - Delay before retry n (0-based) = backoffMs * 2 ** n + random jitter in [0, backoffMs).
//  - If signal is (or becomes) aborted, stop and reject (with signal.reason, or an AbortError).
// example input:  retry(flakyFetch, { retries: 3, backoffMs: 100 })   // fails twice, then succeeds
// example output: resolves with flakyFetch's result after ~100ms + ~200ms of backoff; 3 calls in total

const retry = (fn, { retries = 3, backoffMs = 100, signal } = {}) => {
  // your solution here
};

export { retry };
