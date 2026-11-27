// Series 3 · 1.9 Best sightseeing pair
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1: 1.9 Best single trade · Series 2: 1.9 Best trades with a fee. Concept: one pass, keeping the best so far.)
//
// An array A of N positive integers holds the scores of N sights along a road; sight I is at position I.
// Visiting sights I and J, where I < J, scores A[I] + A[J] + I - J: the two scores, minus the distance
// between them.
//
// For example, for A = [8, 1, 5, 2, 6]:
//   - the pair (0, 2) scores 8 + 5 + 0 - 2 = 11;
//   - the pair (0, 4) scores 8 + 6 + 0 - 4 = 10;
//   - the pair (2, 4) scores 5 + 6 + 2 - 4 = 9.
// The best possible score is 11.
//
// Write a function:
//
//   bestSightseeingPair(A)
//
// that, given an array A of N integers, returns the maximum score of a pair of sights.
//
// For example:
//   - given A = [8, 1, 5, 2, 6], the function should return 11, as explained above;
//   - given A = [1, 2], the function should return 2.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [2..100,000];
//   - each element of array A is an integer within the range [1..1,000].
//
// Trap: trying every pair is O(N^2).
// Target: O(N) time, O(1) space. Rewrite the score as (A[I] + I) + (A[J] - J).
//
// example input: [8, 1, 5, 2, 6]
// example output: 11

const bestSightseeingPair = (A) => {
  // your solution here
};

export { bestSightseeingPair };
