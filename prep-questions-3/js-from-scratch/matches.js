// Series 3 · 2.7 matches(object, pattern)
// (Series 1: 2.7 deepEqual · Series 2: 2.7 diffPaths. Concept: recursive structural comparison.)
//
// Return true if object partially matches pattern, like lodash's isMatch or Jest's toMatchObject.
//   - Plain objects match partially: every key in pattern must be in object, and its value must match.
//     The object may have extra keys. An empty pattern {} matches any object.
//   - Arrays must have the same length, and each element must match the pattern's element (so objects
//     inside arrays match partially too).
//   - Dates match when they hold the same time.
//   - Anything else is compared like Object.is, except that 0 and -0 match. NaN matches NaN.
//   - An array never matches a plain object (or the other way round).
//
// example input:  matches({ id: 1, user: { name: 'ada', role: 'admin' }, tags: ['x'] }, { user: { role: 'admin' } })
// example output: true

const matches = (object, pattern) => {
  // your solution here
};

export { matches };
