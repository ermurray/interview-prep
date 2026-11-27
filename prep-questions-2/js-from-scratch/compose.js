// Series 2 · 2.9 compose(...fns) and pipe(...fns)
// (Series 1 counterpart: 2.9 curry. Concept: higher-order functions.)
//
//   - compose(f, g, h)(x) === f(g(h(x))): the functions run right to left.
//   - pipe(f, g, h)(x) === h(g(f(x))): the functions run left to right.
//   - The first function to run may take any number of arguments; the rest take one.
//   - With no functions, both return the identity function (x => x).
//   - Preserve `this` for the first function that runs.
//
// example input:  pipe((a, b) => a + b, (x) => x * 10, String)(1, 2)
// example output: '30'

const compose = (...fns) => {
  // your solution here
};

const pipe = (...fns) => {
  // your solution here
};

export { compose, pipe };
