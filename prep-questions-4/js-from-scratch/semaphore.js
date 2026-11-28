// Series 4 · 2.4 createSemaphore(max)
// (Series 1-3: 2.4 runWithLimit / task queue / priority scheduler. Concept: concurrency limiting with permits.)
//
// Build a counting semaphore: at most `max` holders at once. With max = 1 it is a mutex (a lock).
//   - semaphore.acquire() returns a promise that resolves, once a permit is free, with a release()
//     function. Calling release() more than once is harmless (only the first call counts).
//   - Waiters get permits in the order they asked (first in, first out).
//   - semaphore.use(fn) acquires a permit, runs fn() (which may be async), releases the permit even if
//     fn throws, and returns fn's result as a promise.
//   - semaphore.available is the number of free permits right now.
//
// example input:
//   const lock = createSemaphore(1);
//   await Promise.all([lock.use(() => writeFile('a')), lock.use(() => writeFile('b'))]);
// example output: the two writes never overlap

const createSemaphore = (max) => {
  // your solution here
  // return { acquire() {}, use(fn) {}, get available() {} };
};

export { createSemaphore };
