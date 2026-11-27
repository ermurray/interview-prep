import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { maxCircularSubarray } = await load('medium', 'max-circular-subarray');

test('example: wrapping wins: [5, -3, 5] -> 10', () => assert.equal(maxCircularSubarray([5, -3, 5]), 10));
test('[1, -2, 3, -2] -> 3', () => assert.equal(maxCircularSubarray([1, -2, 3, -2]), 3));
test('all negative -> the largest element', () => assert.equal(maxCircularSubarray([-3, -2, -3]), -2));
test('single element', () => assert.equal(maxCircularSubarray([-5]), -5));
test('all positive -> the total', () => assert.equal(maxCircularSubarray([1, 2, 3]), 6));
test('[3, -1, 2, -1] -> 4', () => assert.equal(maxCircularSubarray([3, -1, 2, -1]), 4));
test('[3, -2, 2, -3] -> 3', () => assert.equal(maxCircularSubarray([3, -2, 2, -3]), 3));
test('each element used once: [2, -1, 2] -> 4 (not 5)', () => assert.equal(maxCircularSubarray([2, -1, 2]), 4));
test('large input', () => {
  const a = new Array(100000).fill(-30000);
  a[0] = 30000;
  a[99999] = 30000;
  assert.equal(maxCircularSubarray(a), 60000);
});
