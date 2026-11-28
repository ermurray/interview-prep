import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { trapRainWater } = await load('hard', 'trap-rain-water');

test('example: -> 6', () => assert.equal(trapRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6));
test('[4, 2, 0, 3, 2, 5] -> 9', () => assert.equal(trapRainWater([4, 2, 0, 3, 2, 5]), 9));
test('rising -> 0', () => assert.equal(trapRainWater([1, 2, 3]), 0));
test('falling -> 0', () => assert.equal(trapRainWater([3, 2, 1]), 0));
test('empty -> 0', () => assert.equal(trapRainWater([]), 0));
test('one or two bars -> 0', () => {
  assert.equal(trapRainWater([5]), 0);
  assert.equal(trapRainWater([5, 5]), 0);
});
test('a simple bowl: [3, 0, 3] -> 3', () => assert.equal(trapRainWater([3, 0, 3]), 3));
test('limited by the lower wall: [5, 0, 2] -> 2', () => assert.equal(trapRainWater([5, 0, 2]), 2));
test('flat -> 0', () => assert.equal(trapRainWater([2, 2, 2, 2]), 0));
test('performance: a deep valley of 100,000 bars', () => {
  const h = new Array(100000).fill(0);
  h[0] = 100000;
  h[99999] = 100000;
  const start = Date.now();
  assert.equal(trapRainWater(h), 99998 * 100000);
  assert.ok(Date.now() - start < 1000, 'O(N) required');
});
