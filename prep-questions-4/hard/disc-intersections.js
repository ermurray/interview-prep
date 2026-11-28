// Series 4 · 1.14 Disc intersections
// Difficulty: Hard · Suggested time: 60 minutes
// (Series 1-3: 1.14 Meeting rooms / Merge intervals / Fewest removals. Concept: sort, then sweep.)
//
// N discs are drawn on a plane. Disc J has its centre at (J, 0) and radius A[J]. Two discs intersect if
// they have at least one point in common (touching counts).
//
// For example, for A = [1, 5, 2, 1, 4, 0], disc 0 covers x from -1 to 1, disc 1 from -4 to 6, disc 2
// from 0 to 4, disc 3 from 2 to 4, disc 4 from 0 to 8 and disc 5 is the single point 5. There are 11
// intersecting pairs:
//   - disc 1 meets every other disc (5 pairs);
//   - disc 4 meets discs 0, 2, 3 and 5 (4 more);
//   - disc 2 meets discs 0 and 3 (2 more).
//
// Write a function:
//
//   discIntersections(A)
//
// that, given an array A of N integers, returns the number of unordered pairs of intersecting discs. The
// function should return -1 if the number exceeds 10,000,000.
//
// For example, given A = [1, 5, 2, 1, 4, 0], the function should return 11, as explained above.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - each element of array A is an integer within the range [0..2,147,483,647].
//
// Trap: J + A[J] can be larger than 2^31 - 1. That's fine in JavaScript, but would overflow a 32-bit int.
// Target: O(N log N) time. Pattern: sort the disc starts and ends, then sweep, counting how many discs
// are open when each new one starts.
//
// example input: [1, 5, 2, 1, 4, 0]
// example output: 11

const discIntersections = (A) => {
  // your solution here
};

export { discIntersections };
