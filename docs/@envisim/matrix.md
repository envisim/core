[**Documentation**](../README.md)

---

[Documentation](../README.md) / @envisim/matrix

# @envisim/matrix

## Contents

- [Classes](#classes)
  - [Matrix](#matrix)
  - [Vector](#vector)
- [Type Aliases](#type-aliases)
  - [MatrixCallback()\<T>](#matrixcallbackt)
  - [MatrixCallbackCompare()](#matrixcallbackcompare)
  - [MatrixDim](#matrixdim)
- [Functions](#functions)
  - [diagonalMatrix()](#diagonalmatrix)
  - [identityMatrix()](#identitymatrix)
  - [randomMatrix()](#randommatrix)
  - [randomVector()](#randomvector)
  - [sequence()](#sequence)

## Classes

### Matrix

#### Extends

- `BaseMatrix`

#### Constructors

##### Constructor

> **new Matrix**(`arr`, `nrow`, `shallow`): [`Matrix`](#matrix)

###### Parameters

| Parameter | Type        | Default value | Description                                                 |
| --------- | ----------- | ------------- | ----------------------------------------------------------- |
| `arr`     | `number`\[] | `undefined`   | the values used to form the Matrix in column-order          |
| `nrow`    | `number`    | `undefined`   | the number of rows of the Matrix                            |
| `shallow` | `boolean`   | `false`       | if `true`, uses the internal arrays of `arr` as a reference |

###### Returns

[`Matrix`](#matrix)

###### Overrides

`BaseMatrix.constructor`

#### Properties

| Property                         | Modifier    | Type        | Description                        |
| -------------------------------- | ----------- | ----------- | ---------------------------------- |
| <a id="cols"></a> `cols`         | `protected` | `number`    | **`Internal`**                     |
| <a id="internal"></a> `internal` | `protected` | `number`\[] | **`Internal`** stored column major |
| <a id="len"></a> `len`           | `protected` | `number`    | **`Internal`**                     |
| <a id="rows"></a> `rows`         | `protected` | `number`    | **`Internal`**                     |

#### Accessors

##### length

###### Get Signature

> **get** **length**(): `number`

###### Returns

`number`

the number of elements

###### Inherited from

`BaseMatrix.length`

##### ncol

###### Get Signature

> **get** **ncol**(): `number`

###### Returns

`number`

the number of columns

###### Inherited from

`BaseMatrix.ncol`

##### nrow

###### Get Signature

> **get** **nrow**(): `number`

###### Returns

`number`

the number of rows

###### Inherited from

`BaseMatrix.nrow`

#### Methods

##### at()

> **at**(`index`): `number`

###### Parameters

| Parameter | Type     | Description                                    |
| --------- | -------- | ---------------------------------------------- |
| `index`   | `number` | if `index < 0`, `index + .length` is accessed. |

###### Returns

`number`

the element at matrix `index`

###### Throws

`RangeError` if `index` is not in range

###### Inherited from

`BaseMatrix.at`

##### atDim()

> **atDim**(`dim`): `number`

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `dim`     | [`MatrixDim`](#matrixdim-2) |

###### Returns

`number`

###### See

[BaseMatrix.at](#at)

###### Inherited from

`BaseMatrix.atDim`

##### baseMap()

> `protected` **baseMap**(`callback`): `number`\[]

###### Parameters

| Parameter  | Type                                          |
| ---------- | --------------------------------------------- |
| `callback` | [`MatrixCallback`](#matrixcallback)<`number`> |

###### Returns

`number`\[]

###### Inherited from

`BaseMatrix.baseMap`

##### baseMapInPlace()

> `protected` **baseMapInPlace**(`callback`): `this`

###### Parameters

| Parameter  | Type                                          |
| ---------- | --------------------------------------------- |
| `callback` | [`MatrixCallback`](#matrixcallback)<`number`> |

###### Returns

`this`

###### Inherited from

`BaseMatrix.baseMapInPlace`

##### clone()

> **clone**(): [`Matrix`](#matrix)

###### Returns

[`Matrix`](#matrix)

###### Overrides

`BaseMatrix.clone`

##### colMaxs()

> **colMaxs**(): [`Vector`](#vector)

Calculates the column maximum values

###### Returns

[`Vector`](#vector)

##### colMeans()

> **colMeans**(): [`Vector`](#vector)

Calculates the column means

###### Returns

[`Vector`](#vector)

##### colMins()

> **colMins**(): [`Vector`](#vector)

Calculates the column minimum values

###### Returns

[`Vector`](#vector)

##### colOfIndex()

> **colOfIndex**(`index`): `number`

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `index`   | `number` |

###### Returns

`number`

the column index of the matrix `index`

###### Throws

`RangeError` if `index` is not in range

###### Inherited from

`BaseMatrix.colOfIndex`

##### colSds()

> **colSds**(): [`Vector`](#vector)

Calculates the column standard deviations, using `n-1` as denominator.

###### Returns

[`Vector`](#vector)

##### colSums()

> **colSums**(): [`Vector`](#vector)

Calculates the column sums

###### Returns

[`Vector`](#vector)

##### colVars()

> **colVars**(): [`Vector`](#vector)

Calculates the column variances, using `n-1` as denominator.

###### Returns

[`Vector`](#vector)

##### diagonal()

> **diagonal**(): [`Vector`](#vector)

###### Returns

[`Vector`](#vector)

the diagonal of the matrix

##### dim()

> **dim**(): [`MatrixDim`](#matrixdim-2)

###### Returns

[`MatrixDim`](#matrixdim-2)

`[this.nrow, this.ncol]`

###### Inherited from

`BaseMatrix.dim`

##### dimOfIndex()

> **dimOfIndex**(`index`): [`MatrixDim`](#matrixdim-2)

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `index`   | `number` |

###### Returns

[`MatrixDim`](#matrixdim-2)

an array `[row, column]`

###### Inherited from

`BaseMatrix.dimOfIndex`

##### ed()

> **ed**(`index`, `value`): `number`

Changes the element at matrix `index` to `value`

###### Parameters

| Parameter | Type     | Description                                    |
| --------- | -------- | ---------------------------------------------- |
| `index`   | `number` | if `index < 0`, `index + .length` is accessed. |
| `value`   | `number` | -                                              |

###### Returns

`number`

`value`

###### Throws

`RangeError` if `index` is not in range

###### Inherited from

`BaseMatrix.ed`

##### edDim()

> **edDim**(`dim`, `value`): `number`

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `dim`     | [`MatrixDim`](#matrixdim-2) |
| `value`   | `number`                    |

###### Returns

`number`

###### See

[BaseMatrix.ed](#ed)

###### Inherited from

`BaseMatrix.edDim`

##### equals()

> **equals**(`mat`): `boolean`

###### Parameters

| Parameter | Type         |
| --------- | ------------ |
| `mat`     | `BaseMatrix` |

###### Returns

`boolean`

`true` if `this` is equal to `mat`

###### Inherited from

`BaseMatrix.equals`

##### equalsApprox()

> **equalsApprox**(`mat`, `eps`): `boolean`

###### Parameters

| Parameter | Type         | Default value |
| --------- | ------------ | ------------- |
| `mat`     | `BaseMatrix` | `undefined`   |
| `eps`     | `number`     | `1e-9`        |

###### Returns

`boolean`

`true` if `this` is approximately equal to `mat`

###### Inherited from

`BaseMatrix.equalsApprox`

##### every()

> **every**(`callback`): `boolean`

Tests if all elements pass the test implemented by the callback fn

###### Parameters

| Parameter  | Type                                           |
| ---------- | ---------------------------------------------- |
| `callback` | [`MatrixCallback`](#matrixcallback)<`boolean`> |

###### Returns

`boolean`

###### Inherited from

`BaseMatrix.every`

##### extractColumn()

> **extractColumn**(`col`): [`Vector`](#vector)

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `col`     | `number` |

###### Returns

[`Vector`](#vector)

##### extractColumns()

> **extractColumns**(`cols`): [`Matrix`](#matrix)

###### Parameters

| Parameter | Type        |
| --------- | ----------- | ------------------- |
| `cols`    | `number`\[] | [`Vector`](#vector) |

###### Returns

[`Matrix`](#matrix)

##### extractRow()

> **extractRow**(`row`): `number`\[]

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `row`     | `number` |

###### Returns

`number`\[]

##### extractRows()

> **extractRows**(`rows`): [`Matrix`](#matrix)

###### Parameters

| Parameter | Type        |
| --------- | ----------- | ------------------- |
| `rows`    | `number`\[] | [`Vector`](#vector) |

###### Returns

[`Matrix`](#matrix)

##### extractSubMatrix()

> **extractSubMatrix**(`start`, `end`): [`Matrix`](#matrix)

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `start`   | [`MatrixDim`](#matrixdim-2) |
| `end`     | [`MatrixDim`](#matrixdim-2) |

###### Returns

[`Matrix`](#matrix)

a sub-matrix defined by the parameters.

##### findIndex()

> **findIndex**(`callback`): `number`

###### Parameters

| Parameter  | Type                                           | Description                                   |
| ---------- | ---------------------------------------------- | --------------------------------------------- |
| `callback` | [`MatrixCallback`](#matrixcallback)<`boolean`> | a function used to test elements in the array |

###### Returns

`number`

the index of the first element passing the test in `callback`

###### Inherited from

`BaseMatrix.findIndex`

##### fn()

> **fn**(`index`, `callback`): `number`

Changes the element at matrix `index` through a callback function.

###### Parameters

| Parameter  | Type                                          |
| ---------- | --------------------------------------------- |
| `index`    | `number`                                      |
| `callback` | [`MatrixCallback`](#matrixcallback)<`number`> |

###### Returns

`number`

the result of `callback`

###### Example

```ts
const mat = new Matrix(0, 2, 2);
// [ 0, 0,
//   0, 0 ]
mat.edRC(3, (el, in) => el + in);
// [ 0, 0,
//   0, 3 ]
```

###### Throws

`RangeError` if `index` is not in range

###### Inherited from

`BaseMatrix.fn`

##### fnDim()

> **fnDim**(`dim`, `callback`): `number`

###### Parameters

| Parameter  | Type                          |
| ---------- | ----------------------------- |
| `dim`      | [`MatrixDim`](#matrixdim-2)   |
| `callback` | `MatrixCallbackDim`<`number`> |

###### Returns

`number`

###### See

[BaseMatrix.fn](#fn)

###### Inherited from

`BaseMatrix.fnDim`

##### forEach()

> **forEach**(`callback`): `void`

Executes the provided function once for each element

###### Parameters

| Parameter  | Type                                        |
| ---------- | ------------------------------------------- |
| `callback` | [`MatrixCallback`](#matrixcallback)<`void`> |

###### Returns

`void`

###### Inherited from

`BaseMatrix.forEach`

##### geometricMean()

> **geometricMean**(): `number`

Geometric mean of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.geometricMean`

##### hasSizeOf()

> **hasSizeOf**(`mat`): `boolean`

###### Parameters

| Parameter | Type         |
| --------- | ------------ |
| `mat`     | `BaseMatrix` |

###### Returns

`boolean`

`true` if the dimensions matches `mat`

###### Inherited from

`BaseMatrix.hasSizeOf`

##### indexOf()

> **indexOf**(`searchElement`, `fromIndex`): `number`

###### Parameters

| Parameter       | Type     | Default value | Description                      |
| --------------- | -------- | ------------- | -------------------------------- |
| `searchElement` | `number` | `undefined`   | -                                |
| `fromIndex`     | `number` | `0`           | the index to start the search at |

###### Returns

`number`

the index of the first occurance of `searchElement`

###### Inherited from

`BaseMatrix.indexOf`

##### indexOfDim()

> **indexOfDim**(`__namedParameters`): `number`

###### Parameters

| Parameter           | Type                        |
| ------------------- | --------------------------- |
| `__namedParameters` | [`MatrixDim`](#matrixdim-2) |

###### Returns

`number`

the matrix index at `row`, `column`

###### Throws

`RangeError` if `row` or `column` is not in range

###### Inherited from

`BaseMatrix.indexOfDim`

##### isSquare()

> **isSquare**(): `boolean`

###### Returns

`boolean`

`true` if the matrix is a square

###### Inherited from

`BaseMatrix.isSquare`

##### lastIndexOf()

> **lastIndexOf**(`searchElement`, `fromIndex`): `number`

###### Parameters

| Parameter       | Type     | Description                      |
| --------------- | -------- | -------------------------------- |
| `searchElement` | `number` | -                                |
| `fromIndex`     | `number` | the index to start the search at |

###### Returns

`number`

the index of the first occurance of `searchElement`, searching
backwards

###### Inherited from

`BaseMatrix.lastIndexOf`

##### map()

> **map**(`callback`, `inPlace`): [`Matrix`](#matrix)

###### Parameters

| Parameter  | Type                                          | Default value | Description                          |
| ---------- | --------------------------------------------- | ------------- | ------------------------------------ |
| `callback` | [`MatrixCallback`](#matrixcallback)<`number`> | `undefined`   | -                                    |
| `inPlace`  | `boolean`                                     | `false`       | performes the map in place if `true` |

###### Returns

[`Matrix`](#matrix)

a copy, where each element has been mapped by the callback fn.

###### Overrides

`BaseMatrix.map`

##### max()

> **max**(): `number`

Maximum value of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.max`

##### mean()

> **mean**(): `number`

Mean of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.mean`

##### median()

> **median**(): `number`

Median of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.median`

##### min()

> **min**(): `number`

Minimum value of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.min`

##### mmult()

> **mmult**(`mat`): [`Matrix`](#matrix)

###### Parameters

| Parameter | Type         |
| --------- | ------------ |
| `mat`     | `BaseMatrix` |

###### Returns

[`Matrix`](#matrix)

##### mode()

> **mode**(): `number`\[]

Most common value

###### Returns

`number`\[]

###### Inherited from

`BaseMatrix.mode`

##### prodSum()

> **prodSum**(): `number`

Product sum of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.prodSum`

##### quantiles()

> **quantiles**(`probs`): `number`\[]

###### Parameters

| Parameter | Type     |
| --------- | -------- | ----------- |
| `probs`   | `number` | `number`\[] |

###### Returns

`number`\[]

###### Inherited from

`BaseMatrix.quantiles`

##### range()

> **range**(): \[`number`, `number`]

The range (min-max) of all elements

###### Returns

\[`number`, `number`]

###### Inherited from

`BaseMatrix.range`

##### reduce()

> **reduce**(`callback`, `init`): `number`

Executes a user-supplied "reducer" callback function on each element, in
order, passing in the return value from the calculation on the preceding
element. The final result of running the reducer across all elements is a
single value.

###### Parameters

| Parameter  | Type                                  | Default value |
| ---------- | ------------------------------------- | ------------- |
| `callback` | (`prev`, `curr`, `index`) => `number` | `undefined`   |
| `init`     | `number`                              | `0.0`         |

###### Returns

`number`

###### Inherited from

`BaseMatrix.reduce`

##### rowOfIndex()

> **rowOfIndex**(`index`): `number`

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `index`   | `number` |

###### Returns

`number`

the row index of the matrix `index`

###### Throws

`RangeError` if `index` is not in range

###### Inherited from

`BaseMatrix.rowOfIndex`

##### sd()

> **sd**(): `number`

Standard deviation of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

###### Inherited from

`BaseMatrix.skewness`

##### slice()

> **slice**(`start?`, `end?`): `number`\[]

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `start?`  | `number` |
| `end?`    | `number` |

###### Returns

`number`\[]

the a copy of the internal array of elements (stored column major)

###### Inherited from

`BaseMatrix.slice`

##### some()

> **some**(`callback`): `boolean`

Tests if any element pass the test implemented by the callback fn

###### Parameters

| Parameter  | Type                                           |
| ---------- | ---------------------------------------------- |
| `callback` | [`MatrixCallback`](#matrixcallback)<`boolean`> |

###### Returns

`boolean`

###### Inherited from

`BaseMatrix.some`

##### standardize()

> **standardize**(`normalize`, `inPlace`): `this`

Standardizes or normalizes the matrix

- if `normalize` is `true`: normalizes the values by `(x-min)/(max-min)`
- otherwise: standardizes the values by `(x - mu)/sigma`

###### Parameters

| Parameter   | Type      | Default value |
| ----------- | --------- | ------------- |
| `normalize` | `boolean` | `false`       |
| `inPlace`   | `boolean` | `false`       |

###### Returns

`this`

###### Inherited from

`BaseMatrix.standardize`

##### sum()

> **sum**(): `number`

Sum of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.sum`

##### swap()

> **swap**(`index1`, `index2`): `void`

Swaps the elements at the provided indexes

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `index1`  | `number` |
| `index2`  | `number` |

###### Returns

`void`

###### Throws

`RangeError` if `index` is not in range

###### Inherited from

`BaseMatrix.swap`

##### transpose()

> **transpose**(): [`Matrix`](#matrix)

###### Returns

[`Matrix`](#matrix)

##### variance()

> **variance**(): `number`

Variance of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.variance`

##### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is Matrix`

###### Parameters

| Parameter | Type      | Default value       | Description     |
| --------- | --------- | ------------------- | --------------- |
| `obj`     | `unknown` | `undefined`         | -               |
| `msg`     | `string`  | `"Expected Matrix"` | message to pass |

###### Returns

`asserts obj is Matrix`

###### Throws

TypeError if `obj` is not Matrix

##### cbind()

> `static` **cbind**(...`matrices`): [`Matrix`](#matrix)

Bind multiple matrices together by columns

###### Parameters

| Parameter     | Type            |
| ------------- | --------------- |
| ...`matrices` | `BaseMatrix`\[] |

###### Returns

[`Matrix`](#matrix)

###### Throws

`RangeError` if the number of rows of any matrix doesn't match

##### create()

> `static` **create**(`fill`, `dim`): [`Matrix`](#matrix)

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `fill`    | `number`                    |
| `dim`     | [`MatrixDim`](#matrixdim-2) |

###### Returns

[`Matrix`](#matrix)

a new Matrix of size `dim` filled with `fill`

##### isMatrix()

> `static` **isMatrix**(`mat`): `mat is Matrix`

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `mat`     | `unknown` |

###### Returns

`mat is Matrix`

`true` if `mat` is a Matrix

##### mmult()

> `static` **mmult**(`mat1`, `mat2`): [`Matrix`](#matrix)

Performs matrix multiplication this \* mat

###### Parameters

| Parameter | Type         |
| --------- | ------------ |
| `mat1`    | `BaseMatrix` |
| `mat2`    | `BaseMatrix` |

###### Returns

[`Matrix`](#matrix)

##### rbind()

> `static` **rbind**(...`matrices`): [`Matrix`](#matrix)

Bind multiple matrices together by rows

###### Parameters

| Parameter     | Type            |
| ------------- | --------------- |
| ...`matrices` | `BaseMatrix`\[] |

###### Returns

[`Matrix`](#matrix)

###### Throws

`RangeError` if the number of columns of any matrix doesn't match

#### Basic operators

##### add()

> **add**(`mat`, `inPlace`): `this`

Matrix addition.

###### Parameters

| Parameter | Type      | Default value | Description                                  |
| --------- | --------- | ------------- | -------------------------------------------- | --- |
| `mat`     | `number`  | `BaseMatrix`  | `undefined`                                  | -   |
| `inPlace` | `boolean` | `false`       | If `true`, performes the operation in place. |

###### Returns

`this`

###### Inherited from

`BaseMatrix.add`

##### divide()

> **divide**(`mat`, `inPlace`): `this`

Element wise division.

###### Parameters

| Parameter | Type      | Default value | Description                                  |
| --------- | --------- | ------------- | -------------------------------------------- | --- |
| `mat`     | `number`  | `BaseMatrix`  | `undefined`                                  | -   |
| `inPlace` | `boolean` | `false`       | If `true`, performes the operation in place. |

###### Returns

`this`

###### Inherited from

`BaseMatrix.divide`

##### mod()

> **mod**(`mat`, `inPlace`): `this`

Element wise remainder (%) `x % y`

###### Parameters

| Parameter | Type      | Default value | Description                                  |
| --------- | --------- | ------------- | -------------------------------------------- | --- |
| `mat`     | `number`  | `BaseMatrix`  | `undefined`                                  | -   |
| `inPlace` | `boolean` | `false`       | If `true`, performes the operation in place. |

###### Returns

`this`

###### Inherited from

`BaseMatrix.mod`

##### multiply()

> **multiply**(`mat`, `inPlace`): `this`

Element wise multiplication.

###### Parameters

| Parameter | Type      | Default value | Description                                  |
| --------- | --------- | ------------- | -------------------------------------------- | --- |
| `mat`     | `number`  | `BaseMatrix`  | `undefined`                                  | -   |
| `inPlace` | `boolean` | `false`       | If `true`, performes the operation in place. |

###### Returns

`this`

###### Inherited from

`BaseMatrix.multiply`

##### subtract()

> **subtract**(`mat`, `inPlace`): `this`

Matrix subtraction.

###### Parameters

| Parameter | Type      | Default value | Description                                  |
| --------- | --------- | ------------- | -------------------------------------------- | --- |
| `mat`     | `number`  | `BaseMatrix`  | `undefined`                                  | -   |
| `inPlace` | `boolean` | `false`       | If `true`, performes the operation in place. |

###### Returns

`this`

###### Inherited from

`BaseMatrix.subtract`

#### Column operations

##### standardizeByCol()

> **standardizeByCol**(`normalize`): [`Matrix`](#matrix)

Standardizes or normalizes the matrix by column

- if `normalize` is `true`: normalizes the values in a column by `(x-min)/(max-min)`
- otherwise: standardizes the values in a column by `(x - mu)/sigma`

###### Parameters

| Parameter   | Type      | Default value |
| ----------- | --------- | ------------- |
| `normalize` | `boolean` | `false`       |

###### Returns

[`Matrix`](#matrix)

a new standardized or normalized [Matrix](#matrix)

#### Linear algebra

##### determinant()

> **determinant**(): `number`

###### Returns

`number`

the determinant of the matrix

###### Throws

`Error` if matrix is not square

##### inverse()

> **inverse**(`eps`): `null` | [`Matrix`](#matrix)

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `eps`     | `number` | `1e-9`        |

###### Returns

`null` | [`Matrix`](#matrix)

the inverse of the matrix

##### reducedRowEchelon()

> **reducedRowEchelon**(`eps`, `inPlace`): [`Matrix`](#matrix)

###### Parameters

| Parameter | Type      | Default value |
| --------- | --------- | ------------- |
| `eps`     | `number`  | `1e-9`        |
| `inPlace` | `boolean` | `false`       |

###### Returns

[`Matrix`](#matrix)

the matrix in reduced row echelon format

##### rightTriangular()

> **rightTriangular**(): [`Matrix`](#matrix)

###### Returns

[`Matrix`](#matrix)

the matrix in right triangular format

#### Statistics

##### covariance()

> **covariance**(): [`Matrix`](#matrix)

###### Returns

[`Matrix`](#matrix)

the covariance matrix

##### distance()

> **distance**(`a`, `b`, `squared`): `number`

###### Parameters

| Parameter | Type      | Default value | Description                                                                                        |
| --------- | --------- | ------------- | -------------------------------------------------------------------------------------------------- |
| `a`       | `number`  | `undefined`   | a row index                                                                                        |
| `b`       | `number`  | `undefined`   | a row index                                                                                        |
| `squared` | `boolean` | `true`        | if `false`, calculates the euclidean distance, otherwise calculates the euclidean squared distance |

###### Returns

`number`

the distance between rows `a` and `b`

##### standardizeByCol()

> **standardizeByCol**(`normalize`): [`Matrix`](#matrix)

Standardizes or normalizes the matrix by column

- if `normalize` is `true`: normalizes the values in a column by `(x-min)/(max-min)`
- otherwise: standardizes the values in a column by `(x - mu)/sigma`

###### Parameters

| Parameter   | Type      | Default value |
| ----------- | --------- | ------------- |
| `normalize` | `boolean` | `false`       |

###### Returns

[`Matrix`](#matrix)

a new standardized or normalized [Matrix](#matrix)

---

### Vector

#### Extends

- `BaseMatrix`

#### Constructors

##### Constructor

> **new Vector**(`arr`, `shallow`): [`Vector`](#vector)

###### Parameters

| Parameter | Type        | Default value       | Description                                                 |
| --------- | ----------- | ------------------- | ----------------------------------------------------------- | -------------------------------------------------- |
| `arr`     | `number`\[] | [`Vector`](#vector) | `undefined`                                                 | the values used to form the Vector in column-order |
| `shallow` | `boolean`   | `false`             | if `true`, uses the internal arrays of `arr` as a reference |

###### Returns

[`Vector`](#vector)

###### Overrides

`BaseMatrix.constructor`

#### Properties

| Property                           | Modifier    | Type        | Description                        |
| ---------------------------------- | ----------- | ----------- | ---------------------------------- |
| <a id="cols-1"></a> `cols`         | `protected` | `number`    | **`Internal`**                     |
| <a id="internal-1"></a> `internal` | `protected` | `number`\[] | **`Internal`** stored column major |
| <a id="len-1"></a> `len`           | `protected` | `number`    | **`Internal`**                     |
| <a id="rows-1"></a> `rows`         | `protected` | `number`    | **`Internal`**                     |

#### Accessors

##### length

###### Get Signature

> **get** **length**(): `number`

###### Returns

`number`

the number of elements

###### Inherited from

`BaseMatrix.length`

##### ncol

###### Get Signature

> **get** **ncol**(): `number`

###### Returns

`number`

the number of columns

###### Inherited from

`BaseMatrix.ncol`

##### nrow

###### Get Signature

> **get** **nrow**(): `number`

###### Returns

`number`

the number of rows

###### Inherited from

`BaseMatrix.nrow`

#### Methods

##### at()

> **at**(`index`): `number`

###### Parameters

| Parameter | Type     | Description                                    |
| --------- | -------- | ---------------------------------------------- |
| `index`   | `number` | if `index < 0`, `index + .length` is accessed. |

###### Returns

`number`

the element at matrix `index`

###### Throws

`RangeError` if `index` is not in range

###### Inherited from

`BaseMatrix.at`

##### atDim()

> **atDim**(`dim`): `number`

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `dim`     | [`MatrixDim`](#matrixdim-2) |

###### Returns

`number`

###### See

[BaseMatrix.at](#at)

###### Inherited from

`BaseMatrix.atDim`

##### baseMap()

> `protected` **baseMap**(`callback`): `number`\[]

###### Parameters

| Parameter  | Type                                          |
| ---------- | --------------------------------------------- |
| `callback` | [`MatrixCallback`](#matrixcallback)<`number`> |

###### Returns

`number`\[]

###### Inherited from

`BaseMatrix.baseMap`

##### baseMapInPlace()

> `protected` **baseMapInPlace**(`callback`): `this`

###### Parameters

| Parameter  | Type                                          |
| ---------- | --------------------------------------------- |
| `callback` | [`MatrixCallback`](#matrixcallback)<`number`> |

###### Returns

`this`

###### Inherited from

`BaseMatrix.baseMapInPlace`

##### clone()

> **clone**(): [`Vector`](#vector)

###### Returns

[`Vector`](#vector)

###### Overrides

`BaseMatrix.clone`

##### colOfIndex()

> **colOfIndex**(`index`): `number`

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `index`   | `number` |

###### Returns

`number`

the column index of the matrix `index`

###### Throws

`RangeError` if `index` is not in range

###### Inherited from

`BaseMatrix.colOfIndex`

##### correlation()

> **correlation**(`vec`): `number`

###### Parameters

| Parameter | Type                |
| --------- | ------------------- |
| `vec`     | [`Vector`](#vector) |

###### Returns

`number`

the correlation between `this` and `vec`

###### Throws

`RangeError` if the vectors have different sizes

##### dim()

> **dim**(): [`MatrixDim`](#matrixdim-2)

###### Returns

[`MatrixDim`](#matrixdim-2)

`[this.nrow, this.ncol]`

###### Inherited from

`BaseMatrix.dim`

##### dimOfIndex()

> **dimOfIndex**(`index`): [`MatrixDim`](#matrixdim-2)

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `index`   | `number` |

###### Returns

[`MatrixDim`](#matrixdim-2)

an array `[row, column]`

###### Inherited from

`BaseMatrix.dimOfIndex`

##### ed()

> **ed**(`index`, `value`): `number`

Changes the element at matrix `index` to `value`

###### Parameters

| Parameter | Type     | Description                                    |
| --------- | -------- | ---------------------------------------------- |
| `index`   | `number` | if `index < 0`, `index + .length` is accessed. |
| `value`   | `number` | -                                              |

###### Returns

`number`

`value`

###### Throws

`RangeError` if `index` is not in range

###### Inherited from

`BaseMatrix.ed`

##### edDim()

> **edDim**(`dim`, `value`): `number`

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `dim`     | [`MatrixDim`](#matrixdim-2) |
| `value`   | `number`                    |

###### Returns

`number`

###### See

[BaseMatrix.ed](#ed)

###### Inherited from

`BaseMatrix.edDim`

##### equals()

> **equals**(`mat`): `boolean`

###### Parameters

| Parameter | Type         |
| --------- | ------------ |
| `mat`     | `BaseMatrix` |

###### Returns

`boolean`

`true` if `this` is equal to `mat`

###### Inherited from

`BaseMatrix.equals`

##### equalsApprox()

> **equalsApprox**(`mat`, `eps`): `boolean`

###### Parameters

| Parameter | Type         | Default value |
| --------- | ------------ | ------------- |
| `mat`     | `BaseMatrix` | `undefined`   |
| `eps`     | `number`     | `1e-9`        |

###### Returns

`boolean`

`true` if `this` is approximately equal to `mat`

###### Inherited from

`BaseMatrix.equalsApprox`

##### every()

> **every**(`callback`): `boolean`

Tests if all elements pass the test implemented by the callback fn

###### Parameters

| Parameter  | Type                                           |
| ---------- | ---------------------------------------------- |
| `callback` | [`MatrixCallback`](#matrixcallback)<`boolean`> |

###### Returns

`boolean`

###### Inherited from

`BaseMatrix.every`

##### filter()

> **filter**(`callback`): [`Vector`](#vector)

###### Parameters

| Parameter  | Type                                           | Description                                       |
| ---------- | ---------------------------------------------- | ------------------------------------------------- |
| `callback` | [`MatrixCallback`](#matrixcallback)<`boolean`> | a function returning true for elements to be kept |

###### Returns

[`Vector`](#vector)

a filtered vector according to the provided callbackFn

##### findIndex()

> **findIndex**(`callback`): `number`

###### Parameters

| Parameter  | Type                                           | Description                                   |
| ---------- | ---------------------------------------------- | --------------------------------------------- |
| `callback` | [`MatrixCallback`](#matrixcallback)<`boolean`> | a function used to test elements in the array |

###### Returns

`number`

the index of the first element passing the test in `callback`

###### Inherited from

`BaseMatrix.findIndex`

##### fn()

> **fn**(`index`, `callback`): `number`

Changes the element at matrix `index` through a callback function.

###### Parameters

| Parameter  | Type                                          |
| ---------- | --------------------------------------------- |
| `index`    | `number`                                      |
| `callback` | [`MatrixCallback`](#matrixcallback)<`number`> |

###### Returns

`number`

the result of `callback`

###### Example

```ts
const mat = new Matrix(0, 2, 2);
// [ 0, 0,
//   0, 0 ]
mat.edRC(3, (el, in) => el + in);
// [ 0, 0,
//   0, 3 ]
```

###### Throws

`RangeError` if `index` is not in range

###### Inherited from

`BaseMatrix.fn`

##### fnDim()

> **fnDim**(`dim`, `callback`): `number`

###### Parameters

| Parameter  | Type                          |
| ---------- | ----------------------------- |
| `dim`      | [`MatrixDim`](#matrixdim-2)   |
| `callback` | `MatrixCallbackDim`<`number`> |

###### Returns

`number`

###### See

[BaseMatrix.fn](#fn)

###### Inherited from

`BaseMatrix.fnDim`

##### forEach()

> **forEach**(`callback`): `void`

Executes the provided function once for each element

###### Parameters

| Parameter  | Type                                        |
| ---------- | ------------------------------------------- |
| `callback` | [`MatrixCallback`](#matrixcallback)<`void`> |

###### Returns

`void`

###### Inherited from

`BaseMatrix.forEach`

##### geometricMean()

> **geometricMean**(): `number`

Geometric mean of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.geometricMean`

##### hasSizeOf()

> **hasSizeOf**(`mat`): `boolean`

###### Parameters

| Parameter | Type         |
| --------- | ------------ |
| `mat`     | `BaseMatrix` |

###### Returns

`boolean`

`true` if the dimensions matches `mat`

###### Inherited from

`BaseMatrix.hasSizeOf`

##### histogram()

> **histogram**(`bins`, `range`): { `bins`: `number`\[]; `range`: \[`number`, `number`]; `width`: `number`; }

###### Parameters

| Parameter | Type                  |
| --------- | --------------------- |
| `bins`    | `number`              |
| `range`   | \[`number`, `number`] |

###### Returns

{ `bins`: `number`\[]; `range`: \[`number`, `number`]; `width`: `number`; }

the values needed in order to construct a histogram

| Name    | Type                  |
| ------- | --------------------- |
| `bins`  | `number`\[]           |
| `range` | \[`number`, `number`] |
| `width` | `number`              |

###### Throws

`RangeError` if the provided range is not finite, or in the incorrect order.

##### indexOf()

> **indexOf**(`searchElement`, `fromIndex`): `number`

###### Parameters

| Parameter       | Type     | Default value | Description                      |
| --------------- | -------- | ------------- | -------------------------------- |
| `searchElement` | `number` | `undefined`   | -                                |
| `fromIndex`     | `number` | `0`           | the index to start the search at |

###### Returns

`number`

the index of the first occurance of `searchElement`

###### Inherited from

`BaseMatrix.indexOf`

##### indexOfDim()

> **indexOfDim**(`__namedParameters`): `number`

###### Parameters

| Parameter           | Type                        |
| ------------------- | --------------------------- |
| `__namedParameters` | [`MatrixDim`](#matrixdim-2) |

###### Returns

`number`

the matrix index at `row`, `column`

###### Throws

`RangeError` if `row` or `column` is not in range

###### Inherited from

`BaseMatrix.indexOfDim`

##### isSquare()

> **isSquare**(): `boolean`

###### Returns

`boolean`

`true` if the matrix is a square

###### Inherited from

`BaseMatrix.isSquare`

##### lastIndexOf()

> **lastIndexOf**(`searchElement`, `fromIndex`): `number`

###### Parameters

| Parameter       | Type     | Description                      |
| --------------- | -------- | -------------------------------- |
| `searchElement` | `number` | -                                |
| `fromIndex`     | `number` | the index to start the search at |

###### Returns

`number`

the index of the first occurance of `searchElement`, searching
backwards

###### Inherited from

`BaseMatrix.lastIndexOf`

##### map()

> **map**(`callback`, `inPlace`): [`Vector`](#vector)

###### Parameters

| Parameter  | Type                                          | Default value | Description                          |
| ---------- | --------------------------------------------- | ------------- | ------------------------------------ |
| `callback` | [`MatrixCallback`](#matrixcallback)<`number`> | `undefined`   | -                                    |
| `inPlace`  | `boolean`                                     | `false`       | performes the map in place if `true` |

###### Returns

[`Vector`](#vector)

a copy, where each element has been mapped by the callback fn.

###### Overrides

`BaseMatrix.map`

##### max()

> **max**(): `number`

Maximum value of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.max`

##### mean()

> **mean**(): `number`

Mean of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.mean`

##### median()

> **median**(): `number`

Median of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.median`

##### min()

> **min**(): `number`

Minimum value of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.min`

##### mode()

> **mode**(): `number`\[]

Most common value

###### Returns

`number`\[]

###### Inherited from

`BaseMatrix.mode`

##### prodSum()

> **prodSum**(): `number`

Product sum of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.prodSum`

##### quantiles()

> **quantiles**(`probs`): `number`\[]

###### Parameters

| Parameter | Type     |
| --------- | -------- | ----------- |
| `probs`   | `number` | `number`\[] |

###### Returns

`number`\[]

###### Inherited from

`BaseMatrix.quantiles`

##### range()

> **range**(): \[`number`, `number`]

The range (min-max) of all elements

###### Returns

\[`number`, `number`]

###### Inherited from

`BaseMatrix.range`

##### reduce()

> **reduce**(`callback`, `init`): `number`

Executes a user-supplied "reducer" callback function on each element, in
order, passing in the return value from the calculation on the preceding
element. The final result of running the reducer across all elements is a
single value.

###### Parameters

| Parameter  | Type                                  | Default value |
| ---------- | ------------------------------------- | ------------- |
| `callback` | (`prev`, `curr`, `index`) => `number` | `undefined`   |
| `init`     | `number`                              | `0.0`         |

###### Returns

`number`

###### Inherited from

`BaseMatrix.reduce`

##### rowOfIndex()

> **rowOfIndex**(`index`): `number`

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `index`   | `number` |

###### Returns

`number`

the row index of the matrix `index`

###### Throws

`RangeError` if `index` is not in range

###### Inherited from

`BaseMatrix.rowOfIndex`

##### sd()

> **sd**(): `number`

Standard deviation of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

###### Inherited from

`BaseMatrix.skewness`

##### slice()

> **slice**(`start?`, `end?`): `number`\[]

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `start?`  | `number` |
| `end?`    | `number` |

###### Returns

`number`\[]

the a copy of the internal array of elements (stored column major)

###### Inherited from

`BaseMatrix.slice`

##### some()

> **some**(`callback`): `boolean`

Tests if any element pass the test implemented by the callback fn

###### Parameters

| Parameter  | Type                                           |
| ---------- | ---------------------------------------------- |
| `callback` | [`MatrixCallback`](#matrixcallback)<`boolean`> |

###### Returns

`boolean`

###### Inherited from

`BaseMatrix.some`

##### sort()

> **sort**(`callback`): [`Vector`](#vector)

Sorts the elements according to `compareFn`

`callback(a, b)` return value:

- `> 0`: sort `a` after `b`
- `< 0`: sort `a` before `b`
- `=== 0`: keep original order

###### Parameters

| Parameter  | Type                                              | Description                                                         |
| ---------- | ------------------------------------------------- | ------------------------------------------------------------------- |
| `callback` | [`MatrixCallbackCompare`](#matrixcallbackcompare) | a function that defines the sort order, being provided the elements |

###### Returns

[`Vector`](#vector)

a sorted vector

##### sortIndex()

> **sortIndex**(`callback`): `number`\[]

`callback(a, b)` return value:

- `> 0`: sort `a` after `b`
- `< 0`: sort `a` before `b`
- `=== 0`: keep original order

###### Parameters

| Parameter  | Type                                              | Description                                                         |
| ---------- | ------------------------------------------------- | ------------------------------------------------------------------- |
| `callback` | [`MatrixCallbackCompare`](#matrixcallbackcompare) | a function that defines the sort order, being provided the elements |

###### Returns

`number`\[]

the indices that sorts the vector

##### standardize()

> **standardize**(`normalize`, `inPlace`): `this`

Standardizes or normalizes the matrix

- if `normalize` is `true`: normalizes the values by `(x-min)/(max-min)`
- otherwise: standardizes the values by `(x - mu)/sigma`

###### Parameters

| Parameter   | Type      | Default value |
| ----------- | --------- | ------------- |
| `normalize` | `boolean` | `false`       |
| `inPlace`   | `boolean` | `false`       |

###### Returns

`this`

###### Inherited from

`BaseMatrix.standardize`

##### sum()

> **sum**(): `number`

Sum of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.sum`

##### swap()

> **swap**(`index1`, `index2`): `void`

Swaps the elements at the provided indexes

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `index1`  | `number` |
| `index2`  | `number` |

###### Returns

`void`

###### Throws

`RangeError` if `index` is not in range

###### Inherited from

`BaseMatrix.swap`

##### unique()

> **unique**(): [`Vector`](#vector)

###### Returns

[`Vector`](#vector)

the unique elements

##### variance()

> **variance**(): `number`

Variance of all elements

###### Returns

`number`

###### Inherited from

`BaseMatrix.variance`

##### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is Vector`

###### Parameters

| Parameter | Type      | Default value       | Description     |
| --------- | --------- | ------------------- | --------------- |
| `obj`     | `unknown` | `undefined`         | -               |
| `msg`     | `string`  | `"Expected Vector"` | message to pass |

###### Returns

`asserts obj is Vector`

###### Throws

TypeError if `obj` is not Vector

##### borrow()

> `static` **borrow**(`vec`): `number`\[]

###### Parameters

| Parameter | Type        |
| --------- | ----------- | ------------------- |
| `vec`     | `number`\[] | [`Vector`](#vector) |

###### Returns

`number`\[]

##### create()

> `static` **create**(`fill`, `length`): [`Vector`](#vector)

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `fill`    | `number` |
| `length`  | `number` |

###### Returns

[`Vector`](#vector)

a new Vector of size `length` filled with `fill`

##### isVector()

> `static` **isVector**(`mat`): `mat is Vector`

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `mat`     | `unknown` |

###### Returns

`mat is Vector`

`true` if `mat` is a Vector

#### Basic operators

##### add()

> **add**(`mat`, `inPlace`): `this`

Matrix addition.

###### Parameters

| Parameter | Type      | Default value | Description                                  |
| --------- | --------- | ------------- | -------------------------------------------- | --- |
| `mat`     | `number`  | `BaseMatrix`  | `undefined`                                  | -   |
| `inPlace` | `boolean` | `false`       | If `true`, performes the operation in place. |

###### Returns

`this`

###### Inherited from

`BaseMatrix.add`

##### divide()

> **divide**(`mat`, `inPlace`): `this`

Element wise division.

###### Parameters

| Parameter | Type      | Default value | Description                                  |
| --------- | --------- | ------------- | -------------------------------------------- | --- |
| `mat`     | `number`  | `BaseMatrix`  | `undefined`                                  | -   |
| `inPlace` | `boolean` | `false`       | If `true`, performes the operation in place. |

###### Returns

`this`

###### Inherited from

`BaseMatrix.divide`

##### mod()

> **mod**(`mat`, `inPlace`): `this`

Element wise remainder (%) `x % y`

###### Parameters

| Parameter | Type      | Default value | Description                                  |
| --------- | --------- | ------------- | -------------------------------------------- | --- |
| `mat`     | `number`  | `BaseMatrix`  | `undefined`                                  | -   |
| `inPlace` | `boolean` | `false`       | If `true`, performes the operation in place. |

###### Returns

`this`

###### Inherited from

`BaseMatrix.mod`

##### multiply()

> **multiply**(`mat`, `inPlace`): `this`

Element wise multiplication.

###### Parameters

| Parameter | Type      | Default value | Description                                  |
| --------- | --------- | ------------- | -------------------------------------------- | --- |
| `mat`     | `number`  | `BaseMatrix`  | `undefined`                                  | -   |
| `inPlace` | `boolean` | `false`       | If `true`, performes the operation in place. |

###### Returns

`this`

###### Inherited from

`BaseMatrix.multiply`

##### subtract()

> **subtract**(`mat`, `inPlace`): `this`

Matrix subtraction.

###### Parameters

| Parameter | Type      | Default value | Description                                  |
| --------- | --------- | ------------- | -------------------------------------------- | --- |
| `mat`     | `number`  | `BaseMatrix`  | `undefined`                                  | -   |
| `inPlace` | `boolean` | `false`       | If `true`, performes the operation in place. |

###### Returns

`this`

###### Inherited from

`BaseMatrix.subtract`

#### Copy methods

##### sortRandom()

> **sortRandom**(`inPlace`, `rand`): [`Vector`](#vector)

###### Parameters

| Parameter | Type                                           | Default value | Description                               |
| --------- | ---------------------------------------------- | ------------- | ----------------------------------------- |
| `inPlace` | `boolean`                                      | `false`       | if `true`, the vector is sorted in place. |
| `rand`    | [`RandomGenerator`](random.md#randomgenerator) | `...`         | -                                         |

###### Returns

[`Vector`](#vector)

the vector with a permutated order

#### Maps

##### intersect()

> **intersect**(`vec`): [`Vector`](#vector)

###### Parameters

| Parameter | Type                |
| --------- | ------------------- |
| `vec`     | [`Vector`](#vector) |

###### Returns

[`Vector`](#vector)

the unique elements of the intersect

##### sortRandom()

> **sortRandom**(`inPlace`, `rand`): [`Vector`](#vector)

###### Parameters

| Parameter | Type                                           | Default value | Description                               |
| --------- | ---------------------------------------------- | ------------- | ----------------------------------------- |
| `inPlace` | `boolean`                                      | `false`       | if `true`, the vector is sorted in place. |
| `rand`    | [`RandomGenerator`](random.md#randomgenerator) | `...`         | -                                         |

###### Returns

[`Vector`](#vector)

the vector with a permutated order

##### union()

> **union**(`vec`): [`Vector`](#vector)

###### Parameters

| Parameter | Type        |
| --------- | ----------- | ------------------- |
| `vec`     | `number`\[] | [`Vector`](#vector) |

###### Returns

[`Vector`](#vector)

the unique elements of the union of `this` and `vec`

#### Statistics

##### covariance()

> **covariance**(`vec`): `number`

###### Parameters

| Parameter | Type                |
| --------- | ------------------- |
| `vec`     | [`Vector`](#vector) |

###### Returns

`number`

the covariance of `this` and `vec`

###### Throws

`RangeError` if the vectors has different sizes

##### cumulativeSum()

> **cumulativeSum**(): [`Vector`](#vector)

###### Returns

[`Vector`](#vector)

the cumulative sums of the vector elements

## Type Aliases

### MatrixCallback()\<T>

> **MatrixCallback**<`T`> = (`element`, `index`) => `T`

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `element` | `number` |
| `index`   | `number` |

#### Returns

`T`

---

### MatrixCallbackCompare()

> **MatrixCallbackCompare** = (`a`, `b`) => `number`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `a`       | `number` |
| `b`       | `number` |

#### Returns

`number`

---

### MatrixDim

> **MatrixDim** = \[`number`, `number`]

## Functions

### diagonalMatrix()

> **diagonalMatrix**(`arr`): [`Matrix`](#matrix)

#### Parameters

| Parameter | Type        | Description           |
| --------- | ----------- | --------------------- |
| `arr`     | `number`\[] | the diagonal elements |

#### Returns

[`Matrix`](#matrix)

a new matrix with diagonal elements set to `arr`

---

### identityMatrix()

> **identityMatrix**(`nrow`): [`Matrix`](#matrix)

#### Parameters

| Parameter | Type     | Description            |
| --------- | -------- | ---------------------- |
| `nrow`    | `number` | the size of the matrix |

#### Returns

[`Matrix`](#matrix)

a (square) identity matrix.

---

### randomMatrix()

> **randomMatrix**(`dims`, `generator`): [`Matrix`](#matrix)

Generates a matrix of random numbers on \[0, 1).

#### Parameters

| Parameter   | Type                                           | Description                         |
| ----------- | ---------------------------------------------- | ----------------------------------- |
| `dims`      | [`MatrixDim`](#matrixdim-2)                    | the dimensions of the random matrix |
| `generator` | [`RandomGenerator`](random.md#randomgenerator) | an RNG.                             |

#### Returns

[`Matrix`](#matrix)

---

### randomVector()

> **randomVector**(`length`, `rand`): [`Vector`](#vector)

Generates a vector-like of random numbers on \[0, 1).

#### Parameters

| Parameter | Type                                           | Description              |
| --------- | ---------------------------------------------- | ------------------------ |
| `length`  | `number`                                       | the length of the vector |
| `rand`    | [`RandomGenerator`](random.md#randomgenerator) | an RNG                   |

#### Returns

[`Vector`](#vector)

a vector-like of random numbers on \[0, 1).

---

### sequence()

> **sequence**(`from`, `to`, `by`): [`Vector`](#vector)

Generates a vector-like of a sequence of numbers.

#### Parameters

| Parameter | Type     | Default value | Description                                                                |
| --------- | -------- | ------------- | -------------------------------------------------------------------------- |
| `from`    | `number` | `undefined`   | The starting number in the sequence.                                       |
| `to`      | `number` | `undefined`   | A number for which the sequence will not generate beyond.                  |
| `by`      | `number` | `1.0`         | The incrementing (or decrementing) size of the sequence. Must be positive. |

#### Returns

[`Vector`](#vector)

A vector of size needed to reach `to`, however not going over it.

#### Example

```ts
const seq1 = ColumnVector.createSequence(0, 2, 0.5);
// seq1 is a ColumnVector with elements [0.0, 0.5, 1.0, 1.5, 2.0]
const seq2 = ColumnVector.createSequence(0, 1.9, 0.5);
// seq2 is a ColumnVector with elements [0.0, 0.5, 1.0, 1.5]
```
