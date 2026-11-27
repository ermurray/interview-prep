import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { maxSubarraySum } = await load('medium', 'max-subarray-sum');

test('example: [-2, 1, -3, 4, -1, 2, 1, -5, 4] -> 6', () => assert.equal(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6));
test('all negative -> the largest single value', () => assert.equal(maxSubarraySum([-3, -1, -2]), -1));
test('single element', () => assert.equal(maxSubarraySum([5]), 5));
test('all positive -> whole array', () => assert.equal(maxSubarraySum([1, 2, 3]), 6));
test('[3, 2, -6, 4, 0] -> 5', () => assert.equal(maxSubarraySum([3, 2, -6, 4, 0]), 5));
