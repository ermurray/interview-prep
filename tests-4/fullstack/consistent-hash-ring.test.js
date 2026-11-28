import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { ConsistentHashRing } = await load('fullstack', 'consistent-hash-ring');

// The hash the tests pass in: FNV-1a (32-bit), then murmur3's fmix32 finaliser. Plain FNV-1a
// spreads short, similar strings like "a#0".."a#99" poorly; the final mix fixes that.
/* eslint-disable no-bitwise -- a 32-bit hash function needs bit operations */
const fnv1a = (str) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
};
/* eslint-enable no-bitwise */
const keys = Array.from({ length: 3000 }, (_, i) => `user:${i}`);
const owners = (ring) => new Map(keys.map((k) => [k, ring.getNode(k)]));

test('an empty ring returns undefined', () =>
  assert.equal(new ConsistentHashRing({ hash: fnv1a }).getNode('k'), undefined));

test('with one node, every key goes to it', () => {
  const ring = new ConsistentHashRing({ hash: fnv1a });
  ring.addNode('a');
  assert.ok(keys.every((k) => ring.getNode(k) === 'a'));
});

test('the same key always maps to the same node', () => {
  const ring = new ConsistentHashRing({ hash: fnv1a });
  ring.addNode('a');
  ring.addNode('b');
  ring.addNode('c');
  assert.equal(ring.getNode('user:42'), ring.getNode('user:42'));
});

test('nodes lists servers in the order they were added; duplicates are ignored', () => {
  const ring = new ConsistentHashRing({ hash: fnv1a });
  ring.addNode('a');
  ring.addNode('b');
  ring.addNode('a');
  assert.deepEqual(ring.nodes, ['a', 'b']);
});

test('keys spread fairly evenly with virtual nodes', () => {
  const ring = new ConsistentHashRing({ hash: fnv1a, replicas: 100 });
  ['a', 'b', 'c'].forEach((n) => ring.addNode(n));
  const counts = {};
  for (const owner of owners(ring).values()) counts[owner] = (counts[owner] ?? 0) + 1;
  for (const n of ['a', 'b', 'c'])
    assert.ok(counts[n] > 600 && counts[n] < 1400, `${n} got ${counts[n]} of 3000 keys`);
});

test('adding a node only moves keys onto the new node', () => {
  const ring = new ConsistentHashRing({ hash: fnv1a });
  ['a', 'b', 'c'].forEach((n) => ring.addNode(n));
  const before = owners(ring);
  ring.addNode('d');
  const after = owners(ring);
  let moved = 0;
  for (const k of keys) {
    if (before.get(k) !== after.get(k)) {
      moved++;
      assert.equal(
        after.get(k),
        'd',
        `${k} moved from ${before.get(k)} to ${after.get(k)}, not to the new node`,
      );
    }
  }
  assert.ok(moved > 300 && moved < 1200, `about a quarter of keys should move, ${moved} did`);
});

test('removing a node only moves its own keys', () => {
  const ring = new ConsistentHashRing({ hash: fnv1a });
  ['a', 'b', 'c'].forEach((n) => ring.addNode(n));
  const before = owners(ring);
  ring.removeNode('b');
  const after = owners(ring);
  for (const k of keys) {
    if (before.get(k) !== 'b')
      assert.equal(after.get(k), before.get(k), `${k} moved but was not on b`);
    else assert.notEqual(after.get(k), 'b');
  }
  assert.deepEqual(ring.nodes, ['a', 'c']);
});

test('removing an unknown node does nothing', () => {
  const ring = new ConsistentHashRing({ hash: fnv1a });
  ring.addNode('a');
  ring.removeNode('zzz');
  assert.equal(ring.getNode('k'), 'a');
});

test('removing the last node empties the ring', () => {
  const ring = new ConsistentHashRing({ hash: fnv1a });
  ring.addNode('a');
  ring.removeNode('a');
  assert.equal(ring.getNode('k'), undefined);
  assert.deepEqual(ring.nodes, []);
});

test('places one point per replica, hashed as name#0, name#1, ...', () => {
  const calls = [];
  const spy = (s) => {
    calls.push(s);
    return fnv1a(s);
  };
  const ring = new ConsistentHashRing({ hash: spy, replicas: 3 });
  ring.addNode('n');
  assert.deepEqual(calls.filter((s) => s.startsWith('n#')).sort(), ['n#0', 'n#1', 'n#2']);
});

test('wraps around: a key past the largest point goes to the smallest', () => {
  const fakeHash = (s) => ({ 'a#0': 100, 'b#0': 200, low: 50, mid: 150, high: 250 })[s] ?? 0;
  const ring = new ConsistentHashRing({ hash: fakeHash, replicas: 1 });
  ring.addNode('a');
  ring.addNode('b');
  assert.equal(ring.getNode('low'), 'a');
  assert.equal(ring.getNode('mid'), 'b');
  assert.equal(ring.getNode('high'), 'a');
});
