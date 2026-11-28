// Series 4 · 2.10 parseQuery(queryString) and stringifyQuery(params)
// (Series 1-3: 2.10 flatten / getPath / setPath. Concept: nested paths, here as URL parameters.)
//
// Don't use URLSearchParams.
//   - parseQuery turns a query string into an object. A leading '?' is ignored. Pairs are separated by
//     '&'. Keys and values are URI-decoded, and '+' means a space. A key with no '=' gets ''. A repeated
//     key collects its values into an array, in order. 'key[]=x' always makes an array, and 'key[sub]=x'
//     makes a nested object.
//       'a=1&b=2&b=3&c[d]=4&e[]=5&flag' -> { a: '1', b: ['2', '3'], c: { d: '4' }, e: ['5'], flag: '' }
//   - stringifyQuery turns a flat object back into a query string, keys in their original order. Values
//     are URI-encoded (spaces as %20). An array becomes one repeated key per element. undefined values are
//     skipped, and null becomes 'key='. Numbers and booleans become strings.
//       { q: 'a b', page: 2, tags: ['x', 'y'], empty: null } -> 'q=a%20b&page=2&tags=x&tags=y&empty='
//
// example input:  parseQuery('?search=red+shoes&size=9&size=10')
// example output: { search: 'red shoes', size: ['9', '10'] }

const parseQuery = (queryString) => {
  // your solution here
};

const stringifyQuery = (params) => {
  // your solution here
};

export { parseQuery, stringifyQuery };
