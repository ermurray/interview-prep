import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { longestIncreasingSubsequence } = await load('hard', 'longest-increasing-subsequence');

test('example: [10, 9, 2, 5, 3, 7, 101, 18] -> 4', () => assert.equal(longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18]), 4));
test('[0, 1, 0, 3, 2, 3] -> 4', () => assert.equal(longestIncreasingSubsequence([0, 1, 0, 3, 2, 3]), 4));
test('strictly increasing: equal values do not count', () => assert.equal(longestIncreasingSubsequence([7, 7, 7]), 1));
test('empty -> 0', () => assert.equal(longestIncreasingSubsequence([]), 0));
test('single element -> 1', () => assert.equal(longestIncreasingSubsequence([42]), 1));
test('falling -> 1', () => assert.equal(longestIncreasingSubsequence([5, 4, 3, 2, 1]), 1));
test('negative values', () => assert.equal(longestIncreasingSubsequence([-5, -10, -3, -1, -7, 0]), 4));
test('extreme values', () => assert.equal(longestIncreasingSubsequence([-1000000000, 1000000000]), 2));
test('performance: 100,000 increasing values (O(N log N) required)', () => {
  const a = Array.from({ length: 100000 }, (_, i) => i);
  const start = Date.now();
  assert.equal(longestIncreasingSubsequence(a), 100000);
  const ms = Date.now() - start;
  assert.ok(ms < 1000, `took ${ms}ms; the O(N^2) DP is too slow`);
});
