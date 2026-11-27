import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { isPermutation } = await load('basic', 'is-permutation');

test('example: [4, 1, 3, 2] -> 1', () => assert.equal(isPermutation([4, 1, 3, 2]), 1));
test('example: [4, 1, 3] -> 0', () => assert.equal(isPermutation([4, 1, 3]), 0));
test('duplicates: [1, 1] -> 0', () => assert.equal(isPermutation([1, 1]), 0));
test('single [1] -> 1', () => assert.equal(isPermutation([1]), 1));
test('single [2] -> 0', () => assert.equal(isPermutation([2]), 0));
test('a huge value -> 0', () => assert.equal(isPermutation([1, 1000000000]), 0));
test('sum matches but not a permutation: [2, 2, 3, 3] -> 0', () => assert.equal(isPermutation([2, 2, 3, 3]), 0));
test('large permutation', () => {
  const a = Array.from({ length: 100000 }, (_, i) => 100000 - i);
  assert.equal(isPermutation(a), 1);
});
