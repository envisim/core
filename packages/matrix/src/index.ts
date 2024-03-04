export {
  Matrix,
  diagonalMatrix,
  identityMatrix,
  randomMatrix,
} from './base/Matrix.js';
export {ColumnVector, randomVector, sequence} from './base/ColumnVector.js';
export {RowVector} from './base/RowVector.js';
export {matrixDims} from './base/matrixDims.js';
export type {MatrixDims, MatrixByRow} from './base/matrixDims.js';

export * from './base/types.js';

export {arrayLikeToArray, isVector} from './TArrayLike.js';
export type {TArrayLike} from './TArrayLike.js';
export {regressionCoefficients} from './regressionCoefficients.js';
