import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { majorityElement } = await load('basic', 'majority-element');

test('example: [3, 4, 3, 2, 3, -1, 3, 3] -> 3', () =>
  assert.equal(majorityElement([3, 4, 3, 2, 3, -1, 3, 3]), 3));
test('exactly half is not a majority: [1, 2] -> -1', () =>
  assert.equal(majorityElement([1, 2]), -1));
test('empty -> -1', () => assert.equal(majorityElement([]), -1));
test('single element', () => assert.equal(majorityElement([7]), 7));
test('the voting candidate must be confirmed: [1, 2, 3] -> -1', () =>
  assert.equal(majorityElement([1, 2, 3]), -1));
test('candidate left over but not a majority: [1, 1, 2, 2, 3] -> -1', () =>
  assert.equal(majorityElement([1, 1, 2, 2, 3]), -1));
test('majority at the end', () => assert.equal(majorityElement([1, 2, 5, 5, 5]), 5));
test('negative majority', () => assert.equal(majorityElement([-5, -5, 2]), -5));
test('extreme values', () =>
  assert.equal(majorityElement([-2147483648, 2147483647, -2147483648]), -2147483648));
test('large input', () => {
  const a = Array.from({ length: 100000 }, (_, i) => (i % 2 ? 42 : i));
  a.push(42);
  assert.equal(majorityElement(a), 42);
});
