import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { applyPatch } = await load('js-from-scratch', 'json-patch');

test('example from the question', () =>
  assert.deepEqual(
    applyPatch({ todos: ['a'] }, [
      { op: 'add', path: '/todos/-', value: 'b' },
      { op: 'replace', path: '/todos/0', value: 'A' },
    ]),
    { todos: ['A', 'b'] },
  ));
test('add a key to an object', () =>
  assert.deepEqual(applyPatch({ a: 1 }, [{ op: 'add', path: '/b', value: 2 }]), { a: 1, b: 2 }));
test('add inserts into an array, shifting later elements', () =>
  assert.deepEqual(applyPatch({ l: [1, 3] }, [{ op: 'add', path: '/l/1', value: 2 }]), {
    l: [1, 2, 3],
  }));
test('add at the array length appends', () =>
  assert.deepEqual(applyPatch({ l: [1] }, [{ op: 'add', path: '/l/1', value: 2 }]), { l: [1, 2] }));
test('remove a key', () =>
  assert.deepEqual(applyPatch({ a: 1, b: 2 }, [{ op: 'remove', path: '/a' }]), { b: 2 }));
test('remove an array element', () =>
  assert.deepEqual(applyPatch({ l: [1, 2, 3] }, [{ op: 'remove', path: '/l/0' }]), { l: [2, 3] }));
test('replace a nested value', () =>
  assert.deepEqual(
    applyPatch({ user: { name: 'ada' } }, [{ op: 'replace', path: '/user/name', value: 'bob' }]),
    { user: { name: 'bob' } },
  ));
test('operations apply in order', () =>
  assert.deepEqual(
    applyPatch({}, [
      { op: 'add', path: '/a', value: {} },
      { op: 'add', path: '/a/b', value: 1 },
    ]),
    { a: { b: 1 } },
  ));
test('escaped segments: ~1 is / and ~0 is ~', () =>
  assert.deepEqual(
    applyPatch({}, [
      { op: 'add', path: '/a~1b', value: 1 },
      { op: 'add', path: '/c~0d', value: 2 },
    ]),
    { 'a/b': 1, 'c~d': 2 },
  ));
test('never mutates the input, and shares untouched parts', () => {
  const doc = { a: { x: 1 }, b: { y: 2 } };
  const out = applyPatch(doc, [{ op: 'replace', path: '/a/x', value: 9 }]);
  assert.deepEqual(doc, { a: { x: 1 }, b: { y: 2 } });
  assert.equal(out.b, doc.b);
  assert.notEqual(out.a, doc.a);
});
test('replace of a missing key throws', () =>
  assert.throws(() => applyPatch({}, [{ op: 'replace', path: '/nope', value: 1 }])));
test('remove of a missing key throws', () =>
  assert.throws(() => applyPatch({}, [{ op: 'remove', path: '/nope' }])));
test('missing parent throws', () =>
  assert.throws(() => applyPatch({}, [{ op: 'add', path: '/a/b', value: 1 }])));
test('array index out of range throws', () =>
  assert.throws(() => applyPatch({ l: [1] }, [{ op: 'add', path: '/l/5', value: 1 }])));
test('falsy values are set', () =>
  assert.deepEqual(applyPatch({ a: 1 }, [{ op: 'replace', path: '/a', value: 0 }]), { a: 0 }));
