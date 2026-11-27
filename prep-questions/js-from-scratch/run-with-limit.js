// 2.4 Concurrency-limited runner. runWithLimit(tasks, limit) takes an array of functions that return promises
//  and runs at most `limit` at once, resolving with results in original order. Rejects if any task rejects.
// example input:  runWithLimit([() => fetchA(), () => fetchB(), () => fetchC()], 2)
// example output: resolves to [a, b, c]; fetchC only starts once fetchA or fetchB has settled

const runWithLimit = (tasks, limit) => {
  // your solution here
};

export { runWithLimit };
