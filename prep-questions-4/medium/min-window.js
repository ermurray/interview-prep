// Series 4 · 1.11 Minimum window substring
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1-3: 1.11 Longest unique substring / Shortest slice reaching a sum / At most K distinct. Concept: sliding window.)
//
// Two strings S and T are given. A window of S (a substring) covers T if it contains every character of
// T, at least as many times as T does. The goal is to find the shortest window of S that covers T.
//
// For example, for S = "ADOBECODEBANC" and T = "ABC":
//   - "ADOBEC" covers T and has length 6;
//   - "BANC" covers T and has length 4, which is the shortest.
//
// Write a function:
//
//   minWindow(S, T)
//
// that, given strings S and T, returns the shortest window of S that covers T. If several windows have
// that length, return the one that starts first. If no window covers T, return "".
//
// For example:
//   - given S = "ADOBECODEBANC" and T = "ABC", the function should return "BANC";
//   - given S = "a" and T = "a", the function should return "a";
//   - given S = "a" and T = "aa", the function should return "" (T needs two a's).
//
// Write an efficient algorithm for the following assumptions:
//   - the lengths of S and T are integers within the range [1..100,000];
//   - S and T consist of upper- and lowercase English letters (case matters).
//
// Target: O(len S + len T) time. Pattern: sliding window that grows until it covers T, then shrinks
// from the left while it still does.
//
// example input: "ADOBECODEBANC", "ABC"
// example output: "BANC"

const minWindow = (S, T) => {
  // your solution here
};

export { minWindow };
