// Series 2 · 2.10 unflattenObject(obj) and getPath(obj, path, defaultValue)
// (Series 1 counterpart: 2.10 flatten / flattenObject. Concept: working with nested paths.)
//
//   - unflattenObject turns dot-path keys back into nested objects:
//     { 'a.b': 1, 'a.c': 2, d: 3 } -> { a: { b: 1, c: 2 }, d: 3 }. Values are copied as-is.
//   - getPath reads a nested value by path. The path can use dots and [index] brackets:
//     'a.b[0].c' means obj.a.b[0].c. If any step along the way is null or undefined, or the final value
//     is undefined, return defaultValue.
//
// example input:  unflattenObject({ 'user.name': 'ada', 'user.address.city': 'London', active: true })
// example output: { user: { name: 'ada', address: { city: 'London' } }, active: true }
// example input:  getPath({ a: { b: [{ c: 42 }] } }, 'a.b[0].c')
// example output: 42

const unflattenObject = (obj) => {
  // your solution here
};

const getPath = (obj, path, defaultValue) => {
  // your solution here
};

export { unflattenObject, getPath };
