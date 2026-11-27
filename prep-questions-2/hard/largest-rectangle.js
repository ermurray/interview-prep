// Series 2 · 1.12 Largest rectangle in a skyline
// Difficulty: Hard · Suggested time: 60 minutes
// (Series 1 counterpart: 1.12 Skyline blocks. Concept: monotonic stack.)
//
// An array H of N non-negative integers describes a skyline of N adjacent buildings, each 1 unit wide:
// H[I] is the height of building I. The goal is to find the largest rectangle that fits entirely inside
// the skyline. The rectangle must sit on the ground and span whole buildings.
//
// For example, for H = [2, 1, 5, 6, 2, 3]:
//   - a rectangle of height 5 over buildings 2 and 3 has area 5 * 2 = 10;
//   - a rectangle of height 2 over buildings 2 to 5 has area 2 * 4 = 8;
//   - a rectangle of height 1 over all six buildings has area 6.
// The largest possible area is 10.
//
// Write a function:
//
//   largestRectangle(H)
//
// that, given an array H of N integers, returns the area of the largest rectangle that fits in the
// skyline.
//
// For example:
//   - given H = [2, 1, 5, 6, 2, 3], the function should return 10, as explained above;
//   - given H = [2, 4], the function should return 4;
//   - given H = [3, 3, 3], the function should return 9.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..100,000];
//   - each element of array H is an integer within the range [0..10,000].
//
// Target: O(N) time. Pattern: monotonic stack of increasing heights.
//
// example input: [2, 1, 5, 6, 2, 3]
// example output: 10

const largestRectangle = (H) => {
  // your solution here
};

export { largestRectangle };
