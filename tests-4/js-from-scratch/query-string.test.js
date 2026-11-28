import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { parseQuery, stringifyQuery } = await load('js-from-scratch', 'query-string');

test('parse: example from the question', () =>
  assert.deepEqual(parseQuery('?search=red+shoes&size=9&size=10'), {
    search: 'red shoes',
    size: ['9', '10'],
  }));
test('parse: everything at once', () =>
  assert.deepEqual(parseQuery('a=1&b=2&b=3&c[d]=4&e[]=5&flag'), {
    a: '1',
    b: ['2', '3'],
    c: { d: '4' },
    e: ['5'],
    flag: '',
  }));
test('parse: URI-decoding of keys and values', () =>
  assert.deepEqual(parseQuery('na%20me=J%C3%B6rg&x=a%26b%3Dc'), { 'na me': 'Jörg', x: 'a&b=c' }));
test('parse: empty string -> {}', () => {
  assert.deepEqual(parseQuery(''), {});
  assert.deepEqual(parseQuery('?'), {});
});
test('parse: empty value', () => assert.deepEqual(parseQuery('a='), { a: '' }));
test('parse: only the first = splits', () => assert.deepEqual(parseQuery('eq=a=b'), { eq: 'a=b' }));
test('parse: [] with several values', () =>
  assert.deepEqual(parseQuery('t[]=x&t[]=y'), { t: ['x', 'y'] }));
test('parse: nested object with several keys', () =>
  assert.deepEqual(parseQuery('f[min]=1&f[max]=9'), { f: { min: '1', max: '9' } }));
test('parse: values stay strings', () =>
  assert.deepEqual(parseQuery('n=5&b=true'), { n: '5', b: 'true' }));

test('stringify: example from the question', () =>
  assert.equal(
    stringifyQuery({ q: 'a b', page: 2, tags: ['x', 'y'], empty: null }),
    'q=a%20b&page=2&tags=x&tags=y&empty=',
  ));
test('stringify: undefined is skipped', () =>
  assert.equal(stringifyQuery({ a: 1, b: undefined, c: 3 }), 'a=1&c=3'));
test('stringify: encodes special characters', () =>
  assert.equal(stringifyQuery({ 'k&y': 'a=b' }), 'k%26y=a%3Db'));
test('stringify: empty object -> ""', () => assert.equal(stringifyQuery({}), ''));
test('stringify: booleans', () =>
  assert.equal(stringifyQuery({ on: true, off: false }), 'on=true&off=false'));
test('round trip for flat values', () => {
  const params = { search: 'red shoes', size: ['9', '10'], page: '1' };
  assert.deepEqual(parseQuery(stringifyQuery(params)), params);
});
