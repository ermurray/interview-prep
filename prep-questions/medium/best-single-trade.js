// 1.9 Best single trade
// Difficulty: Medium · Suggested time: 45 minutes
//
// An array A of N integers holds the daily price of a share over N consecutive days: A[K] is the price
// on day K.
//
// If a share is bought on day P and sold on day Q, where 0 <= P <= Q < N, the profit of that trade is
// A[Q] - A[P]. A trade where the price falls is a loss.
//
// For example, for A = [7, 1, 5, 3, 6, 4]:
//   - buying on day 1 (price 1) and selling on day 4 (price 6) gives a profit of 5;
//   - buying on day 0 (price 7) and selling on day 2 (price 5) gives a loss of 2.
//
// Write a function:
//
//   bestSingleTrade(A)
//
// that, given an array A of N integers, returns the maximum possible profit from one buy followed by one
// sell. The function should return 0 if no profit is possible (including when N is 0 or 1).
//
// For example, given A = [7, 1, 5, 3, 6, 4] the function should return 5, as explained above. Given
// A = [7, 6, 4, 3, 1] the function should return 0, because the price only falls.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..400,000];
//   - each element of array A is an integer within the range [0..200,000].
//
// Target: O(N) time, O(1) space. Pattern: running minimum.
//
// example input: [7, 1, 5, 3, 6, 4]
// example output: 5

const bestSingleTrade = (prices) => {
  // your solution here
};

export { bestSingleTrade };
