// 1.3 The unpaired element
// Difficulty: Easy · Suggested time: 30 minutes
//
// A non-empty array A of N integers is given. N is odd, and every element of the array can be paired
// with another element of the same value, except for exactly one element, which is left unpaired.
//
// For example, in the array A = [9, 3, 9, 3, 9, 7, 9]:
//   - the elements at indexes 0 and 2 have value 9 and form a pair,
//   - the elements at indexes 1 and 3 have value 3 and form a pair,
//   - the elements at indexes 4 and 6 have value 9 and form a pair,
//   - the element at index 5 has value 7 and is unpaired.
//
// Write a function:
//
//   unpairedElement(A)
//
// that, given an array A fulfilling the above conditions, returns the value of the unpaired element.
//
// For example, given A = [9, 3, 9, 3, 9, 7, 9] the function should return 7, as explained above.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an odd integer within the range [1..1,000,000];
//   - each element of array A is an integer within the range [1..1,000,000,000];
//   - all but one of the values in A occur an even number of times.
//
// Target: O(N) time, O(1) extra space.
//
// example input: [9, 3, 9, 3, 9, 7, 9]
// example output: 7

const unpairedElement = (array) => {
  // your solution here
};

export { unpairedElement };
