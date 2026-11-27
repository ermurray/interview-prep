import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { flatten, flattenObject } = await load('js-from-scratch', 'flatten');

test('flatten fully by default', () => assert.deepEqual(flatten([1, [2, [3, [4]]]]), [1, 2, 3, 4]));
test('flatten depth 1', () => assert.deepEqual(flatten([1, [2, [3, [4]]]], 1), [1, 2, [3, [4]]]));
test('flatten depth 2', () => assert.deepEqual(flatten([1, [2, [3, [4]]]], 2), [1, 2, 3, [4]]));
test('flatten depth 0 is a shallow copy', () => {
  const src = [1, [2]];
  const out = flatten(src, 0);
  assert.deepEqual(out, [1, [2]]);
  assert.notEqual(out, src);
});
test('flatten empty and nested-empty arrays', () => assert.deepEqual(flatten([[], [[]], 1]), [1]));
test('flatten does not mutate input', () => {
  const src = [1, [2, [3]]];
  flatten(src);
  assert.deepEqual(src, [1, [2, [3]]]);
});
test('flatten very deep nesting', () => {
  let deep = [1];
  for (let i = 0; i < 1000; i++) deep = [deep];
  assert.deepEqual(flatten(deep), [1]);
});

test('flattenObject: { a: { b: 1 } } -> { "a.b": 1 }', () => assert.deepEqual(flattenObject({ a: { b: 1 } }), { 'a.b': 1 }));
test('flattenObject: example from the question', () =>
  assert.deepEqual(flattenObject({ a: { b: 1, c: { d: 2 } }, e: 3 }), { 'a.b': 1, 'a.c.d': 2, e: 3 }));
test('flattenObject keeps falsy leaves', () =>
  assert.deepEqual(flattenObject({ a: { b: 0, c: null, d: '' } }), { 'a.b': 0, 'a.c': null, 'a.d': '' }));
test('flattenObject on an empty object', () => assert.deepEqual(flattenObject({}), {}));

// ---- more edge cases ----
test('flatten keeps strings whole', () => assert.deepEqual(flatten(['ab', ['c', ['de']]]), ['ab', 'c', 'de']));
test('flatten keeps objects as they are', () => {
  const o = { a: [1] };
  const out = flatten([[o]]);
  assert.equal(out[0], o);
});
test('flatten an already-flat array', () => assert.deepEqual(flatten([1, 2, 3]), [1, 2, 3]));
test('flatten an empty array', () => assert.deepEqual(flatten([]), []));
test('flatten keeps falsy values', () => assert.deepEqual(flatten([0, [null, [undefined, ['']]], false]), [0, null, undefined, '', false]));
test('flattenObject: three levels deep', () =>
  assert.deepEqual(flattenObject({ a: { b: { c: { d: 1 } } } }), { 'a.b.c.d': 1 }));
test('flattenObject: an already-flat object is unchanged', () => assert.deepEqual(flattenObject({ a: 1, b: 'x' }), { a: 1, b: 'x' }));
