// Series 4 · 1.15 Edit distance
// Difficulty: Hard · Suggested time: 60 minutes
// (Series 1-3: 1.15 Coin change (min coins / ways) / Longest increasing subsequence. Concept: dynamic programming.)
//
// Two strings S and T are given. One edit is one of:
//   - insert a character;
//   - delete a character;
//   - replace a character with another one.
// The edit distance (Levenshtein distance) is the smallest number of edits that turns S into T.
//
// For example, for S = "horse" and T = "ros":
//   - replace "h" with "r": "rorse";
//   - delete the first "r" after it: "rose";
//   - delete "e": "ros";
//   - 3 edits, and no shorter sequence exists.
//
// Write a function:
//
//   editDistance(S, T)
//
// that, given strings S and T, returns their edit distance.
//
// For example:
//   - given S = "horse" and T = "ros", the function should return 3;
//   - given S = "intention" and T = "execution", the function should return 5;
//   - given S = "" and T = "abc", the function should return 3.
//
// Write an efficient algorithm for the following assumptions:
//   - the lengths of S and T are integers within the range [0..2,000];
//   - S and T consist of lowercase letters.
//
// Target: O(len S * len T) time, O(min(len S, len T)) space. Pattern: a DP table of distances between
// prefixes, kept to two rows.
//
// example input: "horse", "ros"
// example output: 3

const editDistance = (S, T) => {
  // your solution here
};

export { editDistance };
