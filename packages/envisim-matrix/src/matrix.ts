import { Random, type RandomGenerator, randomArray } from "@envisim/random";
import { reducedRowEchelonForm, ValidationError } from "@envisim/utils";
import { BaseMatrix, type MatrixCallback, type MatrixDim } from "./base-matrix.js";
import { Vector } from "./vector.js";

export class Matrix extends BaseMatrix {
  /**
   * @returns `true` if `mat` is a Matrix
   */
  static isMatrix(mat: unknown): mat is Matrix {
    return mat instanceof Matrix;
  }

  /**
   * @param obj
   * @throws ValidationError if `obj` is not Matrix
   */
  static assert(obj: unknown): asserts obj is Matrix {
    if (!(obj instanceof Matrix))
      throw ValidationError.create["other-incorrect-shape"]({ arg: "obj", shape: "Matrix" });
  }

  /**
   * Bind multiple matrices together by columns
   * @throws ValidationError if the number of rows of any matrix doesn't match
   */
  static cbind(...matrices: BaseMatrix[]): Matrix {
    ValidationError.check["array-empty"]({ arg: "args" }, matrices)?.raise();

    const nrow = matrices[0].nrow;

    if (matrices.some((m) => nrow !== m.nrow))
      throw ValidationError.create["other-incorrect-shape"]({ arg: "args" });

    return new Matrix(
      matrices.flatMap((m) => m.slice()),
      nrow,
      true,
    );
  }

  /**
   * Bind multiple matrices together by rows
   * @throws ValidationError if the number of rows of any matrix doesn't match
   */
  static rbind(...matrices: BaseMatrix[]): Matrix {
    ValidationError.check["array-empty"]({ arg: "args" }, matrices)?.raise();

    const ncol = matrices[0].ncol;

    if (matrices.some((m) => ncol !== m.ncol))
      throw ValidationError.create["other-incorrect-shape"]({ arg: "args" });

    const nrow = matrices.reduce((s, m) => s + m.nrow, 0);

    const s = Matrix.create(0, [nrow, ncol]);

    let rows = 0;

    for (let i = 0; i < matrices.length; i++) {
      for (let col = 0; col < matrices[i].ncol; col++) {
        for (let row = 0; row < matrices[i].nrow; row++) {
          s.edDim([row + rows, col], matrices[i].atDim([row, col]));
        }
      }

      rows += matrices[i].nrow;
    }

    return s;
  }

  /**
   * @returns a new Matrix of size `dim` filled with `fill`
   */
  static create(fill: number, dim: MatrixDim): Matrix {
    return new Matrix(Array.from<number>({ length: dim[0] * dim[1] }).fill(fill), dim[0], true);
  }

  /**
   * @param arr the values used to form the Matrix in column-order
   * @param nrow the number of rows of the Matrix
   * @param shallow if `true`, uses the internal arrays of `arr` as a reference
   */
  constructor(arr: number[], nrow: MatrixDim[0], shallow: boolean = false) {
    const dims: MatrixDim = [nrow, arr.length / nrow];
    super(shallow ? arr : arr.slice(), dims);
  }

  // @ts-expect-error clone needs to be defined for any deriving class
  clone(): Matrix {
    return new Matrix(this.internal.slice(), this.rows, true);
  }

  /**
   * @param inPlace performes the map in place if `true`
   * @returns a copy, where each element has been mapped by the callback fn.
   */
  // @ts-expect-error map needs to be defined for any deriving class
  map(callback: MatrixCallback<number>, inPlace: boolean = false): Matrix {
    return inPlace
      ? super.baseMapInPlace(callback)
      : new Matrix(super.baseMap(callback), this.rows, true);
  }

  extractColumn(col: number): Vector {
    col = this.checkCol(col);
    return new Vector(this.internal.slice(col * this.rows, (col + 1) * this.rows));
  }

  extractRow(row: number): number[] {
    row = this.checkRow(row);

    const s = Array.from<number>({ length: this.cols });

    for (let i = row, j = 0; i < this.len; i += this.rows, j++) s[j] = this.internal[i]!;

    return s;
  }

  extractColumns(cols: number[] | Vector): Matrix {
    const s: number[] = [];
    cols.forEach((c) => {
      c = this.checkCol(c);
      s.push(...this.internal.slice(c * this.rows, (c + 1) * this.rows));
    });

    return new Matrix(s, this.rows, true);
  }

  extractRows(rows: number[] | Vector): Matrix {
    const s = Matrix.create(0.0, [rows.length, this.cols]);

    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < this.cols; c++) {
        s.edDim([r, c], this.atDim([rows.at(r) as number, c]));
      }
    }

    return s;
  }

  /**
   * @returns a sub-matrix defined by the parameters.
   */
  extractSubMatrix(start: MatrixDim, end: MatrixDim = [this.rows - 1, this.cols - 1]): Matrix {
    start = this.checkDim(start);
    end = this.checkDim(end);

    const nrow = end[0] - start[0] + 1;
    const ncol = end[1] - start[1] + 1;

    if (nrow < 1 || ncol < 1) {
      throw ValidationError.create["number-not-in-interval"]({
        arg: "end",
        interval: [nrow, ncol],
      });
    }

    const s = [];
    for (let c = start[1]; c <= end[1]; c++) {
      const i = this.indexOfDim([start[0], c]);
      s.push(...this.internal.slice(i, i + nrow));
    }

    return new Matrix(s, nrow, true);
  }

  transpose(): Matrix {
    const s = Matrix.create(0, [this.cols, this.rows]);

    this.forEach((e, i) => {
      s.edDim([this.colOfIndex(i), this.rowOfIndex(i)], e);
    });

    return s;
  }

  /**
   * Performs matrix multiplication this * mat
   */
  static mmult(mat1: BaseMatrix, mat2: BaseMatrix): Matrix {
    if (mat1.ncol !== mat2.nrow)
      throw ValidationError.create["other-incorrect-shape"]({ arg: "mat2", shape: "mat1" });

    const s = Array.from<number>({ length: mat1.nrow * mat2.ncol });

    for (let r = 0; r < mat1.nrow; r++) {
      for (let c = 0; c < mat2.ncol; c++) {
        let t = 0.0;

        for (let i = 0; i < mat1.ncol; i++) {
          t += mat1.atDim([r, i]) * mat2.atDim([i, c]);
        }

        s[r + c * mat1.nrow] = t;
      }
    }

    return new Matrix(s, mat1.nrow, true);
  }

  mmult(mat: BaseMatrix): Matrix {
    return Matrix.mmult(this, mat);
  }

  /**
   * @returns the diagonal of the matrix
   */
  diagonal(): Vector {
    const rc = Math.min(this.nrow, this.ncol);
    const s: number[] = [];
    for (let i = 0; i < rc; i++) {
      s.push(this.atDim([i, i]));
    }

    return new Vector(s, true);
  }

  // Column operations
  /**
   * Calculates the column sums
   */
  colSums(): Vector {
    const s = Array.from<number>({ length: this.cols }).fill(0.0);

    for (let c = 0, i = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++, i++) {
        s[c] += this.internal[i];
      }
    }

    return new Vector(s, true);
  }

  /**
   * Calculates the column means
   */
  colMeans(): Vector {
    return this.colSums().map((e) => e / this.nrow, true);
  }

  /**
   * Calculates the column variances, using `n-1` as denominator.
   */
  colVars(): Vector {
    const s1 = Array.from<number>({ length: this.cols }).fill(0.0);
    const s2 = Array.from<number>({ length: this.cols }).fill(0.0);

    for (let c = 0, i = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++, i++) {
        s1[c] += this.internal[i];
        s2[c] += Math.pow(this.internal[i], 2);
      }
    }

    return new Vector(
      s1.map((v, i) => (s2[i] - (v * v) / this.rows) / (this.rows - 1)),
      true,
    );
  }

  /**
   * Calculates the column standard deviations, using `n-1` as denominator.
   */
  colSds(): Vector {
    return this.colVars().map(Math.sqrt, true);
  }

  /**
   * Calculates the column minimum values
   */
  colMins(): Vector {
    const s = Vector.create(0.0, this.cols);

    return s.map(
      (_, i) => Math.min(...this.internal.slice(i * this.rows, (i + 1) * this.rows)),
      true,
    );
  }

  /**
   * Calculates the column maximum values
   */
  colMaxs(): Vector {
    const s = Vector.create(0.0, this.cols);

    return s.map(
      (_, i) => Math.max(...this.internal.slice(i * this.rows, (i + 1) * this.rows)),
      true,
    );
  }

  /**
   * Standardizes or normalizes the matrix by column
   * - if `normalize` is `true`: normalizes the values in a column by `(x-min)/(max-min)`
   * - otherwise: standardizes the values in a column by `(x - mu)/sigma`
   *
   * @returns a new standardized or normalized {@link Matrix}
   * @group Column operations
   * @group Statistics
   */
  standardizeByCol(normalize: boolean = false): Matrix {
    let offset: Vector;
    let denom: Vector;

    if (normalize === true) {
      offset = this.colMins();
      denom = this.colMaxs().subtract(offset, true);
    } else {
      offset = this.colMeans();
      denom = this.colSds();
    }

    return this.clone().map((e, i) => {
      const col = this.colOfIndex(i);
      return (e - offset.at(col)) / denom.at(col);
    }, true);
  }

  /**
   * @returns the covariance matrix
   * @group Statistics
   */
  covariance(): Matrix {
    const means = this.colMeans();

    const xme = this.clone().map((e, i) => e - means.at(this.colOfIndex(i)), true);

    return xme
      .transpose()
      .mmult(xme)
      .divide(this.nrow - 1);
  }

  /**
   * @param a a row index
   * @param b a row index
   * @param squared if `false`, calculates the euclidean distance, otherwise
   *   calculates the euclidean squared distance
   * @returns the distance between rows `a` and `b`
   * @group Statistics
   */
  distance(a: number, b: number, squared: boolean = true) {
    if (a === b) return 0.0;

    let d = 0.0;
    for (let k = 0; k < this.ncol; k++) {
      const temp = this.atDim([a, k]) - this.atDim([b, k]);
      d += temp;
    }

    return squared !== false ? d : Math.sqrt(d);
  }

  /**
   * @returns the matrix in reduced row echelon format
   * @group Linear algebra
   */
  reducedRowEchelon(eps: number = 1e-9, inPlace: boolean = false): Matrix {
    const mIdx = (r: number, c: number) => c * this.rows + r;
    if (inPlace === true) {
      reducedRowEchelonForm(this.internal, this.rows, this.cols, eps, mIdx);
      return this;
    }

    const s = this.slice();
    reducedRowEchelonForm(s, this.rows, this.cols, eps, mIdx);
    return new Matrix(s, this.rows, true);
  }

  /**
   * @returns the matrix in right triangular format
   * @group Linear algebra
   */
  rightTriangular(): Matrix {
    const s = this.clone();

    for (let i = 0; i < s.nrow; i++) {
      if (s.atDim([i, i]) === 0.0) {
        for (let j = i + 1; j < s.nrow; j++) {
          if (s.atDim([j, i]) !== 0.0) {
            for (let np = 0; np < s.ncol; np++) {
              s.fnDim([i, np], (e) => e + s.atDim([j, np]));
            }
            break;
          }
        }
      }

      if (s.atDim([i, i]) !== 0.0) {
        for (let j = i + 1; j < s.nrow; j++) {
          const mult = s.atDim([j, i]) / s.atDim([i, i]);
          for (let np = 0; np <= i; np++) {
            s.edDim([j, np], 0.0);
          }
          for (let np = i + 1; np < s.ncol; np++) {
            s.fnDim([j, np], (e) => e - s.atDim([i, np]) * mult);
          }
        }
      }
    }

    return s;
  }

  /**
   * @returns the determinant of the matrix
   * @throws ValidationError if matrix is not square
   * @group Linear algebra
   */
  determinant(): number {
    if (!this.isSquare())
      throw ValidationError.create["other-incorrect-shape"]({ arg: "this", shape: "square" });

    return this.rightTriangular().diagonal().prodSum();
  }

  /**
   * @returns the inverse of the matrix
   * @group Linear algebra
   */
  inverse(eps: number = 1e-9): Matrix | null {
    if (!this.isSquare())
      throw ValidationError.create["other-incorrect-shape"]({ arg: "this", shape: "square" });

    if (this.determinant() === 0) {
      console.warn("Determinant is 0.");
      return null;
    }

    const sim = Matrix.cbind(this, identityMatrix(this.rows)).reducedRowEchelon(eps, true);

    return new Matrix(sim.internal.slice(this.len), this.rows, true);
  }
}

/**
 * Generates a matrix of random numbers on [0, 1).
 *
 * @param dims - the dimensions of the random matrix
 * @param generator - an RNG.
 */
export function randomMatrix(
  [nrow, ncol]: MatrixDim,
  generator: RandomGenerator = new Random(),
): Matrix {
  return new Matrix(randomArray(nrow * ncol, generator), nrow, true);
}

/**
 * @param arr - the diagonal elements
 * @returns a new matrix with diagonal elements set to `arr`
 */
export function diagonalMatrix(arr: number[]): Matrix {
  const n = arr.length;
  const s = Matrix.create(0.0, [n, n]);
  for (let i = 0; i < n; i++) {
    s.edDim([i, i], arr[i]);
  }
  return s;
}

/**
 * @param nrow - the size of the matrix
 * @returns a (square) identity matrix.
 */
export function identityMatrix(nrow: number): Matrix {
  return diagonalMatrix(Array.from<number>({ length: nrow }).fill(1.0));
}
