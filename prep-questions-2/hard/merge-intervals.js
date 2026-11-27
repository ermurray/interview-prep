// Series 2 · 1.14 Merge intervals
// Difficulty: Hard · Suggested time: 60 minutes
// (Series 1 counterpart: 1.14 Meeting rooms. Concept: sort, then sweep.)
//
// An array A of N intervals is given. Each interval is a pair [start, end] describing the closed range
// from start to end, both included. Intervals that overlap or touch (one ends exactly where the next
// starts) are merged into a single interval.
//
// For example, for A = [[1, 3], [2, 6], [8, 10], [15, 18]]:
//   - [1, 3] and [2, 6] overlap, so they merge into [1, 6];
//   - [8, 10] and [15, 18] do not overlap anything.
// The result is [[1, 6], [8, 10], [15, 18]].
//
// Write a function:
//
//   mergeIntervals(A)
//
// that, given an array A of N intervals in any order, returns the merged intervals sorted by start.
//
// For example:
//   - given A = [[1, 3], [2, 6], [8, 10], [15, 18]], the function should return
//     [[1, 6], [8, 10], [15, 18]], as explained above;
//   - given A = [[1, 4], [4, 5]], the function should return [[1, 5]];
//   - given A = [], the function should return [].
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - for every interval, start and end are integers with 0 <= start <= end <= 1,000,000,000.
//
// Target: O(N log N) time. Pattern: sort by start, then extend or close the current interval.
//
// example input: [[1, 3], [2, 6], [8, 10], [15, 18]]
// example output: [[1, 6], [8, 10], [15, 18]]

const mergeIntervals = (A) => {
  // your solution here
};

export { mergeIntervals };
