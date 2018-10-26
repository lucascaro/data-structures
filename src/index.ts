import log from '@helpers/log';
import LinkedList, * as linkedList from '@src/classes/LinkedList';
import DoublyLinkedList from './classes/DoublyLinkedList';
import ClasslessLinkedList from './classless/ClasslessLinkedList';
import ImmutableLinkedList from './immutable/ImmutableLinkedList';

log('Comparing runtimes');
const SIZE = 1e4;
const TRAVERSALS = Math.min(SIZE, 1e3);

function timeFn(label: string, msg: string, fn: () => void) {
  console.time(label);
  console.timeLog(label, msg);
  fn();
  console.timeEnd(label);
}

benchmark('LinkedList', () => new LinkedList());
benchmark('DoublyLinkedList', () => new DoublyLinkedList());
benchmark('Classles LinkedList', () => ClasslessLinkedList.create());
benchmark('Immutable LinkedList', () => ImmutableLinkedList.create());

function benchmark(name: string, factory: () => linkedList.ILinkedList<number>) {
  timeFn(name, 'Creating w/prepend', () => {
    let ll = factory();
    for (let i = 0; i < SIZE; i += 1) {
      ll = ll.prepend(i);
    }
  });

  timeFn(name, 'Creating w/append', () => {
    let ll = factory();
    for (let i = 0; i < SIZE; i += 1) {
      ll = ll.append(i);
    }
  });

  let ll = factory();
  for (let i = 0; i < SIZE; i += 1) {
    ll = ll.prepend(i);
  }

  const midPoint = Math.floor(SIZE / 2);
  timeFn(name, 'Traversing', () => {
    for (let i = 0; i < TRAVERSALS; i += 1) {
      ll.get(midPoint);
    }
  });

  timeFn(name, 'Reverse Traversing LL', () => {
    for (let i = 0; i < TRAVERSALS; i += 1) {
      ll.getNthFromLast(midPoint);
    }
  });

  timeFn(name, 'Deleting element', () => {
    for (let i = 0; i < TRAVERSALS; i += 1) {
      ll = ll.deleteAt(Math.floor(ll.size() / 2));
    }
  });

}
