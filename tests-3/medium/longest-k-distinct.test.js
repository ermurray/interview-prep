import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { longestKDistinct } = await load('medium', 'longest-k-distinct');

test('example: "eceba", 2 -> 3', () => assert.equal(longestKDistinct('eceba', 2), 3));
test('"aa", 1 -> 2', () => assert.equal(longestKDistinct('aa', 1), 2));
test('K = 0 -> 0', () => assert.equal(longestKDistinct('abc', 0), 0));
test('empty string -> 0', () => assert.equal(longestKDistinct('', 3), 0));
test('K larger than the alphabet used -> whole string', () => assert.equal(longestKDistinct('abcabc', 10), 6));
test('"aabbcc", 1 -> 2', () => assert.equal(longestKDistinct('aabbcc', 1), 2));
test('"aabbcc", 2 -> 4', () => assert.equal(longestKDistinct('aabbcc', 2), 4));
test('window has to shrink by several characters', () => assert.equal(longestKDistinct('abaccc', 2), 4));
test('case-sensitive', () => assert.equal(longestKDistinct('aAaA', 1), 1));
test('100,000 characters: the long two-letter run wins', () => {
  // "abab..." (60,000) beats "b" + "ccc..." (40,001)
  const s = 'ab'.repeat(30000) + 'c'.repeat(40000);
  assert.equal(longestKDistinct(s, 2), 60000);
});
test('100,000 characters: the window must slide past the start', () => {
  const s = 'abc'.repeat(20000) + 'd'.repeat(40000);
  assert.equal(longestKDistinct(s, 2), 40001); // "c" + "ddd..."
});
