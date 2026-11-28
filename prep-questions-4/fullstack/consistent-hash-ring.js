// Series 4 · 5.5 Consistent hashing ring
// (Series 1-3: 5.5 LRU / TTL / LFU cache. Concept: caching, now spreading keys across many cache servers.)
//
// With N cache servers, sending key k to server hash(k) % N reshuffles almost every key whenever a server
// is added or removed. A consistent hashing ring moves only about 1 / N of them. Build one.
//   - new ConsistentHashRing({ hash, replicas = 100 }). hash(string) returns an unsigned 32-bit integer,
//     and is passed in by the caller (the tests use FNV-1a with a final bit-mix).
//   - addNode(name) places `replicas` virtual points on the ring for that server, at
//     hash(`${name}#${i}`) for i = 0 .. replicas - 1. Adding a node that is already there does nothing.
//   - removeNode(name) removes all of its points. Removing an unknown node does nothing.
//   - getNode(key) returns the name of the server owning the first point at or after hash(key) going
//     clockwise, wrapping around past the largest point. It returns undefined when the ring is empty.
//   - nodes is the list of server names, in the order they were added.
//   - Target: getNode in O(log P) with a binary search over the P sorted points.
//
// example input:
//   const ring = new ConsistentHashRing({ hash: fnv1a }); ring.addNode('cache-a'); ring.addNode('cache-b');
//   ring.getNode('user:42')
// example output: 'cache-a' or 'cache-b', always the same one for that key while the nodes don't change

class ConsistentHashRing {
  constructor({ hash, replicas = 100 }) {
    // your solution here
  }

  get nodes() {
    // your solution here
  }

  addNode(name) {
    // your solution here
  }

  removeNode(name) {
    // your solution here
  }

  getNode(key) {
    // your solution here
  }
}

export { ConsistentHashRing };
