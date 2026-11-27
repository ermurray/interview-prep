import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { coinChange } = await load('hard', 'coin-change');

test('example: [1, 2, 5], 11 -> 3', () => assert.equal(coinChange([1, 2, 5], 11), 3));
test('impossible -> -1', () => assert.equal(coinChange([2], 3), -1));
test('amount 0 -> 0', () => assert.equal(coinChange([1], 0), 0));
test('greedy fails: [1, 3, 4], 6 -> 2', () => assert.equal(coinChange([1, 3, 4], 6), 2));
test('larger amount', () => assert.equal(coinChange([186, 419, 83, 408], 6249), 20));
