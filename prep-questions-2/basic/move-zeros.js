// Series 2 · 1.2 Move zeros to the end
// Difficulty: Easy · Suggested time: 30 minutes
// (Series 1 counterpart: 1.2 Rotate array. Concept: rearranging an array in one pass.)
//
// An array A of N integers is given. The goal is to move every zero to the end of the array, while the
// non-zero elements keep their original relative order.
//
// For example, for A = [0, 1, 0, 3, 12]:
//   - the non-zero elements, in order, are 1, 3, 12;
//   - there are two zeros;
//   - so the result is [1, 3, 12, 0, 0].
//
// Write a function:
//
//   moveZeros(A)
//
// that, given an array A of N integers, returns the array with all zeros moved to the end. You may
// rearrange A in place and return it, or return a new array.
//
// For example:
//   - given A = [0, 1, 0, 3, 12], the function should return [1, 3, 12, 0, 0];
//   - given A = [0, 0, 1], the function should return [1, 0, 0];
//   - given A = [], the function should return [].
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - each element of array A is an integer within the range [-1,000,000..1,000,000].
//
// Target: O(N) time, O(1) extra space if done in place (two pointers).
//
// example input: [0, 1, 0, 3, 12]
// example output: [1, 3, 12, 0, 0]

const moveZeros = (A) => {
  // your solution here
};

export { moveZeros };
