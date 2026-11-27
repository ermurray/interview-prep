import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { minimalImpact } = await load('medium', 'minimal-impact');

test('example', () => assert.deepEqual(minimalImpact('CAGCCTA', [2, 5, 0], [4, 5, 6]), [2, 4, 1]));
test('single character', () => assert.deepEqual(minimalImpact('T', [0], [0]), [4]));
test('each letter on its own', () =>
  assert.deepEqual(minimalImpact('ACGT', [0, 1, 2, 3], [0, 1, 2, 3]), [1, 2, 3, 4]));
test('range at the very end', () => assert.deepEqual(minimalImpact('TTTG', [3, 2], [3, 3]), [3, 3]));
test('letter only just outside the range does not count', () =>
  assert.deepEqual(minimalImpact('ATTTA', [1], [3]), [4]));
test('letter at the range edges counts', () => assert.deepEqual(minimalImpact('TATAT', [1, 3], [1, 4]), [1, 1]));
test('performance: N = 100,000, M = 50,000 full-range queries', () => {
  const s = `${'T'.repeat(99999)}A`;
  const p = new Array(50000).fill(0);
  const q = new Array(50000).fill(99998);
  const start = Date.now();
  const out = minimalImpact(s, p, q);
  const ms = Date.now() - start;
  assert.equal(out.length, 50000);
  assert.ok(out.every((v) => v === 4));
  assert.ok(ms < 1000, `took ${ms}ms; scanning each range is O(N·M)`);
});
