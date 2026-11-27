import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { carPooling } = await load('medium', 'car-pooling');

test('example: over capacity -> 0', () => assert.equal(carPooling([[2, 1, 5], [3, 3, 7]], 4), 0));
test('example: exactly at capacity -> 1', () => assert.equal(carPooling([[2, 1, 5], [3, 3, 7]], 5), 1));
test('drop-off happens before pick-up at the same place', () => assert.equal(carPooling([[2, 1, 5], [3, 5, 7]], 3), 1));
test('no trips -> 1', () => assert.equal(carPooling([], 1), 1));
test('a single trip over capacity -> 0', () => assert.equal(carPooling([[5, 0, 1]], 4), 0));
test('unsorted trips', () => assert.equal(carPooling([[3, 2, 7], [3, 7, 9], [8, 3, 9]], 11), 1));
test('overlap in the middle only', () => assert.equal(carPooling([[2, 0, 10], [2, 4, 6], [2, 5, 8]], 5), 0));
test('trip ending at the furthest location', () => assert.equal(carPooling([[1, 0, 1000000], [1, 999999, 1000000]], 2), 1));
test('performance: 100,000 long trips', () => {
  const trips = Array.from({ length: 100000 }, (_, i) => [1, i % 10, 1000000]);
  const start = Date.now();
  assert.equal(carPooling(trips, 100000), 1);
  assert.equal(carPooling(trips, 99999), 0);
  assert.ok(Date.now() - start < 2000);
});
