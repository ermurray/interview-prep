import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { discIntersections } = await load('hard', 'disc-intersections');

test('example: [1, 5, 2, 1, 4, 0] -> 11', () =>
  assert.equal(discIntersections([1, 5, 2, 1, 4, 0]), 11));
test('empty -> 0', () => assert.equal(discIntersections([]), 0));
test('single disc -> 0', () => assert.equal(discIntersections([5]), 0));
test('touching discs count: [1, 0] -> 1', () => assert.equal(discIntersections([1, 0]), 1));
test('points that do not touch: [0, 0] -> 0', () => assert.equal(discIntersections([0, 0]), 0));
test('every pair overlaps', () => assert.equal(discIntersections([10, 10, 10, 10]), 6));
test('huge radius does not overflow', () => assert.equal(discIntersections([1, 2147483647, 0]), 2)); // discs 0 and 2 never meet
test('discs of radius 1 touch two steps away', () =>
  assert.equal(discIntersections([0, 1, 0, 1, 0]), 5)); // 1 and 3 meet at x = 2
test('over 10,000,000 pairs -> -1', () =>
  assert.equal(discIntersections(new Array(100000).fill(100000)), -1));
test('performance: 100,000 small discs', () => {
  const start = Date.now();
  assert.equal(discIntersections(new Array(100000).fill(1)), 99999 + 99998);
  assert.ok(Date.now() - start < 2000, 'O(N log N) required');
});
