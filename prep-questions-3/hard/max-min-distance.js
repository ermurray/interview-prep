// Series 3 · 1.13 Maximise the minimum distance
// Difficulty: Hard · Suggested time: 60 minutes
// (Series 1: 1.13 Minimise the largest block · Series 2: 1.13 Minimum eating speed. Concept: binary search on the answer.)
//
// There are N stalls along a straight barn, at distinct positions given by an array P of N integers (in
// any order). You must place C horses in C different stalls. Horses get stressed when they are close
// together, so the goal is to make the smallest distance between any two horses as large as possible.
//
// For example, for P = [1, 2, 8, 4, 9] and C = 3:
//   - placing horses at 1, 4 and 8 gives distances 3 and 4, so the smallest is 3;
//   - placing horses at 1, 2 and 9 gives distances 1 and 7, so the smallest is 1;
//   - no placement does better than 3.
//
// Write a function:
//
//   maxMinDistance(P, C)
//
// that, given an array P of N integers and an integer C, returns the largest possible minimum distance
// between two horses.
//
// For example:
//   - given P = [1, 2, 8, 4, 9] and C = 3, the function should return 3, as explained above;
//   - given P = [5, 1] and C = 2, the function should return 4;
//   - given P = [0, 1000000000] and C = 2, the function should return 1000000000.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [2..100,000];
//   - C is an integer within the range [2..N];
//   - the elements of P are distinct integers within the range [0..1,000,000,000].
//
// Target: O(N log N + N log D) time, where D is the largest distance. Pattern: sort, then binary search
// on the answer with a greedy check.
//
// example input: [1, 2, 8, 4, 9], 3
// example output: 3

const maxMinDistance = (P, C) => {
  // your solution here
};

export { maxMinDistance };
