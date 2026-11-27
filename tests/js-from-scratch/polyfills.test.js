import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { myBind, myReduce, MyPromise } = await load('js-from-scratch', 'polyfills');

// Fail fast (instead of hanging) if a then/catch handler is never called.
const withTimeout = (promise, ms = 1000) => {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`no result after ${ms}ms: handler never called`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
};
const settle = (body) => withTimeout(new Promise(body));

// ---- bind ----
test('bind: binds this', () => {
  function getName() { return this.name; }
  assert.equal(myBind.call(getName, { name: 'ada' })(), 'ada');
});
test('bind: partial arguments', () => {
  function greet(greeting, punct) { return `${greeting} ${this.name}${punct}`; }
  assert.equal(myBind.call(greet, { name: 'ada' }, 'hi')('!'), 'hi ada!');
});
test('bind: works when installed on Function.prototype', () => {
  function add(a, b) { return this.base + a + b; }
  Function.prototype.myBind = myBind;
  try {
    assert.equal(add.myBind({ base: 1 }, 2)(3), 6);
  } finally {
    delete Function.prototype.myBind;
  }
});

// ---- reduce ----
test('reduce: with an initial value', () => assert.equal(myReduce.call([1, 2, 3], (acc, x) => acc + x, 0), 6));
test('reduce: without an initial value uses the first element', () =>
  assert.equal(myReduce.call([1, 2, 3], (acc, x) => acc * x), 6));
test('reduce: passes index and array', () => {
  const arr = ['a', 'b'];
  const seen = [];
  myReduce.call(arr, (acc, x, i, a) => { seen.push([x, i, a === arr]); return acc; }, null);
  assert.deepEqual(seen, [['a', 0, true], ['b', 1, true]]);
});
test('reduce: empty array with no initial value throws TypeError', () =>
  assert.throws(() => myReduce.call([], (a, b) => a + b), TypeError));
test('reduce: empty array with an initial value returns it', () =>
  assert.equal(myReduce.call([], (a, b) => a + b, 42), 42));

// ---- Promise ----
test('MyPromise: resolves and chains then', async () => {
  const value = await settle((done) => {
    new MyPromise((r) => r(1)).then((x) => x + 1).then((x) => done(x));
  });
  assert.equal(value, 2);
});
test('MyPromise: handlers run asynchronously', () => {
  const order = [];
  new MyPromise((r) => r()).then(() => order.push('then'));
  order.push('sync');
  assert.deepEqual(order, ['sync']);
});
test('MyPromise: async resolve', async () => {
  const value = await settle((done) => {
    new MyPromise((r) => setTimeout(() => r('later'), 5)).then(done);
  });
  assert.equal(value, 'later');
});
test('MyPromise: rejection skips then and reaches catch', async () => {
  const value = await settle((done) => {
    new MyPromise((_, rej) => rej(new Error('boom')))
      .then(() => 'nope')
      .catch((e) => done(e.message));
  });
  assert.equal(value, 'boom');
});
test('MyPromise: throwing in a handler rejects the next promise', async () => {
  const value = await settle((done) => {
    new MyPromise((r) => r(1))
      .then(() => { throw new Error('thrown'); })
      .then(null, (e) => done(e.message));
  });
  assert.equal(value, 'thrown');
});
test('MyPromise: returning a promise from then adopts its value', async () => {
  const value = await settle((done) => {
    new MyPromise((r) => r(1))
      .then((x) => new MyPromise((r) => setTimeout(() => r(x + 10), 5)))
      .then(done);
  });
  assert.equal(value, 11);
});
test('MyPromise: an executor that throws rejects', async () => {
  const value = await settle((done) => {
    new MyPromise(() => { throw new Error('exec'); }).catch((e) => done(e.message));
  });
  assert.equal(value, 'exec');
});
test('MyPromise: resolves only once', async () => {
  const seen = [];
  await settle((done) => {
    new MyPromise((r, rej) => { r(1); r(2); rej(3); }).then((x) => { seen.push(x); done(); }, (e) => { seen.push(e); done(); });
  });
  assert.deepEqual(seen, [1]);
});
test('MyPromise: works with await (thenable)', async () => {
  assert.equal(await withTimeout((async () => await new MyPromise((r) => r('awaited')))()), 'awaited');
});
