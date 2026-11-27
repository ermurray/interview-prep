import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { promiseRace, promiseProps } = await load('js-from-scratch', 'race-and-props');

const delay = (ms, value, fail = false) =>
  new Promise((res, rej) => setTimeout(() => (fail ? rej(value) : res(value)), ms));

test('race: the first to fulfil wins', async () => assert.equal(await promiseRace([delay(20, 'slow'), delay(5, 'fast')]), 'fast'));
test('race: the first to reject wins', async () =>
  assert.rejects(promiseRace([delay(20, 'slow'), delay(5, 'boom', true)]), (e) => e === 'boom'));
test('race: a plain value wins over pending promises', async () => assert.equal(await promiseRace([delay(10, 'p'), 'now']), 'now'));
test('race: accepts any iterable', async () => assert.equal(await promiseRace(new Set([delay(5, 'set')])), 'set'));
test('race: an empty input never settles', async () => {
  const outcome = await Promise.race([promiseRace([]).then(() => 'settled', () => 'settled'), delay(30, 'pending')]);
  assert.equal(outcome, 'pending');
});
test('race: later results are ignored', async () => {
  const p = promiseRace([delay(5, 'first'), delay(10, 'second', true)]);
  assert.equal(await p, 'first');
  await delay(15);
});

test('props: resolves every value under the same key', async () =>
  assert.deepEqual(await promiseProps({ user: delay(10, 'ada'), posts: delay(5, [1, 2]), page: 1 }), { user: 'ada', posts: [1, 2], page: 1 }));
test('props: empty object -> {}', async () => assert.deepEqual(await promiseProps({}), {}));
test('props: rejects as soon as one value rejects', async () =>
  assert.rejects(promiseProps({ a: delay(50, 'a'), b: delay(5, new Error('b failed'), true) }), /b failed/));
test('props: returns a new object', async () => {
  const input = { a: 1 };
  const out = await promiseProps(input);
  assert.notEqual(out, input);
  assert.deepEqual(input, { a: 1 });
});
test('props: keeps falsy and undefined values', async () =>
  assert.deepEqual(await promiseProps({ z: 0, n: null, u: Promise.resolve(undefined) }), { z: 0, n: null, u: undefined }));
