// 2.3 promiseAll(iterable). Re-implement Promise.all: preserve order, reject on first failure, handle
//  non-promise values and an empty input. Follow-ups: allSettled, any, race.
// example input:  promiseAll([Promise.resolve(1), 2, new Promise(r => setTimeout(() => r(3), 10))])
// example output: resolves to [1, 2, 3]
// example input:  promiseAll([])
// example output: resolves to []

const promiseAll = (iterable) => {
  // your solution here
};

export { promiseAll };
