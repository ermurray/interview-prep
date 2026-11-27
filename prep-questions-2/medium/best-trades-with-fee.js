// Series 2 · 1.9 Best trades with a fee
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1 counterpart: 1.9 Best single trade. Concept: one pass over prices, tracking the best state so far.)
//
// An array A of N integers holds the daily price of a share: A[K] is the price on day K. You may make
// as many trades as you like, but you can hold at most one share at a time (you must sell before you buy
// again). Every completed trade (a buy followed by a sell) costs a fixed FEE.
//
// For example, for A = [1, 3, 2, 8, 4, 9] and FEE = 2, the best plan is:
//   - buy on day 0 (price 1), sell on day 3 (price 8): profit 8 - 1 - 2 = 5;
//   - buy on day 4 (price 4), sell on day 5 (price 9): profit 9 - 4 - 2 = 3;
//   - total profit 8.
// Selling on day 1 and buying again on day 2 would earn an extra 1 in price but cost an extra fee of 2.
//
// Write a function:
//
//   bestTradesWithFee(A, FEE)
//
// that, given an array A of N integers and an integer FEE, returns the maximum total profit. The
// function should return 0 if no trade is profitable.
//
// For example:
//   - given A = [1, 3, 2, 8, 4, 9] and FEE = 2, the function should return 8, as explained above;
//   - given A = [1, 3, 7, 5, 10, 3] and FEE = 3, the function should return 6;
//   - given A = [9, 8, 7] and FEE = 0, the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - each element of array A and FEE are integers within the range [0..50,000].
//
// Target: O(N) time, O(1) space. Pattern: dynamic programming with two states (holding / not holding).
//
// example input: [1, 3, 2, 8, 4, 9], 2
// example output: 8

const bestTradesWithFee = (A, FEE) => {
  // your solution here
};

export { bestTradesWithFee };
