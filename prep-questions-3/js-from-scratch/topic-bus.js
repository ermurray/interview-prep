// Series 3 · 2.8 createBus() with wildcard topics
// (Series 1: 2.8 EventEmitter · Series 2: 2.8 createStore. Concept: publish/subscribe.)
//
// Build a pub/sub bus whose topics are dot-separated, like 'user.created' or 'order.item.removed'.
//   - bus.subscribe(pattern, handler) returns an unsubscribe function (safe to call twice).
//   - bus.publish(topic, payload) calls handler(payload, topic) for every subscription whose pattern
//     matches, in subscription order, and returns how many handlers were called.
//   - In a pattern, '*' matches exactly one segment, and '#' matches zero or more segments. Any other
//     segment must match exactly.
//       'user.*'   matches 'user.created',  not 'user' or 'user.profile.updated'
//       'user.#'   matches 'user', 'user.created' and 'user.profile.updated'
//       '#'        matches every topic
//   - Subscribing or unsubscribing during a publish does not change who receives that publish.
//
// example input:
//   bus.subscribe('order.*', log); bus.publish('order.shipped', { id: 7 });
// example output: log({ id: 7 }, 'order.shipped') is called; publish returns 1

const createBus = () => {
  // your solution here
  // return { subscribe(pattern, handler) {}, publish(topic, payload) {} };
};

export { createBus };
