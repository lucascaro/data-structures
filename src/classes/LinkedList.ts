
export interface ILinkedListNode<T> {
  value: T;
}
export interface Node<T> extends ILinkedListNode<T> {
  value: T;
  next?: Node<T>;
}

export interface ILinkedList<T> {
  size: () => number;
  head: () => Readonly<Node<T> | void>;
  tail: () => Readonly<Node<T> | void>;
  get: (index: number) => T | void;
  getNode: (index: number) => Node<T> | void;
  getNthFromLast: (index: number) => Node<T> | void;
  append: (value: T) => ILinkedList<T>;
  prepend: (value: T) => ILinkedList<T>;
  insertAt: (value: T, position: number) => ILinkedList<T>;
  insertAfter: (value: T, parent: Node<T>) => ILinkedList<T>;
  find: (predicate: (node: Node<T>) => boolean) => Node<T> | void;
  findIndex: (predicate: (node: Node<T>) => boolean) => number;
  findIndexByValue: (value: T) => number;
  parent: (node: Node<T>) => Node<T> | void;
  deleteAt: (position: number) => ILinkedList<T>;
  deleteValue: (value: T) => ILinkedList<T>;
}

export default class LinkedList<T> implements ILinkedList<T> {
  private headNode?: Node<T>;
  private nNodes: number = 0;
  private tailNode?: Node<T>;
  constructor() {}

  size(): number {
    return this.nNodes;
  }

  head(): Readonly<Node<T> | void> {
    return this.headNode;
  }

  tail(): Readonly<Node<T> | void> {
    return this.tailNode;
  }

  get(index: number): T | void {
    const node = this.getNode(index);
    if (node) {
      return node.value;
    }
  }

  getNode(index: number): Node<T> | void {
    if (index < 0 || index > this.nNodes) { return; }

    let h = this.headNode;
    let i = index;
    while (h && i > 0) {
      h = h.next;
      i -= 1;
    }
    return h;
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
    const newNode = { value };
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
    };
    if (parent === this.tailNode) {
      this.tailNode = newNode;
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
    return this.find(n => n.next === node);
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
