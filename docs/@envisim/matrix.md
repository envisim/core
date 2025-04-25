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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`arr`

</td>
<td>

`number`\[]

</td>
<td>

`undefined`

</td>
<td>

the values used to form the Matrix in column-order

</td>
</tr>
<tr>
<td>

`nrow`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

the number of rows of the Matrix

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

if `true`, uses the internal arrays of `arr` as a reference

</td>
</tr>
</tbody>
</table>

###### Returns

[`Matrix`](#matrix)

###### Overrides

`BaseMatrix.constructor`

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
<td>

if `index < 0`, `index + .length` is accessed.

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`dim`

</td>
<td>

[`MatrixDim`](#matrixdim-2)

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### See

[BaseMatrix.at](#at)

###### Inherited from

`BaseMatrix.atDim`

##### baseMap()

> `protected` **baseMap**(`callback`): `number`\[]

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`number`>

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Inherited from

`BaseMatrix.baseMap`

##### baseMapInPlace()

> `protected` **baseMapInPlace**(`callback`): `this`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`number`>

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MatrixDim`](#matrixdim-2)

an array `[row, column]`

###### Inherited from

`BaseMatrix.dimOfIndex`

##### ed()

> **ed**(`index`, `value`): `number`

Changes the element at matrix `index` to `value`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
<td>

if `index < 0`, `index + .length` is accessed.

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`dim`

</td>
<td>

[`MatrixDim`](#matrixdim-2)

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### See

[BaseMatrix.ed](#ed)

###### Inherited from

`BaseMatrix.edDim`

##### equals()

> **equals**(`mat`): `boolean`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`BaseMatrix`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

`true` if `this` is equal to `mat`

###### Inherited from

`BaseMatrix.equals`

##### equalsApprox()

> **equalsApprox**(`mat`, `eps`): `boolean`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`BaseMatrix`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-9`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

`true` if `this` is approximately equal to `mat`

###### Inherited from

`BaseMatrix.equalsApprox`

##### every()

> **every**(`callback`): `boolean`

Tests if all elements pass the test implemented by the callback fn

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`boolean`>

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

`BaseMatrix.every`

##### extractColumn()

> **extractColumn**(`col`): [`Vector`](#vector)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`col`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Vector`](#vector)

##### extractColumns()

> **extractColumns**(`cols`): [`Matrix`](#matrix)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`cols`

</td>
<td>

`number`\[] | [`Vector`](#vector)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Matrix`](#matrix)

##### extractRow()

> **extractRow**(`row`): `number`\[]

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`row`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

##### extractRows()

> **extractRows**(`rows`): [`Matrix`](#matrix)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`rows`

</td>
<td>

`number`\[] | [`Vector`](#vector)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Matrix`](#matrix)

##### extractSubMatrix()

> **extractSubMatrix**(`start`, `end`): [`Matrix`](#matrix)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`start`

</td>
<td>

[`MatrixDim`](#matrixdim-2)

</td>
</tr>
<tr>
<td>

`end`

</td>
<td>

[`MatrixDim`](#matrixdim-2)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Matrix`](#matrix)

a sub-matrix defined by the parameters.

##### findIndex()

> **findIndex**(`callback`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`boolean`>

</td>
<td>

a function used to test elements in the array

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

the index of the first element passing the test in `callback`

###### Inherited from

`BaseMatrix.findIndex`

##### fn()

> **fn**(`index`, `callback`): `number`

Changes the element at matrix `index` through a callback function.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`number`>

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`dim`

</td>
<td>

[`MatrixDim`](#matrixdim-2)

</td>
</tr>
<tr>
<td>

`callback`

</td>
<td>

`MatrixCallbackDim`<`number`>

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`void`>

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`BaseMatrix`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

`true` if the dimensions matches `mat`

###### Inherited from

`BaseMatrix.hasSizeOf`

##### indexOf()

> **indexOf**(`searchElement`, `fromIndex`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`searchElement`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`fromIndex`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

the index to start the search at

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

the index of the first occurance of `searchElement`

###### Inherited from

`BaseMatrix.indexOf`

##### indexOfDim()

> **indexOfDim**(`__namedParameters`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`MatrixDim`](#matrixdim-2)

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`searchElement`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`fromIndex`

</td>
<td>

`number`

</td>
<td>

the index to start the search at

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

the index of the first occurance of `searchElement`, searching
backwards

###### Inherited from

`BaseMatrix.lastIndexOf`

##### map()

> **map**(`callback`, `inPlace`): [`Matrix`](#matrix)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`number`>

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

performes the map in place if `true`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`BaseMatrix`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`probs`

</td>
<td>

`number` | `number`\[]

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

(`prev`, `curr`, `index`) => `number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`init`

</td>
<td>

`number`

</td>
<td>

`0.0`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`BaseMatrix.reduce`

##### rowOfIndex()

> **rowOfIndex**(`index`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`start?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`end?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

the a copy of the internal array of elements (stored column major)

###### Inherited from

`BaseMatrix.slice`

##### some()

> **some**(`callback`): `boolean`

Tests if any element pass the test implemented by the callback fn

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`boolean`>

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`normalize`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`index1`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`index2`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

`"Expected Matrix"`

</td>
<td>

message to pass

</td>
</tr>
</tbody>
</table>

###### Returns

`asserts obj is Matrix`

###### Throws

TypeError if `obj` is not Matrix

##### cbind()

> `static` **cbind**(...`matrices`): [`Matrix`](#matrix)

Bind multiple matrices together by columns

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

...`matrices`

</td>
<td>

`BaseMatrix`\[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`Matrix`](#matrix)

###### Throws

`RangeError` if the number of rows of any matrix doesn't match

##### create()

> `static` **create**(`fill`, `dim`): [`Matrix`](#matrix)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`fill`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`dim`

</td>
<td>

[`MatrixDim`](#matrixdim-2)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Matrix`](#matrix)

a new Matrix of size `dim` filled with `fill`

##### isMatrix()

> `static` **isMatrix**(`mat`): `mat is Matrix`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`mat is Matrix`

`true` if `mat` is a Matrix

##### mmult()

> `static` **mmult**(`mat1`, `mat2`): [`Matrix`](#matrix)

Performs matrix multiplication this \* mat

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat1`

</td>
<td>

`BaseMatrix`

</td>
</tr>
<tr>
<td>

`mat2`

</td>
<td>

`BaseMatrix`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Matrix`](#matrix)

##### rbind()

> `static` **rbind**(...`matrices`): [`Matrix`](#matrix)

Bind multiple matrices together by rows

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

...`matrices`

</td>
<td>

`BaseMatrix`\[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`Matrix`](#matrix)

###### Throws

`RangeError` if the number of columns of any matrix doesn't match

#### Basic operators

##### add()

> **add**(`mat`, `inPlace`): `this`

Matrix addition.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`number` | `BaseMatrix`

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

If `true`, performes the operation in place.

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

`BaseMatrix.add`

##### divide()

> **divide**(`mat`, `inPlace`): `this`

Element wise division.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`number` | `BaseMatrix`

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

If `true`, performes the operation in place.

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

`BaseMatrix.divide`

##### mod()

> **mod**(`mat`, `inPlace`): `this`

Element wise remainder (%) `x % y`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`number` | `BaseMatrix`

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

If `true`, performes the operation in place.

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

`BaseMatrix.mod`

##### multiply()

> **multiply**(`mat`, `inPlace`): `this`

Element wise multiplication.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`number` | `BaseMatrix`

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

If `true`, performes the operation in place.

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

`BaseMatrix.multiply`

##### subtract()

> **subtract**(`mat`, `inPlace`): `this`

Matrix subtraction.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`number` | `BaseMatrix`

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

If `true`, performes the operation in place.

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`normalize`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-9`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Matrix`](#matrix)

the inverse of the matrix

##### reducedRowEchelon()

> **reducedRowEchelon**(`eps`, `inPlace`): [`Matrix`](#matrix)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-9`

</td>
</tr>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

a row index

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

a row index

</td>
</tr>
<tr>
<td>

`squared`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

if `false`, calculates the euclidean distance, otherwise
calculates the euclidean squared distance

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

the distance between rows `a` and `b`

##### standardizeByCol()

> **standardizeByCol**(`normalize`): [`Matrix`](#matrix)

Standardizes or normalizes the matrix by column

- if `normalize` is `true`: normalizes the values in a column by `(x-min)/(max-min)`
- otherwise: standardizes the values in a column by `(x - mu)/sigma`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`normalize`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`arr`

</td>
<td>

`number`\[] | [`Vector`](#vector)

</td>
<td>

`undefined`

</td>
<td>

the values used to form the Vector in column-order

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

if `true`, uses the internal arrays of `arr` as a reference

</td>
</tr>
</tbody>
</table>

###### Returns

[`Vector`](#vector)

###### Overrides

`BaseMatrix.constructor`

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
<td>

if `index < 0`, `index + .length` is accessed.

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`dim`

</td>
<td>

[`MatrixDim`](#matrixdim-2)

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### See

[BaseMatrix.at](#at)

###### Inherited from

`BaseMatrix.atDim`

##### baseMap()

> `protected` **baseMap**(`callback`): `number`\[]

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`number`>

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Inherited from

`BaseMatrix.baseMap`

##### baseMapInPlace()

> `protected` **baseMapInPlace**(`callback`): `this`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`number`>

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`vec`

</td>
<td>

[`Vector`](#vector)

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MatrixDim`](#matrixdim-2)

an array `[row, column]`

###### Inherited from

`BaseMatrix.dimOfIndex`

##### ed()

> **ed**(`index`, `value`): `number`

Changes the element at matrix `index` to `value`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
<td>

if `index < 0`, `index + .length` is accessed.

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`dim`

</td>
<td>

[`MatrixDim`](#matrixdim-2)

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### See

[BaseMatrix.ed](#ed)

###### Inherited from

`BaseMatrix.edDim`

##### equals()

> **equals**(`mat`): `boolean`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`BaseMatrix`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

`true` if `this` is equal to `mat`

###### Inherited from

`BaseMatrix.equals`

##### equalsApprox()

> **equalsApprox**(`mat`, `eps`): `boolean`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`BaseMatrix`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-9`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

`true` if `this` is approximately equal to `mat`

###### Inherited from

`BaseMatrix.equalsApprox`

##### every()

> **every**(`callback`): `boolean`

Tests if all elements pass the test implemented by the callback fn

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`boolean`>

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

`BaseMatrix.every`

##### filter()

> **filter**(`callback`): [`Vector`](#vector)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`boolean`>

</td>
<td>

a function returning true for elements to be kept

</td>
</tr>
</tbody>
</table>

###### Returns

[`Vector`](#vector)

a filtered vector according to the provided callbackFn

##### findIndex()

> **findIndex**(`callback`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`boolean`>

</td>
<td>

a function used to test elements in the array

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

the index of the first element passing the test in `callback`

###### Inherited from

`BaseMatrix.findIndex`

##### fn()

> **fn**(`index`, `callback`): `number`

Changes the element at matrix `index` through a callback function.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`number`>

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`dim`

</td>
<td>

[`MatrixDim`](#matrixdim-2)

</td>
</tr>
<tr>
<td>

`callback`

</td>
<td>

`MatrixCallbackDim`<`number`>

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`void`>

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`BaseMatrix`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

`true` if the dimensions matches `mat`

###### Inherited from

`BaseMatrix.hasSizeOf`

##### histogram()

> **histogram**(`bins`, `range`): { `bins`: `number`\[]; `range`: \[`number`, `number`]; `width`: `number`; }

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`bins`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`range`

</td>
<td>

\[`number`, `number`]

</td>
</tr>
</tbody>
</table>

###### Returns

{ `bins`: `number`\[]; `range`: \[`number`, `number`]; `width`: `number`; }

the values needed in order to construct a histogram

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`bins`

</td>
<td>

`number`\[]

</td>
</tr>
<tr>
<td>

`range`

</td>
<td>

\[`number`, `number`]

</td>
</tr>
<tr>
<td>

`width`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Throws

`RangeError` if the provided range is not finite, or in the incorrect order.

##### indexOf()

> **indexOf**(`searchElement`, `fromIndex`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`searchElement`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`fromIndex`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

the index to start the search at

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

the index of the first occurance of `searchElement`

###### Inherited from

`BaseMatrix.indexOf`

##### indexOfDim()

> **indexOfDim**(`__namedParameters`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`MatrixDim`](#matrixdim-2)

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`searchElement`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`fromIndex`

</td>
<td>

`number`

</td>
<td>

the index to start the search at

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

the index of the first occurance of `searchElement`, searching
backwards

###### Inherited from

`BaseMatrix.lastIndexOf`

##### map()

> **map**(`callback`, `inPlace`): [`Vector`](#vector)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`number`>

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

performes the map in place if `true`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`probs`

</td>
<td>

`number` | `number`\[]

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

(`prev`, `curr`, `index`) => `number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`init`

</td>
<td>

`number`

</td>
<td>

`0.0`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`BaseMatrix.reduce`

##### rowOfIndex()

> **rowOfIndex**(`index`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`start?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`end?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

the a copy of the internal array of elements (stored column major)

###### Inherited from

`BaseMatrix.slice`

##### some()

> **some**(`callback`): `boolean`

Tests if any element pass the test implemented by the callback fn

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallback`](#matrixcallback)<`boolean`>

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallbackCompare`](#matrixcallbackcompare)

</td>
<td>

a function that defines the sort order, being provided
the elements

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`MatrixCallbackCompare`](#matrixcallbackcompare)

</td>
<td>

a function that defines the sort order, being provided
the elements

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

the indices that sorts the vector

##### standardize()

> **standardize**(`normalize`, `inPlace`): `this`

Standardizes or normalizes the matrix

- if `normalize` is `true`: normalizes the values by `(x-min)/(max-min)`
- otherwise: standardizes the values by `(x - mu)/sigma`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`normalize`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`index1`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`index2`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

`"Expected Vector"`

</td>
<td>

message to pass

</td>
</tr>
</tbody>
</table>

###### Returns

`asserts obj is Vector`

###### Throws

TypeError if `obj` is not Vector

##### borrow()

> `static` **borrow**(`vec`): `number`\[]

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`vec`

</td>
<td>

`number`\[] | [`Vector`](#vector)

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

##### create()

> `static` **create**(`fill`, `length`): [`Vector`](#vector)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`fill`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`length`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Vector`](#vector)

a new Vector of size `length` filled with `fill`

##### isVector()

> `static` **isVector**(`mat`): `mat is Vector`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`mat is Vector`

`true` if `mat` is a Vector

#### Basic operators

##### add()

> **add**(`mat`, `inPlace`): `this`

Matrix addition.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`number` | `BaseMatrix`

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

If `true`, performes the operation in place.

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

`BaseMatrix.add`

##### divide()

> **divide**(`mat`, `inPlace`): `this`

Element wise division.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`number` | `BaseMatrix`

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

If `true`, performes the operation in place.

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

`BaseMatrix.divide`

##### mod()

> **mod**(`mat`, `inPlace`): `this`

Element wise remainder (%) `x % y`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`number` | `BaseMatrix`

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

If `true`, performes the operation in place.

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

`BaseMatrix.mod`

##### multiply()

> **multiply**(`mat`, `inPlace`): `this`

Element wise multiplication.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`number` | `BaseMatrix`

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

If `true`, performes the operation in place.

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

`BaseMatrix.multiply`

##### subtract()

> **subtract**(`mat`, `inPlace`): `this`

Matrix subtraction.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`number` | `BaseMatrix`

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

If `true`, performes the operation in place.

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Inherited from

`BaseMatrix.subtract`

#### Copy methods

##### sortRandom()

> **sortRandom**(`inPlace`, `rand`): [`Vector`](#vector)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

if `true`, the vector is sorted in place.

</td>
</tr>
<tr>
<td>

`rand`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

`...`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

[`Vector`](#vector)

the vector with a permutated order

#### Maps

##### intersect()

> **intersect**(`vec`): [`Vector`](#vector)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`vec`

</td>
<td>

[`Vector`](#vector)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Vector`](#vector)

the unique elements of the intersect

##### sortRandom()

> **sortRandom**(`inPlace`, `rand`): [`Vector`](#vector)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`inPlace`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

if `true`, the vector is sorted in place.

</td>
</tr>
<tr>
<td>

`rand`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

`...`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

[`Vector`](#vector)

the vector with a permutated order

##### union()

> **union**(`vec`): [`Vector`](#vector)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`vec`

</td>
<td>

`number`\[] | [`Vector`](#vector)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Vector`](#vector)

the unique elements of the union of `this` and `vec`

#### Statistics

##### covariance()

> **covariance**(`vec`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`vec`

</td>
<td>

[`Vector`](#vector)

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`element`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

#### Returns

`T`

---

### MatrixCallbackCompare()

> **MatrixCallbackCompare** = (`a`, `b`) => `number`

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

---

### MatrixDim

> **MatrixDim** = \[`number`, `number`]

## Functions

### diagonalMatrix()

> **diagonalMatrix**(`arr`): [`Matrix`](#matrix)

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`arr`

</td>
<td>

`number`\[]

</td>
<td>

the diagonal elements

</td>
</tr>
</tbody>
</table>

#### Returns

[`Matrix`](#matrix)

a new matrix with diagonal elements set to `arr`

---

### identityMatrix()

> **identityMatrix**(`nrow`): [`Matrix`](#matrix)

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`nrow`

</td>
<td>

`number`

</td>
<td>

the size of the matrix

</td>
</tr>
</tbody>
</table>

#### Returns

[`Matrix`](#matrix)

a (square) identity matrix.

---

### randomMatrix()

> **randomMatrix**(`dims`, `generator`): [`Matrix`](#matrix)

Generates a matrix of random numbers on \[0, 1).

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`dims`

</td>
<td>

[`MatrixDim`](#matrixdim-2)

</td>
<td>

the dimensions of the random matrix

</td>
</tr>
<tr>
<td>

`generator`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

an RNG.

</td>
</tr>
</tbody>
</table>

#### Returns

[`Matrix`](#matrix)

---

### randomVector()

> **randomVector**(`length`, `rand`): [`Vector`](#vector)

Generates a vector-like of random numbers on \[0, 1).

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`length`

</td>
<td>

`number`

</td>
<td>

the length of the vector

</td>
</tr>
<tr>
<td>

`rand`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

an RNG

</td>
</tr>
</tbody>
</table>

#### Returns

[`Vector`](#vector)

a vector-like of random numbers on \[0, 1).

---

### sequence()

> **sequence**(`from`, `to`, `by`): [`Vector`](#vector)

Generates a vector-like of a sequence of numbers.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`from`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The starting number in the sequence.

</td>
</tr>
<tr>
<td>

`to`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

A number for which the sequence will not generate beyond.

</td>
</tr>
<tr>
<td>

`by`

</td>
<td>

`number`

</td>
<td>

`1.0`

</td>
<td>

The incrementing (or decrementing) size of the sequence. Must be positive.

</td>
</tr>
</tbody>
</table>

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
