import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { createBatcher } = await load('js-from-scratch', 'create-batcher');

const useFakeTimers = (t) => t.mock.timers.enable({ apis: ['setTimeout'] });
const flush = () => new Promise((r) => setImmediate(r));

test('loads in the same tick are sent as one batch', async (t) => {
  useFakeTimers(t);
  const batchFn = t.mock.fn(async (keys) => keys.map((k) => `user-${k}`));
  const b = createBatcher(batchFn);
  const results = Promise.all([b.load(1), b.load(2), b.load(3)]);
  t.mock.timers.tick(0);
  assert.deepEqual(await results, ['user-1', 'user-2', 'user-3']);
  assert.equal(batchFn.mock.callCount(), 1);
  assert.deepEqual(batchFn.mock.calls[0].arguments[0], [1, 2, 3]);
});

test('duplicate keys are sent once and both callers get the result', async (t) => {
  useFakeTimers(t);
  const batchFn = t.mock.fn(async (keys) => keys.map((k) => k * 10));
  const b = createBatcher(batchFn);
  const results = Promise.all([b.load(1), b.load(2), b.load(1)]);
  t.mock.timers.tick(0);
  assert.deepEqual(await results, [10, 20, 10]);
  assert.deepEqual(batchFn.mock.calls[0].arguments[0], [1, 2]);
});

test('wait collects loads over a time window', async (t) => {
  useFakeTimers(t);
  const batchFn = t.mock.fn((keys) => keys);
  const b = createBatcher(batchFn, { wait: 50 });
  const a = b.load('a');
  t.mock.timers.tick(30);
  const c = b.load('c');
  t.mock.timers.tick(20);
  assert.deepEqual(await Promise.all([a, c]), ['a', 'c']);
  assert.equal(batchFn.mock.callCount(), 1);
});

test('loads after a batch was sent start a new batch', async (t) => {
  useFakeTimers(t);
  const batchFn = t.mock.fn((keys) => keys);
  const b = createBatcher(batchFn, { wait: 10 });
  const first = b.load(1);
  t.mock.timers.tick(10);
  await first;
  const second = b.load(2);
  t.mock.timers.tick(10);
  await second;
  assert.deepEqual(batchFn.mock.calls.map((c) => c.arguments[0]), [[1], [2]]);
});

test('maxBatchSize sends a full batch straight away', async (t) => {
  useFakeTimers(t);
  const batchFn = t.mock.fn((keys) => keys);
  const b = createBatcher(batchFn, { wait: 1000, maxBatchSize: 2 });
  const p1 = b.load(1);
  const p2 = b.load(2);
  await flush();
  assert.equal(batchFn.mock.callCount(), 1, 'sent without waiting for the timer');
  assert.deepEqual(await Promise.all([p1, p2]), [1, 2]);
  const p3 = b.load(3);
  t.mock.timers.tick(1000);
  assert.equal(await p3, 3);
  assert.deepEqual(batchFn.mock.calls.map((c) => c.arguments[0]), [[1, 2], [3]]);
});

test('works with a batchFn that returns a plain array', async (t) => {
  useFakeTimers(t);
  const b = createBatcher((keys) => keys.map((k) => k.toUpperCase()));
  const p = b.load('x');
  t.mock.timers.tick(0);
  assert.equal(await p, 'X');
});

test('a rejecting batchFn rejects every load in the batch', async (t) => {
  useFakeTimers(t);
  const b = createBatcher(async () => { throw new Error('backend down'); });
  const p1 = b.load(1);
  const p2 = b.load(2);
  t.mock.timers.tick(0);
  await assert.rejects(p1, /backend down/);
  await assert.rejects(p2, /backend down/);
});

test('a synchronous throw rejects every load in the batch', async (t) => {
  useFakeTimers(t);
  const b = createBatcher(() => { throw new Error('sync'); });
  const p = b.load(1);
  t.mock.timers.tick(0);
  await assert.rejects(p, /sync/);
});

test('a result array of the wrong length rejects the batch', async (t) => {
  useFakeTimers(t);
  const b = createBatcher(async () => ['only one']);
  const p1 = b.load(1);
  const p2 = b.load(2);
  t.mock.timers.tick(0);
  await assert.rejects(p1);
  await assert.rejects(p2);
});

test('falsy results are delivered', async (t) => {
  useFakeTimers(t);
  const b = createBatcher(async (keys) => keys.map(() => 0));
  const p = b.load('k');
  t.mock.timers.tick(0);
  assert.equal(await p, 0);
});
