import {BaseMatrix} from './BaseMatrix.js';
import {BaseVector} from './BaseVector.js';
import {ColumnVector} from './ColumnVector.js';

export class RowVector extends BaseVector {
  constructor(fill: number, ncol: number);
  constructor(arr: number[]);
  constructor(vec: BaseMatrix);
  constructor(arr: number | number[] | BaseMatrix, ncol?: number) {
    if (typeof arr === 'number') {
      super(arr, 1, ncol ?? 0);
      return;
    }

    if (Array.isArray(arr) || BaseMatrix.isBaseMatrix(arr)) {
      super(arr.slice(), 1, arr.length);
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
  extractColumns(cols: number[]): RowVector {
    if (!Array.isArray(cols)) throw new TypeError('cols must be array');
    if (!cols.every(Number.isInteger))
      throw new TypeError('cols must consist of integers');

    const s = new RowVector(0, cols.length);

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
