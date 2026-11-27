import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { longestZeroRun } = await load('basic', 'longest-zero-run');

test('example: 1041 (10000010001) -> 5', () => assert.equal(longestZeroRun(1041), 5));
test('trailing zeros do not count: 32 (100000) -> 0', () => assert.equal(longestZeroRun(32), 0));
test('no zeros: 15 (1111) -> 0', () => assert.equal(longestZeroRun(15), 0));
test('9 (1001) -> 2', () => assert.equal(longestZeroRun(9), 2));
test('529 (1000010001) -> 4', () => assert.equal(longestZeroRun(529), 4));
test('20 (10100) -> 1', () => assert.equal(longestZeroRun(20), 1));
test('1 -> 0', () => assert.equal(longestZeroRun(1), 0));
test('max int 2147483647 -> 0', () => assert.equal(longestZeroRun(2147483647), 0));
test('1610612737 (11 + 28 zeros + 1) -> 28', () => assert.equal(longestZeroRun(1610612737), 28));

// ---- more edge cases ----
test('2 (10) -> 0: a single trailing zero is not a run', () => assert.equal(longestZeroRun(2), 0));
test('5 (101) -> 1', () => assert.equal(longestZeroRun(5), 1));
test('6 (110) -> 0', () => assert.equal(longestZeroRun(6), 0));
test('328 (101001000) -> 2: trailing run of 3 ignored', () => assert.equal(longestZeroRun(328), 2));
test('66561 (2^16 + 2^10 + 1) -> 9: the longer run comes second', () => assert.equal(longestZeroRun(66561), 9));
test('1073741825 (2^30 + 1) -> 29', () => assert.equal(longestZeroRun(1073741825), 29));
test('powers of two -> 0', () => {
  for (let p = 0; p <= 30; p++) assert.equal(longestZeroRun(2 ** p), 0, `2^${p}`);
});
