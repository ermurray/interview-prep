import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { smallestMissingPositive } = await load('basic', 'smallest-missing-positive');

test('example: [1, 3, 6, 4, 1, 2] -> 5', () => assert.equal(smallestMissingPositive([1, 3, 6, 4, 1, 2]), 5));
test('example: [-1, -3] -> 1', () => assert.equal(smallestMissingPositive([-1, -3]), 1));
test('[1, 2, 3] -> 4', () => assert.equal(smallestMissingPositive([1, 2, 3]), 4));
test('missing 1 -> 1', () => assert.equal(smallestMissingPositive([2, 3, 4]), 1));
test('empty array -> 1', () => assert.equal(smallestMissingPositive([]), 1));
test('large input 1..100000 -> 100001', () => {
  const a = Array.from({ length: 100000 }, (_, i) => 100000 - i);
  assert.equal(smallestMissingPositive(a), 100001);
});
