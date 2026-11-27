// Series 3 · 2.4 createScheduler(concurrency)
// (Series 1: 2.4 runWithLimit · Series 2: 2.4 createTaskQueue. Concept: concurrency limiting, now with priorities.)
//
// Build a scheduler that runs at most `concurrency` tasks at once, starting the most important waiting
// task whenever a slot frees up.
//   - scheduler.add(task, { priority = 0 } = {}): task is a function returning a promise or a value.
//     Returns a promise that settles with that task's result.
//   - When a slot is free, the waiting task with the HIGHEST priority starts next. Tasks with equal
//     priority start in the order they were added.
//   - A task that is already running is never interrupted.
//   - A failing task only rejects its own promise.
//   - scheduler.size: the number of tasks waiting to start.
//
// example input:
//   const s = createScheduler(1);
//   s.add(slowTask); s.add(low, { priority: 1 }); s.add(high, { priority: 5 });
// example output: slowTask runs first (it was free to start), then high, then low

const createScheduler = (concurrency) => {
  // your solution here
  // return { add(task, { priority = 0 } = {}) {}, get size() {} };
};

export { createScheduler };
