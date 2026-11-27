// 1.5 Balanced brackets
// Difficulty: Easy · Suggested time: 30 minutes
//
// A string S of N characters is called properly nested if any of the following holds:
//   - S is empty;
//   - S has the form "(U)", "[U]" or "{U}", where U is a properly nested string;
//   - S has the form "VW", where V and W are properly nested strings.
//
// For example, "{[()()]}" is properly nested, but "([)()]" is not, because the "[" is closed by ")".
//
// Write a function:
//
//   balancedBrackets(S)
//
// that, given a string S, returns 1 if S is properly nested and 0 otherwise.
//
// For example, given S = "{[()()]}" the function should return 1, and given S = "([)()]" the function
// should return 0, as explained above.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..200,000];
//   - string S contains only the characters "(", ")", "[", "]", "{" and "}".
//
// Target: O(N) time.
//
// example input: "{[()()]}"
// example output: 1
// example input: "([)()]"
// example output: 0

const balancedBrackets = (str) => {
  // your solution here
};

export { balancedBrackets };
