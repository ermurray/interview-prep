// 1.1 Longest zero run
// Difficulty: Easy · Suggested time: 30 minutes
//
// A zero run inside a positive integer N is any maximal sequence of consecutive zeros in the binary
// representation of N that has a 1 immediately on both sides.
//
// For example:
//   - 9 is 1001 in binary and contains one zero run, of length 2.
//   - 529 is 1000010001 and contains two zero runs, of lengths 4 and 3.
//   - 20 is 10100 and contains one zero run, of length 1. The trailing 00 is not closed by a 1, so it
//     does not count.
//   - 15 is 1111 and contains no zero runs.
//   - 32 is 100000 and contains no zero runs.
//
// Write a function:
//
//   longestZeroRun(N)
//
// that, given a positive integer N, returns the length of its longest zero run. The function should
// return 0 if N contains no zero run.
//
// For example, given N = 1041 the function should return 5, because N is 10000010001 in binary and its
// longest zero run has length 5. Given N = 32 the function should return 0, because N is 100000 in
// binary and has no zero run.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..2,147,483,647].
//
// Target: O(log N) time, O(1) space.
//
// example input: 1041
// example output: 5

const longestZeroRun = (N) => {
  // your solution here
};

export { longestZeroRun };
