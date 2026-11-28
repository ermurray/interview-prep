import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { evalRPN } = await load('basic', 'eval-rpn');

test('example: (2 + 1) * 3 -> 9', () => assert.equal(evalRPN(['2', '1', '+', '3', '*']), 9));
test('example: 4 + 13 / 5 -> 6', () => assert.equal(evalRPN(['4', '13', '5', '/', '+']), 6));
test('example: the long one -> 22', () =>
  assert.equal(evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']), 22));
test('a single number', () => assert.equal(evalRPN(['42']), 42));
test('a single negative number', () => assert.equal(evalRPN(['-7']), -7));
test('operand order matters for "-"', () => assert.equal(evalRPN(['5', '3', '-']), 2));
test('operand order matters for "/"', () => assert.equal(evalRPN(['20', '4', '/']), 5));
test('division truncates toward zero for negatives', () => {
  assert.equal(evalRPN(['7', '-2', '/']), -3);
  assert.equal(evalRPN(['-7', '2', '/']), -3);
});
test('a negative fraction truncates to zero', () => assert.ok(evalRPN(['-1', '2', '/']) === 0)); // -0 is fine too
test('10,000 tokens', () => {
  const tokens = ['1'];
  for (let i = 0; i < 4999; i++) tokens.push('1', '+');
  assert.equal(evalRPN(tokens), 5000);
});
