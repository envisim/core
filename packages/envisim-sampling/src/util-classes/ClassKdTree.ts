import {Matrix, RowVector} from '@envisim/matrix';
import {swap} from '@envisim/utils';

import {KdNode} from './ClassKdNode.js';
import {KdStore} from './ClassKdStore.js';

export class KdTree {
  protected dt: Matrix;
  protected bucketSize: number = 40;
  protected topNode: KdNode;

  protected liml: number[] = [];
  protected limr: number[] = [];
  protected splitUnits: number[];

  static isKDTree(t: any): t is KdTree {
    return t instanceof KdTree;
  }

  constructor(dt: Matrix, bucketSize: number = 40) {
    if (dt.nelements <= 0) throw new TypeError('dt must have elements');

    if (bucketSize < 1) throw new TypeError('bucketSize must be >= 1');

    this.dt = dt;
    this.bucketSize = Math.trunc(bucketSize);

    this.liml = this.dt.colMins().toArray();
    this.limr = this.dt.colMaxs().toArray();

    this.splitUnits = new Array<number>(this.dt.nrow);
    for (let i = 0; i < this.dt.nrow; i++) this.splitUnits[i] = i;

    if (this.dt.nrow <= this.bucketSize) {
      this.topNode = new KdNode(null, true);
      this.topNode.replaceUnits(this.splitUnits, 0, this.dt.nrow);

      return this;
    }

    this.topNode = new KdNode(null, false);
    this.splitNode(this.topNode, 0, this.dt.nrow);

    return this;
  }

  protected splitNode(node: KdNode, fr: number, to: number): void {
    const m = this.splitByMidpointSlide(node, fr, to);

    // Sanity check
    if (m > to) throw new RangeError('(SplitNode) m > to');

    //If m is fr or to, we need to accept all units into the node
    if (m <= fr || m >= to) {
      node.terminal = true;
      node.replaceUnits(this.splitUnits, fr, to);
      return;
    }

    if (m - fr <= this.bucketSize) {
      node.cleft = new KdNode(node, true);
      node.cleft.replaceUnits(this.splitUnits, fr, m);
    } else {
      node.cleft = new KdNode(node, false);
      this.splitNode(node.cleft, fr, m);
    }

    if (to - m <= this.bucketSize) {
      node.cright = new KdNode(node, true);
      node.cright.replaceUnits(this.splitUnits, m, to);
    } else {
      node.cright = new KdNode(node, false);
      this.splitNode(node.cright, m, to);
    }

    return;
  }

  protected splitByMidpointSlide(node: KdNode, fr: number, to: number): number {
    const mins = this.liml.slice();
    const maxs = this.limr.slice();

    // Get current window's limits by traversing up the tree
    for (let par = node; par.parent != null; par = par.parent) {
      if (par.parent.cleft === par) {
        if (par.parent.value < maxs[par.parent.split])
          maxs[par.parent.split] = par.parent.value;
      } else {
        if (par.parent.value > mins[par.parent.split])
          mins[par.parent.split] = par.parent.value;
      }
    }

    // Decide the splitting variable by finding the variable with the largest window
    node.split = 0;
    let spread = maxs[0] - mins[0];

    for (let k = 1; k < this.dt.ncol; k++) {
      const temp = maxs[k] - mins[k];
      if (temp > spread) {
        node.split = k;
        spread = temp;
      }
    }

    // Decide a candidate splitting value
    node.value = (maxs[node.split] + mins[node.split]) * 0.5;

    // If there is no spread in any variable, we shouldn't split more
    if (spread == 0.0) return 0;

    const n = to - fr;
    const dti = this.dt.nrow * node.split;
    let l = 0;
    let r = n;
    let lbig = -Number.MAX_VALUE;
    let rsmall = Number.MAX_VALUE;

    // Sort splitUnits so that we have
    // x <= value is in range [0, l)
    // x > value is in range [r, n)
    // where value is the proposed split
    while (l < r) {
      const temp = this.dt.at(dti + this.splitUnits[fr + l]);

      if (temp <= node.value) {
        l += 1;

        if (temp > lbig) {
          lbig = temp;
          rsmall = -Number.MAX_VALUE;
        }
      } else {
        r -= 1;
        swap(this.splitUnits, fr + l, fr + r);

        if (temp < rsmall) {
          rsmall = temp;
          lbig = Number.MAX_VALUE;
        }
      }
    }

    // If there exists units on both sides of the splitting value
    // we can be satisfied with the proposed split
    if (l > 0 && r < n) return fr + l;

    // Now we have two cases: either
    // (1) all units are <= than the proposed splitting value, or
    // (2) all units are > than the proposed splitting value

    // We start with (2), we need to find all the smallest units, and move
    // the splitting value to these units
    if (l == 0) {
      for (let i = 0; i < n; i++) {
        const temp = this.dt.at(dti + this.splitUnits[fr + i]);
        if (temp === rsmall) {
          swap(this.splitUnits, fr + i, fr + l);

          l += 1;
        }
      }

      // If it turns out that all units had the same value, maximum seperation has
      // been achieved
      if (l == n) return 0;

      // Otherwise, we can accept this candidate split as the splitting values
      node.value = rsmall;
      return fr + l;
    }

    // We continue to the case (1), where we need to find all the biggest units
    // Here, we need to also find the next biggest value, as this will becom the
    // new splitting value.
    if (r == n) {
      rsmall = -Number.MAX_VALUE;

      for (let i = n; i-- > 0; ) {
        const temp = this.dt.at(dti + this.splitUnits[fr + i]);
        if (temp == lbig) {
          r -= 1;

          swap(this.splitUnits, fr + i, fr + r);
        } else {
          if (temp > rsmall) rsmall = temp;
        }
      }

      // If it turns out that all units had the same value, maximum seperation has
      // been achieved
      if (r == 0) return 0;

      // Otherwise, we can accept this candidate split as the splitting values
      node.value = rsmall;
      return fr + r;
    }

    throw new Error('Something went wrong in splitting');
  }

  protected findNode(id: number): KdNode | null {
    let node: KdNode | null = this.topNode;

    while (node != null && !node.terminal)
      node =
        this.dt.atRC(id, node.split) <= node.value ? node.cleft : node.cright;

    return node;
  }

  unitExists(id: number): boolean {
    const node = this.findNode(id);

    if (node == null) throw new Error('node error');

    return node.unitExists(id);
  }

  removeUnit(id: number): void {
    const node = this.findNode(id);

    if (node == null) throw new Error('node error');

    node.removeUnit(id);
  }

  distanceBetweenIds(id1: number, id2: number): number {
    let distance = 0.0;

    for (let k = 0; k < this.dt.ncol; k++) {
      const temp = this.dt.atRC(id1, k) - this.dt.atRC(id2, k);
      distance += temp * temp;
    }

    return distance;
  }

  protected distanceBetweenUnits(u1: RowVector, u2: RowVector): number {
    if (u1.length !== u2.length)
      throw new RangeError('RowVectors does not match');

    let distance = 0.0;

    for (let k = 0; k < u1.length; k++) {
      const temp = u1.at(k) - u2.at(k);
      distance += temp * temp;
    }

    return distance;
  }

  findNeighbours(store: KdStore, id: number | RowVector): void {
    store.reset();

    if (this.topNode == null) throw new Error('topNode is null');

    if (typeof id === 'number') {
      const unit = this.dt.extractRow(id);
      this.traverseNodesForNeighbours(store, id, unit, this.topNode);
      return;
    }

    this.traverseNodesForNeighbours(store, -1, id, this.topNode);
  }

  protected traverseNodesForNeighbours(
    store: KdStore,
    id: number,
    unit: RowVector,
    node: KdNode | null,
  ) {
    if (node == null) throw new Error('node is null');

    if (node.terminal) {
      if (store.maxSize == 1) {
        this.searchNodeForNeighbour1(store, id, unit, node);
        return;
      }

      this.searchNodeForNeighbours(store, id, unit, node);
      return;
    }

    const distance = unit.at(node.split) - node.value;
    const [nextNode1, nextNode2] =
      distance <= 0.0 ? [node.cleft, node.cright] : [node.cright, node.cleft];

    this.traverseNodesForNeighbours(store, id, unit, nextNode1);

    if (
      !store.sizeFulfilled() ||
      distance * distance <= store.maximumDistance()
    )
      this.traverseNodesForNeighbours(store, id, unit, nextNode2);
  }

  protected searchNodeForNeighbour1(
    store: KdStore,
    id: number,
    unit: RowVector,
    node: KdNode,
  ): void {
    const nodeSize = node.getSize();
    // Node is empty, we can skip
    if (nodeSize === 0) return;

    const distFn =
      0 <= id && id < this.dt.nrow
        ? (tid: number): number => this.distanceBetweenIds(id, tid)
        : (tid: number): number =>
            this.distanceBetweenUnits(unit, this.dt.extractRow(tid));

    let currentMinimum = store.minimumDistance();

    for (let i = 0; i < nodeSize; i++) {
      const tid = node.units[i];
      // Skip if it is the same unit
      if (tid == id) continue;

      const distance = distFn(tid);

      if (distance < currentMinimum) {
        store.addUnitAndReset(tid);
        store.setDistance(tid, distance);
        currentMinimum = distance;
      } else if (distance === currentMinimum) {
        store.addUnit(tid);
        store.setDistance(tid, distance);
      }
    }
  }

  protected searchNodeForNeighbours(
    store: KdStore,
    id: number,
    unit: RowVector,
    node: KdNode,
  ): void {
    const nodeSize = node.getSize();
    // Node is empty, we can skip
    if (nodeSize === 0) return;

    const distFn =
      0 <= id && id < this.dt.nrow
        ? (tid: number): number => this.distanceBetweenIds(id, tid)
        : (tid: number): number =>
            this.distanceBetweenUnits(unit, this.dt.extractRow(tid));

    const originalSize = store.getSize();
    const originalFulfilled = store.sizeFulfilled();
    const currentMaximum = store.maximumDistance();
    let nodeMinimum = Number.MAX_VALUE;
    // If we're full, set the nodeMax to currentMax, as we don't need to consider
    // units with larger distances. Otherwise, we set the nodeMax to 0.0
    let nodeMaximum = originalFulfilled ? currentMaximum : 0.0;

    // Search through all units in the node, and store the distances
    for (let i = 0; i < nodeSize; i++) {
      const tid = node.units[i];
      // Skip if it is the same unit
      if (tid === id) continue;

      const distance = distFn(tid);

      // If we have a unit with distance larger than the nodeMax,
      // we continue if we're full,
      // if we're not full, we will add this unit and set the nodeMax to this new
      // distance.
      // If we were full before starting, we will just skip any units that are not
      // of interest. If we were not full before starting, we will add the first
      // units to fill up the size, after that we will only add units which are
      // smaller than the largest unit of these first added.
      if (distance > nodeMaximum) {
        if (store.sizeFulfilled()) continue;
        else nodeMaximum = distance;
      }

      store.setDistance(tid, distance);
      store.addUnit(tid);

      if (distance < nodeMinimum) nodeMinimum = distance;
    }

    const storeSize = store.getSize();

    // If we didn't add any units from this node, we have nothing to process
    if (storeSize === originalSize) return;

    // We now have two possibilities
    // - The node minimum is smaller than the current minimum
    // - The node minimum is larger than the current maximum
    // - The node minimum is somewhere inbetween
    let i;
    if (originalSize === 0 || nodeMinimum < store.minimumDistance()) {
      i = 0;
      // } else if (nodeMinDistance >= currentMaxDistance) {
      //   i = originalSize;
    } else {
      for (i = originalSize; i-- > 0; ) {
        if (nodeMinimum >= store.getDistance(i)) break;
      }

      i += 1;
    }

    // Sort the range [i, neighbours.size())
    store.sortNeighboursByDistance(i, storeSize);

    // When this loop breaks, we have an i that is at least as large as needed
    // 'i' will then be the smallest unit that is not to be included
    for (i += 1; i < storeSize; i++) {
      if (i < store.maxSize) continue;
      if (store.getDistance(i - 1) < store.getDistance(i)) break;
    }

    store.neighbours.splice(i);
    return;
  }

  findNeighboursCps(store: KdStore, probabilities: number[], id: number): void {
    store.reset();

    if (this.topNode == null) throw new Error('topNode is null');

    this.traverseNodesForNeighboursCps(store, probabilities, id, this.topNode);
  }

  protected traverseNodesForNeighboursCps(
    store: KdStore,
    probabilities: number[],
    id: number,
    node: KdNode | null,
  ): void {
    if (node == null) throw new Error('node is null');

    if (node.terminal) {
      this.searchNodeForNeighboursCps(store, probabilities, id, node);
      return;
    }

    const distance = this.dt.atRC(id, node.split) - node.value;
    const [nextNode1, nextNode2] =
      distance <= 0.0 ? [node.cleft, node.cright] : [node.cright, node.cleft];

    this.traverseNodesForNeighboursCps(store, probabilities, id, nextNode1);

    if (
      store.totalWeight < 1.0 ||
      distance * distance <= store.maximumDistance()
    )
      this.traverseNodesForNeighboursCps(store, probabilities, id, nextNode2);
  }

  protected searchNodeForNeighboursCps(
    store: KdStore,
    probabilities: number[],
    id: number,
    node: KdNode,
  ): void {
    const nodeSize = node.getSize();
    // Node is empty, we can skip
    if (nodeSize === 0) return;

    const originalSize = store.getSize();
    const originalFulfilled = store.totalWeight >= 1.0;
    const currentMaximum = store.maximumDistance();
    let nodeMinimum = Number.MAX_VALUE;
    // If we're full, set the nodeMax to currentMax, as we don't need to consider
    // units with larger distances. Otherwise, we set the nodeMax to 0.0
    let nodeMaximum = originalFulfilled ? currentMaximum : 0.0;
    let nodeWeight = store.totalWeight;

    // Search through all units in the node, and store the distances
    for (let i = 0; i < nodeSize; i++) {
      const tid = node.units[i];
      // Skip if it is the same unit
      if (tid === id) continue;

      const distance = this.distanceBetweenIds(id, tid);

      // If we have a unit with distance larger than the nodeMax,
      // we continue if we're full,
      // if we're not full, we will add this unit and set the nodeMax to this new
      // distance.
      // If we were full before starting, we will just skip any units that are not
      // of interest. If we were not full before starting, we will add the first
      // units to fill up the size, after that we will only add units which are
      // smaller than the largest unit of these first added.
      if (distance > nodeMaximum) {
        if (nodeWeight >= 1.0) continue;
        else nodeMaximum = distance;
      }

      const weight =
        probabilities[id] + probabilities[tid] <= 1.0
          ? probabilities[tid] / (1.0 - probabilities[id])
          : (1.0 - probabilities[tid]) / probabilities[id];
      nodeWeight += weight;

      store.setDistance(tid, distance);
      store.setWeight(tid, weight);
      store.addUnit(tid);

      if (distance < nodeMinimum) nodeMinimum = distance;
    }

    const storeSize = store.getSize();

    // If we didn't add any units from this node, we have nothing to process
    if (storeSize === originalSize) return;

    // We now have two possibilities
    // - The node minimum is smaller than the current minimum
    // - The node minimum is larger than the current maximum
    // - The node minimum is somewhere inbetween
    let i;
    if (originalSize === 0 || nodeMinimum < store.getDistance(0)) {
      i = 0;
      store.totalWeight = 0.0;
      // } else if (nodeMinDistance >= currentMaxDistance) {
      //   i = originalSize;
    } else {
      for (i = originalSize; i-- > 0; ) {
        if (nodeMinimum >= store.getDistance(i)) break;

        store.totalWeight -= store.getWeight(i);
      }

      i += 1;
      // "i" is now pointing to the biggest unit removed from totalWeight
      // Remember that the loop must have been break:ed, since otherwise
      // it would have chosen the other if-else path
    }

    // Sort the range [i, neighbours.size())
    store.sortNeighboursByDistance(i, storeSize);

    // When this loop breaks, we have an i that is at least as large as needed
    // 'i' will then be the smallest unit that is not to be included
    let prevDist = i === 0 ? -1.0 : store.getDistance(i - 1);
    while (i < storeSize) {
      const thisDist = store.getDistance(i);
      if (store.totalWeight >= 1.0 && prevDist < thisDist) break;

      prevDist = thisDist;
      store.totalWeight += store.getWeight(i);
      i += 1;
    }

    store.neighbours.splice(i);
    return;
  }
}
