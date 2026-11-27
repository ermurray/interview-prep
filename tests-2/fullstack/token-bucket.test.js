import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { TokenBucket } = await load('fullstack', 'token-bucket');

const clock = () => {
  let t = 0;
  return { now: () => t, advance: (ms) => { t += ms; } };
};

test('starts full and empties', () => {
  const c = clock();
  const b = new TokenBucket({ capacity: 2, refillPerSecond: 1, now: c.now });
  assert.deepEqual([b.tryRemove(), b.tryRemove(), b.tryRemove()], [true, true, false]);
});

test('refills over time', () => {
  const c = clock();
  const b = new TokenBucket({ capacity: 2, refillPerSecond: 1, now: c.now });
  b.tryRemove(); b.tryRemove();
  c.advance(999);
  assert.equal(b.tryRemove(), false);
  c.advance(1);
  assert.equal(b.tryRemove(), true);
});

test('never fills above capacity', () => {
  const c = clock();
  const b = new TokenBucket({ capacity: 3, refillPerSecond: 10, now: c.now });
  c.advance(60000);
  assert.equal(b.tokens, 3);
});

test('fractional refill accumulates', () => {
  const c = clock();
  const b = new TokenBucket({ capacity: 1, refillPerSecond: 2, now: c.now });
  b.tryRemove();
  c.advance(250);
  assert.ok(Math.abs(b.tokens - 0.5) < 1e-9);
  c.advance(250);
  assert.equal(b.tryRemove(), true);
});

test('tryRemove(count) is all-or-nothing', () => {
  const c = clock();
  const b = new TokenBucket({ capacity: 5, refillPerSecond: 1, now: c.now });
  assert.equal(b.tryRemove(4), true);
  assert.equal(b.tryRemove(2), false);
  assert.equal(b.tokens, 1, 'a failed tryRemove takes nothing');
  assert.equal(b.tryRemove(1), true);
});
