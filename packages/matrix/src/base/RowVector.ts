import {BaseMatrix} from './BaseMatrix.js';
import {BaseVector} from './BaseVector.js';
import {ColumnVector} from './ColumnVector.js';

export class RowVector extends BaseVector {
  /**
   * @returns `true` if `mat` is inherited from RowVector
   * @group Static methods
   * @group Property methods
   */
  static isRowVector(mat: unknown): mat is RowVector {
    return mat instanceof RowVector;
  }

  /**
   * @param msg message to pass, defaults to `"Expected RowVector"`
   * @returns `true` if `obj` is RowVector
   * @throws TypeError if `obj` is not RowVector
   * @group Static methods
   * @group Property methods
   */
  static assert(obj: unknown, msg?: string): obj is RowVector {
    if (obj instanceof RowVector) return true;
    throw new TypeError(msg ?? 'Expected RowVector');
  }

  /**
   * @returns a new RowVector of size `nrow` filled with `fill`
   * @group Static methods
   */
  static create(fill: number, nrow: number): RowVector {
    return new RowVector(new Array<number>(nrow).fill(fill), true);
  }

  /**
   * @param arr the values used to form the RowVector
   * @param shallow if `true`, uses the internal arrays of `arr` as a reference
   */
  constructor(arr: number[] | BaseMatrix, shallow: boolean = false) {
    if (Array.isArray(arr)) {
      super(shallow === true ? arr : arr.slice(), 1, arr.length);
      return;
    }

    if (BaseMatrix.isBaseMatrix(arr)) {
      super(shallow === true ? arr.internal : arr.slice(), 1, arr.length);
      return;
    }

    throw new TypeError('unknown type of arr');
  }

  /**
   * @internal
   */
  create(arr: number[]): RowVector {
    return new RowVector(arr);
  }

  /**
   * @group Copy methods
   */
  copy(): RowVector {
    return new RowVector(this);
  }

  /**
   * @group Copy methods
   * @group Accessors
   */
  extractColumns(cols: number[]): RowVector {
    if (!Array.isArray(cols)) throw new TypeError('cols must be array');
    if (!cols.every(Number.isInteger))
      throw new TypeError('cols must consist of integers');

    const s = RowVector.create(0.0, cols.length);

    for (let i = 0; i < cols.length; i++) {
      s.ed(i, this.at(cols[i]));
    }

    return s;
  }

  /**
   * @group Copy methods
   */
  transpose(): ColumnVector {
    return new ColumnVector(this);
  }
}
