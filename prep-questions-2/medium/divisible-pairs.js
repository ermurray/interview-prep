// Series 2 · 1.8 Divisible pairs
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1 counterpart: 1.8 Passing cars. Concept: counting pairs with running counts instead of a double loop.)
//
// An array A of N non-negative integers and a positive integer K are given. A pair of indexes (P, Q),
// where 0 <= P < Q < N, is divisible if A[P] + A[Q] is divisible by K.
//
// For example, for A = [1, 2, 3, 4, 5] and K = 3, there are four divisible pairs:
//   - (0, 1): 1 + 2 = 3
//   - (0, 4): 1 + 5 = 6
//   - (1, 3): 2 + 4 = 6
//   - (3, 4): 4 + 5 = 9
//
// Write a function:
//
//   divisiblePairs(A, K)
//
// that, given an array A of N integers and an integer K, returns the number of divisible pairs. The
// function should return -1 if the number of pairs exceeds 1,000,000,000.
//
// For example, given A = [1, 2, 3, 4, 5] and K = 3, the function should return 4, as explained above.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..100,000];
//   - each element of array A is an integer within the range [0..1,000,000,000];
//   - K is an integer within the range [1..1,000,000,000].
//
// Target: O(N) time. Pattern: count remainders seen so far.
//
// example input: [1, 2, 3, 4, 5], 3
// example output: 4

const divisiblePairs = (A, K) => {
  // your solution here
};

export { divisiblePairs };
