// Series 3 · 2.10 setPath(obj, path, value) and omit(obj, keys)
// (Series 1: 2.10 flatten · Series 2: 2.10 unflattenObject / getPath. Concept: working with nested paths, immutably.)
//
//   - setPath returns a NEW object with the value at path set, and never changes obj. Only the objects and
//     arrays along the path are copied; everything else is shared with the original (structural sharing,
//     like an immutable update in Redux).
//   - The path uses dots and [index] brackets: 'a.b[0].c'. Missing containers along the way are created:
//     an array if the next segment is a number, otherwise a plain object.
//   - omit(obj, keys) returns a shallow copy of obj without the listed top-level keys.
//
// example input:  setPath({ user: { name: 'ada' }, tags: [] }, 'user.address.city', 'London')
// example output: { user: { name: 'ada', address: { city: 'London' } }, tags: [] } (tags is the same array)

const setPath = (obj, path, value) => {
  // your solution here
};

const omit = (obj, keys) => {
  // your solution here
};

export { setPath, omit };
