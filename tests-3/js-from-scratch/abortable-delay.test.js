import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { delay } = await load('js-from-scratch', 'abortable-delay');

test('resolves with the value after ms', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let done = false;
  const p = delay(100, { value: 'ok' }).then((v) => { done = true; return v; });
  t.mock.timers.tick(99);
  await Promise.resolve();
  assert.equal(done, false);
  t.mock.timers.tick(1);
  assert.equal(await p, 'ok');
});

test('resolves with undefined by default', async () => assert.equal(await delay(1), undefined));

test('an already-aborted signal rejects straight away with its reason', async () => {
  const ac = new AbortController();
  const reason = new Error('already');
  ac.abort(reason);
  await assert.rejects(delay(10000, { signal: ac.signal }), (e) => e === reason);
});

test('aborting while waiting rejects with the reason', async () => {
  const ac = new AbortController();
  const p = delay(10000, { signal: ac.signal });
  setTimeout(() => ac.abort(new Error('cancelled')), 5);
  const start = Date.now();
  await assert.rejects(p, /cancelled/);
  assert.ok(Date.now() - start < 1000, 'rejected promptly, not after the full delay');
});

test('aborting clears the timer (the process is not kept waiting)', async () => {
  const ac = new AbortController();
  const p = delay(60000, { signal: ac.signal });
  ac.abort();
  await assert.rejects(p);
  // if the 60s timer leaked, this test file would not finish within the 10s test timeout
});

test('the abort listener is removed after the delay resolves', async () => {
  const ac = new AbortController();
  let added = 0;
  let removed = 0;
  const signal = ac.signal;
  const add = signal.addEventListener.bind(signal);
  const remove = signal.removeEventListener.bind(signal);
  signal.addEventListener = (...args) => { added++; return add(...args); };
  signal.removeEventListener = (...args) => { removed++; return remove(...args); };
  for (let i = 0; i < 3; i++) await delay(1, { signal });
  assert.equal(added, 3);
  assert.equal(removed, 3);
});

test('aborting after the delay resolved changes nothing', async () => {
  const ac = new AbortController();
  const value = await delay(1, { value: 7, signal: ac.signal });
  ac.abort();
  assert.equal(value, 7);
});

test('a falsy value is delivered', async () => assert.equal(await delay(1, { value: 0 }), 0));
