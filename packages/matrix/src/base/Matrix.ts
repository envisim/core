import {randomArray} from '@envisim/random';
import {reducedRowEchelonForm} from '@envisim/utils';

import {BaseMatrix} from './BaseMatrix.js';
import {ColumnVector} from './ColumnVector.js';
import {RowVector} from './RowVector.js';
import {MatrixByRow, MatrixDims} from './matrixDims.js';

export class Matrix extends BaseMatrix {
  /**
   * @returns `true` if `mat` is inherited from Matrix
   * @group Static methods
   * @group Property methods
   */
  static isMatrix(mat: unknown): mat is Matrix {
    return mat instanceof Matrix;
  }

  /**
   * @param msg message to pass, defaults to `"Expected Matrix"`
   * @returns `true` if `obj` is Matrix
   * @throws TypeError if `obj` is not Matrix
   * @group Static methods
   * @group Property methods
   */
  static assert(obj: unknown, msg?: string): obj is Matrix {
    if (obj instanceof Matrix) return true;
    throw new TypeError(msg ?? 'Expected Matrix');
  }

  /**
   * Bind multiple matrices together by columns
   * @throws `RangeError` if the number of rows of any matrix doesn't match
   * @group Static methods
   */
  static cbind(...matrices: BaseMatrix[]): Matrix {
    if (!matrices.every(BaseMatrix.isBaseMatrix))
      throw new TypeError('Not all arguments are of type BaseMatrix');
    if (matrices.length === 0) throw new Error('Nothing to cbind');

    const nrow = matrices[0].nrow;

    if (!matrices.every((m) => nrow === m.nrow))
      throw new RangeError('Dimensions of matrices does not match');

    const ncol = matrices.reduce((s, m) => s + m.ncol, 0);

    return new Matrix(
      matrices.flatMap((m) => m.internal),
      {nrow, ncol},
      true,
    );
  }

  /**
   * Bind multiple matrices together by rows
   * @throws `RangeError` if the number of columns of any matrix doesn't match
   * @group Static methods
   */
  static rbind(...matrices: BaseMatrix[]): Matrix {
    if (!matrices.every(BaseMatrix.isBaseMatrix))
      throw new TypeError('Not all arguments are of type BaseMatrix');
    if (matrices.length === 0) throw new Error('Nothing to cbind');

    const ncol = matrices[0].ncol;

    if (!matrices.every((m) => ncol === m.ncol))
      throw new RangeError('Dimensions of matrices does not match');

    const nrow = matrices.reduce((s, m) => s + m.nrow, 0);

    const s = Matrix.create(0, {nrow, ncol});

    let rows = 0;

    for (let i = 0; i < matrices.length; i++) {
      for (let col = 0; col < matrices[i].ncol; col++) {
        for (let row = 0; row < matrices[i].nrow; row++) {
          s.edRC(row + rows, col, matrices[i].atRC(row, col));
        }
      }

      rows += matrices[i].nrow;
    }

    return s;
  }

  /**
   * @returns a new Matrix of size `dims` filled with `fill`
   * @group Static methods
   */
  static create(fill: number, dims: Required<MatrixDims>): Matrix {
    return new Matrix(
      new Array<number>(dims.nrow * dims.ncol).fill(fill),
      dims,
      true,
    );
  }

  /**
   * @param arr the values used to form the Matrix in column-order, or row-order
   * if `dims.byRow` is `true`
   * @param dims the dimensions of the Matrix. Must match the size of `arr`.
   * @param shallow if `true`, uses the internal arrays of `arr` as a reference
   */
  constructor(
    arr: number[],
    dims: Required<MatrixDims> & MatrixByRow,
    shallow?: boolean,
  );
  constructor(mat: BaseMatrix, dims?: MatrixDims, shallow?: boolean);
  constructor(
    arr: number[] | BaseMatrix,
    dims: MatrixDims & MatrixByRow = {},
    shallow: boolean = false,
  ) {
    if (Array.isArray(arr)) {
      let nrow = dims.nrow ?? arr.length;
      let ncol = dims.ncol ?? 1;

      if (dims.byRow === true) {
        nrow = dims.ncol ?? 1;
        ncol = dims.nrow ?? arr.length;
      }

      super(shallow === true ? arr : arr.slice(), nrow, ncol);

      return dims.byRow === true ? this.transpose() : this;
    }

    if (BaseMatrix.isBaseMatrix(arr)) {
      super(shallow === true ? arr.internal : arr.slice(), arr.nrow, arr.ncol);
      return;
    }

    throw new TypeError('unknown type of arr');
  }

  /**
   * @group Copy methods
   */
  copy(): Matrix {
    return new Matrix(this);
  }

  /**
   * @group Copy methods
   * @group Accessors
   */
  extractColumn(col: number): ColumnVector {
    if (!Number.isInteger(col) || col < 0 || col >= this._ncol)
      throw new RangeError('columnIndex out of bounds');

    return new ColumnVector(
      this._e.slice(col * this._nrow, (col + 1) * this._nrow),
    );
  }

  /**
   * @group Copy methods
   * @group Accessors
   */
  extractRow(row: number): RowVector {
    if (!Number.isInteger(row) || row < 0 || row >= this._nrow)
      throw new RangeError('columnIndex out of bounds');

    const s = new Array<number>(this._ncol);

    for (let i = row, j = 0; i < this._nelements; i += this._nrow, j++)
      s[j] = this._e[i];

    return new RowVector(s, true);
  }

  /**
   * @group Copy methods
   * @group Accessors
   */
  extractColumns(cols: number[]): Matrix {
    if (!Array.isArray(cols)) throw new TypeError('columns must be array');
    if (!cols.every((e) => Number.isInteger(e) && 0 <= e && e < this._ncol))
      throw new RangeError('columns must be in valid range');

    const s = Matrix.create(0.0, {nrow: this._nrow, ncol: cols.length});

    for (let c = 0; c < cols.length; c++) {
      s._e.splice(
        c * this._nrow,
        (c + 1) * this._nrow,
        ...this._e.slice(cols[c] * this._nrow, (cols[c] + 1) * this._nrow),
      );
    }

    return s;
  }

  /**
   * @group Copy methods
   * @group Accessors
   */
  extractRows(rows: number[]): Matrix {
    if (!Array.isArray(rows)) throw new TypeError('rows must be array');
    if (!rows.every((e) => Number.isInteger(e) && 0 <= e && e < this._ncol))
      throw new RangeError('rows must be in valid range');

    const s = Matrix.create(0.0, {nrow: rows.length, ncol: this._ncol});

    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < this._ncol; c++) {
        s.edRC(r, c, this.atRC(rows[r], c));
      }
    }

    return s;
  }

  /**
   * @param rowStart The index of the first row to include in the submatrix.
   * @param columnStart The index of the first column to include in the submatrix.
   * @param rowEnd The index of the last row to include in the submatrix.
   * @param columnEnd The index of the last column to include in the submatrix.
   * @returns a sub-matrix defined by the parameters.
   * @group Copy methods
   * @group Accessors
   */
  extractSubMatrix(
    rowStart: number = 0,
    columnStart: number = 0,
    rowEnd: number = this.nrow - 1,
    columnEnd: number = this.ncol - 1,
  ): Matrix {
    if (!Number.isInteger(rowStart) || !Number.isInteger(rowEnd))
      throw new RangeError('rows must be integer');
    if (!Number.isInteger(columnStart) || !Number.isInteger(columnEnd))
      throw new RangeError('columns must be integer');
    if (rowStart < 0 || this._nrow <= rowEnd)
      throw new RangeError('rows out of bounds');
    if (columnStart < 0 || this._nrow <= columnEnd)
      throw new RangeError('rows out of bounds');

    const nrow = rowEnd - rowStart + 1;
    const ncol = columnEnd - columnStart + 1;

    if (nrow < 1 || ncol < 1)
      throw new RangeError('end must be at least as large as start');

    const s = new Array<number>(ncol * nrow);

    for (let i = 0; i < ncol; i++) {
      s.splice(
        i * nrow,
        (i + 1) * nrow,
        ...this._e.slice(
          this.indexOfRc(rowStart, columnStart + i),
          this.indexOfRc(rowEnd, columnStart + i) + 1,
        ),
      );
    }

    return new Matrix(s, {nrow, ncol}, true);
  }

  /**
   * @group Copy methods
   */
  transpose(): Matrix {
    const s = Matrix.create(0, {nrow: this._ncol, ncol: this._nrow});

    this.forEach((e, i) => {
      s.edRC(this.colOfIndex(i), this.rowOfIndex(i), e);
    });

    return s;
  }

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
   * @returns the diagonal of the matrix
   * @group Accessors
   */
  diagonal(): ColumnVector {
    const rc = Math.min(this._nrow, this._ncol);
    const s = new Array<number>(rc);
    for (let i = 0; i < rc; i++) s[i] = this.atRC(i, i);
    return new ColumnVector(s, true);
  }

  // Column operations
  /**
   * Calculates the column sums
   * @group Column operations
   */
  colSums(): ColumnVector {
    const s = ColumnVector.create(0.0, this._ncol);

    for (let i = 0; i < this._ncol; i++) {
      s.ed(
        i,
        this._e
          .slice(i * this._nrow, (i + 1) * this._nrow)
          .reduce((t, e) => t + e, 0.0),
      );
    }

    return s;
  }

  /**
   * Calculates the column means
   * @group Column operations
   */
  colMeans(): ColumnVector {
    return this.colSums().map((e) => e / this.nrow, true);
  }

  /**
   * Calculates the column variances, using `n-1` as denominator.
   * @group Column operations
   */
  colVars(): ColumnVector {
    const s = ColumnVector.create(0.0, this._ncol);

    const means = this.colMeans();
    const nishRows = this._nrow - 1;

    return s.map(
      (_, i) =>
        this.extractColumn(i).subtract(means.at(i)).math('pow', 2).sum() /
        nishRows,
      true,
    );
  }

  /**
   * Calculates the column standard deviations, using `n-1` as denominator.
   * @group Column operations
   */
  colSds(): ColumnVector {
    return this.colVars().map(Math.sqrt, true);
  }

  /**
   * Calculates the column minimum values
   * @group Column operations
   */
  colMins(): ColumnVector {
    const s = ColumnVector.create(0.0, this._ncol);

    return s.map(
      (_, i) =>
        Math.min(...this._e.slice(i * this._nrow, (i + 1) * this._nrow)),
      true,
    );
  }

  /**
   * Calculates the column maximum values
   * @group Column operations
   */
  colMaxs(asRow: boolean = false): ColumnVector {
    const s = ColumnVector.create(0.0, this._ncol);

    return s.map(
      (_, i) =>
        Math.max(...this._e.slice(i * this._nrow, (i + 1) * this._nrow)),
      true,
    );
  }

  /**
   * Standardizes or normalizes the matrix by column
   * - if `normalize` is `true`: normalizes the values in a column by `(x-min)/(max-min)`
   * - otherwise: standardizes the values in a column by `(x - mu)/sigma`
   *
   * @returns a new standardized or normalized {@link Matrix}
   * @group Column operations
   * @group Statistics
   */
  standardizeByCol(normalize: boolean = false): Matrix {
    let offset: ColumnVector;
    let denom: ColumnVector;

    if (normalize === true) {
      offset = this.colMins();
      denom = this.colMaxs().subtract(offset, true);
    } else {
      offset = this.colMeans();
      denom = this.colSds();
    }

    return this.copy().map((e, i) => {
      const col = this.colOfIndex(i);
      return (e - offset.at(col)) / denom.at(col);
    }, true);
  }

  /**
   * @returns the covariance matrix
   * @group Statistics
   */
  covariance(): Matrix {
    const means = this.colMeans();

    const xme = this.copy().map(
      (e, i) => e - means.at(this.colOfIndex(i)),
      true,
    );

    return xme
      .transpose()
      .mmult(xme)
      .divide(this.nrow - 1);
  }

  /**
   * @param a a row index
   * @param b a row index
   * @param squared if `false`, calculates the euclidean distance, otherwise
   *   calculates the euclidean squared distance
   * @returns the distance between units `a` and `b`
   * @group Statistics
   */
  distance(a: number, b: number, squared: boolean = true) {
    if (a === b) return 0.0;

    let d = 0.0;
    for (let k = 0; k < this.ncol; k++) {
      const temp = this.atRC(a, k) - this.atRC(b, k);
      d += temp;
    }

    return squared !== false ? d : Math.sqrt(d);
  }

  /**
   * @returns the matrix in reduced row echelon format
   * @group Linear algebra
   */
  reducedRowEchelon(eps: number = 1e-9, inPlace: boolean = false): Matrix {
    const mIdx = (r: number, c: number) => c * this._nrow + r;
    if (inPlace === true) {
      reducedRowEchelonForm(this._e, this._nrow, this._ncol, eps, mIdx);
      return this;
    }

    const s = this.slice();
    reducedRowEchelonForm(s, this._nrow, this._ncol, eps, mIdx);
    return new Matrix(s, {nrow: this._nrow, ncol: this._ncol}, true);
  }

  /**
   * @returns the matrix in right triangular format
   * @group Linear algebra
   */
  rightTriangular(): Matrix {
    const s = this.copy();

    for (let i = 0; i < s.nrow; i++) {
      if (s.atRC(i, i) === 0.0) {
        for (let j = i + 1; j < s.nrow; j++) {
          if (s.atRC(j, i) !== 0.0) {
            for (let np = 0; np < s.ncol; np++) {
              s.fnRC(i, np, (e) => e + s.atRC(j, np));
            }
            break;
          }
        }
      }

      if (s.atRC(i, i) !== 0.0) {
        for (let j = i + 1; j < s.nrow; j++) {
          const mult = s.atRC(j, i) / s.atRC(i, i);
          for (let np = 0; np <= i; np++) {
            s.edRC(j, np, 0.0);
          }
          for (let np = i + 1; np < s.ncol; np++) {
            s.fnRC(j, np, (e) => e - s.atRC(i, np) * mult);
          }
        }
      }
    }

    return s;
  }

  /**
   * @returns the determinant of the matrix
   * @throws `Error` if matrix is not square
   * @group Linear algebra
   */
  determinant(): number {
    if (!this.isSquare()) throw new Error('Matrix must be square');

    return this.rightTriangular().diagonal().prod();
  }

  /**
   * @returns the inverse of the matrix
   * @group Linear algebra
   */
  inverse(eps: number = 1e-9): Matrix | null {
    if (!this.isSquare()) throw new Error('Matrix is not square.');

    if (this.determinant() === 0) {
      console.warn('Determinant is 0.');
      return null;
    }

    const sim = Matrix.cbind(
      this,
      identityMatrix(this._nrow),
    ).reducedRowEchelon(eps, true);

    return new Matrix(
      sim.internal.slice(this._nelements),
      {nrow: this._nrow, ncol: this._ncol},
      true,
    );
  }
}

/**
 * Generates a matrix of random numbers on [0, 1).
 *
 * @param seed A seed used in the random number generator.
 */
export function randomMatrix(
  nrow: number,
  ncol: number,
  seed?: string | number,
): Matrix {
  return new Matrix(randomArray(nrow * ncol, seed), {nrow, ncol}, true);
}

/**
 * @returns a new diagonal matrix of elements in arr
 * @param nrow size of the diagonal matrix
 */
export function diagonalMatrix(arr: number, nrow: number): Matrix;
export function diagonalMatrix(arr: number[]): Matrix;
export function diagonalMatrix(arr: ColumnVector | RowVector): Matrix;
export function diagonalMatrix(
  arr: number | number[] | ColumnVector | RowVector,
  nrow?: number,
): Matrix {
  if (typeof arr === 'number') {
    if (typeof nrow !== 'number' || !Number.isInteger(nrow))
      throw new TypeError('nrow must be defined and integer if arr is number');

    const s = Matrix.create(0.0, {nrow, ncol: nrow});
    for (let i = 0; i < nrow; i++) s.edRC(i, i, arr);
    return s;
  }

  const n = arr.length;
  const s = Matrix.create(0.0, {nrow: n, ncol: n});
  for (let i = 0; i < n; i++) s.edRC(i, i, arr.at(i) as number);
  return s;
}

/**
 * @returns a new identity matrix of size `nrow * nrow`.
 */
export function identityMatrix(nrow: number): Matrix {
  return diagonalMatrix(1, nrow);
}
