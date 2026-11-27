import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { meetingRooms } = await load('hard', 'meeting-rooms');

test('example: [[0, 30], [5, 10], [15, 20]] -> 2', () => assert.equal(meetingRooms([[0, 30], [5, 10], [15, 20]]), 2));
test('no overlap -> 1', () => assert.equal(meetingRooms([[7, 10], [2, 4]]), 1));
test('back-to-back meetings share a room ([start, end))', () => assert.equal(meetingRooms([[1, 5], [5, 10]]), 1));
test('no meetings -> 0', () => assert.equal(meetingRooms([]), 0));
test('all overlapping -> N', () => assert.equal(meetingRooms([[1, 10], [2, 9], [3, 8]]), 3));
test('unsorted input', () => assert.equal(meetingRooms([[9, 10], [4, 9], [4, 17]]), 2));
