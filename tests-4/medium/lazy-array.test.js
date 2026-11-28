import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { lazyArray } = await load('medium', 'lazy-array');

test('example from the question', () =>
  assert.deepEqual(
    lazyArray(3, [
      ['set', 0, 5],
      ['addAll', 2],
      ['get', 0],
      ['setAll', 1],
      ['get', 2],
      ['set', 1, 4],
      ['addAll', 3],
      ['get', 1],
      ['get', 0],
    ]),
    [7, 1, 7, 4],
  ));
test('starts at zero', () =>
  assert.deepEqual(
    lazyArray(2, [
      ['get', 0],
      ['get', 1],
    ]),
    [0, 0],
  ));
test('no gets -> []', () => assert.deepEqual(lazyArray(2, [['set', 0, 1]]), []));
test('addAll applies to later reads, including untouched elements', () =>
  assert.deepEqual(
    lazyArray(3, [
      ['addAll', 5],
      ['get', 2],
      ['addAll', -2],
      ['get', 2],
    ]),
    [5, 3],
  ));
test('set after addAll is not affected by the earlier addAll', () =>
  assert.deepEqual(
    lazyArray(2, [
      ['addAll', 10],
      ['set', 0, 1],
      ['get', 0],
      ['get', 1],
    ]),
    [1, 10],
  ));
test('setAll wipes earlier sets and adds', () =>
  assert.deepEqual(
    lazyArray(2, [
      ['set', 0, 9],
      ['addAll', 3],
      ['setAll', -1],
      ['get', 0],
      ['get', 1],
    ]),
    [-1, -1],
  ));
test('set after setAll wins for that element only', () =>
  assert.deepEqual(
    lazyArray(3, [
      ['setAll', 4],
      ['set', 1, 0],
      ['get', 0],
      ['get', 1],
    ]),
    [4, 0],
  ));
test('several setAlls in a row', () =>
  assert.deepEqual(
    lazyArray(1, [
      ['setAll', 1],
      ['setAll', 2],
      ['addAll', 1],
      ['get', 0],
    ]),
    [3],
  ));
test('performance: 100,000 setAll/addAll operations on 100,000 elements', () => {
  const ops = [];
  for (let i = 0; i < 50000; i++) ops.push(['addAll', 1], ['setAll', i]);
  ops.push(['get', 99999]);
  const start = Date.now();
  assert.deepEqual(lazyArray(100000, ops), [49999]);
  assert.ok(Date.now() - start < 1000, 'setAll/addAll must not touch every element');
});
