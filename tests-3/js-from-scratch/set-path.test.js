import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { setPath, omit } = await load('js-from-scratch', 'set-path');

test('setPath: example from the question, with structural sharing', () => {
  const src = { user: { name: 'ada' }, tags: [] };
  const out = setPath(src, 'user.address.city', 'London');
  assert.deepEqual(out, { user: { name: 'ada', address: { city: 'London' } }, tags: [] });
  assert.equal(out.tags, src.tags, 'untouched branches are shared');
  assert.notEqual(out.user, src.user, 'objects on the path are copied');
});
test('setPath: never mutates the input', () => {
  const src = { a: { b: 1 } };
  setPath(src, 'a.b', 2);
  setPath(src, 'a.c', 3);
  assert.deepEqual(src, { a: { b: 1 } });
});
test('setPath: replaces an existing value', () => assert.deepEqual(setPath({ a: { b: 1 } }, 'a.b', 2), { a: { b: 2 } }));
test('setPath: top-level key', () => assert.deepEqual(setPath({ a: 1 }, 'b', 2), { a: 1, b: 2 }));
test('setPath: bracket index into an existing array', () => {
  const src = { list: [{ v: 1 }, { v: 2 }] };
  const out = setPath(src, 'list[1].v', 20);
  assert.deepEqual(out, { list: [{ v: 1 }, { v: 20 }] });
  assert.ok(Array.isArray(out.list));
  assert.notEqual(out.list, src.list);
  assert.equal(out.list[0], src.list[0], 'other elements are shared');
});
test('setPath: creates an array when the next segment is a number', () => {
  const out = setPath({}, 'items[0].name', 'x');
  assert.ok(Array.isArray(out.items));
  assert.deepEqual(out, { items: [{ name: 'x' }] });
});
test('setPath: creates objects for non-numeric segments', () => assert.deepEqual(setPath({}, 'a.b.c', 1), { a: { b: { c: 1 } } }));
test('setPath: dot-number segments work like brackets', () => assert.deepEqual(setPath({ l: [1, 2] }, 'l.0', 9), { l: [9, 2] }));
test('setPath: falsy values are set', () => assert.deepEqual(setPath({ a: 1 }, 'a', 0), { a: 0 }));

test('omit: removes the listed keys', () => assert.deepEqual(omit({ a: 1, b: 2, c: 3 }, ['a', 'c']), { b: 2 }));
test('omit: unknown keys are ignored', () => assert.deepEqual(omit({ a: 1 }, ['zzz']), { a: 1 }));
test('omit: returns a new object and does not mutate', () => {
  const src = { a: 1, b: 2 };
  const out = omit(src, ['a']);
  assert.notEqual(out, src);
  assert.deepEqual(src, { a: 1, b: 2 });
});
test('omit: shallow (nested objects are shared)', () => {
  const nested = { x: 1 };
  assert.equal(omit({ a: 1, n: nested }, ['a']).n, nested);
});
test('omit: no keys -> a copy', () => assert.deepEqual(omit({ a: 1 }, []), { a: 1 }));
