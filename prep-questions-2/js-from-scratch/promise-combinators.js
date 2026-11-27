// Series 2 · 2.3 promiseAllSettled(iterable) and promiseAny(iterable)
// (Series 1 counterpart: 2.3 promiseAll. Concept: combining promises by hand.)
//
// Re-implement Promise.allSettled and Promise.any without using either of them (or Promise.all).
//   - promiseAllSettled resolves (it never rejects) with one result per input, in input order:
//     { status: 'fulfilled', value } or { status: 'rejected', reason }.
//   - promiseAny resolves with the first value to fulfil. If every input rejects, it rejects with an
//     AggregateError whose .errors holds the reasons in input order. An empty input rejects straight away.
//   - Both accept any iterable and treat non-promise values as already fulfilled.
//
// example input:  promiseAllSettled([Promise.resolve(1), Promise.reject('x'), 3])
// example output: [{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 'x' }, { status: 'fulfilled', value: 3 }]
// example input:  promiseAny([Promise.reject('a'), delay(10, 'b'), delay(5, 'c')])
// example output: resolves to 'c'

const promiseAllSettled = (iterable) => {
  // your solution here
};

const promiseAny = (iterable) => {
  // your solution here
};

export { promiseAllSettled, promiseAny };
