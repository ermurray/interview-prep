// 2.9 curry(fn). curry(sum3)(1)(2)(3), curry(sum3)(1, 2)(3) and curry(sum3)(1)(2, 3) all return the same result.
// example input:  const sum3 = (a, b, c) => a + b + c; curry(sum3)(1)(2, 3)
// example output: 6

const curry = (fn) => {
  // your solution here
};

export { curry };
