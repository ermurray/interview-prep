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

// ---- more edge cases ----
test('N = 2: [3, 1] -> 2', () => assert.equal(minSplitDifference([3, 1]), 2));
test('all negative: [-1, -2, -3, -4] -> 2', () => assert.equal(minSplitDifference([-1, -2, -3, -4]), 2));
test('zeros -> 0', () => assert.equal(minSplitDifference([0, 0, 0]), 0));
test('best split is the last one: [1, 1, 1, 10] -> 7', () => assert.equal(minSplitDifference([1, 1, 1, 10]), 7));
test('best split is the first one: [10, 1, 1, 1] -> 7', () => assert.equal(minSplitDifference([10, 1, 1, 1]), 7));
test('large values at the limits: the best split is the very last one', () => {
  // left sum climbs to 50,000,000 then falls; at P = N - 1 left = 1000 and right = -1000
  const a = [...new Array(50000).fill(1000), ...new Array(50000).fill(-1000)];
  assert.equal(minSplitDifference(a), 2000);
});
test('alternating limits: [1000, -1000, ...] -> 0', () => {
  const a = Array.from({ length: 100000 }, (_, i) => (i % 2 ? -1000 : 1000));
  assert.equal(minSplitDifference(a), 0);
});
