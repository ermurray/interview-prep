// Series 4 · 1.4 Anagram check
// Difficulty: Easy · Suggested time: 30 minutes
// (Series 1-3: 1.4 Smallest missing positive / Permutation check / First unique character. Concept: counting occurrences.)
//
// Two strings S and T of lowercase letters are given. T is an anagram of S if it uses exactly the same
// letters, each the same number of times, in any order.
//
// For example:
//   - "nagaram" is an anagram of "anagram": both have three a's, one each of n, g, r and m;
//   - "car" is not an anagram of "rat".
//
// Write a function:
//
//   isAnagram(S, T)
//
// that, given two strings S and T, returns 1 if T is an anagram of S, and 0 otherwise.
//
// For example:
//   - given S = "anagram" and T = "nagaram", the function should return 1;
//   - given S = "rat" and T = "car", the function should return 0;
//   - given S = "" and T = "", the function should return 1.
//
// Write an efficient algorithm for the following assumptions:
//   - the lengths of S and T are integers within the range [0..100,000];
//   - S and T contain only lowercase letters "a" to "z".
//
// Target: O(N) time, O(1) extra space (26 counters). Sorting both strings is O(N log N): mention it,
// then do better.
//
// example input: "anagram", "nagaram"
// example output: 1

const isAnagram = (S, T) => {
  // your solution here
};

export { isAnagram };
