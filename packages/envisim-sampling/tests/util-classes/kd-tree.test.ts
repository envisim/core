import {describe, expect, test} from 'vitest';

import {KdStore, KdTree} from '../../src/util-classes/index.js';
import {createIndexedTable, data} from '../_data.testf';

describe('KDTree', () => {
  let store = new KdStore(10, 1);
  let kd: KdTree;
  let res: number[];

  kd = new KdTree(data, 2);

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
