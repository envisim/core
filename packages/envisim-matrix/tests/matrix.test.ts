import {expect, test} from 'vitest';

import {Matrix, Vector, identityMatrix} from '../src/index.js';

test('initialization', () => {
  const m1 = new Matrix([1, 0, 4, 3, 5, -1, -2, 1, 2], 3);
  const m1transpose = new Matrix([1, 3, -2, 0, 5, 1, 4, -1, 2], 3);
  const m1c2 = new Vector([3, 5, -1]);
  const m1r2 = [0, 5, 1];
  const m1c23 = new Matrix([3, 5, -1, -2, 1, 2], 3);
  const m1r12 = new Matrix([1, 0, 3, 5, -2, 1], 2);
  const m1cr23 = new Matrix([5, -1, 1, 2], 2);

  expect(m1.equals(m1transpose)).toBe(false);
  expect(m1.transpose().equals(m1transpose)).toBe(true);
  expect(m1.clone().equals(m1)).toBe(true);
  expect(m1.extractColumn(1).equals(m1c2)).toBe(true);
  expect(m1.extractRow(1)).toEqual(m1r2);
  expect(m1.extractRow(0)).not.toEqual(m1r2);
  expect(m1.extractColumns([1, 2]).equals(m1c23)).toBe(true);
  expect(m1.extractRows([0, 1]).equals(m1r12)).toBe(true);
  expect(m1.extractSubMatrix([1, 1], [2, 2]).equals(m1cr23)).toBe(true);
  expect(m1.extractColumn(1).slice()).toEqual(m1c2.slice());
});

test('accessors', () => {
  const m1 = new Matrix([1, 0, 4, 3, 5, -1, -2, 1, 2], 3);
  const m1diag = new Vector([1, 5, 2]);
  const m1cr23 = new Matrix([5, -1, 1, 2], 2);

  expect(m1.nrow).toBe(3);
  expect(m1cr23.ncol).toBe(2);
  expect(m1.dim()).toEqual([3, 3]);
  expect(m1.length).toBe(9);
  expect(m1.diagonal().equals(m1diag)).toBe(true);
  expect(m1.at(5)).toBe(-1);
  expect(m1.atDim([2, 2])).toBe(2);
  expect(m1.ed(5, -2)).toBe(-2);
  expect(m1.at(5)).toBe(-2);
  expect(m1.edDim([2, 1], -10)).toBe(-10);
  expect(m1.atDim([2, 1])).toBe(-10);
  expect(m1.fn(1, (_, i) => i + 10)).toBe(11);
  expect(m1.fnDim([0, 0], (_, __, [r, c]) => r + c + 10)).toBe(10);
  m1.swap(7, 8);
  expect(m1.at(7)).toBe(2);
  expect(m1.at(8)).toBe(1);
  m1.swap(8, 7);
  expect(m1.at(7)).toBe(1);
  expect(m1.at(8)).toBe(2);
});

test('basic operators', () => {
  /*
   *  5 1
   * -1 2
   */
  const m2 = new Matrix([5, -1, 1, 2], 2);
  const m2p2 = new Matrix([7, 1, 3, 4], 2);
  const m2pp = new Matrix([10, -2, 2, 4], 2);
  const m2dd = new Matrix([1, 1, 1, 1], 2);
  const m2d2 = new Matrix([2.5, -0.5, 0.5, 1], 2);
  const m2pow2 = new Matrix([25, 1, 1, 4], 2);
  const m2mmultm2 = new Matrix([25 - 1, -5 - 2, 5 + 2, -1 + 4], 2);
  const m2mod2 = new Matrix([1, -1, 1, 0], 2);
  const m2modm = new Matrix([2, 0, 0, 0], 2);
  const m2m2 = new Matrix([10, -2, 2, 4], 2);
  const m2mi2 = new Matrix([3, -3, -1, 0], 2);
  const m2_0 = Matrix.create(0, [2, 2]);

  expect(m2.add(m2).equals(m2pp)).toBe(true);
  expect(m2.add(2).equals(m2p2)).toBe(true);
  expect(m2.divide(m2).equals(m2dd)).toBe(true);
  expect(m2.divide(2).equals(m2d2)).toBe(true);
  expect(m2.map((v) => Math.pow(v, 2)).equalsApprox(m2pow2)).toBe(true);
  expect(m2.mmult(m2).equals(m2mmultm2)).toBe(true);
  expect(m2.mod(2).equals(m2mod2)).toBe(true);
  expect(m2p2.mod(m2).equals(m2modm)).toBe(true);
  expect(m2.multiply(m2).equals(m2pow2)).toBe(true);
  expect(m2.multiply(2).equals(m2m2)).toBe(true);
  expect(m2.subtract(m2).equals(m2_0)).toBe(true);
  expect(m2.subtract(2).equals(m2mi2)).toBe(true);
});

test('column operations', () => {
  const m2 = new Matrix([5, -1, 1, 2], 2);
  const m2colstd1 = new Matrix(
    [3 / Math.sqrt(18), -3 / Math.sqrt(18), -Math.sqrt(0.5), Math.sqrt(0.5)],
    2,
  );
  const m2colstd2 = identityMatrix(2);

  expect(m2.colMaxs().slice()).toEqual([5, 2]);
  expect(m2.colMeans().slice()).toEqual([2, 1.5]);
  expect(m2.colMins().slice()).toEqual([-1, 1]);
  expect(m2.colVars().slice()).toEqual([18, 0.5]);
  expect(m2.colSds().slice()).toEqual([Math.sqrt(18), Math.sqrt(0.5)]);
  expect(m2.colSums().slice()).toEqual([4, 3]);
  expect(m2.standardizeByCol().equalsApprox(m2colstd1)).toBe(true);
  expect(m2.standardizeByCol(true).equals(m2colstd2)).toBe(true);
});

test('statistics', () => {
  /*
   *  5 1
   * -1 2
   */
  const m2 = new Matrix([5, -1, 1, 2], 2);
  const m2abs = new Matrix([5, 1, 1, 2], 2);
  const m2cov = new Matrix([18, -3, -3, 0.5], 2);
  const m3 = new Matrix([1, 3, 3, 4], 2);
  const m2matstd1 = new Matrix([1.3, -1.1, -0.3, 0.1], 2);
  const m2matstd2 = new Matrix([1, 0, 1 / 3, 0.5], 2);

  expect(m2.covariance().equals(m2cov)).toBe(true);
  expect(m2abs.geometricMean()).toBeCloseTo(Math.pow(10, 0.25));
  expect(m2.max()).toBe(5);
  expect(m2.mean()).toBe(1.75);
  expect(m2.median()).toBe(1.5);
  expect(m2.min()).toBe(-1);
  expect(m3.mode()[0]).toBe(3);
  expect(m2.prodSum()).toBe(-10);
  expect(m2.quantiles([0.5])[0]).toBe(1);
  expect(m2.quantiles(0.4)[0]).toBeCloseTo(0.2);
  expect(m2.sd()).toBe(2.5);
  expect(m2.skewness()).toBeCloseTo(0.3233161507);
  expect(m2.sum()).toBe(7);
  expect(m2.variance()).toBe(6.25);
  expect(m2.standardize().equalsApprox(m2matstd1)).toBe(true);
  expect(m2.standardize(true).equalsApprox(m2matstd2)).toBe(true);
});

test('linear algebra', () => {
  const m1 = new Matrix([1, 0, 4, 3, 5, -1, -2, 1, 2], 3);
  /*
   * 1  3 -2
   * 0  5  1
   * 4 -1  2
   */
  const m1determinant = 63;
  const m1i = new Matrix(
    [11 / 63, 4 / 63, -20 / 63, -4 / 63, 10 / 63, 13 / 63, 13 / 63, -1 / 63, 5 / 63],
    3,
  );
  const m1id = new Matrix([11, 4, -20, -4, 10, 13, 13, -1, 5], 3).divide(63);
  const identity3 = identityMatrix(3);
  const m1triangular = new Matrix([1, 0, 0, 3, 5, 0, -2, 1, 63 / 5], 3);

  expect(m1.determinant()).toBe(m1determinant);
  expect((m1.inverse() ?? m1).equalsApprox(m1i)).toBe(true);
  expect((m1.inverse() ?? m1).equalsApprox(m1id)).toBe(true);
  expect(m1.reducedRowEchelon().equals(identity3)).toBe(true);
  expect(m1.rightTriangular().equalsApprox(m1triangular)).toBe(true);
});

test('static', () => {
  const m1 = new Matrix([1, 0, 4, 3, 5, -1, -2, 1, 2], 3);
  const m4_c1 = m1.extractColumn(1);
  const m4_c2 = m1.extractColumn(2);
  const m4_c12 = m1.extractColumns([1, 2]);
  const m4_r1 = new Matrix(m1.extractRow(1), 1);
  const m4_r2 = new Matrix(m1.extractRow(2), 1);
  const m4_r12 = m1.extractRows([1, 2]);

  expect(Matrix.cbind(m4_c1, m4_c2).equals(m4_c12)).toBe(true);
  expect(Matrix.rbind(m4_r1, m4_r2).equals(m4_r12)).toBe(true);
});
