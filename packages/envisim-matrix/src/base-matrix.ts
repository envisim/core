import { ValidationError } from "@envisim/utils";

function equalsApprox(a: number, b: number, eps: number): boolean {
  return a - eps <= b && b <= a + eps;
}

export type MatrixDim = [row: number, col: number];
export type MatrixCallback<T> = (element: number, index: number) => T;
export type MatrixCallbackDim<T> = (element: number, index: number, dim: MatrixDim) => T;
export type MatrixCallbackCompare = (a: number, b: number) => number;

export abstract class BaseMatrix {
  constructor(arr: number[], [nrow, ncol]: MatrixDim) {
    this.rows = nrow | 0;
    this.cols = ncol | 0;
    this.len = this.nrow * this.ncol;
    this.internal = arr;

    (
      ValidationError.checkNumber("number-not-positive", "nrow", this.nrow) ??
      ValidationError.checkNumber("number-not-positive", "ncol", this.ncol) ??
      (this.len === arr.length
        ? undefined
        : ValidationError.createOther("other-incorrect-shape", "arr", "arr.length and nrow*ncol"))
    )?.cast();
  }

  /**
   * @internal
   * stored column major
   */
  protected internal: number[];

  /** @internal */
  protected rows: number;
  /**
   * @returns the number of rows
   */
  get nrow(): number {
    return this.rows;
  }

  /** @internal */
  protected cols: number;
  /**
   * @returns the number of columns
   */
  get ncol(): number {
    return this.cols;
  }

  /**
   * @returns `[this.nrow, this.ncol]`
   */
  dim(): MatrixDim {
    return [this.rows, this.cols];
  }

  /**
   * @internal
   */
  protected checkRow(row: number): number {
    row |= 0;

    if (row < 0) {
      if (row < -this.rows) throw ValidationError.createOther("other-index-oob", "row");
      row += this.rows;
    } else if (row >= this.rows) {
      throw ValidationError.createOther("other-index-oob", "row");
    }

    return row;
  }
  /**
   * @internal
   */
  protected checkCol(col: number): number {
    col |= 0;

    if (col < 0) {
      if (col < -this.cols) throw ValidationError.createOther("other-index-oob", "col");
      col += this.cols;
    } else if (col >= this.cols) {
      throw ValidationError.createOther("other-index-oob", "col");
    }

    return col;
  }
  /**
   * @internal
   */
  protected checkDim([row, col]: MatrixDim): MatrixDim {
    return [this.checkRow(row), this.checkCol(col)];
  }

  /**
   * @returns the matrix index at `row`, `column`
   * @throws ValidationError if `row` or `column` is out of bounds
   */
  indexOfDim(dim: MatrixDim): number {
    const [row, col] = this.checkDim(dim);
    return row + col * this.rows;
  }

  /**
   * @returns an array `[row, column]`
   */
  dimOfIndex(index: number): MatrixDim {
    return [this.rowOfIndex(index), this.colOfIndex(index)];
  }

  /**
   * @internal
   */
  protected checkIndex(index: number): number {
    index |= 0;

    if (index >= this.len) throw ValidationError.createOther("other-index-oob", "index");
    if (index < 0) {
      if (index < -this.len) throw ValidationError.createOther("other-index-oob", "index");
      index += this.len;
    }

    return index;
  }

  /**
   * @returns the row index of the matrix `index`
   * @throws ValidationError if `index` is out of bounds
   */
  rowOfIndex(index: number): MatrixDim[0] {
    return this.rows === 1 ? 0 : this.checkIndex(index) % this.rows;
  }

  /**
   * @returns the column index of the matrix `index`
   * @throws ValidationError if `index` is out of bounds
   */
  colOfIndex(index: number): MatrixDim[1] {
    return this.cols === 1 ? 0 : this.checkIndex(index) / this.rows;
  }

  /**
   * @returns the a copy of the internal array of elements (stored column major)
   */
  slice(start?: number, end?: number): number[] {
    return this.internal.slice(start, end);
  }

  /**
   * @param index if `index < 0`, `index + .length` is accessed.
   * @returns the element at matrix `index`
   * @throws ValidationError if `index` is out of bounds
   */
  at(index: number): number {
    return this.internal[this.checkIndex(index)];
  }

  /**
   * Changes the element at matrix `index` to `value`
   * @param index if `index < 0`, `index + .length` is accessed.
   * @returns `value`
   * @throws ValidationError if `index` is out of bounds
   */
  ed(index: number, value: number): number {
    return (this.internal[this.checkIndex(index)] = value);
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
   * @throws ValidationError if `index` is out of bounds
   */
  fn(index: number, callback: MatrixCallback<number>): number {
    index = this.checkIndex(index);
    return (this.internal[index] = callback(this.internal[index], index));
  }

  /**
   * @see {@link BaseMatrix.at}
   */
  atDim(dim: MatrixDim): number {
    return this.at(this.indexOfDim(dim));
  }

  /**
   * @see {@link BaseMatrix.ed}
   */
  edDim(dim: MatrixDim, value: number): number {
    const idx = this.indexOfDim(dim);
    return this.ed(idx, value);
  }

  /**
   * @see {@link BaseMatrix.fn}
   */
  fnDim(dim: MatrixDim, callback: MatrixCallbackDim<number>): number {
    const idx = this.indexOfDim(dim);
    return this.fn(idx, (e, i) => callback(e, i, dim));
  }

  /**
   * Swaps the elements at the provided indexes
   * @throws ValidationError if `index` is out of bounds
   */
  swap(index1: number, index2: number): void {
    index1 = this.checkIndex(index1);
    index2 = this.checkIndex(index2);
    if (index1 === index2) return;
    [this.internal[index1], this.internal[index2]] = [this.internal[index2], this.internal[index1]];
  }

  /**
   * Executes the provided function once for each element
   */
  forEach(callback: MatrixCallback<void>): void {
    this.internal.forEach(callback);
  }

  protected baseMap(callback: MatrixCallback<number>): number[] {
    return this.internal.map((e, i) => callback(e, i));
  }
  protected baseMapInPlace(callback: MatrixCallback<number>): this {
    for (let i = 0; i < this.len; i++) {
      this.internal[i] = callback(this.internal[i], i);
    }

    return this;
  }

  /**
   * Executes a user-supplied "reducer" callback function on each element, in
   * order, passing in the return value from the calculation on the preceding
   * element. The final result of running the reducer across all elements is a
   * single value.
   */
  reduce(
    callback: (prev: number, curr: number, index: number) => number,
    init: number = 0.0,
  ): number {
    return this.internal.reduce(callback, init);
  }

  /**
   * Tests if all elements pass the test implemented by the callback fn
   */
  every(callback: MatrixCallback<boolean>): boolean {
    return this.internal.every(callback);
  }

  /**
   * Tests if any element pass the test implemented by the callback fn
   */
  some(callback: MatrixCallback<boolean>): boolean {
    return this.internal.some(callback);
  }

  /**
   * @param fromIndex the index to start the search at
   * @returns the index of the first occurance of `searchElement`
   */
  indexOf(searchElement: number, fromIndex: number = 0): number {
    return this.internal.indexOf(searchElement, fromIndex);
  }

  /**
   * @param fromIndex the index to start the search at
   * @returns the index of the first occurance of `searchElement`, searching
   * backwards
   */
  lastIndexOf(searchElement: number, fromIndex: number = this.len - 1): number {
    return this.internal.lastIndexOf(searchElement, fromIndex);
  }

  /**
   * @param callback a function used to test elements in the array
   * @returns the index of the first element passing the test in `callback`
   */
  findIndex(callback: MatrixCallback<boolean>): number {
    return this.internal.findIndex(callback);
  }

  /**
   * @returns `true` if `this` is equal to `mat`
   */
  equals(mat: BaseMatrix): boolean {
    return this.hasSizeOf(mat) ? this.internal.every((e, i) => e === mat.internal[i]) : false;
  }

  /**
   * @returns `true` if `this` is approximately equal to `mat`
   */
  equalsApprox(mat: BaseMatrix, eps: number = 1e-9): boolean {
    return this.hasSizeOf(mat)
      ? this.internal.every((e, i) => equalsApprox(e, mat.internal[i], eps))
      : false;
  }

  /**
   * @returns `true` if the matrix is a square
   */
  isSquare(): boolean {
    return this.rows === this.cols;
  }

  /**
   * @returns `true` if the dimensions matches `mat`
   */
  hasSizeOf(mat: BaseMatrix): boolean {
    return this.rows === mat.rows && this.cols === mat.cols;
  }

  /** @internal */
  protected len: number;
  /**
   * @returns the number of elements
   */
  get length(): number {
    return this.len;
  }

  /**
   * Minimum value of all elements
   */
  min(): number {
    return Math.min(...this.internal);
  }

  /**
   * Maximum value of all elements
   */
  max(): number {
    return Math.max(...this.internal);
  }

  /**
   * The range (min-max) of all elements
   */
  range(): [number, number] {
    const range: [number, number] = [this.internal[0], this.internal[0]];

    for (let i = 1; i < this.internal.length; i++) {
      const v = this.internal[i];
      if (v < range[0]) range[0] = v;
      else if (v > range[1]) range[1] = v;
    }

    return range;
  }

  /**
   * Sum of all elements
   */
  sum(): number {
    return this.internal.reduce((t, e) => t + e);
  }

  /**
   * Product sum of all elements
   */
  prodSum(): number {
    return this.internal.reduce((t, e) => t * e);
  }

  /**
   * Mean of all elements
   */
  mean(): number {
    return this.sum() / this.len;
  }

  /**
   * Geometric mean of all elements
   */
  geometricMean(): number {
    return Math.exp(this.reduce((t, e) => t + Math.log(e)) / this.len);
  }

  /**
   * Median of all elements
   */
  median(): number {
    const s = this.internal.slice().sort((a, b) => a - b);
    let n = s.length;

    if ((n & 1) === 1) return s[(n - 1) >> 1];

    n = n >> 1;
    return (s[n] + s[n - 1]) * 0.5;
  }

  /**
   * Variance of all elements
   */
  variance(): number {
    let s1 = 0.0;
    let s2 = 0.0;

    this.forEach((v) => {
      s1 += v;
      s2 += v * v;
    });

    return (s2 - (s1 * s1) / this.len) / (this.len - 1);
  }

  /**
   * Standard deviation of all elements
   */
  sd(): number {
    return Math.sqrt(this.variance());
  }

  /**
   * Most common value
   */
  mode(): number[] {
    const s = new Map<number, number>();

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

  skewness(): number {
    const mean = this.mean();
    let s1 = 0.0;
    let s2 = 0.0;

    this.forEach((v) => {
      v -= mean;
      s1 += Math.pow(v, 3);
      s2 += Math.pow(v, 2);
    });

    return (s1 / Math.pow(s2, 1.5)) * Math.sqrt(this.length);
  }

  quantiles(probs: number | number[]): number[] {
    const p = Array.isArray(probs) ? probs : [probs];
    if (p.length === 0) return [];

    const s = this.slice().sort((a: number, b: number) => a - b);
    const res = Array.from<number>({ length: p.length });
    const n = s.length;
    let unit: number;
    let low: number;
    let high: number;

    for (let i = 0; i < p.length; i++) {
      const pq = p[i];
      ValidationError.checkNumber("number-not-in-unit-interval", "probs", pq)?.cast();

      unit = pq * n - 1.0;
      low = Math.floor(unit);
      high = Math.ceil(unit);
      res[i] = s[low] + (unit - low) * (s[high] - s[low]);
    }

    return res;
  }

  /**
   * Standardizes or normalizes the matrix
   * - if `normalize` is `true`: normalizes the values by `(x-min)/(max-min)`
   * - otherwise: standardizes the values by `(x - mu)/sigma`
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

  // Maths
  /**
   * Matrix addition.
   *
   * @param inPlace - If `true`, performes the operation in place.
   * @group Basic operators
   */
  add(mat: number | BaseMatrix, inPlace: boolean = false): this {
    let fn: MatrixCallback<number>;
    if (typeof mat === "number") fn = (e: number) => e + mat;
    else if (this.hasSizeOf(mat)) fn = (e: number, i: number) => e + mat.at(i);
    else throw ValidationError.createOther("other-incorrect-shape", "mat", "this");

    return this.map(fn, inPlace);
  }

  /**
   * Matrix subtraction.
   *
   * @param inPlace If `true`, performes the operation in place.
   * @group Basic operators
   */
  subtract(mat: number | BaseMatrix, inPlace: boolean = false): this {
    let fn: MatrixCallback<number>;
    if (typeof mat === "number") fn = (e: number) => e - mat;
    else if (this.hasSizeOf(mat)) fn = (e: number, i: number) => e - mat.at(i);
    else throw ValidationError.createOther("other-incorrect-shape", "mat", "this");

    return this.map(fn, inPlace);
  }

  /**
   * Element wise division.
   *
   * @param inPlace If `true`, performes the operation in place.
   * @group Basic operators
   */
  divide(mat: number | BaseMatrix, inPlace: boolean = false): this {
    let fn: MatrixCallback<number>;
    if (typeof mat === "number") fn = (e: number) => e / mat;
    else if (this.hasSizeOf(mat)) fn = (e: number, i: number) => e / mat.at(i);
    else throw ValidationError.createOther("other-incorrect-shape", "mat", "this");

    return this.map(fn, inPlace);
  }

  /**
   * Element wise multiplication.
   *
   * @param inPlace If `true`, performes the operation in place.
   * @group Basic operators
   */
  multiply(mat: number | BaseMatrix, inPlace: boolean = false): this {
    let fn: MatrixCallback<number>;
    if (typeof mat === "number") fn = (e: number) => e * mat;
    else if (this.hasSizeOf(mat)) fn = (e: number, i: number) => e * mat.at(i);
    else throw ValidationError.createOther("other-incorrect-shape", "mat", "this");

    return this.map(fn, inPlace);
  }

  /**
   * Element wise remainder (%) `x % y`
   *
   * @param inPlace If `true`, performes the operation in place.
   * @group Basic operators
   */
  mod(mat: number | BaseMatrix, inPlace: boolean = false): this {
    let fn: MatrixCallback<number>;
    if (typeof mat === "number") fn = (e: number) => e % mat;
    else if (this.hasSizeOf(mat)) fn = (e: number, i: number) => e % mat.at(i);
    else throw ValidationError.createOther("other-incorrect-shape", "mat", "this");

    return this.map(fn, inPlace);
  }

  abstract clone(): this;
  abstract map(callback: MatrixCallback<number>, inPlace: boolean): this;
}
