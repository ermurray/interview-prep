// Series 2 · 1.7 Range increments
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1 counterpart: 1.7 Counters with reset. Concept: deferring work instead of touching every element.)
//
// You are given N counters, numbered 0 to N - 1, all initially set to 0, and an array OPS of M
// operations. Each operation is a triple [L, R, V] meaning: add V to every counter from L to R
// inclusive.
//
// For example, given N = 5 and OPS = [[1, 3, 2], [2, 4, 3], [0, 2, -2]], the counters after each
// operation are:
//   [0, 2, 2, 2, 0]
//   [0, 2, 5, 5, 3]
//   [-2, 0, 3, 5, 3]
//
// Write a function:
//
//   rangeIncrements(N, OPS)
//
// that, given an integer N and an array OPS of M operations, returns an array of N integers holding the
// final value of every counter.
//
// For example, given N = 5 and OPS = [[1, 3, 2], [2, 4, 3], [0, 2, -2]], the function should return
// [-2, 0, 3, 5, 3], as explained above.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..100,000];
//   - M is an integer within the range [0..100,000];
//   - for every operation, 0 <= L <= R < N and V is an integer within the range [-1,000..1,000].
//
// Trap: applying each operation counter by counter is O(N * M) and times out.
// Target: O(N + M) time. Pattern: difference array.
//
// example input: 5, [[1, 3, 2], [2, 4, 3], [0, 2, -2]]
// example output: [-2, 0, 3, 5, 3]

const rangeIncrements = (N, OPS) => {
  // your solution here
};

export { rangeIncrements };
