// Series 3 · 1.3 The duplicate value
// Difficulty: Easy · Suggested time: 30 minutes
// (Series 1: 1.3 Unpaired element · Series 2: 1.3 Missing element. Concept: finding the odd one out in O(1) space.)
//
// An array A of N + 1 integers is given. Every integer from 1 to N appears in A, and exactly one of them
// appears twice. The goal is to find that one.
//
// For example, for A = [3, 1, 3, 4, 2], N = 4: the values 1, 2, 3 and 4 all appear, and 3 appears twice.
//
// Write a function:
//
//   duplicateValue(A)
//
// that, given an array A fulfilling the above conditions, returns the value that appears twice.
//
// For example:
//   - given A = [3, 1, 3, 4, 2], the function should return 3;
//   - given A = [1, 3, 4, 2, 2], the function should return 2;
//   - given A = [1, 1], the function should return 1.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..100,000];
//   - A holds every integer from 1 to N exactly once, plus one extra copy of one of them;
//   - the elements are in no particular order.
//
// Target: O(N) time, O(1) extra space. (Follow-up to discuss: what if the duplicate could appear more
// than twice and some values were missing? Look up Floyd's cycle detection.)
//
// example input: [3, 1, 3, 4, 2]
// example output: 3

const duplicateValue = (A) => {
  // your solution here
};

export { duplicateValue };
