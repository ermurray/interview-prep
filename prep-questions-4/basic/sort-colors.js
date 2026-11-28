// Series 4 · 1.2 Sort colours
// Difficulty: Easy · Suggested time: 30 minutes
// (Series 1-3: 1.2 Rotate array / Move zeros / Reverse in groups. Concept: rearranging an array in one pass.)
//
// An array A of N integers is given. Every element is 0, 1 or 2 (think red, white and blue). The goal is
// to sort the array so all the 0s come first, then all the 1s, then all the 2s.
//
// For example, for A = [2, 0, 2, 1, 1, 0] there are two of each value, so the result is
// [0, 0, 1, 1, 2, 2].
//
// Write a function:
//
//   sortColors(A)
//
// that, given an array A of N integers, returns the sorted array. You may sort A in place and return it,
// or return a new array. Don't use the built-in sort.
//
// For example:
//   - given A = [2, 0, 2, 1, 1, 0], the function should return [0, 0, 1, 1, 2, 2];
//   - given A = [2, 0, 1], the function should return [0, 1, 2];
//   - given A = [], the function should return [].
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - each element of array A is 0, 1 or 2.
//
// Target: one pass, O(1) extra space. Pattern: Dutch national flag (three pointers). Counting each value
// and rewriting the array is a fine first answer; then do it in one pass.
//
// example input: [2, 0, 2, 1, 1, 0]
// example output: [0, 0, 1, 1, 2, 2]

const sortColors = (A) => {
  // your solution here
};

export { sortColors };
