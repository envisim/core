[**Documentation**](../README.md)

---

[Documentation](../README.md) / @envisim/sampling

# @envisim/sampling

## Contents

- [Classes](#classes)
  - [NearestNeighbour](#nearestneighbour)
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
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

`PipsOptions`

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

`FixedSizedOptions` & `PipsOptions`

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

`CubeOptions`

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

`InclusionProbabilitiesOptions`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

`AuxiliaryOptions`

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

`LocalCubeOptions`

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

`AuxiliaryOptions` | `AuxiliaryFixedSizedOptions`

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

`AuxiliaryOptions` | `AuxiliaryFixedSizedOptions`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

`PipsOptions`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

`PipsOptions`

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

`FixedSizedOptions` & `PipsOptions`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

`PipsOptions`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

`PipsOptions`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

`PipsOptions`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

`AuxiliaryOptions`

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

`ScpsCoordinatedOptions`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

`PipsOptions`

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

`SrsOptions`

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

`SrsOptions`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

`PipsOptions`

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

sample indices.
