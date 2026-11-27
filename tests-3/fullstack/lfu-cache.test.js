import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { LFUCache } = await load('fullstack', 'lfu-cache');

test('example: the less-used key is evicted', () => {
  const c = new LFUCache(2);
  c.put(1, 1);
  c.put(2, 2);
  c.get(1);
  c.put(3, 3);
  assert.equal(c.get(2), -1);
  assert.equal(c.get(1), 1);
  assert.equal(c.get(3), 3);
});

test('ties are broken by least recently used', () => {
  const c = new LFUCache(2);
  c.put('a', 1);
  c.put('b', 2);   // a and b both used once; a is older
  c.put('c', 3);   // evicts a
  assert.equal(c.get('a'), -1);
  assert.equal(c.get('b'), 2);
});

test('the classic sequence', () => {
  const c = new LFUCache(2);
  c.put(1, 1);
  c.put(2, 2);
  assert.equal(c.get(1), 1);
  c.put(3, 3);               // evicts 2
  assert.equal(c.get(2), -1);
  assert.equal(c.get(3), 3);
  c.put(4, 4);               // 1 and 3 both used twice; 1 is older -> evict 1
  assert.equal(c.get(1), -1);
  assert.equal(c.get(3), 3);
  assert.equal(c.get(4), 4);
});

test('an update counts as a use', () => {
  const c = new LFUCache(2);
  c.put('a', 1);
  c.put('b', 2);
  c.put('a', 10);  // a used twice now
  c.put('c', 3);   // evicts b
  assert.equal(c.get('a'), 10);
  assert.equal(c.get('b'), -1);
});

test('a new key starts at one use, below older popular keys', () => {
  const c = new LFUCache(2);
  c.put('hot', 1);
  c.get('hot'); c.get('hot');
  c.put('new1', 1);
  c.put('new2', 2); // evicts new1, not hot
  assert.equal(c.get('hot'), 1);
  assert.equal(c.get('new1'), -1);
});

test('capacity 0 stores nothing', () => {
  const c = new LFUCache(0);
  c.put('a', 1);
  assert.equal(c.get('a'), -1);
});

test('missing key -> -1', () => assert.equal(new LFUCache(1).get('x'), -1));
test('stores falsy values', () => {
  const c = new LFUCache(1);
  c.put('z', 0);
  assert.equal(c.get('z'), 0);
});

test('100,000 operations finish quickly (O(1) per op)', () => {
  const c = new LFUCache(1000);
  const start = Date.now();
  for (let i = 0; i < 100000; i++) {
    c.put(i % 5000, i);
    c.get(i % 3000);
  }
  assert.ok(Date.now() - start < 1000);
});
