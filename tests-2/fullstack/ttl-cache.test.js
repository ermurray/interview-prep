import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { TTLCache } = await load('fullstack', 'ttl-cache');

const clock = () => {
  let t = 0;
  return { now: () => t, advance: (ms) => { t += ms; } };
};

test('get returns the value until it expires', () => {
  const c = clock();
  const cache = new TTLCache({ ttlMs: 1000, now: c.now });
  cache.set('a', 1);
  assert.equal(cache.get('a'), 1);
  c.advance(999);
  assert.equal(cache.get('a'), 1);
  c.advance(1);
  assert.equal(cache.get('a'), undefined);
});

test('missing key -> undefined', () => assert.equal(new TTLCache({ ttlMs: 10 }).get('x'), undefined));

test('per-entry ttl overrides the default', () => {
  const c = clock();
  const cache = new TTLCache({ ttlMs: 1000, now: c.now });
  cache.set('short', 1, 10);
  c.advance(10);
  assert.equal(cache.has('short'), false);
});

test('set on an existing key restarts its expiry', () => {
  const c = clock();
  const cache = new TTLCache({ ttlMs: 100, now: c.now });
  cache.set('a', 1);
  c.advance(90);
  cache.set('a', 2);
  c.advance(90);
  assert.equal(cache.get('a'), 2);
});

test('has, delete and size', () => {
  const c = clock();
  const cache = new TTLCache({ ttlMs: 100, now: c.now });
  cache.set('a', 1);
  cache.set('b', 2, 10);
  assert.equal(cache.size, 2);
  c.advance(10);
  assert.equal(cache.size, 1, 'expired entries are not counted');
  assert.equal(cache.has('a'), true);
  assert.equal(cache.delete('a'), true);
  assert.equal(cache.delete('a'), false);
  assert.equal(cache.size, 0);
});

test('stores falsy values', () => {
  const cache = new TTLCache({ ttlMs: 100 });
  cache.set('z', 0);
  assert.equal(cache.get('z'), 0);
  assert.equal(cache.has('z'), true);
});

test('maxSize evicts the least recently used entry', () => {
  const c = clock();
  const cache = new TTLCache({ ttlMs: 1000, maxSize: 2, now: c.now });
  cache.set('a', 1);
  cache.set('b', 2);
  cache.get('a');      // a is now most recently used
  cache.set('c', 3);   // evicts b
  assert.equal(cache.get('b'), undefined);
  assert.equal(cache.get('a'), 1);
  assert.equal(cache.get('c'), 3);
});

test('expired entries are dropped before evicting live ones', () => {
  const c = clock();
  const cache = new TTLCache({ ttlMs: 1000, maxSize: 2, now: c.now });
  cache.set('live', 1);
  cache.set('dying', 2, 10);
  cache.get('dying');  // dying is the most recently used, but expires soon
  c.advance(10);
  cache.set('new', 3);
  assert.equal(cache.get('live'), 1, 'live entry was kept');
  assert.equal(cache.get('new'), 3);
});
