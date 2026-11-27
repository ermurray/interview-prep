// 1.11 Longest substring without repeats
// Difficulty: Medium · Suggested time: 45 minutes
//
// A string S of N characters is given. A substring is a contiguous run of characters of S. A substring
// is distinct if no character appears in it more than once.
//
// For example, for S = "pwwkew":
//   - "wke" is a distinct substring of length 3;
//   - "pwwk" is not distinct, because "w" appears twice;
//   - "pwke" has distinct characters but is not a substring, because its letters are not contiguous in S.
//
// Write a function:
//
//   longestUniqueSubstring(S)
//
// that, given a string S, returns the length of the longest distinct substring of S.
//
// For example:
//   - given S = "abcabcbb", the function should return 3 ("abc");
//   - given S = "bbbbb", the function should return 1 ("b");
//   - given S = "pwwkew", the function should return 3 ("wke");
//   - given S = "", the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..50,000];
//   - S consists of printable ASCII characters, including spaces.
//
// Target: O(N) time. Pattern: sliding window + map.
//
// example input: "abcabcbb"
// example output: 3

const longestUniqueSubstring = (str) => {
  // your solution here
};

export { longestUniqueSubstring };
