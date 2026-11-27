// Series 3 · 1.6 Minimal impact queries
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1: 1.6 Minimum split difference · Series 2: 1.6 Count slices with a given sum. Concept: prefix sums.)
//
// A DNA sequence is a string S of N characters, each "A", "C", "G" or "T". Each letter has an impact
// factor: A = 1, C = 2, G = 3, T = 4.
//
// You are also given M queries, as two arrays P and Q of M integers. Query K asks for the minimal impact
// factor of the letters in S from position P[K] to position Q[K], both included.
//
// For example, for S = "CAGCCTA", P = [2, 5, 0] and Q = [4, 5, 6]:
//   - query 0: positions 2..4 hold "GCC", impacts 3, 2, 2, so the answer is 2;
//   - query 1: position 5 holds "T", so the answer is 4;
//   - query 2: positions 0..6 hold the whole string, which includes "A", so the answer is 1.
//
// Write a function:
//
//   minimalImpact(S, P, Q)
//
// that, given a string S and arrays P and Q of M integers, returns an array of M integers with the answer
// to every query.
//
// For example, given S = "CAGCCTA", P = [2, 5, 0] and Q = [4, 5, 6], the function should return [2, 4, 1],
// as explained above.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..100,000];
//   - M is an integer within the range [1..50,000];
//   - each element of P and Q is within the range [0..N - 1], and P[K] <= Q[K];
//   - string S contains only the characters "A", "C", "G" and "T".
//
// Trap: scanning each query's range is O(N * M) and times out.
// Target: O(N + M) time. Pattern: one prefix count per letter.
//
// example input: "CAGCCTA", [2, 5, 0], [4, 5, 6]
// example output: [2, 4, 1]

const minimalImpact = (S, P, Q) => {
  // your solution here
};

export { minimalImpact };
