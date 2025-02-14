import {Matrix} from '@envisim/matrix';
import type {RandomGenerator} from '@envisim/random';

import {BASE_OPTIONS} from '../base-options/index.js';
import {IndexList, KdStore, KdTree} from '../util-classes/index.js';
import {probability01, probability1} from '../utils.js';

export abstract class BaseSampling {
  draw!: () => void;
  setDraw: boolean = true;

  N: number;
  eps: number = BASE_OPTIONS.eps;
  rand: RandomGenerator;

  idx!: IndexList;
  tree!: KdTree;
  store!: KdStore;

  probabilities: number[];
  sample: number[] = [];

  constructor(
    xx: Matrix | undefined,
    N: number,
    treeBucketSize: number,
    eps: number,
    rand: RandomGenerator,
    setTree = true,
  ) {
    this.N = N;
    this.eps = eps;
    this.rand = rand;
    this.probabilities = new Array<number>(this.N);

    if (setTree === true && Matrix.isMatrix(xx)) {
      this.tree = new KdTree(xx, treeBucketSize);
      this.store = new KdStore(this.N, 1);
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
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (this.tree) this.tree.removeUnit(id);
  }

  resolveUnit(id: number): void {
    if (probability01(this.probabilities[id], this.eps)) {
      this.eraseUnit(id);

      if (probability1(this.probabilities[id], this.eps)) this.addUnitToSample(id);
    }
  }

  abstract run(): void;
}
