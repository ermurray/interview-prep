import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { createStore } = await load('js-from-scratch', 'create-store');

const counter = (state, action) => {
  if (action.type === 'inc') return state + 1;
  if (action.type === 'add') return state + action.by;
  return state;
};

test('getState starts with initialState', () => assert.equal(createStore(counter, 5).getState(), 5));
test('dispatch runs the reducer and returns the action', () => {
  const store = createStore(counter, 0);
  const action = { type: 'add', by: 3 };
  assert.equal(store.dispatch(action), action);
  store.dispatch({ type: 'inc' });
  assert.equal(store.getState(), 4);
});
test('subscribers are notified after each dispatch', () => {
  const store = createStore(counter, 0);
  const seen = [];
  store.subscribe(() => seen.push(store.getState()));
  store.dispatch({ type: 'inc' });
  store.dispatch({ type: 'inc' });
  assert.deepEqual(seen, [1, 2]);
});
test('unsubscribe stops notifications and is safe to call twice', () => {
  const store = createStore(counter, 0);
  let calls = 0;
  const unsubscribe = store.subscribe(() => calls++);
  store.dispatch({ type: 'inc' });
  unsubscribe();
  unsubscribe();
  store.dispatch({ type: 'inc' });
  assert.equal(calls, 1);
});
test('unsubscribing during a dispatch does not skip other listeners', () => {
  const store = createStore(counter, 0);
  const seen = [];
  const unsubA = store.subscribe(() => { seen.push('a'); unsubA(); });
  store.subscribe(() => seen.push('b'));
  store.dispatch({ type: 'inc' });
  assert.deepEqual(seen, ['a', 'b']);
});
test('a listener added during a dispatch is not called for that dispatch', () => {
  const store = createStore(counter, 0);
  const seen = [];
  store.subscribe(() => {
    seen.push('outer');
    if (seen.length === 1) store.subscribe(() => seen.push('inner'));
  });
  store.dispatch({ type: 'inc' });
  assert.deepEqual(seen, ['outer']);
  store.dispatch({ type: 'inc' });
  assert.deepEqual(seen, ['outer', 'outer', 'inner']);
});

// ---- more edge cases ----
test('the reducer receives the current state and the action', () => {
  const calls = [];
  const store = createStore((state, action) => { calls.push([state, action]); return state + 1; }, 10);
  const action = { type: 'any' };
  store.dispatch(action);
  assert.deepEqual(calls, [[10, action]]);
});

test('object state is replaced, not merged', () => {
  const store = createStore((s, a) => (a.type === 'set' ? { only: a.value } : s), { a: 1, b: 2 });
  store.dispatch({ type: 'set', value: 3 });
  assert.deepEqual(store.getState(), { only: 3 });
});

test('subscribers run in the order they subscribed', () => {
  const store = createStore(counter, 0);
  const seen = [];
  store.subscribe(() => seen.push(1));
  store.subscribe(() => seen.push(2));
  store.subscribe(() => seen.push(3));
  store.dispatch({ type: 'inc' });
  assert.deepEqual(seen, [1, 2, 3]);
});

test('dispatch with no subscribers still updates state', () => {
  const store = createStore(counter, 0);
  store.dispatch({ type: 'inc' });
  assert.equal(store.getState(), 1);
});

test('subscribers are notified even when the state does not change', () => {
  const store = createStore(counter, 0);
  let calls = 0;
  store.subscribe(() => calls++);
  store.dispatch({ type: 'unknown' });
  assert.equal(calls, 1);
});

test('unsubscribing one listener leaves the others', () => {
  const store = createStore(counter, 0);
  const seen = [];
  const off = store.subscribe(() => seen.push('a'));
  store.subscribe(() => seen.push('b'));
  off();
  store.dispatch({ type: 'inc' });
  assert.deepEqual(seen, ['b']);
});
