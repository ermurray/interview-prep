// Series 4 · 2.1 createAutosave(save, { delay, maxWait })
// (Series 1-3: 2.1 debounce / debouncePromise / createBatcher. Concept: debouncing with a deadline.)
//
// Build the autosave behind a document editor: save shortly after the user stops typing, but never wait
// too long while they keep typing.
//   - autosave.change(data) records the latest unsaved data and restarts a `delay` ms timer.
//   - When that timer fires, save(data) is called ONCE with the latest data.
//   - If maxWait is set (default Infinity), a save also happens no later than maxWait ms after the
//     first unsaved change, even if changes keep coming.
//   - autosave.flush() saves the pending data straight away (cancelling the timers) and returns save's
//     result as a promise. With nothing pending, it calls nothing and resolves with undefined.
//   - autosave.pending is true while there are unsaved changes.
//   - save may be async. A change made after a save started begins a new cycle.
// Use setTimeout for timing (the tests mock it).
//
// example input:
//   const autosave = createAutosave(saveDoc, { delay: 1000, maxWait: 5000 });
//   // the user types every 200ms for 8 seconds
// example output: saveDoc runs at about 5s (maxWait), then 1s after typing stops

const createAutosave = (save, { delay = 1000, maxWait = Infinity } = {}) => {
  // your solution here
  // return { change(data) {}, flush() {}, get pending() {} };
};

export { createAutosave };
