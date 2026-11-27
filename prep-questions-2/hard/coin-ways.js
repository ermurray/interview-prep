// Series 2 · 1.15 Coin change (number of ways)
// Difficulty: Hard · Suggested time: 60 minutes
// (Series 1 counterpart: 1.15 Coin change (minimum coins). Concept: bottom-up dynamic programming.)
//
// You are given an array C of coin denominations and an integer AMOUNT, with an unlimited supply of each
// coin. The goal is to count the different ways to make up exactly AMOUNT. Two ways are the same if they
// use the same number of each coin; the order of the coins does not matter.
//
// For example, for C = [1, 2, 5] and AMOUNT = 5 there are 4 ways:
//   - 5
//   - 2 + 2 + 1
//   - 2 + 1 + 1 + 1
//   - 1 + 1 + 1 + 1 + 1
//
// Write a function:
//
//   coinWays(C, AMOUNT)
//
// that, given an array C of coin denominations and an integer AMOUNT, returns the number of ways to make
// up AMOUNT, modulo 1,000,000,007. There is exactly 1 way to make an AMOUNT of 0 (use no coins).
//
// For example:
//   - given C = [1, 2, 5] and AMOUNT = 5, the function should return 4, as explained above;
//   - given C = [2] and AMOUNT = 3, the function should return 0;
//   - given C = [10] and AMOUNT = 10, the function should return 1.
//
// Write an efficient algorithm for the following assumptions:
//   - C contains between 1 and 50 distinct denominations;
//   - each element of C is an integer within the range [1..10,000];
//   - AMOUNT is an integer within the range [0..10,000].
//
// Trap: counting orderings (1 + 2 and 2 + 1 as different) gives the wrong answer. Think about which loop
// goes on the outside.
// Target: O(AMOUNT * C.length) time, O(AMOUNT) space.
//
// example input: [1, 2, 5], 5
// example output: 4

const coinWays = (C, AMOUNT) => {
  // your solution here
};

export { coinWays };
