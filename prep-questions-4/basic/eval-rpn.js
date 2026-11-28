// Series 4 · 1.5 Evaluate Reverse Polish Notation
// Difficulty: Easy · Suggested time: 30 minutes
// (Series 1-3: 1.5 Balanced brackets / Minimum removals / Remove adjacent duplicates. Concept: stack.)
//
// An arithmetic expression in Reverse Polish Notation writes each operator after its two operands, so
// no brackets are needed. For example, "(2 + 1) * 3" is written as 2 1 + 3 *.
//
// You are given the expression as an array TOKENS of N strings. Each token is an integer or one of the
// operators "+", "-", "*" and "/". Division between two integers truncates toward zero (so 7 / -2 is -3).
//
// For example, for TOKENS = ["4", "13", "5", "/", "+"]:
//   - "13" "5" "/" gives 13 / 5 = 2 (truncated);
//   - "4" and that 2 then "+" gives 6.
//
// Write a function:
//
//   evalRPN(TOKENS)
//
// that, given an array TOKENS describing a valid expression, returns its integer value.
//
// For example:
//   - given TOKENS = ["2", "1", "+", "3", "*"], the function should return 9;
//   - given TOKENS = ["4", "13", "5", "/", "+"], the function should return 6;
//   - given TOKENS = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"], the function
//     should return 22.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [1..10,000];
//   - TOKENS is a valid expression: there is never a division by zero, and every intermediate result is
//     an integer within the range [-2,147,483,648..2,147,483,647];
//   - integer tokens may be negative (like "-11"): don't mistake them for the "-" operator.
//
// Target: O(N) time. Pattern: stack of operands.
//
// example input: ["2", "1", "+", "3", "*"]
// example output: 9

const evalRPN = (TOKENS) => {
  // your solution here
};

export { evalRPN };
