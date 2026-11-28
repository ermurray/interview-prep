// Series 4 · 2.11 memoizeWeak(fn)
// (Series 1-3: 2.11 memoize / memoizeAsync / query cache. Concept: caching, keyed on every argument and safe for memory.)
//
// Memoize a function of any number of arguments, using ALL of them as the key, without leaking memory
// for object arguments.
//   - Two calls hit the same cache entry only when they have the same number of arguments and each
//     argument is the same: primitives compared like a Map key (1 and '1' are different, NaN equals
//     NaN), objects and functions by identity.
//   - Object and function arguments must be held in WeakMaps, so a cached result never keeps an object
//     alive after the caller lets go of it. Primitive arguments go in Maps. (Hint: a tree of maps, one
//     level per argument.)
//   - Results are cached even when they are undefined.
//
// example input:
//   const area = memoizeWeak((shape, scale) => compute(shape) * scale);
//   area(circle, 2); area(circle, 2); area(circle, 3);
// example output: compute runs twice (once per distinct scale for that circle)

const memoizeWeak = (fn) => {
  // your solution here
};

export { memoizeWeak };
