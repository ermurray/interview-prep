// Series 4 · 1.10 Maximum double slice
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1-3: 1.10 Max subarray sum / Max product slice / Max circular slice. Concept: Kadane-style running best.)
//
// A non-empty array A of N integers is given. A triplet (X, Y, Z), where 0 <= X < Y < Z < N, is a double
// slice. Its sum is the sum of the elements strictly between X and Y, plus the sum of the elements
// strictly between Y and Z:
//   A[X + 1] + ... + A[Y - 1] + A[Y + 1] + ... + A[Z - 1]
// (either part can be empty, and then counts as 0). A[X], A[Y] and A[Z] themselves are left out.
//
// For example, for A = [3, 2, 6, -1, 4, 5, -1, 2]:
//   - the double slice (0, 3, 6) has sum 2 + 6 + 4 + 5 = 17;
//   - the double slice (0, 3, 7) has sum 2 + 6 + 4 + 5 - 1 = 16;
//   - the double slice (3, 4, 5) has sum 0.
// The maximum is 17.
//
// Write a function:
//
//   maxDoubleSlice(A)
//
// that, given an array A of N integers, returns the maximal sum of any double slice.
//
// For example:
//   - given A = [3, 2, 6, -1, 4, 5, -1, 2], the function should return 17, as explained above;
//   - given A = [5, 5, 5], the function should return 0 (the only triplet leaves both parts empty).
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [3..100,000];
//   - each element of array A is an integer within the range [-10,000..10,000].
//
// Target: O(N) time. Pattern: the best slice ending just before each Y (from the left) and the best slice
// starting just after each Y (from the right), each never below 0.
//
// example input: [3, 2, 6, -1, 4, 5, -1, 2]
// example output: 17

const maxDoubleSlice = (A) => {
  // your solution here
};

export { maxDoubleSlice };
