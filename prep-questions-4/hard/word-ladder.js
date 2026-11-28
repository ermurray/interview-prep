// Series 4 · 1.16 Word ladder
// Difficulty: Hard · Suggested time: 60 minutes
// (Series 1-3: 1.16 Frog jumps / Grid shortest path / Combination lock. Concept: breadth-first search.)
//
// You are given two words, BEGIN and END, and a list WORDS of allowed words, all the same length. A
// ladder from BEGIN to END changes one letter at a time, and every word after BEGIN (including END) must
// be in WORDS. The length of a ladder is the number of words in it, counting BEGIN and END.
//
// For example, for BEGIN = "hit", END = "cog" and WORDS = ["hot", "dot", "dog", "lot", "log", "cog"],
// the shortest ladder is:
//   "hit" -> "hot" -> "dot" -> "dog" -> "cog"
// which has 5 words.
//
// Write a function:
//
//   wordLadder(BEGIN, END, WORDS)
//
// that, given two strings and an array of strings, returns the number of words in the shortest ladder,
// or 0 if there is none.
//
// For example:
//   - given BEGIN = "hit", END = "cog" and WORDS = ["hot", "dot", "dog", "lot", "log", "cog"], the
//     function should return 5;
//   - given the same, but without "cog" in WORDS, the function should return 0 (END must be in WORDS).
//
// Write an efficient algorithm for the following assumptions:
//   - every word has the same length L, within the range [1..10];
//   - WORDS has between 1 and 5,000 distinct words;
//   - all words consist of lowercase letters, and BEGIN is different from END.
//
// Target: O(N * L * 26) time. Pattern: BFS from BEGIN. To find neighbours, try all 26 letters in each
// position (or group words by patterns like "h*t").
//
// example input: "hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]
// example output: 5

const wordLadder = (BEGIN, END, WORDS) => {
  // your solution here
};

export { wordLadder };
