// Series 2 · 2.12 Polyfills: call, apply, map, filter and new
// (Series 1 counterpart: 2.12 Polyfills. Concept: how the built-ins work underneath.)
//
//   - myCall and myApply are written as if installed on Function.prototype (`this` is the function):
//       greet.myCall(ctx, 'hi', '!')   greet.myApply(ctx, ['hi', '!'])
//     Don't use the native call, apply or bind. (Hint: temporarily attach the function to the context
//     object under a Symbol key.)
//   - myMap and myFilter are written as if installed on Array.prototype (`this` is the array). The
//     callback receives (value, index, array) and is called with the optional thisArg.
//   - myNew(Constructor, ...args) does what the new keyword does: creates an object whose prototype is
//     Constructor.prototype, calls Constructor with it as `this`, and returns it, unless the constructor
//     returns an object, in which case that object is returned.
//
// example input:  function greet(g, p) { return g + ' ' + this.name + p; } myCall.call(greet, { name: 'ada' }, 'hi', '!')
// example output: 'hi ada!'
// example input:  myFilter.call([1, 2, 3, 4], (x) => x % 2 === 0)
// example output: [2, 4]

function myCall(context, ...args) {
  // your solution here
}

function myApply(context, args) {
  // your solution here
}

function myMap(callback, thisArg) {
  // your solution here
}

function myFilter(callback, thisArg) {
  // your solution here
}

function myNew(Constructor, ...args) {
  // your solution here
}

export { myCall, myApply, myMap, myFilter, myNew };
