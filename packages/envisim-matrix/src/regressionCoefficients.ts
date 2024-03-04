import {ColumnVector} from './base/ColumnVector.js';
import {Matrix} from './base/Matrix.js';

/**
 * Calculates the coefficients B of `this = xmat * B`
 *
 * @param yvec the dependent variable
 * @param xmat the independent variables, beginning with a column of ones
 * @returns the regression coefficients
 */
export function regressionCoefficients(
  yvec: ColumnVector,
  xmat: Matrix,
): ColumnVector {
  if (yvec.nrow !== xmat.nrow)
    throw new RangeError('xmat has not same number of rows as this');
  if (xmat.ncol > xmat.nrow)
    throw new RangeError(
      'xmat has more columns than rows, no unique solution exists',
    );

  const xmi = xmat.transpose().mmult(xmat).inverse();

  if (xmi === null) throw new Error('xmat is not invertible');

  return new ColumnVector(yvec.transpose().mmult(xmat).mmult(xmi), true);
}
