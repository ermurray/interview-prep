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
