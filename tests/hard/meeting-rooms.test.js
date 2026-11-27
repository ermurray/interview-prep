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

// ---- more edge cases ----
test('single meeting -> 1', () => assert.equal(meetingRooms([[3, 4]]), 1));
test('identical meetings each need a room', () => assert.equal(meetingRooms([[1, 2], [1, 2], [1, 2]]), 3));
test('a chain of back-to-back meetings -> 1', () => assert.equal(meetingRooms([[1, 2], [2, 3], [3, 4]]), 1));
test('nested meetings', () => assert.equal(meetingRooms([[1, 100], [10, 20], [30, 40], [35, 50]]), 3));
test('a room frees up for a later meeting', () => assert.equal(meetingRooms([[1, 3], [2, 4], [3, 5]]), 2));
test('100,000 identical meetings', () => assert.equal(meetingRooms(new Array(100000).fill([0, 1000000000])), 100000));
