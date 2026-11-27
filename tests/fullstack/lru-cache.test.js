import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { LRUCache } = await load('fullstack', 'lru-cache');

test('example from the question', () => {
  const c = new LRUCache(2);
  c.put(1, 1);
  c.put(2, 2);
  assert.equal(c.get(1), 1);
  c.put(3, 3);
  assert.equal(c.get(2), -1);
  c.put(4, 4);
  assert.equal(c.get(1), -1);
  assert.equal(c.get(3), 3);
  assert.equal(c.get(4), 4);
});

test('missing key -> -1', () => assert.equal(new LRUCache(1).get('nope'), -1));

test('put on an existing key updates it and marks it as used', () => {
  const c = new LRUCache(2);
  c.put('a', 1);
  c.put('b', 2);
  c.put('a', 10);   // a is now most recent
  c.put('c', 3);    // evicts b
  assert.equal(c.get('a'), 10);
  assert.equal(c.get('b'), -1);
  assert.equal(c.get('c'), 3);
});

test('capacity 1', () => {
  const c = new LRUCache(1);
  c.put('a', 1);
  c.put('b', 2);
  assert.equal(c.get('a'), -1);
  assert.equal(c.get('b'), 2);
});

test('stores falsy values', () => {
  const c = new LRUCache(2);
  c.put('zero', 0);
  assert.equal(c.get('zero'), 0);
});

test('100,000 operations finish quickly (O(1) per op)', () => {
  const c = new LRUCache(1000);
  const start = Date.now();
  for (let i = 0; i < 100000; i++) {
    c.put(i, i);
    c.get(i - 500);
  }
  assert.ok(Date.now() - start < 500);
  assert.equal(c.get(99999), 99999);
  assert.equal(c.get(0), -1);
});
