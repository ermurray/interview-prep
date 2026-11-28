import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { promiseAllWithProgress, promiseSequence } = await load(
  'js-from-scratch',
  'progress-and-sequence',
);

const delay = (ms, value, fail = false) =>
  new Promise((res, rej) => {
    setTimeout(() => (fail ? rej(value) : res(value)), ms);
  });

test('progress: resolves like Promise.all, in input order', async () =>
  assert.deepEqual(await promiseAllWithProgress([delay(20, 'a'), delay(5, 'b'), 'c'], () => {}), [
    'a',
    'b',
    'c',
  ]));
test('progress: reports done/total as each one fulfils', async () => {
  const seen = [];
  await promiseAllWithProgress([delay(20, 1), delay(5, 2), delay(10, 3)], (done, total) =>
    seen.push([done, total]),
  );
  assert.deepEqual(seen, [
    [1, 3],
    [2, 3],
    [3, 3],
  ]);
});
test('progress: empty input resolves to [] without progress calls', async () => {
  const seen = [];
  assert.deepEqual(await promiseAllWithProgress([], (d) => seen.push(d)), []);
  assert.deepEqual(seen, []);
});
test('progress: rejects on the first failure', async () =>
  assert.rejects(
    promiseAllWithProgress([delay(20, 'ok'), delay(5, new Error('upload failed'), true)], () => {}),
    /upload failed/,
  ));
test('progress: plain values count straight away', async () => {
  const seen = [];
  await promiseAllWithProgress([1, 2], (done) => seen.push(done));
  assert.deepEqual(seen, [1, 2]);
});

test('sequence: runs tasks one at a time, in order', async () => {
  const events = [];
  const task = (name, ms) => async () => {
    events.push(`start ${name}`);
    await delay(ms);
    events.push(`end ${name}`);
    return name;
  };
  assert.deepEqual(await promiseSequence([task('a', 15), task('b', 1), task('c', 5)]), [
    'a',
    'b',
    'c',
  ]);
  assert.deepEqual(events, ['start a', 'end a', 'start b', 'end b', 'start c', 'end c']);
});
test('sequence: empty -> []', async () => assert.deepEqual(await promiseSequence([]), []));
test('sequence: plain-value tasks', async () =>
  assert.deepEqual(await promiseSequence([() => 1, () => 2]), [1, 2]));
test('sequence: stops at the first rejection', async () => {
  let ran = false;
  await assert.rejects(
    promiseSequence([
      async () => 1,
      async () => {
        throw new Error('second');
      },
      async () => {
        ran = true;
      },
    ]),
    /second/,
  );
  assert.equal(ran, false);
});
test('sequence: does not start tasks before it is called', () => {
  let started = 0;
  const tasks = [
    () => {
      started++;
    },
  ];
  assert.equal(started, 0);
  return promiseSequence(tasks).then(() => assert.equal(started, 1));
});
