import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { sortColors } = await load('basic', 'sort-colors');

test('example: [2, 0, 2, 1, 1, 0]', () =>
  assert.deepEqual(sortColors([2, 0, 2, 1, 1, 0]), [0, 0, 1, 1, 2, 2]));
test('[2, 0, 1]', () => assert.deepEqual(sortColors([2, 0, 1]), [0, 1, 2]));
test('empty', () => assert.deepEqual(sortColors([]), []));
test('single element', () => assert.deepEqual(sortColors([1]), [1]));
test('only one value', () => assert.deepEqual(sortColors([2, 2, 2]), [2, 2, 2]));
test('already sorted', () => assert.deepEqual(sortColors([0, 1, 1, 2]), [0, 1, 1, 2]));
test('reverse sorted', () => assert.deepEqual(sortColors([2, 2, 1, 0, 0]), [0, 0, 1, 2, 2]));
test('no 1s', () => assert.deepEqual(sortColors([2, 0, 2, 0]), [0, 0, 2, 2]));
test('does not use Array.prototype.sort', () => {
  const original = Array.prototype.sort;
  let calls = 0;
  Array.prototype.sort = function sort(...args) {
    calls++;
    return original.apply(this, args);
  };
  try {
    sortColors([2, 1, 0]);
  } finally {
    Array.prototype.sort = original;
  }
  assert.equal(calls, 0);
});
test('large input', () => {
  const out = sortColors(Array.from({ length: 100000 }, (_, i) => (i * 7) % 3));
  assert.equal(out.length, 100000);
  for (let i = 1; i < out.length; i++) assert.ok(out[i - 1] <= out[i], `out of order at ${i}`);
});
