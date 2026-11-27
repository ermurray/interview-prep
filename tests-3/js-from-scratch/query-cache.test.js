import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { createQueryCache } = await load('js-from-scratch', 'query-cache');

const clock = () => {
  let t = 0;
  return { now: () => t, advance: (ms) => { t += ms; } };
};
const flush = () => new Promise((r) => setImmediate(r));

test('first get fetches and caches', async (t) => {
  const fetcher = t.mock.fn(async () => 'v1');
  const cache = createQueryCache({ staleMs: 1000, now: clock().now });
  assert.equal(await cache.get('k', fetcher), 'v1');
  assert.equal(cache.getCached('k'), 'v1');
  assert.equal(fetcher.mock.callCount(), 1);
});

test('a fresh entry is served without fetching', async (t) => {
  const c = clock();
  const fetcher = t.mock.fn(async () => 'v1');
  const cache = createQueryCache({ staleMs: 1000, now: c.now });
  await cache.get('k', fetcher);
  c.advance(999);
  assert.equal(await cache.get('k', fetcher), 'v1');
  assert.equal(fetcher.mock.callCount(), 1);
});

test('a stale entry is served at once and refreshed in the background', async (t) => {
  const c = clock();
  let version = 0;
  const fetcher = t.mock.fn(async () => `v${++version}`);
  const cache = createQueryCache({ staleMs: 1000, now: c.now });
  await cache.get('k', fetcher);
  c.advance(1000);
  assert.equal(await cache.get('k', fetcher), 'v1', 'stale value returned straight away');
  assert.equal(fetcher.mock.callCount(), 2, 'background refetch started');
  await flush();
  assert.equal(cache.getCached('k'), 'v2', 'cache updated after the refetch');
});

test('concurrent first gets share one fetch', async (t) => {
  const fetcher = t.mock.fn(async () => 'once');
  const cache = createQueryCache({ staleMs: 1000, now: clock().now });
  assert.deepEqual(await Promise.all([cache.get('k', fetcher), cache.get('k', fetcher)]), ['once', 'once']);
  assert.equal(fetcher.mock.callCount(), 1);
});

test('concurrent stale gets share one background refetch', async (t) => {
  const c = clock();
  const fetcher = t.mock.fn(async () => 'v');
  const cache = createQueryCache({ staleMs: 10, now: c.now });
  await cache.get('k', fetcher);
  c.advance(10);
  await Promise.all([cache.get('k', fetcher), cache.get('k', fetcher), cache.get('k', fetcher)]);
  assert.equal(fetcher.mock.callCount(), 2);
});

test('a failed background refetch keeps the old value', async () => {
  const c = clock();
  let fail = false;
  const fetcher = async () => { if (fail) throw new Error('offline'); return 'good'; };
  const cache = createQueryCache({ staleMs: 10, now: c.now });
  await cache.get('k', fetcher);
  c.advance(10);
  fail = true;
  assert.equal(await cache.get('k', fetcher), 'good');
  await flush();
  assert.equal(cache.getCached('k'), 'good');
});

test('a rejected first fetch is not cached', async () => {
  let fail = true;
  const fetcher = async () => { if (fail) throw new Error('nope'); return 'yes'; };
  const cache = createQueryCache({ staleMs: 1000, now: clock().now });
  await assert.rejects(cache.get('k', fetcher), /nope/);
  assert.equal(cache.getCached('k'), undefined);
  fail = false;
  assert.equal(await cache.get('k', fetcher), 'yes');
});

test('invalidate forces the next get to fetch', async (t) => {
  const fetcher = t.mock.fn(async () => 'v');
  const cache = createQueryCache({ staleMs: 100000, now: clock().now });
  await cache.get('k', fetcher);
  cache.invalidate('k');
  assert.equal(cache.getCached('k'), undefined);
  await cache.get('k', fetcher);
  assert.equal(fetcher.mock.callCount(), 2);
});

test('keys are cached separately', async () => {
  const cache = createQueryCache({ staleMs: 1000, now: clock().now });
  await cache.get('a', async () => 'A');
  await cache.get('b', async () => 'B');
  assert.equal(cache.getCached('a'), 'A');
  assert.equal(cache.getCached('b'), 'B');
});

test('staleMs 0: every get after the first revalidates', async (t) => {
  const fetcher = t.mock.fn(async () => 'v');
  const cache = createQueryCache({ staleMs: 0, now: clock().now });
  await cache.get('k', fetcher);
  await flush();
  await cache.get('k', fetcher);
  await flush();
  assert.equal(fetcher.mock.callCount(), 2);
});

test('falsy values are cached', async (t) => {
  const fetcher = t.mock.fn(async () => 0);
  const cache = createQueryCache({ staleMs: 1000, now: clock().now });
  assert.equal(await cache.get('z', fetcher), 0);
  assert.equal(await cache.get('z', fetcher), 0);
  assert.equal(fetcher.mock.callCount(), 1);
});
