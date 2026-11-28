// Series 4 · 1.13 Minimum days for bouquets
// Difficulty: Hard · Suggested time: 60 minutes
// (Series 1-3: 1.13 Minimise the largest block / Minimum eating speed / Maximise the minimum distance. Concept: binary search on the answer.)
//
// A garden has N flowers in a row. Flower I blooms on day BLOOM[I] and stays bloomed from then on. You
// want to make M bouquets. Each bouquet needs K flowers that are next to each other in the row and have
// all bloomed, and each flower can be used in only one bouquet.
//
// For example, for BLOOM = [7, 7, 7, 7, 12, 7, 7], M = 2 and K = 3:
//   - on day 7 the bloomed flowers are positions 0-3 and 5-6, so you can make one bouquet from 0-2,
//     but positions 5-6 are only two flowers;
//   - on day 12 every flower has bloomed, so you can make bouquets from 0-2 and 3-5;
//   - so the answer is 12.
//
// Write a function:
//
//   minDaysForBouquets(BLOOM, M, K)
//
// that, given an array BLOOM of N integers and integers M and K, returns the earliest day on which M
// bouquets can be made, or -1 if it is impossible.
//
// For example:
//   - given BLOOM = [7, 7, 7, 7, 12, 7, 7], M = 2 and K = 3, the function should return 12;
//   - given BLOOM = [1, 10, 3, 10, 2], M = 3 and K = 1, the function should return 3;
//   - given BLOOM = [1, 10, 3, 10, 2], M = 3 and K = 2, the function should return -1 (that needs 6
//     flowers, and there are only 5).
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..100,000];
//   - each element of BLOOM is an integer within the range [1..1,000,000,000];
//   - M is within [1..1,000,000] and K is within [1..N].
//
// Target: O(N log D) time, where D is the largest bloom day. Pattern: binary search on the day, with a
// greedy check.
//
// example input: [7, 7, 7, 7, 12, 7, 7], 2, 3
// example output: 12

const minDaysForBouquets = (BLOOM, M, K) => {
  // your solution here
};

export { minDaysForBouquets };
