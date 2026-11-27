// Series 3 · 1.5 Remove adjacent duplicates
// Difficulty: Easy · Suggested time: 30 minutes
// (Series 1: 1.5 Balanced brackets · Series 2: 1.5 Minimum removals to balance. Concept: stack.)
//
// A string S of N lowercase letters is given. A removal deletes two adjacent, equal letters. Removals are
// repeated until no two adjacent letters are equal. The final string is always the same, whatever order
// the removals are done in.
//
// For example, for S = "abbaca":
//   - "bb" is removed, giving "aaca";
//   - "aa" is now adjacent and is removed, giving "ca";
//   - no adjacent letters are equal, so the result is "ca".
//
// Write a function:
//
//   removeAdjacentDuplicates(S)
//
// that, given a string S, returns the final string after all removals.
//
// For example:
//   - given S = "abbaca", the function should return "ca";
//   - given S = "azxxzy", the function should return "ay";
//   - given S = "aaaa", the function should return "" (the empty string).
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..200,000];
//   - string S contains only lowercase letters "a" to "z".
//
// Trap: rescanning the string after every removal is O(N^2).
// Target: O(N) time. Pattern: stack.
//
// example input: "abbaca"
// example output: "ca"

const removeAdjacentDuplicates = (S) => {
  // your solution here
};

export { removeAdjacentDuplicates };
