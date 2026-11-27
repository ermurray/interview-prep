import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { gridShortestPath } = await load('hard', 'grid-shortest-path');

test('example: snake grid -> 16', () =>
  assert.equal(gridShortestPath(['.....', '####.', '.....', '.####', '.....']), 16));
test('open 2x2 -> 2', () => assert.equal(gridShortestPath(['..', '..']), 2));
test('blocked -> -1', () => assert.equal(gridShortestPath(['.#', '#.']), -1));
test('1x1 -> 0', () => assert.equal(gridShortestPath(['.']), 0));
test('start is a wall -> -1', () => assert.equal(gridShortestPath(['#.', '..']), -1));
test('end is a wall -> -1', () => assert.equal(gridShortestPath(['..', '.#']), -1));
test('single row', () => assert.equal(gridShortestPath(['......']), 5));
test('1000 x 1000 open grid is fast', () => {
  const g = new Array(1000).fill('.'.repeat(1000));
  const start = Date.now();
  assert.equal(gridShortestPath(g), 1998);
  assert.ok(Date.now() - start < 2000);
});
