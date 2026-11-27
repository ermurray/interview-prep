import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { timeout } = await load('js-from-scratch', 'timeout');

const delay = (ms, value, fail = false) =>
  new Promise((res, rej) => setTimeout(() => (fail ? rej(value) : res(value)), ms));

test('resolves with the value when fast enough', async () => assert.equal(await timeout(delay(5, 'ok'), 100), 'ok'));
test('passes through a rejection when fast enough', async () =>
  assert.rejects(timeout(delay(5, new Error('boom'), true), 100), /boom/));
test('rejects with a TimeoutError when too slow', async () =>
  assert.rejects(timeout(delay(200, 'late'), 20), (e) => e instanceof Error && e.name === 'TimeoutError'));
test('works with an already-resolved promise', async () => assert.equal(await timeout(Promise.resolve(1), 10), 1));
test('clears its timer once the promise settles', async () => {
  const start = Date.now();
  await timeout(Promise.resolve('fast'), 5000);
  // if the 5s timer leaked, node:test would wait for it at the end of this file
  assert.ok(Date.now() - start < 1000);
});

// ---- more edge cases ----
test('the original rejection reason is passed through unchanged', async () => {
  const reason = { code: 42 };
  await assert.rejects(timeout(Promise.reject(reason), 100), (e) => e === reason);
});
test('falsy results are passed through', async () => assert.equal(await timeout(Promise.resolve(0), 100), 0));
test('a TimeoutError is a real Error with a message', async () => {
  await assert.rejects(timeout(new Promise(() => {}), 10), (e) => {
    assert.ok(e instanceof Error);
    assert.equal(e.name, 'TimeoutError');
    assert.ok(e.message.length > 0, 'has a message');
    return true;
  });
});
test('a late result after the timeout does not change the outcome', async () => {
  const p = timeout(delay(30, 'late'), 10);
  await assert.rejects(p, (e) => e.name === 'TimeoutError');
  await delay(40);
});
