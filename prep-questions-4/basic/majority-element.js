// Series 4 · 1.3 Majority element
// Difficulty: Easy · Suggested time: 30 minutes
// (Series 1-3: 1.3 Unpaired element / Missing element / Duplicate value. Concept: finding one special value in O(1) space.)
//
// An array A of N integers is given. A majority element is a value that appears in more than half of
// the elements of A, that is more than N / 2 times. There can be at most one.
//
// For example, for A = [3, 4, 3, 2, 3, -1, 3, 3], N = 8 and the value 3 appears 5 times, which is more
// than 8 / 2 = 4, so 3 is the majority element.
//
// Write a function:
//
//   majorityElement(A)
//
// that, given an array A of N integers, returns the majority element, or -1 if A has none.
//
// For example:
//   - given A = [3, 4, 3, 2, 3, -1, 3, 3], the function should return 3;
//   - given A = [1, 2], the function should return -1 (each appears exactly half the time, not more);
//   - given A = [], the function should return -1.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - each element of array A is an integer within the range [-2,147,483,648..2,147,483,647];
//   - the majority element, if there is one, is never -1.
//
// Target: O(N) time, O(1) extra space. Pattern: Boyer-Moore voting, then a second pass to confirm.
//
// example input: [3, 4, 3, 2, 3, -1, 3, 3]
// example output: 3

const majorityElement = (A) => {
  // your solution here
};

export { majorityElement };
