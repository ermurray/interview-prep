// Series 4 · 1.9 At most two trades
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1-3: 1.9 Best single trade / Trades with a fee / Sightseeing pair. Concept: one pass, tracking the best state so far.)
//
// An array A of N integers holds the daily price of a share: A[K] is the price on day K. You may make at
// most two trades. A trade is a buy followed by a later sell, and you must sell before you buy again
// (selling and buying again on the same day is allowed).
//
// For example, for A = [3, 3, 5, 0, 0, 3, 1, 4]:
//   - buy on day 3 (price 0) and sell on day 5 (price 3): profit 3;
//   - buy on day 6 (price 1) and sell on day 7 (price 4): profit 3;
//   - the total is 6, and no plan does better.
//
// Write a function:
//
//   bestTwoTrades(A)
//
// that, given an array A of N integers, returns the maximum total profit from at most two trades, or 0
// if no trade is profitable.
//
// For example:
//   - given A = [3, 3, 5, 0, 0, 3, 1, 4], the function should return 6, as explained above;
//   - given A = [1, 2, 3, 4, 5], the function should return 4 (one trade is enough);
//   - given A = [7, 6, 4, 3, 1], the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - each element of array A is an integer within the range [0..100,000].
//
// Target: O(N) time, O(1) space. Pattern: four running states (after first buy, first sell, second buy,
// second sell).
//
// example input: [3, 3, 5, 0, 0, 3, 1, 4]
// example output: 6

const bestTwoTrades = (A) => {
  // your solution here
};

export { bestTwoTrades };
