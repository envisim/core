import {randomArray} from '@envisim/random';
import {reducedRowEchelonForm} from './array-fns/reducedRowEchelonForm.js';
import {BaseMatrix} from './BaseMatrix.js';
import {ColumnVector} from './ColumnVector.js';
import {RowVector} from './RowVector.js';
import type {
  IDimensions,
  TArrayLike,
  TMatrixLike,
  TVectorLike,
} from './types.js';
import {arrayLikeToArray, isInteger} from './utils.js';

class Matrix extends BaseMatrix {
  /**
   * If `arr` is {@link TArrayLike} or {@link Matrix}, and the size of `arr` is less than
   * the size of `arr`, the {@link Matrix} will be padded with `0.0`.
   *
   * If `arr` is `number`, the {@link Matrix} will be filled by it.
   *
   * @param arr - values to fill the {@link Matrix} with.
   * @param nrow - the number of rows of the {@link Matrix}
   * @param ncol - the number of columns of the {@link Matrix}
   * @param byRow - `true` if the {@link Matrix} should be filled row to column
   *  Only applicable if `arr` is {@link TArrayLike}
   */
  constructor(
    arr: number | TArrayLike | Matrix,
    nrow: number,
    ncol: number = 1,
    byRow: boolean = false,
  ) {
    let rows = isInteger(nrow) ? nrow : 1;
    let cols = isInteger(ncol) ? ncol : 1;

    if (typeof arr === 'number') {
      super(arr, rows, cols);
      return this;
    }

    if (Matrix.isMatrix(arr)) {
      super(
        arr._e,
        nrow === undefined ? arr._nrow : rows,
        ncol === undefined ? arr._ncol : ncol,
      );
      return this;
    }

    const internal = arrayLikeToArray(arr);

    if (nrow === undefined) rows = internal.length;

    if (byRow === true && cols !== 1 && rows !== 1) {
      super(internal, cols, rows);
      return this.transpose();
    }

    super(internal, rows, cols);
    return this;
  }

  /** @internal */
  protected create(
    arr: number | number[],
    {nrow = this.nrow, ncol = this.ncol, byrow = false}: IDimensions,
  ): this {
    if (!isInteger(nrow) || !isInteger(ncol))
      throw new TypeError('nrow and ncol must be integer');

    return new (this.constructor as any)(arr, nrow, ncol, byrow);
  }

  /**
   * @returns a copy of a {@link TMatrixLike} as a {@link Matrix}
   * @group Copy methods
   */
  toMatrix(): Matrix {
    return this.copy();
  }

  /**
   * @returns a copy of the {@link TMatrixLike} as a {@link ColumnVector}
   * @group Copy methods
   */
  toColumnVector(): ColumnVector {
    return new ColumnVector(this._e, this._nelements);
  }

  /**
   * @returns a copy of the {@link TMatrixLike} as a {@link RowVector}
   * @group Copy methods
   */
  toRowVector(): RowVector {
    return new RowVector(this._e, this._nelements);
  }

  /**
   * @returns `true` if `mat` is a {@link Matrix}
   * @group Static methods
   */
  static isMatrix(mat: any): mat is Matrix {
    return mat instanceof Matrix;
  }

  // CREATE TYPES
  /**
   * Generates a {@link Matrix} of random numbers on [0, 1).
   *
   * @param seed - A seed used in the random number generator.
   * @group Static methods
   */
  static createRandom(
    nrow: number,
    ncol: number,
    seed?: string | number,
  ): Matrix {
    return new Matrix(randomArray(nrow * ncol, seed), nrow, ncol);
  }

  /**
   * @returns a new diagonal matrix of elements in arr
   * @param nrow - size of the diagonal matrix
   * @group Static methods
   */
  static createDiagonal(arr: number | number[], nrow?: number): Matrix {
    if (isInteger(arr)) {
      if (!isInteger(nrow))
        throw new TypeError('nrow must be defined if arr is number');

      const s = new Matrix(0.0, nrow, nrow);

      for (let i = 0; i < nrow; i++) {
        s.edRC(i, i, arr);
      }

      return s;
    }

    if (!Array.isArray(arr)) throw new TypeError('arr must be array or number');

    let n = nrow ?? arr.length;
    if (n > arr.length)
      throw new RangeError('nrow cant be larger than arr.length');

    const s = new Matrix(0.0, n, n);

    for (let i = 0; i < n; i++) {
      s.edRC(i, i, arr[i]);
    }

    return s;
  }

  /**
   * @returns a new identity matrix of size `nrow * nrow`.
   * @group Static methods
   */
  static createIdentity(nrow: number): Matrix {
    return Matrix.createDiagonal(1, nrow);
  }

  /**
   * @returns the contents of the {@link TMatrixLike} at column index `column`
   *   as a {@link ColumnVector}
   * @group Copy methods
   * @group Accessors
   */
  extractColumn(column: number): ColumnVector {
    if (!Number.isInteger(column) || column < 0 || this._ncol <= column)
      throw new RangeError('column out of bounds: ' + column);

    return new ColumnVector(
      this._e.slice(column * this._nrow, (column + 1) * this._nrow),
      this._nrow,
    );
  }
  /**
   * @returns the contents of the {@link TMatrixLike} at column indices `columns`
   *   as a {@link Matrix}
   * @group Copy methods
   * @group Accessors
   */
  extractColumns(columns: number[]): Matrix {
    if (!Array.isArray(columns)) throw new TypeError('columns must be array');
    if (!columns.every((e) => Number.isInteger(e) && 0 <= e && e < this._ncol))
      throw new RangeError('columns must be in valid range');

    const s = new Matrix(0.0, this._nrow, columns.length);

    for (let c = 0; c < columns.length; c++) {
      s._e.splice(
        c * this._nrow,
        (c + 1) * this._nrow,
        ...this._e.slice(
          columns[c] * this._nrow,
          (columns[c] + 1) * this._nrow,
        ),
      );
    }

    return s;
  }
  /**
   * @returns the contents of the {@link TMatrixLike} at row index `row`
   *   as a {@link RowVector}
   * @group Copy methods
   * @group Accessors
   */
  extractRow(row: number): RowVector {
    if (!Number.isInteger(row) || row < 0 || this._nrow <= row)
      throw new RangeError('row out of bounds: ' + row);

    const s = new RowVector(0, this._ncol);

    for (let c = 0; c < this._ncol; c++) {
      s.ed(c, this.atRC(row, c));
    }

    return s;
  }
  /**
   * @returns the contents of the {@link TMatrixLike} at row indices `rows`
   *   as a {@link Matrix}
   * @group Copy methods
   * @group Accessors
   */
  extractRows(rows: number[]): Matrix {
    if (!Array.isArray(rows)) throw new TypeError('rows must be array');
    if (!rows.every((e) => Number.isInteger(e) && 0 <= e && e < this._ncol))
      throw new RangeError('rows must be in valid range');

    const s = new Matrix(0.0, rows.length, this._ncol);

    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < this._ncol; c++) {
        s.edRC(r, c, this.atRC(rows[r], c));
      }
    }

    return s;
  }
  /**
   * @param rowStart - The index of the first row to include in the submatrix.
   * @param columnStart - The index of the first column to include in the submatrix.
   * @param rowEnd - The index of the last row to include in the submatrix.
   * @param columnEnd - The index of the last column to include in the submatrix.
   * @returns the contents of the {@link TMatrixLike} at the sub-matrix defined
   *   by the parameters.
   * @group Copy methods
   * @group Accessors
   */
  extractSubMatrix(
    rowStart: number = 0,
    columnStart: number = 0,
    rowEnd: number = this.nrow - 1,
    columnEnd: number = this.ncol - 1,
  ): this {
    if (!Number.isInteger(rowStart) || !Number.isInteger(rowEnd))
      throw new RangeError('rows must be integer');
    if (!Number.isInteger(columnStart) || !Number.isInteger(columnEnd))
      throw new RangeError('columns must be integer');
    if (rowStart < 0 || this._nrow <= rowEnd)
      throw new RangeError('rows out of bounds');
    if (columnStart < 0 || this._nrow <= columnEnd)
      throw new RangeError('rows out of bounds');

    const rows = rowEnd - rowStart + 1;
    const cols = columnEnd - columnStart + 1;

    if (rows < 1 || cols < 1)
      throw new RangeError('end must be at least as large as start');

    const s = new Array(cols * rows);

    for (let i = 0; i < cols; i++) {
      s.splice(
        i * rows,
        (i + 1) * rows,
        ...this._e.slice(
          this.rcToIndex(rowStart, columnStart + i),
          this.rcToIndex(rowEnd, columnStart + i) + 1,
        ),
      );
    }

    return this.create(s, {nrow: rows, ncol: cols});
  }

  /**
   * @returns a transpose of the matrix as a new {@link Matrix}
   * @group Copy methods
   */
  transpose(): Matrix {
    const s = this.create(0.0, {nrow: this._ncol, ncol: this._nrow});
    // const s = new Matrix(0.0, this._ncol, this._nrow);

    this.forEach((e, i) => {
      s.edRC(this.indexToCol(i), this.indexToRow(i), e);
    });

    return s;
  }

  /**
   * Performs matrix multiplication
   * @group Basic operators
   */
  mmult(mat: BaseMatrix): Matrix {
    const s = this._matrixMultiply(mat);

    return new Matrix(s, this._nrow, mat.ncol);
  }

  // OWN
  // MATRIX SPECIFIC
  /**
   * Bind multiple {@link TMatrixLike}s together by columns
   * @throws `RangeError` if the number of rows of the {@link TMatrixLike}
   *   does not match
   * @group Static methods
   */
  static cbind(...matrices: TMatrixLike[]): Matrix {
    if (!matrices.every(BaseMatrix.isBaseMatrix))
      throw new TypeError('Not all arguments are of type BaseMatrix');
    if (matrices.length === 0) throw new Error('Nothing to cbind');

    const nrows = matrices[0].nrow;

    if (!matrices.every((m) => nrows === m.nrow))
      throw new RangeError('Dimensions of matrices does not match');

    const ncols = matrices.reduce((s, m) => s + m.ncol, 0);
    return new Matrix(
      matrices.flatMap((m) => m.internal),
      nrows,
      ncols,
    );
  }

  /**
   * Bind multiple {@link TMatrixLike}s together by rows
   * @throws `RangeError` if the number of columns of the {@link TMatrixLike}
   *   does not match
   * @group Static methods
   */
  static rbind(...matrices: TMatrixLike[]): Matrix {
    if (!matrices.every(BaseMatrix.isBaseMatrix))
      throw new TypeError('Not all arguments are of type BaseMatrix');
    if (matrices.length === 0) throw new Error('Nothing to cbind');

    const ncols = matrices[0].ncol;

    if (!matrices.every((m) => ncols === m.ncol))
      throw new RangeError('Dimensions of matrices does not match');

    const nrows = matrices.reduce((s, m) => s + m.nrow, 0);

    const s = new Matrix(0, nrows, ncols);

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
   * @returns the diagonal of the matrix as a {@link RowVector} if `asRow` is `true`,
   *   {@link ColumnVector} otherwise
   * @group Accessors
   */
  diagonal(asRow = false): TVectorLike {
    const rc = Math.min(this._nrow, this._ncol);
    const s =
      asRow === true ? new RowVector(0.0, rc) : new ColumnVector(0.0, rc);

    return s.mapInPlace((_, i) => this.atRC(i, i));
  }

  // Column operations
  /**
   * Calculates the column sums
   * @returns {@link RowVector} if `asRow` is `true`, {@link ColumnVector} otherwise
   * @group Column operations
   */
  colSums(asRow: boolean = false): TVectorLike {
    const s =
      asRow === true
        ? new RowVector(0.0, this._ncol)
        : new ColumnVector(0.0, this._ncol);

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
   * @returns {@link RowVector} if `asRow` is `true`, {@link ColumnVector} otherwise
   * @group Column operations
   */
  colMeans(asRow: boolean = false): TVectorLike {
    return this.colSums(asRow).mapInPlace((e) => e / this.nrow);
  }

  /**
   * Calculates the column variances, using `n-1` as denominator.
   * @returns {@link RowVector} if `asRow` is `true`, {@link ColumnVector} otherwise
   * @group Column operations
   */
  colVars(asRow: boolean = false): TVectorLike {
    const s =
      asRow === true
        ? new RowVector(0.0, this._ncol)
        : new ColumnVector(0.0, this._ncol);

    const means = this.colMeans(asRow);
    const nishRows = this._nrow - 1;

    return s.mapInPlace(
      (_, i) =>
        this.extractColumn(i).subtractScalar(means.at(i)).math('pow', 2).sum() /
        nishRows,
    );
  }

  /**
   * Calculates the column standard deviations, using `n-1` as denominator.
   * @returns {@link RowVector} if `asRow` is `true`, {@link ColumnVector} otherwise
   * @group Column operations
   */
  colSds(asRow: boolean = false): TVectorLike {
    return this.colVars(asRow).mapInPlace(Math.sqrt);
  }

  /**
   * Calculates the column minimum values
   * @returns {@link RowVector} if `asRow` is `true`, {@link ColumnVector} otherwise
   * @group Column operations
   */
  colMins(asRow: boolean = false): TVectorLike {
    const s =
      asRow === true
        ? new RowVector(0.0, this._ncol)
        : new ColumnVector(0.0, this._ncol);

    return s.mapInPlace((_, i) =>
      Math.min(...this._e.slice(i * this._nrow, (i + 1) * this._nrow)),
    );
  }

  /**
   * Calculates the column maximum values
   * @returns {@link RowVector} if `asRow` is `true`, {@link ColumnVector} otherwise
   * @group Column operations
   */
  colMaxs(asRow: boolean = false): TVectorLike {
    const s =
      asRow === true
        ? new RowVector(0.0, this._ncol)
        : new ColumnVector(0.0, this._ncol);

    return s.mapInPlace((_, i) =>
      Math.max(...this._e.slice(i * this._nrow, (i + 1) * this._nrow)),
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
    let offset: TVectorLike;
    let denom: TVectorLike;

    if (normalize === true) {
      offset = this.colMins();
      denom = this.colMaxs().subtract(offset, true);
    } else {
      offset = this.colMeans();
      denom = this.colSds();
    }

    return this.copy().mapInPlace((e, i) => {
      const col = this.indexToCol(i);
      return (e - offset.at(col)) / denom.at(col);
    });
  }

  /**
   * @returns the covariance matrix
   * @group Statistics
   */
  covariance(): Matrix {
    const means = this.colMeans();

    const xme = this.copy().mapInPlace(
      (e, i) => e - means.at(this.indexToCol(i)),
    );

    return xme
      .t()
      .mmult(xme)
      .divideScalar(this.nrow - 1);
  }

  /**
   * @returns the matrix in reduced row echelon format
   * @group Linear algebra
   */
  reducedRowEchelon(eps: number = 1e-9, inPlace: boolean = false): Matrix {
    if (inPlace === true) {
      reducedRowEchelonForm(this._e, this._nrow, this._ncol, eps);
      return this;
    }

    const s = this.internal;
    reducedRowEchelonForm(s, this._nrow, this._ncol, eps);
    return new Matrix(s, this._nrow, this._ncol);
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
    if (!this.isSquare()) {
      throw new Error('Matrix must be square');
    }

    return this.rightTriangular().diagonal().prod();
  }

  /**
   * @returns the inverse of the matrix
   * @group Linear algebra
   */
  inverse(): Matrix | null {
    if (!this.isSquare()) throw new Error('Matrix is not square.');

    if (this.determinant() === 0) {
      console.warn('Determinant is 0.');
      return null;
    }

    const sim = Matrix.cbind(
      this,
      Matrix.createIdentity(this._nrow),
    ).reducedRowEchelon();
    return new Matrix(
      sim.internal.slice(this._nelements),
      this._nrow,
      this._ncol,
    );
  }
}
export {Matrix};

// Convert to list .list
// Convert to JSON .toJSON
