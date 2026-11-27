// Series 3 · 1.1 Longest run of ones after one flip
// Difficulty: Easy · Suggested time: 30 minutes
// (Series 1: 1.1 Longest zero run · Series 2: 1.1 Steps to zero. Concept: scanning binary digits.)
//
// A string S of N characters, each "0" or "1", is given. You may change at most one "0" into a "1".
// The goal is to make the longest possible run of consecutive "1"s.
//
// For example, for S = "1101110111":
//   - the runs of ones are 11, 111 and 111, separated by single zeros;
//   - flipping the first zero joins 11 and 111 into a run of 2 + 1 + 3 = 6;
//   - flipping the second zero joins 111 and 111 into a run of 3 + 1 + 3 = 7.
//
// Write a function:
//
//   longestOnesAfterFlip(S)
//
// that, given a string S of N characters, returns the length of the longest run of "1"s that can be made
// by flipping at most one "0".
//
// For example:
//   - given S = "1101110111", the function should return 7, as explained above;
//   - given S = "111", the function should return 3 (no flip needed);
//   - given S = "000", the function should return 1.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..1,000,000];
//   - string S contains only the characters "0" and "1".
//
// Target: O(N) time, O(1) space. (Track the run before and after the most recent zero.)
//
// example input: "1101110111"
// example output: 7

const longestOnesAfterFlip = (S) => {
  // your solution here
};

export { longestOnesAfterFlip };
