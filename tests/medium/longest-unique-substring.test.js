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
