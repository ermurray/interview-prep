import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { memoize } = await load('js-from-scratch', 'memoize');

test('caches by the first argument by default', (t) => {
  const fn = t.mock.fn((n) => n * n);
  const m = memoize(fn);
  assert.equal(m(4), 16);
  assert.equal(m(4), 16);
  assert.equal(m(5), 25);
  assert.equal(fn.mock.callCount(), 2);
});

test('caches falsy results', (t) => {
  const fn = t.mock.fn(() => 0);
  const m = memoize(fn);
  m('a'); m('a');
  assert.equal(fn.mock.callCount(), 1);
});

test('custom resolver', (t) => {
  const fn = t.mock.fn((a, b) => a + b);
  const m = memoize(fn, (a, b) => `${a},${b}`);
  assert.equal(m(1, 2), 3);
  assert.equal(m(1, 3), 4);
  assert.equal(m(1, 2), 3);
  assert.equal(fn.mock.callCount(), 2);
});

test('preserves `this`', () => {
  const obj = { factor: 3, times: memoize(function (n) { return n * this.factor; }) };
  assert.equal(obj.times(2), 6);
});

test('LRU limit evicts the least recently used key', (t) => {
  const fn = t.mock.fn((n) => n * 10);
  const m = memoize(fn, undefined, 2);
  m(1); m(2);   // cache: 1, 2
  m(1);         // hit, 1 is now most recent
  m(3);         // evicts 2
  assert.equal(fn.mock.callCount(), 3);
  m(1);         // still cached
  assert.equal(fn.mock.callCount(), 3);
  m(2);         // was evicted, recomputed
  assert.equal(fn.mock.callCount(), 4);
});

// ---- more edge cases ----
test('caches undefined results', (t) => {
  const fn = t.mock.fn(() => undefined);
  const m = memoize(fn);
  m('a'); m('a');
  assert.equal(fn.mock.callCount(), 1);
});

test('resolver receives every argument', (t) => {
  const resolver = t.mock.fn((...args) => args.join('|'));
  const m = memoize((a, b, c) => a + b + c, resolver);
  m(1, 2, 3);
  assert.deepEqual(resolver.mock.calls[0].arguments, [1, 2, 3]);
});

test('maxSize 1 keeps only the latest key', (t) => {
  const fn = t.mock.fn((x) => x);
  const m = memoize(fn, undefined, 1);
  m(1); m(2); m(1);
  assert.equal(fn.mock.callCount(), 3);
  m(1);
  assert.equal(fn.mock.callCount(), 3);
});

test('different first arguments are cached separately', (t) => {
  const fn = t.mock.fn((x) => x * 2);
  const m = memoize(fn);
  assert.equal(m(1), 2);
  assert.equal(m(2), 4);
  assert.equal(m(1), 2);
  assert.equal(fn.mock.callCount(), 2);
});

test('size limit holds over many keys', (t) => {
  const fn = t.mock.fn((x) => x);
  const m = memoize(fn, undefined, 3);
  for (let i = 0; i < 100; i++) m(i);
  m(97); m(98); m(99);
  assert.equal(fn.mock.callCount(), 100, 'the last 3 keys are still cached');
  m(0);
  assert.equal(fn.mock.callCount(), 101, 'old keys were evicted');
});
