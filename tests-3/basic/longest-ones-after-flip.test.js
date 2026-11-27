import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { longestOnesAfterFlip } = await load('basic', 'longest-ones-after-flip');

test('example: "1101110111" -> 7', () => assert.equal(longestOnesAfterFlip('1101110111'), 7));
test('all ones: no flip needed', () => assert.equal(longestOnesAfterFlip('111'), 3));
test('all zeros -> 1', () => assert.equal(longestOnesAfterFlip('000'), 1));
test('single "0" -> 1', () => assert.equal(longestOnesAfterFlip('0'), 1));
test('single "1" -> 1', () => assert.equal(longestOnesAfterFlip('1'), 1));
test('flip at the start: "0111" -> 4', () => assert.equal(longestOnesAfterFlip('0111'), 4));
test('flip at the end: "1110" -> 4', () => assert.equal(longestOnesAfterFlip('1110'), 4));
test('two zeros in a row only join one side: "11001111" -> 5', () => assert.equal(longestOnesAfterFlip('11001111'), 5));
test('best join is not the longest run: "1011011100111" -> 6', () => assert.equal(longestOnesAfterFlip('1011011100111'), 6));
test('1,000,000 characters with one zero in the middle', () => {
  const s = '1'.repeat(500000) + '0' + '1'.repeat(499999);
  assert.equal(longestOnesAfterFlip(s), 1000000);
});
test('1,000,000 alternating characters -> 3', () => assert.equal(longestOnesAfterFlip('10'.repeat(500000)), 3));
