// Series 4 · 2.7 applyPatch(doc, operations)
// (Series 1-3: 2.7 deepEqual / diffPaths / matches. Concept: describing and applying changes to nested data.)
//
// Apply a list of JSON Patch operations (a subset of RFC 6902) to a document, without changing it:
// return a new document that shares every part the patch didn't touch.
//   - Each operation is { op, path, value? }. The path is a JSON Pointer: '/user/name' or '/items/0'.
//     In a segment, '~1' means '/' and '~0' means '~'.
//   - add: on an object, sets the key. On an array, inserts at that index (shifting later elements);
//     the index '-' appends to the end.
//   - remove: deletes the key, or removes the array element (shifting later ones).
//   - replace: sets an existing key or index. It must already exist.
//   - Operations are applied in order, each to the result of the one before.
//   - Throw an Error (and return nothing) if a path's parent doesn't exist, a remove or replace target
//     is missing, or an array index is out of range.
//
// example input:  applyPatch({ todos: ['a'] }, [{ op: 'add', path: '/todos/-', value: 'b' }, { op: 'replace', path: '/todos/0', value: 'A' }])
// example output: { todos: ['A', 'b'] }

const applyPatch = (doc, operations) => {
  // your solution here
};

export { applyPatch };
