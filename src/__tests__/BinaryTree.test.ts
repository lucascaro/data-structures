import { ITree } from '@src/classes/Tree';
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
  };
}
