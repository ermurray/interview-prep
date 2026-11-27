import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { passingCars } = await load('medium', 'passing-cars');

test('example: [0, 1, 0, 1, 1] -> 5', () => assert.equal(passingCars([0, 1, 0, 1, 1]), 5));
test('no pairs when all west first: [1, 1, 0, 0] -> 0', () => assert.equal(passingCars([1, 1, 0, 0]), 0));
test('single car -> 0', () => assert.equal(passingCars([0]), 0));
test('exactly 1,000,000,000 is allowed', () => {
  // 40000 zeros then 25000 ones = 1e9 pairs
  const a = [...new Array(40000).fill(0), ...new Array(25000).fill(1)];
  assert.equal(passingCars(a), 1000000000);
});
test('over 1,000,000,000 -> -1', () => {
  const a = [...new Array(50000).fill(0), ...new Array(50000).fill(1)];
  assert.equal(passingCars(a), -1);
});

// ---- more edge cases ----
test('all east -> 0', () => assert.equal(passingCars([0, 0, 0]), 0));
test('all west -> 0', () => assert.equal(passingCars([1, 1, 1]), 0));
test('[0, 1] -> 1', () => assert.equal(passingCars([0, 1]), 1));
test('[1, 0] -> 0', () => assert.equal(passingCars([1, 0]), 0));
test('[0, 0, 1, 1] -> 4', () => assert.equal(passingCars([0, 0, 1, 1]), 4));
test('alternating 100,000 cars: 1,250,025,000 pairs is over the cap -> -1', () => {
  // the k-th 1 (k = 1..50000) is passed by k zeros: 50000 * 50001 / 2 = 1,250,025,000
  const a = Array.from({ length: 100000 }, (_, i) => i % 2);
  assert.equal(passingCars(a), -1);
});
test('alternating 80,000 cars: 800,020,000 pairs is under the cap', () => {
  const a = Array.from({ length: 80000 }, (_, i) => i % 2);
  assert.equal(passingCars(a), 800020000);
});
