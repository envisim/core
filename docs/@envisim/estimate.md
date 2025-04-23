[**Documentation**](../README.md)

---

[Documentation](../README.md) / @envisim/estimate

# @envisim/estimate

## Estimator

### hansenHurwitz()

> **hansenHurwitz**(`y`, `expected`, `inclusions`): `number`

Multiple count Hansen-Hurwitz estimator.
$$ \hat{Y} = \sum\_{i \in S} \frac{y_i}{\mu_i}S_i , $$
$$ n = |S| . $$

#### Parameters

| Parameter    | Type                                       | Description                                       |
| ------------ | ------------------------------------------ | ------------------------------------------------- |
| `y`          | [`Vector`](matrix.md#vector) \| `number`[] | variable of interest of size n, $y_i$.            |
| `expected`   | [`Vector`](matrix.md#vector) \| `number`[] | expected number of inclusions of size n, $\mu_i$. |
| `inclusions` | [`Vector`](matrix.md#vector) \| `number`[] | number of inclusions of size n, $S_i$.            |

#### Returns

`number`

the Hansen-Hurwitz estimate, $\hat{Y}$.

---

### horvitzThompson()

> **horvitzThompson**(`y`, `prob`): `number`

Single count Horvitz-Thompson estimator of the total
$$ \hat{Y} = \sum\_{i \in S} \frac{y_i}{\pi_i} , $$
$$ n = |S| . $$

#### Parameters

| Parameter | Type                                       | Description                                 |
| --------- | ------------------------------------------ | ------------------------------------------- |
| `y`       | [`Vector`](matrix.md#vector) \| `number`[] | variable of interest of size n, $y_i$.      |
| `prob`    | [`Vector`](matrix.md#vector) \| `number`[] | inclusion probabilities of size n, $\pi_i$. |

#### Returns

`number`

the Horvitz-Thompson estimate, $\hat{Y}$.

---

### nearestNeighbourEstimator()

> **nearestNeighbourEstimator**(`y`, `xm`, `sample`): `number`

$$ \hat{Y} = \sum\_{i \in S} y_i n_i , $$
where $n_i$ is the number of units in the population closer to unit $i$
than to any other unit.

#### Parameters

| Parameter | Type                                       | Description                                        |
| --------- | ------------------------------------------ | -------------------------------------------------- |
| `y`       | [`Vector`](matrix.md#vector) \| `number`[] | variable of interest of size n.                    |
| `xm`      | [`Matrix`](matrix.md#matrix)               | auxilliary variables of size N\*p.                 |
| `sample`  | [`Vector`](matrix.md#vector) \| `number`[] | sample indices, in the same order as the y-values. |

#### Returns

`number`

the nearest neighbour estimate

---

### ratioEstimator()

> **ratioEstimator**(`y`, `x`, `totalX`, `prob`): `number`

Ratio estimator, where a true total $X$ is available for the population.
$$ \hat{T} = \frac{ \hat{Y} }{ \hat{X} } X , $$
where $\hat{Y}, \hat{X}$ are [HT-estimators](#horvitzthompson).

#### Parameters

| Parameter | Type                                       | Description                        |
| --------- | ------------------------------------------ | ---------------------------------- |
| `y`       | [`Vector`](matrix.md#vector) \| `number`[] | variable of interest of size n.    |
| `x`       | [`Vector`](matrix.md#vector) \| `number`[] | auxiliary variable of size n.      |
| `totalX`  | `number`                                   | population total, $X$.             |
| `prob`    | [`Vector`](matrix.md#vector) \| `number`[] | inclusion probabilities of size n. |

#### Returns

`number`

the ratio estimate, $\hat{T}$.

---

### wrEstimator()

> **wrEstimator**(`y`, `prob`): `number`

$$ \hat{Y} = \sum\_{i=1}^n \frac{y_i}{n p_i} $$

#### Parameters

| Parameter | Type                                       | Description                             |
| --------- | ------------------------------------------ | --------------------------------------- |
| `y`       | [`Vector`](matrix.md#vector) \| `number`[] | variable of interest of size n, $y_i$.  |
| `prob`    | [`Vector`](matrix.md#vector) \| `number`[] | drawing probabilities of size n, $p_i$. |

#### Returns

`number`

the wr estimate, $\hat{Y}$.

## Spatial balance measure

### spatialBalanceSS()

> **spatialBalanceSS**(`sample`, `xm`, `prob?`): `number`

#### Parameters

| Parameter | Type                                       | Description                                  |
| --------- | ------------------------------------------ | -------------------------------------------- |
| `sample`  | [`Vector`](matrix.md#vector) \| `number`[] | sample indices.                              |
| `xm`      | [`Matrix`](matrix.md#matrix)               | Matrix of auxilliary variables of size N\*p. |
| `prob?`   | [`Vector`](matrix.md#vector) \| `number`[] | inclusion probabilities of size N.           |

#### Returns

`number`

spatial balance based on the sum of squares balance measure.

---

### spatialBalanceVO()

> **spatialBalanceVO**(`sample`, `xm`, `prob`): `number`

#### Parameters

| Parameter | Type                                       | Description                                  |
| --------- | ------------------------------------------ | -------------------------------------------- |
| `sample`  | [`Vector`](matrix.md#vector) \| `number`[] | sample indices.                              |
| `xm`      | [`Matrix`](matrix.md#matrix)               | Matrix of auxilliary variables of size N\*p. |
| `prob`    | [`Vector`](matrix.md#vector) \| `number`[] | inclusion probabilities of size N.           |

#### Returns

`number`

spatial balance based on the voronoi balance measure.

## Variance estimator

### hhVariance()

> **hhVariance**(`y`, `expected`, `inclusions`, `mu2m`): `number`

$$ \hat{V}(\hat{Y}) = \sum*{i \in S} \sum*{j \in S} \frac{y*i y_j}{\mu_i \mu_j} S_i S_j \frac{\mu*{ij} - \mu*i \mu_j}{\mu*{ij}} $$

#### Parameters

| Parameter    | Type                                       | Description                                                                                   |
| ------------ | ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `y`          | [`Vector`](matrix.md#vector) \| `number`[] | variable of interest of size n, $y_i$.                                                        |
| `expected`   | [`Vector`](matrix.md#vector) \| `number`[] | expected number of inclusions of size n, $\mu_i$.                                             |
| `inclusions` | [`Vector`](matrix.md#vector) \| `number`[] | number of inclusions of size n, $S_i$.                                                        |
| `mu2m`       | [`Matrix`](matrix.md#matrix)               | second order expected number of inclusions of size n\*n, upper triangular matrix, $\mu_{ij}$. |

#### Returns

`number`

the Hansen-Hurwitz variance estimate.

---

### htVariance()

> **htVariance**(`y`, `prob`, `prob2m`): `number`

$$ \hat{V}(\hat{Y}) = \sum*{i \in S} \sum*{j \in S} \frac{y*i y_j}{\pi_i \pi_j} \frac{\pi*{ij} - \pi*i \pi_j}{\pi*{ij}} $$

#### Parameters

| Parameter | Type                                       | Description                                                                             |
| --------- | ------------------------------------------ | --------------------------------------------------------------------------------------- |
| `y`       | [`Vector`](matrix.md#vector) \| `number`[] | variable of interest of size n, $y_i$.                                                  |
| `prob`    | [`Vector`](matrix.md#vector) \| `number`[] | inclusion probabilities of size n, $\pi_i$.                                             |
| `prob2m`  | [`Matrix`](matrix.md#matrix)               | second order inclusion probabilities of size n\*n, upper triangular matrix, $\pi_{ij}$. |

#### Returns

`number`

the Horvitz-Thompson variance estimate.

---

### htVarianceD()

> **htVarianceD**(`y`, `prob`): `number`

#### Parameters

| Parameter | Type                                       | Description                                 |
| --------- | ------------------------------------------ | ------------------------------------------- |
| `y`       | [`Vector`](matrix.md#vector) \| `number`[] | variable of interest of size n, $y_i$.      |
| `prob`    | [`Vector`](matrix.md#vector) \| `number`[] | inclusion probabilities of size n, $\pi_i$. |

#### Returns

`number`

Deville's HT variance estimate.

---

### htVarianceGS()

> **htVarianceGS**(`y`, `prob`, `xm`): `number`

#### Parameters

| Parameter | Type                                       | Description                                 |
| --------- | ------------------------------------------ | ------------------------------------------- |
| `y`       | [`Vector`](matrix.md#vector) \| `number`[] | variable of interest of size n, $y_i$.      |
| `prob`    | [`Vector`](matrix.md#vector) \| `number`[] | inclusion probabilities of size n, $\pi_i$. |
| `xm`      | [`Matrix`](matrix.md#matrix)               | auxilliary variables of size n\*p.          |

#### Returns

`number`

GS's HT variance estimate.

---

### htVarianceSYG()

> **htVarianceSYG**(`y`, `prob`, `prob2m`): `number`

Sen-Yates-Grundy HT-variance estimator of a fixed sample size

$$ \hat{V}(\hat{Y}) = -\frac{1}{2} \sum*{i \in S} \sum*{j \in S} (y*i / \pi_i - y_j / \pi_j)^2 \frac{\pi*{ij} - \pi*i \pi_j}{\pi*{ij}} $$

#### Parameters

| Parameter | Type                                       | Description                                                                             |
| --------- | ------------------------------------------ | --------------------------------------------------------------------------------------- |
| `y`       | [`Vector`](matrix.md#vector) \| `number`[] | variable of interest of size n, $y_i$.                                                  |
| `prob`    | [`Vector`](matrix.md#vector) \| `number`[] | inclusion probabilities of size n, $\pi_i$.                                             |
| `prob2m`  | [`Matrix`](matrix.md#matrix)               | second order inclusion probabilities of size n\*n, upper triangular matrix, $\pi_{ij}$. |

#### Returns

`number`

the Horvitz-Thompson variance estimate.

---

### wrVariance()

> **wrVariance**(`y`, `prob`): `number`

#### Parameters

| Parameter | Type                                       | Description                                 |
| --------- | ------------------------------------------ | ------------------------------------------- |
| `y`       | [`Vector`](matrix.md#vector) \| `number`[] | variable of interest of size n, $y_i$.      |
| `prob`    | [`Vector`](matrix.md#vector) \| `number`[] | inclusion probabilities of size n, $\pi_i$. |

#### Returns

`number`

the wr variance estimate.
