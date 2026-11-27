import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { maxProductSubarray } = await load('medium', 'max-product-subarray');

test('example: [2, 3, -2, 4] -> 6', () => assert.equal(maxProductSubarray([2, 3, -2, 4]), 6));
test('two negatives: [-2, 3, -4] -> 24', () => assert.equal(maxProductSubarray([-2, 3, -4]), 24));
test('zero splits the array: [-2, 0, -1] -> 0', () => assert.equal(maxProductSubarray([-2, 0, -1]), 0));
test('single negative -> itself', () => assert.equal(maxProductSubarray([-2]), -2));
test('[0, 2] -> 2', () => assert.equal(maxProductSubarray([0, 2]), 2));
test('[-1, -2, -3, 0, 4] -> 6', () => assert.equal(maxProductSubarray([-1, -2, -3, 0, 4]), 6));

// ---- more edge cases ----
test('[0] -> 0', () => assert.equal(maxProductSubarray([0]), 0));
test('two negatives: [-1, -1] -> 1', () => assert.equal(maxProductSubarray([-1, -1]), 1));
test('[2, -5, -2, -4, 3] -> 24', () => assert.equal(maxProductSubarray([2, -5, -2, -4, 3]), 24));
test('zero in the middle: [-2, -3, 0, -2, -10] -> 20', () => assert.equal(maxProductSubarray([-2, -3, 0, -2, -10]), 20));
test('all ones', () => assert.equal(maxProductSubarray([1, 1, 1]), 1));
test('odd number of negatives: [-1, -2, -3] -> 6', () => assert.equal(maxProductSubarray([-1, -2, -3]), 6));
test('large input of ones and zeros', () => {
  const a = Array.from({ length: 100000 }, (_, i) => (i % 3 === 0 ? 0 : 1));
  assert.equal(maxProductSubarray(a), 1);
});
