import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { matches } = await load('js-from-scratch', 'matches');

test('example from the question', () =>
  assert.equal(matches({ id: 1, user: { name: 'ada', role: 'admin' }, tags: ['x'] }, { user: { role: 'admin' } }), true));
test('empty pattern matches any object', () => assert.equal(matches({ a: 1 }, {}), true));
test('missing key -> false', () => assert.equal(matches({ a: 1 }, { b: 1 }), false));
test('different value -> false', () => assert.equal(matches({ a: 1 }, { a: 2 }), false));
test('nested partial match', () => assert.equal(matches({ a: { b: { c: 1, d: 2 } } }, { a: { b: { c: 1 } } }), true));
test('nested mismatch', () => assert.equal(matches({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } }), false));
test('arrays must have the same length', () => {
  assert.equal(matches({ l: [1, 2] }, { l: [1, 2] }), true);
  assert.equal(matches({ l: [1, 2, 3] }, { l: [1, 2] }), false);
});
test('objects inside arrays match partially', () =>
  assert.equal(matches({ l: [{ id: 1, x: 'extra' }] }, { l: [{ id: 1 }] }), true));
test('array never matches a plain object', () => {
  assert.equal(matches({ a: [1] }, { a: { 0: 1 } }), false);
  assert.equal(matches({ a: { 0: 1 } }, { a: [1] }), false);
});
test('NaN matches NaN; 0 matches -0', () => assert.equal(matches({ a: NaN, b: 0 }, { a: NaN, b: -0 }), true));
test('Dates match by time', () => {
  assert.equal(matches({ d: new Date(5) }, { d: new Date(5) }), true);
  assert.equal(matches({ d: new Date(5) }, { d: new Date(6) }), false);
});
test('undefined in the pattern needs the key to be undefined', () => {
  assert.equal(matches({ a: undefined }, { a: undefined }), true);
  assert.equal(matches({ a: 1 }, { a: undefined }), false);
});
test('null vs object -> false', () => assert.equal(matches({ a: null }, { a: {} }), false));
test('pattern object vs primitive value -> false', () => assert.equal(matches({ a: 5 }, { a: { b: 1 } }), false));
