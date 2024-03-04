export interface MatrixDims {
  nrow?: number;
  ncol?: number;
}

export interface MatrixByRow {
  byRow?: boolean;
}

export function matrixDims(nrow: number, ncol: number): Required<MatrixDims>;
export function matrixDims(
  nrow: number,
  ncol: number,
  byRow: boolean,
): Required<MatrixDims> & MatrixByRow;
export function matrixDims(
  nrow: number,
  ncol: number,
  byRow?: boolean,
): Required<MatrixDims> & MatrixByRow {
  return {nrow, ncol, byRow};
}
