import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { myCall, myApply, myMap, myFilter, myNew } = await load('js-from-scratch', 'polyfills');

function greet(g, p) { return `${g} ${this.name}${p}`; }

test('call: sets this and passes arguments', () => assert.equal(myCall.call(greet, { name: 'ada' }, 'hi', '!'), 'hi ada!'));
test('call: does not leave anything on the context object', () => {
  const ctx = { name: 'ada' };
  myCall.call(greet, ctx, 'hi', '!');
  assert.deepEqual(Reflect.ownKeys(ctx), ['name']);
});
test('call: works when installed on Function.prototype', () => {
  Function.prototype.myCall = myCall;
  try {
    assert.equal(greet.myCall({ name: 'bob' }, 'yo', '?'), 'yo bob?');
  } finally {
    delete Function.prototype.myCall;
  }
});
test('apply: takes an array of arguments', () => assert.equal(myApply.call(greet, { name: 'ada' }, ['hey', '.']), 'hey ada.'));
test('apply: missing args array', () => {
  function count() { return arguments.length; }
  assert.equal(myApply.call(count, {}), 0);
});

test('map: maps values with index and array', () => {
  const arr = [1, 2, 3];
  assert.deepEqual(myMap.call(arr, (x, i, a) => x * 10 + i + (a === arr ? 0 : 1000)), [10, 21, 32]);
});
test('map: thisArg', () => assert.deepEqual(myMap.call([1, 2], function (x) { return x * this.k; }, { k: 3 }), [3, 6]));
test('map: does not mutate', () => {
  const arr = [1, 2];
  myMap.call(arr, (x) => x * 2);
  assert.deepEqual(arr, [1, 2]);
});
test('filter: keeps matching values', () => assert.deepEqual(myFilter.call([1, 2, 3, 4], (x) => x % 2 === 0), [2, 4]));
test('filter: index and thisArg', () =>
  assert.deepEqual(myFilter.call(['a', 'b', 'c'], function (x, i) { return i !== this.skip; }, { skip: 1 }), ['a', 'c']));

test('new: links the prototype and runs the constructor', () => {
  function Person(name) { this.name = name; }
  Person.prototype.hello = function () { return `hi ${this.name}`; };
  const p = myNew(Person, 'ada');
  assert.ok(p instanceof Person);
  assert.equal(p.hello(), 'hi ada');
});
test('new: an object returned by the constructor wins', () => {
  function Weird() { this.a = 1; return { b: 2 }; }
  assert.deepEqual(myNew(Weird), { b: 2 });
});
test('new: a primitive returned by the constructor is ignored', () => {
  function Prim() { this.a = 1; return 5; }
  assert.equal(myNew(Prim).a, 1);
});

// ---- more edge cases ----
test('call: returns the function result', () => assert.equal(myCall.call(() => 42, {}), 42));
test('call: works when the context already has a property with the same-looking name', () => {
  const ctx = { name: 'ada', fn: 'keep me' };
  myCall.call(greet, ctx, 'hi', '!');
  assert.equal(ctx.fn, 'keep me');
});
test('call: a primitive context works', () => {
  function self() { return typeof this === 'object' ? this.valueOf() : this; }
  assert.equal(myCall.call(self, 'str'), 'str');
});
test('apply: works when installed on Function.prototype', () => {
  Function.prototype.myApply = myApply;
  try {
    assert.equal(greet.myApply({ name: 'cy' }, ['hey', '?']), 'hey cy?');
  } finally {
    delete Function.prototype.myApply;
  }
});
test('map: empty array -> []', () => assert.deepEqual(myMap.call([], (x) => x), []));
test('map: same length as the input', () => assert.equal(myMap.call([1, 2, 3], () => null).length, 3));
test('filter: nothing matches -> []', () => assert.deepEqual(myFilter.call([1, 2], () => false), []));
test('filter: does not mutate', () => {
  const arr = [1, 2, 3];
  myFilter.call(arr, (x) => x > 1);
  assert.deepEqual(arr, [1, 2, 3]);
});
test('new: a function returned by the constructor wins', () => {
  const f = () => 'fn';
  function ReturnsFn() { return f; }
  assert.equal(myNew(ReturnsFn), f);
});
test('new: null returned by the constructor is ignored', () => {
  function ReturnsNull() { this.ok = true; return null; }
  assert.equal(myNew(ReturnsNull).ok, true);
});
test('new: passes arguments', () => {
  function Point(x, y) { this.x = x; this.y = y; }
  assert.deepEqual({ ...myNew(Point, 1, 2) }, { x: 1, y: 2 });
});
