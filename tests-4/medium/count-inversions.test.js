import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { countInversions } = await load('medium', 'count-inversions');

test('example: [2, 4, 1, 3, 5] -> 3', () => assert.equal(countInversions([2, 4, 1, 3, 5]), 3));
test('reversed: [5, 4, 3, 2, 1] -> 10', () => assert.equal(countInversions([5, 4, 3, 2, 1]), 10));
test('equal values are not inversions', () => assert.equal(countInversions([1, 1]), 0));
test('empty -> 0', () => assert.equal(countInversions([]), 0));
test('single element -> 0', () => assert.equal(countInversions([9]), 0));
test('sorted -> 0', () => assert.equal(countInversions([1, 2, 3, 4]), 0));
test('duplicates mixed in: [3, 1, 3, 2] -> 3', () =>
  assert.equal(countInversions([3, 1, 3, 2]), 3));
test('extreme values', () => assert.equal(countInversions([2147483647, -2147483648]), 1));
test('does not mutate the input', () => {
  const a = [3, 2, 1];
  countInversions(a);
  assert.deepEqual(a, [3, 2, 1]);
});
test('performance: 100,000 values in reverse -> over the cap -> -1', () => {
  const a = Array.from({ length: 100000 }, (_, i) => 100000 - i);
  const start = Date.now();
  assert.equal(countInversions(a), -1); // 4,999,950,000 inversions
  assert.ok(Date.now() - start < 2000, 'O(N log N) required');
});
test('just under the cap: 44,721 values in reverse', () =>
  assert.equal(countInversions(Array.from({ length: 44721 }, (_, i) => -i)), 999961560));
