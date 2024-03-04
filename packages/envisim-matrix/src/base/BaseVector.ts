import {Random} from '@envisim/random';

import {BaseMatrix} from './BaseMatrix.js';
import {Matrix} from './Matrix.js';
import {MatrixCallback, MatrixCallbackCompare} from './types.js';

export abstract class BaseVector extends BaseMatrix {
  /**
   * @returns `true` if `mat` is inherited from BaseMatrix
   * @group Static methods
   * @group Property methods
   */
  static isBaseVector(mat: unknown): mat is BaseVector {
    return mat instanceof BaseVector;
  }

  /**
   * @param msg message to pass, defaults to `"Expected BaseVector"`
   * @returns `true` if `obj` is BaseVector
   * @throws TypeError if `obj` is not BaseVector
   * @group Static methods
   * @group Property methods
   */
  static override assert(obj: unknown, msg?: string): obj is BaseVector {
    if (obj instanceof BaseVector) return true;
    throw new TypeError(msg ?? 'Expected BaseVector');
  }

  constructor(arr: number[], nrow: number, ncol: number) {
    super(arr, nrow, ncol);
  }

  abstract create(arr: number[]): BaseVector;
  abstract override copy(): BaseVector;
  abstract override transpose(): BaseVector;

  /**
   * Performs matrix multiplication this * mat
   * @group Basic operators
   */
  mmult(mat: BaseMatrix): Matrix {
    return new Matrix(
      this._matrixMultiply(mat),
      {nrow: this._nrow, ncol: mat.ncol},
      true,
    );
  }

  /**
   * Appends to the vector.
   * @group Copy methods
   */
  append(...vectors: BaseVector[]): BaseVector {
    const s = [...this._e];
    s.push(...vectors.flatMap((vec) => vec.internal));
    return this.create(s);
  }

  /**
   * Prepends to the vector.
   * @group Copy methods
   */
  prepend(...vectors: BaseVector[]): BaseVector {
    const s = vectors.flatMap((vec) => vec.internal);
    s.push(...this._e);
    return this.create(s);
  }

  /**
   * @param fromIndex the index to start the search at
   * @returns the index of the first occurance of `searchElement`
   * @group Accessors
   * @group Maps
   */
  indexOf(searchElement: number, fromIndex: number = 0): number {
    return this._e.indexOf(searchElement, fromIndex);
  }

  /**
   * @param fromIndex the index to start the search at
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
   * @param callback a function used to test elements in the array
   * @returns the index of the first element passing the test provided by `callbackFn`
   * @group Accessors
   * @group Maps
   */
  findIndex(callback: MatrixCallback<boolean>): number {
    return this._e.findIndex(callback);
  }

  /**
   * Sorts the elements according to `compareFn`
   *
   * `compareFn(a, b)` return value:
   * - `> 0`: sort `a` after `b`
   * - `< 0`: sort `a` before `b`
   * - `=== 0`: keep original order
   *
   * @param callback a function that defines the sort order, being provided
   *   the elements
   * @returns a sorted vector
   * @group Maps
   */
  sort(
    callback: MatrixCallbackCompare = (a: number, b: number) => a - b,
  ): BaseVector {
    return this.create(this.slice().sort(callback));
  }

  /**
   * `compareFn(a, b)` return value:
   * - `> 0`: sort `a` after `b`
   * - `< 0`: sort `a` before `b`
   * - `=== 0`: keep original order
   *
   * @param callback a function that defines the sort order, being provided
   *   the elements
   * @returns the indices that sorts the vector
   * @group Maps
   */
  sortIndex(
    callback: MatrixCallbackCompare = (a: number, b: number) =>
      this.at(a) - this.at(b),
  ): number[] {
    const idx = new Array<number>(this._nelements);
    for (let i = 0; i < this._nelements; i++) idx[i] = i;
    return idx.sort(callback);
  }

  /**
   * @param inPlace if `true`, the vector is sorted in place.
   * @returns the vector with a permutated order
   * @group Maps
   * @group Copy methods
   */
  sortRandom(
    inPlace: boolean = false,
    rand: Random = new Random(),
  ): BaseVector {
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
   * @param callback a function returning true for
   *   elements to be kept in the new vector
   * @returns a filtered vector according to the provided callbackFn
   * @group Maps
   * @group Copy methods
   */
  filter(callback: MatrixCallback<boolean>): BaseVector {
    const s = this.slice();
    const sf = s.filter(callback, s);
    return this.create(sf);
  }

  /**
   * @returns the cumulative sum of the {@link TVectorLike}
   * @group Statistics
   */
  cumulativeSum(): BaseVector {
    const s = this.copy();
    let t = 0.0;
    s.map((e) => {
      t += e;
      return t;
    }, true);

    return s;
  }

  /**
   * @returns the covariance of `this` and `vec`
   * @throws `RangeError` if the vectors has different sizes
   * @group Statistics
   */
  covariance(vec: BaseVector): number {
    BaseVector.assert(vec);
    if (vec._nelements !== this._nelements)
      throw new RangeError('vec must be a vector of equal size as this');

    return (
      this.subtract(this.mean())
        .multiply(vec.subtract(vec.mean()), true)
        .sum() /
      (this._nelements - 1)
    );
  }

  /**
   * @returns the correlation between `this` and `vec`
   * @throws `RangeError` if the vectors have different sizes
   * @group Statistics
   */
  correlation(vec: BaseVector): number {
    BaseVector.assert(vec);
    if (vec._nelements !== this._nelements)
      throw new TypeError('vec must be a vector of equal size as this');

    return this.covariance(vec) / Math.sqrt(this.variance() * vec.variance());
  }

  /**
   * @returns the unique elements
   * @group Maps
   */
  unique(): BaseVector {
    return this.filter((v, i) => this._e.indexOf(v) === i).sort();
  }

  /**
   * @returns the unique elements of the union of `this` and `vec`
   * @group Maps
   */
  union(vec: BaseVector): BaseVector {
    return this.append(vec).unique().sort();
  }

  /**
   * @returns the unique elements of the intersect
   * @group Maps
   */
  intersect(vec: BaseVector): BaseVector {
    const s = this.unique()._e;

    for (let i = s.length - 1; i >= 0; i--) {
      if (vec.indexOf(s[i]!) < 0) s.splice(i, 1);
    }

    return this.create(s).sort();
  }
}
