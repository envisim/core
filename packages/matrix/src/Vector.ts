import {Random, randomArray} from '@envisim/random';
import {BaseMatrix} from './BaseMatrix.js';
import {Matrix} from './Matrix.js';
import type {ICallbackCompare, ICallbackMap} from './types.js';
import {isInteger} from './utils.js';

abstract class Vector extends BaseMatrix {
  // constructor(arr: number | number[], dim: number, isRow: boolean = false) {
  constructor(arr: number | number[], dim?: number, isRow: boolean = false) {
    let rows = isInteger(dim) ? dim : 1;
    const cols = 1;

    if (typeof arr === 'number') {
      if (isRow === true) super(arr, cols, rows);
      else super(arr, rows, cols);
      return this;
    }

    if (!Array.isArray(arr))
      throw new TypeError('arr must be number or number[]');

    if (dim === undefined) rows = arr.length;

    if (isRow === true) super(arr, cols, rows);
    else super(arr, rows, cols);

    return this;
  }

  /** @returns the number of elements */
  get length() {
    return this._nelements;
  }

  /**
   * @returns `true` if `vec` is an instance {@link TVectorLike}
   * @group Static methods
   * @group Property methods
   */
  static isVector(vec: any): vec is Vector {
    return vec instanceof Vector;
  }

  /**
   * {@inheritDoc Matrix.toMatrix}
   * @group Copy methods
   */
  toMatrix(): Matrix {
    return new Matrix(this._e, this._nrow, this._ncol);
  }

  /**
   * Generates a vector-like of random numbers on [0, 1).
   *
   * @param dim - A `number`, `number[]`, or matrix-like used to determine
   *   the length of the random vector-like.
   * @param seed - A seed used in the random number generator.
   * @returns A vector of random numbers of length determined by `dim`. If `dim`
   *   is `number[]`, the length is `dim.length`. If `dim` is a matrix-like,
   * the length is the same as the number of elements in the matrix-like.
   * @group Static methods
   */
  static createRandom<T extends Vector>(
    this: new (arr: number | number[], dim: number) => T,
    dim: number | number[] | BaseMatrix,
    seed?: string | number,
  ): T {
    let n: number;
    if (BaseMatrix.isBaseMatrix(dim)) {
      n = dim.nelements;
    } else if (Array.isArray(dim)) {
      n = dim.length;
    } else if (typeof dim === 'number') {
      n = dim;
    } else {
      throw new TypeError('nrow not valid type');
    }

    return new this(randomArray(n, seed), n);
  }

  /**
   * Generates a vector-like of a sequence of numbers.
   *
   * @example
   * const seq1 = ColumnVector.createSequence(0, 2, 0.5);
   * // seq1 is a ColumnVector with elements [0.0, 0.5, 1.0, 1.5, 2.0]
   * const seq2 = ColumnVector.createSequence(0, 1.9, 0.5);
   * // seq2 is a ColumnVector with elements [0.0, 0.5, 1.0, 1.5]
   *
   * @param from - The starting number in the sequence.
   * @param to - A number for which the sequence will not generate beyond.
   * @param by - The incrementing (or decrementing) size of the sequence. Must be positive.
   * @returns A vector of size needed to reach `to`, however not going over it.
   * @group Static methods
   */
  static createSequence<T extends Vector>(
    this: new (arr: number | number[], dim: number) => T,
    from: number,
    to: number,
    by: number = 1.0,
  ): T {
    if (by <= 0) throw new RangeError('by must be positive');

    const dim = Math.floor(Math.abs((to - from) / by)) + 1;

    if (dim >= 10000000) throw new RangeError('by is to small');

    const s = new this(0.0, dim);
    let current = from;
    const b = to < from ? -by : by;

    for (let i = 0; i < dim; i++) {
      s.ed(i, current);
      current += b;
    }

    return s;
  }

  /**
   * {@inheritDoc Matrix.mmult}
   * @group Basic operators
   */
  mmult(mat: BaseMatrix): Matrix {
    return new Matrix(this._matrixMultiply(mat), this._nrow, mat.ncol);
  }

  // VECTOR SPECIFIC
  /**
   * @returns the internal array of elements
   * @group Copy methods
   */
  slice(): number[] {
    return this.internal;
  }

  /**
   * Appends {@link TVectorLike}s to the vector.
   * @group Copy methods
   */
  append(...vectors: Vector[]): this {
    const s = BaseMatrix.flatMap(vectors);
    const len = s.length + this._nelements;
    return this.create([...this._e, ...s], {nrow: len, ncol: len});
  }

  /**
   * Prepends {@link TVectorLike}s to the vector.
   * @group Copy methods
   */
  prepend(...vectors: Vector[]): this {
    const s = BaseMatrix.flatMap(vectors);
    const len = s.length + this._nelements;
    return this.create([...s, ...this._e], {nrow: len, ncol: len});
  }

  /**
   * @param fromIndex - the index to start the search at
   * @returns the index of the first occurance of `searchElement`
   * @group Accessors
   * @group Maps
   */
  indexOf(searchElement: number, fromIndex: number = 0): number {
    return this._e.indexOf(searchElement, fromIndex);
  }

  /**
   * @param fromIndex - the index to start the search at
   * @returns the index of the first occurance of `searchElement`, search backwards
   * @group Accessors
   * @group Maps
   */
  lastIndexOf(
    searchElement: number,
    fromIndex: number = this.nelements - 1,
  ): number {
    return this._e.lastIndexOf(searchElement, fromIndex);
  }

  /**
   * @param callbackFn - a function used to test elements in the array
   * @returns the index of the first element passing the test provided by `callbackFn`
   * @group Accessors
   * @group Maps
   */
  findIndex(callbackFn: ICallbackMap<boolean>): number {
    return this._e.findIndex(callbackFn);
  }

  /**
   * Sorts the elements in the {@link TVectorLike} according to `compareFn`
   *
   * `compareFn(a, b)` return value:
   * - `> 0`: sort `a` after `b`
   * - `< 0`: sort `a` before `b`
   * - `=== 0`: keep original order
   *
   * @param compareFn - a function that defines the sort order, being provided
   *   the elements
   * @returns a sorted {@link TVectorLike}
   * @group Maps
   */
  sort(compareFn: ICallbackCompare = (a: number, b: number) => a - b): this {
    const s = this.internal;
    return this.create(s.sort(compareFn), {
      nrow: this._nrow,
      ncol: this._ncol,
    });
  }

  /**
   * `compareFn(a, b)` return value:
   * - `> 0`: sort `a` after `b`
   * - `< 0`: sort `a` before `b`
   * - `=== 0`: keep original order
   *
   * @param compareFn - a function that defines the sort order, being provided
   *   the elements
   * @returns the indices that sorts the {@link TVectorLike}
   * @group Maps
   */
  sortIndex(
    compareFn: ICallbackCompare = (a: number, b: number) =>
      this.at(a) - this.at(b),
  ): number[] {
    const idx = new Array(this._nelements);
    for (let i = 0; i < this._nelements; i++) idx[i] = i;
    return idx.sort(compareFn);
  }

  /**
   * @param inPlace - if `true`, the {@link TVectorLike} is sorted in place.
   * @returns the {@link TVectorLike} with a permutated order
   * @group Maps
   * @group Copy methods
   */
  sortRandom(inPlace: boolean = false, rand: Random = new Random()): this {
    const N = this._nelements;

    if (inPlace === true) {
      for (let i = N - 1; i > 0; i--) {
        const rnd = rand.intn(i + 1);
        if (i !== rnd) this.swap(i, rnd);
      }

      return this;
    }

    const s = this.copy();

    for (let i = N - 1; i > 0; i--) {
      const rnd = rand.intn(i + 1);
      if (i !== rnd) s.swap(i, rnd);
    }

    return s;
  }

  /**
   * @param callbackFn - a {@link ICallbackMap}-function returning true for
   *   elements to be kept in the new {@link TVectorLike}
   * @returns a filtered {@link TVectorLike} according to the provided callbackFn
   * @group Maps
   * @group Copy methods
   */
  filter(callbackFn: ICallbackMap<boolean>): this {
    const s = this.internal;
    const sf = s.filter(callbackFn, s);
    return this.create(sf, {nrow: sf.length, ncol: sf.length});
  }

  /**
   * @returns the cumulative sum of the {@link TVectorLike}
   * @group Statistics
   */
  cumulativeSum(): this {
    const s = this.copy();
    let t = 0.0;
    s.mapInPlace((e) => {
      t += e;
      return t;
    });

    return s;
  }

  /**
   * @returns the covariance of `this` and `vec`
   * @throws `RangeError` if the {@link TVectorLike}s has different sizes
   * @group Statistics
   */
  covariance(vec: Vector): number {
    if (!Vector.isVector(vec) || vec._nelements !== this._nelements)
      throw new RangeError('vec must be a vector of equal size as this');

    return (
      this.subtractScalar(this.mean())
        .multiply(vec.subtractScalar(vec.mean()), true)
        .sum() /
      (this._nelements - 1)
    );
  }

  /**
   * @returns the correlation between `this` and `vec`
   * @throws `RangeError` if the {@link TVectorLike}s has different sizes
   * @group Statistics
   */
  correlation(vec: Vector): number {
    if (!Vector.isVector(vec) || vec._nelements !== this._nelements)
      throw new TypeError('vec must be a vector of equal size as this');

    return this.covariance(vec) / Math.sqrt(this.variance() * vec.variance());
  }

  /**
   * @returns the unique elements
   * @group Maps
   */
  unique(): this {
    return this.filter((v, i, a) => a.indexOf(v) === i).sort();
  }

  /**
   * @returns the unique elements of the union of `this` and `vec`
   * @group Maps
   */
  union(vec: Vector): this {
    return this.append(vec).unique().sort();
  }

  /**
   * @returns the unique elements of the intersect
   * @group Maps
   */
  intersect(vec: Vector): this {
    const s = this.unique()._e;

    for (let i = s.length - 1; i >= 0; i--) {
      if (vec.indexOf(s[i]) < 0) s.splice(i, 1);
    }

    return this.create(s, {nrow: s.length, ncol: s.length}).sort();
  }

  // histogram ? maybe not
}

export {Vector};
