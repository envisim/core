[![npm package](https://img.shields.io/npm/v/@envisim/matrix?label=%40envisim%2Fmatrix)](https://npmjs.com/package/@envisim/matrix)

# @envisim/matrix

A TypeScript library for matrix operations, providing classes and methods for working with matrices and vectors.

## Installation

```bash
npm install @envisim/matrix
```

## Usage

The `Matrix` constructor takes a flat array of numbers in **column-major order** (all elements of the first column, then all elements of the second column, etc.) and the number of rows.

```typescript
import { Matrix } from "@envisim/matrix";

// Create a 2x2 matrix with column-ordered data [col1_row1, col1_row2, col2_row1, col2_row2]
// Represents the matrix:
// | 5  1 |
// | -1 2 |
const matrix = new Matrix([5, -1, 1, 2], 2);

// Get the number of rows and columns
matrix.nrow;
matrix.ncol;

// Access an element (row 1, column 0 - zero-indexed)
matrix.atDim([1, 0]); //Element at (1, 0): -1

// Perform operations like transpose
const transposed = matrix.transpose();
// Transposed matrix:
// |  5 -1 |
// |  1  2 |
transposed.slice(); //Transposed matrix data (column-major): [ 5, 1, -1, 2 ]

// Example of matrix multiplication (mmult)
const identity = new Matrix([1, 0, 0, 1], 2); // 2x2 Identity matrix
const result = matrix.mmult(identity);
result.slice(); //Multiplication result data (column-major): [ 5, -1, 1, 2 ]
```
