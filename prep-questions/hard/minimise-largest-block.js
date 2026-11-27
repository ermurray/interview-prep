// 1.13 Minimise the largest block
// Difficulty: Hard · Suggested time: 60 minutes
//
// You are given an integer K and an array A of N non-negative integers. You must divide A into at most K
// blocks of consecutive elements. Every element belongs to exactly one block, and a block may be empty.
//
// The sum of a block is the sum of its elements (an empty block has sum 0). The large sum of a division
// is the largest of its block sums. The goal is to minimise the large sum.
//
// For example, for K = 3 and A = [2, 1, 5, 1, 2, 2, 2], possible divisions include:
//   - [2, 1, 5, 1, 2, 2, 2], [], [] with a large sum of 15;
//   - [2], [1, 5, 1, 2], [2, 2] with a large sum of 9;
//   - [2, 1], [5, 1], [2, 2, 2] with a large sum of 6.
//
// Write a function:
//
//   minimiseLargestBlock(A, K)
//
// that, given an array A of N non-negative integers and an integer K, returns the minimal large sum.
//
// For example, given A = [2, 1, 5, 1, 2, 2, 2] and K = 3, the function should return 6, as explained
// above.
//
// Write an efficient algorithm for the following assumptions:
//   - N and K are integers within the range [1..100,000];
//   - each element of array A is an integer within the range [0..10,000].
//
// Target: O(N log S) time, where S is the sum of A. Pattern: binary search on the answer.
//
// example input: [2, 1, 5, 1, 2, 2, 2], 3
// example output: 6

const minimiseLargestBlock = (array, k) => {
  // your solution here
};

export { minimiseLargestBlock };
