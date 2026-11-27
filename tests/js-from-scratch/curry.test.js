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
