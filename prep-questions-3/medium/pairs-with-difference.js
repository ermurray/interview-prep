// Series 3 · 1.8 Pairs with a given difference
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1: 1.8 Passing cars · Series 2: 1.8 Divisible pairs. Concept: counting pairs with running counts.)
//
// An array A of N integers and a non-negative integer K are given. A pair of indexes (P, Q), where
// 0 <= P < Q < N, is a K-pair if |A[P] - A[Q]| = K.
//
// For example, for A = [1, 5, 3, 4, 2] and K = 2 there are three K-pairs:
//   - (0, 2): |1 - 3| = 2
//   - (1, 2): |5 - 3| = 2
//   - (3, 4): |4 - 2| = 2
//
// Write a function:
//
//   pairsWithDifference(A, K)
//
// that, given an array A of N integers and an integer K, returns the number of K-pairs. The function
// should return -1 if the number exceeds 1,000,000,000.
//
// For example:
//   - given A = [1, 5, 3, 4, 2] and K = 2, the function should return 3, as explained above;
//   - given A = [1, 1, 1] and K = 0, the function should return 3;
//   - given A = [1, 2, 3] and K = 5, the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..100,000];
//   - each element of array A is an integer within the range [-1,000,000,000..1,000,000,000];
//   - K is an integer within the range [0..2,000,000,000].
//
// Target: O(N) time. Pattern: a map of how many times each value has been seen so far.
//
// example input: [1, 5, 3, 4, 2], 2
// example output: 3

const pairsWithDifference = (A, K) => {
  // your solution here
};

export { pairsWithDifference };
