import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { memoizeWeak } = await load('js-from-scratch', 'memoize-weak');

test('same object argument hits the cache', (t) => {
  const fn = t.mock.fn((o) => o.x * 2);
  const m = memoizeWeak(fn);
  const obj = { x: 2 };
  assert.equal(m(obj), 4);
  assert.equal(m(obj), 4);
  assert.equal(fn.mock.callCount(), 1);
});

test('different objects with equal contents are different keys', (t) => {
  const fn = t.mock.fn((o) => o.x);
  const m = memoizeWeak(fn);
  m({ x: 1 });
  m({ x: 1 });
  assert.equal(fn.mock.callCount(), 2);
});

test('example: every argument is part of the key', (t) => {
  const compute = t.mock.fn((shape) => shape.r * shape.r);
  const area = memoizeWeak((shape, scale) => compute(shape) * scale);
  const circle = { r: 2 };
  assert.equal(area(circle, 2), 8);
  assert.equal(area(circle, 2), 8);
  assert.equal(area(circle, 3), 12);
  assert.equal(compute.mock.callCount(), 2);
});

test('1 and "1" are different; NaN equals NaN', (t) => {
  const fn = t.mock.fn((x) => typeof x);
  const m = memoizeWeak(fn);
  m(1);
  m('1');
  m(NaN);
  m(NaN);
  assert.equal(fn.mock.callCount(), 3);
});

test('argument count matters', (t) => {
  const fn = t.mock.fn((...args) => args.length);
  const m = memoizeWeak(fn);
  assert.equal(m(1), 1);
  assert.equal(m(1, undefined), 2);
  assert.equal(fn.mock.callCount(), 2);
});

test('no arguments', (t) => {
  const fn = t.mock.fn(() => 'constant');
  const m = memoizeWeak(fn);
  m();
  m();
  assert.equal(fn.mock.callCount(), 1);
});

test('functions as arguments are keyed by identity', (t) => {
  const fn = t.mock.fn((cb) => cb());
  const m = memoizeWeak(fn);
  const cb = () => 1;
  m(cb);
  m(cb);
  m(() => 1);
  assert.equal(fn.mock.callCount(), 2);
});

test('undefined results are cached', (t) => {
  const fn = t.mock.fn(() => undefined);
  const m = memoizeWeak(fn);
  const o = {};
  m(o);
  m(o);
  assert.equal(fn.mock.callCount(), 1);
});

test('mixed primitive and object arguments in different orders', (t) => {
  const fn = t.mock.fn((a, b) => [a, b]);
  const m = memoizeWeak(fn);
  const o = {};
  m(o, 1);
  m(1, o);
  m(o, 1);
  assert.equal(fn.mock.callCount(), 2);
});

test('object arguments are held weakly (WeakMap is used)', (t) => {
  const set = t.mock.method(WeakMap.prototype, 'set');
  const m = memoizeWeak((o) => o);
  m({});
  assert.ok(set.mock.callCount() >= 1, 'objects should be stored in a WeakMap');
});
