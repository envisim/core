// import type { ColumnVector } from './ColumnVector.js';
import type {Matrix} from './Matrix.js';
import {Vector} from './Vector.js';

// import type { RowVector } from './RowVector.js';

/**
 * @see {@link ColumnVector}
 * @see {@link RowVector}
 */
// export type TVectorLike = ColumnVector | RowVector;
export type TVectorLike = Vector;

/**
 * @see {@link Matrix}
 * @see {@link ColumnVector}
 * @see {@link RowVector}
 */
export type TMatrixLike = Matrix | TVectorLike;

/**
 * @see {@link ColumnVector}
 * @see {@link RowVector}
 */
export type TArrayLike = number[] | TVectorLike;

export interface IDimensions {
  /** Number of rows */
  nrow?: number;
  /** Number of columns */
  ncol?: number;
  /** `true` if {@link TMatrixLike} is stored by rows */
  byrow?: boolean;
}

export interface IIteratorReturn {
  /** `true` if the last value of the sequence has already been consumed */
  done: boolean;
  /** The next value in the iteration sequence. */
  value: number;
  /** The index of the next value in the iteration sequence */
  index: number;
  /** The row index of the next value in the iteration sequence */
  row: number;
  /** The column index of the next value in the iteration sequence */
  col: number;
}

export interface ICallbackCompare {
  (a: number, b: number): number;
}

export interface ICallbackMap<T> {
  (element: number, index: number, _e: number[]): T;
}

export interface ICallbackIndex {
  (element: number, index: number, ...args: any[]): number;
}

export type TMath =
  | 'abs'
  | 'acos'
  | 'acosh'
  | 'asin'
  | 'asinh'
  | 'atan'
  | 'atanh'
  | 'cbrt'
  | 'ceil'
  | 'cos'
  | 'cosh'
  | 'exp'
  | 'expm1'
  | 'floor'
  | 'fround'
  | 'log'
  | 'log10'
  | 'log1p'
  | 'log2'
  | 'max'
  | 'min'
  | 'pow'
  | 'round'
  | 'sign'
  | 'sin'
  | 'sinh'
  | 'sqrt'
  | 'tan'
  | 'tanh'
  | 'trunc';

/** @internal */
export interface IMath {
  [name: string]: (x: number) => number;
}
