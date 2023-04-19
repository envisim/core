import {Matrix} from '@envisim/matrix';
import {Random} from '@envisim/random';
import {optionsDefaultEps} from '../types.js';
import {IndexList} from '../util-classes/IndexList.js';
import {KDStore} from '../util-classes/KDStore.js';
import {KDTree} from '../util-classes/KDTree.js';
import {arrayBack, probability01, probability1, swap} from '../utils.js';

export enum PivotalMethod {
  LPM1,
  LPM2,
  LPM1SEARCH,
  RPM,
  SPM,
}

export class Pivotal {
  setDirect: boolean = false;
  setDraw: boolean = false;
  setRun: boolean = false;

  draw: () => void = () => {};
  runInternal: () => void = () => {};

  method: PivotalMethod;
  N: number;
  eps: number = optionsDefaultEps;
  rand: Random;

  idx!: IndexList;
  tree!: KDTree;
  store!: KDStore;

  probabilities: number[];

  pair: [number, number] = [0, 1];
  history: number[] = [];

  sample: number[] = [];

  constructor(
    method: PivotalMethod,
    probabilities: number | number[],
    xx: Matrix | undefined,
    N: number,
    treeBucketSize: number,
    eps: number = optionsDefaultEps,
    rand: Random = new Random(),
  ) {
    this.setDirect = true;
    this.N = N;
    this.method = method;
    this.eps = eps;
    this.rand = rand;
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

    if (Matrix.isMatrix(xx)) {
      this.tree = new KDTree(xx, treeBucketSize);
      this.store = new KDStore(N, 1);
    }

    switch (this.method) {
      case PivotalMethod.LPM1:
      case PivotalMethod.LPM2:
      case PivotalMethod.LPM1SEARCH:
        if (!KDTree.isKDTree(this.tree)) throw new Error('KDTree is not set');
        if (!KDStore.isKDStore(this.store))
          throw new Error('KDStore is not set');
    }

    if (Array.isArray(probabilities)) {
      this.initDouble(probabilities, N);
    } else if (typeof probabilities === 'number') {
      this.initInt(probabilities, N);
    } else {
      throw new Error('wrong types of probabilities');
    }
  }

  initDouble(probabilities: number[], N: number): void {
    this.idx = new IndexList(N);

    for (let i = N; i-- > 0; ) {
      this.probabilities[i] = probabilities[i];
      this.idx.setId(i);

      if (probability01(this.probabilities[i], this.eps)) {
        this.eraseUnit(i);
        if (probability1(this.probabilities[i], this.eps))
          this.addUnitToSample(i);
      }
    }

    this.runInternal = this.runDouble;
    this.setRun = true;
  }

  initInt(probability: number, N: number): void {
    if (N === 0 || probability === 0) {
      this.idx = new IndexList(0);
      return;
    } else if (probability === N) {
      this.idx = new IndexList(0);
      for (let i = 0; i < N; i++) this.addUnitToSample(i);
      return;
    }

    this.idx = new IndexList(N);
    this.idx.fill();
    this.probabilities.fill(probability);

    this.runInternal = this.runInt;
    this.setRun = true;
  }

  addUnitToSample(id: number): void {
    this.sample.push(id);
  }

  eraseUnit(id: number): void {
    this.idx.erase(id);

    // Needed like this as tree might be nullptr during landing
    if (this.tree) this.tree.removeUnit(id);
  }

  drawLpm1(): void {
    while (true) {
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
        this.pair[1] = candidates[this.rand.intn(len)];
        return;
      }
    }
  }

  drawLpm2(): void {
    this.pair[0] = this.idx.draw(this.rand);
    this.tree.findNeighbours(this.store, this.pair[0]);
    this.pair[1] = this.store.neighbours[this.rand.intn(this.store.getSize())];

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

    while (true) {
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
        this.pair[1] = candidates[this.rand.intn(len)];
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
      const k = this.rand.intn(candidates.length);
      this.history.push(candidates[k]);
    }
  }

  drawRpm(): void {
    // Draw a unit i at random from 0 to N
    // Draw a unit j at random from 0 to N-1
    // If unit i == j, then set j = N
    this.pair[0] = this.idx.draw(this.rand);
    const len = this.idx.length() - 1;
    this.pair[1] = this.idx.getId(this.rand.intn(len));

    if (this.pair[0] == this.pair[1]) this.pair[1] = this.idx.getId(len);

    return;
  }

  drawSpm(): void {
    // If the first unit does no longer exist,
    // set the first unit to be the second unit.
    if (!this.idx.exists(this.pair[0])) {
      this.pair[0] = this.pair[1];

      // If the second unit also doesn't exist, increment by 1
      if (!this.idx.exists(this.pair[0])) {
        this.pair[0] += 1;

        if (this.pair[0] >= this.N)
          throw new RangeError('invalid value of pair 0');
      }
    }

    // If we have changed the first unit to be something bigger than the second,
    // we set the second to be one above the first.
    if (this.pair[0] >= this.pair[1]) {
      this.pair[1] = this.pair[0] + 1;
      return;
    }

    // If the second does no longer exist, increment by 1
    if (!this.idx.exists(this.pair[1])) {
      this.pair[1] += 1;
      if (this.pair[1] >= this.N)
        throw new RangeError('invalid value of pair 1');
    }

    return;
  }

  resolveDouble(): void {
    const [id1, id2] = this.pair;

    const psum = this.probabilities[id1] + this.probabilities[id2];

    if (psum > 1.0) {
      if (1.0 - this.probabilities[id2] > this.rand.float() * (2.0 - psum)) {
        this.probabilities[id1] = 1.0;
        this.probabilities[id2] = psum - 1.0;
      } else {
        this.probabilities[id1] = psum - 1.0;
        this.probabilities[id2] = 1.0;
      }
    } else {
      if (this.probabilities[id2] > this.rand.float() * psum) {
        this.probabilities[id1] = 0.0;
        this.probabilities[id2] = psum;
      } else {
        this.probabilities[id1] = psum;
        this.probabilities[id2] = 0.0;
      }
    }

    if (probability01(this.probabilities[id1], this.eps)) {
      this.eraseUnit(id1);

      if (probability1(this.probabilities[id1], this.eps))
        this.addUnitToSample(id1);
    }

    if (probability01(this.probabilities[id2], this.eps)) {
      this.eraseUnit(id2);

      if (probability1(this.probabilities[id2], this.eps))
        this.addUnitToSample(id2);
    }
  }

  runDouble(): void {
    while (this.idx.length() > 1) {
      this.draw();
      this.resolveDouble();
    }

    if (this.idx.length() === 1) {
      const id1 = this.idx.getId(0);

      if (this.rand.float() < this.probabilities[id1])
        this.addUnitToSample(id1);

      this.eraseUnit(id1);
    }
  }

  resolveInt(): void {
    const [id1, id2] = this.pair;

    const psum = this.probabilities[id1] + this.probabilities[id2];

    if (psum > this.N) {
      if (
        this.N - this.probabilities[id2] >
        this.rand.intn(2 * this.N - psum)
      ) {
        this.probabilities[id1] = this.N;
        this.probabilities[id2] = psum - this.N;
      } else {
        this.probabilities[id1] = psum - this.N;
        this.probabilities[id2] = this.N;
      }
    } else {
      if (this.probabilities[id2] > this.rand.intn(psum)) {
        this.probabilities[id1] = 0;
        this.probabilities[id2] = psum;
      } else {
        this.probabilities[id1] = psum;
        this.probabilities[id2] = 0;
      }
    }

    if (this.probabilities[id1] === 0 || this.probabilities[id1] === this.N) {
      this.eraseUnit(id1);

      if (this.probabilities[id1] === this.N) this.addUnitToSample(id1);
    }

    if (this.probabilities[id2] === 0 || this.probabilities[id2] === this.N) {
      this.eraseUnit(id2);

      if (this.probabilities[id2] === this.N) this.addUnitToSample(id2);
    }
  }

  runInt(): void {
    while (this.idx.length() > 1) {
      this.draw();
      this.resolveInt();
    }

    if (this.idx.length() === 1) {
      const id1 = this.idx.getId(0);

      if (this.rand.intn(this.N) < this.probabilities[id1])
        this.addUnitToSample(id1);

      this.eraseUnit(id1);
    }
  }

  run(): void {
    if (this.setRun !== true) throw new Error('run-type is not set');
    if (this.setDraw !== true) throw new Error('draw-type is not set');

    this.runInternal();
    this.sample.sort();
  }
}
