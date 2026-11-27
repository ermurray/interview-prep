import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { runWithLimit } = await load('js-from-scratch', 'run-with-limit');

const tracker = () => {
  let running = 0;
  let peak = 0;
  const task = (ms, value, fail = false) => () => {
    running++;
    peak = Math.max(peak, running);
    return new Promise((res, rej) => setTimeout(() => {
      running--;
      fail ? rej(new Error(value)) : res(value);
    }, ms));
  };
  return { task, peak: () => peak };
};

test('resolves with results in original order', async () => {
  const { task } = tracker();
  const out = await runWithLimit([task(30, 'a'), task(10, 'b'), task(20, 'c'), task(5, 'd')], 2);
  assert.deepEqual(out, ['a', 'b', 'c', 'd']);
});

test('never runs more than `limit` at once', async () => {
  const { task, peak } = tracker();
  await runWithLimit(Array.from({ length: 10 }, (_, i) => task(5 + (i % 3) * 5, i)), 3);
  assert.equal(peak(), 3);
});

test('limit larger than the task count', async () => {
  const { task, peak } = tracker();
  assert.deepEqual(await runWithLimit([task(5, 1), task(5, 2)], 10), [1, 2]);
  assert.equal(peak(), 2);
});

test('does not start tasks before it is called and starts them lazily', async () => {
  const started = [];
  const tasks = [0, 1, 2].map((i) => () => { started.push(i); return new Promise((r) => setTimeout(() => r(i), 10)); });
  const p = runWithLimit(tasks, 1);
  assert.deepEqual(started, [0]);
  await p;
  assert.deepEqual(started, [0, 1, 2]);
});

test('empty task list resolves to []', async () => assert.deepEqual(await runWithLimit([], 2), []));

test('rejects if a task rejects', async () => {
  const { task } = tracker();
  await assert.rejects(runWithLimit([task(5, 'ok'), task(5, 'nope', true)], 2), /nope/);
});

// ---- more edge cases ----
test('limit 1 runs tasks one at a time, in order', async () => {
  const { task, peak } = tracker();
  assert.deepEqual(await runWithLimit([task(10, 'a'), task(1, 'b'), task(5, 'c')], 1), ['a', 'b', 'c']);
  assert.equal(peak(), 1);
});

test('limit equal to the task count runs everything at once', async () => {
  const { task, peak } = tracker();
  await runWithLimit([task(10, 1), task(10, 2), task(10, 3)], 3);
  assert.equal(peak(), 3);
});

test('rejects with the task error itself', async () => {
  const err = new Error('specific');
  await assert.rejects(runWithLimit([() => Promise.reject(err)], 1), (e) => e === err);
});

test('a slot freed by a fast task is reused straight away', async () => {
  const started = [];
  const task = (name, ms) => () => { started.push(name); return new Promise((r) => setTimeout(() => r(name), ms)); };
  const p = runWithLimit([task('slow', 50), task('fast', 5), task('next', 5)], 2);
  await new Promise((r) => setTimeout(r, 20));
  assert.deepEqual(started, ['slow', 'fast', 'next'], '"next" starts once "fast" finishes, not after "slow"');
  await p;
});
