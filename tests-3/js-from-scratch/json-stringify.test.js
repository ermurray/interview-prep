import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { jsonStringify } = await load('js-from-scratch', 'json-stringify');

const same = (value) => assert.equal(jsonStringify(value), JSON.stringify(value));

test('example from the question', () =>
  assert.equal(jsonStringify({ a: [1, 'two', null, undefined], b: { c: true }, d: undefined }), '{"a":[1,"two",null,null],"b":{"c":true}}'));
test('primitives', () => { for (const v of [null, true, false, 0, -1.5, 1e21, 'hi', '']) same(v); });
test('-0 prints as 0', () => same(-0));
test('NaN and Infinity print as null', () => { same(NaN); same(Infinity); same(-Infinity); same([NaN]); });
test('string escaping', () => same('quote " backslash \\ newline \n tab \t return \r'));
test('other control characters use \\u00XX', () => same('\u0001\u001f\b\f'));
test('unicode passes through', () => same('héllo ✓ 你好'));
test('nested arrays and objects', () => same({ a: [1, [2, { b: [3] }]], c: {} }));
test('empty containers', () => { same([]); same({}); });
test('undefined, functions and symbols in arrays become null', () => same([undefined, () => 1, Symbol('s')]));
test('undefined, functions and symbols in objects are skipped', () => same({ a: undefined, b: () => 1, c: Symbol('s'), d: 1 }));
test('top-level undefined, function or symbol returns undefined', () => {
  assert.equal(jsonStringify(undefined), undefined);
  assert.equal(jsonStringify(() => {}), undefined);
  assert.equal(jsonStringify(Symbol('x')), undefined);
});
test('Dates use toJSON', () => same({ when: new Date(0) }));
test('custom toJSON', () => same({ x: { toJSON: () => ({ replaced: true }) } }));
test('key order is kept', () => same({ z: 1, a: 2, m: 3 }));
test('circular reference throws TypeError', () => {
  const o = {};
  o.self = o;
  assert.throws(() => jsonStringify(o), TypeError);
});
test('BigInt throws TypeError', () => assert.throws(() => jsonStringify({ n: 10n }), TypeError));
test('shared (non-circular) references are fine', () => {
  const shared = { v: 1 };
  same({ a: shared, b: shared });
});
