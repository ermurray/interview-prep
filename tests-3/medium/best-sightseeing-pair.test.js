import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { bestSightseeingPair } = await load('medium', 'best-sightseeing-pair');

test('example: [8, 1, 5, 2, 6] -> 11', () => assert.equal(bestSightseeingPair([8, 1, 5, 2, 6]), 11));
test('two sights: [1, 2] -> 2', () => assert.equal(bestSightseeingPair([1, 2]), 2));
test('equal scores: [5, 5] -> 9', () => assert.equal(bestSightseeingPair([5, 5]), 9));
test('the best pair is far apart', () => assert.equal(bestSightseeingPair([1000, 1, 1, 1, 1000]), 1996));
test('falling scores: adjacent pair wins', () => assert.equal(bestSightseeingPair([10, 9, 8, 7]), 18));
test('large input: high scores too far apart to pair', () => {
  // 1000 + 1000 - 99,999 is negative, so the best is a 1000 next to a 1: 1000 + 1 - 1 = 1000
  const a = new Array(100000).fill(1);
  a[0] = 1000;
  a[99999] = 1000;
  assert.equal(bestSightseeingPair(a), 1000);
});
