import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { openLock } = await load('hard', 'open-the-lock');

test('example: route around the dead ends -> 6', () => assert.equal(openLock(['0201', '0101', '0102', '1212', '2002'], '0202'), 6));
test('wraps from 0 to 9 -> 1', () => assert.equal(openLock(['8888'], '0009'), 1));
test('jammed at the start -> -1', () => assert.equal(openLock(['0000'], '8888'), -1));
test('already there -> 0', () => assert.equal(openLock([], '0000'), 0));
test('no dead ends: every wheel to 5 -> 20', () => assert.equal(openLock([], '5555'), 20));
test('no dead ends: every wheel to 9 uses the wrap -> 4', () => assert.equal(openLock([], '9999'), 4));
test('target is a dead end -> -1', () => assert.equal(openLock(['1234'], '1234'), -1));
test('target boxed in by dead ends -> -1', () =>
  assert.equal(openLock(['8887', '8889', '8878', '8898', '8788', '8988', '7888', '9888'], '8888'), -1));
test('duplicate dead ends are fine: route around 0001 via another wheel -> 4', () =>
  assert.equal(openLock(['0001', '0001'], '0002'), 4)); // 0000 -> 1000 -> 1001 -> 1002 -> 0002
