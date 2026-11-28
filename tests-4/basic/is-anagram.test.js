import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { isAnagram } = await load('basic', 'is-anagram');

test('example: "anagram" / "nagaram" -> 1', () => assert.equal(isAnagram('anagram', 'nagaram'), 1));
test('example: "rat" / "car" -> 0', () => assert.equal(isAnagram('rat', 'car'), 0));
test('both empty -> 1', () => assert.equal(isAnagram('', ''), 1));
test('different lengths -> 0', () => assert.equal(isAnagram('a', 'aa'), 0));
test('same letters, different counts -> 0', () => assert.equal(isAnagram('aab', 'abb'), 0));
test('identical strings -> 1', () => assert.equal(isAnagram('listen', 'listen'), 1));
test('one empty -> 0', () => assert.equal(isAnagram('', 'a'), 0));
test('100,000 characters', () => {
  const s = Array.from({ length: 100000 }, (_, i) => String.fromCharCode(97 + (i % 26))).join('');
  assert.equal(isAnagram(s, [...s].reverse().join('')), 1);
  assert.equal(isAnagram(s, `${s.slice(1)}z`), 0);
});
