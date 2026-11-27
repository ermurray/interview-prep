import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { EventEmitter } = await load('js-from-scratch', 'event-emitter');

test('on + emit passes arguments', () => {
  const e = new EventEmitter();
  const seen = [];
  e.on('x', (a, b) => seen.push([a, b]));
  e.emit('x', 1, 2);
  assert.deepEqual(seen, [[1, 2]]);
});

test('listeners run in registration order', () => {
  const e = new EventEmitter();
  const seen = [];
  e.on('x', () => seen.push(1));
  e.on('x', () => seen.push(2));
  e.emit('x');
  assert.deepEqual(seen, [1, 2]);
});

test('emit with no listeners does not throw', () => {
  assert.doesNotThrow(() => new EventEmitter().emit('nothing'));
});

test('off removes a listener', () => {
  const e = new EventEmitter();
  let count = 0;
  const fn = () => count++;
  e.on('x', fn);
  e.off('x', fn);
  e.emit('x');
  assert.equal(count, 0);
});

test('off for an unknown listener does not throw', () => {
  assert.doesNotThrow(() => new EventEmitter().off('x', () => {}));
});

test('once fires a single time', () => {
  const e = new EventEmitter();
  let count = 0;
  e.once('x', () => count++);
  e.emit('x');
  e.emit('x');
  assert.equal(count, 1);
});

test('example from the question', () => {
  const e = new EventEmitter();
  const log = [];
  e.on('greet', (name) => log.push(`hi ${name}`));
  e.once('greet', (name) => log.push(`first time ${name}`));
  e.emit('greet', 'ada');
  e.emit('greet', 'bob');
  assert.deepEqual(log, ['hi ada', 'first time ada', 'hi bob']);
});

test('removing a listener during emit does not skip the others', () => {
  const e = new EventEmitter();
  const seen = [];
  const a = () => { seen.push('a'); e.off('x', a); };
  e.on('x', a);
  e.on('x', () => seen.push('b'));
  e.on('x', () => seen.push('c'));
  e.emit('x');
  assert.deepEqual(seen, ['a', 'b', 'c']);
});

test('two once listeners in a row both fire', () => {
  const e = new EventEmitter();
  const seen = [];
  e.once('x', () => seen.push(1));
  e.once('x', () => seen.push(2));
  e.emit('x');
  assert.deepEqual(seen, [1, 2]);
});

// ---- more edge cases ----
test('events with different names are independent', () => {
  const e = new EventEmitter();
  const seen = [];
  e.on('a', () => seen.push('a'));
  e.on('b', () => seen.push('b'));
  e.emit('a');
  assert.deepEqual(seen, ['a']);
});

test('a listener added during emit is not called for that emit', () => {
  const e = new EventEmitter();
  const seen = [];
  e.on('x', () => {
    seen.push('first');
    e.on('x', () => seen.push('late'));
  });
  e.emit('x');
  assert.deepEqual(seen, ['first']);
});

test('removing a later listener during emit does not skip the one after it', () => {
  const e = new EventEmitter();
  const seen = [];
  const b = () => seen.push('b');
  e.on('x', () => { seen.push('a'); e.off('x', b); });
  e.on('x', b);
  e.on('x', () => seen.push('c'));
  e.emit('x');
  assert.ok(seen.includes('a') && seen.includes('c'), `got ${JSON.stringify(seen)}`);
});

test('once passes arguments through', () => {
  const e = new EventEmitter();
  let got;
  e.once('x', (...args) => { got = args; });
  e.emit('x', 1, 2, 3);
  assert.deepEqual(got, [1, 2, 3]);
});

test('emitting from inside a listener works', () => {
  const e = new EventEmitter();
  const seen = [];
  e.on('outer', () => { seen.push('outer'); e.emit('inner'); });
  e.on('inner', () => seen.push('inner'));
  e.emit('outer');
  assert.deepEqual(seen, ['outer', 'inner']);
});

test('off only removes the given listener', () => {
  const e = new EventEmitter();
  const seen = [];
  const a = () => seen.push('a');
  e.on('x', a);
  e.on('x', () => seen.push('b'));
  e.off('x', a);
  e.emit('x');
  assert.deepEqual(seen, ['b']);
});
