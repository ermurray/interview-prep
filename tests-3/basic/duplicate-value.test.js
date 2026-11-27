import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { duplicateValue } = await load('basic', 'duplicate-value');

test('example: [3, 1, 3, 4, 2] -> 3', () => assert.equal(duplicateValue([3, 1, 3, 4, 2]), 3));
test('[1, 3, 4, 2, 2] -> 2', () => assert.equal(duplicateValue([1, 3, 4, 2, 2]), 2));
test('smallest case: [1, 1] -> 1', () => assert.equal(duplicateValue([1, 1]), 1));
test('duplicate is N', () => assert.equal(duplicateValue([4, 1, 2, 3, 4]), 4));
test('duplicate is 1', () => assert.equal(duplicateValue([2, 1, 3, 1]), 1));
test('copies next to each other', () => assert.equal(duplicateValue([1, 2, 2, 3]), 2));
test('large input: N = 100,000', () => {
  const a = Array.from({ length: 100000 }, (_, i) => 100000 - i);
  a.push(31415);
  assert.equal(duplicateValue(a), 31415);
});
