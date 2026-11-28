import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { maxDoubleSlice } = await load('medium', 'max-double-slice');

test('example: [3, 2, 6, -1, 4, 5, -1, 2] -> 17', () =>
  assert.equal(maxDoubleSlice([3, 2, 6, -1, 4, 5, -1, 2]), 17));
test('three elements: both parts empty -> 0', () => assert.equal(maxDoubleSlice([5, 5, 5]), 0));
test('all negative -> 0 (empty parts)', () =>
  assert.equal(maxDoubleSlice([-1, -2, -3, -4, -5]), 0));
test('ends are never counted', () => assert.equal(maxDoubleSlice([100, 1, 1, 1, 100]), 2));
test('Y skips the most negative element', () =>
  assert.equal(maxDoubleSlice([0, 5, -100, 5, 0]), 10));
test('four elements', () => assert.equal(maxDoubleSlice([0, 3, 4, 0]), 4));
test('large input', () => {
  const a = new Array(100000).fill(10000);
  assert.equal(maxDoubleSlice(a), 10000 * (100000 - 3));
});
