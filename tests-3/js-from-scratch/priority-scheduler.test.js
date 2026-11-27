import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { createScheduler } = await load('js-from-scratch', 'priority-scheduler');

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

test('add resolves with the task result', async () => {
  const s = createScheduler(2);
  assert.deepEqual(await Promise.all([s.add(() => 1), s.add(async () => 'two')]), [1, 'two']);
});

test('higher priority starts first once a slot frees up', async () => {
  const s = createScheduler(1);
  const order = [];
  const task = (name) => async () => { order.push(name); await wait(2); };
  const all = [
    s.add(task('first')),
    s.add(task('low'), { priority: 1 }),
    s.add(task('high'), { priority: 5 }),
    s.add(task('default')),
  ];
  await Promise.all(all);
  assert.deepEqual(order, ['first', 'high', 'low', 'default']);
});

test('equal priorities start in the order they were added', async () => {
  const s = createScheduler(1);
  const order = [];
  const task = (name) => async () => { order.push(name); await wait(1); };
  await Promise.all(['a', 'b', 'c', 'd'].map((n) => s.add(task(n), { priority: 3 })));
  assert.deepEqual(order, ['a', 'b', 'c', 'd']);
});

test('negative priorities run after the default', async () => {
  const s = createScheduler(1);
  const order = [];
  const task = (name) => async () => { order.push(name); await wait(1); };
  await Promise.all([s.add(task('blocker')), s.add(task('later'), { priority: -1 }), s.add(task('normal'))]);
  assert.deepEqual(order, ['blocker', 'normal', 'later']);
});

test('never runs more than `concurrency` tasks at once', async () => {
  const s = createScheduler(3);
  let running = 0;
  let peak = 0;
  const task = async () => { running++; peak = Math.max(peak, running); await wait(3); running--; };
  await Promise.all(Array.from({ length: 12 }, (_, i) => s.add(task, { priority: i % 4 })));
  assert.equal(peak, 3);
});

test('size counts waiting tasks', async () => {
  const s = createScheduler(1);
  const all = [s.add(() => wait(5)), s.add(() => wait(5)), s.add(() => wait(5))];
  assert.equal(s.size, 2);
  await Promise.all(all);
  assert.equal(s.size, 0);
});

test('a failing task only rejects its own promise', async () => {
  const s = createScheduler(1);
  const bad = s.add(() => { throw new Error('bad'); });
  const good = s.add(() => 'good');
  await assert.rejects(bad, /bad/);
  assert.equal(await good, 'good');
});

test('a high-priority task added later does not interrupt a running one', async () => {
  const s = createScheduler(1);
  const events = [];
  const slow = s.add(async () => { events.push('slow start'); await wait(20); events.push('slow end'); });
  await wait(5);
  const urgent = s.add(async () => { events.push('urgent'); }, { priority: 100 });
  await Promise.all([slow, urgent]);
  assert.deepEqual(events, ['slow start', 'slow end', 'urgent']);
});
