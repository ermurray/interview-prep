import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { countersWithReset } = await load('medium', 'counters-with-reset');

test('example: 5, [3, 4, 4, 6, 1, 4, 4] -> [3, 2, 2, 4, 2]', () =>
  assert.deepEqual(countersWithReset(5, [3, 4, 4, 6, 1, 4, 4]), [3, 2, 2, 4, 2]));
test('no operations -> all zeros', () => assert.deepEqual(countersWithReset(3, []), [0, 0, 0]));
test('only resets -> all zeros', () => assert.deepEqual(countersWithReset(2, [3, 3, 3]), [0, 0]));
test('reset at the end', () => assert.deepEqual(countersWithReset(3, [1, 1, 2, 4]), [2, 2, 2]));
test('single counter', () => assert.deepEqual(countersWithReset(1, [1, 2, 1]), [2]));
test('performance: N = M = 100,000 with many resets runs in O(N + M)', () => {
  const n = 100000;
  const ops = Array.from({ length: 100000 }, (_, i) => (i % 2 ? n + 1 : (i % n) + 1));
  const start = Date.now();
  const out = countersWithReset(n, ops);
  const ms = Date.now() - start;
  assert.equal(out.length, n);
  assert.equal(out[0], 50000);
  assert.ok(ms < 500, `took ${ms}ms; the naive reset is O(N·M)`);
});

// ---- more edge cases ----
test('reset as the first operation', () => assert.deepEqual(countersWithReset(5, [6, 1]), [1, 0, 0, 0, 0]));
test('increments after a reset build on the new floor', () =>
  assert.deepEqual(countersWithReset(3, [1, 1, 4, 2, 4, 3]), [3, 3, 4]));
test('several resets in a row', () => assert.deepEqual(countersWithReset(2, [1, 3, 3, 3, 2]), [1, 2]));
test('every operation increments the same counter', () => assert.deepEqual(countersWithReset(3, [2, 2, 2]), [0, 3, 0]));
test('large N with no operations', () => {
  const out = countersWithReset(100000, []);
  assert.equal(out.length, 100000);
  assert.ok(out.every((v) => v === 0));
});
