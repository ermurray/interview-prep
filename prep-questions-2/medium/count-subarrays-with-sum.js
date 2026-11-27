// Series 2 · 1.6 Count slices with a given sum
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1 counterpart: 1.6 Minimum split difference. Concept: prefix sums.)
//
// An array A of N integers and an integer K are given. A slice (P, Q), where 0 <= P <= Q < N, is the
// contiguous part of A from A[P] to A[Q]. Its sum is A[P] + A[P + 1] + ... + A[Q].
//
// For example, for A = [1, -1, 0] and K = 0, three slices have sum 0:
//   - (0, 1): 1 + (-1) = 0
//   - (2, 2): 0 = 0
//   - (0, 2): 1 + (-1) + 0 = 0
//
// Write a function:
//
//   countSubarraysWithSum(A, K)
//
// that, given an array A of N integers and an integer K, returns the number of slices whose sum is
// exactly K.
//
// For example:
//   - given A = [1, -1, 0] and K = 0, the function should return 3, as explained above;
//   - given A = [1, 1, 1] and K = 2, the function should return 2;
//   - given A = [1, 2, 3] and K = 3, the function should return 2 ([1, 2] and [3]).
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..100,000];
//   - each element of array A is an integer within the range [-1,000..1,000];
//   - K is an integer within the range [-100,000,000..100,000,000].
//
// Trap: checking every slice is O(N^2) and times out. Elements can be negative, so a sliding window
// does not work either.
// Target: O(N) time. Pattern: prefix sums + hash map of counts.
//
// example input: [1, 1, 1], 2
// example output: 2

const countSubarraysWithSum = (A, K) => {
  // your solution here
};

export { countSubarraysWithSum };
