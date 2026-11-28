// Series 4 · 1.12 Trapping rain water
// Difficulty: Hard · Suggested time: 60 minutes
// (Series 1-3: 1.12 Skyline blocks / Largest rectangle / Sum of slice minimums. Concept: monotonic stack or two pointers.)
//
// An array H of N non-negative integers describes an elevation map: H[I] is the height of a 1-unit-wide
// bar at position I. After it rains, water collects in the dips between bars. The water above bar I
// rises to the height of the lower of the tallest bars on its left and on its right.
//
// For example, for H = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]:
//   - 1 unit sits above position 2 (between the 1 and the 2);
//   - 4 units sit above positions 4, 5 and 6 (1 + 2 + 1);
//   - 1 unit sits above position 9;
//   - 6 units in total.
//
// Write a function:
//
//   trapRainWater(H)
//
// that, given an array H of N integers, returns the total units of water trapped.
//
// For example:
//   - given H = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], the function should return 6;
//   - given H = [4, 2, 0, 3, 2, 5], the function should return 9;
//   - given H = [1, 2, 3], the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - each element of array H is an integer within the range [0..100,000].
//
// Trap: for each bar, scanning left and right for the tallest bars is O(N^2).
// Target: O(N) time, O(1) extra space with two pointers (or O(N) space with prefix maximums or a stack).
//
// example input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
// example output: 6

const trapRainWater = (H) => {
  // your solution here
};

export { trapRainWater };
