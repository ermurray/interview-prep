import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { unflattenObject, getPath } = await load('js-from-scratch', 'object-paths');

test('unflatten: example from the question', () =>
  assert.deepEqual(unflattenObject({ 'user.name': 'ada', 'user.address.city': 'London', active: true }), {
    user: { name: 'ada', address: { city: 'London' } },
    active: true,
  }));
test('unflatten: { "a.b": 1 } -> { a: { b: 1 } }', () => assert.deepEqual(unflattenObject({ 'a.b': 1 }), { a: { b: 1 } }));
test('unflatten: keeps falsy values', () =>
  assert.deepEqual(unflattenObject({ 'a.b': 0, 'a.c': null, d: '' }), { a: { b: 0, c: null }, d: '' }));
test('unflatten: empty object', () => assert.deepEqual(unflattenObject({}), {}));

const data = { a: { b: [{ c: 42 }, { c: 0 }] }, n: null };
test('getPath: dots and brackets', () => assert.equal(getPath(data, 'a.b[0].c'), 42));
test('getPath: falsy values are returned, not defaulted', () => assert.equal(getPath(data, 'a.b[1].c', 'dflt'), 0));
test('getPath: missing path -> defaultValue', () => assert.equal(getPath(data, 'a.x.y', 'dflt'), 'dflt'));
test('getPath: through null -> defaultValue', () => assert.equal(getPath(data, 'n.deep', 'dflt'), 'dflt'));
test('getPath: out-of-range index -> defaultValue', () => assert.equal(getPath(data, 'a.b[5].c', 'dflt'), 'dflt'));
test('getPath: no default -> undefined', () => assert.equal(getPath(data, 'zzz'), undefined));
test('getPath: whole sub-object', () => assert.deepEqual(getPath(data, 'a.b[0]'), { c: 42 }));
