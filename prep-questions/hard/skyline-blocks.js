// 1.12 Skyline blocks
// Difficulty: Hard · Suggested time: 60 minutes
//
// You are building a stone wall. It must be N metres long, and its height has to match an array H of N
// positive integers: H[I] is the height of the wall from I to I + 1 metres from its left end.
//
// The wall is built from cuboid stone blocks, all of the same thickness. Each block is a rectangle in
// front view: it can span several adjacent metres, but it must have the same height along its whole
// length, and blocks stack only on the ground or on top of other blocks. The aim is to use as few blocks
// as possible.
//
// For example, for H = [8, 8, 5, 7, 9, 8, 7, 4, 8] the wall can be built from 7 blocks:
//   1. height 8 across metres 0-1;
//   2. height 5 across metres 2-6;
//   3. height 2 on top of block 2 across metres 3-6 (wall reaches 7);
//   4. height 2 on top of block 3 at metre 4 (wall reaches 9);
//   5. height 1 on top of block 3 at metre 5 (wall reaches 8);
//   6. height 4 across metres 7-8;
//   7. height 4 on top of block 6 at metre 8 (wall reaches 8).
// It cannot be done with fewer, so the answer is 7.
//
// Write a function:
//
//   skylineBlocks(H)
//
// that, given an array H of N positive integers specifying the height of the wall, returns the minimum
// number of blocks needed to build it.
//
// For example, given H = [8, 8, 5, 7, 9, 8, 7, 4, 8] the function should return 7.
// Given H = [1, 2, 3] it should return 3, and given H = [2, 2, 2] it should return 1.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..100,000];
//   - each element of array H is an integer within the range [1..1,000,000,000].
//
// Target: O(N) time. Pattern: monotonic stack.
//
// example input: [8, 8, 5, 7, 9, 8, 7, 4, 8]
// example output: 7

const skylineBlocks = (heights) => {
  // your solution here
};

export { skylineBlocks };
