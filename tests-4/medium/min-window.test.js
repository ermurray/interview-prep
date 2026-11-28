import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { minWindow } = await load('medium', 'min-window');

test('example: "ADOBECODEBANC", "ABC" -> "BANC"', () =>
  assert.equal(minWindow('ADOBECODEBANC', 'ABC'), 'BANC'));
test('exact match', () => assert.equal(minWindow('a', 'a'), 'a'));
test('needs repeats: "a", "aa" -> ""', () => assert.equal(minWindow('a', 'aa'), ''));
test('T longer than S -> ""', () => assert.equal(minWindow('ab', 'abc'), ''));
test('case matters', () => assert.equal(minWindow('aA', 'A'), 'A'));
test('repeated letters in T', () => assert.equal(minWindow('aaflslflsldkalskaaa', 'aaa'), 'aaa'));
test('ties: the leftmost window wins', () => assert.equal(minWindow('abXba', 'ab'), 'ab'));
test('the whole string', () => assert.equal(minWindow('abc', 'cba'), 'abc'));
test('100,000 characters', () => {
  const s = `${'x'.repeat(50000)}ab${'y'.repeat(49998)}`;
  const start = Date.now();
  assert.equal(minWindow(s, 'ba'), 'ab');
  assert.ok(Date.now() - start < 1000);
});
