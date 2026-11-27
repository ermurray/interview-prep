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
