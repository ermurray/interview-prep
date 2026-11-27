// 2.1 debounce(fn, wait, { leading }). Support trailing (default) and leading calls, preserve `this` and
//  arguments, and add a .cancel() method.
//  - trailing (default): fn runs once, `wait` ms after the LAST call of a burst, with the last call's args/this.
//  - leading: true: fn runs immediately on the FIRST call of a burst; further calls within `wait` are ignored
//    (and keep extending the quiet period). After `wait` ms of quiet, the next call fires immediately again.
//  - .cancel() drops any pending call. In leading mode it also ends the burst, so the next call fires
//    immediately.
// example input:  const d = debounce(log, 100); d('a'); d('b'); d('c');   // then 100ms of quiet
// example output: log is called once, with 'c'

const debounce = (fn, wait, { leading = false } = {}) => {
  // your solution here
};

export { debounce };
