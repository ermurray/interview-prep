// Series 2 · 1.1 Steps to zero
// Difficulty: Easy · Suggested time: 30 minutes
// (Series 1 counterpart: 1.1 Longest zero run. Concept: reading a number's binary form.)
//
// You are given a string S of N characters, each "0" or "1", which is the binary representation of a
// non-negative integer V. S may have leading zeros.
//
// The following step is repeated until V becomes 0:
//   - if V is even, divide it by 2;
//   - if V is odd, subtract 1 from it.
//
// For example, if S = "011100", then V = 28 and it takes 7 steps to reach 0:
//   28 is even: divide by 2 -> 14
//   14 is even: divide by 2 -> 7
//    7 is odd:  subtract 1  -> 6
//    6 is even: divide by 2 -> 3
//    3 is odd:  subtract 1  -> 2
//    2 is even: divide by 2 -> 1
//    1 is odd:  subtract 1  -> 0
//
// Write a function:
//
//   stepsToZero(S)
//
// that, given a string S of N characters, returns the number of steps needed to reduce V to 0.
//
// For example:
//   - given S = "011100", the function should return 7, as explained above;
//   - given S = "111", the function should return 5;
//   - given S = "000", the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..1,000,000];
//   - string S contains only the characters "0" and "1".
//
// Trap: S can be a million digits long, so converting it to a Number (or even looping on a BigInt) will
// not work. Work on the string directly.
// Target: O(N) time.
//
// example input: "011100"
// example output: 7

const stepsToZero = (S) => {
  // your solution here
};

export { stepsToZero };
