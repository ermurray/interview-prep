// 1.8 Passing cars
// Difficulty: Medium · Suggested time: 45 minutes
//
// A non-empty array A of N integers represents consecutive cars on a road. Each element is 0 or 1:
//   - 0 is a car travelling east,
//   - 1 is a car travelling west.
//
// The goal is to count passing cars. A pair of cars (P, Q), where 0 <= P < Q < N, is passing when P is
// travelling east and Q is travelling west.
//
// For example, for A = [0, 1, 0, 1, 1] there are five pairs of passing cars: (0, 1), (0, 3), (0, 4),
// (2, 3) and (2, 4).
//
// Write a function:
//
//   passingCars(A)
//
// that, given a non-empty array A of N integers, returns the number of pairs of passing cars. The
// function should return -1 if the number of pairs exceeds 1,000,000,000.
//
// For example, given A = [0, 1, 0, 1, 1] the function should return 5, as explained above.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..100,000];
//   - each element of array A is either 0 or 1.
//
// Target: O(N) time, O(1) space.
//
// example input: [0, 1, 0, 1, 1]
// example output: 5

const passingCars = (array) => {
  // your solution here
};

export { passingCars };
