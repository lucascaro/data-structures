import { ILinkedListNode, ILinkedList } from './LinkedList';

export interface Node<T> extends ILinkedListNode<T> {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
}

export default class LinkedList<T> implements ILinkedList<T> {
  private headNode?: Node<T>;
  private nNodes: number = 0;
  private tailNode?: Node<T>;

  size(): number {
    return this.nNodes;
  }

  head(): Readonly<Node<T> | undefined> {
    return Object.freeze(this.headNode);
  }

  tail(): Readonly<Node<T> | undefined> {
    return Object.freeze(this.tailNode);
  }

  get(index: number): T | void {
    const node = this.getNode(index);
    if (node) {
      return node.value;
    }
  }

  getNode(index: number): Node<T> | void {
    if (index < 0 || index > this.nNodes || !this.headNode) {
      return;
    }
    let i = 0;
    let node = this.headNode;
    while (i < index && node.next) {
      node = node.next;
      i += 1;
    }
    if (i === index) {
      return node;
    }
  }

  getNthFromLast(index: number): Node<T> | void {
    if (index < 0 || index >= this.nNodes) {
      return;
    }
    return this.getNode(this.nNodes - index - 1);
  }

  append(value: T): this {
    if (!this.tailNode) {
      return this.prepend(value);
    }
    const newNode = { value, prev: this.tailNode };
    this.tailNode.next = newNode;
    this.tailNode = newNode;
    this.nNodes += 1;
    return this;
  }

  prepend(value: T): this {
    const newNode = {
      value,
      next: this.headNode,
    };
    if (this.headNode) {
      this.headNode.prev = newNode;
    }
    this.headNode = newNode;
    if (!this.tailNode) {
      this.tailNode = newNode;
    }
    this.nNodes += 1;
    return this;
  }

  insertAt(value: T, position: number): this {
    if (position === 0) {
      return this.prepend(value);
    }
    const parent = this.getNode(position - 1);
    if (!parent) {
      throw new Error(`element ${position} does not exist.`);
    }
    return this.insertAfter(value, parent);
  }

  insertAfter(value: T, parent: Node<T>): this {
    // TODO: validate that the parent is actually in the list
    const newNode = {
      value,
      next: parent.next,
      prev: parent,
    };
    if (parent === this.tailNode) {
      this.tailNode = newNode;
    }
    if (parent.next) {
      parent.next.prev = newNode;
    }
    parent.next = newNode;
    this.nNodes += 1;
    return this;
  }

  find(predicate: (node: Node<T>) => boolean): Node<T> | void {
    let node = this.headNode;
    let i = 0;
    while (node && node.next) {
      if (predicate(node)) {
        return node;
      }
      node = node.next;
      i += 1;
    }
  }

  findIndex(predicate: (node: Node<T>) => boolean): number {
    let node = this.headNode;
    let i = 0;
    while (node) {
      if (predicate(node)) {
        return i;
      }
      node = node.next;
      i += 1;
    }
    return -1;
  }

  findIndexByValue(value: T): number {
    return this.findIndex(n => n.value === value);
  }

  parent(node: Node<T>): Node<T> | void {
    return node.prev;
  }

  deleteAt(position: number): this {
    const node = this.getNode(position);
    if (!node) {
      throw new Error(`element ${position} does not exist.`);
    }
    if (position === 0) {
      this.headNode = node.next;
    }
    const parent = this.parent(node) || undefined;
    if (this.tailNode === node) {
      this.tailNode = parent;
    }
    if (parent) {
      parent.next = node.next;
    }
    this.nNodes -= 1;
    return this;
  }

  deleteValue(value: T): this {
    const index = this.findIndexByValue(value);
    if (index >= 0) {
      return this.deleteAt(index);
    }
    return this;
  }
}
