import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { myFlatMap, myAssign, myIncludes, myFromEntries } = await load(
  'js-from-scratch',
  'polyfills',
);

test('flatMap: maps then flattens one level', () =>
  assert.deepEqual(
    myFlatMap.call(['a b', 'c'], (s) => s.split(' ')),
    ['a', 'b', 'c'],
  ));
test('flatMap: only one level', () =>
  assert.deepEqual(
    myFlatMap.call([1, 2], (x) => [[x]]),
    [[1], [2]],
  ));
test('flatMap: non-array results are kept', () =>
  assert.deepEqual(
    myFlatMap.call([1, 2], (x) => x * 10),
    [10, 20],
  ));
test('flatMap: empty arrays disappear', () =>
  assert.deepEqual(
    myFlatMap.call([1, 2, 3], (x) => (x === 2 ? [] : [x])),
    [1, 3],
  ));
test('flatMap: callback gets value, index, array and thisArg', () => {
  const arr = ['x'];
  const out = myFlatMap.call(
    arr,
    function cb(v, i, a) {
      return [v, i, a === arr, this.tag];
    },
    { tag: 't' },
  );
  assert.deepEqual(out, ['x', 0, true, 't']);
});
test('flatMap: works when installed on Array.prototype', () => {
  Array.prototype.myFlatMap = myFlatMap;
  try {
    assert.deepEqual(
      [1, 2].myFlatMap((x) => [x, x]),
      [1, 1, 2, 2],
    );
  } finally {
    delete Array.prototype.myFlatMap;
  }
});

test('assign: copies and returns the target', () => {
  const target = { a: 1 };
  const out = myAssign(target, { b: 2 }, { a: 3 });
  assert.equal(out, target);
  assert.deepEqual(target, { a: 3, b: 2 });
});
test('assign: copies symbol keys', () => {
  const s = Symbol('s');
  assert.equal(myAssign({}, { [s]: 1 })[s], 1);
});
test('assign: skips inherited and non-enumerable properties', () => {
  const src = Object.create({ inherited: 1 });
  Object.defineProperty(src, 'hidden', { value: 2, enumerable: false });
  src.own = 3;
  assert.deepEqual(myAssign({}, src), { own: 3 });
});
test('assign: null and undefined sources are skipped', () =>
  assert.deepEqual(myAssign({ a: 1 }, null, undefined, { b: 2 }), { a: 1, b: 2 }));
test('assign: null or undefined target throws TypeError', () => {
  assert.throws(() => myAssign(null, {}), TypeError);
  assert.throws(() => myAssign(undefined, {}), TypeError);
});

test('includes: finds values', () => {
  assert.equal(myIncludes.call([1, 2, 3], 2), true);
  assert.equal(myIncludes.call([1, 2, 3], 4), false);
});
test('includes: finds NaN (unlike indexOf)', () =>
  assert.equal(myIncludes.call([1, NaN], NaN), true));
test('includes: 0 and -0 match', () => assert.equal(myIncludes.call([-0], 0), true));
test('includes: fromIndex', () => {
  assert.equal(myIncludes.call([1, 2, 3], 1, 1), false);
  assert.equal(myIncludes.call([1, 2, 3], 3, -1), true);
  assert.equal(myIncludes.call([1, 2, 3], 1, -100), true);
});
test('includes: strict, no type coercion', () => assert.equal(myIncludes.call([1], '1'), false));

test('fromEntries: array of pairs', () =>
  assert.deepEqual(
    myFromEntries([
      ['a', 1],
      ['b', 2],
    ]),
    { a: 1, b: 2 },
  ));
test('fromEntries: a Map', () =>
  assert.deepEqual(myFromEntries(new Map([['x', 'y']])), { x: 'y' }));
test('fromEntries: a generator', () => {
  function* gen() {
    yield ['k', 1];
    yield ['k', 2];
  }
  assert.deepEqual(myFromEntries(gen()), { k: 2 });
});
test('fromEntries: empty -> {}', () => assert.deepEqual(myFromEntries([]), {}));
