import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { bestTradesWithFee } = await load('medium', 'best-trades-with-fee');

test('example: [1, 3, 2, 8, 4, 9], fee 2 -> 8', () => assert.equal(bestTradesWithFee([1, 3, 2, 8, 4, 9], 2), 8));
test('[1, 3, 7, 5, 10, 3], fee 3 -> 6', () => assert.equal(bestTradesWithFee([1, 3, 7, 5, 10, 3], 3), 6));
test('falling prices -> 0', () => assert.equal(bestTradesWithFee([9, 8, 7], 0), 0));
test('empty -> 0', () => assert.equal(bestTradesWithFee([], 1), 0));
test('fee eats the whole gain -> 0', () => assert.equal(bestTradesWithFee([1, 3], 2), 0));
test('no fee: sum of every rise', () => assert.equal(bestTradesWithFee([1, 5, 3, 6], 0), 7));

// ---- more edge cases ----
test('single price -> 0', () => assert.equal(bestTradesWithFee([5], 1), 0));
test('two smaller trades beat one big one: [1, 4, 2, 5], fee 1 -> 4', () => assert.equal(bestTradesWithFee([1, 4, 2, 5], 1), 4));
test('one big trade beats two smaller ones: [1, 4, 3, 6], fee 2 -> 3', () => assert.equal(bestTradesWithFee([1, 4, 3, 6], 2), 3));
test('a very large fee -> 0', () => assert.equal(bestTradesWithFee([1, 50000], 50000), 0));
test('flat prices -> 0', () => assert.equal(bestTradesWithFee([3, 3, 3], 0), 0));
test('100,000 days', () => {
  const a = Array.from({ length: 100000 }, (_, i) => (i % 2 ? 10 : 0));
  assert.equal(bestTradesWithFee(a, 1), 50000 * 9);
});
