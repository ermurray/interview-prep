import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { rotateArray } = await load('basic', 'rotate-array');

test('[1, 2, 3, 4, 5], 2 -> [4, 5, 1, 2, 3]', () => assert.deepEqual(rotateArray([1, 2, 3, 4, 5], 2), [4, 5, 1, 2, 3]));
test('[3, 8, 9, 7, 6], 3 -> [9, 7, 6, 3, 8]', () => assert.deepEqual(rotateArray([3, 8, 9, 7, 6], 3), [9, 7, 6, 3, 8]));
test('empty array', () => assert.deepEqual(rotateArray([], 5), []));
test('K = 0 leaves the array unchanged', () => assert.deepEqual(rotateArray([1, 2, 3], 0), [1, 2, 3]));
test('K = N leaves the array unchanged', () => assert.deepEqual(rotateArray([1, 2, 3], 3), [1, 2, 3]));
test('K > N wraps around', () => assert.deepEqual(rotateArray([1, 2, 3], 4), [3, 1, 2]));
test('single element', () => assert.deepEqual(rotateArray([7], 100), [7]));
test('large K on a large array is fast', () => {
  const a = Array.from({ length: 100000 }, (_, i) => i);
  const out = rotateArray(a, 1000000001);
  assert.equal(out.length, 100000);
  assert.equal(out[1], 0);
});

// ---- more edge cases ----
test('negative values', () => assert.deepEqual(rotateArray([-1, -2, -3], 1), [-3, -1, -2]));
test('two elements, K = 1 swaps them', () => assert.deepEqual(rotateArray([1, 2], 1), [2, 1]));
test('K a large multiple of N leaves the array unchanged', () => assert.deepEqual(rotateArray([1, 2, 3], 3000000), [1, 2, 3]));
test('K = N - 1 is a left rotation by one', () => assert.deepEqual(rotateArray([1, 2, 3, 4], 3), [2, 3, 4, 1]));
test('duplicates', () => assert.deepEqual(rotateArray([1, 1, 2, 2], 1), [2, 1, 1, 2]));
test('empty array with K = 0', () => assert.deepEqual(rotateArray([], 0), []));
