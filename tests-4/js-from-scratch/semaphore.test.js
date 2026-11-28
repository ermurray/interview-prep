import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { createSemaphore } = await load('js-from-scratch', 'semaphore');

const wait = (ms) =>
  new Promise((r) => {
    setTimeout(r, ms);
  });

test('available starts at max', () => assert.equal(createSemaphore(3).available, 3));

test('acquire takes a permit and release returns it', async () => {
  const s = createSemaphore(2);
  const release = await s.acquire();
  assert.equal(s.available, 1);
  release();
  assert.equal(s.available, 2);
});

test('releasing twice only counts once', async () => {
  const s = createSemaphore(1);
  const release = await s.acquire();
  release();
  release();
  assert.equal(s.available, 1);
});

test('waiters are served first in, first out', async () => {
  const s = createSemaphore(1);
  const first = await s.acquire();
  const order = [];
  const a = s.acquire().then((r) => {
    order.push('a');
    return r;
  });
  const b = s.acquire().then((r) => {
    order.push('b');
    return r;
  });
  first();
  (await a)();
  (await b)();
  assert.deepEqual(order, ['a', 'b']);
});

test('use never runs more than max at once', async () => {
  const s = createSemaphore(2);
  let running = 0;
  let peak = 0;
  const job = async () => {
    running++;
    peak = Math.max(peak, running);
    await wait(3);
    running--;
  };
  await Promise.all(Array.from({ length: 8 }, () => s.use(job)));
  assert.equal(peak, 2);
  assert.equal(s.available, 2);
});

test('max 1 works as a mutex', async () => {
  const lock = createSemaphore(1);
  const log = [];
  const write = (name) =>
    lock.use(async () => {
      log.push(`${name}:start`);
      await wait(5);
      log.push(`${name}:end`);
    });
  await Promise.all([write('a'), write('b')]);
  assert.deepEqual(log, ['a:start', 'a:end', 'b:start', 'b:end']);
});

test('use returns the result of fn', async () =>
  assert.equal(await createSemaphore(1).use(() => 42), 42));

test('use releases the permit when fn throws', async () => {
  const s = createSemaphore(1);
  await assert.rejects(
    s.use(() => {
      throw new Error('boom');
    }),
    /boom/,
  );
  assert.equal(s.available, 1);
  assert.equal(await s.use(() => 'next'), 'next');
});
