// Series 3 · 2.2 delay(ms, { value, signal })
// (Series 1: 2.2 throttle · Series 2: 2.2 timeout. Concept: timers, promises and AbortSignal.)
//
// Return a promise that resolves with `value` (default undefined) after ms milliseconds.
//   - If signal is already aborted, reject straight away with signal.reason, without starting a timer.
//   - If signal aborts while waiting, clear the timer and reject with signal.reason.
//   - Remove the abort listener once the promise settles, so signals reused across many delays don't
//     pile up listeners.
//
// example input:  const ac = new AbortController(); const p = delay(1000, { value: 'done', signal: ac.signal }); ac.abort(new Error('cancelled'));
// example output: p rejects straight away with the 'cancelled' error

const delay = (ms, { value, signal } = {}) => {
  // your solution here
};

export { delay };
