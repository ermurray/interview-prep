import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { debounce } = await load('js-from-scratch', 'debounce');

const useFakeTimers = (t) => t.mock.timers.enable({ apis: ['setTimeout', 'Date'] });

test('trailing: fires once after the burst, with the last args', (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn();
  const d = debounce(fn, 100);
  d('a'); t.mock.timers.tick(50);
  d('b'); t.mock.timers.tick(50);
  d('c');
  assert.equal(fn.mock.callCount(), 0);
  t.mock.timers.tick(99);
  assert.equal(fn.mock.callCount(), 0);
  t.mock.timers.tick(1);
  assert.equal(fn.mock.callCount(), 1);
  assert.deepEqual(fn.mock.calls[0].arguments, ['c']);
});

test('preserves `this`', (t) => {
  useFakeTimers(t);
  let seen;
  const obj = { name: 'obj', run: debounce(function () { seen = this; }, 10) };
  obj.run();
  t.mock.timers.tick(10);
  assert.equal(seen, obj);
});

test('separate bursts fire separately', (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn();
  const d = debounce(fn, 100);
  d(1); t.mock.timers.tick(100);
  d(2); t.mock.timers.tick(100);
  assert.deepEqual(fn.mock.calls.map((c) => c.arguments[0]), [1, 2]);
});

test('cancel() drops the pending call', (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn();
  const d = debounce(fn, 100);
  d();
  d.cancel();
  t.mock.timers.tick(200);
  assert.equal(fn.mock.callCount(), 0);
});

test('leading: fires immediately on the first call only', (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn();
  const d = debounce(fn, 100, { leading: true });
  d('a');
  assert.equal(fn.mock.callCount(), 1);
  assert.deepEqual(fn.mock.calls[0].arguments, ['a']);
  d('b'); t.mock.timers.tick(50);
  d('c'); t.mock.timers.tick(100);
  assert.equal(fn.mock.callCount(), 1, 'no trailing call in leading mode');
  d('d');
  assert.equal(fn.mock.callCount(), 2, 'fires again after a quiet period');
  assert.deepEqual(fn.mock.calls[1].arguments, ['d']);
});

// ---- more edge cases ----
test('two debounced functions do not share a timer', (t) => {
  useFakeTimers(t);
  const a = t.mock.fn();
  const b = t.mock.fn();
  const da = debounce(a, 100);
  const db = debounce(b, 100);
  da(); t.mock.timers.tick(50);
  db(); t.mock.timers.tick(50);
  assert.equal(a.mock.callCount(), 1);
  assert.equal(b.mock.callCount(), 0);
  t.mock.timers.tick(50);
  assert.equal(b.mock.callCount(), 1);
});

test('works again after cancel()', (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn();
  const d = debounce(fn, 100);
  d(1);
  d.cancel();
  d(2);
  t.mock.timers.tick(100);
  assert.equal(fn.mock.callCount(), 1);
  assert.deepEqual(fn.mock.calls[0].arguments, [2]);
});

test('cancel() with nothing pending does not throw', () => {
  const d = debounce(() => {}, 100);
  assert.doesNotThrow(() => d.cancel());
});

test('passes every argument through', (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn();
  const d = debounce(fn, 10);
  d(1, 'two', { three: 3 });
  t.mock.timers.tick(10);
  assert.deepEqual(fn.mock.calls[0].arguments, [1, 'two', { three: 3 }]);
});

test('wait of 0 still defers the call', (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn();
  const d = debounce(fn, 0);
  d();
  assert.equal(fn.mock.callCount(), 0);
  t.mock.timers.tick(0);
  assert.equal(fn.mock.callCount(), 1);
});

test('leading: preserves `this`', (t) => {
  useFakeTimers(t);
  let seen;
  const obj = { run: debounce(function () { seen = this; }, 10, { leading: true }) };
  obj.run();
  assert.equal(seen, obj);
});

test('leading: cancel() resets so the next call fires immediately', (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn();
  const d = debounce(fn, 100, { leading: true });
  d();
  d.cancel();
  d();
  assert.equal(fn.mock.callCount(), 2);
});
