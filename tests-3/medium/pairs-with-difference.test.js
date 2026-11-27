import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { pairsWithDifference } = await load('medium', 'pairs-with-difference');

test('example: [1, 5, 3, 4, 2], 2 -> 3', () => assert.equal(pairsWithDifference([1, 5, 3, 4, 2], 2), 3));
test('K = 0 counts equal pairs', () => assert.equal(pairsWithDifference([1, 1, 1], 0), 3));
test('no pairs', () => assert.equal(pairsWithDifference([1, 2, 3], 5), 0));
test('single element -> 0', () => assert.equal(pairsWithDifference([7], 0), 0));
test('duplicates multiply: [1, 1, 3, 3], 2 -> 4', () => assert.equal(pairsWithDifference([1, 1, 3, 3], 2), 4));
test('negative values', () => assert.equal(pairsWithDifference([-2, 0, 2], 2), 2));
test('the largest difference', () => assert.equal(pairsWithDifference([-1000000000, 1000000000], 2000000000), 1));
test('K = 0 with distinct values -> 0', () => assert.equal(pairsWithDifference([1, 2, 3], 0), 0));
test('over 1,000,000,000 pairs -> -1', () => assert.equal(pairsWithDifference(new Array(100000).fill(5), 0), -1));
test('just under the cap', () => assert.equal(pairsWithDifference(new Array(44721).fill(5), 0), 999961560));
