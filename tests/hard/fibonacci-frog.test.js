import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { fibonacciFrog } = await load('hard', 'fibonacci-frog');

test('example: [0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0] -> 3', () =>
  assert.equal(fibonacciFrog([0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0]), 3));
test('empty river: one jump of 1 -> 1', () => assert.equal(fibonacciFrog([]), 1));
test('distance 4 with no leaves -> -1', () => assert.equal(fibonacciFrog([0, 0, 0]), -1));
test('direct Fibonacci jump to the bank: distance 5 -> 1', () => assert.equal(fibonacciFrog([0, 0, 0, 0]), 1));
test('uses a leaf: [1, 0, 0] (distance 4 = 1 + 3) -> 2', () => assert.equal(fibonacciFrog([1, 0, 0]), 2));
test('large input finishes quickly', () => {
  const a = new Array(100000).fill(1);
  assert.ok(fibonacciFrog(a) > 0);
});

// ---- more edge cases ----
test('[1]: bank is 2 away -> 1', () => assert.equal(fibonacciFrog([1]), 1));
test('[0, 1, 0]: bank is 4 away, via the leaf -> 2', () => assert.equal(fibonacciFrog([0, 1, 0]), 2));
test('[1, 1, 1]: bank is 4 away -> 2', () => assert.equal(fibonacciFrog([1, 1, 1]), 2));
test('[0, 0, 0, 0, 0, 0, 0]: bank is 8 away -> 1', () => assert.equal(fibonacciFrog(new Array(7).fill(0)), 1));
test('a leaf that leads nowhere: [0, 0, 1, 0, 0, 0] -> -1 (bank is 7 away)', () => {
  // -1 -> 2 (3), then 2 -> 6 is 4 (not Fibonacci); 7 is not Fibonacci either
  assert.equal(fibonacciFrog([0, 0, 1, 0, 0, 0]), -1);
});
