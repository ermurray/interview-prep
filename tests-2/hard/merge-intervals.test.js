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
