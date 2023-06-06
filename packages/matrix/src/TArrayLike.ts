import {ColumnVector} from './ColumnVector.js';
import {RowVector} from './RowVector.js';

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
