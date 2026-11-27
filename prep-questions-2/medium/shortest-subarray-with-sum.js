// Series 2 · 1.11 Shortest slice reaching a sum
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1 counterpart: 1.11 Longest substring without repeats. Concept: sliding window.)
//
// An array A of N positive integers and a positive integer S are given. The goal is to find the shortest
// slice (contiguous part) of A whose sum is at least S.
//
// For example, for A = [2, 3, 1, 2, 4, 3] and S = 7:
//   - [2, 3, 1, 2] has sum 8 and length 4;
//   - [4, 3] has sum 7 and length 2, which is the shortest possible.
//
// Write a function:
//
//   shortestSubarrayWithSum(A, S)
//
// that, given an array A of N positive integers and an integer S, returns the length of the shortest
// slice whose sum is at least S, or 0 if there is no such slice.
//
// For example:
//   - given A = [2, 3, 1, 2, 4, 3] and S = 7, the function should return 2, as explained above;
//   - given A = [1, 4, 4] and S = 4, the function should return 1;
//   - given A = [1, 1, 1, 1] and S = 11, the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..100,000];
//   - each element of array A is an integer within the range [1..10,000];
//   - S is an integer within the range [1..1,000,000,000].
//
// Target: O(N) time. Pattern: sliding window (grow right, shrink left while the sum is big enough).
//
// example input: [2, 3, 1, 2, 4, 3], 7
// example output: 2

const shortestSubarrayWithSum = (A, S) => {
  // your solution here
};

export { shortestSubarrayWithSum };
