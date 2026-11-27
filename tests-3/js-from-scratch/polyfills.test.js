import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { myInstanceOf, myObjectCreate, myArrayFrom, promiseFinally } = await load('js-from-scratch', 'polyfills');

class Animal {}
class Dog extends Animal {}

test('instanceof: direct and inherited', () => {
  const d = new Dog();
  assert.equal(myInstanceOf(d, Dog), true);
  assert.equal(myInstanceOf(d, Animal), true);
  assert.equal(myInstanceOf(d, Object), true);
  assert.equal(myInstanceOf(new Animal(), Dog), false);
});
test('instanceof: built-ins', () => {
  assert.equal(myInstanceOf([], Array), true);
  assert.equal(myInstanceOf([], Object), true);
  assert.equal(myInstanceOf(new Date(), Date), true);
  assert.equal(myInstanceOf({}, Array), false);
});
test('instanceof: primitives -> false', () => {
  assert.equal(myInstanceOf(1, Number), false);
  assert.equal(myInstanceOf('s', String), false);
  assert.equal(myInstanceOf(null, Object), false);
  assert.equal(myInstanceOf(undefined, Object), false);
});
test('instanceof: null-prototype object -> false', () => assert.equal(myInstanceOf(Object.create(null), Object), false));
test('instanceof: functions are objects too', () => assert.equal(myInstanceOf(() => {}, Function), true));

test('Object.create: sets the prototype', () => {
  const proto = { greet() { return 'hi'; } };
  const o = myObjectCreate(proto);
  assert.equal(Object.getPrototypeOf(o), proto);
  assert.equal(o.greet(), 'hi');
  assert.deepEqual(Object.keys(o), []);
});
test('Object.create: null prototype', () => {
  const o = myObjectCreate(null);
  assert.equal(Object.getPrototypeOf(o), null);
  assert.equal('toString' in o, false);
});
test('Object.create: non-object prototype throws TypeError', () => {
  assert.throws(() => myObjectCreate(5), TypeError);
  assert.throws(() => myObjectCreate(undefined), TypeError);
});

test('Array.from: iterables', () => {
  assert.deepEqual(myArrayFrom(new Set([1, 2, 2, 3])), [1, 2, 3]);
  assert.deepEqual(myArrayFrom('abc'), ['a', 'b', 'c']);
  assert.deepEqual(myArrayFrom(new Map([[1, 'a']])), [[1, 'a']]);
  assert.deepEqual(myArrayFrom((function* () { yield 1; yield 2; })()), [1, 2]);
});
test('Array.from: array-likes', () => {
  assert.deepEqual(myArrayFrom({ length: 2, 0: 'a', 1: 'b' }), ['a', 'b']);
  assert.deepEqual(myArrayFrom({ length: 3 }), [undefined, undefined, undefined]);
});
test('Array.from: mapFn gets value and index', () => {
  assert.deepEqual(myArrayFrom({ length: 3 }, (_v, i) => i * 2), [0, 2, 4]);
  assert.deepEqual(myArrayFrom(new Set(['a', 'b']), (v, i) => `${i}:${v}`), ['0:a', '1:b']);
});
test('Array.from: returns a new array for an array input', () => {
  const src = [1, 2];
  const out = myArrayFrom(src);
  assert.deepEqual(out, src);
  assert.notEqual(out, src);
});

test('finally: runs on fulfilment and passes the value through', async () => {
  let ran = false;
  assert.equal(await promiseFinally(Promise.resolve('v'), () => { ran = true; }), 'v');
  assert.equal(ran, true);
});
test('finally: runs on rejection and passes the error through', async () => {
  let ran = false;
  await assert.rejects(promiseFinally(Promise.reject(new Error('orig')), () => { ran = true; }), /orig/);
  assert.equal(ran, true);
});
test('finally: onFinally gets no arguments', async () => {
  let args;
  await promiseFinally(Promise.resolve('v'), (...a) => { args = a; });
  assert.deepEqual(args, []);
});
test('finally: its return value is ignored', async () =>
  assert.equal(await promiseFinally(Promise.resolve('keep'), () => 'ignored'), 'keep'));
test('finally: an error thrown in onFinally wins', async () =>
  assert.rejects(promiseFinally(Promise.resolve('v'), () => { throw new Error('cleanup failed'); }), /cleanup failed/));
test('finally: a rejecting promise from onFinally wins', async () =>
  assert.rejects(promiseFinally(Promise.reject(new Error('orig')), () => Promise.reject(new Error('cleanup'))), /cleanup/));
test('finally: waits for a promise returned by onFinally', async () => {
  const order = [];
  await promiseFinally(Promise.resolve(), () => new Promise((r) => setTimeout(() => { order.push('cleanup'); r(); }, 10)))
    .then(() => order.push('after'));
  assert.deepEqual(order, ['cleanup', 'after']);
});
