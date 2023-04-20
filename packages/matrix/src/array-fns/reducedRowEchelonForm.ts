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
): void {
  const mIdx = (r: number, c: number): number => r * colCount + c;

  let lead = 0;

  for (let r = 0; r < rowCount; r++) {
    if (colCount <= lead) return;

    let i = r;

    while (mat[mIdx(i, lead)] < eps) {
      i += 1;

      if (i === rowCount) {
        i = r;
        lead += 1;

        if (colCount === lead) return;
      }
    }

    const id_r = mIdx(r, 0);

    if (i !== r) {
      const id_i = mIdx(i, 0);

      for (let k = 0; k < colCount; k++) {
        const temp = mat[id_i + k];
        mat[id_i + k] = mat[id_r + k];
        mat[id_r + k] = temp;
      }
    }

    if (Math.abs(mat[id_r + lead]) >= eps) {
      const temp = mat[id_r + lead];
      for (let k = 0; k < colCount; k++) mat[id_r + k] /= temp;
    }

    for (let j = 0; j < rowCount; j++) {
      if (j === r) continue;

      const temp = mat[mIdx(j, lead)];
      for (let k = 0; k < colCount; k++)
        mat[mIdx(j, k)] -= mat[id_r + k] * temp;
    }

    lead += 1;
  }
}
