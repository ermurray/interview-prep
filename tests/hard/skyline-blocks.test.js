import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { skylineBlocks } = await load('hard', 'skyline-blocks');

test('example: [8, 8, 5, 7, 9, 8, 7, 4, 8] -> 7', () => assert.equal(skylineBlocks([8, 8, 5, 7, 9, 8, 7, 4, 8]), 7));
test('single position -> 1', () => assert.equal(skylineBlocks([1]), 1));
test('flat wall -> 1', () => assert.equal(skylineBlocks([2, 2, 2]), 1));
test('rising -> one block per step', () => assert.equal(skylineBlocks([1, 2, 3]), 3));
test('falling -> one block per step', () => assert.equal(skylineBlocks([3, 2, 1]), 3));
test('valley: [3, 1, 3] -> 3', () => assert.equal(skylineBlocks([3, 1, 3]), 3));
test('large input is O(N)', () => {
  const a = Array.from({ length: 100000 }, (_, i) => (i % 1000) + 1);
  assert.equal(skylineBlocks(a), 1000 + 99 * 999); // each new ramp reuses the height-1 block
});

// ---- more edge cases ----
test('block reused after a step up: [1, 1, 1, 2, 2, 1] -> 2', () => assert.equal(skylineBlocks([1, 1, 1, 2, 2, 1]), 2));
test('dip: [2, 1, 2] -> 3', () => assert.equal(skylineBlocks([2, 1, 2]), 3));
test('bump: [1, 2, 1] -> 2', () => assert.equal(skylineBlocks([1, 2, 1]), 2));
test('V shape: [5, 4, 3, 4, 5] -> 5', () => assert.equal(skylineBlocks([5, 4, 3, 4, 5]), 5));
test('maximum height', () => assert.equal(skylineBlocks([1000000000]), 1));
test('same height returns after a dip below it: [3, 2, 3] -> 3', () => assert.equal(skylineBlocks([3, 2, 3]), 3));
test('same height returns after a bump above it: [3, 4, 3] -> 2', () => assert.equal(skylineBlocks([3, 4, 3]), 2));
