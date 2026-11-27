// Series 3 · 2.12 Polyfills: instanceof, Object.create, Array.from and Promise.prototype.finally
// (Series 1: 2.12 bind / reduce / Promise · Series 2: 2.12 call / apply / map / filter / new.
// Concept: how the built-ins work underneath.)
//
//   - myInstanceOf(value, Constructor) does what `value instanceof Constructor` does: walk value's
//     prototype chain looking for Constructor.prototype. Primitives return false. Don't use instanceof
//     or isPrototypeOf.
//   - myObjectCreate(proto) does what Object.create(proto) does: returns a new object whose prototype is
//     proto. proto may be null. Anything else that is not an object throws a TypeError. Don't use
//     Object.create (hint: a throwaway constructor function).
//   - myArrayFrom(source, mapFn) does what Array.from does: works with iterables (Set, Map, strings,
//     generators) and array-likes ({ length: 2, 0: 'a', 1: 'b' }). mapFn(value, index) is optional.
//   - promiseFinally(promise, onFinally) does what promise.finally(onFinally) does: calls onFinally with
//     no arguments when promise settles, then settles the same way as promise. If onFinally throws or
//     returns a rejecting promise, that error wins. If it returns a promise, wait for it first.
//
// example input:  myInstanceOf([], Object)
// example output: true
// example input:  myArrayFrom({ length: 3 }, (_, i) => i * 2)
// example output: [0, 2, 4]

const myInstanceOf = (value, Constructor) => {
  // your solution here
};

const myObjectCreate = (proto) => {
  // your solution here
};

const myArrayFrom = (source, mapFn) => {
  // your solution here
};

const promiseFinally = (promise, onFinally) => {
  // your solution here
};

export { myInstanceOf, myObjectCreate, myArrayFrom, promiseFinally };
