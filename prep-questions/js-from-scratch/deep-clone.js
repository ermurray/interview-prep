// 2.6 deepClone(value). Handle objects, arrays, Dates, Maps, Sets and circular references.
//  Discuss structuredClone and what it can't clone.
// example input:  const a = { d: new Date(0), m: new Map([[1, { x: 1 }]]) }; a.self = a;
// example output: a new object b where b.self === b, b.d is a new Date(0), b.m.get(1) is a copy of { x: 1 }

const deepClone = (value) => {
  // your solution here
};

export { deepClone };
