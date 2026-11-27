// 2.8 EventEmitter. Implement on, off, once, emit. Removing a listener during emit must not skip others.
// example input:
//   const e = new EventEmitter();
//   e.on('greet', name => console.log('hi', name));
//   e.once('greet', name => console.log('first time', name));
//   e.emit('greet', 'ada'); e.emit('greet', 'bob');
// example output: 'hi ada', 'first time ada', 'hi bob'

class EventEmitter {
  on(name, fn) {
    // your solution here
  }

  off(name, fn) {
    // your solution here
  }

  once(name, fn) {
    // your solution here
  }

  emit(name, ...args) {
    // your solution here
  }
}

export { EventEmitter };
