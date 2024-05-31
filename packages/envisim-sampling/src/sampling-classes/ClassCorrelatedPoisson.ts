import {type Matrix} from '@envisim/matrix';
import {Random} from '@envisim/random';

import {baseOptions} from '../base-options/index.js';
import {BaseSampling} from './ClassBaseSampling.js';

export enum CorrelatedPoissonMethod {
  LCPS,
  SCPS,
  SCPSCOORD,
}

export class CorrelatedPoisson extends BaseSampling {
  setDirect: boolean = false;
  setRandom: boolean = false;

  random: (id: number) => number = this.randomStd;

  method: CorrelatedPoissonMethod;
  randomValues!: number[];

  drawUnit: number = 0;

  constructor(
    method: CorrelatedPoissonMethod,
    probabilities: number[],
    xx: Matrix,
    N: number,
    treeBucketSize: number = baseOptions.treeBucketSize,
    eps: number = baseOptions.eps,
    rand: Random = new Random(),
  ) {
    super(xx, N, treeBucketSize, eps, rand);

    this.setDirect = true;
    this.method = method;

    switch (this.method) {
      case CorrelatedPoissonMethod.LCPS:
        this.draw = this.drawLcps;
        break;
      case CorrelatedPoissonMethod.SCPS:
        this.draw = this.drawScps;
        break;
      case CorrelatedPoissonMethod.SCPSCOORD:
        this.draw = this.drawScpsCoord;
        break;
      default:
        throw new Error('no such CpsMethod');
    }

    this.setDraw = true;

    this.store.prepareWeights();

    this.init(probabilities);

    this.setRandomStd();
  }

  setRandomStd(): void {
    this.random = this.randomStd;
    this.setRandom = true;
  }

  setRandomArr(randArr: number[]): void {
    this.randomValues = randArr;
    this.random = this.randomArr;
    this.setRandom = true;
  }

  randomStd(): number {
    return this.rand.float();
  }

  randomArr(id: number): number {
    return this.randomValues[id];
  }

  drawLcps(): void {
    // Take care of edge cases
    if (this.idx.length() <= 1) {
      if (this.idx.length() === 1) {
        this.drawUnit = this.idx.getId(0);
        return;
      }
      if (this.idx.length() === 0)
        throw new RangeError('trying to find index in empty list');
    }

    let mindist = Number.MAX_VALUE;
    let candidates: number[] = [];

    // Loop through all remaining units.
    // Put the smallest distances in candidates
    for (let i = 0; i < this.idx.length(); i++) {
      const id = this.idx.getId(i);
      this.tree.findNeighboursCps(this.store, this.probabilities, id);
      const dist = this.store.maximumDistance();

      if (dist < mindist) {
        candidates = [id];
        mindist = dist;
      } else if (dist === mindist) {
        candidates.push(id);
      }
    }

    // Choose randomly from the units in candidates
    this.drawUnit = candidates[this.rand.intn(candidates.length)];
  }

  drawScps(): void {
    this.drawUnit = this.idx.draw(this.rand);
  }

  drawScpsCoord(): void {
    while (this.drawUnit < this.N && !this.idx.exists(this.drawUnit))
      this.drawUnit += 1;
  }

  resolve(): void {
    const id1 = this.drawUnit;

    // We need to remove the unit first, so that it is not searching itself
    // in the tree search
    this.eraseUnit(id1);

    // Find all neighbours
    this.tree.findNeighboursCps(this.store, this.probabilities, id1);
    const len = this.store.getSize();

    let slag = this.probabilities[id1];

    if (this.random(id1) < this.probabilities[id1]) {
      slag -= 1.0;
      this.addUnitToSample(id1);
      this.probabilities[id1] = 1.0;
    } else {
      this.probabilities[id1] = 0.0;
    }

    // The weight that remains to be put out to the neighbours
    let remweight = 1.0;

    // Loop through all found neighbours
    // The loop is conducted so that we take equal distance neighbours together
    for (let i = 0; i < len && remweight > this.eps; ) {
      // First we need to find how many neighbours exists on the same distance
      // Initialize totweight to the first neighbour, then search through
      // until the distance differs from this first neighbour
      let totweight = this.store.getWeight(i);

      let j = i + 1;
      for (; j < len; j++) {
        if (this.store.getDistance(i) < this.store.getDistance(j)) break;

        totweight += this.store.getWeight(j);
      }

      // If we only found one nearest neighbour, we resolve this and continue
      if (j - i == 1) {
        const id2 = this.store.neighbours[i];

        // Do not use more than the remaining weight
        const temp = remweight >= totweight ? totweight : remweight;

        this.probabilities[id2] += temp * slag;
        this.resolveUnit(id2);

        i += 1;
        remweight -= temp;
        continue;
      }

      // If we found multiple nearest neighbours
      if (remweight >= totweight) {
        // The remaining weight is larger than the total weight of the nearest neighbours
        // Loop through the nearest neighbours and update their probabilities
        for (; i < j; i++) {
          const id2 = this.store.neighbours[i];
          this.probabilities[id2] += this.store.weights[id2] * slag;
          this.resolveUnit(id2);
        }

        remweight -= totweight;
      } else {
        // The remaining weight is smaller than the total weight of the nearest neighbours
        // We need to sort this list, smallest weights first
        this.store.sortNeighboursByWeight(i, j);

        // Loop through all units, and update their weights
        // No unit can get more than a fair share
        for (; i < j; i++) {
          const id2 = this.store.neighbours[i];
          // Temp contains fair share
          let temp = remweight / (j - i);
          // But we cannot update with more than the assigned weight
          if (this.store.weights[id2] < temp) temp = this.store.weights[id2];

          this.probabilities[id2] += temp * slag;
          this.resolveUnit(id2);
          remweight -= temp;
        }
      }
    }
  }

  run(): void {
    if (this.setRandom !== true) throw new Error('random-type is not set');
    if (this.setDraw !== true) throw new Error('draw-type is not set');

    while (this.idx.length() > 1) {
      this.draw();
      this.resolve();
    }

    if (this.idx.length() === 1) {
      const id = this.idx.getId(0);
      this.probabilities[id] =
        this.random(id) < this.probabilities[id] ? 1.0 : 0.0;
      this.resolveUnit(id);
    }

    this.sample.sort();
  }
}
