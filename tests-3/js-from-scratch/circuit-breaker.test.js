import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { createCircuitBreaker } = await load('js-from-scratch', 'circuit-breaker');

const clock = () => {
  let t = 0;
  return { now: () => t, advance: (ms) => { t += ms; } };
};
const failing = () => { let calls = 0; const fn = async () => { calls++; throw new Error('down'); }; return { fn, calls: () => calls }; };
const isOpenError = (e) => e instanceof Error && e.name === 'CircuitOpenError';

test('closed: passes calls and arguments through', async () => {
  const b = createCircuitBreaker(async (a, c) => a + c, { failureThreshold: 2, resetMs: 100, now: clock().now });
  assert.equal(await b.call(2, 3), 5);
  assert.equal(b.state, 'closed');
});

test('closed: failures are passed through until the threshold', async () => {
  const f = failing();
  const b = createCircuitBreaker(f.fn, { failureThreshold: 3, resetMs: 100, now: clock().now });
  await assert.rejects(b.call(), /down/);
  await assert.rejects(b.call(), /down/);
  assert.equal(b.state, 'closed');
  await assert.rejects(b.call(), /down/);
  assert.equal(b.state, 'open');
});

test('open: rejects with CircuitOpenError without calling fn', async () => {
  const f = failing();
  const b = createCircuitBreaker(f.fn, { failureThreshold: 1, resetMs: 100, now: clock().now });
  await assert.rejects(b.call());
  await assert.rejects(b.call(), isOpenError);
  assert.equal(f.calls(), 1);
});

test('a success resets the failure count', async () => {
  let fail = true;
  const b = createCircuitBreaker(async () => { if (fail) throw new Error('x'); return 'ok'; }, { failureThreshold: 2, resetMs: 100, now: clock().now });
  await assert.rejects(b.call());
  fail = false;
  await b.call();
  fail = true;
  await assert.rejects(b.call());
  assert.equal(b.state, 'closed', 'only one consecutive failure since the success');
});

test('half-open after resetMs, and a successful trial closes it', async () => {
  const c = clock();
  let fail = true;
  const b = createCircuitBreaker(async () => { if (fail) throw new Error('x'); return 'recovered'; }, { failureThreshold: 1, resetMs: 100, now: c.now });
  await assert.rejects(b.call());
  c.advance(99);
  assert.equal(b.state, 'open');
  c.advance(1);
  assert.equal(b.state, 'half-open');
  fail = false;
  assert.equal(await b.call(), 'recovered');
  assert.equal(b.state, 'closed');
});

test('a failed trial opens the circuit for another resetMs', async () => {
  const c = clock();
  const f = failing();
  const b = createCircuitBreaker(f.fn, { failureThreshold: 1, resetMs: 100, now: c.now });
  await assert.rejects(b.call());
  c.advance(100);
  await assert.rejects(b.call(), /down/);
  assert.equal(b.state, 'open');
  c.advance(50);
  await assert.rejects(b.call(), isOpenError);
  assert.equal(f.calls(), 2);
  c.advance(50);
  assert.equal(b.state, 'half-open');
});

test('only one trial call at a time while half-open', async () => {
  const c = clock();
  let fail = true;
  let release;
  const b = createCircuitBreaker(async () => {
    if (fail) throw new Error('x');
    await new Promise((r) => { release = r; });
    return 'trial';
  }, { failureThreshold: 1, resetMs: 100, now: c.now });
  await assert.rejects(b.call());
  c.advance(100);
  fail = false;
  const trial = b.call();
  await assert.rejects(b.call(), isOpenError);
  release();
  assert.equal(await trial, 'trial');
  assert.equal(b.state, 'closed');
});

test('a synchronous throw from fn counts as a failure', async () => {
  const b = createCircuitBreaker(() => { throw new Error('sync'); }, { failureThreshold: 1, resetMs: 100, now: clock().now });
  await assert.rejects(b.call(), /sync/);
  assert.equal(b.state, 'open');
});
