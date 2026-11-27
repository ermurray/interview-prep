// 1.10 Maximum subarray sum
// Difficulty: Medium · Suggested time: 45 minutes
//
// A non-empty array A of N integers is given. A slice (P, Q), where 0 <= P <= Q < N, is the contiguous
// part of the array from A[P] to A[Q]. Its sum is A[P] + A[P + 1] + ... + A[Q].
//
// For example, for A = [-2, 1, -3, 4, -1, 2, 1, -5, 4]:
//   - slice (3, 6) is [4, -1, 2, 1] and has sum 6;
//   - slice (0, 1) is [-2, 1] and has sum -1.
//
// Write a function:
//
//   maxSubarraySum(A)
//
// that, given a non-empty array A of N integers, returns the maximum sum of any slice. Slices are
// non-empty, so if every element is negative the answer is the largest single element.
//
// For example, given A = [-2, 1, -3, 4, -1, 2, 1, -5, 4] the function should return 6, as explained
// above. Given A = [-3, -1, -2] the function should return -1.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..1,000,000];
//   - each element of array A is an integer within the range [-1,000,000..1,000,000].
//
// Target: O(N) time, O(1) space. Pattern: Kadane's algorithm.
//
// example input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// example output: 6

const maxSubarraySum = (array) => {
  // your solution here
};

export { maxSubarraySum };
