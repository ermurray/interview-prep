import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { promiseAllSettled, promiseAny } = await load('js-from-scratch', 'promise-combinators');

const delay = (ms, value, fail = false) =>
  new Promise((res, rej) => setTimeout(() => (fail ? rej(value) : res(value)), ms));

test('allSettled: reports every outcome in input order', async () => {
  assert.deepEqual(await promiseAllSettled([delay(20, 1), delay(5, 'x', true), 3]), [
    { status: 'fulfilled', value: 1 },
    { status: 'rejected', reason: 'x' },
    { status: 'fulfilled', value: 3 },
  ]);
});
test('allSettled: empty input -> []', async () => assert.deepEqual(await promiseAllSettled([]), []));
test('allSettled: never rejects', async () => {
  const out = await promiseAllSettled([Promise.reject(new Error('a')), Promise.reject(new Error('b'))]);
  assert.deepEqual(out.map((r) => r.status), ['rejected', 'rejected']);
});
test('allSettled: accepts any iterable', async () =>
  assert.deepEqual((await promiseAllSettled(new Set([1]))), [{ status: 'fulfilled', value: 1 }]));

test('any: first fulfilment wins, rejections are ignored', async () =>
  assert.equal(await promiseAny([Promise.reject('a'), delay(20, 'b'), delay(5, 'c')]), 'c'));
test('any: plain values count as fulfilled', async () => assert.equal(await promiseAny([Promise.reject('a'), 7]), 7));
test('any: all rejected -> AggregateError with reasons in input order', async () => {
  await assert.rejects(promiseAny([delay(20, 'slow', true), delay(5, 'fast', true)]), (e) => {
    assert.ok(e instanceof AggregateError);
    assert.deepEqual(e.errors, ['slow', 'fast']);
    return true;
  });
});
test('any: empty input rejects with AggregateError', async () =>
  assert.rejects(promiseAny([]), (e) => e instanceof AggregateError));

// ---- more edge cases ----
test('allSettled: thenables are adopted', async () =>
  assert.deepEqual(await promiseAllSettled([{ then: (r) => r('t') }]), [{ status: 'fulfilled', value: 't' }]));
test('allSettled: mixed timing keeps input order', async () => {
  const out = await promiseAllSettled([delay(15, 'slow'), delay(1, 'fast', true), 'now']);
  assert.deepEqual(out.map((r) => r.value ?? r.reason), ['slow', 'fast', 'now']);
});
test('any: a fulfilment after several rejections still wins', async () =>
  assert.equal(await promiseAny([delay(1, 'a', true), delay(5, 'b', true), delay(10, 'c')]), 'c'));
test('any: the first to fulfil wins, not the first in the list', async () =>
  assert.equal(await promiseAny([delay(20, 'first in list'), delay(5, 'first to finish')]), 'first to finish'));
test('any: accepts a Set', async () => assert.equal(await promiseAny(new Set([Promise.reject('x'), 'y'])), 'y'));
test('any: errors are in input order even when they settle out of order', async () => {
  await assert.rejects(promiseAny([delay(15, 1, true), delay(5, 2, true), delay(10, 3, true)]), (e) => {
    assert.deepEqual(e.errors, [1, 2, 3]);
    return true;
  });
});
