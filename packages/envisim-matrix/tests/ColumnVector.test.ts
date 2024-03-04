import {describe, expect, test} from 'vitest';

import {
  ColumnVector,
  Matrix,
  RowVector,
  regressionCoefficients,
  sequence,
} from '../src/index.js';
import {createTable} from './_createTable.testf.js';

describe('ColumnVector', () => {
  const c1content = [1, 0, 4, 3, 5, -1];
  const c1 = new ColumnVector(c1content);
  const c2 = c1.copy();

  test.each(createTable(c1.internal, c1content))('internal', (a, b) => {
    expect(a).toBe(b);
  });

  test('accessors', () => {
    expect(c1.length).toBe(6);
    expect(c1.ncol).toBe(1);
    expect(c1.nelements).toBe(6);
    expect(c1.nrow).toBe(6);
    expect(c1.size()[0]).toBe(6);
    expect(c1.size()[1]).toBe(1);
    expect(c1.at(2)).toBe(4);
    expect(c1.atRC(2, 0)).toBe(4);
    expect(c2.ed(2, 10)).toBe(10);
    expect(c2.at(2)).toBe(10);
    expect(c2.edRC(2, 0, 3)).toBe(3);
    expect(c2.atRC(2, 0)).toBe(3);
    expect(c2.fn(2, (e) => e + 2)).toBe(5);
    expect(c2.at(2)).toBe(5);
    expect(c2.fnRC(2, 0, (e) => e + 2)).toBe(7);
    expect(c2.atRC(2, 0)).toBe(7);
    expect(c1.indexOf(4)).toBe(2);
    expect(c1.colOfIndex(2)).toBe(0);
    expect(c1.rowOfIndex(2)).toBe(2);
    expect(c1.lastIndexOf(5)).toBe(4);
    expect(c1.indexOfRc(2, 0)).toBe(2);
  });

  /* 1, 0, 4, 3, 5, -1 */
  const c1p2 = new ColumnVector(c1content.map((e) => e + 2));

  test('basic operators', () => {
    // Same as Matrix, inherited from BaseMatrix
    expect(c1.add(c1).isEqualTo(c1.multiply(2))).toBe(true);
    expect(c1.add(2).isEqualTo(c1p2)).toBe(true);
  });

  const c1_c1p2 = new ColumnVector([...c1content, ...c1p2.internal]);
  const c1p2_c1 = new ColumnVector([...c1p2.internal, ...c1content]);
  // const c1r2 = new RowVector([4]);
  const c1r24 = new ColumnVector([4, 5]);
  // const c1r23 = new ColumnVector([4, 3]);
  const c1_positive = new ColumnVector([1, 4, 3, 5]);
  const r1 = new RowVector(c1content);

  test('copy methods', () => {
    expect(c1.append(c1p2).isEqualTo(c1_c1p2)).toBe(true);
    expect(c1.prepend(c1p2).isEqualTo(c1p2_c1)).toBe(true);
    expect(c1.copy().isEqualTo(c1)).toBe(true);
    expect(c1.extractRows([2, 4]).isEqualTo(c1r24)).toBe(true);
    expect(c1.filter((e) => e > 0).isEqualTo(c1_positive)).toBe(true);
    expect(c1.transpose().isEqualTo(r1)).toBe(true);
  });

  const c3 = sequence(1, 6, 1);
  const c1_cumsum = new ColumnVector([1, 1, 5, 8, 13, 12]);
  const m1 = new Matrix([1, 1, 1, 1, 0, 4, 3, 5, -1], {nrow: 3, ncol: 3});
  const c4 = new ColumnVector([1, 0, 3]);
  const c4_beta = new ColumnVector([2.5, 0.0, -0.5]);

  test('statistics', () => {
    expect(c1.correlation(c3)).toBeCloseTo(0.09035079029);
    expect(c1.covariance(c3)).toBeCloseTo(0.4);
    expect(c1.cumulativeSum().isEqualTo(c1_cumsum)).toBe(true);
    expect(regressionCoefficients(c4, m1).isCloseTo(c4_beta)).toBe(true);
  });

  /* 1, 0, 4, 3, 5, -1 */
  const c1_sort = new ColumnVector(c1content.sort((a, b) => a - b));
  const c1_sorti = [5, 1, 0, 3, 2, 4];
  const c1_union = new ColumnVector(
    [...c1content, 8, 12, 13].sort((a, b) => a - b),
  );
  const c1_intersect = new ColumnVector([1, 5]);

  test('maps', () => {
    expect(c1.some((e) => e < 0)).toBe(true);
    expect(c1_cumsum.some((e) => e < 0)).toBe(false);
    expect(c1.some((e) => e < 0)).toBe(true);
    expect(c1.sort((a, b) => a - b).isEqualTo(c1_sort)).toBe(true);
    expect(c1.sortIndex()[0]).toBe(c1_sorti[0]);
    expect(c1.sortIndex()[5]).toBe(c1_sorti[5]);
    expect(c1.union(c1_cumsum).isEqualTo(c1_union)).toBe(true);
    expect(c1.intersect(c1_cumsum).isEqualTo(c1_intersect)).toBe(true);
  });
});
