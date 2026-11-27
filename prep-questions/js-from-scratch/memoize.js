// 2.11 memoize(fn, resolver?). Cache by a custom key; add an LRU size limit.
//  - Default cache key is the first argument; resolver(...args) returns a custom key.
//  - maxSize (default Infinity): when the cache is full, evict the least recently USED entry.
//  - Preserve `this` when calling fn.
// example input:  const slowSquare = memoize(n => n * n); slowSquare(4); slowSquare(4);
// example output: 16, 16 (the underlying function ran once)

const memoize = (fn, resolver, maxSize = Infinity) => {
  // your solution here
};

export { memoize };
