// Series 4 · 1.1 Add binary strings
// Difficulty: Easy · Suggested time: 30 minutes
// (Series 1-3: 1.1 Longest zero run / Steps to zero / Longest ones after a flip. Concept: working with binary digits.)
//
// Two strings A and B are given. Each is the binary representation of a non-negative integer: it holds
// only "0" and "1", and has no leading zeros (except the string "0" itself).
//
// The goal is to add the two numbers and return the sum, also as a binary string with no leading zeros.
//
// For example, for A = "1010" (10) and B = "1011" (11):
//   - adding digit by digit from the right, with carries, gives "10101";
//   - 10 + 11 = 21, which is 10101 in binary.
//
// Write a function:
//
//   addBinary(A, B)
//
// that, given two binary strings A and B, returns their sum as a binary string.
//
// For example:
//   - given A = "1010" and B = "1011", the function should return "10101";
//   - given A = "11" and B = "1", the function should return "100";
//   - given A = "0" and B = "0", the function should return "0".
//
// Write an efficient algorithm for the following assumptions:
//   - the lengths of A and B are integers within the range [1..100,000];
//   - A and B contain only "0" and "1", with no leading zeros unless the string is "0".
//
// Trap: the numbers can have 100,000 digits, so parseInt overflows. Work digit by digit (BigInt would
// work, but the interviewer wants to see the carry logic).
// Target: O(max(len A, len B)) time.
//
// example input: "1010", "1011"
// example output: "10101"

const addBinary = (A, B) => {
  // your solution here
};

export { addBinary };
