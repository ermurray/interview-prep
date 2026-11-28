// Series 4 · 2.3 promiseAllWithProgress(iterable, onProgress) and promiseSequence(tasks)
// (Series 1-3: 2.3 promiseAll / allSettled + any / race + props. Concept: combining promises by hand.)
//
// Don't use Promise.all, allSettled, any or race.
//   - promiseAllWithProgress behaves like Promise.all (results in input order, rejects on the first
//     failure, plain values count as fulfilled, empty input resolves to []) and calls
//     onProgress(done, total) every time one input fulfils, with the number fulfilled so far.
//   - promiseSequence(tasks) takes an array of functions that return promises (or values), runs them ONE
//     AT A TIME in order, and resolves with their results. If one rejects, it rejects with that error and
//     the remaining tasks never start.
//
// example input:  promiseAllWithProgress([upload(a), upload(b)], (done, total) => setBar(done / total))
// example output: setBar(0.5), then setBar(1), then resolves with both results

const promiseAllWithProgress = (iterable, onProgress) => {
  // your solution here
};

const promiseSequence = (tasks) => {
  // your solution here
};

export { promiseAllWithProgress, promiseSequence };
