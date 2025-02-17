import {Matrix} from '@envisim/matrix';
import {Random, type RandomGenerator, randomInt} from '@envisim/random';
import {reducedRowEchelonForm, swap} from '@envisim/utils';

import {BASE_OPTIONS} from '../base-options/index.js';
import {KdStore, KdTree} from '../util-classes/index.js';
import {BaseSampling} from './base-sampling.js';

export enum CubeMethod {
  CUBE,
  LCUBE,
}

export class Cube extends BaseSampling {
  setDirect: boolean = false;

  method: CubeMethod;

  pbalance: number = 0;
  amat: number[];
  bmat: number[];
  uvec: number[];
  mIdxR: (r: number, c: number, p?: number) => number;
  mIdxC: (r: number, c: number, n?: number) => number;

  drawUnits: number[] = [];

  constructor(
    method: CubeMethod,
    probabilities: number[],
    xxbalance: Matrix,
    N: number,
    xxspread: Matrix | undefined,
    treeBucketSize: number = BASE_OPTIONS.treeBucketSize,
    eps: number = BASE_OPTIONS.eps,
    rand: RandomGenerator = new Random(),
  ) {
    super(undefined, N, treeBucketSize, eps, rand, false);

    this.setDirect = true;
    this.method = method;
    this.pbalance = xxbalance.ncol;

    switch (this.method) {
      case CubeMethod.CUBE:
        this.draw = this.drawCube;
        break;
      case CubeMethod.LCUBE:
        this.draw = this.drawLcube;
        if (!Matrix.isMatrix(xxspread)) throw new Error('xxspread is not Matrix');
        this.tree = new KdTree(xxspread, treeBucketSize);
        this.store = new KdStore(this.N, this.pbalance);
        break;
    }

    this.setDraw = true;

    this.init(probabilities);

    this.amat = new Array<number>(this.N * this.pbalance);
    this.bmat = new Array<number>((this.pbalance + 1) * this.pbalance);
    this.uvec = new Array<number>(this.pbalance + 1);
    this.mIdxR = (r: number, c: number, p: number = this.pbalance): number => r * p + c;
    this.mIdxC = (r: number, c: number, n: number = this.N): number => c * n + r;

    for (let i = 0; i < this.N; i++)
      for (let k = 0; k < this.pbalance; k++)
        this.amat[this.mIdxC(i, k)] = xxbalance.atDim([i, k]) / this.probabilities[i];
  }

  maxSize(): number {
    const il = this.idx.length();
    return this.pbalance + 1 <= il ? this.pbalance + 1 : il;
  }

  drawCube(): void {
    const maxSize = this.maxSize();
    this.drawUnits.length = 0;

    for (let i = 0; i < maxSize; i++) this.drawUnits.push(this.idx.getId(i));

    return;
  }

  drawLcube(): void {
    // maxSize - 1 since the first unit is drawn at random
    const maxSize = this.maxSize() - 1;
    this.drawUnits.length = 0;

    // Set the first unit
    const id = this.idx.draw(this.rand);
    this.drawUnits.push(id);

    // Prepare the store and run the algorithm
    this.store.maxSize = maxSize;
    this.tree.findNeighbours(this.store, id);
    const size = this.store.getSize();

    // If we have no equal dist units at the end, we can just return the candidates
    if (size === maxSize) {
      for (let i = 0; i < size; i++) this.drawUnits.push(this.store.neighbours[i]);
      return;
    }

    if (size < maxSize) throw new Error('size < maxSize - 1');

    const maximumDistance = this.store.maximumDistance();
    let i = 0;

    // Fill up all the units with distance less than maxdist
    // This algorithm will leave i to be one more than the size of candidates
    // when either maxSize has been filled (shouldn't happen),
    // or when the distance equals the maxdist
    for (; i < maxSize && this.store.getDistance(i) < maximumDistance; i++)
      this.drawUnits.push(this.store.neighbours[i]);

    // Randomly select from the units at the end
    for (; i < maxSize; i++) {
      // Draw a random number from 0 to size - i.
      // If i = 2, size = 5, that means that we have already selected two units
      // and we have 3 more available in the store.
      const k = randomInt(size - 1, this.rand);
      this.drawUnits.push(this.store.neighbours[k + i]);
      if (k !== 0) swap(this.store.neighbours, k + i, i);
    }
  }

  drawLanding(): void {
    const maxSize = this.idx.length();
    this.drawUnits.length = 0;

    for (let i = 0; i < maxSize; i++) {
      const id = this.idx.getId(i);
      this.drawUnits.push(id);
    }
  }

  runUpdate() {
    const maxSize = this.maxSize();
    reducedRowEchelonForm(this.bmat, maxSize - 1, maxSize, this.eps);

    let lambda1 = Number.MAX_VALUE;
    let lambda2 = Number.MAX_VALUE;

    for (let i = 0; i < maxSize; i++) {
      if (i === maxSize - 1) {
        this.uvec[i] = 1.0;
      } else {
        this.uvec[i] = -this.bmat[this.mIdxR(i, maxSize - 1, maxSize)];
      }

      const lval1 = Math.abs(this.probabilities[this.drawUnits[i]] / this.uvec[i]);
      const lval2 = Math.abs((1.0 - this.probabilities[this.drawUnits[i]]) / this.uvec[i]);

      if (this.uvec[i] >= 0.0) {
        if (lambda1 > lval2) lambda1 = lval2;
        if (lambda2 > lval1) lambda2 = lval1;
      } else {
        if (lambda1 > lval1) lambda1 = lval1;
        if (lambda2 > lval2) lambda2 = lval2;
      }
    }

    const lambda = this.rand.random() * (lambda1 + lambda2) < lambda2 ? lambda1 : -lambda2;

    for (let i = 0; i < maxSize; i++) {
      const id = this.drawUnits[i];
      this.probabilities[id] += lambda * this.uvec[i];
      this.resolveUnit(id);
    }
  }

  prepareBMat(): void {
    const maxSize = this.drawUnits.length;
    for (let i = 0; i < maxSize; i++)
      for (let k = 0; k < maxSize - 1; k++)
        this.bmat[this.mIdxR(k, i, maxSize)] = this.amat[this.mIdxC(this.drawUnits[i], k)];
  }

  runFlight(): void {
    if (this.setDraw !== true) throw new Error('draw-type is not set');

    const maxSize = this.maxSize();

    while (this.idx.length() >= maxSize) {
      this.draw();
      this.prepareBMat();
      this.runUpdate();
    }
  }

  runLanding(): void {
    if (this.setDraw !== true) throw new Error('draw-type is not set');

    if (this.idx.length() >= this.pbalance + 1)
      throw new RangeError('landingphase committed early');

    while (this.idx.length() > 1) {
      this.drawLanding();
      this.prepareBMat();
      this.runUpdate();
    }

    if (this.idx.length() === 1) {
      const id = this.idx.getId(0);
      this.probabilities[id] = this.rand.random() < this.probabilities[id] ? 1.0 : 0.0;
      this.resolveUnit(id);
    }
  }

  run(): void {
    if (this.setDraw !== true) throw new Error('draw-type is not set');

    this.runFlight();
    this.runLanding();

    this.sample.sort();
  }
}
