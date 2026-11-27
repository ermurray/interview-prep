import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { throttle } = await load('js-from-scratch', 'throttle');

const useFakeTimers = (t) => t.mock.timers.enable({ apis: ['setTimeout', 'Date'] });

test('first call runs immediately', (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn();
  throttle(fn, 100)(1);
  assert.equal(fn.mock.callCount(), 1);
});

test('the last call in a burst fires at the end of the window', (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn();
  const th = throttle(fn, 100);
  th(1); t.mock.timers.tick(10);
  th(2); t.mock.timers.tick(10);
  th(3);
  assert.equal(fn.mock.callCount(), 1);
  t.mock.timers.tick(80);
  assert.equal(fn.mock.callCount(), 2);
  assert.deepEqual(fn.mock.calls.map((c) => c.arguments[0]), [1, 3]);
});

test('at most one call per window under constant calls', (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn();
  const th = throttle(fn, 100);
  for (let ms = 0; ms < 1000; ms += 10) { th(ms); t.mock.timers.tick(10); }
  t.mock.timers.tick(200);
  const count = fn.mock.callCount();
  assert.ok(count >= 10 && count <= 11, `expected ~10 calls over 1000ms, got ${count}`);
});

test('a single call does not fire twice', (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn();
  throttle(fn, 100)();
  t.mock.timers.tick(500);
  assert.equal(fn.mock.callCount(), 1);
});

test('preserves `this`', (t) => {
  useFakeTimers(t);
  const seen = [];
  const obj = { run: throttle(function () { seen.push(this); }, 100) };
  obj.run(); obj.run();
  t.mock.timers.tick(100);
  assert.deepEqual(seen, [obj, obj]);
});

// ---- more edge cases ----
test('after a quiet window, the next call runs immediately again', (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn();
  const th = throttle(fn, 100);
  th(1);
  t.mock.timers.tick(150);
  th(2);
  assert.equal(fn.mock.callCount(), 2);
  assert.deepEqual(fn.mock.calls[1].arguments, [2]);
});

test('the trailing call uses the latest arguments', (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn();
  const th = throttle(fn, 100);
  th('a'); th('b'); th('c'); th('d');
  t.mock.timers.tick(100);
  assert.deepEqual(fn.mock.calls.map((c) => c.arguments[0]), ['a', 'd']);
});

test('two throttled functions are independent', (t) => {
  useFakeTimers(t);
  const a = t.mock.fn();
  const b = t.mock.fn();
  const ta = throttle(a, 100);
  const tb = throttle(b, 100);
  ta(); tb();
  assert.equal(a.mock.callCount(), 1);
  assert.equal(b.mock.callCount(), 1);
});

test('passes every argument through', (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn();
  throttle(fn, 100)(1, 2, 3);
  assert.deepEqual(fn.mock.calls[0].arguments, [1, 2, 3]);
});
