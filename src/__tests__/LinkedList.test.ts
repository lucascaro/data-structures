import LinkedList, * as linkedList from '../classes/LinkedList';
import DoublyLinkedList from '../classes/DoublyLinkedList';
import ClasslessLinkedList from '../classless/ClasslessLinkedList';

describe('LinkedList', testSuite(() => new LinkedList()));
describe('DoublyLinkedList', testSuite(() => new DoublyLinkedList()));
describe('Classles LinkedList', testSuite(() => ClasslessLinkedList.create()));

function testSuite(factory: () => linkedList.ILinkedList<string>): () => void {
  return () => {
    test('create empty list', () => {
      const l = factory();
      expect(l.size()).toBe(0);
    });

    test('append element', () => {
      const l = factory();
      l.append('v1');
      expect(l.size()).toBe(1);
      expect(l.get(0)).toBe('v1');
      expect(l.head()).toHaveProperty('value', 'v1');
      expect(l.tail()).toHaveProperty('value', 'v1');
      l.append('v2');
      expect(l.size()).toBe(2);
      expect(l.get(0)).toBe('v1');
      expect(l.get(1)).toBe('v2');
      expect(l.head()).toHaveProperty('value', 'v1');
      expect(l.tail()).toHaveProperty('value', 'v2');
      l.append('v3');
      expect(l.size()).toBe(3);
      expect(l.get(0)).toBe('v1');
      expect(l.get(1)).toBe('v2');
      expect(l.get(2)).toBe('v3');
      expect(l.head()).toHaveProperty('value', 'v1');
      expect(l.tail()).toHaveProperty('value', 'v3');
    });

    test('prepend element', () => {
      const l = factory();
      l.prepend('v1');
      expect(l.size()).toBe(1);
      expect(l.get(0)).toBe('v1');
      l.prepend('v2');
      expect(l.size()).toBe(2);
      expect(l.get(0)).toBe('v2');
      expect(l.get(1)).toBe('v1');
      l.prepend('v3');
      expect(l.get(0)).toBe('v3');
      expect(l.get(1)).toBe('v2');
      expect(l.get(2)).toBe('v1');
    });

    test('get', () => {
      const l = factory();
      l.append('v1');
      l.append('v2');
      l.append('v3');

      expect(l.get(0)).toBe('v1');
      expect(l.get(1)).toBe('v2');
      expect(l.get(2)).toBe('v3');
    });

    test('big get', () => {
      const l = factory();
      for (let i = 0; i < 1e4; i += 1) {
        l.append(`v1${i}`);
      }

      for (let i = 0; i < 1e4; i += 1) {
        expect(l.get(i)).toBe(`v1${i}`);
      }

    });

    test('getNode', () => {
      const l = factory();
      l.append('v1');
      l.append('v2');
      l.append('v3');

      expect(l.getNode(0)).toHaveProperty('value', 'v1');
      expect(l.getNode(1)).toHaveProperty('value', 'v2');
      expect(l.getNode(2)).toHaveProperty('value', 'v3');
    });

    test('insertAt', () => {
      const l = factory();
      l.append('v1');
      l.append('v2');
      l.append('v3');

      l.insertAt('v0', 0);
      expect(l.get(0)).toBe('v0');
      l.insertAt('v1.5', 2);
      expect(l.get(2)).toBe('v1.5');

      expect(() => l.insertAt('no', -1)).toThrowError();
      expect(() => l.insertAt('no', 6)).toThrowError();
    });

    test('insertAt 0', () => {
      const l = factory();
      l.insertAt('v3', 0);
      l.insertAt('v2', 0);
      l.insertAt('v1', 0);

      expect(l.size()).toBe(3);
      expect(l.get(0)).toBe('v1');
      expect(l.head()).toHaveProperty('value', 'v1');
      expect(l.get(2)).toBe('v3');
      expect(l.tail()).toHaveProperty('value', 'v3');

    });

    test('insertAt end', () => {
      const l = factory();
      l.insertAt('v1', 0);
      l.insertAt('v2', 1);
      l.insertAt('v3', 2);

      expect(l.size()).toBe(3);
      expect(l.get(0)).toBe('v1');
      expect(l.head()).toHaveProperty('value', 'v1');
      expect(l.get(2)).toBe('v3');
      expect(l.tail()).toHaveProperty('value', 'v3');

    });

    test('insertAfter', () => {
      const l = factory();
      l.append('v1');
      l.append('v2');
      l.append('v3');

      l.insertAfter('v1.5', l.getNode(0) as linkedList.ILinkedListNode<string>);
      expect(l.get(1)).toBe('v1.5');
      expect(l.get(2)).toBe('v2');
      l.insertAfter('v2.5', l.getNode(2) as linkedList.ILinkedListNode<string>);
      expect(l.get(3)).toBe('v2.5');
      expect(l.get(4)).toBe('v3');
      l.append('v4');
      expect(l.get(5)).toBe('v4');

      expect(() => l.insertAt('no', -1)).toThrowError();
      expect(() => l.insertAt('no', 7)).toThrowError();
    });

    describe('find', () => {
      test('empty list returns undefined', () => {
        const l = factory();
        expect(l.find(() => true)).toBeUndefined();
      });

      test('not found returns undefined', () => {
        const l = factory();
        l.append('v1');
        l.append('v2');
        expect(l.find(() => false)).toBeUndefined();
      });

      test('returns first match', () => {
        const l = factory();
        l.append('v1');
        l.append('v2');
        l.append('v101');
        l.append('v102');
        expect(l.find(n => n.value.startsWith('v10'))).toHaveProperty('value', 'v101');
      });
    });

    describe('findIndexByValue', () => {
      test('empty list', () => {
        const l = factory();
        expect(l.findIndexByValue('something')).toBe(-1);
      });

      test('missing node', () => {
        const l = factory();
        l.append('v1');
        expect(l.findIndexByValue('v2')).toBe(-1);
      });

      test('finds index', () => {
        const l = factory();
        l.append('v1');
        l.append('v2');
        l.append('v3');
        expect(l.findIndexByValue('v3')).toBe(2);
        expect(l.findIndexByValue('v2')).toBe(1);
        expect(l.findIndexByValue('v1')).toBe(0);
      });
    });

    describe('deleteAt', () => {
      test('empty list', () => {
        const l = factory();
        expect(() => l.deleteAt(0)).toThrowError();
      });

      test('out of bounds', () => {
        const l = factory();
        l.append('v1');
        l.append('v2');
        l.append('v3');
        expect(() => l.deleteAt(-1)).toThrowError();
        expect(() => l.deleteAt(3)).toThrowError();
      });

      test('deletes elements', () => {
        const l = factory();
        l.append('v1');
        l.append('v2');
        l.append('v3');
        expect(() => l.deleteAt(0)).not.toThrowError();
        expect(l.size()).toBe(2);
        expect(l.head()).toHaveProperty('value', 'v2');
        expect(l.findIndexByValue('v1')).toBe(-1);

        expect(() => l.deleteAt(1)).not.toThrowError();
        expect(l.size()).toBe(1);
        expect(l.tail()).toHaveProperty('value', 'v2');
        expect(l.findIndexByValue('v3')).toBe(-1);
        expect(l.get(0)).toBe('v2');
        expect(l.head()).toEqual(l.tail());
      });
    });

    describe('deleteValue', () => {
      test('empty list', () => {
        const l = factory();
        expect(() => l.deleteValue('v1')).not.toThrowError();
      });

      test('not found', () => {
        const l = factory();
        l.append('v1');
        l.append('v2');
        l.append('v3');
        expect(() => l.deleteValue('v4')).not.toThrowError();
        expect(l.size()).toBe(3);
      });

      test('deletes only node', () => {
        const l = factory();
        l.append('v1');

        l.deleteValue('v1');
        expect(l.size()).toBe(0);
        expect(l.head()).toBeUndefined();
        expect(l.tail()).toBeUndefined();
      });

      test('deletes head', () => {
        const l = factory();
        l.append('v1');
        l.append('v2');
        l.append('v3');

        l.deleteValue('v1');
        expect(l.size()).toBe(2);
        expect(l.head()).toHaveProperty('value', 'v2');
        expect(l.tail()).toHaveProperty('value', 'v3');
      });

      test('deletes tail', () => {
        const l = factory();
        l.append('v1');
        l.append('v2');
        l.append('v3');

        l.deleteValue('v3');
        expect(l.size()).toBe(2);
        expect(l.head()).toHaveProperty('value', 'v1');
        expect(l.tail()).toHaveProperty('value', 'v2');
      });

      test('deletes body', () => {
        const l = factory();
        l.append('v1');
        l.append('v2');
        l.append('v3');

        l.deleteValue('v2');
        expect(l.size()).toBe(2);
        expect(l.head()).toHaveProperty('value', 'v1');
        expect(l.tail()).toHaveProperty('value', 'v3');
      });
    });

    describe('getNthFromLast', () => {
      test('empty list', () => {
        const l = factory();
        expect(l.getNthFromLast(0)).toBeUndefined();
        expect(l.getNthFromLast(1)).toBeUndefined();
      });

      test('out of bounds', () => {
        const l = factory();
        l.append('v1');
        expect(l.getNthFromLast(-1)).toBeUndefined();
        expect(l.getNthFromLast(1)).toBeUndefined();
      });

      test('returns the nth node from last', () => {
        const l = factory();
        l.append('v1');
        l.insertAt('v5', 1);
        l.insertAt('v4', 1);
        l.insertAt('v3', 1);
        l.insertAt('v2', 1);

        expect(l.getNthFromLast(0)).toEqual(l.tail());
        expect(l.getNthFromLast(l.size() - 1)).toEqual(l.head());
        expect(l.getNthFromLast(3)).toHaveProperty('value', 'v2');
      });
    });
  };
}
