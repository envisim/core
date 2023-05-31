import {KDStore} from '../src/util-classes/KDStore';
import {KDTree} from '../src/util-classes/KDTree';
import {data, createIndexedTable} from './_data.testf';

describe('KDTree', () => {
  let store = new KDStore(10, 1);
  let kd: KDTree;
  let res: number[];

  kd = new KDTree(data, 2);

  res = [1, 0, 8, 5, 9, 3, 5, 2, 3, 4];
  test.each(createIndexedTable(res))('findNeighbour %i', (i, e) => {
    kd.findNeighbours(store, i);
    expect(store.neighbours[0]).toBe(e);
  });

  res = [1, 8, 8, 5, 9, 6, 7, 8, 9];
  test.each(createIndexedTable(res))('findNeighbour and remove %i', (i, e) => {
    kd.findNeighbours(store, i);
    expect(store.neighbours[0]).toBe(e);
    kd.removeUnit(i);
  });
});
