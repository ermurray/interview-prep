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
