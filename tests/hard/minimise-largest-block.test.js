import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { minimiseLargestBlock } = await load('hard', 'minimise-largest-block');

test('example: [2, 1, 5, 1, 2, 2, 2], 3 -> 6', () => assert.equal(minimiseLargestBlock([2, 1, 5, 1, 2, 2, 2], 3), 6));
test('K = 1 -> total sum', () => assert.equal(minimiseLargestBlock([1, 2, 3], 1), 6));
test('K >= N -> largest element', () => assert.equal(minimiseLargestBlock([4, 1, 7, 2], 10), 7));
test('zeros', () => assert.equal(minimiseLargestBlock([0, 0, 0], 2), 0));
test('[7, 2, 5, 10, 8], 2 -> 18', () => assert.equal(minimiseLargestBlock([7, 2, 5, 10, 8], 2), 18));

// ---- more edge cases ----
test('single element', () => assert.equal(minimiseLargestBlock([5], 1), 5));
test('K = N exactly -> largest element', () => assert.equal(minimiseLargestBlock([3, 1, 4], 3), 4));
test('equal values split evenly: [1, 1, 1, 1, 1, 1], 3 -> 2', () => assert.equal(minimiseLargestBlock([1, 1, 1, 1, 1, 1], 3), 2));
test('one big element dominates: [0, 0, 0, 10], 2 -> 10', () => assert.equal(minimiseLargestBlock([0, 0, 0, 10], 2), 10));
test('uneven split: [1, 2, 3, 4, 5], 2 -> 9', () => assert.equal(minimiseLargestBlock([1, 2, 3, 4, 5], 2), 9));
test('large input', () => {
  const a = new Array(100000).fill(10000);
  assert.equal(minimiseLargestBlock(a, 100), 10000000);
});
