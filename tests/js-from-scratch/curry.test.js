import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { curry } = await load('js-from-scratch', 'curry');

const sum3 = (a, b, c) => a + b + c;

test('curry(sum3)(1)(2)(3)', () => assert.equal(curry(sum3)(1)(2)(3), 6));
test('curry(sum3)(1, 2)(3)', () => assert.equal(curry(sum3)(1, 2)(3), 6));
test('curry(sum3)(1)(2, 3)', () => assert.equal(curry(sum3)(1)(2, 3), 6));
test('curry(sum3)(1, 2, 3)', () => assert.equal(curry(sum3)(1, 2, 3), 6));
test('partial applications are reusable', () => {
  const add1 = curry(sum3)(1);
  assert.equal(add1(2)(3), 6);
  assert.equal(add1(10, 20), 31);
});
test('preserves `this` when fully applied', () => {
  const obj = { base: 100, add: curry(function (a, b) { return this.base + a + b; }) };
  assert.equal(obj.add(1, 2), 103);
});

// ---- more edge cases ----
test('a function with no parameters runs straight away', () => assert.equal(curry(() => 5)(), 5));
test('a one-parameter function', () => assert.equal(curry((x) => x * 2)(21), 42));
test('extra arguments are passed through', () => {
  const count = curry(function (a, b) { return arguments.length; });
  assert.equal(count(1, 2, 3), 3);
});
test('two chains from the same curried function do not interfere', () => {
  const c = curry(sum3);
  const a = c(1);
  const b = c(10);
  assert.equal(a(2)(3), 6);
  assert.equal(b(20)(30), 60);
  assert.equal(a(5, 5), 11);
});
test('works with a 5-parameter function', () => {
  const sum5 = (a, b, c, d, e) => a + b + c + d + e;
  assert.equal(curry(sum5)(1)(2, 3)(4)(5), 15);
});
