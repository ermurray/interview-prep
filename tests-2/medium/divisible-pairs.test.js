import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { divisiblePairs } = await load('medium', 'divisible-pairs');

test('example: [1, 2, 3, 4, 5], 3 -> 4', () => assert.equal(divisiblePairs([1, 2, 3, 4, 5], 3), 4));
test('single element -> 0', () => assert.equal(divisiblePairs([6], 3), 0));
test('K = 1: every pair counts', () => assert.equal(divisiblePairs([5, 7, 9, 11], 1), 6));
test('remainder 0 pairs with itself', () => assert.equal(divisiblePairs([3, 6, 9], 3), 3));
test('even K: remainder K/2 pairs with itself', () => assert.equal(divisiblePairs([2, 6, 10, 1], 4), 3));
test('large values', () => assert.equal(divisiblePairs([1000000000, 1000000000], 7), 0));
test('over 1,000,000,000 pairs -> -1', () => assert.equal(divisiblePairs(new Array(100000).fill(0), 1), -1));
test('just under the cap is allowed', () => {
  // 44721 equal values: C(44721, 2) = 999,961,560 pairs
  assert.equal(divisiblePairs(new Array(44721).fill(4), 2), 999961560);
});
test('just over the cap -> -1', () => {
  // 44722 equal values: C(44722, 2) = 1,000,006,281 pairs
  assert.equal(divisiblePairs(new Array(44722).fill(4), 2), -1);
});

// ---- more edge cases ----
test('K larger than every value', () => assert.equal(divisiblePairs([1, 2, 3], 100), 0));
test('K = 2: odds pair with odds, evens with evens', () => assert.equal(divisiblePairs([1, 3, 5, 2, 4], 2), 4));
test('zeros pair with each other', () => assert.equal(divisiblePairs([0, 0, 0], 5), 3));
test('values that wrap the remainder', () => assert.equal(divisiblePairs([7, 3], 10), 1));
test('large K equal to a sum', () => assert.equal(divisiblePairs([999999999, 1], 1000000000), 1));
