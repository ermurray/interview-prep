import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { addBinary } = await load('basic', 'add-binary');

test('example: "1010" + "1011" -> "10101"', () => assert.equal(addBinary('1010', '1011'), '10101'));
test('carry into a new digit: "11" + "1" -> "100"', () =>
  assert.equal(addBinary('11', '1'), '100'));
test('zeros: "0" + "0" -> "0"', () => assert.equal(addBinary('0', '0'), '0'));
test('adding zero', () => assert.equal(addBinary('101', '0'), '101'));
test('different lengths', () => assert.equal(addBinary('1', '111111'), '1000000'));
test('no carries', () => assert.equal(addBinary('1010', '101'), '1111'));
test('returns a string', () => assert.equal(typeof addBinary('1', '1'), 'string'));
test('100,000 ones + 1 (beyond Number precision)', () => {
  const out = addBinary('1'.repeat(100000), '1');
  assert.equal(out.length, 100001);
  assert.equal(out, `1${'0'.repeat(100000)}`);
});
test('two long numbers', () => {
  const a = '10'.repeat(50000);
  const b = '01'.repeat(50000).replace(/^0/, '');
  assert.equal(addBinary(a, b), '1'.repeat(100000));
});
