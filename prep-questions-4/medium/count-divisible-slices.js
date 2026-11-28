// Series 4 · 1.6 Slices with a sum divisible by K
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1-3: 1.6 Minimum split difference / Count slices with a given sum / Minimal impact queries. Concept: prefix sums.)
//
// An array A of N integers and a positive integer K are given. A slice (P, Q), where 0 <= P <= Q < N, is
// the contiguous part of A from A[P] to A[Q]. The goal is to count the slices whose sum is divisible by K.
//
// For example, for A = [4, 5, 0, -2, -3, 1] and K = 5 there are 7 such slices:
//   [5], [5, 0], [0], [5, 0, -2, -3], [0, -2, -3], [-2, -3], [4, 5, 0, -2, -3, 1]
// (their sums are 5, 5, 0, 0, -5, -5 and 5).
//
// Write a function:
//
//   countDivisibleSlices(A, K)
//
// that, given an array A of N integers and an integer K, returns the number of slices whose sum is
// divisible by K.
//
// For example:
//   - given A = [4, 5, 0, -2, -3, 1] and K = 5, the function should return 7, as explained above;
//   - given A = [5] and K = 9, the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..100,000];
//   - each element of array A is an integer within the range [-10,000..10,000];
//   - K is an integer within the range [1..10,000].
//
// Trap: in JavaScript, -7 % 5 is -2, not 3. Two prefix sums with "different" remainders like -2 and 3
// are really the same remainder.
// Target: O(N + K) time. Pattern: prefix sums + counts of each remainder.
//
// example input: [4, 5, 0, -2, -3, 1], 5
// example output: 7

const countDivisibleSlices = (A, K) => {
  // your solution here
};

export { countDivisibleSlices };
