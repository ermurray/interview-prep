// Series 2 · 1.16 Shortest path through a grid
// Difficulty: Hard · Suggested time: 60 minutes
// (Series 1 counterpart: 1.16 Frog jumps with Fibonacci steps. Concept: breadth-first search.)
//
// A grid of R rows and C columns is given as an array G of R strings, each C characters long:
//   - "." is an open cell;
//   - "#" is a wall.
//
// You start in the top-left cell (row 0, column 0) and want to reach the bottom-right cell
// (row R - 1, column C - 1). Each move goes one cell up, down, left or right, onto an open cell inside
// the grid.
//
// For example, for:
//   G = [".....",
//        "####.",
//        ".....",
//        ".####",
//        "....."]
// the only route snakes through the grid: 4 moves right, 2 down, 4 left, 2 down and 4 right, which is
// 16 moves.
//
// Write a function:
//
//   gridShortestPath(G)
//
// that, given an array G of R strings, returns the minimum number of moves needed to reach the
// bottom-right cell, or -1 if it cannot be reached (including when the start or end cell is a wall).
//
// For example:
//   - given the grid above, the function should return 16;
//   - given G = ["..", ".."], the function should return 2;
//   - given G = [".#", "#."], the function should return -1;
//   - given G = ["."], the function should return 0.
//
// Write an efficient algorithm for the following assumptions:
//   - R and C are integers within the range [1..1,000];
//   - every string in G contains only the characters "." and "#".
//
// Target: O(R * C) time. Pattern: BFS from the start, level by level.
//
// example input: ["..", ".."]
// example output: 2

const gridShortestPath = (G) => {
  // your solution here
};

export { gridShortestPath };
