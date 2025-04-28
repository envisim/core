[**Documentation**](../README.md)

---

[Documentation](../README.md) / @envisim/sampling

# @envisim/sampling

## Contents

- [Classes](#classes)
  - [NearestNeighbour](#nearestneighbour)
- [Interfaces](#interfaces)
  - [CubeOptions](#cubeoptions)
  - [InclusionProbabilitiesOptions](#inclusionprobabilitiesoptions)
  - [LocalCubeOptions](#localcubeoptions)
  - [ScpsCoordinatedOptions](#scpscoordinatedoptions)
  - [SrsOptions](#srsoptions)
- [Functions](#functions)
  - [brewer()](#brewer)
  - [conditionalPoissonSampling()](#conditionalpoissonsampling)
  - [cube()](#cube)
  - [inclusionProbabilities()](#inclusionprobabilities)
  - [lcps()](#lcps)
  - [localCube()](#localcube)
  - [lpm1()](#lpm1)
  - [lpm2()](#lpm2)
  - [pareto()](#pareto)
  - [poissonSampling()](#poissonsampling)
  - [ppswr()](#ppswr)
  - [randomSystematic()](#randomsystematic)
  - [rpm()](#rpm)
  - [sampford()](#sampford)
  - [scps()](#scps)
  - [scpsCoordinated()](#scpscoordinated)
  - [spm()](#spm)
  - [srswor()](#srswor)
  - [srswr()](#srswr)
  - [systematic()](#systematic)

## Classes

### NearestNeighbour

#### Constructors

##### Constructor

> **new NearestNeighbour**(`dt`, `bucketSize`): [`NearestNeighbour`](#nearestneighbour)

Constructs a nearest neighbour searcher, using k-d-trees

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

`dt`

</td>
<td>

[`Matrix`](matrix.md#matrix)

</td>
<td>

`undefined`

</td>
<td>

the data to search within.

</td>
</tr>
<tr>
<td>

`bucketSize`

</td>
<td>

`number`

</td>
<td>

`40`

</td>
<td>

the bucket size of the k-d-tree's nodes.

</td>
</tr>
</tbody>
</table>

###### Returns

[`NearestNeighbour`](#nearestneighbour)

a nearest neighbour searcher.

#### Methods

##### findNearestDistance()

> **findNearestDistance**(`unit`): `number`

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

`unit`

</td>
<td>

`number` | `number`\[]

</td>
<td>

if a number $i$, the unit is assumed to be the $i$th row
in the provided data.

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

the distance to the nearest neighbour(s) of the unit in the
provided data.

##### findNearestNeighbours()

> **findNearestNeighbours**(`unit`): `number`\[]

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

`unit`

</td>
<td>

`number` | `number`\[]

</td>
<td>

if a number $i$, the unit is assumed to be the $i$th row
in the provided data.

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

the nearest neighbour(s) of the unit in the provided data.

## Interfaces

### CubeOptions

#### Extends

- `PipsOptions`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="balancing"></a> `balancing`

</td>
<td>

[`Matrix`](matrix.md#matrix)

</td>
<td>

`undefined`

</td>
<td>

Matrix of balancing auxiliary variables

</td>
</tr>
<tr>
<td>

<a id="eps"></a> `eps?`

</td>
<td>

`number`

</td>
<td>

`1e-9`

</td>
<td>

Epsilon, used during comparisons of floats

</td>
</tr>
<tr>
<td>

<a id="probabilities"></a> `probabilities`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

`undefined`

</td>
<td>

Inclusion probabilities of size N

</td>
</tr>
<tr>
<td>

<a id="rand"></a> `rand?`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

`new Random()`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="treebucketsize"></a> `treeBucketSize?`

</td>
<td>

`number`

</td>
<td>

`40`

</td>
<td>

The bucket size to use when building k-d-trees

</td>
</tr>
</tbody>
</table>

---

### InclusionProbabilitiesOptions

#### Extends

- `FixedSizedOptions`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="auxiliary"></a> `auxiliary`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

`undefined`

</td>
<td>

positive numbers (sizes)

</td>
</tr>
<tr>
<td>

<a id="eps-1"></a> `eps?`

</td>
<td>

`number`

</td>
<td>

`1e-9`

</td>
<td>

Epsilon, used during comparisons of floats

</td>
</tr>
<tr>
<td>

<a id="n"></a> `n`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

Sample size

</td>
</tr>
<tr>
<td>

<a id="rand-1"></a> `rand?`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

`new Random()`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="treebucketsize-1"></a> `treeBucketSize?`

</td>
<td>

`number`

</td>
<td>

`40`

</td>
<td>

The bucket size to use when building k-d-trees

</td>
</tr>
</tbody>
</table>

---

### LocalCubeOptions

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="auxiliaries"></a> `auxiliaries`

</td>
<td>

[`Matrix`](matrix.md#matrix)

</td>
<td>

`undefined`

</td>
<td>

Matrix of auxiliary variables

</td>
</tr>
<tr>
<td>

<a id="balancing-1"></a> `balancing`

</td>
<td>

[`Matrix`](matrix.md#matrix)

</td>
<td>

`undefined`

</td>
<td>

Matrix of balancing auxiliary variables

</td>
</tr>
<tr>
<td>

<a id="eps-2"></a> `eps?`

</td>
<td>

`number`

</td>
<td>

`1e-9`

</td>
<td>

Epsilon, used during comparisons of floats

</td>
</tr>
<tr>
<td>

<a id="probabilities-1"></a> `probabilities`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

`undefined`

</td>
<td>

Inclusion probabilities of size N

</td>
</tr>
<tr>
<td>

<a id="rand-2"></a> `rand?`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

`new Random()`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="treebucketsize-2"></a> `treeBucketSize?`

</td>
<td>

`number`

</td>
<td>

`40`

</td>
<td>

The bucket size to use when building k-d-trees

</td>
</tr>
</tbody>
</table>

---

### ScpsCoordinatedOptions

#### Extends

- `AuxiliaryOptions`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="auxiliaries-1"></a> `auxiliaries`

</td>
<td>

[`Matrix`](matrix.md#matrix)

</td>
<td>

`undefined`

</td>
<td>

Matrix of auxiliary variables

</td>
</tr>
<tr>
<td>

<a id="eps-3"></a> `eps?`

</td>
<td>

`number`

</td>
<td>

`1e-9`

</td>
<td>

Epsilon, used during comparisons of floats

</td>
</tr>
<tr>
<td>

<a id="probabilities-2"></a> `probabilities`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

`undefined`

</td>
<td>

Inclusion probabilities of size N

</td>
</tr>
<tr>
<td>

<a id="rand-3"></a> `rand?`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

`new Random()`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="random"></a> `random`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

`undefined`

</td>
<td>

Array of random values of size N

</td>
</tr>
<tr>
<td>

<a id="treebucketsize-3"></a> `treeBucketSize?`

</td>
<td>

`number`

</td>
<td>

`40`

</td>
<td>

The bucket size to use when building k-d-trees

</td>
</tr>
</tbody>
</table>

---

### SrsOptions

#### Extends

- `FixedSizedOptions`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="eps-4"></a> `eps?`

</td>
<td>

`number`

</td>
<td>

`1e-9`

</td>
<td>

Epsilon, used during comparisons of floats

</td>
</tr>
<tr>
<td>

<a id="n-1"></a> `n`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

Sample size

</td>
</tr>
<tr>
<td>

<a id="n-2"></a> `N`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

Population size

</td>
</tr>
<tr>
<td>

<a id="rand-4"></a> `rand?`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

`new Random()`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="treebucketsize-4"></a> `treeBucketSize?`

</td>
<td>

`number`

</td>
<td>

`40`

</td>
<td>

The bucket size to use when building k-d-trees

</td>
</tr>
</tbody>
</table>

## Functions

### brewer()

> **brewer**(`options`): `number`\[]

Selects a (pips) sample without replacement using Brewers method.

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

`options`

</td>
<td>

{ `eps`: `number`; `probabilities`: [`Vector`](matrix.md#vector) | `number`\[]; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; }

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`options.eps?`

</td>
<td>

`number`

</td>
<td>

Epsilon, used during comparisons of floats

</td>
</tr>
<tr>
<td>

`options.probabilities`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

Inclusion probabilities of size N

</td>
</tr>
<tr>
<td>

`options.rand?`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.treeBucketSize?`

</td>
<td>

`number`

</td>
<td>

The bucket size to use when building k-d-trees

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### conditionalPoissonSampling()

> **conditionalPoissonSampling**(`options`): `number`\[]

Selects a conditional Poisson sample using the rejective method.

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

`options`

</td>
<td>

{ `eps`: `number`; `n`: `number`; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; } & { `eps`: `number`; `probabilities`: [`Vector`](matrix.md#vector) | `number`\[]; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; }

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

#### Throws

`Error` if a solution is not found in `1e5` iterations

---

### cube()

> **cube**(`options`): `number`\[]

Selects a balanced (pips) sample using the cube method.

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

`options`

</td>
<td>

[`CubeOptions`](#cubeoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### inclusionProbabilities()

> **inclusionProbabilities**(`options`): `number`\[]

Calculation of inclusion probabilities from a positive auxiliary variable.

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

`options`

</td>
<td>

[`InclusionProbabilitiesOptions`](#inclusionprobabilitiesoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

Array of inclusion probabilities.

---

### lcps()

> **lcps**(`options`): `number`\[]

Selects a Locally Correlated Poisson Sample (LCPS)

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

`options`

</td>
<td>

{ `auxiliaries`: [`Matrix`](matrix.md#matrix); `eps`: `number`; `probabilities`: [`Vector`](matrix.md#vector) | `number`\[]; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; }

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`options.auxiliaries`

</td>
<td>

[`Matrix`](matrix.md#matrix)

</td>
<td>

Matrix of auxiliary variables

</td>
</tr>
<tr>
<td>

`options.eps?`

</td>
<td>

`number`

</td>
<td>

Epsilon, used during comparisons of floats

</td>
</tr>
<tr>
<td>

`options.probabilities`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

Inclusion probabilities of size N

</td>
</tr>
<tr>
<td>

`options.rand?`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.treeBucketSize?`

</td>
<td>

`number`

</td>
<td>

The bucket size to use when building k-d-trees

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### localCube()

> **localCube**(`options`): `number`\[]

Selects a doubly balanced sample using the local cube method.

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

`options`

</td>
<td>

[`LocalCubeOptions`](#localcubeoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### lpm1()

> **lpm1**(`options`): `number`\[]

Selects a (pips) sample using the local pivotal method 1.

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

`options`

</td>
<td>

{ `auxiliaries`: [`Matrix`](matrix.md#matrix); `eps`: `number`; `probabilities`: [`Vector`](matrix.md#vector) | `number`\[]; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; } | { `auxiliaries`: [`Matrix`](matrix.md#matrix); `eps`: `number`; `n`: `number`; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; }

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### lpm2()

> **lpm2**(`options`): `number`\[]

Selects a (pips) sample using the local pivotal method 2.

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

`options`

</td>
<td>

{ `auxiliaries`: [`Matrix`](matrix.md#matrix); `eps`: `number`; `probabilities`: [`Vector`](matrix.md#vector) | `number`\[]; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; } | { `auxiliaries`: [`Matrix`](matrix.md#matrix); `eps`: `number`; `n`: `number`; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; }

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### pareto()

> **pareto**(`options`): `number`\[]

Selects a Pareto (pips) sample without replacement.

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

`options`

</td>
<td>

{ `eps`: `number`; `probabilities`: [`Vector`](matrix.md#vector) | `number`\[]; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; }

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`options.eps?`

</td>
<td>

`number`

</td>
<td>

Epsilon, used during comparisons of floats

</td>
</tr>
<tr>
<td>

`options.probabilities`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

Inclusion probabilities of size N

</td>
</tr>
<tr>
<td>

`options.rand?`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.treeBucketSize?`

</td>
<td>

`number`

</td>
<td>

The bucket size to use when building k-d-trees

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### poissonSampling()

> **poissonSampling**(`options`): `number`\[]

Selects a Poisson sample.

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

`options`

</td>
<td>

{ `eps`: `number`; `probabilities`: [`Vector`](matrix.md#vector) | `number`\[]; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; }

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`options.eps?`

</td>
<td>

`number`

</td>
<td>

Epsilon, used during comparisons of floats

</td>
</tr>
<tr>
<td>

`options.probabilities`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

Inclusion probabilities of size N

</td>
</tr>
<tr>
<td>

`options.rand?`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.treeBucketSize?`

</td>
<td>

`number`

</td>
<td>

The bucket size to use when building k-d-trees

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### ppswr()

> **ppswr**(`options`): `number`\[]

Selects a pps sample with replacement.

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

`options`

</td>
<td>

{ `eps`: `number`; `n`: `number`; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; } & { `eps`: `number`; `probabilities`: [`Vector`](matrix.md#vector) | `number`\[]; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; }

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### randomSystematic()

> **randomSystematic**(`options`): `number`\[]

Selects a systematic (pips) sample with initial randomization of order of the units.

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

`options`

</td>
<td>

{ `eps`: `number`; `probabilities`: [`Vector`](matrix.md#vector) | `number`\[]; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; }

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`options.eps?`

</td>
<td>

`number`

</td>
<td>

Epsilon, used during comparisons of floats

</td>
</tr>
<tr>
<td>

`options.probabilities`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

Inclusion probabilities of size N

</td>
</tr>
<tr>
<td>

`options.rand?`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.treeBucketSize?`

</td>
<td>

`number`

</td>
<td>

The bucket size to use when building k-d-trees

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### rpm()

> **rpm**(`options`): `number`\[]

Selects a (pips) sample using the random pivotal method.

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

`options`

</td>
<td>

{ `eps`: `number`; `probabilities`: [`Vector`](matrix.md#vector) | `number`\[]; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; }

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`options.eps?`

</td>
<td>

`number`

</td>
<td>

Epsilon, used during comparisons of floats

</td>
</tr>
<tr>
<td>

`options.probabilities`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

Inclusion probabilities of size N

</td>
</tr>
<tr>
<td>

`options.rand?`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.treeBucketSize?`

</td>
<td>

`number`

</td>
<td>

The bucket size to use when building k-d-trees

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### sampford()

> **sampford**(`options`): `number`\[]

Selects a Sampford (pips) sample using the rejective method.

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

`options`

</td>
<td>

{ `eps`: `number`; `probabilities`: [`Vector`](matrix.md#vector) | `number`\[]; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; }

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`options.eps?`

</td>
<td>

`number`

</td>
<td>

Epsilon, used during comparisons of floats

</td>
</tr>
<tr>
<td>

`options.probabilities`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

Inclusion probabilities of size N

</td>
</tr>
<tr>
<td>

`options.rand?`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.treeBucketSize?`

</td>
<td>

`number`

</td>
<td>

The bucket size to use when building k-d-trees

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### scps()

> **scps**(`options`): `number`\[]

Selects a Spatially Correlated Poisson Sample (SCPS)

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

`options`

</td>
<td>

{ `auxiliaries`: [`Matrix`](matrix.md#matrix); `eps`: `number`; `probabilities`: [`Vector`](matrix.md#vector) | `number`\[]; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; }

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`options.auxiliaries`

</td>
<td>

[`Matrix`](matrix.md#matrix)

</td>
<td>

Matrix of auxiliary variables

</td>
</tr>
<tr>
<td>

`options.eps?`

</td>
<td>

`number`

</td>
<td>

Epsilon, used during comparisons of floats

</td>
</tr>
<tr>
<td>

`options.probabilities`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

Inclusion probabilities of size N

</td>
</tr>
<tr>
<td>

`options.rand?`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.treeBucketSize?`

</td>
<td>

`number`

</td>
<td>

The bucket size to use when building k-d-trees

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### scpsCoordinated()

> **scpsCoordinated**(`options`): `number`\[]

Selects a coordinated Spatially Correlated Poisson Sample (SCPSCOORD)

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

`options`

</td>
<td>

[`ScpsCoordinatedOptions`](#scpscoordinatedoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### spm()

> **spm**(`options`): `number`\[]

Selects a (pips) sample using the sequential pivotal method.

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

`options`

</td>
<td>

{ `eps`: `number`; `probabilities`: [`Vector`](matrix.md#vector) | `number`\[]; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; }

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`options.eps?`

</td>
<td>

`number`

</td>
<td>

Epsilon, used during comparisons of floats

</td>
</tr>
<tr>
<td>

`options.probabilities`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

Inclusion probabilities of size N

</td>
</tr>
<tr>
<td>

`options.rand?`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.treeBucketSize?`

</td>
<td>

`number`

</td>
<td>

The bucket size to use when building k-d-trees

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### srswor()

> **srswor**(`options`): `number`\[]

Selects a simple random sampling without replacement.

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

`options`

</td>
<td>

[`SrsOptions`](#srsoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### srswr()

> **srswr**(`options`): `number`\[]

Selects a simple random sampling with replacement.

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

`options`

</td>
<td>

[`SrsOptions`](#srsoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.

---

### systematic()

> **systematic**(`options`): `number`\[]

Selects a systematic (pips) sample.

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

`options`

</td>
<td>

{ `eps`: `number`; `probabilities`: [`Vector`](matrix.md#vector) | `number`\[]; `rand`: [`RandomGenerator`](random.md#randomgenerator); `treeBucketSize`: `number`; }

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`options.eps?`

</td>
<td>

`number`

</td>
<td>

Epsilon, used during comparisons of floats

</td>
</tr>
<tr>
<td>

`options.probabilities`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

Inclusion probabilities of size N

</td>
</tr>
<tr>
<td>

`options.rand?`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.treeBucketSize?`

</td>
<td>

`number`

</td>
<td>

The bucket size to use when building k-d-trees

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.
