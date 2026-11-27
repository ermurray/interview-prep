import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { promiseAll } = await load('js-from-scratch', 'promise-all');

const delay = (ms, value, fail = false) =>
  new Promise((res, rej) => setTimeout(() => (fail ? rej(value) : res(value)), ms));

test('returns a promise', () => {
  const p = promiseAll([]);
  assert.equal(typeof p?.then, 'function');
});
test('empty input resolves to []', async () => assert.deepEqual(await promiseAll([]), []));
test('preserves order, not completion order', async () =>
  assert.deepEqual(await promiseAll([delay(30, 'a'), delay(10, 'b'), delay(20, 'c')]), ['a', 'b', 'c']));
test('handles non-promise values', async () =>
  assert.deepEqual(await promiseAll([1, Promise.resolve(2), 'three']), [1, 2, 'three']));
test('rejects with the first failure', async () =>
  assert.rejects(promiseAll([delay(30, 'slow'), delay(10, 'boom', true), delay(20, 'later', true)]), (e) => e === 'boom'));
test('accepts any iterable (e.g. a Set)', async () =>
  assert.deepEqual(await promiseAll(new Set([1, 2, 3])), [1, 2, 3]));

// ---- more edge cases ----
test('array results are not flattened', async () => assert.deepEqual(await promiseAll([Promise.resolve([1, 2]), [3]]), [[1, 2], [3]]));
test('thenables are adopted', async () => assert.deepEqual(await promiseAll([{ then: (r) => r(5) }]), [5]));
test('a string is an iterable of characters', async () => assert.deepEqual(await promiseAll('ab'), ['a', 'b']));
test('rejects with a non-Error reason', async () => assert.rejects(promiseAll([1, Promise.reject(42)]), (e) => e === 42));
test('rejects even if the failure is the last to settle', async () =>
  assert.rejects(promiseAll([delay(5, 'a'), delay(20, 'b', true)]), (e) => e === 'b'));
test('undefined and null values are kept', async () => assert.deepEqual(await promiseAll([undefined, null]), [undefined, null]));
test('1,000 promises', async () => {
  const out = await promiseAll(Array.from({ length: 1000 }, (_, i) => Promise.resolve(i)));
  assert.equal(out.length, 1000);
  assert.equal(out[999], 999);
});
