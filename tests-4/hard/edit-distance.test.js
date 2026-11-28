import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { editDistance } = await load('hard', 'edit-distance');

test('example: "horse" -> "ros" = 3', () => assert.equal(editDistance('horse', 'ros'), 3));
test('"intention" -> "execution" = 5', () =>
  assert.equal(editDistance('intention', 'execution'), 5));
test('from empty: insert everything', () => assert.equal(editDistance('', 'abc'), 3));
test('to empty: delete everything', () => assert.equal(editDistance('abc', ''), 3));
test('both empty -> 0', () => assert.equal(editDistance('', ''), 0));
test('identical -> 0', () => assert.equal(editDistance('same', 'same'), 0));
test('one replacement', () => assert.equal(editDistance('cat', 'cut'), 1));
test('kitten -> sitting = 3', () => assert.equal(editDistance('kitten', 'sitting'), 3));
test('symmetric', () =>
  assert.equal(editDistance('sunday', 'saturday'), editDistance('saturday', 'sunday')));
test('2,000 x 2,000 characters', () => {
  const a = 'ab'.repeat(1000);
  const b = 'ba'.repeat(1000);
  const start = Date.now();
  assert.equal(editDistance(a, b), 2);
  assert.ok(Date.now() - start < 3000);
});
