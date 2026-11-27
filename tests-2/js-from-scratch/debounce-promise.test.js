import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { debouncePromise } = await load('js-from-scratch', 'debounce-promise');

const useFakeTimers = (t) => t.mock.timers.enable({ apis: ['setTimeout', 'Date'] });

test('every call in a burst gets the result of one trailing call', async (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn((q) => `results for ${q}`);
  const d = debouncePromise(fn, 100);
  const a = d('re');
  t.mock.timers.tick(50);
  const b = d('rea');
  t.mock.timers.tick(50);
  const c = d('react');
  assert.equal(fn.mock.callCount(), 0);
  t.mock.timers.tick(100);
  assert.deepEqual(await Promise.all([a, b, c]), ['results for react', 'results for react', 'results for react']);
  assert.equal(fn.mock.callCount(), 1);
  assert.deepEqual(fn.mock.calls[0].arguments, ['react']);
});

test('works with an async fn', async (t) => {
  useFakeTimers(t);
  const d = debouncePromise(async (x) => x * 2, 10);
  const p = d(21);
  t.mock.timers.tick(10);
  assert.equal(await p, 42);
});

test('a rejection rejects every caller in the burst', async (t) => {
  useFakeTimers(t);
  const d = debouncePromise(async () => { throw new Error('nope'); }, 10);
  const a = d();
  const b = d();
  t.mock.timers.tick(10);
  await assert.rejects(a, /nope/);
  await assert.rejects(b, /nope/);
});

test('separate bursts get separate results', async (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn((x) => x);
  const d = debouncePromise(fn, 10);
  const a = d(1);
  t.mock.timers.tick(10);
  assert.equal(await a, 1);
  const b = d(2);
  t.mock.timers.tick(10);
  assert.equal(await b, 2);
  assert.equal(fn.mock.callCount(), 2);
});

test('preserves `this`', async (t) => {
  useFakeTimers(t);
  const obj = { name: 'obj', run: debouncePromise(function () { return this.name; }, 10) };
  const p = obj.run();
  t.mock.timers.tick(10);
  assert.equal(await p, 'obj');
});

// ---- more edge cases ----
test('a synchronous throw rejects every caller', async (t) => {
  useFakeTimers(t);
  const d = debouncePromise(() => { throw new Error('sync boom'); }, 10);
  const a = d();
  const b = d();
  t.mock.timers.tick(10);
  await assert.rejects(a, /sync boom/);
  await assert.rejects(b, /sync boom/);
});

test('two debounced functions are independent', async (t) => {
  useFakeTimers(t);
  const da = debouncePromise((x) => `a:${x}`, 10);
  const db = debouncePromise((x) => `b:${x}`, 50);
  const pa = da(1);
  const pb = db(2);
  t.mock.timers.tick(10);
  assert.equal(await pa, 'a:1');
  t.mock.timers.tick(40);
  assert.equal(await pb, 'b:2');
});

test('returns a promise straight away', (t) => {
  useFakeTimers(t);
  const p = debouncePromise(() => 1, 10)();
  assert.equal(typeof p?.then, 'function');
  t.mock.timers.tick(10);
  return p;
});

test('resolves with falsy results', async (t) => {
  useFakeTimers(t);
  const p = debouncePromise(() => 0, 10)();
  t.mock.timers.tick(10);
  assert.equal(await p, 0);
});

test('a call during a pending async fn starts a new burst', async (t) => {
  useFakeTimers(t);
  let resolveFirst;
  const fn = t.mock.fn((x) => (x === 1 ? new Promise((r) => { resolveFirst = r; }) : x));
  const d = debouncePromise(fn, 10);
  const first = d(1);
  t.mock.timers.tick(10);
  await Promise.resolve();
  const second = d(2);
  t.mock.timers.tick(10);
  assert.equal(await second, 2);
  resolveFirst('one');
  assert.equal(await first, 'one');
});
