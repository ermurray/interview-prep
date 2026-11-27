import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { longestUniqueSubstring } = await load('medium', 'longest-unique-substring');

test('example: "abcabcbb" -> 3', () => assert.equal(longestUniqueSubstring('abcabcbb'), 3));
test('"bbbbb" -> 1', () => assert.equal(longestUniqueSubstring('bbbbb'), 1));
test('"pwwkew" -> 3', () => assert.equal(longestUniqueSubstring('pwwkew'), 3));
test('empty -> 0', () => assert.equal(longestUniqueSubstring(''), 0));
test('"abba" -> 2 (left pointer never moves back)', () => assert.equal(longestUniqueSubstring('abba'), 2));
test('"dvdf" -> 3', () => assert.equal(longestUniqueSubstring('dvdf'), 3));
test('spaces count as characters: "a b c" -> 3', () => assert.equal(longestUniqueSubstring('a b c'), 3));

// ---- more edge cases ----
test('single character -> 1', () => assert.equal(longestUniqueSubstring('a'), 1));
test('two different characters -> 2', () => assert.equal(longestUniqueSubstring('au'), 2));
test('all distinct -> whole length', () => assert.equal(longestUniqueSubstring('abcdef'), 6));
test('"tmmzuxt" -> 5 (repeat outside the window is fine)', () => assert.equal(longestUniqueSubstring('tmmzuxt'), 5));
test('case-sensitive: "aA" -> 2', () => assert.equal(longestUniqueSubstring('aA'), 2));
test('spaces repeat too: "a  b" -> 2', () => assert.equal(longestUniqueSubstring('a  b'), 2));
test('50,000 characters cycling all 95 printable ASCII -> 95', () => {
  let s = '';
  for (let i = 0; i < 50000; i++) s += String.fromCharCode(32 + (i % 95));
  assert.equal(longestUniqueSubstring(s), 95);
});
