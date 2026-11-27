// Series 3 · 1.15 Longest increasing subsequence
// Difficulty: Hard · Suggested time: 60 minutes
// (Series 1: 1.15 Coin change (min coins) · Series 2: 1.15 Coin change (ways). Concept: dynamic programming.)
//
// An array A of N integers is given. A subsequence keeps some of the elements, in their original order,
// not necessarily next to each other. It is strictly increasing if every element is larger than the one
// before it.
//
// For example, for A = [10, 9, 2, 5, 3, 7, 101, 18]:
//   - [2, 5, 7, 101] is a strictly increasing subsequence of length 4;
//   - [2, 3, 7, 18] is another one;
//   - there is none of length 5.
//
// Write a function:
//
//   longestIncreasingSubsequence(A)
//
// that, given an array A of N integers, returns the length of its longest strictly increasing
// subsequence.
//
// For example:
//   - given A = [10, 9, 2, 5, 3, 7, 101, 18], the function should return 4;
//   - given A = [0, 1, 0, 3, 2, 3], the function should return 4;
//   - given A = [7, 7, 7], the function should return 1;
//   - given A = [], the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - each element of array A is an integer within the range [-1,000,000,000..1,000,000,000].
//
// Trap: the classic O(N^2) DP times out on the largest inputs.
// Target: O(N log N) time. Pattern: keep the smallest possible tail for each length, and binary search it.
//
// example input: [10, 9, 2, 5, 3, 7, 101, 18]
// example output: 4

const longestIncreasingSubsequence = (A) => {
  // your solution here
};

export { longestIncreasingSubsequence };
