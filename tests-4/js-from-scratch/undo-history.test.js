import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { createHistory } = await load('js-from-scratch', 'undo-history');

test('starts at the initial value with nothing to undo or redo', () => {
  const h = createHistory('a');
  assert.equal(h.value, 'a');
  assert.equal(h.canUndo, false);
  assert.equal(h.canRedo, false);
});

test('example from the question', () => {
  const h = createHistory('a');
  h.set('b');
  h.set('c');
  h.undo();
  h.undo();
  h.redo();
  assert.equal(h.value, 'b');
  assert.equal(h.canUndo, true);
  assert.equal(h.canRedo, true);
});

test('undo and redo return whether they moved', () => {
  const h = createHistory(0);
  assert.equal(h.undo(), false);
  h.set(1);
  assert.equal(h.undo(), true);
  assert.equal(h.undo(), false);
  assert.equal(h.redo(), true);
  assert.equal(h.redo(), false);
});

test('set clears the redo stack', () => {
  const h = createHistory(1);
  h.set(2);
  h.undo();
  h.set(3);
  assert.equal(h.canRedo, false);
  assert.equal(h.redo(), false);
  assert.equal(h.value, 3);
  h.undo();
  assert.equal(h.value, 1);
});

test('limit drops the oldest undo steps', () => {
  const h = createHistory(0, { limit: 2 });
  h.set(1);
  h.set(2);
  h.set(3);
  assert.equal(h.undo(), true);
  assert.equal(h.undo(), true);
  assert.equal(h.undo(), false, 'only 2 steps were kept');
  assert.equal(h.value, 1);
});

test('subscribers hear every change', () => {
  const h = createHistory('a');
  const seen = [];
  h.subscribe((v) => seen.push(v));
  h.set('b');
  h.undo();
  h.redo();
  assert.deepEqual(seen, ['b', 'a', 'b']);
});

test('failed undo/redo does not notify', () => {
  const h = createHistory('a');
  let calls = 0;
  h.subscribe(() => calls++);
  h.undo();
  h.redo();
  assert.equal(calls, 0);
});

test('unsubscribe stops notifications', () => {
  const h = createHistory(0);
  let calls = 0;
  const off = h.subscribe(() => calls++);
  h.set(1);
  off();
  h.set(2);
  assert.equal(calls, 1);
});

test('falsy and object values', () => {
  const obj = { x: 1 };
  const h = createHistory(obj);
  h.set(0);
  assert.equal(h.value, 0);
  h.undo();
  assert.equal(h.value, obj);
});
