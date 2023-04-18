import {Vector} from './Vector.js';
import {Matrix} from './Matrix.js';
import {RowVector} from './RowVector.js';
import type {IDimensions, TArrayLike} from './types.js';
import {arrayLikeToArray, isInteger} from './utils.js';

class ColumnVector extends Vector {
  /**
   * If `arr` is {@link TArrayLike} , and the size of `arr` is less than
   * the size of `arr`, the {@link ColumnVector} will be padded with `0.0`.
   *
   * If `arr` is `number`, the {@link ColumnVector} will be filled by it.
   *
   * @param arr - values to fill the {@link ColumnVector} with.
   * @param nrow - the number of rows of the {@link ColumnVector}
   */
  constructor(arr: number | TArrayLike, nrow?: number) {
    super(typeof arr === 'number' ? arr : arrayLikeToArray(arr), nrow, false);
    return this;
  }

  /** @internal */
  protected create(arr: number | TArrayLike, {nrow}: IDimensions): this {
    if (!isInteger(nrow)) throw new TypeError('nrow must be integer');
    return new (this.constructor as any)(arr, nrow);
  }

  /**
   * {@inheritDoc Matrix.toColumnVector}
   * @group Copy methods
   */
  toColumnVector(): ColumnVector {
    return this.copy();
  }
  /**
   * {@inheritDoc Matrix.toRowVector}
   * @group Copy methods
   */
  toRowVector(): RowVector {
    return new RowVector(this.internal, this.nrow);
  }

  /**
   * @returns `true` if `vec` is a {@link ColumnVector}
   * @group Static methods
   * @group Property methods
   */
  static isColumnVector(vec: any): vec is ColumnVector {
    return vec instanceof ColumnVector;
  }

  /**
   * {@inheritDoc Matrix.extractColumn}
   * @group Copy methods
   * @group Accessors
   */
  extractColumn(column: number): ColumnVector {
    if (column !== 0)
      throw new RangeError('only 1 column exists in columnvector');

    return this.copy();
  }
  /**
   * {@inheritDoc Matrix.extractColumns}
   * @group Copy methods
   * @group Accessors
   */
  extractColumns(columns: number[]): Matrix {
    if (!Array.isArray(columns)) throw new TypeError('columns must be array');
    if (!columns.every((e) => e === 0))
      throw new TypeError('columns must consist of 0');

    const n = columns.length;
    const s = new Array(n * this.nrow);

    for (let i = 0; i < n; i++) {
      s.splice(i * this.nrow, (i + 1) * this.nrow, ...this._e);
    }

    return new Matrix(s, this.nrow, n);
  }
  /**
   * {@inheritDoc Matrix.extractRow}
   * @group Copy methods
   * @group Accessors
   */
  extractRow(row: number): RowVector {
    return new RowVector(this.atIndex(row), 1);
  }
  /**
   * {@inheritDoc Matrix.extractRows}
   * @group Copy methods
   * @group Accessors
   */
  extractRows(rows: number[]): Matrix {
    if (!Array.isArray(rows)) throw new TypeError('rows must be array');
    if (!rows.every(Number.isInteger))
      throw new TypeError('rows must consist of integers');

    const s = new Matrix(0.0, rows.length, 1);

    for (let i = 0; i < rows.length; i++) {
      s.edIndex(i, this.atIndex(rows[i]));
    }

    return s;
  }
  /**
   * {@inheritDoc Matrix.extractSubMatrix}
   * @group Copy methods
   * @group Accessors
   */
  extractSubMatrix(rowStart: number = 0, rowEnd: number = this.nrow - 1): this {
    if (!Number.isInteger(rowStart) || !Number.isInteger(rowEnd))
      throw new RangeError('rows must be integer');
    if (rowStart < 0 || this.nrow <= rowEnd)
      throw new RangeError('rows out of bounds');

    const rows = rowEnd - rowStart + 1;

    if (rows < 1)
      throw new RangeError('end must be at least as large as start');

    const s = this._e.slice(rowStart, rowEnd + 1);

    return this.create(s, {nrow: rows, ncol: 1});
  }

  /**
   * @returns the transpose of the column vector as a {@link RowVector}
   * @see {@link toRowVector}
   * @group Copy methods
   */
  transpose(): RowVector {
    return this.toRowVector();
  }
  // COLUMNVECTOR SPECIFIC
  /**
   * Calculates the coefficients B of `this = xmat * B`
   *
   * @params xmat - the explanatory/independent variables
   * @returns the regression coefficients
   * @group Statistics
   */
  regressionCoefficients(xmat: Matrix): ColumnVector {
    if (this.nrow !== xmat.nrow)
      throw new RangeError('xmat has not same number of rows as this');
    if (xmat.ncol > xmat.nrow)
      throw new RangeError(
        'xmat has more columns than rows, no unique solution exists',
      );

    const xmatt = xmat.t();
    const xmi = xmatt.mmult(xmat).inverse();

    if (xmi === null) throw new Error('xmat is not invertible');

    return xmi.mmult(xmatt).mmult(this).toColumnVector();
  }

  /**
   * Generates a {@link Vector} of a sequence of numbers.
   *
   *     const seq1 = ColumnVector.createSequence(0, 2, 0.5);
   *     // seq1 is a ColumnVector with elements [0.0, 0.5, 1.0, 1.5, 2.0]
   *     const seq2 = ColumnVector.createSequence(0, 1.9, 0.5);
   *     // seq2 is a ColumnVector with elements [0.0, 0.5, 1.0, 1.5]
   *
   * @function createSequence
   * @param {number} from The starting number in the sequence.
   * @param {number} to A number for which the sequence will not generate beyond.
   * @param {number} by The incrementing (or decrementing) size of the sequence.
   *   Must be positive.
   * @returns A vector of size needed to reach `to`, however not going over it.
   */
}

export {ColumnVector};
