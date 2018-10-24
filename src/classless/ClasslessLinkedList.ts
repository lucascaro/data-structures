import { ILinkedList } from '@src/classes/LinkedList';

namespace ClasslessLinkedList {
  export interface LinkedList<T> extends ILinkedList<T>  {
    size: () => number;
    head: () => Readonly<MaybeNode<T>>;
    tail: () => Readonly<MaybeNode<T>>;
    get: (index: number) => T | void;
    getNode: (index: number) => MaybeNode<T>;
    getNthFromLast: (index: number) => MaybeNode<T>;
    append: (value: T) => ILinkedList<T>;
    prepend: (value: T) => ILinkedList<T>;
    insertAt: (value: T, position: number) => ILinkedList<T>;
    insertAfter: (value: T, parent: Node<T>) => ILinkedList<T>;
    find: (predicate: (node: Node<T>) => boolean) => MaybeNode<T>;
    findIndex: (predicate: (node: Node<T>) => boolean) => number;
    findIndexByValue: (value: T) => number;
    parent: (node: Node<T>) => MaybeNode<T>;
    deleteAt: (position: number) => ILinkedList<T>;
    deleteValue: (value: T) => ILinkedList<T>;
    // state: State<T>;
  }

  export type Node<T> = {
    value: T;
    next?: Node<T>;
  };

  type State<T> = {
    head?: Node<T>;
    tail?: Node<T>;
    size: number;
  };

  type MaybeNode<T> = Node<T> | void;

  export function create<T>(): LinkedList <T> {

    const l: LinkedList<T> = {
      size,
      head,
      tail,
      get,
      getNode,
      getNthFromLast,
      append,
      prepend,
      insertAt,
      insertAfter,
      find,
      findIndex,
      findIndexByValue,
      parent,
      deleteAt,
      deleteValue,
    };

    const state: State<T> = {
      head: undefined,
      tail: undefined,
      size: 0,
    };

    function size(): number {
      return state.size;
    }
    function head(): Readonly<MaybeNode<T>> {
      return state.head;
    }
    function tail(): Readonly<MaybeNode<T>> {
      return state.tail;
    }
    function get(index: number): T | void {
      const node = getNode(index);
      return node ? node.value : undefined;
    }
    function getNode(index: number): MaybeNode<T> {
      if (index < 0 || index > state.size) { return; }

      let h = state.head;
      let i = index;
      while (h && i > 0) {
        h = h.next;
        i -= 1;
      }
      return h;
    }
    function getNthFromLast(index: number): MaybeNode<T> {
      return getNode(state.size - index - 1);
    }
    function append(value: T): ILinkedList<T> {
      const newNode = { value };
      if (state.tail) { state.tail.next = newNode; }
      if (!state.head) { state.head = newNode; }
      state.tail = newNode;
      state.size += 1;
      return l;
    }
    function prepend(value: T): ILinkedList<T> {
      const newNode = { value, next: state.head };
      if (!state.tail) { state.tail = newNode; }
      state.head = newNode;
      state.size += 1;
      return l;
    }
    function insertAt(value: T, position: number): ILinkedList<T> {
      if (position < 0 || position > state.size) {
        throw new Error(`element ${position} does not exist.`);
      }
      if (position === 0) { return prepend(value); }
      if (position === state.size) { return append(value); }
      // Parent exists since we are inserting at the body.
      const parent = getNode(position - 1) as Node<T>;
      const newNode: Node<T> = { value, next: parent.next };
      parent.next = newNode;
      state.size += 1;
      return l;
    }
    function insertAfter(value: T, parent: Node<T>): ILinkedList<T> {
      const newNode = { value, next: parent.next };
      parent.next = newNode;
      if (parent === state.tail) {
        state.tail = newNode;
      }
      state.size += 1;
      return l;
    }
    function find(predicate: (node: Node<T>) => boolean): MaybeNode<T> {
      let n = state.head;
      while (n && !predicate(n)) {
        n = n.next;
      }
      return n;
    }
    function findIndex(predicate: (node: Node<T>) => boolean): number {
      let n = state.head;
      let i = 0;
      while (n) {
        if (predicate(n)) {
          return i;
        }
        n = n.next;
        i += 1;
      }
      return -1;
    }
    function findIndexByValue(value: T): number {
      return findIndex(n => n.value === value);
    }

    function parent(node: Node<T>): MaybeNode<T> {
      return find(n => n.next === node);
    }
    function deleteAt(position: number): ILinkedList<T> {
      if (position < 0 || position >= state.size) {
        throw new Error(`element ${position} does not exist.`);
      }
      if (position === 0) {
        // We know head exists because an error is thrown above if size is 0.
        state.head = state.head!.next;
        if (position === state.size - 1) {
          state.tail = state.head;
        }
      } else {
        // An element with index position - 1 is guaranteed to exist since
        // at this point position > 0 && position < size.
        const parent = getNode(position - 1) as Node<T>;
        // We know parent.next is defined because position - 1 can't be the last
        // node since position < size.
        parent.next = parent.next!.next;
        if (position === state.size - 1) {
          state.tail = parent;
        }
      }
      state.size -= 1;
      return l;
    }
    function deleteValue(value: T): ILinkedList<T> {
      const index = findIndexByValue(value);
      if (index >= 0) {
        return deleteAt(index);
      }
      return l;
    }

    return Object.freeze(l);
  }

}

export default ClasslessLinkedList;
