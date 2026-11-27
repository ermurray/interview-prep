// Series 2 · 1.13 Minimum eating speed
// Difficulty: Hard · Suggested time: 60 minutes
// (Series 1 counterpart: 1.13 Minimise the largest block. Concept: binary search on the answer.)
//
// There are N piles of bananas; pile I has P[I] bananas. A guard leaves for H hours. A monkey eats at a
// fixed speed of K bananas per hour: each hour it picks one pile and eats K bananas from it. If the pile
// has fewer than K bananas, the monkey eats the whole pile and waits for the rest of that hour.
//
// For example, for P = [3, 6, 7, 11] and H = 8:
//   - at speed 4 the piles take 1 + 2 + 2 + 3 = 8 hours, which is just in time;
//   - at speed 3 the piles take 1 + 2 + 3 + 4 = 10 hours, which is too slow.
//
// Write a function:
//
//   minEatingSpeed(P, H)
//
// that, given an array P of N integers and an integer H, returns the minimum integer speed K at which
// the monkey can eat every banana within H hours.
//
// For example:
//   - given P = [3, 6, 7, 11] and H = 8, the function should return 4, as explained above;
//   - given P = [30, 11, 23, 4, 20] and H = 5, the function should return 30;
//   - given P = [30, 11, 23, 4, 20] and H = 6, the function should return 23.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..100,000];
//   - H is an integer within the range [N..1,000,000,000];
//   - each element of array P is an integer within the range [1..1,000,000,000].
//
// Target: O(N log M) time, where M is the largest pile. Pattern: binary search on the answer.
//
// example input: [3, 6, 7, 11], 8
// example output: 4

const minEatingSpeed = (P, H) => {
  // your solution here
};

export { minEatingSpeed };
