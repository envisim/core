import {type Matrix} from '@envisim/matrix';

import {KdStore} from './kd-store.js';
import {KdTree} from './kd-tree.js';

export class NearestNeighbour {
  /**@ignore */
  protected tree: KdTree;
  /**@ignore */
  protected store: KdStore;

  /**
   * Constructs a nearest neighbour searcher, using k-d-trees
   *
   * @param dt - the data to search within.
   * @param bucketSize - the bucket size of the k-d-tree's nodes.
   * @returns a nearest neighbour searcher.
   */
  constructor(dt: Matrix, bucketSize: number = 40) {
    this.tree = new KdTree(dt, bucketSize);
    this.store = new KdStore(dt.nrow, 1);
    return;
  }

  /**
   * @param unit - if a number $i$, the unit is assumed to be the $i$th row
   *   in the provided data.
   * @returns the nearest neighbour(s) of the unit in the provided data.
   */
  findNearestNeighbours(unit: number | number[]): number[] {
    this.tree.findNeighbours(this.store, unit);
    return [...this.store.neighbours];
  }

  /**
   * @param unit - if a number $i$, the unit is assumed to be the $i$th row
   *   in the provided data.
   * @returns the distance to the nearest neighbour(s) of the unit in the
   *   provided data.
   */
  findNearestDistance(unit: number | number[]): number {
    this.tree.findNeighbours(this.store, unit);
    return this.store.minimumDistance();
  }
}
