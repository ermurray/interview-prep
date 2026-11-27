import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { _, partial, once } = await load('js-from-scratch', 'partial-and-once');

const list = (...args) => args;

test('placeholder is exported', () => assert.equal(typeof _, 'symbol'));
test('partial: preset arguments come first', () => assert.deepEqual(partial(list, 1, 2)(3), [1, 2, 3]));
test('partial: example from the question', () => {
  const greet = (greeting, name) => `${greeting} ${name}`;
  assert.equal(partial(greet, _, 'ada')('hi'), 'hi ada');
});
test('partial: placeholders are filled left to right, extras appended', () =>
  assert.deepEqual(partial(list, 1, _, 3, _)(2, 4, 5), [1, 2, 3, 4, 5]));
test('partial: unfilled placeholders stay as undefined', () =>
  assert.deepEqual(partial(list, _, 2)(), [undefined, 2]));
test('partial: no preset arguments', () => assert.deepEqual(partial(list)(1, 2), [1, 2]));
test('partial: reusable', () => {
  const p = partial(list, _, 'x');
  assert.deepEqual(p(1), [1, 'x']);
  assert.deepEqual(p(2), [2, 'x']);
});
test('partial: preserves `this`', () => {
  const obj = { base: 10, add: partial(function (a, b) { return this.base + a + b; }, 1) };
  assert.equal(obj.add(2), 13);
});

test('once: runs the function only the first time', (t) => {
  const fn = t.mock.fn((x) => x * 2);
  const o = once(fn);
  assert.equal(o(5), 10);
  assert.equal(o(100), 10);
  assert.equal(fn.mock.callCount(), 1);
});
test('once: remembers undefined results without calling again', (t) => {
  const fn = t.mock.fn(() => undefined);
  const o = once(fn);
  o();
  o();
  assert.equal(fn.mock.callCount(), 1);
});
test('once: preserves `this` and arguments for the first call', () => {
  const obj = { name: 'ada', init: once(function (greeting) { return `${greeting} ${this.name}`; }) };
  assert.equal(obj.init('hi'), 'hi ada');
});
test('once: two wrapped functions are independent', () => {
  const a = once(() => 'a');
  const b = once(() => 'b');
  assert.equal(a(), 'a');
  assert.equal(b(), 'b');
});
