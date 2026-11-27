import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { removeAdjacentDuplicates } = await load('basic', 'remove-adjacent-duplicates');

test('example: "abbaca" -> "ca"', () => assert.equal(removeAdjacentDuplicates('abbaca'), 'ca'));
test('"azxxzy" -> "ay"', () => assert.equal(removeAdjacentDuplicates('azxxzy'), 'ay'));
test('everything cancels: "aaaa" -> ""', () => assert.equal(removeAdjacentDuplicates('aaaa'), ''));
test('odd count leaves one: "aaa" -> "a"', () => assert.equal(removeAdjacentDuplicates('aaa'), 'a'));
test('empty string', () => assert.equal(removeAdjacentDuplicates(''), ''));
test('nothing to remove', () => assert.equal(removeAdjacentDuplicates('abc'), 'abc'));
test('nested cancellation: "abccba" -> ""', () => assert.equal(removeAdjacentDuplicates('abccba'), ''));
test('returns a string', () => assert.equal(typeof removeAdjacentDuplicates('ab'), 'string'));
test('200,000 characters that fully cancel', () => {
  const half = Array.from({ length: 100000 }, (_, i) => String.fromCharCode(97 + (i % 26))).join('');
  assert.equal(removeAdjacentDuplicates(half + [...half].reverse().join('')), '');
});
