// Series 4 · 2.8 createHistory(initial, { limit })
// (Series 1-3: 2.8 EventEmitter / createStore / topic bus. Concept: state with subscribers.)
//
// Build the undo/redo history behind an editor.
//   - history.value is the current value (initial at first).
//   - history.set(value) makes value current, saves the previous value for undo, and clears the redo
//     stack.
//   - history.undo() goes back one step and history.redo() goes forward one step. Each returns true if
//     it moved, or false if there was nothing to undo or redo.
//   - history.canUndo and history.canRedo say whether undo() or redo() would move.
//   - limit (default Infinity) caps how many undo steps are kept; when it's exceeded, the oldest is
//     dropped.
//   - history.subscribe(listener) calls listener(value) after every change of value (set, undo, redo)
//     and returns an unsubscribe function.
//
// example input:  const h = createHistory('a'); h.set('b'); h.set('c'); h.undo(); h.undo(); h.redo();
// example output: h.value is 'b'; h.canUndo and h.canRedo are both true

const createHistory = (initial, { limit = Infinity } = {}) => {
  // your solution here
  // return { get value() {}, set(value) {}, undo() {}, redo() {}, get canUndo() {}, get canRedo() {}, subscribe(listener) {} };
};

export { createHistory };
