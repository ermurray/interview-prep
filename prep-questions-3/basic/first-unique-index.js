// Series 3 · 1.4 First unique character
// Difficulty: Easy · Suggested time: 30 minutes
// (Series 1: 1.4 Smallest missing positive · Series 2: 1.4 Permutation check. Concept: counting occurrences.)
//
// A string S of N lowercase English letters is given. A character is unique if it appears in S exactly
// once.
//
// For example, in S = "loveleetcode":
//   - "l", "o", "e" all appear more than once;
//   - "v" appears once, at index 2;
//   - "t", "c" and "d" also appear once, but later.
//
// Write a function:
//
//   firstUniqueIndex(S)
//
// that, given a string S, returns the index of the first unique character, or -1 if there is none.
//
// For example:
//   - given S = "leetcode", the function should return 0 ("l");
//   - given S = "loveleetcode", the function should return 2 ("v");
//   - given S = "aabb", the function should return -1.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - string S contains only lowercase letters "a" to "z".
//
// Target: O(N) time, O(1) extra space (the alphabet has 26 letters).
//
// example input: "loveleetcode"
// example output: 2

const firstUniqueIndex = (S) => {
  // your solution here
};

export { firstUniqueIndex };
