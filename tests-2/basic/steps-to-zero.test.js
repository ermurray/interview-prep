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

// ---- more edge cases ----
test('"0" -> 0', () => assert.equal(stepsToZero('0'), 0));
test('leading zeros are ignored: "0001" -> 1', () => assert.equal(stepsToZero('0001'), 1));
test('a power of two: "1000" (8) -> 4', () => assert.equal(stepsToZero('1000'), 4));
test('"11" (3) -> 3', () => assert.equal(stepsToZero('11'), 3));
test('"101" (5) -> 4', () => assert.equal(stepsToZero('101'), 4));
test('1 followed by 999,999 zeros -> 1,000,000', () => assert.equal(stepsToZero(`1${'0'.repeat(999999)}`), 1000000));
test('1,000,000 ones -> 1,999,999', () => assert.equal(stepsToZero('1'.repeat(1000000)), 1999999));
test('999,999 zeros then a 1 -> 1', () => assert.equal(stepsToZero(`${'0'.repeat(999999)}1`), 1));
