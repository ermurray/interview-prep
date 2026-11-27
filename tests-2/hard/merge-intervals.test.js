import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { mergeIntervals } = await load('hard', 'merge-intervals');

test('example', () => assert.deepEqual(mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]), [[1, 6], [8, 10], [15, 18]]));
test('touching intervals merge', () => assert.deepEqual(mergeIntervals([[1, 4], [4, 5]]), [[1, 5]]));
test('empty', () => assert.deepEqual(mergeIntervals([]), []));
test('unsorted input', () => assert.deepEqual(mergeIntervals([[8, 10], [1, 3], [2, 6]]), [[1, 6], [8, 10]]));
test('one interval swallows the others', () => assert.deepEqual(mergeIntervals([[1, 10], [2, 3], [4, 5]]), [[1, 10]]));
test('points', () => assert.deepEqual(mergeIntervals([[5, 5], [1, 1], [1, 2]]), [[1, 2], [5, 5]]));
test('does not mutate the input', () => {
  const a = [[2, 6], [1, 3]];
  mergeIntervals(a);
  assert.deepEqual(a, [[2, 6], [1, 3]]);
});

// ---- more edge cases ----
test('single interval', () => assert.deepEqual(mergeIntervals([[2, 3]]), [[2, 3]]));
test('identical intervals', () => assert.deepEqual(mergeIntervals([[1, 2], [1, 2]]), [[1, 2]]));
test('a chain of touching intervals', () => assert.deepEqual(mergeIntervals([[1, 2], [2, 3], [3, 4]]), [[1, 4]]));
test('a gap of one stays separate', () => assert.deepEqual(mergeIntervals([[1, 2], [3, 4]]), [[1, 2], [3, 4]]));
test('the later interval extends further', () => assert.deepEqual(mergeIntervals([[1, 5], [2, 3], [4, 8]]), [[1, 8]]));
test('same start, different ends', () => assert.deepEqual(mergeIntervals([[1, 4], [1, 2]]), [[1, 4]]));
test('large input', () => {
  const a = Array.from({ length: 100000 }, (_, i) => [i * 2, i * 2 + 1]).reverse();
  const out = mergeIntervals(a);
  assert.equal(out.length, 100000);
  assert.deepEqual(out[0], [0, 1]);
});
