// Series 3 · 1.11 Longest substring with at most K distinct characters
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1: 1.11 Longest substring without repeats · Series 2: 1.11 Shortest slice reaching a sum. Concept: sliding window.)
//
// A string S of N characters and an integer K are given. The goal is to find the longest substring
// (contiguous run of characters) of S that contains at most K different characters.
//
// For example, for S = "eceba" and K = 2:
//   - "ece" uses 2 different characters and has length 3;
//   - "eceb" uses 3 different characters, which is too many.
//
// Write a function:
//
//   longestKDistinct(S, K)
//
// that, given a string S and an integer K, returns the length of the longest substring of S with at most
// K distinct characters.
//
// For example:
//   - given S = "eceba" and K = 2, the function should return 3;
//   - given S = "aa" and K = 1, the function should return 2;
//   - given S = "abc" and K = 0, the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - K is an integer within the range [0..128];
//   - S consists of printable ASCII characters.
//
// Target: O(N) time. Pattern: sliding window with a count per character.
//
// example input: "eceba", 2
// example output: 3

const longestKDistinct = (S, K) => {
  // your solution here
};

export { longestKDistinct };
