import log from '@helpers/log';
import LinkedList, * as linkedList from '@src/classes/LinkedList';
import DoublyLinkedList from './classes/DoublyLinkedList';
import ClasslessLinkedList from './classless/ClasslessLinkedList';
import ImmutableLinkedList from './immutable/ImmutableLinkedList';

log('Comparing runtimes');
const SIZE = 1e6;
const TRAVERSALS = Math.min(SIZE, 1e3);

function timeFn(label: string, msg: string, nTimes: number, fn: (i: number) => void) {
  console.time(label);
  console.timeLog(label, msg);
  const timeout = Date.now() + 10000;
  for (let i = 0; i < nTimes; i += 1) {
    fn(i);
    if (Date.now() >= timeout) {
      console.error(`TIMEOUT: ${i} iterations completed.`);
      break;
    }
  }
  console.timeEnd(label);
}

benchmark('LinkedList', () => new LinkedList());
benchmark('DoublyLinkedList', () => new DoublyLinkedList());
benchmark('Classles LinkedList', () => ClasslessLinkedList.create());
benchmark('Immutable LinkedList', () => ImmutableLinkedList.create());

function benchmark(name: string, factory: () => linkedList.ILinkedList<number>) {
  let ll = factory();
  timeFn(name, 'Creating w/prepend', SIZE, (i) => {
    ll = ll.prepend(i);
  });

  ll = factory();
  timeFn(name, 'Creating w/append', SIZE, (i) => {
    ll = ll.append(i);
  });

  const midPoint = Math.floor(SIZE / 2);
  timeFn(name, 'Traversing', TRAVERSALS, (i) => {
    ll.get(midPoint);
  });

  timeFn(name, 'Reverse Traversing LL', TRAVERSALS, (i) => {
    ll.getNthFromLast(midPoint);
  });

  timeFn(name, 'Deleting element', TRAVERSALS, (i) => {
    ll = ll.deleteAt(Math.floor(ll.size() / 2));
  });

}
