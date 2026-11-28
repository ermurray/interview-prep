// Series 4 · 2.6 camelizeKeys(value) and snakeizeKeys(value)
// (Series 1-3: 2.6 deepClone / deepMerge / jsonStringify. Concept: recursive walks over values.)
//
// APIs often send snake_case keys while the frontend uses camelCase. Convert the keys of every plain
// object, at any depth, including objects inside arrays. Return new objects and arrays and never change
// the input. Values are left alone, so a string value stays as it is. Dates and other non-plain objects
// are returned unchanged.
//   - camelizeKeys: an underscore followed by a letter or digit is removed and the character after it is
//     upper-cased: 'user_id' -> 'userId', 'created_at_2' -> 'createdAt2'. Leading and trailing
//     underscores are kept: '_private' -> '_private'.
//   - snakeizeKeys: every upper-case letter becomes '_' plus its lower-case form: 'userId' -> 'user_id',
//     'createdAt' -> 'created_at'. Keys that are already snake_case are unchanged.
//
// example input:  camelizeKeys({ user_id: 1, recent_orders: [{ order_id: 7, total_price: 10 }] })
// example output: { userId: 1, recentOrders: [{ orderId: 7, totalPrice: 10 }] }

const camelizeKeys = (value) => {
  // your solution here
};

const snakeizeKeys = (value) => {
  // your solution here
};

export { camelizeKeys, snakeizeKeys };
