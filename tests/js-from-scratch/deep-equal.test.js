import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { deepEqual } = await load('js-from-scratch', 'deep-equal');

test('primitives', () => {
  assert.equal(deepEqual(1, 1), true);
  assert.equal(deepEqual('a', 'b'), false);
  assert.equal(deepEqual(1, '1'), false);
  assert.equal(deepEqual(null, undefined), false);
  assert.equal(deepEqual(null, null), true);
});
test('NaN equals NaN', () => assert.equal(deepEqual(NaN, NaN), true));
test('0 equals -0', () => assert.equal(deepEqual(0, -0), true));
test('key order does not matter', () => assert.equal(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 }), true));
test('nested example from the question', () =>
  assert.equal(deepEqual({ a: [1, { b: NaN }], c: 2 }, { c: 2, a: [1, { b: NaN }] }), true));
test('different nested value', () => assert.equal(deepEqual({ a: { b: [1, 2] } }, { a: { b: [1, 3] } }), false));
test('extra key', () => assert.equal(deepEqual({ a: 1 }, { a: 1, b: undefined }), false));
test('array vs object', () => assert.equal(deepEqual([1], { 0: 1 }), false));
test('array length', () => assert.equal(deepEqual([1, 2], [1, 2, 3]), false));
test('null vs object', () => assert.equal(deepEqual(null, {}), false));
test('Dates compare by time', () => {
  assert.equal(deepEqual(new Date(5), new Date(5)), true);
  assert.equal(deepEqual(new Date(5), new Date(6)), false);
});

// ---- more edge cases ----
test('empty object vs empty array -> false', () => assert.equal(deepEqual({}, []), false));
test('empty containers equal themselves', () => {
  assert.equal(deepEqual({}, {}), true);
  assert.equal(deepEqual([], []), true);
});
test('array order matters', () => assert.equal(deepEqual([1, 2], [2, 1]), false));
test('deeply nested arrays', () => assert.equal(deepEqual([1, [2, [3, [4]]]], [1, [2, [3, [4]]]]), true));
test('NaN nested inside arrays', () => assert.equal(deepEqual([NaN, { a: [NaN] }], [NaN, { a: [NaN] }]), true));
test('number vs array containing it -> false', () => assert.equal(deepEqual(1, [1]), false));
test('undefined vs null nested -> false', () => assert.equal(deepEqual({ a: undefined }, { a: null }), false));
test('same keys, one value differs deep down', () =>
  assert.equal(deepEqual({ a: { b: { c: { d: 1 } } } }, { a: { b: { c: { d: 2 } } } }), false));
test('a Date vs a plain object -> false', () => assert.equal(deepEqual(new Date(0), {}), false));
