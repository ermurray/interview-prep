import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { rangeIncrements } = await load('medium', 'range-increments');

test('example', () => assert.deepEqual(rangeIncrements(5, [[1, 3, 2], [2, 4, 3], [0, 2, -2]]), [-2, 0, 3, 5, 3]));
test('no operations -> zeros', () => assert.deepEqual(rangeIncrements(3, []), [0, 0, 0]));
test('single-cell ranges', () => assert.deepEqual(rangeIncrements(3, [[0, 0, 5], [2, 2, -1]]), [5, 0, -1]));
test('full range', () => assert.deepEqual(rangeIncrements(4, [[0, 3, 1], [0, 3, 1]]), [2, 2, 2, 2]));
test('performance: N = M = 100,000 full-range operations', () => {
  const ops = Array.from({ length: 100000 }, () => [0, 99999, 1]);
  const start = Date.now();
  const out = rangeIncrements(100000, ops);
  const ms = Date.now() - start;
  assert.equal(out[0], 100000);
  assert.equal(out[99999], 100000);
  assert.ok(ms < 500, `took ${ms}ms; applying every operation cell by cell is O(N·M)`);
});
