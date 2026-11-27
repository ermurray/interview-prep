import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { createTaskQueue } = await load('js-from-scratch', 'task-queue');

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

test('each add() resolves with its own task result', async () => {
  const q = createTaskQueue(2);
  const results = await Promise.all([
    q.add(() => wait(20).then(() => 'a')),
    q.add(() => wait(5).then(() => 'b')),
    q.add(() => 'c'),
  ]);
  assert.deepEqual(results, ['a', 'b', 'c']);
});

test('never runs more than `concurrency` tasks at once', async () => {
  const q = createTaskQueue(3);
  let running = 0;
  let peak = 0;
  const task = (ms) => async () => {
    running++;
    peak = Math.max(peak, running);
    await wait(ms);
    running--;
  };
  for (let i = 0; i < 10; i++) q.add(task(5 + (i % 3) * 5));
  await q.onIdle();
  assert.equal(peak, 3);
  assert.equal(running, 0);
});

test('size counts tasks waiting to start', async () => {
  const q = createTaskQueue(1);
  q.add(() => wait(10));
  q.add(() => wait(10));
  q.add(() => wait(10));
  assert.equal(q.size, 2);
  await q.onIdle();
  assert.equal(q.size, 0);
});

test('tasks start in the order they were added', async () => {
  const q = createTaskQueue(1);
  const order = [];
  for (const n of [1, 2, 3]) q.add(async () => { order.push(n); await wait(1); });
  await q.onIdle();
  assert.deepEqual(order, [1, 2, 3]);
});

test('a failing task rejects only its own promise', async () => {
  const q = createTaskQueue(1);
  const bad = q.add(() => Promise.reject(new Error('bad')));
  const good = q.add(() => 'good');
  await assert.rejects(bad, /bad/);
  assert.equal(await good, 'good');
});

test('onIdle resolves straight away for an empty queue', async () => {
  const q = createTaskQueue(2);
  const r = await Promise.race([q.onIdle().then(() => 'idle'), wait(100).then(() => 'timeout')]);
  assert.equal(r, 'idle');
});

test('tasks can be added after the queue went idle', async () => {
  const q = createTaskQueue(1);
  await q.add(() => 1);
  await q.onIdle();
  assert.equal(await q.add(() => 2), 2);
});

// ---- more edge cases ----
test('concurrency 1 runs tasks strictly one after another', async () => {
  const q = createTaskQueue(1);
  let running = 0;
  let peak = 0;
  const task = async () => { running++; peak = Math.max(peak, running); await wait(2); running--; };
  await Promise.all([q.add(task), q.add(task), q.add(task)]);
  assert.equal(peak, 1);
});

test('tasks that return plain values', async () => {
  const q = createTaskQueue(2);
  assert.deepEqual(await Promise.all([q.add(() => 1), q.add(() => 'two')]), [1, 'two']);
});

test('a task that throws synchronously rejects only its own promise', async () => {
  const q = createTaskQueue(1);
  const bad = q.add(() => { throw new Error('sync'); });
  const good = q.add(() => 'still runs');
  await assert.rejects(bad, /sync/);
  assert.equal(await good, 'still runs');
});

test('onIdle can be awaited more than once', async () => {
  const q = createTaskQueue(2);
  q.add(() => wait(5));
  await Promise.all([q.onIdle(), q.onIdle()]);
  q.add(() => wait(5));
  await q.onIdle();
  assert.equal(q.size, 0);
});

test('onIdle waits for tasks added while running', async () => {
  const q = createTaskQueue(1);
  const done = [];
  q.add(async () => {
    await wait(5);
    q.add(async () => { await wait(5); done.push('child'); });
    done.push('parent');
  });
  await wait(1);
  await q.onIdle();
  assert.deepEqual(done, ['parent', 'child']);
});
