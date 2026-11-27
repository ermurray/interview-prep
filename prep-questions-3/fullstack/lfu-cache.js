// Series 3 · 5.5 LFU cache
// (Series 1: 5.5 LRU cache · Series 2: 5.5 TTL cache. Concept: caching with eviction.)
//
// Implement a least-frequently-used cache. Then discuss when LFU beats LRU (stable hot keys) and when it
// loses (keys that were popular long ago never leave).
//   - new LFUCache(capacity). get(key) returns the value, or -1 if missing. put(key, value) inserts or
//     updates.
//   - Every get of an existing key, and every put (insert or update), counts as one use of that key.
//   - When inserting a new key into a full cache, first evict the key with the fewest uses. If several
//     keys tie, evict the least recently used of them.
//   - A cache with capacity 0 stores nothing.
//   - Target: O(1) for get and put (a map of keys, plus a map from use count to an ordered set of keys).
//
// example input:
//   const c = new LFUCache(2); c.put(1, 1); c.put(2, 2); c.get(1); c.put(3, 3);
// example output: key 2 (used once) is evicted, not key 1 (used twice): c.get(2) -> -1, c.get(1) -> 1

class LFUCache {
  constructor(capacity) {
    // your solution here
  }

  get(key) {
    // your solution here
  }

  put(key, value) {
    // your solution here
  }
}

export { LFUCache };
