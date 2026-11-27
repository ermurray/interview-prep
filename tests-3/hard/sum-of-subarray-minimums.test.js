import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { sumOfSubarrayMinimums } = await load('hard', 'sum-of-subarray-minimums');

test('example: [3, 1, 2, 4] -> 17', () => assert.equal(sumOfSubarrayMinimums([3, 1, 2, 4]), 17));
test('[11, 81, 94, 43, 3] -> 444', () => assert.equal(sumOfSubarrayMinimums([11, 81, 94, 43, 3]), 444));
test('single element', () => assert.equal(sumOfSubarrayMinimums([5]), 5));
test('equal values are not double-counted: [2, 2] -> 6', () => assert.equal(sumOfSubarrayMinimums([2, 2]), 6));
test('[1, 1, 1] -> 6', () => assert.equal(sumOfSubarrayMinimums([1, 1, 1]), 6));
test('rising: [1, 2, 3] -> 10', () => assert.equal(sumOfSubarrayMinimums([1, 2, 3]), 10));
test('falling: [3, 2, 1] -> 10', () => assert.equal(sumOfSubarrayMinimums([3, 2, 1]), 10));
test('result is taken modulo 1,000,000,007', () => {
  // all 30,000s: 30000 * N(N+1)/2 with N = 100,000
  const expected = Number((30000n * (100000n * 100001n / 2n)) % 1000000007n);
  assert.equal(sumOfSubarrayMinimums(new Array(100000).fill(30000)), expected);
});
test('large input is O(N)', () => {
  const a = Array.from({ length: 100000 }, (_, i) => (i % 30000) + 1);
  const start = Date.now();
  sumOfSubarrayMinimums(a);
  assert.ok(Date.now() - start < 1000);
});
