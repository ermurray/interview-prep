import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { unpairedElement } = await load('basic', 'unpaired-element');

test('example: [9, 3, 9, 3, 9, 7, 9] -> 7', () => assert.equal(unpairedElement([9, 3, 9, 3, 9, 7, 9]), 7));
test('single element', () => assert.equal(unpairedElement([42]), 42));
test('unpaired value at the start', () => assert.equal(unpairedElement([5, 1, 1]), 5));
test('large input', () => {
  const a = [];
  for (let i = 1; i <= 50000; i++) a.push(i, i);
  a.push(123456);
  assert.equal(unpairedElement(a), 123456);
});

// ---- more edge cases ----
test('a value that appears three times leaves one unpaired', () => assert.equal(unpairedElement([7, 7, 7]), 7));
test('unpaired value at the end', () => assert.equal(unpairedElement([1, 1, 2, 2, 3]), 3));
test('the same value in two pairs plus another', () => assert.equal(unpairedElement([4, 4, 4, 4, 9]), 9));
test('maximum value 1,000,000,000', () => assert.equal(unpairedElement([1, 1000000000, 1]), 1000000000));
test('large input, 999,999 elements', () => {
  const a = [];
  for (let i = 0; i < 499999; i++) a.push(i + 1, i + 1);
  a.splice(250000, 0, 42);
  assert.equal(unpairedElement(a), 42);
});
