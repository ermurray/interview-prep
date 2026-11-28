// Series 4 · 1.8 Count inversions
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1-3: 1.8 Passing cars / Divisible pairs / Pairs with a given difference. Concept: counting pairs without checking every pair.)
//
// An array A of N integers is given. An inversion is a pair of indexes (P, Q), where 0 <= P < Q < N, such
// that A[P] > A[Q]: the two elements are out of order. The number of inversions measures how far A is
// from being sorted.
//
// For example, for A = [2, 4, 1, 3, 5] there are three inversions:
//   - (0, 2): 2 > 1
//   - (1, 2): 4 > 1
//   - (1, 3): 4 > 3
//
// Write a function:
//
//   countInversions(A)
//
// that, given an array A of N integers, returns the number of inversions. The function should return -1
// if the number exceeds 1,000,000,000.
//
// For example:
//   - given A = [2, 4, 1, 3, 5], the function should return 3, as explained above;
//   - given A = [5, 4, 3, 2, 1], the function should return 10;
//   - given A = [1, 1], the function should return 0 (equal values are not an inversion).
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - each element of array A is an integer within the range [-2,147,483,648..2,147,483,647].
//
// Trap: checking every pair is O(N^2).
// Target: O(N log N) time. Pattern: merge sort, counting how many left-half elements each right-half
// element jumps over (or a Fenwick tree over compressed values).
//
// example input: [2, 4, 1, 3, 5]
// example output: 3

const countInversions = (A) => {
  // your solution here
};

export { countInversions };
