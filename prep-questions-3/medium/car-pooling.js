// Series 3 · 1.7 Car pooling
// Difficulty: Medium · Suggested time: 45 minutes
// (Series 1: 1.7 Counters with reset · Series 2: 1.7 Range increments. Concept: recording changes instead of touching every element.)
//
// A car with CAPACITY empty seats drives east along a road. Locations are measured as distances from the
// start. You are given an array TRIPS of N trips; trip [passengers, from, to] means that number of
// passengers get in at location `from` and get out at location `to`. Passengers getting out at a
// location leave before new passengers get in there.
//
// For example, for TRIPS = [[2, 1, 5], [3, 3, 7]]:
//   - between locations 3 and 5 both groups are in the car: 2 + 3 = 5 passengers;
//   - so the trips can be completed with CAPACITY = 5, but not with CAPACITY = 4.
//
// Write a function:
//
//   carPooling(TRIPS, CAPACITY)
//
// that, given an array TRIPS of N trips and an integer CAPACITY, returns 1 if every trip can be completed
// without going over capacity at any point, and 0 otherwise.
//
// For example:
//   - given TRIPS = [[2, 1, 5], [3, 3, 7]] and CAPACITY = 4, the function should return 0;
//   - given the same TRIPS and CAPACITY = 5, the function should return 1;
//   - given TRIPS = [[2, 1, 5], [3, 5, 7]] and CAPACITY = 3, the function should return 1, because the
//     first group gets out at location 5 before the second group gets in.
//
// Write an efficient algorithm for the following assumptions:
//   - N is an integer within the range [0..100,000];
//   - for every trip, passengers is within [1..1,000] and 0 <= from < to <= 1,000,000;
//   - CAPACITY is an integer within the range [1..1,000,000,000].
//
// Trap: adding each trip's passengers to every location it covers is O(N * distance).
// Target: O(N + L) time with a difference array over L locations, or O(N log N) by sorting events.
//
// example input: [[2, 1, 5], [3, 3, 7]], 4
// example output: 0

const carPooling = (TRIPS, CAPACITY) => {
  // your solution here
};

export { carPooling };
