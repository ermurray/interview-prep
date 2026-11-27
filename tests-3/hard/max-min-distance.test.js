import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { maxMinDistance } = await load('hard', 'max-min-distance');

test('example: [1, 2, 8, 4, 9], 3 -> 3', () => assert.equal(maxMinDistance([1, 2, 8, 4, 9], 3), 3));
test('two stalls, unsorted', () => assert.equal(maxMinDistance([5, 1], 2), 4));
test('the widest possible distance', () => assert.equal(maxMinDistance([0, 1000000000], 2), 1000000000));
test('C = N: the smallest gap', () => assert.equal(maxMinDistance([1, 3, 6, 10], 4), 2));
test('C = 2: the two ends', () => assert.equal(maxMinDistance([7, 3, 100, 50], 2), 97));
test('evenly spaced', () => assert.equal(maxMinDistance([0, 10, 20, 30, 40], 3), 20));
test('does not mutate the input order', () => {
  const p = [9, 1, 5];
  maxMinDistance(p, 2);
  assert.deepEqual(p, [9, 1, 5]);
});
test('large input: 100,000 stalls 10,000 apart, 1,000 horses -> every 100th stall', () => {
  const p = Array.from({ length: 100000 }, (_, i) => i * 10000);
  assert.equal(maxMinDistance(p, 1000), 1000000);
});
