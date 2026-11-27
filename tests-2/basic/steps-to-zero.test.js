import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { stepsToZero } = await load('basic', 'steps-to-zero');

test('example: "011100" (28) -> 7', () => assert.equal(stepsToZero('011100'), 7));
test('"111" (7) -> 5', () => assert.equal(stepsToZero('111'), 5));
test('all zeros -> 0', () => assert.equal(stepsToZero('000'), 0));
test('"1" -> 1', () => assert.equal(stepsToZero('1'), 1));
test('"10" (2) -> 2', () => assert.equal(stepsToZero('10'), 2));
test('"1111010101111" -> 22', () => assert.equal(stepsToZero('1111010101111'), 22));
test('a million-digit string', () => {
  const s = '1'.repeat(400000) + '0'.repeat(600000);
  assert.equal(stepsToZero(s), 999999 + 400000);
});
