// Series 2 · 1.10 Maximum product slice
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1 counterpart: 1.10 Maximum subarray sum. Concept: Kadane-style running best.)
//
// A non-empty array A of N integers is given. The product of a slice (P, Q), where 0 <= P <= Q < N, is
// A[P] * A[P + 1] * ... * A[Q].
//
// For example, for A = [-2, 3, -4]:
//   - slice (0, 1) is [-2, 3] with product -6;
//   - slice (0, 2) is [-2, 3, -4] with product 24.
// Two negatives make a positive, so the smallest running product can become the largest one.
//
// Write a function:
//
//   maxProductSubarray(A)
//
// that, given a non-empty array A of N integers, returns the maximum product of any slice.
//
// For example:
//   - given A = [2, 3, -2, 4], the function should return 6 ([2, 3]);
//   - given A = [-2, 3, -4], the function should return 24;
//   - given A = [-2, 0, -1], the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..100,000];
//   - each element of array A is an integer within the range [-10..10];
//   - the answer, and the product of any prefix or suffix slice, fits in a 32-bit signed integer.
//
// Target: O(N) time, O(1) space. Pattern: track both the max and the min product ending here.
//
// example input: [2, 3, -2, 4]
// example output: 6

const maxProductSubarray = (A) => {
  // your solution here
};

export { maxProductSubarray };
