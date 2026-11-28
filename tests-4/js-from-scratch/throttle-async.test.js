import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { throttleAsync } = await load('js-from-scratch', 'throttle-async');

const useFakeTimers = (t) => t.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
const flush = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve();
};

test('calls start intervalMs apart, in order', async (t) => {
  useFakeTimers(t);
  const starts = [];
  const fn = t.mock.fn(async (x) => {
    starts.push([x, Date.now()]);
    return x * 2;
  });
  const th = throttleAsync(fn, 100);
  const results = Promise.all([th(1), th(2), th(3)]);
  await flush();
  assert.deepEqual(starts, [[1, 0]]);
  t.mock.timers.tick(100);
  await flush();
  t.mock.timers.tick(100);
  await flush();
  assert.deepEqual(starts, [
    [1, 0],
    [2, 100],
    [3, 200],
  ]);
  assert.deepEqual(await results, [2, 4, 6]);
});

test('the first call starts immediately', async (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn(async () => 'now');
  const p = throttleAsync(fn, 1000)();
  await flush();
  assert.equal(fn.mock.callCount(), 1);
  assert.equal(await p, 'now');
});

test('after a quiet period the next call starts immediately', async (t) => {
  useFakeTimers(t);
  const fn = t.mock.fn(async () => {});
  const th = throttleAsync(fn, 100);
  await th();
  t.mock.timers.tick(500);
  th();
  await flush();
  assert.equal(fn.mock.callCount(), 2);
});

test('spacing is measured from the previous start, not its end', async (t) => {
  useFakeTimers(t);
  const starts = [];
  const fn = (x) => {
    starts.push(Date.now());
    return new Promise((r) => {
      setTimeout(() => r(x), 300);
    });
  };
  const th = throttleAsync(fn, 100);
  const all = Promise.all([th(1), th(2)]);
  await flush();
  t.mock.timers.tick(100);
  await flush();
  assert.deepEqual(starts, [0, 100]);
  t.mock.timers.tick(400);
  await all;
});

test('a rejection does not stop the queue', async (t) => {
  useFakeTimers(t);
  const fn = async (x) => {
    if (x === 'bad') throw new Error('bad');
    return x;
  };
  const th = throttleAsync(fn, 10);
  const bad = th('bad');
  const good = th('good');
  await assert.rejects(bad, /bad/);
  t.mock.timers.tick(10);
  assert.equal(await good, 'good');
});

test('passes arguments and works with a sync fn', async (t) => {
  useFakeTimers(t);
  const th = throttleAsync((a, b) => a + b, 10);
  assert.equal(await th(2, 3), 5);
});
