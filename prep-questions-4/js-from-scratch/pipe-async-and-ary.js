// Series 4 · 2.9 pipeAsync(...fns) and ary(fn, n)
// (Series 1-3: 2.9 curry / compose + pipe / partial + once. Concept: higher-order functions.)
//
//   - pipeAsync(f, g, h) returns an async function: it calls f with all its arguments, then passes each
//     result to the next function. Any function may return a plain value or a promise. If one throws or
//     rejects, the returned promise rejects. pipeAsync() with no functions resolves with its first
//     argument.
//   - ary(fn, n) returns a function that calls fn with only its first n arguments, ignoring the rest.
//     This fixes the classic trap ['1', '2', '3'].map(parseInt) -> [1, NaN, NaN], because map passes
//     (value, index, array) and parseInt reads the index as a radix.
//
// example input:  ['1', '2', '3'].map(ary(parseInt, 1))
// example output: [1, 2, 3]
// example input:  await pipeAsync(fetchUser, (u) => u.name, (n) => n.toUpperCase())(1)
// example output: 'ADA'

const pipeAsync = (...fns) => {
  // your solution here
};

const ary = (fn, n) => {
  // your solution here
};

export { pipeAsync, ary };
