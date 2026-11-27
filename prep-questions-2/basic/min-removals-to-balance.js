// Series 2 · 1.5 Minimum removals to balance
// Difficulty: Easy · Suggested time: 30 minutes
// (Series 1 counterpart: 1.5 Balanced brackets. Concept: tracking open brackets with a stack or counter.)
//
// A string S of N characters, each "(" or ")", is given. S is properly nested if it is empty, has the
// form "(U)" where U is properly nested, or has the form "VW" where V and W are properly nested.
//
// You may delete any characters from S. The goal is to make S properly nested with as few deletions as
// possible.
//
// For example, for S = "()))((":
//   - the first ")" pairs with the opening "(";
//   - the next two ")" have nothing to close, so they must be deleted;
//   - the final "((" are never closed, so they must be deleted too;
//   - that is 4 deletions, leaving "()".
//
// Write a function:
//
//   minRemovalsToBalance(S)
//
// that, given a string S, returns the minimum number of characters that must be deleted to make S
// properly nested.
//
// For example:
//   - given S = "()))((", the function should return 4, as explained above;
//   - given S = "())", the function should return 1;
//   - given S = "(()())", the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..200,000];
//   - string S contains only the characters "(" and ")".
//
// Target: O(N) time, O(1) space.
//
// example input: "()))(("
// example output: 4

const minRemovalsToBalance = (S) => {
  // your solution here
};

export { minRemovalsToBalance };
