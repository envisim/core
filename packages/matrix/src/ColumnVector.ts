import {randomArray} from '../../random/dist/es/random.js';
import {BaseMatrix} from './BaseMatrix.js';
import {BaseVector} from './BaseVector.js';
import {Matrix} from './Matrix.js';
import {RowVector} from './RowVector.js';

export class ColumnVector extends BaseVector {
  constructor(fill: number, nrow: number);
  constructor(arr: number[]);
  constructor(vec: BaseMatrix);
  constructor(arr: number | number[] | BaseMatrix, nrow?: number) {
    if (typeof arr === 'number') {
      super(arr, nrow ?? 0, 1);
      return;
    }

    if (Array.isArray(arr) || BaseMatrix.isBaseMatrix(arr)) {
      super(arr.slice(), arr.length, 1);
      return;
    }

    throw new TypeError('unknown type of arr');
  }

  /**
   * @internal
   */
  create(arr: number[]): ColumnVector {
    return new ColumnVector(arr);
  }

  /**
   * @group Copy methods
   */
  copy(): ColumnVector {
    return new ColumnVector(this);
  }

  /**
   * @group Copy methods
   */
  toColumnVector(): ColumnVector {
    return new ColumnVector(this);
  }

  /**
   * @group Copy methods
   */
  toRowVector(): RowVector {
    return new RowVector(this);
  }

  /**
   * @group Copy methods
   * @group Accessors
   */
  extractRows(rows: number[]): ColumnVector {
    if (!Array.isArray(rows)) throw new TypeError('rows must be array');
    if (!rows.every(Number.isInteger))
      throw new TypeError('rows must consist of integers');

    const s = new ColumnVector(0, rows.length);

    for (let i = 0; i < rows.length; i++) {
      s.ed(i, this.at(rows[i]));
    }

    return s;
  }

  /**
   * @group Copy methods
   */
  transpose(): RowVector {
    return new RowVector(this);
  }

  /**
   * Calculates the coefficients B of `this = xmat * B`
   *
   * @params xmat - the explanatory/independent variables
   * @returns the regression coefficients
   * @group Statistics
   */
  regressionCoefficients(xmat: Matrix): ColumnVector {
    if (this._nrow !== xmat.nrow)
      throw new RangeError('xmat has not same number of rows as this');
    if (xmat.ncol > xmat.nrow)
      throw new RangeError(
        'xmat has more columns than rows, no unique solution exists',
      );

    const xmatt = xmat.transpose();
    const xmi = xmatt.mmult(xmat).inverse();

    if (xmi === null) throw new Error('xmat is not invertible');

    return xmi.mmult(xmatt).mmult(this).toColumnVector();
  }
}

/**
 * Generates a vector-like of random numbers on [0, 1).
 *
 * @param length the length of the vector
 * @param seed a seed used in the random number generator.
 * @returns a vector-like of random numbers on [0, 1).
 */
export function randomVector(
  length: number,
  seed?: string | number,
): ColumnVector {
  return new ColumnVector(randomArray(length, seed));
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
 * @param from The starting number in the sequence.
 * @param to A number for which the sequence will not generate beyond.
 * @param by The incrementing (or decrementing) size of the sequence. Must be positive.
 * @returns A vector of size needed to reach `to`, however not going over it.
 */
export function sequence(
  from: number,
  to: number,
  by: number = 1.0,
): ColumnVector {
  if (by <= 0) throw new RangeError('by must be positive');

  const dim = Math.floor(Math.abs((to - from) / by)) + 1;

  if (dim >= 10000000) throw new RangeError('by is to small');

  const s = new ColumnVector(0.0, dim);
  let current = from;
  const b = to < from ? -by : by;

  for (let i = 0; i < dim; i++) {
    s.ed(i, current);
    current += b;
  }

  return s;
}
