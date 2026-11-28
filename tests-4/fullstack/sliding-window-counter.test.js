import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { SlidingWindowCounter } = await load('fullstack', 'sliding-window-counter');

const clock = (start = 0) => {
  let t = start;
  return {
    now: () => t,
    set: (ms) => {
      t = ms;
    },
  };
};

test('allows up to the limit in the first window', () => {
  const c = clock(500);
  const l = new SlidingWindowCounter({ limit: 3, windowMs: 1000, now: c.now });
  assert.deepEqual(
    [l.allow('k'), l.allow('k'), l.allow('k'), l.allow('k')],
    [true, true, true, false],
  );
});

test('example: the previous window is weighted by how much of it still overlaps', () => {
  const c = clock(500);
  const l = new SlidingWindowCounter({ limit: 10, windowMs: 1000, now: c.now });
  for (let i = 0; i < 10; i++) l.allow('k');
  c.set(1250);
  assert.equal(l.estimate('k'), 7.5);
  assert.deepEqual(
    [l.allow('k'), l.allow('k'), l.allow('k'), l.allow('k')],
    [true, true, true, false],
  );
});

test('estimate does not count a request', () => {
  const l = new SlidingWindowCounter({ limit: 1, windowMs: 1000, now: () => 0 });
  l.estimate('k');
  l.estimate('k');
  assert.equal(l.allow('k'), true);
});

test('rejected requests are not counted', () => {
  const c = clock(0);
  const l = new SlidingWindowCounter({ limit: 1, windowMs: 1000, now: c.now });
  l.allow('k');
  l.allow('k');
  l.allow('k');
  assert.equal(l.estimate('k'), 1);
});

test('the previous window fades out across the current one', () => {
  const c = clock(0);
  const l = new SlidingWindowCounter({ limit: 4, windowMs: 1000, now: c.now });
  for (let i = 0; i < 4; i++) l.allow('k');
  c.set(1000);
  assert.equal(l.estimate('k'), 4);
  c.set(1500);
  assert.equal(l.estimate('k'), 2);
  c.set(1999);
  assert.ok(Math.abs(l.estimate('k') - 0.004) < 1e-9);
});

test('after a whole idle window, the previous count is 0', () => {
  const c = clock(0);
  const l = new SlidingWindowCounter({ limit: 2, windowMs: 1000, now: c.now });
  l.allow('k');
  l.allow('k');
  c.set(2500);
  assert.equal(l.estimate('k'), 0);
  assert.equal(l.allow('k'), true);
});

test('no 2x burst at the window edge (unlike a fixed window)', () => {
  const c = clock(999);
  const l = new SlidingWindowCounter({ limit: 10, windowMs: 1000, now: c.now });
  let allowed = 0;
  for (let i = 0; i < 10; i++) if (l.allow('k')) allowed++;
  c.set(1000);
  for (let i = 0; i < 10; i++) if (l.allow('k')) allowed++;
  assert.equal(allowed, 10);
});

test('keys are independent', () => {
  const l = new SlidingWindowCounter({ limit: 1, windowMs: 1000, now: () => 0 });
  assert.equal(l.allow('a'), true);
  assert.equal(l.allow('b'), true);
  assert.equal(l.allow('a'), false);
});

test('unknown key estimates 0', () =>
  assert.equal(
    new SlidingWindowCounter({ limit: 1, windowMs: 10, now: () => 0 }).estimate('x'),
    0,
  ));
