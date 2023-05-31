import type {ColumnVector} from './ColumnVector.js';
import type {Matrix} from './Matrix.js';
import type {RowVector} from './RowVector.js';
import type {
  IDimensions,
  ICallbackIndex,
  ICallbackMap,
  IIteratorReturn,
  IMath,
  TMath,
} from './types.js';

abstract class BaseMatrix {
  /*
   * CHILD MUST IMPLEMENT
   * copy()
   * toMatrix()
   * toColumnVector()
   * toRowVector()
   * indexToRow()
   * indexToCol()
   * rcToIndex()
   * atRC()
   * edRC()
   * fnRC()
   * extractColumn()
   * extractColumns()
   * extractRow()
   * extractRows()
   * extractSubMatrix()
   * transpose()
   * mmult()
   *
   */

  /** @internal */
  protected _e: number[] = [];
  /** @internal */
  protected _nrow: number = 1;
  /** @internal */
  protected _ncol: number = 1;
  /** @internal */
  protected _nelements: number = 1;

  /** @internal */
  protected abstract create(arr: number | number[], dims: IDimensions): this;

  /**
   * @returns a copy of the {@link TMatrixLike}
   * @group Copy methods
   */
  copy(): this {
    return this.create(this._e, {
      nrow: this._nrow,
      ncol: this._ncol,
      byrow: false,
    });
  }
  abstract toMatrix(): Matrix;
  abstract toColumnVector(): ColumnVector;
  abstract toRowVector(): RowVector;

  /** Abstract base class for {@link TMatrixLike}s */
  constructor(arr: number | number[], nrow: number, ncol: number = 1) {
    if (!Number.isInteger(nrow) || nrow <= 0)
      throw new TypeError('nrow must be positive integer');
    if (!Number.isInteger(ncol) || ncol <= 0)
      throw new TypeError('ncol must be positive integer');

    if (typeof arr === 'number') {
      this._setDimensions(nrow, ncol);
      this._e = new Array(nrow * ncol).fill(arr);
      return this;
    }

    if (!Array.isArray(arr))
      throw new TypeError('arr must be number or number[]');

    if (!arr.every((e) => typeof e === 'number'))
      throw new TypeError('arr must be number or number[]');

    const len = arr.length;

    if (len === 0) {
      throw new Error('arr must be number or number[] of length > 0');
    }

    this._setDimensions(nrow, ncol);

    if (this._nelements === len) {
      this._e = arr.slice();
    } else if (this._nelements > len) {
      this._e = [...arr, ...new Array(this._nelements - len).fill(0.0)];
    } else if (this._nelements < len) {
      this._e = arr.slice(0, this._nelements);
    }

    return this;
  }

  /** @internal */
  protected _setDimensions(nrow: number, ncol: number): void {
    this._nrow = nrow;
    this._ncol = ncol;
    this._nelements = nrow * ncol;
  }

  /** @returns the internal array of elements (stored column-row) */
  get internal() {
    return this._e.slice();
  }
  /** @returns the number of rows */
  get nrow() {
    return this._nrow;
  }
  /** @returns the number of columns */
  get ncol() {
    return this._ncol;
  }
  /** @returns the number of elements */
  get nelements() {
    return this._nelements;
  }
  /** The size as an array with elements {@link nrow} and {@link ncol} */
  get size() {
    return [this._nrow, this._ncol];
  }
  /**
   * @returns `true` if `mat` is {@link TMatrixLike}
   * @group Static methods
   * @group Property methods
   */
  static isBaseMatrix(mat: any): mat is BaseMatrix {
    return mat instanceof BaseMatrix;
  }
  /**
   * @returns `true` if `this` is square, i.e. the number of rows are equal to
   *   the number of columns
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
    if (!BaseMatrix.isBaseMatrix(mat))
      throw new TypeError('mat must be of class BaseMatrix');
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
   * @param index - the index to access. If `index < 0`, `index + .length` is
   *   accessed.
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
   * @param index - the index to access
   * @returns `value`
   * @throws `RangeError` if `index` is not in range
   * @group Accessors
   */
  ed(index: number, value: number): number {
    if (index < 0 || index >= this._nelements)
      throw new RangeError('index is not in range');
    this._e[index] = value;
    return value;
  }

  /**
   * Alias: `.fn(index, callbackFn, ...args)`.
   *
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
   * @param ...args - any additional argumnets to be passed to `callbackFn`
   * @returns the result of `callbackFn`
   * @throws `RangeError` if `index` is not in range
   * @group Accessors
   */
  fn(index: number, callbackFn: ICallbackIndex, ...args: any[]): number {
    if (index < 0 || index >= this._nelements)
      throw new RangeError('index is not in range');
    const value = callbackFn(this._e[index], index, ...args);
    this._e[index] = value;
    return value;
  }

  /**
   * @returns the row index of the matrix `index`
   * @throws `RangeError` if `index` is not in range
   * @group Accessors
   */
  indexToRow(index: number): number {
    if (index < 0 || index >= this._nelements)
      throw new RangeError('index is not in range');
    if (this._nrow === 1) return 0;
    return index % this._nrow;
  }
  /**
   * @returns the column index of the matrix `index`
   * @throws `RangeError` if `index` is not in range
   * @group Accessors
   */
  indexToCol(index: number): number {
    if (index < 0 || index >= this._nelements)
      throw new RangeError('index is not in range');
    if (this._ncol === 1) return 0;
    return (index / this._nrow) | 0;
  }
  /**
   * @returns an array `[row, column]`
   * @group Accessors
   */
  indexToRC(index: number): number[] {
    return [this.indexToRow(index), this.indexToCol(index)];
  }
  /**
   * @returns the matrix index at `row`, `column`
   * @throws `RangeError` if `row` or `column` is not in range
   * @group Accessors
   */
  rcToIndex(row: number, column: number): number {
    if (row < 0 || row >= this._nrow)
      throw new RangeError('row is not in range');
    if (column < 0 || column >= this._ncol)
      throw new RangeError('column is not in range');

    return row + column * this._nrow;
  }

  /**
   * @returns the matrix index at `row`, `column`
   * @throws `RangeError` if `row`, `column` is not in range
   * @group Accessors
   */
  atRC(row: number, column: number): number {
    const idx = this.rcToIndex(row, column);
    return this.at(idx);
  }
  /**
   * @returns the element at `row`, `column`
   * @throws `RangeError` if `row`, `column` is not in range
   * @group Accessors
   */
  edRC(row: number, column: number, value: number): number {
    const idx = this.rcToIndex(row, column);
    return this.ed(idx, value);
  }
  /**
   * @param ...args - any additional argumnets to be passed to `callbackFn`
   * @returns the element at `index`
   * @throws `RangeError` if `row`, `column` is not in range
   * @group Accessors
   */
  fnRC(
    row: number,
    column: number,
    callbackFn: ICallbackIndex,
    ...args: any[]
  ): number {
    const idx = this.rcToIndex(row, column);
    return this.fn(idx, callbackFn, row, column, ...args);
  }

  /**
   * Swaps the elements at the provided indexes
   *
   * @throws `RangeError` if `index` is not in range
   * @group Accessors
   */
  swap(index1: number, index2: number): this {
    if (index1 === index2) return this;

    const tmp = this.at(index1);
    this.ed(index1, this.at(index2));
    this.ed(index2, tmp);

    return this;
  }

  /**
   * Swaps the elements at the provided row-columns
   *
   * @throws `RangeError` if `row`s or `column`s is not in range
   * @group Accessors
   */
  swapRC(row1: number, column1: number, row2: number, column2: number): this {
    const index1 = this.rcToIndex(row1, column1);
    const index2 = this.rcToIndex(row2, column2);
    if (index1 === index2) return this;

    const tmp = this.at(index1);
    this.ed(index1, this.at(index2));
    this.ed(index2, tmp);

    return this;
  }

  /**
   * @returns a new {@link TMatrixLike}, where each element has been mapped
   * through the callback function.
   * @group Maps
   */
  map(callbackFn: ICallbackMap<number>): this {
    return this.create(this._e.map(callbackFn), {
      nrow: this._nrow,
      ncol: this._ncol,
    });
  }

  /**
   * @returns a {@link TMatrixLike}, where each element has been mapped in
   * place through the callback function.
   * @group Maps
   */
  mapInPlace(callbackFn: ICallbackMap<number>): this {
    for (let i = 0; i < this._nelements; i++) {
      this.fn(i, callbackFn);
    }

    return this;
  }

  /**
   * Executes the provided function once for each element
   * @group Maps
   */
  forEach(callbackFn: ICallbackMap<void>): void {
    this._e.forEach(callbackFn);
  }

  /**
   * Executes a user-supplied "reducer" callback function on each element, in
   * order, passing in the return value from the calculation on the preceding
   * element. The final result of running the reducer across all elements is a
   * single value.
   * @group Maps
   */
  reduce(
    callbackFn: (
      previousValue: number,
      currentValue: number,
      currentIndex: number,
      array: number[],
    ) => any,
    initialValue: any = null,
  ): any {
    return this._e.reduce(callbackFn, initialValue);
  }

  /**
   * Tests whether all elements pass the test implemented by the provided function
   * @group Maps
   */
  every(callbackFn: ICallbackMap<boolean>): boolean {
    return this._e.every(callbackFn);
  }

  /**
   * Tests whether any element pass the test implemented by the provided function
   * @group Maps
   */
  some(callbackFn: ICallbackMap<boolean>): boolean {
    return this._e.some(callbackFn);
  }

  // Extractions
  abstract extractColumn(columnIndex: number): ColumnVector;
  abstract extractRow(rowIndex: number): RowVector;
  abstract extractColumns(columnIndices: number[]): Matrix;
  abstract extractRows(rowIndices: number[]): Matrix;
  /*
   * @param rowIndexStart - The index of the first row to include in the submatrix.
   * @param colIndexStart - The index of the first column to include in the submatrix.
   * @param rowIndexEnd - The index of the last row to include in the submatrix.
   * @param colIndexEnd - The index of the last column to include in the submatrix.
   */
  // abstract extractSubMatrix(
  //   rowIndexStart: number,
  //   colIndexStart: number,
  //   rowIndexEnd: number,
  //   colIndexEnd: number,
  // ): this;

  // static cbind/rbind for Matrix only ?? abstract??
  // matrix to column
  /**
   * Transposes a {@link TMatrixLike}
   *
   * Returns a:
   * - {@link ColumnVector} if {@link TMatrixLike} is {@link RowVector},
   * - {@link RowVector} if {@link TMatrixLike} is {@link ColumnVector},
   * - {@link Matrix} if {@link TMatrixLike} is {@link Matrix}.
   */
  abstract transpose(): BaseMatrix;
  /**
   * {@inheritDoc transpose}
   * @group Copy methods
   */
  t(): BaseMatrix {
    return this.transpose();
  }
  abstract mmult(mat: BaseMatrix): Matrix;
  // static Matrix::asMatix
  // static ColumnVector::asColumnVector
  // Matrix::column
  // Matrix::row
  // Matrix::columns
  // Matrix::rows
  // Matrix::subMatrix
  // Matrix::diagonal
  // Matrix::diag => diagonal
  // Matrix::cov
  // Matrix::colSums
  // Matrix::colMeans
  // Matrix::colVars
  // Matrix::colSds
  // Matrix::colMins
  // Matrix::colMaxs
  // Matrix::colStandardize (incl. normalize)

  /**
   * @see {@link iterator}
   * @group Iterators
   */
  [Symbol.iterator]() {
    return this.iterator();
  }
  /**
   * Returns iterables:
   * - `.next()` returns the next value of the {@link TMatrixLike}, until `done`,
   * - `.cont()` returns the next value of the {@link TMatrixLike}, and loops around at the end.
   * - `.reset()` resets the pointer to the first element
   * @group Iterators
   */
  iterator(): {
    next: () => IIteratorReturn;
    cont: () => IIteratorReturn;
    reset: () => void;
  } {
    const returnObj = (index: number) => {
      return {
        done: false,
        value: this.at(index),
        index,
        row: this.indexToRow(index),
        col: this.indexToCol(index),
      };
    };

    let i = 0;

    return {
      next: (): IIteratorReturn => {
        if (i < this._nelements) {
          return returnObj(i++);
        }

        return {done: true, value: NaN, index: -1, row: -1, col: -1};
      },
      cont: (): IIteratorReturn => {
        if (i >= this._nelements) i = 0;
        return returnObj(i++);
      },
      reset: (): void => {
        i = 0;
      },
    };
  }

  // Basic Matrix Operations
  // - abstract transpose();
  // - abstract mmult();
  // - Matrix::inverse()
  // - Matrix::i() => inverse()

  // t(): any {
  //   return this.transpose();
  // }

  /** @ignore */
  protected _matrixMultiply(mat: BaseMatrix): number[] {
    if (!BaseMatrix.isBaseMatrix(mat))
      throw new TypeError('mat must be inherited from BaseMatrix');
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

  /** @internal */
  protected _basicMathInternal(
    fn: (e: number, i: number) => number,
    inPlace: boolean = false,
  ): this {
    if (inPlace === true) return this.mapInPlace(fn);
    return this.map(fn);
  }

  /**
   * Matrix addition of two equal sized {@link TMatrixLike}s.
   *
   * @param inPlace - If `true`, performes the operation in place.
   * @group Basic operators
   */
  add(mat: BaseMatrix, inPlace: boolean = false): this {
    if (!this.hasSizeOf(mat))
      throw new TypeError('mat must be of same size as this');

    const fn = (e: number, i: number) => e + mat.at(i);
    if (inPlace === true) return this.mapInPlace(fn);
    return this.map(fn);
  }

  /**
   * Adds a scalar value.
   *
   * @param inPlace - If `true`, performes the operation in place.
   * @group Basic operators
   */
  addScalar(n: number, inPlace: boolean = false): this {
    if (typeof n !== 'number') throw new TypeError('n must be number');

    const fn = (e: number) => e + n;
    if (inPlace === true) return this.mapInPlace(fn);
    return this.map(fn);
  }

  /**
   * Matrix subtraction of two equal sized {@link TMatrixLike}s.
   *
   * @param inPlace - If `true`, performes the operation in place.
   * @group Basic operators
   */
  subtract(mat: BaseMatrix, inPlace: boolean = false): this {
    if (!this.hasSizeOf(mat))
      throw new TypeError('mat must be of same size as this');

    const fn = (e: number, i: number) => e - mat.at(i);
    if (inPlace === true) return this.mapInPlace(fn);
    return this.map(fn);
  }

  /**
   * Subtracts a scalar value.
   *
   * @param inPlace - If `true`, performes the operation in place.
   * @group Basic operators
   */
  subtractScalar(n: number, inPlace: boolean = false): this {
    if (typeof n !== 'number') throw new TypeError('n must be number');

    const fn = (e: number) => e - n;
    if (inPlace === true) return this.mapInPlace(fn);
    return this.map(fn);
  }

  /**
   * Element wise division of two equal sized {@link TMatrixLike}s.
   *
   * @param inPlace - If `true`, performes the operation in place.
   * @group Basic operators
   */
  divide(mat: BaseMatrix, inPlace: boolean = false): this {
    if (!this.hasSizeOf(mat))
      throw new TypeError('mat must be of same size as this');

    const fn = (e: number, i: number) => e / mat.at(i);
    if (inPlace === true) return this.mapInPlace(fn);
    return this.map(fn);
  }

  /**
   * Divides with a scalar value.
   *
   * @param inPlace - If `true`, performes the operation in place.
   * @group Basic operators
   */
  divideScalar(n: number, inPlace: boolean = false): this {
    if (typeof n !== 'number') throw new TypeError('n must be number');

    const fn = (e: number) => e / n;
    if (inPlace === true) return this.mapInPlace(fn);
    return this.map(fn);
  }

  /**
   * Element wise multiplication of two equal sized {@link TMatrixLike}s.
   *
   * @param inPlace - If `true`, performes the operation in place.
   * @group Basic operators
   */
  multiply(mat: BaseMatrix, inPlace: boolean = false): this {
    if (!this.hasSizeOf(mat))
      throw new TypeError('mat must be of same size as this');

    const fn = (e: number, i: number) => e * mat.at(i);
    if (inPlace === true) return this.mapInPlace(fn);
    return this.map(fn);
  }

  /**
   * Multiplies with a scalar value.
   *
   * @param inPlace - If `true`, performes the operation in place.
   * @group Basic operators
   */
  multiplyScalar(n: number, inPlace: boolean = false): this {
    if (typeof n !== 'number') throw new TypeError('n must be number');

    const fn = (e: number) => e * n;
    if (inPlace === true) return this.mapInPlace(fn);
    return this.map(fn);
  }

  /**
   * Element wise math operations:
   *
   * @param method - The `Math` method to perform
   * @param arg - a second argument passed if method is `Math.max`, `Math.min`, or
   *   `Math.pow`.
   * @param inPlace - If `true`, performes the operation in place.
   * @group Basic operators
   */
  math(method: TMath, arg: number = 0, inPlace: boolean = false): this {
    const mth: IMath = {
      abs: Math.abs,
      acos: Math.acos,
      acosh: Math.acosh,
      asin: Math.asin,
      asinh: Math.asinh,
      atan: Math.atan,
      atanh: Math.atanh,
      cbrt: Math.cbrt,
      ceil: Math.ceil,
      cos: Math.cos,
      cosh: Math.cosh,
      exp: Math.exp,
      expm1: Math.expm1,
      floor: Math.floor,
      fround: Math.fround,
      log: Math.log,
      log10: Math.log10,
      log1p: Math.log1p,
      log2: Math.log2,
      max: (v: number): number => Math.max(v, arg),
      min: (v: number): number => Math.min(v, arg),
      pow: (v: number): number => Math.pow(v, arg),
      round: Math.round,
      sign: Math.sign,
      sin: Math.sin,
      sinh: Math.sinh,
      sqrt: Math.sqrt,
      tan: Math.tan,
      tanh: Math.tanh,
      trunc: Math.trunc,
    };

    if (method in mth) {
      if (inPlace === true) return this.mapInPlace(mth[method]);
      return this.map(mth[method]);
    }

    throw new TypeError('method does not match any supported method in Math.');
  }

  /**
   * Rounds the elements in the {@link TMatrixLike} to `d` digits after the
   * decimal point.
   *
   * @param inPlace - If `true`, performes the operation in place.
   * @group Basic operators
   */
  snap(d: number = 0, inPlace: boolean = false): this {
    const fn = (v: number) => parseFloat(v.toFixed(d));
    if (inPlace === true) return this.mapInPlace(fn);
    return this.map(fn);
  }

  /**
   * Remainder (%) `x % y`, where x are the elements of the {@link TMatrixLike}
   *
   * @param inPlace - If `true`, performes the operation in place.
   * @group Basic operators
   */
  modScalar(y: number, inPlace: boolean = false): this {
    const fn = (v: number) => v % y;
    if (inPlace === true) return this.mapInPlace(fn);
    return this.map(fn);
  }

  /**
   * Element-wise remainder (%) `x % mat`, where x are element of the {@link TMatrixLike}
   *
   * @param inPlace - If `true`, performes the operation in place.
   * @group Basic operators
   */
  mod(mat: BaseMatrix, inPlace: boolean = false): this {
    if (!this.hasSizeOf(mat))
      throw new TypeError('mat must be of same size as this');

    const fn = (e: number, i: number) => e % mat.at(i);
    if (inPlace === true) return this.mapInPlace(fn);
    return this.map(fn);
  }

  // Basic statistics
  /**
   * Sums all elements
   * @group Statistics
   */
  sum(): number {
    return this.reduce((s, e) => s + e);
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
   * @returns the quantiles of all the elements in the {@link TMatrixLike}
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

    const s = this.internal.sort((a: number, b: number) => a - b);
    const res = new Array(p.length);
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
    const s = this.internal.sort((a, b) => a - b);
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
    const xm = this.subtractScalar(this.mean());
    return xm.math('pow', 3).mean() / Math.pow(xm.math('pow', 2).mean(), 1.5);
  }

  // Standardization
  /**
   * Standardizes the elements by mean value and standard deviation, or if
   * `normalize` is `true`, normalizes the elements by minimum value and range.
   */
  /**
   * Standardizes or normalizes the {@link TMatrixLike}
   * - if `normalize` is `true`: normalizes the values by `(x-min)/(max-min)`
   * - otherwise: standardizes the values by `(x - mu)/sigma`
   *
   * @returns a new standardized or normalized {@link TMatrixLike}
   * @group Statistics
   */
  standardize(normalize: boolean = false): this {
    let offset: number;
    let denom: number;

    if (normalize === true) {
      offset = this.min();
      denom = this.max() - offset;
    } else {
      offset = this.mean();
      denom = this.sd();
    }

    return this.map((v) => (v - offset) / denom);
  }

  /** @ignore */
  protected static flatMap(matrices: BaseMatrix[]): number[] {
    if (!matrices.every(BaseMatrix.isBaseMatrix))
      throw new TypeError('Not all arguments are of type BaseMatrix');
    if (matrices.length === 0) throw new Error('Nothing to flat');

    return matrices.flatMap((m) => m.internal);
  }

  // to<Base>
  /**
   * @param digits - the number of digits to appear after the decimal point
   * @param pretty - `true` if the output should be prettyfied
   * @returns a string representation of the {@link TMatrixLike}
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

  /**
   * {@inheritDoc internal}
   * @group Accessors
   */
  toArray(): number[] {
    return this.internal;
  }
}

export {BaseMatrix};
