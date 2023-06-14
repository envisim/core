import {ColumnVector} from './base/ColumnVector.js';
import {RowVector} from './base/RowVector.js';

export type TArrayLike = number[] | ColumnVector | RowVector;

export function arrayLikeToArray(
  arr: TArrayLike,
  shallow: boolean = false,
): number[] {
  if (Array.isArray(arr)) {
    return shallow === true ? arr : arr.slice();
  }

  return shallow === true ? arr.internal : arr.slice();
}

export function isVector(obj: unknown): obj is ColumnVector | RowVector {
  return ColumnVector.isColumnVector(obj) || RowVector.isRowVector(obj);
}
