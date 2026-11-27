import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { compose, pipe } = await load('js-from-scratch', 'compose');

const add1 = (x) => x + 1;
const double = (x) => x * 2;

test('compose runs right to left', () => assert.equal(compose(add1, double)(5), 11));
test('pipe runs left to right', () => assert.equal(pipe(add1, double)(5), 12));
test('first function may take several arguments', () => {
  assert.equal(pipe((a, b) => a + b, (x) => x * 10, String)(1, 2), '30');
  assert.equal(compose(String, (x) => x * 10, (a, b) => a + b)(1, 2), '30');
});
test('no functions -> identity', () => {
  assert.equal(compose()(7), 7);
  assert.equal(pipe()('x'), 'x');
});
test('single function', () => assert.equal(pipe(double)(4), 8));
test('preserves `this` for the first function', () => {
  const obj = { base: 10, run: pipe(function (x) { return this.base + x; }, double) };
  assert.equal(obj.run(1), 22);
});
