import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { camelizeKeys, snakeizeKeys } = await load('js-from-scratch', 'case-keys');

test('camelize: example from the question', () =>
  assert.deepEqual(
    camelizeKeys({ user_id: 1, recent_orders: [{ order_id: 7, total_price: 10 }] }),
    {
      userId: 1,
      recentOrders: [{ orderId: 7, totalPrice: 10 }],
    },
  ));
test('camelize: digits after underscores', () =>
  assert.deepEqual(camelizeKeys({ created_at_2: 1 }), { createdAt2: 1 }));
test('camelize: leading and trailing underscores are kept', () =>
  assert.deepEqual(camelizeKeys({ _private: 1, trailing_: 2 }), { _private: 1, trailing_: 2 }));
test('camelize: values are left alone', () =>
  assert.deepEqual(camelizeKeys({ a_b: 'snake_case_value' }), { aB: 'snake_case_value' }));
test('camelize: deeply nested', () =>
  assert.deepEqual(camelizeKeys({ a_b: { c_d: { e_f: 1 } } }), { aB: { cD: { eF: 1 } } }));
test('camelize: arrays of arrays', () =>
  assert.deepEqual(camelizeKeys([[{ x_y: 1 }]]), [[{ xY: 1 }]]));
test('camelize: Dates and primitives are returned as they are', () => {
  const d = new Date(0);
  assert.equal(camelizeKeys({ when_at: d }).whenAt, d);
  assert.equal(camelizeKeys(5), 5);
  assert.equal(camelizeKeys(null), null);
});
test('camelize: does not mutate the input', () => {
  const src = { a_b: { c_d: 1 } };
  camelizeKeys(src);
  assert.deepEqual(src, { a_b: { c_d: 1 } });
});

test('snakeize: camelCase to snake_case', () =>
  assert.deepEqual(snakeizeKeys({ userId: 1, recentOrders: [{ orderId: 7 }] }), {
    user_id: 1,
    recent_orders: [{ order_id: 7 }],
  }));
test('snakeize: already snake_case is unchanged', () =>
  assert.deepEqual(snakeizeKeys({ user_id: 1 }), { user_id: 1 }));
test('snakeize: round trip', () => {
  const api = { first_name: 'ada', home_address: { post_code: 'N1' } };
  assert.deepEqual(snakeizeKeys(camelizeKeys(api)), api);
});
test('snakeize: values are left alone', () =>
  assert.deepEqual(snakeizeKeys({ myKey: 'camelValue' }), { my_key: 'camelValue' }));
