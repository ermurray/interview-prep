// 2.7 deepEqual(a, b). Compare nested structures; decide and explain how you treat NaN, -0, and key order.
//  Decisions the tests expect: NaN equals NaN; 0 equals -0; object key order does not matter;
//  an array never equals a plain object; Dates compare by time.
// example input:  deepEqual({ a: [1, { b: NaN }], c: 2 }, { c: 2, a: [1, { b: NaN }] })
// example output: true

const deepEqual = (a, b) => {
  // your solution here
};

export { deepEqual };
