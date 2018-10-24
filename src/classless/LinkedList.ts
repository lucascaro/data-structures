import { ILinkedList } from '@src/classes/LinkedList';

export namespace LinkedList {

  export type LinkedList<T> = {
    size: () => number;
    head: () => Readonly<LinkedListNode<T> | undefined>;
    tail: () => Readonly<LinkedListNode<T> | undefined>;
    get: (index: number) => T | void;
    getNode: (index: number) => LinkedListNode<T> | void;
    getNthFromLast: (index: number) => LinkedListNode<T> | void;
    append: (value: T) => ILinkedList<T>;
    prepend: (value: T) => ILinkedList<T>;
    insertAt: (value: T, position: number) => ILinkedList<T>;
    insertAfter: (value: T, parent: LinkedListNode<T>) => ILinkedList<T>;
    find: (predicate: (node: LinkedListNode<T>) => boolean) => LinkedListNode<T> | void;
    findIndex: (predicate: (node: LinkedListNode<T>) => boolean) => number;
    findIndexByValue: (value: T) => number;
    parent: (node: LinkedListNode<T>) => LinkedListNode<T> | void;
    deleteAt: (position: number) => ILinkedList<T>;
    deleteValue: (value: T) => ILinkedList<T>;
  };

  export type LinkedListNode<T> = {
    value: T;
    next?: LinkedListNode<T>;
  };

  type LinkedListState<T> = {
    head?: LinkedListNode<T>;
    tail?: LinkedListNode<T>;
    size: number;
  };

  export function create<T>(): LinkedList <T> {
    const state: LinkedListState<T> = {
      head: undefined,
      tail: undefined,
      size: 0,
    };

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

    function size(): number {
      return state.size;
    }
    function head(): Readonly<LinkedListNode<T> | undefined> {
      return Object.freeze(state.head);
    }
    function tail(): Readonly<LinkedListNode<T> | undefined> {
      return Object.freeze(state.tail);
    }
    function get(index: number): T | void {
      const node = getNode(index);
      return node ? node.value : undefined;
    }
    function getNode(index: number): LinkedListNode<T> | void {
      if (index < 0 || index > state.size) { return; }
      // Tail recursion should be optimized
      return index === 0 ?  state.head : getNode(index - 1);
    }
    function getNthFromLast(index: number): LinkedListNode<T> | void {
      return getNode(state.size - index - 1);
    }
    function append(value: T): ILinkedList<T> {
      const newNode = { value };
      if (state.tail) { state.tail.next = newNode; }
      state.tail = newNode;
      if (!state.head) { state.head = newNode; }
      return l;
    }
    function prepend(value: T): ILinkedList<T> {
      const newNode = { value, next: state.head };
      state.head = newNode;
      return l;
    }
    function insertAt(value: T, position: number): ILinkedList<T> {

      return l;
    }
    function insertAfter(value: T, parent: LinkedListNode<T>): ILinkedList<T> {

      return l;
    }
    function find(predicate: (node: LinkedListNode<T>) => boolean): LinkedListNode<T> | void {

    }
    function findIndex(predicate: (node: LinkedListNode<T>) => boolean): number {

      return -1;
    }
    function findIndexByValue(value: T): number {

      return -1;
    }
    function parent(node: LinkedListNode<T>): LinkedListNode<T> | void {

    }
    function deleteAt(position: number): ILinkedList<T> {

      return l;
    }
    function deleteValue(value: T): ILinkedList<T> {

      return l;
    }

    return l;
  }

}
