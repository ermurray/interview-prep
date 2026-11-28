// Series 4 · 1.7 Lazy array
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1-3: 1.7 Counters with reset / Range increments / Car pooling. Concept: deferring work instead of touching every element.)
//
// An array of N integers, all initially 0, supports four operations, given as an array OPS of M
// operations:
//   - ["set", I, V]: set element I to V;
//   - ["setAll", V]: set every element to V;
//   - ["addAll", X]: add X to every element;
//   - ["get", I]: read element I.
//
// For example, for N = 3 and
//   OPS = [["set", 0, 5], ["addAll", 2], ["get", 0], ["setAll", 1], ["get", 2],
//          ["set", 1, 4], ["addAll", 3], ["get", 1], ["get", 0]]
// the array goes [5, 0, 0] -> [7, 2, 2] (get 0 reads 7) -> [1, 1, 1] (get 2 reads 1) -> [1, 4, 1]
// -> [4, 7, 4] (get 1 reads 7, get 0 reads 4), so the results are [7, 1, 7, 4].
//
// Write a function:
//
//   lazyArray(N, OPS)
//
// that, given an integer N and an array OPS of M operations, returns an array with the result of every
// "get" operation, in order.
//
// For example, given N = 3 and the OPS above, the function should return [7, 1, 7, 4].
//
// Write an efficient algorithm for the following assumptions:
//   - N and M are integers within the range [1..100,000];
//   - every index I is within [0..N - 1];
//   - every V and X is an integer within the range [-1,000,000..1,000,000];
//   - every value stays within the safe integer range.
//
// Trap: applying setAll or addAll to all N elements makes it O(N * M).
// Target: O(1) per operation, O(N + M) in total. Hint: remember when each element was last set, and
// when the last setAll happened.
//
// example input: 3, [["set", 0, 5], ["addAll", 2], ["get", 0], ["setAll", 1], ["get", 2], ["set", 1, 4], ["addAll", 3], ["get", 1], ["get", 0]]
// example output: [7, 1, 7, 4]

const lazyArray = (N, OPS) => {
  // your solution here
};

export { lazyArray };
