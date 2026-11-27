// Series 3 · 2.11 createQueryCache({ staleMs, now }) with stale-while-revalidate
// (Series 1: 2.11 memoize · Series 2: 2.11 memoizeAsync. Concept: caching, the way React Query / SWR do it.)
//
// Build a cache for async data that serves stale data instantly while refreshing it in the background.
//   - cache.get(key, fetcher) returns a promise of the value:
//       - no entry: call fetcher(), cache the result, and resolve with it. Concurrent gets for the same
//         key share one fetch. A rejected fetch is not cached.
//       - fresh entry (fetched less than staleMs ago): resolve with the cached value. No fetch.
//       - stale entry: resolve with the cached (stale) value straight away AND start a background
//         refetch. Concurrent gets share that one refetch. When it succeeds, the cache is updated; if it
//         fails, the old value is kept.
//   - cache.getCached(key): the cached value, or undefined. Never fetches.
//   - cache.invalidate(key): forget the entry, so the next get fetches again.
//   - Use the injected now() for time.
//
// example input:
//   const cache = createQueryCache({ staleMs: 5000 });
//   await cache.get('todos', fetchTodos);   // fetches
//   await cache.get('todos', fetchTodos);   // fresh: served from the cache
// example output: fetchTodos runs once

const createQueryCache = ({ staleMs = 0, now = Date.now } = {}) => {
  // your solution here
  // return { get(key, fetcher) {}, getCached(key) {}, invalidate(key) {} };
};

export { createQueryCache };
