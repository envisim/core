import {
  MatrixCallback,
  MatrixCallbackRC,
  MatrixIterator,
  MatrixIteratorReturn,
} from './types.js';

const mathMethods1 = [
  'abs',
  'acos',
  'acosh',
  'asin',
  'asinh',
  'atan',
  'atanh',
  'cbrt',
  'ceil',
  'cos',
  'cosh',
  'exp',
  'expm1',
  'floor',
  'fround',
  'log',
  'log10',
  'log1p',
  'log2',
  'round',
  'sign',
  'sin',
  'sinh',
  'sqrt',
  'tan',
  'tanh',
  'trunc',
] as const;
const mathMethods2 = ['max', 'min', 'pow'] as const;

type TMathMethods =
  | (typeof mathMethods1)[number]
  | (typeof mathMethods2)[number];

export abstract class BaseMatrix {
  /**
   * @returns `true` if `mat` is inherited from BaseMatrix
   * @group Static methods
   * @group Property methods
   */
  static isBaseMatrix(mat: unknown): mat is BaseMatrix {
    return mat instanceof BaseMatrix;
  }

  static assert(obj: unknown, msg?: string): obj is BaseMatrix {
    if (obj instanceof BaseMatrix) return true;
    throw new TypeError(msg ?? 'Expected BaseMatrix');
  }

  /** @internal */
  protected _e: number[];
  /** @internal */
  protected _nrow: number;
  /** @internal */
  protected _ncol: number;
  /** @internal */
  protected _nelements: number = 1;

  /** Abstract base class */
  constructor(arr: number | number[], nrow: number, ncol: number) {
    if (!Number.isInteger(nrow) || nrow <= 0)
      throw new TypeError('nrow must be positive integer');
    if (!Number.isInteger(ncol) || ncol <= 0)
      throw new TypeError('ncol must be positive integer');

    this._nrow = nrow;
    this._ncol = ncol;
    this._nelements = nrow * ncol;

    if (typeof arr === 'number') {
      this._e = new Array<number>(nrow * ncol).fill(arr);
      return;
    }

    if (
      !Array.isArray(arr) ||
      arr.length === 0 ||
      arr.some((e) => typeof e !== 'number')
    )
      throw new TypeError(
        'arr is neither number or an non-empty array of numbers',
      );

    if (this._nelements !== arr.length)
      throw new TypeError('the dimensions and arr does not match');

    this._e = arr;
  }

  abstract copy(): BaseMatrix;
  abstract transpose(): BaseMatrix;
  abstract mmult(mat: BaseMatrix): BaseMatrix;

  /**
   * @internal
   * @returns the internal array of elements (stored column-row)
   */
  get internal(): number[] {
    return this._e;
  }
  /**
   * {@inheritDoc internal}
   * @group Accessors
   */
  toArray(): number[] {
    return this._e.slice();
  }
  /**
   * {@inheritDoc internal}
   * @group Accessors
   */
  slice(): number[] {
    return this._e.slice();
  }
  /**
   * @returns the number of rows
   */
  get nrow(): number {
    return this._nrow;
  }
  /**
   * @returns the number of columns
   */
  get ncol(): number {
    return this._ncol;
  }
  /**
   * @returns the number of elements
   */
  get nelements(): number {
    return this._nelements;
  }
  /**
   * @returns the number of elements
   */
  get length(): number {
    return this._nelements;
  }

  /**
   * @returns the size as an array with elements {@link nrow} and {@link ncol}
   */
  size(): [number, number] {
    return [this._nrow, this._ncol];
  }

  /**
   * @returns `true` if the matrix is a square
   * @group Property methods
   */
  isSquare(): boolean {
    return this._nrow === this._ncol;
  }

  /**
   * @returns `true` if `this` has the same size as `mat`
   * @group Property methods
   */
  hasSizeOf(mat: BaseMatrix): boolean {
    return this._nrow === mat._nrow && this._ncol === mat._ncol;
  }

  /**
   * @returns `true` if `this` is exactly equal to `mat`
   * @group Basic operators
   */
  isEqualTo(mat: BaseMatrix): boolean {
    if (!this.hasSizeOf(mat)) return false;
    return this._e.every((e, i) => e === mat._e[i]);
  }

  /**
   * @returns `true` if `this` and `mat` has same size, and the elements does
   * not differ more than `eps`.
   * @group Basic operators
   */
  isCloseTo(mat: BaseMatrix, eps: number = 1e-9): boolean {
    if (!this.hasSizeOf(mat)) return false;
    return this._e.every((e, i) => e - eps < mat._e[i] && mat._e[i] < e + eps);
  }

  /**
   * @param index if `index < 0`, `index + .length` is accessed.
   * @returns the element at matrix `index`
   * @group Accessors
   */
  at(index: number): number {
    if (index < -this._nelements || index >= this._nelements)
      throw new RangeError('index is not in range');
    return this._e.at(index) as number;
  }

  /**
   * Changes the element at matrix `index` to `value`
   * @param index if `index < 0`, `index + .length` is accessed.
   * @returns `value`
   * @throws `RangeError` if `index` is not in range
   * @group Accessors
   */
  ed(index: number, value: number): number {
    if (index >= this._nelements) throw new RangeError('index is not in range');

    if (index < 0) {
      if (index < -this._nelements)
        throw new RangeError('index is not in range');
      index += this._nelements;
    }

    this._e[index] = value;
    return value;
  }

  /**
   * Changes the element at matrix `index` through a callback function.
   *
   * @example
   * const mat = new Matrix(0, 2, 2);
   * // [ 0, 0,
   * //   0, 0 ]
   * mat.edRC(3, (el, in) => el + in);
   * // [ 0, 0,
   * //   0, 3 ]
   *
   * @returns the result of `callback`
   * @throws `RangeError` if `index` is not in range
   * @group Accessors
   */
  fn(index: number, callback: MatrixCallback): number {
    if (index >= this._nelements) throw new RangeError('index is not in range');

    if (index < 0) {
      if (index < -this._nelements)
        throw new RangeError('index is not in range');
      index += this._nelements;
    }

    const value = callback(this._e[index], index);
    this._e[index] = value;
    return value;
  }

  /**
   * @returns the element at `row`, `column`
   * @throws `RangeError` if `row`, `column` is not in range
   * @group Accessors
   */
  atRC(row: number, column: number): number {
    const idx = this.indexOfRc(row, column);
    return this.at(idx);
  }
  /**
   * @returns the element at `row`, `column`
   * @throws `RangeError` if `row`, `column` is not in range
   * @group Accessors
   */
  edRC(row: number, column: number, value: number): number {
    const idx = this.indexOfRc(row, column);
    return this.ed(idx, value);
  }
  /**
   * @returns the element at `index`
   * @throws `RangeError` if `row`, `column` is not in range
   * @group Accessors
   */
  fnRC(
    row: number,
    column: number,
    callback: MatrixCallbackRC<number>,
  ): number {
    const idx = this.indexOfRc(row, column);
    return this.fn(idx, (e, i) => callback(e, i, row, column));
  }

  /**
   * @returns the row index of the matrix `index`
   * @throws `RangeError` if `index` is not in range
   * @group Accessors
   */
  rowOfIndex(index: number): number {
    if (index >= this._nelements) throw new RangeError('index is not in range');

    if (index < 0) {
      if (index < -this._nelements)
        throw new RangeError('index is not in range');
      index += this._nelements;
    }

    return this._nrow === 1 ? 0 : index % this._nrow;
  }

  /**
   * @returns the column index of the matrix `index`
   * @throws `RangeError` if `index` is not in range
   * @group Accessors
   */
  colOfIndex(index: number): number {
    if (index >= this._nelements) throw new RangeError('index is not in range');

    if (index < 0) {
      if (index < -this._nelements)
        throw new RangeError('index is not in range');
      index += this._nelements;
    }

    return this._ncol === 1 ? 0 : (index / this._nrow) | 0;
  }

  /**
   * @returns an array `[row, column]`
   * @group Accessors
   */
  rcOfIndex(index: number): [number, number] {
    return [this.rowOfIndex(index), this.colOfIndex(index)];
  }

  /**
   * @returns the matrix index at `row`, `column`
   * @throws `RangeError` if `row` or `column` is not in range
   * @group Accessors
   */
  indexOfRc(row: number, column: number): number {
    if (row < 0 || row >= this._nrow)
      throw new RangeError('row is not in range');
    if (column < 0 || column >= this._ncol)
      throw new RangeError('column is not in range');

    return row + column * this._nrow;
  }

  /**
   * Swaps the elements at the provided indexes
   *
   * @throws `RangeError` if `index` is not in range
   * @group Accessors
   */
  swap(index1: number, index2: number): void {
    if (index1 === index2) return;

    const tmp = this.at(index1);
    this.ed(index1, this.at(index2));
    this.ed(index2, tmp);
  }

  /**
   * Swaps the elements at the provided row-columns
   *
   * @throws `RangeError` if `row`s or `column`s is not in range
   * @group Accessors
   */
  swapRC(row1: number, column1: number, row2: number, column2: number): void {
    const index1 = this.indexOfRc(row1, column1);
    const index2 = this.indexOfRc(row2, column2);
    if (index1 === index2) return;

    const tmp = this.at(index1);
    this.ed(index1, this.at(index2));
    this.ed(index2, tmp);

    return;
  }

  /**
   * Executes the provided function once for each element
   * @group Maps
   */
  forEach(callback: MatrixCallback<void>): void {
    this._e.forEach(callback);
  }

  /**
   * @returns a new {@link TMatrixLike}, where each element has been mapped
   * through the callback function.
   * @group Maps
   */
  map(callback: MatrixCallback<number>, inPlace: boolean = false): this {
    if (inPlace === true) {
      this._e.map(callback);
      return this;
    }

    return this.copy().map(callback, false) as this;
  }

  /**
   * Executes a user-supplied "reducer" callback function on each element, in
   * order, passing in the return value from the calculation on the preceding
   * element. The final result of running the reducer across all elements is a
   * single value.
   * @group Maps
   */
  reduce(
    callback: (
      previousValue: number,
      currentValue: number,
      currentIndex: number,
    ) => number,
    initialValue: number = 0.0,
  ): number {
    return this._e.reduce(callback, initialValue);
  }

  /**
   * Tests whether all elements pass the test implemented by the provided function
   * @group Maps
   */
  every(callbackFn: MatrixCallback<boolean>): boolean {
    return this._e.every(callbackFn);
  }

  /**
   * Tests whether any element pass the test implemented by the provided function
   * @group Maps
   */
  some(callbackFn: MatrixCallback<boolean>): boolean {
    return this._e.some(callbackFn);
  }

  /**
   * @see {@link iterator}
   * @group Iterators
   */
  [Symbol.iterator](): MatrixIterator {
    return this.iterator();
  }

  /**
   * Returns iterables:
   * - `.next()` returns the next value of the {@link TMatrixLike}, until `done`,
   * - `.cont()` returns the next value of the {@link TMatrixLike}, and loops around at the end.
   * - `.reset()` resets the pointer to the first element
   * @group Iterators
   */
  iterator(): MatrixIterator {
    const returnObj = (index: number) => {
      return {
        done: false,
        value: this.at(index),
        index,
        row: this.rowOfIndex(index),
        col: this.colOfIndex(index),
      };
    };

    let i = 0;

    return {
      next: (): MatrixIteratorReturn => {
        if (i < this._nelements) {
          return returnObj(i++);
        }

        return {done: true, value: NaN, index: -1, row: -1, col: -1};
      },
      cont: (): MatrixIteratorReturn => {
        if (i >= this._nelements) i = 0;
        return returnObj(i++);
      },
      reset: (): void => {
        i = 0;
      },
    };
  }

  /**
   * Matrix addition.
   *
   * @param inPlace - If `true`, performes the operation in place.
   * @group Basic operators
   */
  add(value: number, inPlace?: boolean): this;
  add(mat: BaseMatrix, inPlace?: boolean): this;
  add(mat: number | BaseMatrix, inPlace: boolean = false): this {
    let fn: MatrixCallback<number>;
    if (typeof mat === 'number') fn = (e: number) => e + mat;
    else if (this.hasSizeOf(mat)) fn = (e: number, i: number) => e + mat.at(i);
    else throw new TypeError('mat must be of same size as this');

    return this.map(fn, inPlace);
  }

  /**
   * Matrix subtraction.
   *
   * @param inPlace If `true`, performes the operation in place.
   * @group Basic operators
   */
  subtract(value: number, inPlace?: boolean): this;
  subtract(mat: BaseMatrix, inPlace?: boolean): this;
  subtract(mat: number | BaseMatrix, inPlace: boolean = false): this {
    let fn: MatrixCallback<number>;
    if (typeof mat === 'number') fn = (e: number) => e - mat;
    else if (this.hasSizeOf(mat)) fn = (e: number, i: number) => e - mat.at(i);
    else throw new TypeError('mat must be of same size as this');

    return this.map(fn, inPlace);
  }

  /**
   * Element wise division.
   *
   * @param inPlace If `true`, performes the operation in place.
   * @group Basic operators
   */
  divide(value: number, inPlace?: boolean): this;
  divide(mat: BaseMatrix, inPlace?: boolean): this;
  divide(mat: number | BaseMatrix, inPlace: boolean = false): this {
    let fn: MatrixCallback<number>;
    if (typeof mat === 'number') fn = (e: number) => e / mat;
    else if (this.hasSizeOf(mat)) fn = (e: number, i: number) => e / mat.at(i);
    else throw new TypeError('mat must be of same size as this');

    return this.map(fn, inPlace);
  }

  /**
   * Element wise multiplication.
   *
   * @param inPlace If `true`, performes the operation in place.
   * @group Basic operators
   */
  multiply(value: number, inPlace?: boolean): this;
  multiply(mat: BaseMatrix, inPlace?: boolean): this;
  multiply(mat: number | BaseMatrix, inPlace: boolean = false): this {
    let fn: MatrixCallback<number>;
    if (typeof mat === 'number') fn = (e: number) => e * mat;
    else if (this.hasSizeOf(mat)) fn = (e: number, i: number) => e * mat.at(i);
    else throw new TypeError('mat must be of same size as this');

    return this.map(fn, inPlace);
  }

  /**
   * Element wise remainder (%) `x % y`
   *
   * @param inPlace If `true`, performes the operation in place.
   * @group Basic operators
   */
  mod(value: number, inPlace?: boolean): this;
  mod(mat: BaseMatrix, inPlace?: boolean): this;
  mod(mat: number | BaseMatrix, inPlace: boolean = false): this {
    let fn: MatrixCallback<number>;
    if (typeof mat === 'number') fn = (e: number) => e % mat;
    else if (this.hasSizeOf(mat)) fn = (e: number, i: number) => e % mat.at(i);
    else throw new TypeError('mat must be of same size as this');

    return this.map(fn, inPlace);
  }

  /**
   * Element wise math operations:
   *
   * @param method The `Math` method to perform
   * @param arg a second argument to pass for methods `max`, `min`, and `pow`
   * @param inPlace If `true`, performes the operation in place.
   * @group Basic operators
   */
  math(method: TMathMethods, arg: number = 0, inPlace: boolean = false): this {
    if (method in mathMethods1) {
      return this.map(Math[method], inPlace);
    } else if (method in mathMethods2) {
      return this.map((e) => Math[method](e, arg), inPlace);
    }

    throw new TypeError('method does not match any supported method in Math.');
  }

  /**
   * Sums all elements
   * @group Statistics
   */
  sum(): number {
    return this.reduce((s, e) => s + e, 0.0);
  }

  /**
   * Multiplies all elements
   * @group Statistics
   */
  prod(): number {
    return this.reduce((s, e) => s * e, 1.0);
  }

  /**
   * Minimum value of all elements
   * @group Statistics
   */
  min(): number {
    return Math.min(...this._e);
  }

  /**
   * Maximum value of all elements
   * @group Statistics
   */
  max(): number {
    return Math.max(...this._e);
  }

  /**
   * Mean value of all elements
   * @group Statistics
   */
  mean(): number {
    return this.sum() / this._nelements;
  }

  /**
   * Variance of all elements. Denominator (n-1).
   * @group Statistics
   */
  variance(): number {
    let s1 = 0.0;
    let s2 = 0.0;

    this.forEach((v) => {
      s1 += v;
      s2 += Math.pow(v, 2);
    });

    return (s2 - (s1 * s1) / this._nelements) / (this._nelements - 1);
  }

  /**
   * Standard deviation of all elements. Denominator (n-1).
   * @group Statistics
   */
  sd(): number {
    return Math.sqrt(this.variance());
  }

  /**
   * Geometric mean
   * @group Statistics
   */
  geometricMean(): number {
    return Math.exp(this.math('log').mean());
  }

  /**
   * Mode, the value that appears most often
   *
   * @returns An array with the mode(s)
   * @group Statistics
   */
  mode(): number[] {
    const s = new Map();

    this.forEach((e) => {
      s.set(e, (s.get(e) ?? 0) + 1);
    });

    let max = -Infinity;
    let modes: number[] = [];

    s.forEach((count: number, value: number) => {
      if (count > max) {
        max = count;
        modes = [value];
      } else if (count === max) {
        modes.push(value);
      }
    });

    return modes;
  }

  // * $$ x_{\lfloor Np \rfloor}+ (Np - \lfloor Np \rfloor) (x_{\lceil Np \rceil} - x_{\lfloor Np \rfloor}) $$
  /**
   * Quantile estimates as
   * $$ x_\{\lfloor Np \rfloor\}+ (Np - \lfloor Np \rfloor) (x_\{\lceil Np \rceil\} - x_\{\lfloor Np \rfloor\}) $$
   * where $N$ is the size of the {@link TMatrixLike}, and $p$ the quantile.
   *
   * @param probs - the quantiles to evaluate
   * @returns the quantiles of all the elements
   * @group Statistics
   */
  quantiles(probs: number | number[] | BaseMatrix): number[] {
    let p: number[] = [];

    if (typeof probs === 'number') {
      if (0.0 <= probs && probs <= 1.0) p = [probs];
      else return [NaN];
    } else {
      p = (BaseMatrix.isBaseMatrix(probs) ? probs._e : probs).map((v) =>
        0.0 <= v && v <= 1.0 ? v : NaN,
      );
    }

    if (p.length === 0) return [];

    const s = this.slice().sort((a: number, b: number) => a - b);
    const res = new Array<number>(p.length);
    const n = s.length;
    let unit: number;
    let low: number;
    let high: number;

    for (let i = 0; i < p.length; i++) {
      if (Number.isNaN(p[i])) {
        res[i] = NaN;
        continue;
      }

      unit = p[i] * n - 1.0;
      low = Math.floor(unit);
      high = Math.ceil(unit);
      res[i] = s[low] + (unit - low) * (s[high] - s[low]);
    }

    return res;
  }

  /**
   * Median
   * @group Statistics
   */
  median(): number {
    const s = this.slice().sort((a, b) => a - b);
    let n = s.length;

    if ((n & 1) === 1) return s[(n - 1) >> 1];

    n = n >> 1;
    return (s[n] + s[n - 1]) * 0.5;
  }

  /**
   * Skewness
   * @group Statistics
   */
  skewness(): number {
    const xm = this.subtract(this.mean(), false);
    return xm.math('pow', 3).mean() / Math.pow(xm.math('pow', 2).mean(), 1.5);
  }

  /**
   * Standardizes or normalizes the matrix
   * - if `normalize` is `true`: normalizes the values by `(x-min)/(max-min)`
   * - otherwise: standardizes the values by `(x - mu)/sigma`
   *
   * @group Statistics
   */
  standardize(normalize: boolean = false, inPlace: boolean = false): this {
    let offset: number;
    let denom: number;

    if (normalize === true) {
      offset = this.min();
      denom = this.max() - offset;
    } else {
      offset = this.mean();
      denom = this.sd();
    }

    return this.map((v) => (v - offset) / denom, inPlace);
  }

  /**
   * @param digits the number of digits to appear after the decimal point
   * @param pretty `true` if the output should be prettyfied
   * @returns a string representation
   * @group Accessors
   */
  toString(digits: number = 2, pretty: boolean = false): string {
    let str = '[';

    if (pretty === true) {
      const maxLen = new Array(this._ncol).fill(0);
      const vals = this._e.map((v) => v.toFixed(digits));
      maxLen.forEach((_, c) => {
        maxLen[c] = Math.max(
          0,
          ...vals
            .slice(c * this._nrow, (c + 1) * this._nrow)
            .map((e) => e.length),
        );
      });

      str += '\n';
      for (let r = 0; r < this._nrow; r++) {
        for (let c = 0; c < this._ncol; c++) {
          str += vals[c * this._nrow + r].padStart(maxLen[c] + 1);
        }
        str += '\n';
      }
    } else {
      const vals = this.transpose()._e.map((v) => v.toFixed(digits));
      for (let r = 0; r < this._nrow; r++) {
        str +=
          '[' +
          vals.slice(r * this._ncol, (r + 1) * this._ncol).join(',') +
          '],';
      }
      str = str.slice(0, -1);
    }

    return str + ']';
  }

  /** @ignore */
  protected _matrixMultiply(mat: BaseMatrix): number[] {
    BaseMatrix.assert(mat);
    if (this._ncol !== mat._nrow)
      throw new RangeError('Dimensions of matrices does not match');

    const s = new Array(this._nrow * mat._ncol);

    for (let r = 0; r < this._nrow; r++) {
      for (let c = 0; c < mat._ncol; c++) {
        let t = 0.0;

        for (let i = 0; i < this._ncol; i++) {
          t += this.atRC(r, i) * mat.atRC(i, c);
        }

        s[r + c * this._nrow] = t;
      }
    }

    return s;
  }
}
