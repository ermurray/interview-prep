import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { hedge } = await load('js-from-scratch', 'hedged-request');

const delay = (ms, value, fail = false) =>
  new Promise((res, rej) => {
    setTimeout(() => (fail ? rej(value) : res(value)), ms);
  });

test('a fast first attempt wins and no backup starts', async () => {
  const started = [];
  const result = await hedge(
    (i) => {
      started.push(i);
      return delay(5, `r${i}`);
    },
    { delayMs: 50, maxAttempts: 3 },
  );
  assert.equal(result, 'r0');
  await delay(80);
  assert.deepEqual(started, [0]);
});

test('a slow first attempt gets a backup, and the faster one wins', async () => {
  const started = [];
  const result = await hedge(
    (i) => {
      started.push(i);
      return i === 0 ? delay(200, 'slow') : delay(5, 'backup');
    },
    { delayMs: 20, maxAttempts: 2 },
  );
  assert.equal(result, 'backup');
  assert.deepEqual(started, [0, 1]);
});

test('never starts more than maxAttempts', async () => {
  const started = [];
  await hedge(
    (i) => {
      started.push(i);
      return delay(100, i);
    },
    { delayMs: 10, maxAttempts: 3 },
  );
  assert.deepEqual(started, [0, 1, 2]);
});

test('a failure starts the next attempt straight away', async () => {
  const startedAt = [];
  const t0 = Date.now();
  const result = await hedge(
    (i) => {
      startedAt.push(Date.now() - t0);
      return i === 0 ? Promise.reject(new Error('fail fast')) : delay(5, 'ok');
    },
    { delayMs: 1000, maxAttempts: 2 },
  );
  assert.equal(result, 'ok');
  assert.ok(
    startedAt[1] < 500,
    `the backup started after ${startedAt[1]}ms instead of straight away`,
  );
});

test('rejects with the last error when every attempt fails', async () => {
  await assert.rejects(
    hedge((i) => delay(i === 0 ? 30 : 5, new Error(`attempt ${i}`), true), {
      delayMs: 10,
      maxAttempts: 2,
    }),
    /attempt 0/,
  );
});

test('a later failure after a success is ignored', async () => {
  const result = await hedge(
    (i) => (i === 0 ? delay(30, new Error('late'), true) : delay(5, 'win')),
    { delayMs: 10, maxAttempts: 2 },
  );
  assert.equal(result, 'win');
  await delay(40);
});

test('maxAttempts 1 is just the call', async () => {
  await assert.rejects(
    hedge(() => Promise.reject(new Error('only')), { delayMs: 10, maxAttempts: 1 }),
    /only/,
  );
});
