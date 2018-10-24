import { ITreeNode, ITree, MaybeNode } from './Tree';

export default class BinaryTree<T> implements ITree<T> {
  private rootNode?: ITreeNode<T>;
  private nNodes: number = 0;

  root(): MaybeNode<T> {
    return this.rootNode;
  }

  size(): number {
    return this.nNodes;
  }
  /**
   * Insert value in the first position available in level order.
   */
  insert(value: T): this {
    const parent = this.findSuitableParent();
    const newNode = {
      value,
      parent,
      left: undefined,
      right: undefined,
    };
    if (parent) {
      if (!parent.left) {
        parent.left = newNode;
      } else {
        parent.right = newNode;
      }
    } else {
      this.rootNode = newNode;
    }
    this.nNodes += 1;
    return this;
  }

  private findSuitableParent(): MaybeNode<T> {
    return this.findBFS(node => !node.left || !node.right);
  }

  delete(value: T): this {
    return this;
  }

  listBFS(): T[] {
    return this.mapBFS(n => n.value);
  }

  listNLR(): T[] {
    return this.mapNLR(n => n.value);
  }

  listLNR(): T[] {
    return this.mapLNR(n => n.value);
  }

  listLRN(): T[] {
    return this.mapLRN(n => n.value);
  }

  mapBFS<U>(fn: (n: ITreeNode<T>) => U): U[] {
    const recursion = (maybeNodes: MaybeNode<T>[]): U[] => {
      const res = [];
      const nodes = maybeNodes.filter(n => n) as ITreeNode<T>[];
      if (nodes.length > 0) {
        res.push(...nodes.map(n => fn(n)));
        const maybeSubNodes = nodes.map(n => [n.left, n.right]);
        res.push(...recursion(([] as MaybeNode<T>[]).concat(...maybeSubNodes)));
      }
      return res;
    };
    return recursion([this.rootNode]);
  }

  findBFS(fn: (n: ITreeNode<T>) => boolean): MaybeNode<T> {
    const recursion = (maybeNodes: MaybeNode<T>[]): MaybeNode<T> => {
      const nodes = maybeNodes.filter(n => n) as ITreeNode<T>[];
      if (nodes.length > 0) {
        const found = nodes.find(n => fn(n));
        if (found) { return found; }
        const maybeSubNodes = nodes.map(n => [n.left, n.right]);
        return recursion(([] as MaybeNode<T>[]).concat(...maybeSubNodes));
      }
    };
    return recursion([this.rootNode]);
  }

  mapNLR<U>(fn: (n: ITreeNode<T>) => U): U[] {
    const recursion = (node: MaybeNode<T>): U[] => {
      const res = [];
      if (node) {
        res.push(fn(node));
        res.push(...recursion(node.left));
        res.push(...recursion(node.right));
      }
      return res;

    };
    return recursion(this.rootNode);
  }

  findNLR(fn: (n: ITreeNode<T>) => boolean): MaybeNode<T> {
    const recursion = (node: MaybeNode<T>): MaybeNode<T> => {
      if (node) {
        if (fn(node)) { return node; }
        return recursion(node.left) || recursion(node.right);
      }
    };
    return recursion(this.rootNode);
  }

  mapLNR<U>(fn: (n: ITreeNode<T>) => U): U[] {
    const recursion = (node: MaybeNode<T>): U[] => {
      const res = [];
      if (node) {
        res.push(...recursion(node.left));
        res.push(fn(node));
        res.push(...recursion(node.right));
      }
      return res;

    };
    return recursion(this.rootNode);
  }

  mapLRN<U>(fn: (n: ITreeNode<T>) => U): U[] {
    const recursion = (node: MaybeNode<T>): U[] => {
      const res = [];
      if (node) {
        res.push(...recursion(node.left));
        res.push(...recursion(node.right));
        res.push(fn(node));
      }
      return res;

    };
    return recursion(this.rootNode);
  }

}
