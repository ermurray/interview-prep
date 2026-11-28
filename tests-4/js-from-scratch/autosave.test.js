import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { createAutosave } = await load('js-from-scratch', 'autosave');

const useFakeTimers = (t) => t.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
// save() may run straight from the timer or on the next microtask: both are fine.
const settle = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve();
};

test('saves once, delay ms after the last change, with the latest data', async (t) => {
  useFakeTimers(t);
  const save = t.mock.fn();
  const a = createAutosave(save, { delay: 100 });
  a.change('a');
  t.mock.timers.tick(50);
  a.change('ab');
  t.mock.timers.tick(99);
  await settle();
  assert.equal(save.mock.callCount(), 0);
  t.mock.timers.tick(1);
  await settle();
  assert.equal(save.mock.callCount(), 1);
  assert.deepEqual(save.mock.calls[0].arguments, ['ab']);
});

test('pending tracks unsaved changes', async (t) => {
  useFakeTimers(t);
  const a = createAutosave(() => {}, { delay: 100 });
  assert.equal(a.pending, false);
  a.change(1);
  assert.equal(a.pending, true);
  t.mock.timers.tick(100);
  await settle();
  assert.equal(a.pending, false);
});

test('maxWait forces a save while changes keep coming', async (t) => {
  useFakeTimers(t);
  const save = t.mock.fn();
  const a = createAutosave(save, { delay: 100, maxWait: 250 });
  for (let ms = 0; ms < 600; ms += 50) {
    a.change(ms);
    t.mock.timers.tick(50);
    await settle();
  }
  assert.ok(
    save.mock.callCount() >= 2,
    `expected saves at ~250ms and ~500ms, got ${save.mock.callCount()}`,
  );
  assert.ok(save.mock.calls[0].arguments[0] <= 250);
});

test('without maxWait, constant changes never save', async (t) => {
  useFakeTimers(t);
  const save = t.mock.fn();
  const a = createAutosave(save, { delay: 100 });
  for (let i = 0; i < 20; i++) {
    a.change(i);
    t.mock.timers.tick(50);
    await settle();
  }
  assert.equal(save.mock.callCount(), 0);
});

test('flush saves straight away and returns the save result', async (t) => {
  useFakeTimers(t);
  const save = t.mock.fn(async (data) => `saved ${data}`);
  const a = createAutosave(save, { delay: 1000 });
  a.change('draft');
  assert.equal(await a.flush(), 'saved draft');
  assert.equal(a.pending, false);
  t.mock.timers.tick(2000);
  await settle();
  assert.equal(save.mock.callCount(), 1, 'the timer was cancelled');
});

test('flush with nothing pending does not save', async (t) => {
  useFakeTimers(t);
  const save = t.mock.fn();
  const a = createAutosave(save, { delay: 100 });
  assert.equal(await a.flush(), undefined);
  assert.equal(save.mock.callCount(), 0);
});

test('a change after a save starts a new cycle', async (t) => {
  useFakeTimers(t);
  const save = t.mock.fn();
  const a = createAutosave(save, { delay: 100 });
  a.change(1);
  t.mock.timers.tick(100);
  await settle();
  a.change(2);
  t.mock.timers.tick(100);
  await settle();
  assert.deepEqual(
    save.mock.calls.map((c) => c.arguments[0]),
    [1, 2],
  );
});
