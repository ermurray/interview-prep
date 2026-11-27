// 1.14 Meeting rooms
// Difficulty: Hard · Suggested time: 60 minutes
//
// An array A of N meetings is given. Each meeting is a pair [start, end] describing the half-open time
// interval [start, end): the meeting occupies its room from time start up to, but not including, time
// end. Two meetings can use the same room only if their intervals do not overlap, so a meeting that ends
// at time 5 frees its room for a meeting that starts at time 5.
//
// For example, for A = [[0, 30], [5, 10], [15, 20]]:
//   - [0, 30) overlaps both other meetings, so it needs a room of its own;
//   - [5, 10) and [15, 20) do not overlap each other, so they can share a second room.
//
// Write a function:
//
//   meetingRooms(A)
//
// that, given an array A of N meetings, returns the minimum number of rooms needed to hold all of them.
// The meetings are not given in any particular order.
//
// For example:
//   - given A = [[0, 30], [5, 10], [15, 20]], the function should return 2;
//   - given A = [[7, 10], [2, 4]], the function should return 1;
//   - given A = [[1, 5], [5, 10]], the function should return 1;
//   - given A = [], the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - for every meeting, start and end are integers with 0 <= start < end <= 1,000,000,000.
//
// Target: O(N log N) time. Pattern: sort + sweep, or a min-heap of end times.
//
// example input: [[0, 30], [5, 10], [15, 20]]
// example output: 2

const meetingRooms = (intervals) => {
  // your solution here
};

export { meetingRooms };
