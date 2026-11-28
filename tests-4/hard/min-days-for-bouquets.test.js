import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { minDaysForBouquets } = await load('hard', 'min-days-for-bouquets');

test('example: [7, 7, 7, 7, 12, 7, 7], 2, 3 -> 12', () =>
  assert.equal(minDaysForBouquets([7, 7, 7, 7, 12, 7, 7], 2, 3), 12));
test('K = 1: [1, 10, 3, 10, 2], 3, 1 -> 3', () =>
  assert.equal(minDaysForBouquets([1, 10, 3, 10, 2], 3, 1), 3));
test('not enough flowers -> -1', () =>
  assert.equal(minDaysForBouquets([1, 10, 3, 10, 2], 3, 2), -1));
test('all flowers needed: the last bloom day', () =>
  assert.equal(minDaysForBouquets([5, 1, 9], 1, 3), 9));
test('flowers must be adjacent', () =>
  assert.equal(minDaysForBouquets([1, 100, 1, 100, 1], 1, 2), 100));
test('single flower', () => assert.equal(minDaysForBouquets([4], 1, 1), 4));
test('huge bloom days', () =>
  assert.equal(minDaysForBouquets([1000000000, 1000000000], 1, 2), 1000000000));
test('M * K larger than N without overflow worries -> -1', () =>
  assert.equal(minDaysForBouquets([1, 2, 3], 1000000, 3), -1));
test('large input', () => {
  const bloom = Array.from({ length: 100000 }, (_, i) => i + 1);
  assert.equal(minDaysForBouquets(bloom, 50000, 2), 100000);
});
