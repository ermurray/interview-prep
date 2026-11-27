import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { coinWays } = await load('hard', 'coin-ways');

test('example: [1, 2, 5], 5 -> 4', () => assert.equal(coinWays([1, 2, 5], 5), 4));
test('impossible -> 0', () => assert.equal(coinWays([2], 3), 0));
test('one exact coin -> 1', () => assert.equal(coinWays([10], 10), 1));
test('amount 0 -> 1', () => assert.equal(coinWays([1, 2], 0), 1));
test('order does not matter: [1, 2], 3 -> 2 (not 3)', () => assert.equal(coinWays([1, 2], 3), 2));
test('UK coins making 200p -> 73682', () => assert.equal(coinWays([1, 2, 5, 10, 20, 50, 100, 200], 200), 73682));
test('result is taken modulo 1,000,000,007', () => {
  const r = coinWays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10000);
  assert.ok(Number.isInteger(r) && r >= 0 && r < 1000000007);
});

// ---- more edge cases ----
test('only 1s: exactly one way', () => assert.equal(coinWays([1], 10000), 1));
test('no combination: [3, 5], 7 -> 0', () => assert.equal(coinWays([3, 5], 7), 0));
test('[3, 5], 8 -> 1', () => assert.equal(coinWays([3, 5], 8), 1));
test('[2, 3], 10 -> 2', () => assert.equal(coinWays([2, 3], 10), 2));
test('amount smaller than every coin -> 0', () => assert.equal(coinWays([5, 10], 3), 0));
test('partitions of 50 using 1..50 -> 204226', () =>
  assert.equal(coinWays(Array.from({ length: 50 }, (_, i) => i + 1), 50), 204226));
test('coin order does not change the answer', () => assert.equal(coinWays([5, 2, 1], 5), coinWays([1, 2, 5], 5)));
