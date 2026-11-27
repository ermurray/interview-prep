import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { reverseInGroups } = await load('basic', 'reverse-in-groups');

test('example: groups of 3 with a shorter last group', () => assert.deepEqual(reverseInGroups([1, 2, 3, 4, 5, 6, 7], 3), [3, 2, 1, 6, 5, 4, 7]));
test('groups of 2: [1, 2, 3, 4, 5] -> [2, 1, 4, 3, 5]', () => assert.deepEqual(reverseInGroups([1, 2, 3, 4, 5], 2), [2, 1, 4, 3, 5]));
test('K larger than N reverses everything', () => assert.deepEqual(reverseInGroups([1, 2, 3], 10), [3, 2, 1]));
test('K = N reverses everything', () => assert.deepEqual(reverseInGroups([1, 2, 3, 4], 4), [4, 3, 2, 1]));
test('K = 1 leaves the array unchanged', () => assert.deepEqual(reverseInGroups([4, 5, 6], 1), [4, 5, 6]));
test('empty array', () => assert.deepEqual(reverseInGroups([], 3), []));
test('N divisible by K: no short group', () => assert.deepEqual(reverseInGroups([1, 2, 3, 4, 5, 6], 3), [3, 2, 1, 6, 5, 4]));
test('last group of two is reversed too', () => assert.deepEqual(reverseInGroups([1, 2, 3, 4, 5], 3), [3, 2, 1, 5, 4]));
test('negatives and duplicates', () => assert.deepEqual(reverseInGroups([-1, -1, 2, -3], 2), [-1, -1, -3, 2]));
test('large input with K = 2', () => {
  const out = reverseInGroups(Array.from({ length: 100000 }, (_, i) => i), 2);
  assert.equal(out.length, 100000);
  assert.deepEqual(out.slice(0, 4), [1, 0, 3, 2]);
  assert.deepEqual(out.slice(-2), [99999, 99998]);
});
