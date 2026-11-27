import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { largestRectangle } = await load('hard', 'largest-rectangle');

test('example: [2, 1, 5, 6, 2, 3] -> 10', () => assert.equal(largestRectangle([2, 1, 5, 6, 2, 3]), 10));
test('[2, 4] -> 4', () => assert.equal(largestRectangle([2, 4]), 4));
test('flat: [3, 3, 3] -> 9', () => assert.equal(largestRectangle([3, 3, 3]), 9));
test('single building', () => assert.equal(largestRectangle([7]), 7));
test('zeros split the skyline', () => assert.equal(largestRectangle([4, 0, 4]), 4));
test('rising then falling: [1, 2, 3, 4, 5] -> 9', () => assert.equal(largestRectangle([1, 2, 3, 4, 5]), 9));
test('large input is O(N)', () => {
  const a = Array.from({ length: 100000 }, (_, i) => (i < 50000 ? i % 10000 : 10000 - (i % 10000)));
  const start = Date.now();
  largestRectangle(a);
  largestRectangle(new Array(100000).fill(5));
  assert.ok(Date.now() - start < 500);
  assert.equal(largestRectangle(new Array(100000).fill(5)), 500000);
});

// ---- more edge cases ----
test('all zeros -> 0', () => assert.equal(largestRectangle([0, 0, 0]), 0));
test('[0] -> 0', () => assert.equal(largestRectangle([0]), 0));
test('valley: [5, 1, 5] -> 5', () => assert.equal(largestRectangle([5, 1, 5]), 5));
test('[6, 2, 5, 4, 5, 1, 6] -> 12', () => assert.equal(largestRectangle([6, 2, 5, 4, 5, 1, 6]), 12));
test('falling: [5, 4, 3, 2, 1] -> 9', () => assert.equal(largestRectangle([5, 4, 3, 2, 1]), 9));
test('wide and low beats tall and narrow', () => assert.equal(largestRectangle([10000, 2, 2, 2, 2, 2, 2]), 10000));
test('equal heights after a drop: [2, 1, 2] -> 3', () => assert.equal(largestRectangle([2, 1, 2]), 3));
