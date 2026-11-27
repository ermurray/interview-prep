// 1.16 Frog jumps with Fibonacci steps
// Difficulty: Hard · Suggested time: 60 minutes
//
// A frog wants to cross a river. It starts on one bank, at position -1, and wants to reach the opposite
// bank, at position N. Between the banks there are N positions, 0 to N - 1, described by an array A of N
// integers:
//   - A[K] = 1 means there is a leaf at position K, and the frog may land on it;
//   - A[K] = 0 means there is no leaf, and the frog may not land there.
//
// The frog can only jump distances that are Fibonacci numbers: 1, 2, 3, 5, 8, 13, ... (each number is the
// sum of the two before it). It may jump straight to the far bank whenever the distance is a Fibonacci
// number.
//
// For example, for A = [0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0] (N = 11) the frog can cross in 3 jumps:
//   - from -1 to 4 (distance 5),
//   - from 4 to 6 (distance 2),
//   - from 6 to 11, the far bank (distance 5).
//
// Write a function:
//
//   fibonacciFrog(A)
//
// that, given an array A of N integers, returns the minimum number of jumps the frog needs to reach the
// far bank, or -1 if it cannot get there.
//
// For example:
//   - given A = [0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0], the function should return 3, as explained above;
//   - given A = [], the function should return 1 (one jump of distance 1);
//   - given A = [0, 0, 0], the function should return -1 (the bank is 4 away, and 4 is not a
//     Fibonacci number).
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - each element of array A is either 0 or 1.
//
// Target: O(N log N) time. Pattern: breadth-first search over positions.
//
// example input: [0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0]
// example output: 3

const fibonacciFrog = (array) => {
  // your solution here
};

export { fibonacciFrog };
