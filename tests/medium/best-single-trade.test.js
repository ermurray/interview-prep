import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { bestSingleTrade } = await load('medium', 'best-single-trade');

test('example: [7, 1, 5, 3, 6, 4] -> 5', () => assert.equal(bestSingleTrade([7, 1, 5, 3, 6, 4]), 5));
test('falling prices -> 0', () => assert.equal(bestSingleTrade([7, 6, 4, 3, 1]), 0));
test('empty -> 0', () => assert.equal(bestSingleTrade([]), 0));
test('single price -> 0', () => assert.equal(bestSingleTrade([5]), 0));
test('min comes after the max', () => assert.equal(bestSingleTrade([2, 10, 1, 4]), 8));
