import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { maxSubarraySum } = await load('medium', 'max-subarray-sum');

test('example: [-2, 1, -3, 4, -1, 2, 1, -5, 4] -> 6', () => assert.equal(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6));
test('all negative -> the largest single value', () => assert.equal(maxSubarraySum([-3, -1, -2]), -1));
test('single element', () => assert.equal(maxSubarraySum([5]), 5));
test('all positive -> whole array', () => assert.equal(maxSubarraySum([1, 2, 3]), 6));
test('[3, 2, -6, 4, 0] -> 5', () => assert.equal(maxSubarraySum([3, 2, -6, 4, 0]), 5));

// ---- more edge cases ----
test('single negative -> itself', () => assert.equal(maxSubarraySum([-1]), -1));
test('zeros -> 0', () => assert.equal(maxSubarraySum([0, 0]), 0));
test('negative between positives is worth keeping: [2, -1, 2] -> 3', () => assert.equal(maxSubarraySum([2, -1, 2]), 3));
test('negative between positives is not worth keeping: [5, -10, 6] -> 6', () => assert.equal(maxSubarraySum([5, -10, 6]), 6));
test('all negative with the max at the end', () => assert.equal(maxSubarraySum([-5, -4, -3]), -3));
test('1,000,000 maximum values', () => assert.equal(maxSubarraySum(new Array(1000000).fill(1000000)), 1e12));
