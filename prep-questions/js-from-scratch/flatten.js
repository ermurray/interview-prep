// 2.10 flatten(arr, depth = Infinity). Recursive and iterative versions. Then flatten a nested object into
//  dot-path keys: { a: { b: 1 } } -> { 'a.b': 1 }.
// example input:  flatten([1, [2, [3, [4]]]], 1)
// example output: [1, 2, [3, [4]]]
// example input:  flattenObject({ a: { b: 1, c: { d: 2 } }, e: 3 })
// example output: { 'a.b': 1, 'a.c.d': 2, e: 3 }

const flatten = (arr, depth = Infinity) => {
  // your solution here
};

const flattenObject = (obj) => {
  // your solution here
};

export { flatten, flattenObject };
