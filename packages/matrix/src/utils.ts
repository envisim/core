import {ColumnVector} from './ColumnVector.js';
import {Vector} from './Vector.js';
import {TArrayLike} from './types.js';

/**
 * @returns a copy of the {@link TArrayLike} as a `number[]`
 */
export const arrayLikeToArray = (obj: TArrayLike): number[] => {
  if (Array.isArray(obj)) return obj.slice();
  if (Vector.isVector(obj)) return obj.internal;
  throw new TypeError('argument is not TArrayLike');
};

/**
 * @returns a copy of the {@link TArrayLike} as a {@link ColumnVector}
 */
export const arrayLikeToColumnVector = (obj: TArrayLike): ColumnVector => {
  if (Array.isArray(obj)) return new ColumnVector(obj, obj.length);
  if (Vector.isVector(obj)) return obj.toColumnVector();
  throw new TypeError('argument is not TArrayLike');
};

/**
 * @returns `true` if n is integer valued
 */
export const isInteger = (n: any): n is number => {
  return n !== undefined && Number.isInteger(n);
};

/**
 * @returns `true` if n is integer valued and positive
 */
export const isPositiveInteger = (n: any): n is number => {
  return n !== undefined && Number.isInteger(n) && n > 0;
};

/**
 * @returns `true` if `arr` is {@link TArrayLike}
 */
export const isArrayLike = (arr: any): arr is TArrayLike => {
  return Array.isArray(arr) || Vector.isVector(arr);
};
