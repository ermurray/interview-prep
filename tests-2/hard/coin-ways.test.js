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
