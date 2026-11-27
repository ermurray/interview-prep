// Series 3 · 2.9 partial(fn, ...args) with placeholders, and once(fn)
// (Series 1: 2.9 curry · Series 2: 2.9 compose / pipe. Concept: higher-order functions.)
//
//   - partial(fn, ...preset) returns a function that calls fn with the preset arguments first. A preset
//     argument can be the exported placeholder `_`: call-time arguments fill the placeholders from left to
//     right, and any left over are added at the end. Preserve `this`.
//       partial(f, _, 2)(1)        -> f(1, 2)
//       partial(f, 1, _, 3)(2, 4)  -> f(1, 2, 3, 4)
//   - once(fn) returns a function that calls fn the first time only, and afterwards returns the first
//     result without calling fn again. Preserve `this` and the arguments for that first call.
//
// example input:  const greet = (greeting, name) => greeting + ' ' + name; partial(greet, _, 'ada')('hi')
// example output: 'hi ada'

const _ = Symbol('placeholder'); // provided: use this as the placeholder, don't change it

const partial = (fn, ...preset) => {
  // your solution here
};

const once = (fn) => {
  // your solution here
};

export { _, partial, once };
