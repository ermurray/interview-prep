import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { shortestSubarrayWithSum } = await load('medium', 'shortest-subarray-with-sum');

test('example: [2, 3, 1, 2, 4, 3], 7 -> 2', () => assert.equal(shortestSubarrayWithSum([2, 3, 1, 2, 4, 3], 7), 2));
test('[1, 4, 4], 4 -> 1', () => assert.equal(shortestSubarrayWithSum([1, 4, 4], 4), 1));
test('not reachable -> 0', () => assert.equal(shortestSubarrayWithSum([1, 1, 1, 1], 11), 0));
test('needs the whole array', () => assert.equal(shortestSubarrayWithSum([1, 2, 3], 6), 3));
test('large input is O(N)', () => {
  const a = new Array(100000).fill(1);
  a[50000] = 10000;
  assert.equal(shortestSubarrayWithSum(a, 10002), 3);
});
