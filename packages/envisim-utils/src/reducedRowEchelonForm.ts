/**
 * Transforms an array into reducedRowEchelonForm in place.
 * @param mat - A flat array
 * @param rowCount - The number of rows
 * @param colCount - The number of columns
 */
export function reducedRowEchelonForm(
  mat: number[],
  rowCount: number,
  colCount: number,
  eps: number = 1e-9,
  mIdx: (r: number, c: number) => number = (r: number, c: number): number =>
    r * colCount + c,
): void {
  let lead = 0;

  for (let r = 0; r < rowCount; r++) {
    if (colCount <= lead) return;

    let i = r;

    while (Math.abs(mat[mIdx(i, lead)]!) < eps) {
      i += 1;

      if (i === rowCount) {
        i = r;
        lead += 1;

        if (colCount === lead) return;
      }
    }

    if (i !== r) {
      for (let k = 0; k < colCount; k++) {
        const temp = mat[mIdx(i, k)]!;
        mat[mIdx(i, k)] = mat[mIdx(r, k)]!;
        mat[mIdx(r, k)] = temp!;
      }
    }

    {
      const temp = mat[mIdx(r, lead)]!;
      mat[mIdx(r, lead)] = 1.0;
      for (let k = lead + 1; k < colCount; k++) mat[mIdx(r, k)] /= temp;
    }

    for (let j = 0; j < rowCount; j++) {
      if (j === r) continue;
      const temp = mat[mIdx(j, lead)]!;
      mat[mIdx(j, lead)] = 0.0;
      for (let k = lead + 1; k < colCount; k++)
        mat[mIdx(j, k)] -= mat[mIdx(r, k)]! * temp;
    }

    lead += 1;
  }
}
