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

  static assert(obj: any, msg?: string): obj is RowVector {
    if (obj instanceof RowVector) return true;
    throw new TypeError(msg ?? 'Expected RowVector');
  }

  static create(fill: number, nrow: number): RowVector {
    return new RowVector(new Array<number>(nrow).fill(fill), true);
  }

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
