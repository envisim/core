[**Documentation**](../README.md)

---

[Documentation](../README.md) / @envisim/estimate

# @envisim/estimate

## Contents

- [Estimators](#estimators)
  - [hansenHurwitz()](#hansenhurwitz)
  - [horvitzThompson()](#horvitzthompson)
  - [nearestNeighbourEstimator()](#nearestneighbourestimator)
  - [ratioEstimator()](#ratioestimator)
  - [wrEstimator()](#wrestimator)
- [Spatial balance measures](#spatial-balance-measures)
  - [spatialBalanceSS()](#spatialbalancess)
  - [spatialBalanceVO()](#spatialbalancevo)
- [Variance estimators](#variance-estimators)
  - [hhVariance()](#hhvariance)
  - [htVariance()](#htvariance)
  - [htVarianceD()](#htvarianced)
  - [htVarianceGS()](#htvariancegs)
  - [htVarianceSYG()](#htvariancesyg)
  - [wrVariance()](#wrvariance)

## Estimators

### hansenHurwitz()

> **hansenHurwitz**(`y`, `expected`, `inclusions`): `number`

Multiple count Hansen-Hurwitz estimator.

$$\hat{Y} = \sum\_{i \in S} \frac{y\_i}{\mu\_i}S\_i ,$$

$$n = |S| .$$

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

`y`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

variable of interest of size n, $y\_i$.

</td>
</tr>
<tr>
<td>

`expected`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

expected number of inclusions of size n, $\mu\_i$.

</td>
</tr>
<tr>
<td>

`inclusions`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

number of inclusions of size n, $S\_i$.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the Hansen-Hurwitz estimate, $\hat{Y}$.

---

### horvitzThompson()

> **horvitzThompson**(`y`, `prob`): `number`

Single count Horvitz-Thompson estimator of the total

$$\hat{Y} = \sum\_{i \in S} \frac{y\_i}{\pi\_i} ,$$

$$n = |S| .$$

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

`y`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

variable of interest of size n, $y\_i$.

</td>
</tr>
<tr>
<td>

`prob`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

inclusion probabilities of size n, $\pi\_i$.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the Horvitz-Thompson estimate, $\hat{Y}$.

---

### nearestNeighbourEstimator()

> **nearestNeighbourEstimator**(`y`, `xm`, `sample`): `number`

$$\hat{Y} = \sum\_{i \in S} y\_i n\_i ,$$

where $n\_i$ is the number of units in the population closer to unit $i$
than to any other unit.

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

`y`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

variable of interest of size n.

</td>
</tr>
<tr>
<td>

`xm`

</td>
<td>

[`Matrix`](matrix.md#matrix)

</td>
<td>

auxilliary variables of size N\*p.

</td>
</tr>
<tr>
<td>

`sample`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

sample indices, in the same order as the y-values.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the nearest neighbour estimate

---

### ratioEstimator()

> **ratioEstimator**(`y`, `x`, `totalX`, `prob`): `number`

Ratio estimator, where a true total $X$ is available for the population.

$$\hat{T} = \frac{ \hat{Y} }{ \hat{X} } X ,$$

where $\hat{Y}, \hat{X}$ are [HT-estimators](#horvitzthompson).

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

`y`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

variable of interest of size n.

</td>
</tr>
<tr>
<td>

`x`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

auxiliary variable of size n.

</td>
</tr>
<tr>
<td>

`totalX`

</td>
<td>

`number`

</td>
<td>

population total, $X$.

</td>
</tr>
<tr>
<td>

`prob`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

inclusion probabilities of size n.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the ratio estimate, $\hat{T}$.

---

### wrEstimator()

> **wrEstimator**(`y`, `prob`): `number`

$$\hat{Y} = \sum\_{i=1}^n \frac{y\_i}{n p\_i}$$

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

`y`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

variable of interest of size n, $y\_i$.

</td>
</tr>
<tr>
<td>

`prob`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

drawing probabilities of size n, $p\_i$.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the wr estimate, $\hat{Y}$.

## Spatial balance measures

### spatialBalanceSS()

> **spatialBalanceSS**(`sample`, `xm`, `prob?`): `number`

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

`sample`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

sample indices.

</td>
</tr>
<tr>
<td>

`xm`

</td>
<td>

[`Matrix`](matrix.md#matrix)

</td>
<td>

Matrix of auxilliary variables of size N\*p.

</td>
</tr>
<tr>
<td>

`prob?`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

inclusion probabilities of size N.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

spatial balance based on the sum of squares balance measure.

---

### spatialBalanceVO()

> **spatialBalanceVO**(`sample`, `xm`, `prob`): `number`

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

`sample`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

sample indices.

</td>
</tr>
<tr>
<td>

`xm`

</td>
<td>

[`Matrix`](matrix.md#matrix)

</td>
<td>

Matrix of auxilliary variables of size N\*p.

</td>
</tr>
<tr>
<td>

`prob`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

inclusion probabilities of size N.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

spatial balance based on the voronoi balance measure.

## Variance estimators

### hhVariance()

> **hhVariance**(`y`, `expected`, `inclusions`, `mu2m`): `number`

$$\hat{V}(\hat{Y}) = \sum\_{i \in S} \sum\_{j \in S} \frac{y\_i y\_j}{\mu\_i \mu\_j} S\_i S\_j \frac{\mu\_{ij} - \mu\_i \mu\_j}{\mu\_{ij}}$$

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

`y`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

variable of interest of size n, $y\_i$.

</td>
</tr>
<tr>
<td>

`expected`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

expected number of inclusions of size n, $\mu\_i$.

</td>
</tr>
<tr>
<td>

`inclusions`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

number of inclusions of size n, $S\_i$.

</td>
</tr>
<tr>
<td>

`mu2m`

</td>
<td>

[`Matrix`](matrix.md#matrix)

</td>
<td>

second order expected number of inclusions of size n\*n,
upper triangular matrix, $\mu\_{ij}$.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the Hansen-Hurwitz variance estimate.

---

### htVariance()

> **htVariance**(`y`, `prob`, `prob2m`): `number`

$$\hat{V}(\hat{Y}) = \sum\_{i \in S} \sum\_{j \in S} \frac{y\_i y\_j}{\pi\_i \pi\_j} \frac{\pi\_{ij} - \pi\_i \pi\_j}{\pi\_{ij}}$$

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

`y`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

variable of interest of size n, $y\_i$.

</td>
</tr>
<tr>
<td>

`prob`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

inclusion probabilities of size n, $\pi\_i$.

</td>
</tr>
<tr>
<td>

`prob2m`

</td>
<td>

[`Matrix`](matrix.md#matrix)

</td>
<td>

second order inclusion probabilities of size n\*n,
upper triangular matrix, $\pi\_{ij}$.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the Horvitz-Thompson variance estimate.

---

### htVarianceD()

> **htVarianceD**(`y`, `prob`): `number`

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

`y`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

variable of interest of size n, $y\_i$.

</td>
</tr>
<tr>
<td>

`prob`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

inclusion probabilities of size n, $\pi\_i$.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

Deville's HT variance estimate.

---

### htVarianceGS()

> **htVarianceGS**(`y`, `prob`, `xm`): `number`

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

`y`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

variable of interest of size n, $y\_i$.

</td>
</tr>
<tr>
<td>

`prob`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

inclusion probabilities of size n, $\pi\_i$.

</td>
</tr>
<tr>
<td>

`xm`

</td>
<td>

[`Matrix`](matrix.md#matrix)

</td>
<td>

auxilliary variables of size n\*p.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

GS's HT variance estimate.

---

### htVarianceSYG()

> **htVarianceSYG**(`y`, `prob`, `prob2m`): `number`

Sen-Yates-Grundy HT-variance estimator of a fixed sample size

$$\hat{V}(\hat{Y}) = -\frac{1}{2} \sum\_{i \in S} \sum\_{j \in S} (y\_i / \pi\_i - y\_j / \pi\_j)^2 \frac{\pi\_{ij} - \pi\_i \pi\_j}{\pi\_{ij}}$$

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

`y`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

variable of interest of size n, $y\_i$.

</td>
</tr>
<tr>
<td>

`prob`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

inclusion probabilities of size n, $\pi\_i$.

</td>
</tr>
<tr>
<td>

`prob2m`

</td>
<td>

[`Matrix`](matrix.md#matrix)

</td>
<td>

second order inclusion probabilities of size n\*n,
upper triangular matrix, $\pi\_{ij}$.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the Horvitz-Thompson variance estimate.

---

### wrVariance()

> **wrVariance**(`y`, `prob`): `number`

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

`y`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

variable of interest of size n, $y\_i$.

</td>
</tr>
<tr>
<td>

`prob`

</td>
<td>

[`Vector`](matrix.md#vector) | `number`\[]

</td>
<td>

inclusion probabilities of size n, $\pi\_i$.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the wr variance estimate.
