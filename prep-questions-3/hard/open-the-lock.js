// Series 3 · 1.16 Combination lock
// Difficulty: Hard · Suggested time: 60 minutes
// (Series 1: 1.16 Frog jumps with Fibonacci steps · Series 2: 1.16 Shortest path through a grid. Concept: breadth-first search.)
//
// A lock has 4 wheels, each showing a digit from 0 to 9. The lock starts at "0000". One move turns one
// wheel one step up or down, and the wheels wrap around: one step up from 9 is 0, and one step down from 0
// is 9.
//
// Some combinations are dead ends: if the lock ever shows one of them, it jams. You are given an array
// DEADENDS of such combinations and a TARGET combination.
//
// For example, for DEADENDS = ["0201", "0101", "0102", "1212", "2002"] and TARGET = "0202", the shortest
// safe sequence takes 6 moves:
//   "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202".
// The more direct route "0000" -> "0001" -> "0002" -> "0102" -> "0202" goes through the dead end "0102".
//
// Write a function:
//
//   openLock(DEADENDS, TARGET)
//
// that, given an array DEADENDS of strings and a string TARGET, returns the minimum number of moves needed
// to reach TARGET without passing through a dead end, or -1 if it is impossible.
//
// For example:
//   - given DEADENDS = ["0201", "0101", "0102", "1212", "2002"] and TARGET = "0202", the function should
//     return 6, as explained above;
//   - given DEADENDS = ["8888"] and TARGET = "0009", the function should return 1 ("0000" -> "0009");
//   - given DEADENDS = ["0000"] and TARGET = "8888", the function should return -1 (the lock is jammed
//     from the start);
//   - given DEADENDS = [] and TARGET = "0000", the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - DEADENDS has between 0 and 500 elements;
//   - TARGET and every dead end are strings of exactly 4 digits.
//
// Target: O(10^4 * 8) time: there are only 10,000 combinations, each with 8 neighbours.
// Pattern: BFS from "0000".
//
// example input: ["0201", "0101", "0102", "1212", "2002"], "0202"
// example output: 6

const openLock = (DEADENDS, TARGET) => {
  // your solution here
};

export { openLock };
