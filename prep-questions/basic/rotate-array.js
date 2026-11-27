// 1.2 Rotate array
// Difficulty: Easy · Suggested time: 30 minutes
//
// An array A of N integers is given. Rotating the array right by one step moves each element one index
// to the right, and the last element moves to the front. For example, rotating [3, 8, 9, 7, 6] right
// once gives [6, 3, 8, 9, 7].
//
// The goal is to rotate array A right K times.
//
// Write a function:
//
//   rotateArray(A, K)
//
// that, given an array A of N integers and an integer K, returns array A rotated right K times.
//
// For example, given A = [3, 8, 9, 7, 6] and K = 3, the function should return [9, 7, 6, 3, 8]:
//   [3, 8, 9, 7, 6] -> [6, 3, 8, 9, 7]
//   [6, 3, 8, 9, 7] -> [7, 6, 3, 8, 9]
//   [7, 6, 3, 8, 9] -> [9, 7, 6, 3, 8]
//
// Given A = [0, 0, 0] and K = 1, the function should return [0, 0, 0].
// Given A = [1, 2, 3, 4] and K = 4, the function should return [1, 2, 3, 4].
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000] (A may be empty);
//   - K is an integer within the range [0..2,000,000,000] (K may exceed N);
//   - each element of array A is an integer within the range [-1,000,000..1,000,000].
//
// Target: O(N) time.
//
// example input: [1, 2, 3, 4, 5], 2
// example output: [4, 5, 1, 2, 3]

const rotateArray = (A, K) => {
  // your solution here
};

export { rotateArray };
