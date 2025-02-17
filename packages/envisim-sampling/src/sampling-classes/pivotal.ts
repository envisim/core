import {type Matrix} from '@envisim/matrix';
import {Random, type RandomGenerator, randomInt} from '@envisim/random';
import {swap} from '@envisim/utils';

import {BASE_OPTIONS} from '../base-options/index.js';
import {IndexList, KdStore, KdTree} from '../util-classes/index.js';
import {arrayBack} from '../utils.js';
import {BaseSampling} from './base-sampling.js';

export enum PivotalMethod {
  LPM1,
  LPM2,
  LPM1SEARCH,
  RPM,
  SPM,
}

export class Pivotal extends BaseSampling {
  setDirect: boolean = false;
  setRun: boolean = false;

  runInternal!: () => void;

  method: PivotalMethod;

  pair: [number, number] = [0, 1];
  history: number[] = [];

  constructor(
    method: PivotalMethod,
    probabilities: number | number[],
    xx: Matrix | undefined,
    N: number,
    treeBucketSize: number = BASE_OPTIONS.treeBucketSize,
    eps: number = BASE_OPTIONS.eps,
    rand: RandomGenerator = new Random(),
  ) {
    super(xx, N, treeBucketSize, eps, rand);

    this.setDirect = true;
    this.method = method;
    this.probabilities = new Array<number>(N);

    switch (this.method) {
      case PivotalMethod.LPM1:
        this.draw = this.drawLpm1;
        break;
      case PivotalMethod.LPM2:
        this.draw = this.drawLpm2;
        break;
      case PivotalMethod.LPM1SEARCH:
        this.draw = this.drawLpm1Search;
        break;
      case PivotalMethod.RPM:
        this.draw = this.drawRpm;
        break;
      case PivotalMethod.SPM:
        this.draw = this.drawSpm;
        break;
      default:
        throw new Error('no such PivotalMethod');
    }

    this.setDraw = true;

    switch (this.method) {
      case PivotalMethod.LPM1:
      case PivotalMethod.LPM2:
      case PivotalMethod.LPM1SEARCH:
        if (!KdTree.isKDTree(this.tree)) throw new Error('KDTree is not set');
        if (!KdStore.isKDStore(this.store)) throw new Error('KDStore is not set');
    }

    if (Array.isArray(probabilities)) {
      this.init(probabilities);
      this.runInternal = this.runDouble;
      this.setRun = true;
    } else if (typeof probabilities === 'number') {
      this.initInt(probabilities);
    } else {
      throw new Error('wrong types of probabilities');
    }
  }

  initInt(probability: number): void {
    if (this.N === 0 || probability === 0) {
      this.idx = new IndexList(0);
    } else if (probability === this.N) {
      this.idx = new IndexList(0);
      for (let i = 0; i < this.N; i++) this.addUnitToSample(i);
    } else {
      this.idx = new IndexList(this.N);
      this.idx.fill();
      this.probabilities.fill(probability);
    }

    this.runInternal = this.runInt;
    this.setRun = true;
  }

  drawLpm1(): void {
    for (;;) {
      this.pair[0] = this.idx.draw(this.rand);
      this.tree.findNeighbours(this.store, this.pair[0]);
      let len = this.store.getSize();

      // We need to reuse the store to check for mutuality, so we put the results
      // in candidates
      const candidates = [...this.store.neighbours];

      for (let i = 0; i < len; ) {
        this.tree.findNeighbours(this.store, candidates[i]);
        const tlen = this.store.getSize();

        let found = false;

        // Loop through, and set if pair[0] was found
        for (let j = 0; j < tlen; j++) {
          if (this.store.neighbours[j] == this.pair[0]) {
            found = true;
            break;
          }
        }

        // If we found something, we look through the next candidate.
        // Otherwise, we discard this candidate.
        if (found) {
          i += 1;
        } else {
          len -= 1;
          candidates[i] = candidates[len];
        }
      }

      // If there are still units in candidates, we select randomly amongst these
      // candidates, and return. Otherwise, we continue looking.
      if (len > 0) {
        this.pair[1] = candidates[randomInt(len, this.rand)];
        return;
      }
    }
  }

  drawLpm2(): void {
    this.pair[0] = this.idx.draw(this.rand);
    this.tree.findNeighbours(this.store, this.pair[0]);
    const k = randomInt(this.store.getSize(), this.rand);
    this.pair[1] = this.store.neighbours[k];

    return;
  }

  drawLpm1Search(): void {
    // Go back in the history and remove units that does not exist
    while (this.history.length > 0) {
      if (this.idx.exists(arrayBack(this.history))) break;

      this.history.pop();
    }

    // If there is no history, we draw a unit at random
    if (this.history.length == 0) this.history.push(this.idx.draw(this.rand));

    for (;;) {
      // Set the first unit to the last in history
      this.pair[0] = arrayBack(this.history);
      // Find this units nearest neighbours
      this.tree.findNeighbours(this.store, this.pair[0]);
      let len = this.store.getSize();

      // We need to reuse the store to check for mutuality, so we put the results
      // in history
      const candidates: number[] = [...this.store.neighbours];

      // Go through all nearest neighbours
      for (let i = 0; i < len; ) {
        // Find the neighbours nearest neighbours
        this.tree.findNeighbours(this.store, candidates[i]);
        const tlen = this.store.getSize();

        let found = false;

        // Check if any of these are the history-unit
        for (let j = 0; j < tlen; j++) {
          if (this.store.neighbours[j] == this.pair[0]) {
            found = true;
            break;
          }
        }

        // If the history-unit exists among the nearest neighbours, we continue
        // to see if any other of the history-units neighbours also are mutual.
        // Otherwise, the history-unit is not among the nearest neighbours,
        // we swap places and continue the search.
        if (found) {
          i += 1;
        } else {
          len -= 1;
          swap(candidates, i, len);
        }
      }

      // If we found one or more mutual neighbours, we select one at random
      if (len > 0) {
        this.pair[1] = candidates[randomInt(len, this.rand)];
        return;
      }

      // If we come here, no mutual neighbours exist

      // We might need to clear the history if the search has been going on for
      // too long. This can probably? happen if there is a long history, and
      // updates has affected previous units.
      if (this.history.length == this.N) {
        this.history = [this.pair[0]];
      }

      // We select a unit at random to become the next history unit, and traverse
      // one step further.
      const k = randomInt(candidates.length, this.rand);
      this.history.push(candidates[k]);
    }
  }

  drawRpm(): void {
    // Draw a unit i at random from 0 to N
    // Draw a unit j at random from 0 to N-1
    // If unit i == j, then set j = N
    this.pair[0] = this.idx.draw(this.rand);
    const len = this.idx.length() - 1;
    this.pair[1] = this.idx.getId(randomInt(len, this.rand));

    if (this.pair[0] == this.pair[1]) this.pair[1] = this.idx.getId(len);

    return;
  }

  drawSpm(): void {
    // If the first unit does no longer exist,
    // set the first unit to be the second unit.
    if (!this.idx.exists(this.pair[0])) {
      this.pair[0] = this.pair[1];

      // Increment by 1 until the unit exists
      // These while-loops are needed as we don't know if any unit was initiated
      // with probabilities 0 or 1
      while (!this.idx.exists(this.pair[0])) {
        this.pair[0] += 1;

        if (this.pair[0] >= this.N) throw new RangeError('invalid value of pair 0');
      }
    }

    this.pair[1] = this.pair[0] + 1;

    // Increment by 1 until the second unit exists
    while (!this.idx.exists(this.pair[1])) {
      this.pair[1] += 1;

      if (this.pair[1] >= this.N) throw new RangeError('invalid value of pair 1');
    }

    return;
  }

  resolveUnitInt(id: number): void {
    if (this.probabilities[id] === 0 || this.probabilities[id] === this.N) {
      this.eraseUnit(id);

      if (this.probabilities[id] === this.N) this.addUnitToSample(id);
    }
  }

  resolveDouble(): void {
    const [id1, id2] = this.pair;

    const psum = this.probabilities[id1] + this.probabilities[id2];

    if (psum > 1.0) {
      if (1.0 - this.probabilities[id2] > this.rand.random() * (2.0 - psum)) {
        this.probabilities[id1] = 1.0;
        this.probabilities[id2] = psum - 1.0;
      } else {
        this.probabilities[id1] = psum - 1.0;
        this.probabilities[id2] = 1.0;
      }
    } else {
      if (this.probabilities[id2] > this.rand.random() * psum) {
        this.probabilities[id1] = 0.0;
        this.probabilities[id2] = psum;
      } else {
        this.probabilities[id1] = psum;
        this.probabilities[id2] = 0.0;
      }
    }

    this.resolveUnit(id1);
    this.resolveUnit(id2);
  }

  runDouble(): void {
    while (this.idx.length() > 1) {
      this.draw();
      this.resolveDouble();
    }

    if (this.idx.length() === 1) {
      const id = this.idx.getId(0);
      this.probabilities[id] = this.rand.random() < this.probabilities[id] ? 1.0 : 0.0;
      this.resolveUnit(id);
    }
  }

  resolveInt(): void {
    const [id1, id2] = this.pair;

    const psum = this.probabilities[id1] + this.probabilities[id2];

    if (psum > this.N) {
      if (this.N - this.probabilities[id2] > randomInt(2 * this.N - psum, this.rand)) {
        this.probabilities[id1] = this.N;
        this.probabilities[id2] = psum - this.N;
      } else {
        this.probabilities[id1] = psum - this.N;
        this.probabilities[id2] = this.N;
      }
    } else {
      if (this.probabilities[id2] > randomInt(psum, this.rand)) {
        this.probabilities[id1] = 0;
        this.probabilities[id2] = psum;
      } else {
        this.probabilities[id1] = psum;
        this.probabilities[id2] = 0;
      }
    }

    this.resolveUnitInt(id1);
    this.resolveUnitInt(id2);
  }

  runInt(): void {
    while (this.idx.length() > 1) {
      this.draw();
      this.resolveInt();
    }

    if (this.idx.length() === 1) {
      const id = this.idx.getId(0);
      this.probabilities[id] = randomInt(this.N, this.rand) < this.probabilities[id] ? this.N : 0;
      this.resolveUnitInt(id);
    }
  }

  run(): void {
    if (this.setRun !== true) throw new Error('run-type is not set');
    if (this.setDraw !== true) throw new Error('draw-type is not set');

    this.runInternal();
    this.sample.sort();
  }
}
