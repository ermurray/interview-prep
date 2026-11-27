import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { createBus } = await load('js-from-scratch', 'topic-bus');

const received = (bus, pattern) => {
  const got = [];
  bus.subscribe(pattern, (payload, topic) => got.push(topic));
  return got;
};

test('exact topic match passes payload and topic', () => {
  const bus = createBus();
  const calls = [];
  bus.subscribe('user.created', (payload, topic) => calls.push([payload, topic]));
  assert.equal(bus.publish('user.created', { id: 1 }), 1);
  assert.deepEqual(calls, [[{ id: 1 }, 'user.created']]);
});

test('"*" matches exactly one segment', () => {
  const bus = createBus();
  const got = received(bus, 'user.*');
  for (const t of ['user', 'user.created', 'user.deleted', 'user.profile.updated', 'order.created']) bus.publish(t);
  assert.deepEqual(got, ['user.created', 'user.deleted']);
});

test('"#" matches zero or more segments', () => {
  const bus = createBus();
  const got = received(bus, 'user.#');
  for (const t of ['user', 'user.created', 'user.profile.updated', 'order.created']) bus.publish(t);
  assert.deepEqual(got, ['user', 'user.created', 'user.profile.updated']);
});

test('"#" alone matches everything', () => {
  const bus = createBus();
  const got = received(bus, '#');
  bus.publish('a');
  bus.publish('a.b.c');
  assert.deepEqual(got, ['a', 'a.b.c']);
});

test('"*" in the middle', () => {
  const bus = createBus();
  const got = received(bus, 'order.*.shipped');
  for (const t of ['order.7.shipped', 'order.shipped', 'order.7.8.shipped', 'order.7.cancelled']) bus.publish(t);
  assert.deepEqual(got, ['order.7.shipped']);
});

test('"#" in the middle', () => {
  const bus = createBus();
  const got = received(bus, 'a.#.z');
  for (const t of ['a.z', 'a.b.z', 'a.b.c.z', 'a.b', 'b.z']) bus.publish(t);
  assert.deepEqual(got, ['a.z', 'a.b.z', 'a.b.c.z']);
});

test('segments must match whole words', () => {
  const bus = createBus();
  const got = received(bus, 'user.create');
  bus.publish('user.created');
  assert.deepEqual(got, []);
});

test('publish returns the number of handlers called', () => {
  const bus = createBus();
  bus.subscribe('x', () => {});
  bus.subscribe('#', () => {});
  bus.subscribe('y', () => {});
  assert.equal(bus.publish('x'), 2);
  assert.equal(bus.publish('nothing.matches.y.z'), 1);
});

test('handlers run in subscription order', () => {
  const bus = createBus();
  const order = [];
  bus.subscribe('#', () => order.push(1));
  bus.subscribe('t', () => order.push(2));
  bus.subscribe('*', () => order.push(3));
  bus.publish('t');
  assert.deepEqual(order, [1, 2, 3]);
});

test('unsubscribe stops delivery and is safe to call twice', () => {
  const bus = createBus();
  let n = 0;
  const off = bus.subscribe('t', () => n++);
  bus.publish('t');
  off();
  off();
  bus.publish('t');
  assert.equal(n, 1);
});

test('changes during a publish do not affect that publish', () => {
  const bus = createBus();
  const order = [];
  bus.subscribe('t', () => {
    order.push('first');
    offSecond();                                    // removed mid-publish: still gets this one
    bus.subscribe('t', () => order.push('added')); // added mid-publish: waits for the next one
  });
  const offSecond = bus.subscribe('t', () => order.push('second'));
  bus.publish('t');
  assert.deepEqual(order, ['first', 'second']);
  order.length = 0;
  bus.publish('t');
  assert.deepEqual(order, ['first', 'added']);
});
