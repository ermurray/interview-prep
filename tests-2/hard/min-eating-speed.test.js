import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { minEatingSpeed } = await load('hard', 'min-eating-speed');

test('example: [3, 6, 7, 11], 8 -> 4', () => assert.equal(minEatingSpeed([3, 6, 7, 11], 8), 4));
test('H = N -> the largest pile', () => assert.equal(minEatingSpeed([30, 11, 23, 4, 20], 5), 30));
test('[30, 11, 23, 4, 20], 6 -> 23', () => assert.equal(minEatingSpeed([30, 11, 23, 4, 20], 6), 23));
test('lots of time -> speed 1', () => assert.equal(minEatingSpeed([3, 3], 100), 1));
test('huge piles', () => assert.equal(minEatingSpeed([1000000000], 2), 500000000));
test('large input', () => {
  const p = new Array(100000).fill(1000000000);
  assert.equal(minEatingSpeed(p, 1000000000), 100000);
});

// ---- more edge cases ----
test('single pile, one hour per banana -> 1', () => assert.equal(minEatingSpeed([10], 10), 1));
test('single pile, 3 hours -> 4', () => assert.equal(minEatingSpeed([10], 3), 4));
test('H equals the total bananas -> 1', () => assert.equal(minEatingSpeed([3, 4, 5], 12), 1));
test('just under twice: [312884470], 312884469 -> 2', () => assert.equal(minEatingSpeed([312884470], 312884469), 2));
test('equal piles', () => assert.equal(minEatingSpeed([6, 6, 6, 6], 8), 3));
