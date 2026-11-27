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
