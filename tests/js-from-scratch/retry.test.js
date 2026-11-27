import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { retry } = await load('js-from-scratch', 'retry');

const flaky = (failures, value = 'ok') => {
  let calls = 0;
  const fn = async () => {
    calls++;
    if (calls <= failures) throw new Error(`fail ${calls}`);
    return value;
  };
  return { fn, calls: () => calls };
};

test('resolves immediately when the first call succeeds', async () => {
  const f = flaky(0);
  assert.equal(await retry(f.fn, { retries: 3, backoffMs: 1 }), 'ok');
  assert.equal(f.calls(), 1);
});

test('retries until success', async () => {
  const f = flaky(2);
  assert.equal(await retry(f.fn, { retries: 3, backoffMs: 1 }), 'ok');
  assert.equal(f.calls(), 3);
});

test('gives up after retries + 1 attempts with the last error', async () => {
  const f = flaky(10);
  await assert.rejects(retry(f.fn, { retries: 2, backoffMs: 1 }), /fail 3/);
  assert.equal(f.calls(), 3);
});

test('backs off exponentially', async () => {
  const f = flaky(3);
  const start = Date.now();
  await retry(f.fn, { retries: 3, backoffMs: 20 });
  const elapsed = Date.now() - start;
  // delays are at least 20 + 40 + 80 = 140ms (plus jitter < 3 * 20ms)
  assert.ok(elapsed >= 135, `expected >= 140ms of backoff, got ${elapsed}ms`);
  assert.ok(elapsed < 400, `backoff too long: ${elapsed}ms`);
});

test('an already-aborted signal rejects without calling fn', async () => {
  const f = flaky(0);
  const ac = new AbortController();
  ac.abort();
  await assert.rejects(retry(f.fn, { retries: 3, backoffMs: 1, signal: ac.signal }));
  assert.equal(f.calls(), 0);
});

test('aborting during backoff stops further attempts', async () => {
  const f = flaky(10);
  const ac = new AbortController();
  setTimeout(() => ac.abort(), 30);
  await assert.rejects(retry(f.fn, { retries: 10, backoffMs: 20, signal: ac.signal }));
  const callsAtAbort = f.calls();
  await new Promise((r) => setTimeout(r, 100));
  assert.equal(f.calls(), callsAtAbort, 'no attempts after abort');
  assert.ok(callsAtAbort < 4);
});

// ---- more edge cases ----
test('retries: 0 means a single attempt', async () => {
  const f = flaky(1);
  await assert.rejects(retry(f.fn, { retries: 0, backoffMs: 1 }), /fail 1/);
  assert.equal(f.calls(), 1);
});

test('resolves with falsy values', async () => {
  const f = flaky(1, 0);
  assert.equal(await retry(f.fn, { retries: 2, backoffMs: 1 }), 0);
});

test('rejects with the last error, not the first', async () => {
  let n = 0;
  const fn = async () => { throw new Error(`attempt ${++n}`); };
  await assert.rejects(retry(fn, { retries: 2, backoffMs: 1 }), /attempt 3/);
});

test('the first attempt is not delayed', async () => {
  const start = Date.now();
  await retry(async () => 'now', { retries: 3, backoffMs: 500 });
  assert.ok(Date.now() - start < 100);
});
