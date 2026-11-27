import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { bestSingleTrade } = await load('medium', 'best-single-trade');

test('example: [7, 1, 5, 3, 6, 4] -> 5', () => assert.equal(bestSingleTrade([7, 1, 5, 3, 6, 4]), 5));
test('falling prices -> 0', () => assert.equal(bestSingleTrade([7, 6, 4, 3, 1]), 0));
test('empty -> 0', () => assert.equal(bestSingleTrade([]), 0));
test('single price -> 0', () => assert.equal(bestSingleTrade([5]), 0));
test('min comes after the max', () => assert.equal(bestSingleTrade([2, 10, 1, 4]), 8));

// ---- more edge cases ----
test('flat prices -> 0', () => assert.equal(bestSingleTrade([3, 3, 3]), 0));
test('rising prices: buy first, sell last', () => assert.equal(bestSingleTrade([1, 2, 3, 4, 5]), 4));
test('new low later leads to a better trade', () => assert.equal(bestSingleTrade([3, 1, 4, 0, 6]), 6));
test('price range limits', () => assert.equal(bestSingleTrade([0, 200000]), 200000));
test('two days, falling -> 0', () => assert.equal(bestSingleTrade([2, 1]), 0));
test('400,000 days', () => {
  const a = Array.from({ length: 400000 }, (_, i) => (i * 7919) % 200001);
  assert.equal(bestSingleTrade(a), 200000);
});
