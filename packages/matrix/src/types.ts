export interface MatrixDims {
  nrow?: number;
  ncol?: number;
}

export interface MatrixByRow {
  byRow?: boolean;
}

export interface MatrixIterator {
  next: () => MatrixIteratorReturn;
  cont: () => MatrixIteratorReturn;
  reset: () => void;
}

export interface MatrixIteratorReturn {
  /** `true` if the last value of the sequence has already been consumed */
  done: boolean;
  /** The next value in the iteration sequence. */
  value: number;
  /** The index of the next value in the iteration sequence */
  index: number;
  /** The row index of the next value in the iteration sequence */
  row: number;
  /** The column index of the next value in the iteration sequence */
  col: number;
}

export interface MatrixCallback<T = number> {
  (element: number, index: number): T;
}

export interface MatrixCallbackRC<T = number> {
  (element: number, index: number, row: number, column: number): T;
}

export interface MatrixCallbackCompare {
  (a: number, b: number): number;
}
