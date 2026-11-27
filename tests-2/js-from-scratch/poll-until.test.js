import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { pollUntil } = await load('js-from-scratch', 'poll-until');

const counter = (succeedOn, value = 'done') => {
  let calls = 0;
  const fn = async () => (++calls >= succeedOn ? value : null);
  return { fn, calls: () => calls };
};

test('resolves straight away when fn is truthy on the first call', async () => {
  const c = counter(1);
  assert.equal(await pollUntil(c.fn, { intervalMs: 5 }), 'done');
  assert.equal(c.calls(), 1);
});

test('keeps polling until fn is truthy', async () => {
  const c = counter(4, { id: 1 });
  assert.deepEqual(await pollUntil(c.fn, { intervalMs: 5 }), { id: 1 });
  assert.equal(c.calls(), 4);
});

test('waits intervalMs between calls', async () => {
  const c = counter(3);
  const start = Date.now();
  await pollUntil(c.fn, { intervalMs: 30 });
  assert.ok(Date.now() - start >= 55, 'two waits of 30ms');
});

test('works with a sync fn', async () => {
  let n = 0;
  assert.equal(await pollUntil(() => ++n === 3 && 'yes', { intervalMs: 1 }), 'yes');
});

test('rejects with a TimeoutError', async () => {
  const c = counter(Infinity);
  await assert.rejects(pollUntil(c.fn, { intervalMs: 10, timeoutMs: 50 }), (e) => e.name === 'TimeoutError');
  const calls = c.calls();
  await new Promise((r) => setTimeout(r, 50));
  assert.equal(c.calls(), calls, 'stops polling after the timeout');
});

test('an error from fn rejects immediately', async () => {
  await assert.rejects(pollUntil(async () => { throw new Error('broken'); }, { intervalMs: 5 }), /broken/);
});

test('abort stops polling', async () => {
  const c = counter(Infinity);
  const ac = new AbortController();
  setTimeout(() => ac.abort(new Error('stopped')), 30);
  await assert.rejects(pollUntil(c.fn, { intervalMs: 10, signal: ac.signal }), /stopped/);
  const calls = c.calls();
  await new Promise((r) => setTimeout(r, 50));
  assert.equal(c.calls(), calls);
});

test('an already-aborted signal rejects without calling fn', async () => {
  const c = counter(1);
  const ac = new AbortController();
  ac.abort();
  await assert.rejects(pollUntil(c.fn, { signal: ac.signal }));
  assert.equal(c.calls(), 0);
});

// ---- more edge cases ----
test('falsy results (0, "", false) keep polling', async () => {
  const results = [0, '', false, null, 'finally'];
  let i = 0;
  assert.equal(await pollUntil(() => results[i++], { intervalMs: 1 }), 'finally');
  assert.equal(i, 5);
});

test('resolves with the exact truthy value', async () => {
  const obj = { ready: true };
  assert.equal(await pollUntil(() => obj, { intervalMs: 1 }), obj);
});

test('an error after a few falsy results still rejects', async () => {
  let n = 0;
  await assert.rejects(pollUntil(() => { if (++n === 3) throw new Error('third'); return null; }, { intervalMs: 1 }), /third/);
  assert.equal(n, 3);
});

test('timeout shorter than the interval still times out', async () => {
  await assert.rejects(pollUntil(() => null, { intervalMs: 1000, timeoutMs: 20 }), (e) => e.name === 'TimeoutError');
});
