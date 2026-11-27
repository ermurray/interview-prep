import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { minRemovalsToBalance } = await load('basic', 'min-removals-to-balance');

test('example: "()))((" -> 4', () => assert.equal(minRemovalsToBalance('()))(('), 4));
test('"())" -> 1', () => assert.equal(minRemovalsToBalance('())'), 1));
test('balanced: "(()())" -> 0', () => assert.equal(minRemovalsToBalance('(()())'), 0));
test('empty -> 0', () => assert.equal(minRemovalsToBalance(''), 0));
test('only openers: "(((" -> 3', () => assert.equal(minRemovalsToBalance('((('), 3));
test('reversed pair: ")(" -> 2', () => assert.equal(minRemovalsToBalance(')('), 2));
test('large input', () => assert.equal(minRemovalsToBalance(')'.repeat(100000) + '('.repeat(100000)), 200000));
