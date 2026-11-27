// 1.7 Counters with reset
// Difficulty: Medium · Suggested time: 45 minutes
//
// You are given N counters, all initially set to 0, and you can perform two operations on them:
//   - increase(X): counter X is increased by 1;
//   - max counter: every counter is set to the current maximum value of any counter.
//
// A non-empty array A of M integers describes consecutive operations:
//   - if A[K] = X, where 1 <= X <= N, operation K is increase(X);
//   - if A[K] = N + 1, operation K is max counter.
//
// For example, given N = 5 and A = [3, 4, 4, 6, 1, 4, 4], the counters after each operation are:
//   (0, 0, 1, 0, 0)
//   (0, 0, 1, 1, 0)
//   (0, 0, 1, 2, 0)
//   (2, 2, 2, 2, 2)
//   (3, 2, 2, 2, 2)
//   (3, 2, 2, 3, 2)
//   (3, 2, 2, 4, 2)
//
// Write a function:
//
//   countersWithReset(N, A)
//
// that, given an integer N and an array A of M integers, returns an array of N integers holding the final
// value of every counter.
//
// For example, given N = 5 and A = [3, 4, 4, 6, 1, 4, 4], the function should return [3, 2, 2, 4, 2], as
// explained above.
//
// Write an efficient algorithm for the following assumptions:
//   - N and M are integers within the range [1..100,000] (the tests also try M = 0);
//   - each element of array A is an integer within the range [1..N + 1].
//
// Trap: applying every "max counter" by rewriting all N counters is O(N * M) and times out.
// Target: O(N + M) time.
//
// example input: 5, [3, 4, 4, 6, 1, 4, 4]
// example output: [3, 2, 2, 4, 2]

const countersWithReset = (n, operations) => {
  // your solution here
};

export { countersWithReset };
