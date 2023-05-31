import {ColumnVector, RowVector} from '../src/index';
import {createTable} from './_createTable.testf';

describe('RowVector', () => {
  const r1content = [1, 0, 4, 3, 5, -1];
  const r1 = new RowVector(r1content);
  const r2 = r1.copy();

  test.each(createTable(r1.internal, r1content))('internal', (a, b) => {
    expect(a).toBe(b);
  });

  test('accessors', () => {
    expect(r1.length).toBe(6);
    expect(r1.ncol).toBe(6);
    expect(r1.nelements).toBe(6);
    expect(r1.nrow).toBe(1);
    expect(r1.size[0]).toBe(1);
    expect(r1.size[1]).toBe(6);
    expect(r1.atIndex(2)).toBe(4);
    expect(r1.atRC(0, 2)).toBe(4);
    expect(r2.edIndex(2, 10)).toBe(10);
    expect(r2.atIndex(2)).toBe(10);
    expect(r2.edRC(0, 2, 3)).toBe(3);
    expect(r2.atRC(0, 2)).toBe(3);
    expect(r2.fnIndex(2, (e) => e + 2)).toBe(5);
    expect(r2.atIndex(2)).toBe(5);
    expect(r2.fnRC(0, 2, (e) => e + 2)).toBe(7);
    expect(r2.atRC(0, 2)).toBe(7);
    expect(r1.indexOf(4)).toBe(2);
    expect(r1.indexToCol(2)).toBe(2);
    expect(r1.indexToRow(2)).toBe(0);
    expect(r1.lastIndexOf(5)).toBe(4);
    expect(r1.rcToIndex(0, 2)).toBe(2);
  });

  /* 1, 0, 4, 3, 5, -1 */
  const r1p2 = new RowVector(r1content.map((e) => e + 2));

  test('basic operators', () => {
    // Same as Matrix, inherited from BaseMatrix
    expect(r1.add(r1).isEqualTo(r1.multiplyScalar(2))).toBe(true);
    expect(r1.addScalar(2).isEqualTo(r1p2)).toBe(true);
  });

  const r1_r1p2 = new RowVector([...r1content, ...r1p2.internal]);
  const r1p2_r1 = new RowVector([...r1p2.internal, ...r1content]);
  const r1c2 = new RowVector([4], 1);
  const r1c23 = new RowVector([4, 3], 2);
  const r1_positive = new RowVector([1, 4, 3, 5]);
  const c1 = new ColumnVector(r1content);

  test('copy methods', () => {
    expect(r1.append(r1p2).isEqualTo(r1_r1p2)).toBe(true);
    expect(r1.prepend(r1p2).isEqualTo(r1p2_r1)).toBe(true);
    expect(r1.copy().isEqualTo(r1)).toBe(true);
    expect(r1.extractColumn(2).isEqualTo(r1c2)).toBe(true);
    expect(r1.extractColumns([2, 3]).isEqualTo(r1c23)).toBe(true);
    expect(r1.extractRow(0).isEqualTo(r1)).toBe(true);
    expect(r1.extractRows([0]).isEqualTo(r1)).toBe(true);
    expect(r1.extractSubMatrix(2, 3).isEqualTo(r1c23)).toBe(true);
    expect(r1.filter((e) => e > 0).isEqualTo(r1_positive)).toBe(true);
    expect(r1.t().isEqualTo(c1)).toBe(true);
  });

  /* 1, 0, 4, 3, 5, -1 */
  const r1_cumsum = new RowVector([1, 1, 5, 8, 13, 12]);
  const r1_sort = new RowVector(r1content.sort((a, b) => a - b));
  const r1_sorti = [5, 1, 0, 3, 2, 4];
  const r1_union = new RowVector(
    [...r1content, 8, 12, 13].sort((a, b) => a - b),
  );
  const r1_intersect = new RowVector([1, 5]);

  test('maps', () => {
    expect(r1.some((e) => e < 0)).toBe(true);
    expect(r1_cumsum.some((e) => e < 0)).toBe(false);
    expect(r1.some((e) => e < 0)).toBe(true);
    expect(r1.sort((a, b) => a - b).isEqualTo(r1_sort)).toBe(true);
    expect(r1.sortIndex()[0]).toBe(r1_sorti[0]);
    expect(r1.sortIndex()[5]).toBe(r1_sorti[5]);
    expect(r1.union(r1_cumsum).isEqualTo(r1_union)).toBe(true);
    expect(r1.intersect(r1_cumsum).isEqualTo(r1_intersect)).toBe(true);
  });
});
