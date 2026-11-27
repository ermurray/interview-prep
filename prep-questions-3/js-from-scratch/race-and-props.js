// Series 3 · 2.3 promiseRace(iterable) and promiseProps(object)
// (Series 1: 2.3 promiseAll · Series 2: 2.3 promiseAllSettled / promiseAny. Concept: combining promises by hand.)
//
// Don't use Promise.race, Promise.all, Promise.allSettled or Promise.any.
//   - promiseRace settles the same way as the first input to settle, whether it fulfils or rejects.
//     Non-promise values count as already fulfilled. An empty input never settles (like Promise.race).
//   - promiseProps takes an object whose values may be promises, and resolves to a new object with the
//     same keys and the resolved values. It rejects as soon as any value rejects. {} resolves to {}.
//
// example input:  promiseProps({ user: fetchUser(), posts: fetchPosts(), page: 1 })
// example output: { user: <user>, posts: <posts>, page: 1 }

const promiseRace = (iterable) => {
  // your solution here
};

const promiseProps = (object) => {
  // your solution here
};

export { promiseRace, promiseProps };
