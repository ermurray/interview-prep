import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { countDivisibleSlices } = await load('medium', 'count-divisible-slices');

test('example: [4, 5, 0, -2, -3, 1], 5 -> 7', () =>
  assert.equal(countDivisibleSlices([4, 5, 0, -2, -3, 1], 5), 7));
test('[5], 9 -> 0', () => assert.equal(countDivisibleSlices([5], 9), 0));
test('K = 1: every slice counts', () => assert.equal(countDivisibleSlices([3, -1, 4], 1), 6));
test('negative sums with the same remainder are counted', () =>
  assert.equal(countDivisibleSlices([-1, 2, 9], 2), 2));
test('all zeros: every slice counts', () => assert.equal(countDivisibleSlices([0, 0, 0], 7), 6));
test('single element divisible', () => assert.equal(countDivisibleSlices([-10], 5), 1));
test('large K', () => assert.equal(countDivisibleSlices([5000, 5000], 10000), 1));
test('performance: 100,000 elements (O(N) required)', () => {
  const a = new Array(100000).fill(0);
  const start = Date.now();
  assert.equal(countDivisibleSlices(a, 3), (100000 * 100001) / 2);
  assert.ok(Date.now() - start < 1000);
});
