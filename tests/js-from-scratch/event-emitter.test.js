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
