// 2.12 Polyfills. Function.prototype.bind, Array.prototype.reduce, and a minimal Promise with then chaining.
//  - myBind is written as if installed on Function.prototype (`this` is the function):
//      Function.prototype.myBind = myBind
//  - myReduce is written as if installed on Array.prototype (`this` is the array). Match the native behaviour:
//    no initial value uses the first element; empty array without an initial value throws a TypeError.
//  - MyPromise: new MyPromise((resolve, reject) => ...), .then(onFulfilled, onRejected) returns a new
//    MyPromise, .catch(onRejected). Handlers run asynchronously; returning a promise/thenable from a
//    handler adopts its state; a thrown error rejects the next promise.
// example input:  function greet(g) { return g + ' ' + this.name; } myBind.call(greet, { name: 'ada' }, 'hi')()
// example output: 'hi ada'
// example input:  myReduce.call([1, 2, 3], (acc, x) => acc + x, 0)
// example output: 6
// example input:  new MyPromise(r => r(1)).then(x => x + 1).then(x => console.log(x))
// example output: logs 2

function myBind(thisArg, ...boundArgs) {
  // your solution here
}

function myReduce(callback, initialValue) {
  // your solution here
}

class MyPromise {
  constructor(executor) {
    // your solution here
  }

  then(onFulfilled, onRejected) {
    // your solution here
  }

  catch(onRejected) {
    // your solution here
  }
}

export { myBind, myReduce, MyPromise };
