import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { deepMerge } = await load('js-from-scratch', 'deep-merge');

test('example from the question', () =>
  assert.deepEqual(deepMerge({ a: 1, b: { c: 2, d: [1, 2] } }, { b: { d: [3], e: 4 }, f: 5 }), { a: 1, b: { c: 2, d: [3], e: 4 }, f: 5 }));
test('source wins for leaves', () => assert.deepEqual(deepMerge({ a: 1 }, { a: 2 }), { a: 2 }));
test('object replaces a leaf and vice versa', () => {
  assert.deepEqual(deepMerge({ a: 1 }, { a: { b: 1 } }), { a: { b: 1 } });
  assert.deepEqual(deepMerge({ a: { b: 1 } }, { a: null }), { a: null });
});
test('undefined in source is skipped', () => assert.deepEqual(deepMerge({ a: 1, b: 2 }, { a: undefined }), { a: 1, b: 2 }));
test('inputs are not mutated', () => {
  const target = { a: { b: 1 } };
  const source = { a: { c: 2 } };
  deepMerge(target, source);
  assert.deepEqual(target, { a: { b: 1 } });
  assert.deepEqual(source, { a: { c: 2 } });
});
test('result does not share nested objects with the inputs', () => {
  const target = { x: { y: 1 } };
  const source = { z: { w: 2 } };
  const out = deepMerge(target, source);
  out.x.y = 99;
  out.z.w = 99;
  assert.equal(target.x.y, 1);
  assert.equal(source.z.w, 2);
});
test('deeply nested', () =>
  assert.deepEqual(deepMerge({ a: { b: { c: { d: 1 } } } }, { a: { b: { c: { e: 2 } } } }), { a: { b: { c: { d: 1, e: 2 } } } }));
