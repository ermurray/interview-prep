import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { pipeAsync, ary } = await load('js-from-scratch', 'pipe-async-and-ary');

test('pipeAsync: mixes sync and async functions', async () => {
  const run = pipeAsync(
    async (id) => ({ id, name: 'ada' }),
    (u) => u.name,
    async (n) => n.toUpperCase(),
  );
  assert.equal(await run(1), 'ADA');
});
test('pipeAsync: the first function gets every argument', async () =>
  assert.equal(
    await pipeAsync(
      (a, b) => a + b,
      (x) => x * 10,
    )(1, 2),
    30,
  ));
test('pipeAsync: runs one after another', async () => {
  const order = [];
  const step = (name, ms) => async (x) => {
    order.push(`start ${name}`);
    await new Promise((r) => {
      setTimeout(r, ms);
    });
    order.push(`end ${name}`);
    return x;
  };
  await pipeAsync(step('a', 10), step('b', 1))(0);
  assert.deepEqual(order, ['start a', 'end a', 'start b', 'end b']);
});
test('pipeAsync: returns a promise even when everything is sync', () => {
  const p = pipeAsync((x) => x)(1);
  assert.equal(typeof p.then, 'function');
  return p;
});
test('pipeAsync: no functions resolves with the first argument', async () =>
  assert.equal(await pipeAsync()('same'), 'same'));
test('pipeAsync: a throw rejects and stops the pipe', async () => {
  let reached = false;
  await assert.rejects(
    pipeAsync(
      () => {
        throw new Error('step 1');
      },
      () => {
        reached = true;
      },
    )(),
    /step 1/,
  );
  assert.equal(reached, false);
});
test('pipeAsync: a rejection rejects', async () =>
  assert.rejects(
    pipeAsync(async () => {
      throw new Error('async');
    })(),
    /async/,
  ));

test('ary: fixes the parseInt map trap', () =>
  assert.deepEqual(['1', '2', '3'].map(ary(parseInt, 1)), [1, 2, 3]));
test('ary: passes only the first n arguments', () => {
  const count = (...args) => args.length;
  assert.equal(ary(count, 2)(1, 2, 3, 4), 2);
  assert.equal(ary(count, 0)(1, 2), 0);
});
test('ary: fewer arguments than n is fine', () => assert.deepEqual(ary((...a) => a, 3)(1), [1]));
test('ary: preserves this', () => {
  const obj = {
    base: 5,
    add: ary(function add(x) {
      return this.base + x;
    }, 1),
  };
  assert.equal(obj.add(1, 100), 6);
});
