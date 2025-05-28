import { ValidationError } from "@envisim/utils";

export class KdStore {
  N: number = 0;
  maxSize: number = 0;

  neighbours: number[] = [];
  distances: number[] = [];

  totalWeight: number = 0.0;
  weights: number[] = [];

  static isKDStore(t: unknown): t is KdStore {
    return t instanceof KdStore;
  }

  constructor(N: number, maxSize: number) {
    this.init(N, maxSize);
    return this;
  }

  init(N: number, maxSize: number): void {
    this.N = N | 0;
    this.maxSize = maxSize | 0;

    (
      ValidationError.checkNumber("number-not-positive", "N", this.N) ??
      ValidationError.checkNumber("number-not-positive", "maxSize", this.maxSize)
    )?.cast();

    this.distances = new Array<number>(this.N);
  }

  prepareWeights(): void {
    this.weights = new Array<number>(this.N);
  }

  reset(): void {
    this.neighbours = [];
    this.totalWeight = 0.0;
  }

  getSize(): number {
    return this.neighbours.length;
  }

  sizeFulfilled(): boolean {
    return this.neighbours.length >= this.maxSize;
  }

  minimumDistance(): number {
    if (this.neighbours.length === 0) return Number.MAX_VALUE;

    return this.distances[this.neighbours[0]];
  }

  maximumDistance(): number {
    if (this.neighbours.length === 0) return Number.MAX_VALUE;

    return this.distances[this.neighbours[this.neighbours.length - 1]];
  }

  getDistance(it: number): number {
    return this.distances[this.neighbours[it]];
  }

  setDistance(id: number, distance: number): void {
    this.distances[id] = distance;
  }

  getWeight(it: number): number {
    return this.weights[this.neighbours[it]];
  }

  setWeight(id: number, weight: number): void {
    this.weights[id] = weight;
  }

  addUnit(id: number): void {
    this.neighbours.push(id);
  }

  addUnitAndReset(id: number): void {
    this.neighbours = [id];
  }

  fullSortNeighboursByDistance(): void {
    this.neighbours.sort((a: number, b: number) =>
      this.distances[a] < this.distances[b] ? -1 : 1,
    );
  }

  sortNeighboursByDistance(fr: number = 0, to: number = this.neighbours.length): void {
    if (to <= fr || this.neighbours.length < to)
      throw ValidationError.createNumber(
        "number-not-in-interval",
        "to",
        "fr < to <= neighbours.length",
      );
    if (fr === 0 && to === this.neighbours.length) {
      this.fullSortNeighboursByDistance();
      return;
    }

    const arr = this.neighbours
      .slice(fr, to)
      .sort((a: number, b: number) => (this.distances[a] < this.distances[b] ? -1 : 1));

    const n = to - fr;
    for (let i = 0; i < n; i++) this.neighbours[fr + i] = arr[i];
  }

  fullSortNeighboursByWeight(): void {
    this.neighbours.sort((a: number, b: number) => (this.weights[a] < this.weights[b] ? -1 : 1));
  }

  sortNeighboursByWeight(fr: number, to: number): void {
    if (to <= fr || this.neighbours.length < to)
      throw ValidationError.createNumber(
        "number-not-in-interval",
        "to",
        "fr < to <= neighbours.length",
      );
    if (fr === 0 && to === this.neighbours.length) {
      this.fullSortNeighboursByWeight();
      return;
    }

    const arr = this.neighbours
      .slice(fr, to)
      .sort((a: number, b: number) => (this.weights[a] < this.weights[b] ? -1 : 1));

    const n = to - fr;
    for (let i = 0; i < n; i++) this.neighbours[fr + i] = arr[i];
  }
}
