// Series 4 · 2.12 Polyfills: flatMap, Object.assign, includes and Object.fromEntries
// (Series 1-3: 2.12 bind/reduce/Promise · call/apply/map/filter/new · instanceof/create/from/finally.
// Concept: how the built-ins work underneath.)
//
//   - myFlatMap(callback, thisArg) is written as if installed on Array.prototype (`this` is the
//     array): map each element with callback(value, index, array), then flatten ONE level.
//   - myAssign(target, ...sources) does what Object.assign does: copies each source's own enumerable
//     properties (string AND symbol keys) onto target, later sources winning, and returns target.
//     null and undefined sources are skipped. A null or undefined target throws a TypeError.
//   - myIncludes(value, fromIndex) is written as if installed on Array.prototype: true if the array has
//     value at or after fromIndex (default 0; a negative fromIndex counts from the end). Unlike indexOf,
//     it finds NaN (SameValueZero), and 0 and -0 count as equal.
//   - myFromEntries(iterable) does what Object.fromEntries does: builds an object from [key, value]
//     pairs in any iterable (an array of pairs, a Map, a generator). Later keys win.
//
// example input:  myFlatMap.call(['a b', 'c'], (s) => s.split(' '))
// example output: ['a', 'b', 'c']
// example input:  myIncludes.call([1, NaN], NaN)
// example output: true

function myFlatMap(callback, thisArg) {
  // your solution here
}

const myAssign = (target, ...sources) => {
  // your solution here
};

function myIncludes(value, fromIndex) {
  // your solution here
}

const myFromEntries = (iterable) => {
  // your solution here
};

export { myFlatMap, myAssign, myIncludes, myFromEntries };
