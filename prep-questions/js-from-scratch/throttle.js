// 2.2 throttle(fn, wait). At most one call per window; the final call in a burst should still fire.
//  Explain how it differs from debounce and when you'd use each.
//  - The first call runs immediately and opens a `wait` ms window.
//  - Calls inside the window are not run straight away, but the LAST one runs (with its args/this) when the
//    window closes, which opens a new window.
//  - Use setTimeout and/or Date.now() for timing (the tests mock both; performance.now() is not mocked).
// example input:  const t = throttle(log, 100); t(1) at 0ms; t(2) at 10ms; t(3) at 20ms
// example output: log(1) at 0ms, log(3) at 100ms

const throttle = (fn, wait) => {
  // your solution here
};

export { throttle };
