/** @module matrix */

export {Matrix} from './Matrix.js';
export {ColumnVector} from './ColumnVector.js';
export {RowVector} from './RowVector.js';
export {
  arrayLikeToArray,
  arrayLikeToColumnVector,
  isArrayLike,
} from './utils.js';

export type {
  // Interfaces
  ICallbackCompare,
  ICallbackIndex,
  ICallbackMap,
  IDimensions,
  IIteratorReturn,
  // Types
  TArrayLike,
  TMath,
  TMatrixLike,
  TVectorLike,
} from './types.js';
