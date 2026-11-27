// Series 3 · 1.10 Maximum circular slice
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1: 1.10 Maximum subarray sum · Series 2: 1.10 Maximum product slice. Concept: Kadane-style running best.)
//
// A non-empty array A of N integers is arranged in a circle: after the last element comes the first one
// again. A circular slice is a non-empty run of consecutive elements around the circle, and may wrap past
// the end. Each element can be used at most once in a slice.
//
// For example, for A = [5, -3, 5]:
//   - the normal slice [5] has sum 5;
//   - the wrapping slice [5, 5] (the last element, then the first) has sum 10.
//
// Write a function:
//
//   maxCircularSubarray(A)
//
// that, given a non-empty array A of N integers, returns the maximum sum of any circular slice.
//
// For example:
//   - given A = [5, -3, 5], the function should return 10;
//   - given A = [1, -2, 3, -2], the function should return 3;
//   - given A = [-3, -2, -3], the function should return -2.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..100,000];
//   - each element of array A is an integer within the range [-30,000..30,000].
//
// Target: O(N) time, O(1) space. Hint: a wrapping slice is the total minus a normal slice. Watch out
// when every element is negative.
//
// example input: [5, -3, 5]
// example output: 10

const maxCircularSubarray = (A) => {
  // your solution here
};

export { maxCircularSubarray };
