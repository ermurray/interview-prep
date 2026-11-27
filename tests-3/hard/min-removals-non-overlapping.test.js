import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { minRemovalsNonOverlapping } = await load('hard', 'min-removals-non-overlapping');

test('example: [[1, 2], [2, 3], [3, 4], [1, 3]] -> 1', () => assert.equal(minRemovalsNonOverlapping([[1, 2], [2, 3], [3, 4], [1, 3]]), 1));
test('identical intervals -> N - 1', () => assert.equal(minRemovalsNonOverlapping([[1, 2], [1, 2], [1, 2]]), 2));
test('touching intervals do not overlap', () => assert.equal(minRemovalsNonOverlapping([[1, 2], [2, 3]]), 0));
test('empty -> 0', () => assert.equal(minRemovalsNonOverlapping([]), 0));
test('one long interval covering many short ones', () => assert.equal(minRemovalsNonOverlapping([[0, 100], [1, 2], [3, 4], [5, 6]]), 1));
test('negative coordinates', () => assert.equal(minRemovalsNonOverlapping([[-5, -1], [-3, 2], [0, 4]]), 1));
test('chain where each overlaps the next', () => assert.equal(minRemovalsNonOverlapping([[1, 3], [2, 4], [3, 5], [4, 6]]), 2));
test('does not mutate the input', () => {
  const a = [[3, 4], [1, 2]];
  minRemovalsNonOverlapping(a);
  assert.deepEqual(a, [[3, 4], [1, 2]]);
});
test('100,000 identical intervals', () => assert.equal(minRemovalsNonOverlapping(new Array(100000).fill([0, 1])), 99999));
