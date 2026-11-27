// Series 2 · 2.6 deepMerge(target, source)
// (Series 1 counterpart: 2.6 deepClone. Concept: recursive walks over objects.)
//
// Return a NEW object that combines target and source. Neither input may be changed.
//   - If both sides have a plain object at the same key, merge them recursively.
//   - Otherwise the source value wins. Arrays are replaced, not merged.
//   - Keys whose value in source is undefined are skipped (the target value stays).
//   - The result must not share nested plain objects with source or target (changing the result must
//     never change an input).
//
// example input:  deepMerge({ a: 1, b: { c: 2, d: [1, 2] } }, { b: { d: [3], e: 4 }, f: 5 })
// example output: { a: 1, b: { c: 2, d: [3], e: 4 }, f: 5 }

const deepMerge = (target, source) => {
  // your solution here
};

export { deepMerge };
