// 1.6 Minimum split difference
// Difficulty: Medium · Suggested time: 45 minutes
//
// A non-empty array A of N integers is given. Any integer P such that 0 < P < N splits the array into
// two non-empty parts: A[0], ..., A[P - 1] and A[P], ..., A[N - 1].
//
// The difference at split P is the absolute difference between the sum of the first part and the sum
// of the second part: |(A[0] + ... + A[P - 1]) - (A[P] + ... + A[N - 1])|.
//
// For example, for A = [3, 1, 2, 4, 3] there are four possible splits:
//   - P = 1: |3 - 10| = 7
//   - P = 2: |4 - 9| = 5
//   - P = 3: |6 - 7| = 1
//   - P = 4: |10 - 3| = 7
//
// Write a function:
//
//   minSplitDifference(A)
//
// that, given a non-empty array A of N integers, returns the minimal difference that can be achieved.
//
// For example, given A = [3, 1, 2, 4, 3] the function should return 1, as explained above.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [2..100,000];
//   - each element of array A is an integer within the range [-1,000..1,000].
//
// Target: O(N) time. Pattern: prefix sums.
//
// example input: [3, 1, 2, 4, 3]
// example output: 1

const minSplitDifference = (array) => {
  // your solution here
};

export { minSplitDifference };
