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
