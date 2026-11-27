import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { moveZeros } = await load('basic', 'move-zeros');

test('example: [0, 1, 0, 3, 12] -> [1, 3, 12, 0, 0]', () => assert.deepEqual(moveZeros([0, 1, 0, 3, 12]), [1, 3, 12, 0, 0]));
test('[0, 0, 1] -> [1, 0, 0]', () => assert.deepEqual(moveZeros([0, 0, 1]), [1, 0, 0]));
test('empty array', () => assert.deepEqual(moveZeros([]), []));
test('no zeros: unchanged', () => assert.deepEqual(moveZeros([4, -2, 7]), [4, -2, 7]));
test('all zeros: unchanged', () => assert.deepEqual(moveZeros([0, 0]), [0, 0]));
test('negatives keep their order', () => assert.deepEqual(moveZeros([-1, 0, -2, 0, 3]), [-1, -2, 3, 0, 0]));
test('large input is O(N)', () => {
  const a = Array.from({ length: 100000 }, (_, i) => (i % 2 ? 0 : i + 1)); // 1, 0, 3, 0, 5, ...
  const out = moveZeros(a);
  assert.equal(out[0], 1);
  assert.equal(out[1], 3);
  assert.equal(out[49999], 99999);
  assert.equal(out[50000], 0);
  assert.equal(out[99999], 0);
});
