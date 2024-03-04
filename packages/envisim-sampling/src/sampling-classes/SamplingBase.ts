import {Matrix} from '@envisim/matrix';
import type {Random} from '@envisim/random';

import {optionsDefaultEps} from '../types.js';
import {IndexList} from '../util-classes/IndexList.js';
import {KDStore} from '../util-classes/KDStore.js';
import {KDTree} from '../util-classes/KDTree.js';
import {probability01, probability1} from '../utils.js';

export abstract class SamplingBase {
  draw!: () => void;
  setDraw: boolean = true;

  N: number;
  eps: number = optionsDefaultEps;
  rand: Random;

  idx!: IndexList;
  tree!: KDTree;
  store!: KDStore;

  probabilities: number[];
  sample: number[] = [];

  constructor(
    xx: Matrix | undefined,
    N: number,
    treeBucketSize: number,
    eps: number,
    rand: Random,
    setTree = true,
  ) {
    this.N = N;
    this.eps = eps;
    this.rand = rand;
    this.probabilities = new Array<number>(this.N);

    if (setTree === true && Matrix.isMatrix(xx)) {
      this.tree = new KDTree(xx, treeBucketSize);
      this.store = new KDStore(this.N, 1);
    }
  }

  init(probabilities: number[]): void {
    this.idx = new IndexList(this.N);

    for (let i = this.N; i-- > 0; ) {
      this.probabilities[i] = probabilities[i];
      this.idx.setId(i);
      this.resolveUnit(i);
    }
  }

  addUnitToSample(id: number): void {
    this.sample.push(id);
  }

  eraseUnit(id: number): void {
    this.idx.erase(id);

    // Needed like this as tree might be nullptr during landing
    if (this.tree) this.tree.removeUnit(id);
  }

  resolveUnit(id: number): void {
    if (probability01(this.probabilities[id], this.eps)) {
      this.eraseUnit(id);

      if (probability1(this.probabilities[id], this.eps))
        this.addUnitToSample(id);
    }
  }

  abstract run(): void;
}
