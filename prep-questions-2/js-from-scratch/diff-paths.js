// Series 2 · 2.7 diffPaths(a, b)
// (Series 1 counterpart: 2.7 deepEqual. Concept: recursive structural comparison.)
//
// Return a sorted array of the dot-paths where a and b differ.
//   - Walk plain objects and arrays together; array indexes are path segments ('list.0').
//   - A leaf (anything that is not a plain object or array) is compared with Object.is, except that
//     0 and -0 count as equal.
//   - A key present on one side only is a difference at that key's path.
//   - If one side has an object/array and the other has a leaf (or the other kind of container), report
//     just that path; don't descend into it.
//   - Equal inputs give [].
//
// example input:  diffPaths({ a: 1, b: { c: 2, d: 3 }, list: [1, 2] }, { a: 1, b: { c: 5 }, e: 1, list: [1, 3] })
// example output: ['b.c', 'b.d', 'e', 'list.1']

const diffPaths = (a, b) => {
  // your solution here
};

export { diffPaths };
