import {ColumnVector} from './base/ColumnVector.js';
import {RowVector} from './base/RowVector.js';

/**
 * @deprecated Use ColumnVector | number[] instead.
 */
export type TArrayLike = number[] | ColumnVector | RowVector;

/**
 * @deprecated Use vectorToArray instead.
 */
export function arrayLikeToArray(
  arr: number[] | ColumnVector | RowVector,
  shallow: boolean = false,
): number[] {
  if (Array.isArray(arr)) {
    return shallow === true ? arr : arr.slice();
  }

  return shallow === true ? arr.internal : arr.slice();
}

/**
 * @deprecated Use ColumnVector.isColumnVector instead.
 */
export function isVector(obj: unknown): obj is ColumnVector | RowVector {
  return ColumnVector.isColumnVector(obj) || RowVector.isRowVector(obj);
}

export function vectorToArray(
  array: ColumnVector | number[],
  shallow: boolean = false,
): number[] {
  return shallow
    ? ColumnVector.isColumnVector(array)
      ? array.internal
      : array
    : array.slice();
}

export function assertLength(
  array: ColumnVector | number[],
  length: number,
  argName: string = 'array',
): void {
  if (array.length !== length)
    throw new RangeError(`Size of ${argName} must be ${length}`);
}

export function vectorToArrayOfLength(
  array: ColumnVector | number[],
  length: number,
  shallow: boolean = false,
  argName: string = 'array',
): number[] {
  assertLength(array, length, argName);
  return vectorToArray(array, shallow);
}
