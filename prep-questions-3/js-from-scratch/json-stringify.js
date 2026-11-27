// Series 3 · 2.6 jsonStringify(value)
// (Series 1: 2.6 deepClone · Series 2: 2.6 deepMerge. Concept: recursive walks over values.)
//
// Re-implement JSON.stringify(value) without indentation and without calling JSON.stringify. The output
// must match JSON.stringify exactly:
//   - null, true and false print as is. Finite numbers print as numbers; NaN and Infinity print as null.
//   - Strings are wrapped in double quotes. Escape " and \ and the control characters: \b \f \n \r \t,
//     and any other character below U+0020 as \u00XX (lowercase hex).
//   - Arrays print every element. undefined, functions and symbols inside arrays print as null.
//   - Objects print their own enumerable string keys in order. Keys whose value is undefined, a function
//     or a symbol are skipped.
//   - If a value has a toJSON() method (Dates do), use what it returns.
//   - At the top level, undefined, a function or a symbol returns undefined (not a string).
//   - A circular reference throws a TypeError. A BigInt throws a TypeError.
//
// example input:  jsonStringify({ a: [1, 'two', null, undefined], b: { c: true }, d: undefined })
// example output: '{"a":[1,"two",null,null],"b":{"c":true}}'

const jsonStringify = (value) => {
  // your solution here
};

export { jsonStringify };
