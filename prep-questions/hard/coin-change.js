// 1.15 Coin change (minimum coins)
// Difficulty: Hard · Suggested time: 60 minutes
//
// You are given an array C of coin denominations and an integer AMOUNT. You have an unlimited supply of
// coins of each denomination. The goal is to make up exactly AMOUNT using as few coins as possible.
//
// For example, for C = [1, 2, 5] and AMOUNT = 11:
//   - 5 + 5 + 1 uses 3 coins, which is the fewest possible;
//   - 5 + 2 + 2 + 2 uses 4 coins.
//
// Picking the largest coin first does not always work. For C = [1, 3, 4] and AMOUNT = 6, the greedy
// choice 4 + 1 + 1 uses 3 coins, but 3 + 3 uses only 2.
//
// Write a function:
//
//   coinChange(C, AMOUNT)
//
// that, given an array C of coin denominations and an integer AMOUNT, returns the fewest coins needed to
// make up AMOUNT, or -1 if it cannot be made from these coins. An AMOUNT of 0 needs 0 coins.
//
// For example:
//   - given C = [1, 2, 5] and AMOUNT = 11, the function should return 3;
//   - given C = [2] and AMOUNT = 3, the function should return -1;
//   - given C = [1] and AMOUNT = 0, the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - C contains between 1 and 12 distinct denominations;
//   - each element of C is an integer within the range [1..2,147,483,647];
//   - AMOUNT is an integer within the range [0..10,000].
//
// Target: O(AMOUNT * C.length) time, O(AMOUNT) space. Pattern: bottom-up dynamic programming.
// Be ready to discuss the time/space trade-off.
//
// example input: [1, 2, 5], 11
// example output: 3

const coinChange = (coins, amount) => {
  // your solution here
};

export { coinChange };
