import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { bestTwoTrades } = await load('medium', 'best-two-trades');

test('example: [3, 3, 5, 0, 0, 3, 1, 4] -> 6', () =>
  assert.equal(bestTwoTrades([3, 3, 5, 0, 0, 3, 1, 4]), 6));
test('one rising run: one trade is enough', () => assert.equal(bestTwoTrades([1, 2, 3, 4, 5]), 4));
test('falling -> 0', () => assert.equal(bestTwoTrades([7, 6, 4, 3, 1]), 0));
test('empty -> 0', () => assert.equal(bestTwoTrades([]), 0));
test('single day -> 0', () => assert.equal(bestTwoTrades([5]), 0));
test('three rises: only the best two count', () =>
  assert.equal(bestTwoTrades([1, 3, 1, 5, 1, 4]), 7));
test('two trades beat the single best trade', () =>
  assert.equal(bestTwoTrades([1, 2, 4, 2, 5, 7, 2, 4, 9, 0]), 13));
test('a dip inside a rise is worth splitting', () =>
  assert.equal(bestTwoTrades([1, 10, 2, 11]), 18));
test('large input', () => {
  const a = Array.from({ length: 100000 }, (_, i) => (i % 2 ? 100000 : 0));
  assert.equal(bestTwoTrades(a), 200000);
});
