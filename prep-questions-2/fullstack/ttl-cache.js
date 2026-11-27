// Series 2 · 5.5 TTL cache with a size limit
// (Series 1 counterpart: 5.5 LRU cache. Concept: caching with eviction.)
//
// Implement a cache whose entries expire, and which also evicts the least recently used entry when full.
//   - new TTLCache({ ttlMs, maxSize = Infinity, now = Date.now }). Use the injected now() for time.
//   - set(key, value, ttl = ttlMs): store a value that expires ttl ms from now. Setting an existing key
//     replaces it and restarts its expiry.
//   - get(key): the value, or undefined if missing or expired. A successful get counts as a "use".
//   - has(key): true only if present and not expired (does not count as a use).
//   - delete(key): remove it; returns true if it was present.
//   - size (getter): the number of entries that have not expired.
//   - When a set would go over maxSize, first drop expired entries, then evict the least recently used.
//   - Discuss: lazy vs active expiry, and what you'd do differently in Redis.
//
// example input:  const c = new TTLCache({ ttlMs: 1000 }); c.set('a', 1); c.get('a'); /* 1s later */ c.get('a');
// example output: 1, then undefined

class TTLCache {
  constructor({ ttlMs, maxSize = Infinity, now = Date.now }) {
    // your solution here
  }

  set(key, value, ttl) {
    // your solution here
  }

  get(key) {
    // your solution here
  }

  has(key) {
    // your solution here
  }

  delete(key) {
    // your solution here
  }

  get size() {
    // your solution here
  }
}

export { TTLCache };
