import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { balancedBrackets } = await load('basic', 'balanced-brackets');

test('example: "{[()()]}" -> 1', () => assert.equal(balancedBrackets('{[()()]}'), 1));
test('example: "([)()]" -> 0', () => assert.equal(balancedBrackets('([)()]'), 0));
test('empty string -> 1', () => assert.equal(balancedBrackets(''), 1));
test('only an opener -> 0', () => assert.equal(balancedBrackets('('), 0));
test('only a closer -> 0', () => assert.equal(balancedBrackets(')'), 0));
test('closer before opener -> 0', () => assert.equal(balancedBrackets(')('), 0));
test('deep nesting', () => assert.equal(balancedBrackets('('.repeat(50000) + ')'.repeat(50000)), 1));

// ---- more edge cases ----
test('single closer of each kind -> 0', () => {
  for (const s of [']', '}', ')']) assert.equal(balancedBrackets(s), 0, s);
});
test('mismatched pair "(]" -> 0', () => assert.equal(balancedBrackets('(]'), 0));
test('siblings "{}[]()" -> 1', () => assert.equal(balancedBrackets('{}[]()'), 1));
test('nested "([{}])" -> 1', () => assert.equal(balancedBrackets('([{}])'), 1));
test('right count, wrong order "())(" -> 0', () => assert.equal(balancedBrackets('())('), 0));
test('unclosed openers "((" -> 0', () => assert.equal(balancedBrackets('(('), 0));
test('200,000 characters of "()" -> 1', () => assert.equal(balancedBrackets('()'.repeat(100000)), 1));
test('deep nesting that breaks on the last character -> 0', () =>
  assert.equal(balancedBrackets('('.repeat(100000) + ')'.repeat(99999) + ']'), 0));
