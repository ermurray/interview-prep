// Series 2 · 2.1 debouncePromise(fn, wait)
// (Series 1 counterpart: 2.1 debounce. Concept: timers + closures.)
//
// Like a trailing debounce, but every call returns a promise. All calls in one burst share one result.
//   - Each call resets a wait ms timer. When the timer fires, fn runs ONCE, with the last call's
//     arguments and this.
//   - Every promise returned during that burst resolves with fn's result (or rejects with its error).
//     fn may return a plain value or a promise.
//   - A burst ends when its timer fires. A call after that starts a new burst with its own result, even
//     if fn from the previous burst is still running.
// Use setTimeout for timing (the tests mock it).
//
// example input:
//   const search = debouncePromise((q) => fetchResults(q), 300);
//   const a = search('re'); const b = search('rea'); const c = search('react');
// example output: fetchResults runs once, with 'react'; a, b and c all resolve with its result

const debouncePromise = (fn, wait) => {
  // your solution here
};

export { debouncePromise };
