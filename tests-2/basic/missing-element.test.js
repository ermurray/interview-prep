import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { missingElement } = await load('basic', 'missing-element');

test('example: [2, 3, 1, 5] -> 4', () => assert.equal(missingElement([2, 3, 1, 5]), 4));
test('[1] -> 2', () => assert.equal(missingElement([1]), 2));
test('empty -> 1', () => assert.equal(missingElement([]), 1));
test('missing the first value', () => assert.equal(missingElement([2, 3, 4]), 1));
test('missing the last value', () => assert.equal(missingElement([3, 1, 2]), 4));
test('large input', () => {
  const a = [];
  for (let i = 1; i <= 100001; i++) if (i !== 77777) a.push(i);
  assert.equal(missingElement(a), 77777);
});
