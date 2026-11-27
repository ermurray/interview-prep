// Series 3 · 1.12 Sum of slice minimums
// Difficulty: Hard · Suggested time: 60 minutes
// (Series 1: 1.12 Skyline blocks · Series 2: 1.12 Largest rectangle. Concept: monotonic stack.)
//
// An array A of N positive integers is given. For every slice (contiguous, non-empty part) of A, take its
// smallest element. The goal is to add up these minimums over all N * (N + 1) / 2 slices.
//
// For example, for A = [3, 1, 2, 4] the slices and their minimums are:
//   [3] 3, [1] 1, [2] 2, [4] 4,
//   [3, 1] 1, [1, 2] 1, [2, 4] 2,
//   [3, 1, 2] 1, [1, 2, 4] 1,
//   [3, 1, 2, 4] 1
// and the sum is 17.
//
// Write a function:
//
//   sumOfSubarrayMinimums(A)
//
// that, given an array A of N integers, returns the sum of the minimums of all slices, modulo
// 1,000,000,007.
//
// For example:
//   - given A = [3, 1, 2, 4], the function should return 17, as explained above;
//   - given A = [11, 81, 94, 43, 3], the function should return 444.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..100,000];
//   - each element of array A is an integer within the range [1..30,000].
//
// Trap: listing every slice is O(N^2). Count how many slices each element is the minimum of instead.
// Be careful with equal values, so no slice is counted twice.
// Target: O(N) time. Pattern: monotonic stack for the previous-smaller and next-smaller elements.
//
// example input: [3, 1, 2, 4]
// example output: 17

const sumOfSubarrayMinimums = (A) => {
  // your solution here
};

export { sumOfSubarrayMinimums };
