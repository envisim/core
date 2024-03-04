import {randomArray} from '@envisim/random';

import {BaseMatrix} from './BaseMatrix.js';
import {BaseVector} from './BaseVector.js';
import {RowVector} from './RowVector.js';

export class ColumnVector extends BaseVector {
  /**
   * @returns `true` if `mat` is inherited from ColumnVector
   * @group Static methods
   * @group Property methods
   */
  static isColumnVector(mat: unknown): mat is ColumnVector {
    return mat instanceof ColumnVector;
  }

  /**
   * @param msg message to pass, defaults to `"Expected ColumnVector"`
   * @returns `true` if `obj` is ColumnVector
   * @throws TypeError if `obj` is not ColumnVector
   * @group Static methods
   * @group Property methods
   */
  static override assert(obj: unknown, msg?: string): obj is ColumnVector {
    if (obj instanceof ColumnVector) return true;
    throw new TypeError(msg ?? 'Expected ColumnVector');
  }

  /**
   * @returns a new ColumnVector of size `nrow` filled with `fill`
   * @group Static methods
   */
  static create(fill: number, nrow: number): ColumnVector {
    return new ColumnVector(new Array<number>(nrow).fill(fill), true);
  }

  /**
   * @param arr the values used to form the ColumnVector
   * @param shallow if `true`, uses the internal arrays of `arr` as a reference
   */
  constructor(arr: number[] | BaseMatrix, shallow: boolean = false) {
    if (Array.isArray(arr)) {
      super(shallow === true ? arr : arr.slice(), arr.length, 1);
      return;
    }

    if (BaseMatrix.isBaseMatrix(arr)) {
      super(shallow === true ? arr.internal : arr.slice(), arr.length, 1);
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
   * @group Accessors
   */
  extractRows(rows: number[]): ColumnVector {
    if (!Array.isArray(rows)) throw new TypeError('rows must be array');
    if (!rows.every(Number.isInteger))
      throw new TypeError('rows must consist of integers');

    const s = ColumnVector.create(0.0, rows.length);

    for (let i = 0; i < rows.length; i++) {
      s.ed(i, this.at(rows[i]!));
    }

    return s;
  }

  /**
   * @group Copy methods
   */
  transpose(): RowVector {
    return new RowVector(this);
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

  const s = ColumnVector.create(0.0, dim);
  let current = from;
  const b = to < from ? -by : by;

  for (let i = 0; i < dim; i++) {
    s.ed(i, current);
    current += b;
  }

  return s;
}
