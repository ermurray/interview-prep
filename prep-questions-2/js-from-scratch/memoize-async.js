// Series 2 · 2.11 memoizeAsync(fn, { ttlMs, resolver })
// (Series 1 counterpart: 2.11 memoize. Concept: caching, now with promises and expiry.)
//
// Memoize an async function.
//   - The cache key is the first argument by default, or resolver(...args) if given.
//   - Calls with the same key while a call is still in flight share the same promise (fn runs once).
//   - A resolved value is cached for ttlMs milliseconds (default Infinity), measured with Date.now()
//     (the tests mock it). After that, the next call runs fn again.
//   - Rejections are NOT cached: once the promise rejects, the next call with that key runs fn again.
//
// example input:
//   const getUser = memoizeAsync((id) => fetchUser(id), { ttlMs: 60000 });
//   await Promise.all([getUser(1), getUser(1)]);
// example output: fetchUser runs once; both calls get the same user

const memoizeAsync = (fn, { ttlMs = Infinity, resolver } = {}) => {
  // your solution here
};

export { memoizeAsync };
