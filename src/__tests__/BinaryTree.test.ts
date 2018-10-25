import { ITree, ITreeNode } from '@src/classes/Tree';
import BinaryTree from '@src/classes/BinaryTree';

describe('BinaryTree', testSuite(() => new BinaryTree()));

function testSuite(factory: () => ITree<number>): () => void {
  return () => {
    describe('constructor', () => {
      test('creates empty tree', () => {
        const t = factory();
        expect(t.size()).toEqual(0);
        expect(t.root()).toBeUndefined();
        expect(t.mapBFS(n => n)).toEqual([]);
        expect(t.mapNLR(n => n)).toEqual([]);
        expect(t.mapLNR(n => n)).toEqual([]);
        expect(t.mapLRN(n => n)).toEqual([]);
        expect(t.findNLR(n => true)).toBeUndefined();
      });
    });

    describe('insert', () => {
      test('inserts root node', () => {
        const t = factory()
          .insert(10);

        expect(t.size()).toEqual(1);
        expect(t.root()).toEqual({ value: 10 });
        expect(t.listBFS()).toEqual([10]);
        expect(t.listNLR()).toEqual([10]);
        expect(t.listLNR()).toEqual([10]);
        expect(t.listLRN()).toEqual([10]);
        expect(t.findNLR(n => true)).toEqual({ value: 10 });
      });

      test('inserts second level nodes', () => {
        const t = factory()
          .insert(1)
          .insert(2)
          .insert(3);

        expect(t.size()).toEqual(3);
        expect(t.root()).toMatchObject({ value: 1 });
        expect(t.listBFS()).toEqual([1, 2, 3]);
        expect(t.listNLR()).toEqual([1, 2, 3]);
        expect(t.listLNR()).toEqual([2, 1, 3]);
        expect(t.listLRN()).toEqual([2, 3, 1]);
        expect(t.findNLR(n => true)).toMatchObject({ value: 1 });
        const node2 = t.findNLR(n => n.value === 2) as ITreeNode<number>;
        expect(node2.parent).toMatchObject({ value: 1 });
        const node3 = t.findNLR(n => n.value === 3) as ITreeNode<number>;
        expect(node3.parent).toMatchObject({ value: 1 });
      });

      test('inserts third level nodes', () => {
        const t = factory()
          .insert(1)
          .insert(2)
          .insert(3)
          .insert(4)
          .insert(5)
          .insert(6)
          .insert(7);

        expect(t.size()).toEqual(7);
        expect(t.root()).toMatchObject({ value: 1 });
        expect(t.listBFS()).toEqual([1, 2, 3, 4, 5, 6, 7]);
        expect(t.listNLR()).toEqual([1, 2, 4, 5, 3, 6, 7]);
        expect(t.listLNR()).toEqual([4, 2, 5, 1, 6, 3, 7]);
        expect(t.listLRN()).toEqual([4, 5, 2, 6, 7, 3, 1]);
        expect(t.findNLR(n => true)).toMatchObject({ value: 1 });
      });
    });

    describe('delete', () => {
      test('empty tree throws error', () => {
        const t = factory();
        expect(() => t.delete(0)).toThrowError();
      });

      test('missing element throws error', () => {
        const t = factory().insert(1);
        expect(() => t.delete(0)).toThrowError();
      });

      test('deletes the only node', () => {
        const t = factory()
        .insert(1)
        .delete(1);

        expect(t.size()).toEqual(0);
      });

      test('deletes root of tree', () => {
        const t = factory()
        .insert(1)
        .insert(2)
        .insert(3)
        .delete(1);

        expect(t.size()).toEqual(2);
        expect(t.root()).toMatchObject({ value: 3 });
      });

      test('deletes node to the left', () => {
        const t = factory()
        .insert(1)
        .insert(2)
        .insert(3)
        .delete(2);

        expect(t.size()).toEqual(2);
        expect(t.root()).toMatchObject({ value: 1 , left: { value: 3 } });
      });

      test('deletes node to the right', () => {
        const t = factory()
        .insert(1)
        .insert(2)
        .insert(3)
        .delete(3);

        expect(t.size()).toEqual(2);
        expect(t.root()).toMatchObject({ value: 1 , left: { value: 2 }, right: undefined });
      });

      test('deletes node in the middle', () => {
        const t = factory()
        .insert(1)
        .insert(2)
        .insert(3)
        .insert(4)
        .insert(5)
        .insert(6)
        .insert(7)
        .delete(2);

        expect(t.size()).toEqual(6);
        expect(t.root()).toMatchObject({ value: 1 , left: { value: 7 }, right: { value: 3 } });
      });

    });
  };
}
