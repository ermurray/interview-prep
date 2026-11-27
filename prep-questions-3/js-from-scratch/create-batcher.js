// Series 3 · 2.1 createBatcher(batchFn, { wait, maxBatchSize })
// (Series 1: 2.1 debounce · Series 2: 2.1 debouncePromise. Concept: timers + collecting calls. This is how
// DataLoader-style request batching works.)
//
// Return an object with a load(key) method that collects keys and fetches them in batches.
//   - The first load() of a batch starts a timer of `wait` ms (default 0). Every load() before it fires
//     joins the same batch.
//   - When the timer fires, batchFn(keys) is called ONCE with the batch's unique keys, in the order
//     they were first requested. It returns (or resolves to) an array of results in the same order.
//   - Every load(key) promise resolves with its key's result. Loading the same key twice in one batch
//     gives both callers the same result.
//   - If the batch reaches maxBatchSize unique keys (default Infinity), it is sent at once, without
//     waiting for the timer; later loads start a new batch.
//   - If batchFn throws or rejects, or returns an array of the wrong length, every load in that batch
//     rejects.
// Use setTimeout for timing (the tests mock it).
//
// example input:
//   const users = createBatcher((ids) => api.getUsers(ids));
//   users.load(1); users.load(2); users.load(1);
// example output: api.getUsers is called once, with [1, 2]

const createBatcher = (batchFn, { wait = 0, maxBatchSize = Infinity } = {}) => {
  // your solution here
  // return { load(key) {} };
};

export { createBatcher };
