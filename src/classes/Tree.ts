
export interface ITreeNode<T> {
  value: T;
  left: MaybeNode<T>;
  right: MaybeNode<T>;
  parent: MaybeNode<T>;
}

export interface ITree<T> {
  root(): MaybeNode<T>;
  size(): number;
  insert(value: T): this;
  delete(value: T): this;
  listBFS(): T[];
  listNLR(): T[];
  listLNR(): T[];
  listLRN(): T[];
  mapBFS<U>(fn: (n: ITreeNode<T>) => U): U[];
  mapNLR<U>(fn: (n: ITreeNode<T>) => U): U[];
  mapLNR<U>(fn: (n: ITreeNode<T>) => U): U[];
  mapLRN<U>(fn: (n: ITreeNode<T>) => U): U[];
  findBFS(fn: (n: ITreeNode<T>) => boolean): MaybeNode<T>;
  findNLR(fn: (n: ITreeNode<T>) => boolean): MaybeNode<T>;
}
export type MaybeTree<T> = ITree<T> | void;
export type MaybeNode<T> = ITreeNode<T> | void;
