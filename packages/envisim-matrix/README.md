# @envisim/matrix

A TypeScript library for matrix operations, providing classes and methods for working with matrices and vectors. This package is part of the [`@envisim/core`](../../) monorepo.

## Installation

Within the monorepo, this package is typically linked via the pnpm workspace.

For external use, install it using your preferred package manager:

```bash
# npm
npm install @envisim/matrix

# yarn
yarn add @envisim/matrix

# pnpm
pnpm add @envisim/matrix
```

## Usage

Create and manipulate matrices and vectors.

The `Matrix` constructor takes a flat array of numbers in **column-major order** (all elements of the first column, then all elements of the second column, etc.) and the number of rows.

For example:

```typescript
import { Matrix } from '@envisim/matrix';

// Create a 2x2 matrix with column-ordered data [col1_row1, col1_row2, col2_row1, col2_row2]
// Represents the matrix:
// | 5  1 |
// | -1 2 |
const matrix = new Matrix([5, -1, 1, 2], 2);

// Get the number of rows and columns
console.log(`Rows: ${matrix.nrow}, Columns: ${matrix.ncol}`); // Output: Rows: 2, Columns: 2

// Access an element (row 1, column 0 - zero-indexed)
console.log(`Element at (1, 0): ${matrix.atDim([1, 0])}`); // Output: Element at (1, 0): -1

// Perform operations like transpose
const transposed = matrix.transpose();
// Transposed matrix:
// |  5 -1 |
// |  1  2 |
console.log('Transposed matrix data (column-major):', transposed.slice()); // Output: Transposed matrix data (column-major): [ 5, 1, -1, 2 ]

// Example of matrix multiplication (mmult)
const identity = new Matrix([1, 0, 0, 1], 2); // 2x2 Identity matrix
const result = matrix.mmult(identity);
console.log('Multiplication result data (column-major):', result.slice()); // Output: Multiplication result data (column-major): [ 5, -1, 1, 2 ]
```

## API Overview

### Matrix Operations

*   `Matrix` class with methods for various matrix operations

### Vector Operations

*   `Vector` class with methods for vector operations

