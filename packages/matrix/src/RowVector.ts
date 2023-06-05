import {ColumnVector} from './ColumnVector.js';
import {Matrix} from './Matrix.js';
import {Vector} from './Vector.js';
import type {IDimensions, TArrayLike} from './types.js';
import {arrayLikeToArray, isInteger} from './utils.js';

class RowVector extends Vector {
  /**
   * If `arr` is {@link TArrayLike} , and the size of `arr` is less than
   * the size of `arr`, the {@link RowVector} will be padded with `0.0`.
   *
   * If `arr` is `number`, the {@link RowVector} will be filled by it.
   *
   * @param arr - values to fill the {@link RowVector} with.
   * @param ncol - the number of columns of the {@link RowVector}
   */
  constructor(arr: number | TArrayLike, ncol?: number) {
    super(typeof arr === 'number' ? arr : arrayLikeToArray(arr), ncol, true);
    return this;
  }

  /** @internal */
  protected create(arr: number | TArrayLike, {ncol}: IDimensions): this {
    if (!isInteger(ncol)) throw new TypeError('ncol must be integer');
    return new (this.constructor as any)(arr, ncol);
  }

  /**
   * {@inheritDoc Matrix.toColumnVector}
   * @group Copy methods
   */
  toColumnVector(): ColumnVector {
    return new ColumnVector(this._e, this._ncol);
  }
  /**
   * {@inheritDoc Matrix.toRowVector}
   * @group Copy methods
   */
  toRowVector(): RowVector {
    return this.copy();
  }

  /**
   * @returns `true` if `vec` is a {@link RowVector}
   * @group Static methods
   * @group Property methods
   */
  static isRowVector(vec: unknown): vec is RowVector {
    return vec instanceof RowVector;
  }

  /**
   * {@inheritDoc Matrix.extractColumn}
   * @group Copy methods
   */
  extractColumn(column: number): ColumnVector {
    return new ColumnVector(this.at(column), 1);
  }
  /**
   * {@inheritDoc Matrix.extractColumns}
   * @group Copy methods
   */
  extractColumns(columns: number[]): Matrix {
    if (!Array.isArray(columns)) throw new TypeError('columns must be array');
    if (!columns.every(Number.isInteger))
      throw new TypeError('rows must consist of integers');

    const s = new Matrix(0.0, 1, columns.length);

    for (let i = 0; i < columns.length; i++) {
      s.ed(i, this.at(columns[i]));
    }

    return s;
  }
  /**
   * {@inheritDoc Matrix.extractRow}
   * @group Copy methods
   */
  extractRow(row: number): RowVector {
    if (row !== 0) throw new RangeError('only 1 row exists in RowVector');

    return this.copy();
  }
  /**
   * {@inheritDoc Matrix.extractRows}
   * @group Copy methods
   */
  extractRows(rows: number[]): Matrix {
    if (!Array.isArray(rows)) throw new TypeError('rows must be array');
    if (!rows.every((e) => e === 0))
      throw new TypeError('rows must consist of integers');

    const n = rows.length;
    const s = new Array<number>(n * this._ncol);

    for (let i = 0; i < this._ncol; i++) {
      s.splice(i * n, (i + 1) * n, ...new Array<number>(n).fill(this.at(i)));
    }

    return new Matrix(s, n, this._ncol);
  }
  /**
   * {@inheritDoc Matrix.extractSubMatrix}
   * @group Copy methods
   */
  extractSubMatrix(
    columnStart: number = 0,
    columnEnd: number = this.ncol - 1,
  ): this {
    if (!Number.isInteger(columnStart) || !Number.isInteger(columnEnd))
      throw new RangeError('columns must be integer');
    if (columnStart < 0 || this._ncol <= columnEnd)
      throw new RangeError('rows out of bounds');

    const cols = columnEnd - columnStart + 1;

    if (cols < 1)
      throw new RangeError('end must be at least as large as start');

    const s = this._e.slice(columnStart, columnEnd + 1);

    return this.create(s, {nrow: 1, ncol: cols});
  }

  /**
   * @returns the transpose of the row vector as a {@link ColumnVector}
   * @see {@link toColumnVector}
   * @group Copy methods
   */
  transpose(): ColumnVector {
    return this.toColumnVector();
  }
}

export {RowVector};
