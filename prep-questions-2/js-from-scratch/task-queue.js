// Series 2 · 2.4 createTaskQueue(concurrency)
// (Series 1 counterpart: 2.4 runWithLimit. Concept: concurrency limiting.)
//
// Build a queue that tasks can be added to at any time, which runs at most `concurrency` tasks at once.
//   - queue.add(task): task is a function that returns a promise (or a value). Returns a promise that
//     settles with that task's result. Tasks start in the order they were added.
//   - A task that rejects only rejects its own promise; the queue keeps going.
//   - queue.size: the number of tasks waiting to start (not counting running ones).
//   - queue.onIdle(): returns a promise that resolves once nothing is running or waiting.
//
// example input:
//   const q = createTaskQueue(2);
//   q.add(() => upload(a)); q.add(() => upload(b)); q.add(() => upload(c));
// example output: a and b start straight away; c starts when one of them finishes; q.size is 1 meanwhile

const createTaskQueue = (concurrency) => {
  // your solution here
  // return { add(task) {}, get size() {}, onIdle() {} };
};

export { createTaskQueue };
