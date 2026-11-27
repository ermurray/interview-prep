import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { deepClone } = await load('js-from-scratch', 'deep-clone');

test('primitives are returned as-is', () => {
  for (const v of [1, 'a', null, undefined, true, 10n]) assert.equal(deepClone(v), v);
});

test('nested objects and arrays are copied, not shared', () => {
  const src = { a: 1, b: { c: [1, { d: 2 }] } };
  const copy = deepClone(src);
  assert.deepEqual(copy, src);
  assert.notEqual(copy, src);
  assert.notEqual(copy.b, src.b);
  assert.notEqual(copy.b.c, src.b.c);
  assert.notEqual(copy.b.c[1], src.b.c[1]);
  assert.ok(Array.isArray(copy.b.c));
});

test('Dates', () => {
  const src = { when: new Date(1700000000000) };
  const copy = deepClone(src);
  assert.ok(copy.when instanceof Date);
  assert.notEqual(copy.when, src.when);
  assert.equal(copy.when.getTime(), src.when.getTime());
});

test('Maps (values cloned too)', () => {
  const inner = { x: 1 };
  const src = new Map([['k', inner]]);
  const copy = deepClone(src);
  assert.ok(copy instanceof Map);
  assert.notEqual(copy, src);
  assert.deepEqual(copy.get('k'), inner);
  assert.notEqual(copy.get('k'), inner);
});

test('Sets', () => {
  const src = new Set([1, 2, 3]);
  const copy = deepClone(src);
  assert.ok(copy instanceof Set);
  assert.notEqual(copy, src);
  assert.deepEqual([...copy], [1, 2, 3]);
});

test('circular references', () => {
  const src = { name: 'root', list: [] };
  src.self = src;
  src.list.push(src);
  const copy = deepClone(src);
  assert.equal(copy.self, copy);
  assert.equal(copy.list[0], copy);
  assert.notEqual(copy.self, src);
});

test('shared references stay shared', () => {
  const shared = { v: 1 };
  const copy = deepClone({ a: shared, b: shared });
  assert.equal(copy.a, copy.b);
  assert.notEqual(copy.a, shared);
});

// ---- more edge cases ----
test('a Date at the top level', () => {
  const d = new Date(5);
  const copy = deepClone(d);
  assert.ok(copy instanceof Date);
  assert.notEqual(copy, d);
  assert.equal(copy.getTime(), 5);
});

test('Set values are cloned too', () => {
  const inner = { x: 1 };
  const copy = deepClone(new Set([inner]));
  const [value] = copy;
  assert.deepEqual(value, inner);
  assert.notEqual(value, inner);
});

test('Dates inside arrays', () => {
  const copy = deepClone([new Date(1), new Date(2)]);
  assert.ok(copy[0] instanceof Date);
  assert.equal(copy[1].getTime(), 2);
});

test('a Map that contains itself', () => {
  const m = new Map();
  m.set('self', m);
  const copy = deepClone(m);
  assert.equal(copy.get('self'), copy);
  assert.notEqual(copy, m);
});

test('a circular array', () => {
  const a = [1];
  a.push(a);
  const copy = deepClone(a);
  assert.equal(copy[1], copy);
  assert.equal(copy[0], 1);
});

test('empty containers', () => {
  assert.deepEqual(deepClone({}), {});
  assert.deepEqual(deepClone([]), []);
  assert.equal(deepClone(new Map()).size, 0);
});

test('changing the copy does not change the original', () => {
  const src = { list: [{ n: 1 }] };
  const copy = deepClone(src);
  copy.list[0].n = 2;
  copy.list.push({ n: 3 });
  assert.deepEqual(src, { list: [{ n: 1 }] });
});
