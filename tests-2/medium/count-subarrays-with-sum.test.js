import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { countSubarraysWithSum } = await load('medium', 'count-subarrays-with-sum');

test('example: [1, -1, 0], 0 -> 3', () => assert.equal(countSubarraysWithSum([1, -1, 0], 0), 3));
test('[1, 1, 1], 2 -> 2', () => assert.equal(countSubarraysWithSum([1, 1, 1], 2), 2));
test('[1, 2, 3], 3 -> 2', () => assert.equal(countSubarraysWithSum([1, 2, 3], 3), 2));
test('no match -> 0', () => assert.equal(countSubarraysWithSum([1, 2, 3], 100), 0));
test('negative K', () => assert.equal(countSubarraysWithSum([-1, -1, 1], -1), 3));
test('performance: 100,000 zeros, K = 0 (O(N) required)', () => {
  const start = Date.now();
  assert.equal(countSubarraysWithSum(new Array(100000).fill(0), 0), 100000 * 100001 / 2);
  const ms = Date.now() - start;
  assert.ok(ms < 1000, `took ${ms}ms; checking every slice is O(N^2)`);
});

// ---- more edge cases ----
test('single element equal to K -> 1', () => assert.equal(countSubarraysWithSum([5], 5), 1));
test('single element not equal to K -> 0', () => assert.equal(countSubarraysWithSum([5], 4), 0));
test('classic: [3, 4, 7, 2, -3, 1, 4, 2], 7 -> 4', () => assert.equal(countSubarraysWithSum([3, 4, 7, 2, -3, 1, 4, 2], 7), 4));
test('the whole array is the only match', () => assert.equal(countSubarraysWithSum([1, 2, 3], 6), 1));
test('K out of reach', () => assert.equal(countSubarraysWithSum([1000, 1000], -100000000), 0));
test('alternating signs, K = 0', () => assert.equal(countSubarraysWithSum([1, -1, 1, -1], 0), 4));
