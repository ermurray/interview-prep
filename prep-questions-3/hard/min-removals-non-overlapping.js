// Series 3 · 1.14 Fewest removals for no overlaps
// Difficulty: Hard · Suggested time: 60 minutes
// (Series 1: 1.14 Meeting rooms · Series 2: 1.14 Merge intervals. Concept: sort, then sweep.)
//
// An array A of N intervals is given. Each interval is a pair [start, end] describing the half-open range
// [start, end): it includes start but not end, so [1, 2] and [2, 3] do not overlap. The goal is to remove
// as few intervals as possible so that the remaining ones do not overlap.
//
// For example, for A = [[1, 2], [2, 3], [3, 4], [1, 3]]:
//   - [1, 3] overlaps [1, 2] and [2, 3];
//   - removing just [1, 3] leaves [1, 2], [2, 3] and [3, 4], which do not overlap.
//
// Write a function:
//
//   minRemovalsNonOverlapping(A)
//
// that, given an array A of N intervals, returns the minimum number of intervals to remove.
//
// For example:
//   - given A = [[1, 2], [2, 3], [3, 4], [1, 3]], the function should return 1;
//   - given A = [[1, 2], [1, 2], [1, 2]], the function should return 2;
//   - given A = [[1, 2], [2, 3]], the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - for every interval, start and end are integers with -1,000,000,000 <= start < end <= 1,000,000,000.
//
// Target: O(N log N) time. Pattern: greedy. Keep the interval that ends earliest.
//
// example input: [[1, 2], [2, 3], [3, 4], [1, 3]]
// example output: 1

const minRemovalsNonOverlapping = (A) => {
  // your solution here
};

export { minRemovalsNonOverlapping };
