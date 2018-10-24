import log from '@helpers/log';
import LinkedList from './classes/LinkedList';
import DoublyLinkedList from './classes/DoublyLinkedList';
import ClasslessLinkedList from './classless/ClasslessLinkedList';

log('Comparing runtimes');
const size = 1e6;

function timeFn(label: string, msg: string, fn: () => void) {
  console.time(label);
  console.timeLog(label, msg);
  fn();
  console.timeEnd(label);
}

timeFn('LL', 'Creating LL w/prepend', () => {
  const ll = new LinkedList();
  for (let i = 0; i < size; i += 1) {
    ll.prepend(i);
  }
});

timeFn('LL', 'Creating LL w/append', () => {
  const ll = new LinkedList();
  for (let i = 0; i < size; i += 1) {
    ll.append(i);
  }
});

timeFn('CLL', 'Creating CLL w/append', () => {
  const ll = ClasslessLinkedList.create();
  for (let i = 0; i < size; i += 1) {
    ll.append(i);
  }
});

timeFn('DLL', 'Creating DLL w/prepend', () => {
  const dll = new DoublyLinkedList();
  for (let i = 0; i < size; i += 1) {
    dll.prepend(i);
  }
});

timeFn('DLL', 'Creating DLL w/append', () => {
  const ll = new DoublyLinkedList();
  for (let i = 0; i < size; i += 1) {
    ll.append(i);
  }
});

const ll = new LinkedList();
for (let i = 0; i < size; i += 1) {
  ll.prepend(i);
}
const cll = ClasslessLinkedList.create();
for (let i = 0; i < size; i += 1) {
  cll.prepend(i);
}
const dll = new DoublyLinkedList();
for (let i = 0; i < size; i += 1) {
  dll.prepend(i);
}
const midPoint = Math.floor(size / 2);
timeFn('LL', 'Traversing LL', () => {
  for (let i = 0; i < 1e3; i += 1) {
    ll.get(midPoint);
  }
});
timeFn('CLL', 'Traversing CLL', () => {
  for (let i = 0; i < 1e3; i += 1) {
    cll.get(midPoint);
  }
});
timeFn('DLL', 'Traversing DLL', () => {
  for (let i = 0; i < 1e3; i += 1) {
    dll.get(midPoint);
  }
});
timeFn('LL', 'Reverse Traversing LL', () => {
  for (let i = 0; i < 1e3; i += 1) {
    ll.getNthFromLast(midPoint);
  }
});
timeFn('CLL', 'Reverse Traversing CLL', () => {
  for (let i = 0; i < 1e3; i += 1) {
    cll.getNthFromLast(midPoint);
  }
});
timeFn('DLL', 'Reverse Traversing DLL', () => {
  for (let i = 0; i < 1e3; i += 1) {
    dll.getNthFromLast(midPoint);
  }
});

timeFn('LL', 'Deleting element', () => {
  for (let i = 0; i < 1e3; i += 1) {
    ll.deleteAt(Math.floor(ll.size() / 2));
  }
});
timeFn('CLL', 'Deleting element', () => {
  for (let i = 0; i < 1e3; i += 1) {
    cll.deleteAt(Math.floor(cll.size() / 2));
  }
});
timeFn('DLL', 'Deleting element', () => {
  for (let i = 0; i < 1e3; i += 1) {
    dll.deleteAt(Math.floor(dll.size() / 2));
  }
});
