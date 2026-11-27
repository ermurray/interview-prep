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
