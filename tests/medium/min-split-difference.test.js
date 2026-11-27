import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { minSplitDifference } = await load('medium', 'min-split-difference');

test('example: [3, 1, 2, 4, 3] -> 1', () => assert.equal(minSplitDifference([3, 1, 2, 4, 3]), 1));
test('two equal elements -> 0', () => assert.equal(minSplitDifference([1, 1]), 0));
test('negatives: [-1000, 1000] -> 2000', () => assert.equal(minSplitDifference([-1000, 1000]), 2000));
test('mixed signs: [-10, -20, -30, -40, 100] -> 20', () => assert.equal(minSplitDifference([-10, -20, -30, -40, 100]), 20));
test('large input', () => {
  const a = new Array(100000).fill(1);
  assert.equal(minSplitDifference(a), 0);
});
