import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { memoizeAsync } = await load('js-from-scratch', 'memoize-async');

test('concurrent calls with the same key share one in-flight call', async (t) => {
  const fn = t.mock.fn(async (id) => ({ id }));
  const m = memoizeAsync(fn);
  const [a, b] = await Promise.all([m(1), m(1)]);
  assert.equal(a, b);
  assert.equal(fn.mock.callCount(), 1);
});

test('different keys call fn separately', async (t) => {
  const fn = t.mock.fn(async (id) => id * 2);
  const m = memoizeAsync(fn);
  assert.deepEqual(await Promise.all([m(1), m(2)]), [2, 4]);
  assert.equal(fn.mock.callCount(), 2);
});

test('resolved values are cached', async (t) => {
  const fn = t.mock.fn(async (x) => x);
  const m = memoizeAsync(fn);
  await m('a');
  await m('a');
  assert.equal(fn.mock.callCount(), 1);
});

test('values expire after ttlMs', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: 0 });
  const fn = t.mock.fn(async (x) => x);
  const m = memoizeAsync(fn, { ttlMs: 1000 });
  await m('a');
  t.mock.timers.tick(999);
  await m('a');
  assert.equal(fn.mock.callCount(), 1, 'still fresh at 999ms');
  t.mock.timers.tick(1);
  await m('a');
  assert.equal(fn.mock.callCount(), 2, 'expired at 1000ms');
});

test('rejections are not cached', async (t) => {
  let fail = true;
  const fn = t.mock.fn(async () => { if (fail) throw new Error('down'); return 'up'; });
  const m = memoizeAsync(fn);
  await assert.rejects(m('k'), /down/);
  fail = false;
  assert.equal(await m('k'), 'up');
  assert.equal(fn.mock.callCount(), 2);
});

test('custom resolver', async (t) => {
  const fn = t.mock.fn(async (a, b) => a + b);
  const m = memoizeAsync(fn, { resolver: (a, b) => `${a}:${b}` });
  assert.equal(await m(1, 2), 3);
  assert.equal(await m(1, 3), 4);
  assert.equal(await m(1, 2), 3);
  assert.equal(fn.mock.callCount(), 2);
});

// ---- more edge cases ----
test('ttlMs 0 never serves from cache once resolved', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: 0 });
  const fn = t.mock.fn(async (x) => x);
  const m = memoizeAsync(fn, { ttlMs: 0 });
  await m('a');
  await m('a');
  assert.equal(fn.mock.callCount(), 2);
});

test('in-flight calls are shared even with ttlMs 0', async (t) => {
  const fn = t.mock.fn(async (x) => x);
  const m = memoizeAsync(fn, { ttlMs: 0 });
  await Promise.all([m('a'), m('a'), m('a')]);
  assert.equal(fn.mock.callCount(), 1);
});

test('callers sharing an in-flight call all see its rejection', async () => {
  const m = memoizeAsync(async () => { throw new Error('shared failure'); });
  const results = await Promise.allSettled([m('k'), m('k')]);
  assert.deepEqual(results.map((r) => r.status), ['rejected', 'rejected']);
});

test('caches falsy values', async (t) => {
  const fn = t.mock.fn(async () => 0);
  const m = memoizeAsync(fn);
  assert.equal(await m('z'), 0);
  assert.equal(await m('z'), 0);
  assert.equal(fn.mock.callCount(), 1);
});

test('each key has its own expiry', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: 0 });
  const fn = t.mock.fn(async (x) => x);
  const m = memoizeAsync(fn, { ttlMs: 100 });
  await m('a');
  t.mock.timers.tick(60);
  await m('b');
  t.mock.timers.tick(60); // a expired at 100, b is still fresh until 160
  await m('a');
  await m('b');
  assert.deepEqual(fn.mock.calls.map((c) => c.arguments[0]), ['a', 'b', 'a']);
});
