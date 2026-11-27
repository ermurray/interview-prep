// Series 2 · 2.8 createStore(reducer, initialState)
// (Series 1 counterpart: 2.8 EventEmitter. Concept: publish/subscribe.)
//
// Build a minimal Redux-style store.
//   - store.getState() returns the current state (initialState at first).
//   - store.dispatch(action) sets state = reducer(state, action), notifies every subscriber, and returns
//     the action.
//   - store.subscribe(listener) registers a listener with no arguments and returns an unsubscribe
//     function. Calling unsubscribe twice is harmless.
//   - Subscribing or unsubscribing during a dispatch must not affect who is notified for that dispatch:
//     use the listener list as it was when the dispatch started.
//
// example input:
//   const store = createStore((s, a) => (a.type === 'inc' ? s + 1 : s), 0);
//   store.subscribe(() => console.log(store.getState()));
//   store.dispatch({ type: 'inc' });
// example output: logs 1

const createStore = (reducer, initialState) => {
  // your solution here
};

export { createStore };
