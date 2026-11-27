import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { FixedWindowLimiter, rateLimitHeaders } = await load('fullstack', 'fixed-window-limiter');

const clock = (start = 0) => {
  let t = start;
  return { now: () => t, advance: (ms) => { t += ms; } };
};

test('allows up to the limit with a falling remaining count', () => {
  const l = new FixedWindowLimiter({ limit: 2, windowMs: 1000, now: clock().now });
  assert.deepEqual(l.check('ip'), { allowed: true, remaining: 1, retryAfterMs: 0 });
  assert.deepEqual(l.check('ip'), { allowed: true, remaining: 0, retryAfterMs: 0 });
});

test('blocked requests report the time to the next window', () => {
  const c = clock(250);
  const l = new FixedWindowLimiter({ limit: 1, windowMs: 1000, now: c.now });
  l.check('ip');
  assert.deepEqual(l.check('ip'), { allowed: false, remaining: 0, retryAfterMs: 750 });
});

test('windows are aligned to multiples of windowMs', () => {
  const c = clock(900);
  const l = new FixedWindowLimiter({ limit: 1, windowMs: 1000, now: c.now });
  assert.equal(l.check('ip').allowed, true);
  assert.equal(l.check('ip').allowed, false);
  c.advance(100); // t = 1000: a new window, only 100ms later
  assert.equal(l.check('ip').allowed, true);
});

test('the burst at a window edge: 2 x limit in a short time', () => {
  const c = clock(999);
  const l = new FixedWindowLimiter({ limit: 2, windowMs: 1000, now: c.now });
  const allowed = [];
  allowed.push(l.check('k').allowed, l.check('k').allowed);
  c.advance(1);
  allowed.push(l.check('k').allowed, l.check('k').allowed, l.check('k').allowed);
  assert.deepEqual(allowed, [true, true, true, true, false]);
});

test('blocked requests do not count', () => {
  const c = clock();
  const l = new FixedWindowLimiter({ limit: 1, windowMs: 1000, now: c.now });
  l.check('k');
  l.check('k');
  l.check('k');
  c.advance(1000);
  assert.deepEqual(l.check('k'), { allowed: true, remaining: 0, retryAfterMs: 0 });
});

test('keys are independent', () => {
  const l = new FixedWindowLimiter({ limit: 1, windowMs: 1000, now: clock().now });
  assert.equal(l.check('a').allowed, true);
  assert.equal(l.check('b').allowed, true);
  assert.equal(l.check('a').allowed, false);
});

test('headers when allowed', () =>
  assert.deepEqual(rateLimitHeaders({ allowed: true, remaining: 4, retryAfterMs: 0 }, 5), { 'X-RateLimit-Limit': '5', 'X-RateLimit-Remaining': '4' }));
test('headers when blocked round Retry-After up to whole seconds', () =>
  assert.deepEqual(rateLimitHeaders({ allowed: false, remaining: 0, retryAfterMs: 1001 }, 5), {
    'X-RateLimit-Limit': '5',
    'X-RateLimit-Remaining': '0',
    'Retry-After': '2',
  }));
test('Retry-After for an exact number of seconds', () =>
  assert.equal(rateLimitHeaders({ allowed: false, remaining: 0, retryAfterMs: 3000 }, 1)['Retry-After'], '3'));
