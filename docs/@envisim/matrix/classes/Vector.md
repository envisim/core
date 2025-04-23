[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/matrix](../README.md) / Vector

# Class: Vector

## theme_extends

- `BaseMatrix`

## Constructors

### Constructor

> **new Vector**(`arr`, `shallow`): `Vector`

#### Parameters

| Parameter | theme_type             | theme_default_value | theme_description                                           |
| --------- | ---------------------- | ------------------- | ----------------------------------------------------------- |
| `arr`     | `number`[] \| `Vector` | `undefined`         | the values used to form the Vector in column-order          |
| `shallow` | `boolean`              | `false`             | if `true`, uses the internal arrays of `arr` as a reference |

#### Returns

`Vector`

#### Overrides

`BaseMatrix.constructor`

## Properties

| Property                         | theme_modifier | theme_type | theme_description                  |
| -------------------------------- | -------------- | ---------- | ---------------------------------- |
| <a id="cols"></a> `cols`         | `protected`    | `number`   | **`Internal`**                     |
| <a id="internal"></a> `internal` | `protected`    | `number`[] | **`Internal`** stored column major |
| <a id="len"></a> `len`           | `protected`    | `number`   | **`Internal`**                     |
| <a id="rows"></a> `rows`         | `protected`    | `number`   | **`Internal`**                     |

## Accessors

### length

#### Get Signature

> **get** **length**(): `number`

##### Returns

`number`

the number of elements

#### Inherited from

`BaseMatrix.length`

---

### ncol

#### Get Signature

> **get** **ncol**(): `number`

##### Returns

`number`

the number of columns

#### Inherited from

`BaseMatrix.ncol`

---

### nrow

#### Get Signature

> **get** **nrow**(): `number`

##### Returns

`number`

the number of rows

#### Inherited from

`BaseMatrix.nrow`

## Methods

### at()

> **at**(`index`): `number`

#### Parameters

| Parameter | theme_type | theme_description                              |
| --------- | ---------- | ---------------------------------------------- |
| `index`   | `number`   | if `index < 0`, `index + .length` is accessed. |

#### Returns

`number`

the element at matrix `index`

#### Throws

`RangeError` if `index` is not in range

#### Inherited from

`BaseMatrix.at`

---

### atDim()

> **atDim**(`dim`): `number`

#### Parameters

| Parameter | theme_type                                  |
| --------- | ------------------------------------------- |
| `dim`     | [`MatrixDim`](../type-aliases/MatrixDim.md) |

#### Returns

`number`

#### See

[BaseMatrix.at](Matrix.md#at)

#### Inherited from

`BaseMatrix.atDim`

---

### baseMap()

> `protected` **baseMap**(`callback`): `number`[]

#### Parameters

| Parameter  | theme_type                                                        |
| ---------- | ----------------------------------------------------------------- |
| `callback` | [`MatrixCallback`](../type-aliases/MatrixCallback.md)\<`number`\> |

#### Returns

`number`[]

#### Inherited from

`BaseMatrix.baseMap`

---

### baseMapInPlace()

> `protected` **baseMapInPlace**(`callback`): `this`

#### Parameters

| Parameter  | theme_type                                                        |
| ---------- | ----------------------------------------------------------------- |
| `callback` | [`MatrixCallback`](../type-aliases/MatrixCallback.md)\<`number`\> |

#### Returns

`this`

#### Inherited from

`BaseMatrix.baseMapInPlace`

---

### clone()

> **clone**(): `Vector`

#### Returns

`Vector`

#### Overrides

`BaseMatrix.clone`

---

### colOfIndex()

> **colOfIndex**(`index`): `number`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `index`   | `number`   |

#### Returns

`number`

the column index of the matrix `index`

#### Throws

`RangeError` if `index` is not in range

#### Inherited from

`BaseMatrix.colOfIndex`

---

### correlation()

> **correlation**(`vec`): `number`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `vec`     | `Vector`   |

#### Returns

`number`

the correlation between `this` and `vec`

#### Throws

`RangeError` if the vectors have different sizes

---

### dim()

> **dim**(): [`MatrixDim`](../type-aliases/MatrixDim.md)

#### Returns

[`MatrixDim`](../type-aliases/MatrixDim.md)

`[this.nrow, this.ncol]`

#### Inherited from

`BaseMatrix.dim`

---

### dimOfIndex()

> **dimOfIndex**(`index`): [`MatrixDim`](../type-aliases/MatrixDim.md)

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `index`   | `number`   |

#### Returns

[`MatrixDim`](../type-aliases/MatrixDim.md)

an array `[row, column]`

#### Inherited from

`BaseMatrix.dimOfIndex`

---

### ed()

> **ed**(`index`, `value`): `number`

Changes the element at matrix `index` to `value`

#### Parameters

| Parameter | theme_type | theme_description                              |
| --------- | ---------- | ---------------------------------------------- |
| `index`   | `number`   | if `index < 0`, `index + .length` is accessed. |
| `value`   | `number`   | -                                              |

#### Returns

`number`

`value`

#### Throws

`RangeError` if `index` is not in range

#### Inherited from

`BaseMatrix.ed`

---

### edDim()

> **edDim**(`dim`, `value`): `number`

#### Parameters

| Parameter | theme_type                                  |
| --------- | ------------------------------------------- |
| `dim`     | [`MatrixDim`](../type-aliases/MatrixDim.md) |
| `value`   | `number`                                    |

#### Returns

`number`

#### See

[BaseMatrix.ed](Matrix.md#ed)

#### Inherited from

`BaseMatrix.edDim`

---

### equals()

> **equals**(`mat`): `boolean`

#### Parameters

| Parameter | theme_type   |
| --------- | ------------ |
| `mat`     | `BaseMatrix` |

#### Returns

`boolean`

`true` if `this` is equal to `mat`

#### Inherited from

`BaseMatrix.equals`

---

### equalsApprox()

> **equalsApprox**(`mat`, `eps`): `boolean`

#### Parameters

| Parameter | theme_type   | theme_default_value |
| --------- | ------------ | ------------------- |
| `mat`     | `BaseMatrix` | `undefined`         |
| `eps`     | `number`     | `1e-9`              |

#### Returns

`boolean`

`true` if `this` is approximately equal to `mat`

#### Inherited from

`BaseMatrix.equalsApprox`

---

### every()

> **every**(`callback`): `boolean`

Tests if all elements pass the test implemented by the callback fn

#### Parameters

| Parameter  | theme_type                                                         |
| ---------- | ------------------------------------------------------------------ |
| `callback` | [`MatrixCallback`](../type-aliases/MatrixCallback.md)\<`boolean`\> |

#### Returns

`boolean`

#### Inherited from

`BaseMatrix.every`

---

### filter()

> **filter**(`callback`): `Vector`

#### Parameters

| Parameter  | theme_type                                                         | theme_description                                 |
| ---------- | ------------------------------------------------------------------ | ------------------------------------------------- |
| `callback` | [`MatrixCallback`](../type-aliases/MatrixCallback.md)\<`boolean`\> | a function returning true for elements to be kept |

#### Returns

`Vector`

a filtered vector according to the provided callbackFn

---

### findIndex()

> **findIndex**(`callback`): `number`

#### Parameters

| Parameter  | theme_type                                                         | theme_description                             |
| ---------- | ------------------------------------------------------------------ | --------------------------------------------- |
| `callback` | [`MatrixCallback`](../type-aliases/MatrixCallback.md)\<`boolean`\> | a function used to test elements in the array |

#### Returns

`number`

the index of the first element passing the test in `callback`

#### Inherited from

`BaseMatrix.findIndex`

---

### fn()

> **fn**(`index`, `callback`): `number`

Changes the element at matrix `index` through a callback function.

#### Parameters

| Parameter  | theme_type                                                        |
| ---------- | ----------------------------------------------------------------- |
| `index`    | `number`                                                          |
| `callback` | [`MatrixCallback`](../type-aliases/MatrixCallback.md)\<`number`\> |

#### Returns

`number`

the result of `callback`

#### Example

```ts
const mat = new Matrix(0, 2, 2);
// [ 0, 0,
//   0, 0 ]
mat.edRC(3, (el, in) => el + in);
// [ 0, 0,
//   0, 3 ]
```

#### Throws

`RangeError` if `index` is not in range

#### Inherited from

`BaseMatrix.fn`

---

### fnDim()

> **fnDim**(`dim`, `callback`): `number`

#### Parameters

| Parameter  | theme_type                                  |
| ---------- | ------------------------------------------- |
| `dim`      | [`MatrixDim`](../type-aliases/MatrixDim.md) |
| `callback` | `MatrixCallbackDim`\<`number`\>             |

#### Returns

`number`

#### See

[BaseMatrix.fn](Matrix.md#fn)

#### Inherited from

`BaseMatrix.fnDim`

---

### forEach()

> **forEach**(`callback`): `void`

Executes the provided function once for each element

#### Parameters

| Parameter  | theme_type                                                      |
| ---------- | --------------------------------------------------------------- |
| `callback` | [`MatrixCallback`](../type-aliases/MatrixCallback.md)\<`void`\> |

#### Returns

`void`

#### Inherited from

`BaseMatrix.forEach`

---

### geometricMean()

> **geometricMean**(): `number`

Geometric mean of all elements

#### Returns

`number`

#### Inherited from

`BaseMatrix.geometricMean`

---

### hasSizeOf()

> **hasSizeOf**(`mat`): `boolean`

#### Parameters

| Parameter | theme_type   |
| --------- | ------------ |
| `mat`     | `BaseMatrix` |

#### Returns

`boolean`

`true` if the dimensions matches `mat`

#### Inherited from

`BaseMatrix.hasSizeOf`

---

### histogram()

> **histogram**(`bins`, `range`): `object`

#### Parameters

| Parameter | theme_type             |
| --------- | ---------------------- |
| `bins`    | `number`               |
| `range`   | \[`number`, `number`\] |

#### Returns

`object`

the values needed in order to construct a histogram

| theme_name | theme_type             |
| ---------- | ---------------------- |
| `bins`     | `number`[]             |
| `range`    | \[`number`, `number`\] |
| `width`    | `number`               |

#### Throws

`RangeError` if the provided range is not finite, or in the incorrect order.

---

### indexOf()

> **indexOf**(`searchElement`, `fromIndex`): `number`

#### Parameters

| Parameter       | theme_type | theme_default_value | theme_description                |
| --------------- | ---------- | ------------------- | -------------------------------- |
| `searchElement` | `number`   | `undefined`         | -                                |
| `fromIndex`     | `number`   | `0`                 | the index to start the search at |

#### Returns

`number`

the index of the first occurance of `searchElement`

#### Inherited from

`BaseMatrix.indexOf`

---

### indexOfDim()

> **indexOfDim**(`__namedParameters`): `number`

#### Parameters

| Parameter           | theme_type                                  |
| ------------------- | ------------------------------------------- |
| `__namedParameters` | [`MatrixDim`](../type-aliases/MatrixDim.md) |

#### Returns

`number`

the matrix index at `row`, `column`

#### Throws

`RangeError` if `row` or `column` is not in range

#### Inherited from

`BaseMatrix.indexOfDim`

---

### isSquare()

> **isSquare**(): `boolean`

#### Returns

`boolean`

`true` if the matrix is a square

#### Inherited from

`BaseMatrix.isSquare`

---

### lastIndexOf()

> **lastIndexOf**(`searchElement`, `fromIndex`): `number`

#### Parameters

| Parameter       | theme_type | theme_description                |
| --------------- | ---------- | -------------------------------- |
| `searchElement` | `number`   | -                                |
| `fromIndex`     | `number`   | the index to start the search at |

#### Returns

`number`

the index of the first occurance of `searchElement`, searching
backwards

#### Inherited from

`BaseMatrix.lastIndexOf`

---

### map()

> **map**(`callback`, `inPlace`): `Vector`

#### Parameters

| Parameter  | theme_type                                                        | theme_default_value | theme_description                    |
| ---------- | ----------------------------------------------------------------- | ------------------- | ------------------------------------ |
| `callback` | [`MatrixCallback`](../type-aliases/MatrixCallback.md)\<`number`\> | `undefined`         | -                                    |
| `inPlace`  | `boolean`                                                         | `false`             | performes the map in place if `true` |

#### Returns

`Vector`

a copy, where each element has been mapped by the callback fn.

#### Overrides

`BaseMatrix.map`

---

### max()

> **max**(): `number`

Maximum value of all elements

#### Returns

`number`

#### Inherited from

`BaseMatrix.max`

---

### mean()

> **mean**(): `number`

Mean of all elements

#### Returns

`number`

#### Inherited from

`BaseMatrix.mean`

---

### median()

> **median**(): `number`

Median of all elements

#### Returns

`number`

#### Inherited from

`BaseMatrix.median`

---

### min()

> **min**(): `number`

Minimum value of all elements

#### Returns

`number`

#### Inherited from

`BaseMatrix.min`

---

### mode()

> **mode**(): `number`[]

Most common value

#### Returns

`number`[]

#### Inherited from

`BaseMatrix.mode`

---

### prodSum()

> **prodSum**(): `number`

Product sum of all elements

#### Returns

`number`

#### Inherited from

`BaseMatrix.prodSum`

---

### quantiles()

> **quantiles**(`probs`): `number`[]

#### Parameters

| Parameter | theme_type             |
| --------- | ---------------------- |
| `probs`   | `number` \| `number`[] |

#### Returns

`number`[]

#### Inherited from

`BaseMatrix.quantiles`

---

### range()

> **range**(): \[`number`, `number`\]

The range (min-max) of all elements

#### Returns

\[`number`, `number`\]

#### Inherited from

`BaseMatrix.range`

---

### reduce()

> **reduce**(`callback`, `init`): `number`

Executes a user-supplied "reducer" callback function on each element, in
order, passing in the return value from the calculation on the preceding
element. The final result of running the reducer across all elements is a
single value.

#### Parameters

| Parameter  | theme_type                            | theme_default_value |
| ---------- | ------------------------------------- | ------------------- |
| `callback` | (`prev`, `curr`, `index`) => `number` | `undefined`         |
| `init`     | `number`                              | `0.0`               |

#### Returns

`number`

#### Inherited from

`BaseMatrix.reduce`

---

### rowOfIndex()

> **rowOfIndex**(`index`): `number`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `index`   | `number`   |

#### Returns

`number`

the row index of the matrix `index`

#### Throws

`RangeError` if `index` is not in range

#### Inherited from

`BaseMatrix.rowOfIndex`

---

### sd()

> **sd**(): `number`

Standard deviation of all elements

#### Returns

`number`

#### Inherited from

`BaseMatrix.sd`

---

### skewness()

> **skewness**(): `number`

#### Returns

`number`

#### Inherited from

`BaseMatrix.skewness`

---

### slice()

> **slice**(`start?`, `end?`): `number`[]

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `start?`  | `number`   |
| `end?`    | `number`   |

#### Returns

`number`[]

the a copy of the internal array of elements (stored column major)

#### Inherited from

`BaseMatrix.slice`

---

### some()

> **some**(`callback`): `boolean`

Tests if any element pass the test implemented by the callback fn

#### Parameters

| Parameter  | theme_type                                                         |
| ---------- | ------------------------------------------------------------------ |
| `callback` | [`MatrixCallback`](../type-aliases/MatrixCallback.md)\<`boolean`\> |

#### Returns

`boolean`

#### Inherited from

`BaseMatrix.some`

---

### sort()

> **sort**(`callback`): `Vector`

Sorts the elements according to `compareFn`

`callback(a, b)` return value:

- `> 0`: sort `a` after `b`
- `< 0`: sort `a` before `b`
- `=== 0`: keep original order

#### Parameters

| Parameter  | theme_type                                                          | theme_description                                                   |
| ---------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `callback` | [`MatrixCallbackCompare`](../type-aliases/MatrixCallbackCompare.md) | a function that defines the sort order, being provided the elements |

#### Returns

`Vector`

a sorted vector

---

### sortIndex()

> **sortIndex**(`callback`): `number`[]

`callback(a, b)` return value:

- `> 0`: sort `a` after `b`
- `< 0`: sort `a` before `b`
- `=== 0`: keep original order

#### Parameters

| Parameter  | theme_type                                                          | theme_description                                                   |
| ---------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `callback` | [`MatrixCallbackCompare`](../type-aliases/MatrixCallbackCompare.md) | a function that defines the sort order, being provided the elements |

#### Returns

`number`[]

the indices that sorts the vector

---

### standardize()

> **standardize**(`normalize`, `inPlace`): `this`

Standardizes or normalizes the matrix

- if `normalize` is `true`: normalizes the values by `(x-min)/(max-min)`
- otherwise: standardizes the values by `(x - mu)/sigma`

#### Parameters

| Parameter   | theme_type | theme_default_value |
| ----------- | ---------- | ------------------- |
| `normalize` | `boolean`  | `false`             |
| `inPlace`   | `boolean`  | `false`             |

#### Returns

`this`

#### Inherited from

`BaseMatrix.standardize`

---

### sum()

> **sum**(): `number`

Sum of all elements

#### Returns

`number`

#### Inherited from

`BaseMatrix.sum`

---

### swap()

> **swap**(`index1`, `index2`): `void`

Swaps the elements at the provided indexes

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `index1`  | `number`   |
| `index2`  | `number`   |

#### Returns

`void`

#### Throws

`RangeError` if `index` is not in range

#### Inherited from

`BaseMatrix.swap`

---

### unique()

> **unique**(): `Vector`

#### Returns

`Vector`

the unique elements

---

### variance()

> **variance**(): `number`

Variance of all elements

#### Returns

`number`

#### Inherited from

`BaseMatrix.variance`

---

### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is Vector`

#### Parameters

| Parameter | theme_type | theme_default_value | theme_description |
| --------- | ---------- | ------------------- | ----------------- |
| `obj`     | `unknown`  | `undefined`         | -                 |
| `msg`     | `string`   | `"Expected Vector"` | message to pass   |

#### Returns

`asserts obj is Vector`

#### Throws

TypeError if `obj` is not Vector

---

### borrow()

> `static` **borrow**(`vec`): `number`[]

#### Parameters

| Parameter | theme_type             |
| --------- | ---------------------- |
| `vec`     | `number`[] \| `Vector` |

#### Returns

`number`[]

---

### create()

> `static` **create**(`fill`, `length`): `Vector`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `fill`    | `number`   |
| `length`  | `number`   |

#### Returns

`Vector`

a new Vector of size `length` filled with `fill`

---

### isVector()

> `static` **isVector**(`mat`): `mat is Vector`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `mat`     | `unknown`  |

#### Returns

`mat is Vector`

`true` if `mat` is a Vector

## Basic operators

### add()

> **add**(`mat`, `inPlace`): `this`

Matrix addition.

#### Parameters

| Parameter | theme_type               | theme_default_value | theme_description                            |
| --------- | ------------------------ | ------------------- | -------------------------------------------- |
| `mat`     | `number` \| `BaseMatrix` | `undefined`         | -                                            |
| `inPlace` | `boolean`                | `false`             | If `true`, performes the operation in place. |

#### Returns

`this`

#### Inherited from

`BaseMatrix.add`

---

### divide()

> **divide**(`mat`, `inPlace`): `this`

Element wise division.

#### Parameters

| Parameter | theme_type               | theme_default_value | theme_description                            |
| --------- | ------------------------ | ------------------- | -------------------------------------------- |
| `mat`     | `number` \| `BaseMatrix` | `undefined`         | -                                            |
| `inPlace` | `boolean`                | `false`             | If `true`, performes the operation in place. |

#### Returns

`this`

#### Inherited from

`BaseMatrix.divide`

---

### mod()

> **mod**(`mat`, `inPlace`): `this`

Element wise remainder (%) `x % y`

#### Parameters

| Parameter | theme_type               | theme_default_value | theme_description                            |
| --------- | ------------------------ | ------------------- | -------------------------------------------- |
| `mat`     | `number` \| `BaseMatrix` | `undefined`         | -                                            |
| `inPlace` | `boolean`                | `false`             | If `true`, performes the operation in place. |

#### Returns

`this`

#### Inherited from

`BaseMatrix.mod`

---

### multiply()

> **multiply**(`mat`, `inPlace`): `this`

Element wise multiplication.

#### Parameters

| Parameter | theme_type               | theme_default_value | theme_description                            |
| --------- | ------------------------ | ------------------- | -------------------------------------------- |
| `mat`     | `number` \| `BaseMatrix` | `undefined`         | -                                            |
| `inPlace` | `boolean`                | `false`             | If `true`, performes the operation in place. |

#### Returns

`this`

#### Inherited from

`BaseMatrix.multiply`

---

### subtract()

> **subtract**(`mat`, `inPlace`): `this`

Matrix subtraction.

#### Parameters

| Parameter | theme_type               | theme_default_value | theme_description                            |
| --------- | ------------------------ | ------------------- | -------------------------------------------- |
| `mat`     | `number` \| `BaseMatrix` | `undefined`         | -                                            |
| `inPlace` | `boolean`                | `false`             | If `true`, performes the operation in place. |

#### Returns

`this`

#### Inherited from

`BaseMatrix.subtract`

## Copy methods

### sortRandom()

> **sortRandom**(`inPlace`, `rand`): `Vector`

#### Parameters

| Parameter | theme_type        | theme_default_value | theme_description                         |
| --------- | ----------------- | ------------------- | ----------------------------------------- |
| `inPlace` | `boolean`         | `false`             | if `true`, the vector is sorted in place. |
| `rand`    | `RandomGenerator` | `...`               | -                                         |

#### Returns

`Vector`

the vector with a permutated order

## Maps

### intersect()

> **intersect**(`vec`): `Vector`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `vec`     | `Vector`   |

#### Returns

`Vector`

the unique elements of the intersect

---

### sortRandom()

> **sortRandom**(`inPlace`, `rand`): `Vector`

#### Parameters

| Parameter | theme_type        | theme_default_value | theme_description                         |
| --------- | ----------------- | ------------------- | ----------------------------------------- |
| `inPlace` | `boolean`         | `false`             | if `true`, the vector is sorted in place. |
| `rand`    | `RandomGenerator` | `...`               | -                                         |

#### Returns

`Vector`

the vector with a permutated order

---

### union()

> **union**(`vec`): `Vector`

#### Parameters

| Parameter | theme_type             |
| --------- | ---------------------- |
| `vec`     | `number`[] \| `Vector` |

#### Returns

`Vector`

the unique elements of the union of `this` and `vec`

## Statistics

### covariance()

> **covariance**(`vec`): `number`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `vec`     | `Vector`   |

#### Returns

`number`

the covariance of `this` and `vec`

#### Throws

`RangeError` if the vectors has different sizes

---

### cumulativeSum()

> **cumulativeSum**(): `Vector`

#### Returns

`Vector`

the cumulative sums of the vector elements
