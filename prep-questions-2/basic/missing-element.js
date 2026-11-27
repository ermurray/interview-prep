// Series 2 · 1.3 Missing element
// Difficulty: Easy · Suggested time: 30 minutes
// (Series 1 counterpart: 1.3 The unpaired element. Concept: finding one odd value out in O(1) space.)
//
// An array A of N distinct integers is given. The integers are taken from the range [1..(N + 1)], which
// means exactly one value from that range is missing.
//
// For example, for A = [2, 3, 1, 5], N = 4 and the range is [1..5]. The values 1, 2, 3 and 5 are present,
// so 4 is missing.
//
// Write a function:
//
//   missingElement(A)
//
// that, given an array A, returns the value of the missing element.
//
// For example:
//   - given A = [2, 3, 1, 5], the function should return 4;
//   - given A = [1], the function should return 2;
//   - given A = [], the function should return 1.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - the elements of A are all distinct;
//   - each element of array A is an integer within the range [1..(N + 1)].
//
// Target: O(N) time, O(1) extra space. (Think about what could overflow in a language with 32-bit ints.)
//
// example input: [2, 3, 1, 5]
// example output: 4

const missingElement = (A) => {
  // your solution here
};

export { missingElement };
