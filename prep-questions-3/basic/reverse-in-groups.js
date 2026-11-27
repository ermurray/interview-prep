// Series 3 · 1.2 Reverse in groups
// Difficulty: Easy · Suggested time: 30 minutes
// (Series 1: 1.2 Rotate array · Series 2: 1.2 Move zeros. Concept: rearranging an array in one pass.)
//
// An array A of N integers and a positive integer K are given. Split A into consecutive groups of K
// elements, starting from the front. The last group may have fewer than K elements. Reverse the order
// of the elements inside every group, including the last one.
//
// For example, for A = [1, 2, 3, 4, 5, 6, 7] and K = 3:
//   - the groups are [1, 2, 3], [4, 5, 6] and [7];
//   - reversed, they are [3, 2, 1], [6, 5, 4] and [7];
//   - so the result is [3, 2, 1, 6, 5, 4, 7].
//
// Write a function:
//
//   reverseInGroups(A, K)
//
// that, given an array A of N integers and an integer K, returns the array with every group reversed.
// You may change A in place and return it, or return a new array.
//
// For example:
//   - given A = [1, 2, 3, 4, 5, 6, 7] and K = 3, the function should return [3, 2, 1, 6, 5, 4, 7];
//   - given A = [1, 2, 3, 4, 5] and K = 2, the function should return [2, 1, 4, 3, 5];
//   - given A = [1, 2, 3] and K = 10, the function should return [3, 2, 1].
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - K is an integer within the range [1..200,000];
//   - each element of array A is an integer within the range [-1,000,000..1,000,000].
//
// Target: O(N) time.
//
// example input: [1, 2, 3, 4, 5], 2
// example output: [2, 1, 4, 3, 5]

const reverseInGroups = (A, K) => {
  // your solution here
};

export { reverseInGroups };
