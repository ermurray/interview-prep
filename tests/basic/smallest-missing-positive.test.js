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

// ---- more edge cases ----
test('[0] -> 1', () => assert.equal(smallestMissingPositive([0]), 1));
test('duplicates of 1: [1, 1, 1] -> 2', () => assert.equal(smallestMissingPositive([1, 1, 1]), 2));
test('duplicates without 1: [2, 2, 2] -> 1', () => assert.equal(smallestMissingPositive([2, 2, 2]), 1));
test('only a large value: [1000000] -> 1', () => assert.equal(smallestMissingPositive([1000000]), 1));
test('extremes: [-1000000, 1000000] -> 1', () => assert.equal(smallestMissingPositive([-1000000, 1000000]), 1));
test('unsorted with a gap at the end: [5, 3, 2, 1, 4] -> 6', () => assert.equal(smallestMissingPositive([5, 3, 2, 1, 4]), 6));
test('gap in the middle of a large range', () => {
  const a = Array.from({ length: 100000 }, (_, i) => i + 1).filter((x) => x !== 54321);
  assert.equal(smallestMissingPositive(a), 54321);
});
