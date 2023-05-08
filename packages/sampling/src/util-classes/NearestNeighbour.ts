import {Matrix, RowVector} from '@envisim/matrix';
import {KDTree} from './KDTree.js';
import {KDStore} from './KDStore.js';

export class NearestNeighbour {
  /**@ignore */
  protected tree: KDTree;
  /**@ignore */
  protected store: KDStore;

  /**
   * Constructs a nearest neighbour searcher, using k-d-trees
   *
   * @param dt - the data to search within.
   * @param bucketSize - the bucket size of the k-d-tree's nodes.
   * @returns a nearest neighbour searcher.
   */
  constructor(dt: Matrix, bucketSize: number = 40) {
    this.tree = new KDTree(dt, bucketSize);
    this.store = new KDStore(dt.nrow, 1);
    return;
  }

  /**
   * @param unit - if a number $i$, the unit is assumed to be the $i$th row
   *   in the provided data.
   * @returns the nearest neighbour(s) of the unit in the provided data.
   */
  findNearestNeighbours(unit: number | RowVector): number[] {
    this.tree.findNeighbours(this.store, unit);
    return [...this.store.neighbours];
  }

  /**
   * @param unit - if a number $i$, the unit is assumed to be the $i$th row
   *   in the provided data.
   * @returns the distance to the nearest neighbour(s) of the unit in the
   *   provided data.
   */
  findNearestDistance(unit: number | RowVector): number {
    this.tree.findNeighbours(this.store, unit);
    return this.store.minimumDistance();
  }
}
