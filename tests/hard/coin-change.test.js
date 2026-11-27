import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { coinChange } = await load('hard', 'coin-change');

test('example: [1, 2, 5], 11 -> 3', () => assert.equal(coinChange([1, 2, 5], 11), 3));
test('impossible -> -1', () => assert.equal(coinChange([2], 3), -1));
test('amount 0 -> 0', () => assert.equal(coinChange([1], 0), 0));
test('greedy fails: [1, 3, 4], 6 -> 2', () => assert.equal(coinChange([1, 3, 4], 6), 2));
test('larger amount', () => assert.equal(coinChange([186, 419, 83, 408], 6249), 20));

// ---- more edge cases ----
test('every coin is larger than the amount -> -1', () => assert.equal(coinChange([5], 3), -1));
test('amount equals a coin -> 1', () => assert.equal(coinChange([3, 7], 7), 1));
test('unsorted coins', () => assert.equal(coinChange([5, 1, 2], 11), 3));
test('[2, 5, 10, 1], 27 -> 4', () => assert.equal(coinChange([2, 5, 10, 1], 27), 4));
test('no combination reaches the amount: [3, 7], 11 -> -1', () => assert.equal(coinChange([3, 7], 11), -1));
test('huge coin value', () => assert.equal(coinChange([2147483647], 2), -1));
test('only 1s up to 10,000 -> 10000', () => assert.equal(coinChange([1], 10000), 10000));
