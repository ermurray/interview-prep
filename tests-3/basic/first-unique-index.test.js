import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { firstUniqueIndex } = await load('basic', 'first-unique-index');

test('example: "leetcode" -> 0', () => assert.equal(firstUniqueIndex('leetcode'), 0));
test('example: "loveleetcode" -> 2', () => assert.equal(firstUniqueIndex('loveleetcode'), 2));
test('no unique character -> -1', () => assert.equal(firstUniqueIndex('aabb'), -1));
test('empty string -> -1', () => assert.equal(firstUniqueIndex(''), -1));
test('single character -> 0', () => assert.equal(firstUniqueIndex('z'), 0));
test('unique character at the end', () => assert.equal(firstUniqueIndex('aabbc'), 4));
test('a character that repeats later is not unique', () => assert.equal(firstUniqueIndex('abcab'), 2));
test('three copies are not unique', () => assert.equal(firstUniqueIndex('aaab'), 3));
test('100,000 characters, unique one at the end', () => {
  let s = '';
  for (let i = 0; i < 99999; i++) s += String.fromCharCode(97 + (i % 25)); // a..y
  assert.equal(firstUniqueIndex(s + 'z'), 99999);
});
