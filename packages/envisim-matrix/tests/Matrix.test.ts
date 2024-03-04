import {describe, expect, test} from 'vitest';

import {
  ColumnVector,
  Matrix,
  RowVector,
  identityMatrix,
  matrixDims,
} from '../src/index.js';
import {createTable} from './_createTable.testf.js';

describe('Matrix', () => {
  const m1 = new Matrix([1, 0, 4, 3, 5, -1, -2, 1, 2], matrixDims(3, 3));
  const m1b = new Matrix([1, 3, -2, 0, 5, 1, 4, -1, 2], matrixDims(3, 3, true));
  const m1t = new Matrix([1, 3, -2, 0, 5, 1, 4, -1, 2], matrixDims(3, 3));
  const m1c2 = new ColumnVector([3, 5, -1]);
  const m1r2 = new RowVector([0, 5, 1]);
  const m1c23 = new Matrix([3, 5, -1, -2, 1, 2], matrixDims(3, 2));
  const m1r12 = new Matrix([1, 3, -2, 0, 5, 1], matrixDims(2, 3, true));
  const m1cr23 = new Matrix([5, -1, 1, 2], matrixDims(2, 2));
  const m1diag = new ColumnVector([1, 5, 2]);
  test('initialization', () => {
    expect(m1.isEqualTo(m1b)).toBe(true);
    expect(m1.isEqualTo(m1t)).toBe(false);
    expect(m1.transpose().isEqualTo(m1t)).toBe(true);
    expect(m1.transpose().isEqualTo(m1t)).toBe(true);
    expect(m1.copy().isEqualTo(m1b)).toBe(true);
    expect(m1.extractColumn(1).isEqualTo(m1c2)).toBe(true);
    expect(m1.extractRow(1).isEqualTo(m1r2)).toBe(true);
    expect(m1.extractRow(0).isEqualTo(m1r2)).toBe(false);
    expect(m1.extractColumns([1, 2]).isEqualTo(m1c23)).toBe(true);
    expect(m1.extractRows([0, 1]).isEqualTo(m1r12)).toBe(true);
    expect(m1.extractSubMatrix(1, 1, 2, 2).isEqualTo(m1cr23)).toBe(true);
  });

  test.each(createTable(m1.extractColumn(1).internal, m1c2.internal))(
    'internal',
    (a, b) => {
      expect(a).toBe(b);
    },
  );

  test('accessors', () => {
    expect(m1.nrow).toBe(3);
    expect(m1cr23.ncol).toBe(2);
    expect(m1.nrow).toBe(m1.size()[0]);
    expect(m1.ncol).toBe(m1.size()[1]);
    expect(m1.nelements).toBe(9);
    expect(m1.diagonal().isEqualTo(m1diag)).toBe(true);
    expect(m1.at(5)).toBe(-1);
    expect(m1.atRC(2, 2)).toBe(2);
    expect(m1b.ed(5, -2)).toBe(-2);
    expect(m1b.at(5)).toBe(-2);
    expect(m1b.edRC(2, 1, -10)).toBe(-10);
    expect(m1b.atRC(2, 1)).toBe(-10);
    expect(m1b.fn(1, (_, i) => i + 10)).toBe(11);
    expect(m1b.fnRC(0, 0, (_, __, r, c) => r + c + 10)).toBe(10);
    m1b.swap(7, 8);
    expect(m1b.at(7)).toBe(2);
    expect(m1b.at(8)).toBe(1);
    m1b.swapRC(2, 2, 1, 2);
    expect(m1b.at(7)).toBe(1);
    expect(m1b.at(8)).toBe(2);
  });

  /*
   *  5 1
   * -1 2
   */
  const m2 = new Matrix([5, -1, 1, 2], matrixDims(2, 2));
  const m2p2 = new Matrix([7, 1, 3, 4], matrixDims(2, 2));
  const m2pp = new Matrix([10, -2, 2, 4], matrixDims(2, 2));
  const m2dd = new Matrix([1, 1, 1, 1], matrixDims(2, 2));
  const m2d2 = new Matrix([2.5, -0.5, 0.5, 1], matrixDims(2, 2));
  const m2abs = new Matrix([5, 1, 1, 2], matrixDims(2, 2));
  const m2pow2 = new Matrix([25, 1, 1, 4], matrixDims(2, 2));
  const m2mmultm2 = new Matrix(
    [25 - 1, -5 - 2, 5 + 2, -1 + 4],
    matrixDims(2, 2),
  );
  const m2mod2 = new Matrix([1, -1, 1, 0], matrixDims(2, 2));
  const m2modm = new Matrix([2, 0, 0, 0], matrixDims(2, 2));
  const m2m2 = new Matrix([10, -2, 2, 4], matrixDims(2, 2));
  const m2mi2 = new Matrix([3, -3, -1, 0], matrixDims(2, 2));
  const m2_0 = Matrix.create(0, matrixDims(2, 2));

  test('basic operators', () => {
    expect(m2.add(m2).isEqualTo(m2pp)).toBe(true);
    expect(m2.add(2).isEqualTo(m2p2)).toBe(true);
    expect(m2.divide(m2).isEqualTo(m2dd)).toBe(true);
    expect(m2.divide(2).isEqualTo(m2d2)).toBe(true);
    expect(m2.math('abs').isCloseTo(m2abs)).toBe(true);
    expect(m2.math('pow', 2).isCloseTo(m2pow2)).toBe(true);
    expect(m2.mmult(m2).isEqualTo(m2mmultm2)).toBe(true);
    expect(m2.mod(2).isEqualTo(m2mod2)).toBe(true);
    expect(m2p2.mod(m2).isEqualTo(m2modm)).toBe(true);
    expect(m2.multiply(m2).isEqualTo(m2pow2)).toBe(true);
    expect(m2.multiply(2).isEqualTo(m2m2)).toBe(true);
    expect(m2.subtract(m2).isEqualTo(m2_0)).toBe(true);
    expect(m2.subtract(2).isEqualTo(m2mi2)).toBe(true);
  });

  const m2colmax = new ColumnVector([5, 2]);
  const m2colmeans = new ColumnVector([2, 1.5]);
  const m2colmins = new ColumnVector([-1, 1]);
  const m2colvars = new ColumnVector([18, 0.5]);
  const m2colsds = new ColumnVector([Math.sqrt(18), Math.sqrt(0.5)]);
  const m2colsums = new ColumnVector([4, 3]);
  const m2colstd1 = new Matrix(
    [3 / Math.sqrt(18), -3 / Math.sqrt(18), -Math.sqrt(0.5), Math.sqrt(0.5)],
    matrixDims(2, 2),
  );
  const m2colstd2 = identityMatrix(2);

  test('column operations', () => {
    expect(m2.colMaxs().isEqualTo(m2colmax)).toBe(true);
    expect(m2.colMeans().isEqualTo(m2colmeans)).toBe(true);
    expect(m2.colMins().isEqualTo(m2colmins)).toBe(true);
    expect(m2.colVars().isEqualTo(m2colvars)).toBe(true);
    expect(m2.colSds().isCloseTo(m2colsds)).toBe(true);
    expect(m2.colSums().isEqualTo(m2colsums)).toBe(true);
    expect(m2.standardizeByCol().isCloseTo(m2colstd1)).toBe(true);
    expect(m2.standardizeByCol(true).isEqualTo(m2colstd2)).toBe(true);
  });

  /*
   *  5 1
   * -1 2
   */
  const m2cov = new Matrix([18, -3, -3, 0.5], matrixDims(2, 2));
  const m3 = new Matrix([1, 3, 3, 4], matrixDims(2, 2));
  const m2matstd1 = new Matrix([1.3, -1.1, -0.3, 0.1], matrixDims(2, 2));
  const m2matstd2 = new Matrix([1, 0, 1 / 3, 0.5], matrixDims(2, 2));

  test('statistics', () => {
    expect(m2.covariance().isEqualTo(m2cov)).toBe(true);
    expect(m2abs.geometricMean()).toBeCloseTo(Math.pow(10, 0.25));
    expect(m2.max()).toBe(5);
    expect(m2.mean()).toBe(1.75);
    expect(m2.median()).toBe(1.5);
    expect(m2.min()).toBe(-1);
    expect(m3.mode()[0]).toBe(3);
    expect(m2.prod()).toBe(-10);
    expect(m2.quantiles([0.5])[0]).toBe(1);
    expect(m2.quantiles(0.4)[0]).toBeCloseTo(0.2);
    expect(m2.sd()).toBe(2.5);
    expect(m2.skewness()).toBeCloseTo(0.3233161507);
    expect(m2.sum()).toBe(7);
    expect(m2.variance()).toBe(6.25);
    expect(m2.standardize().isCloseTo(m2matstd1)).toBe(true);
    expect(m2.standardize(true).isCloseTo(m2matstd2)).toBe(true);
  });

  /*
   * 1  3 -2
   * 0  5  1
   * 4 -1  2
   */
  const m1determinant = 63;
  const m1i = new Matrix(
    [
      11 / 63,
      4 / 63,
      -20 / 63,
      -4 / 63,
      10 / 63,
      13 / 63,
      13 / 63,
      -1 / 63,
      5 / 63,
    ],
    matrixDims(3, 3),
  );
  const m1id = new Matrix(
    [11, 4, -20, -4, 10, 13, 13, -1, 5],
    matrixDims(3, 3),
  ).divide(63);
  const identity3 = identityMatrix(3);
  const m1triangular = new Matrix(
    [1, 0, 0, 3, 5, 0, -2, 1, 63 / 5],
    matrixDims(3, 3),
  );

  test('linear algebra', () => {
    expect(m1.determinant()).toBe(m1determinant);
    expect((m1.inverse() ?? m1).isCloseTo(m1i)).toBe(true);
    expect((m1.inverse() ?? m1).isCloseTo(m1id)).toBe(true);
    expect(m1.reducedRowEchelon().isEqualTo(identity3)).toBe(true);
    expect(m1.rightTriangular().isCloseTo(m1triangular)).toBe(true);
  });

  const m4_c1 = m1.extractColumn(1);
  const m4_c2 = m1.extractColumn(2);
  const m4_c12 = m1.extractColumns([1, 2]);
  const m4_r1 = m1.extractRow(1);
  const m4_r2 = m1.extractRow(2);
  const m4_r12 = m1.extractRows([1, 2]);

  test('static', () => {
    expect(Matrix.cbind(m4_c1, m4_c2).isEqualTo(m4_c12)).toBe(true);
    expect(Matrix.rbind(m4_r1, m4_r2).isEqualTo(m4_r12)).toBe(true);
  });
});
