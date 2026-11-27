import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { diffPaths } = await load('js-from-scratch', 'diff-paths');

test('example from the question', () =>
  assert.deepEqual(diffPaths({ a: 1, b: { c: 2, d: 3 }, list: [1, 2] }, { a: 1, b: { c: 5 }, e: 1, list: [1, 3] }), ['b.c', 'b.d', 'e', 'list.1']));
test('equal inputs -> []', () => assert.deepEqual(diffPaths({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }), []));
test('key order does not matter', () => assert.deepEqual(diffPaths({ a: 1, b: 2 }, { b: 2, a: 1 }), []));
test('NaN equals NaN; 0 equals -0', () => assert.deepEqual(diffPaths({ a: NaN, b: 0 }, { a: NaN, b: -0 }), []));
test('container vs leaf reports only that path', () =>
  assert.deepEqual(diffPaths({ a: { x: 1, y: 2 } }, { a: 5 }), ['a']));
test('array vs object reports only that path', () => assert.deepEqual(diffPaths({ a: [1] }, { a: { 0: 1 } }), ['a']));
test('array length change', () => assert.deepEqual(diffPaths({ l: [1, 2, 3] }, { l: [1] }), ['l.1', 'l.2']));
test('result is sorted', () => assert.deepEqual(diffPaths({ z: 1, a: 1, m: 1 }, { z: 2, a: 2, m: 2 }), ['a', 'm', 'z']));
