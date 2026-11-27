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
