import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { RateLimiter, rateLimitMiddleware } = await load('fullstack', 'rate-limiter');

const clock = (start = 0) => {
  let t = start;
  return { now: () => t, advance: (ms) => { t += ms; } };
};

test('allows up to the limit, then blocks', () => {
  const c = clock();
  const rl = new RateLimiter({ limit: 2, windowMs: 1000, now: c.now });
  assert.deepEqual([rl.allow('a'), rl.allow('a'), rl.allow('a')], [true, true, false]);
});

test('keys are independent', () => {
  const c = clock();
  const rl = new RateLimiter({ limit: 1, windowMs: 1000, now: c.now });
  assert.equal(rl.allow('a'), true);
  assert.equal(rl.allow('b'), true);
  assert.equal(rl.allow('a'), false);
});

test('window slides: old requests expire', () => {
  const c = clock();
  const rl = new RateLimiter({ limit: 2, windowMs: 1000, now: c.now });
  rl.allow('a');            // t = 0
  c.advance(500);
  rl.allow('a');            // t = 500
  c.advance(499);
  assert.equal(rl.allow('a'), false, 't = 999: both still in window');
  c.advance(1);
  assert.equal(rl.allow('a'), true, 't = 1000: first request has expired');
  assert.equal(rl.allow('a'), false, 't = 1000: request at 500 is still in window');
});

test('rejected requests do not count', () => {
  const c = clock();
  const rl = new RateLimiter({ limit: 1, windowMs: 1000, now: c.now });
  rl.allow('a');            // t = 0, allowed
  c.advance(900);
  rl.allow('a');            // t = 900, rejected
  c.advance(100);
  assert.equal(rl.allow('a'), true, 't = 1000: only the t = 0 request counted');
});

test('middleware calls next() when allowed and sends 429 when blocked', () => {
  const c = clock();
  const rl = new RateLimiter({ limit: 1, windowMs: 1000, now: c.now });
  const mw = rateLimitMiddleware(rl);
  const makeRes = () => {
    const res = { statusCode: 200, body: undefined };
    res.status = (code) => { res.statusCode = code; return res; };
    res.send = (body) => { res.body = body; return res; };
    return res;
  };
  let nextCalls = 0;
  const next = () => nextCalls++;

  const res1 = makeRes();
  mw({ ip: '1.1.1.1' }, res1, next);
  assert.equal(nextCalls, 1);
  assert.equal(res1.statusCode, 200);

  const res2 = makeRes();
  mw({ ip: '1.1.1.1' }, res2, next);
  assert.equal(nextCalls, 1);
  assert.equal(res2.statusCode, 429);

  mw({ ip: '2.2.2.2' }, makeRes(), next);
  assert.equal(nextCalls, 2, 'a different IP is allowed');
});

test('middleware uses a custom key function', () => {
  const rl = new RateLimiter({ limit: 1, windowMs: 1000, now: () => 0 });
  const mw = rateLimitMiddleware(rl, (req) => req.user);
  let nextCalls = 0;
  const res = { status() { return this; }, send() { return this; } };
  mw({ ip: 'same', user: 'u1' }, res, () => nextCalls++);
  mw({ ip: 'same', user: 'u2' }, res, () => nextCalls++);
  assert.equal(nextCalls, 2);
});
