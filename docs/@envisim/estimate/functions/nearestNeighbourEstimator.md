[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/estimate](../README.md) / nearestNeighbourEstimator

# Function: nearestNeighbourEstimator()

> **nearestNeighbourEstimator**(`y`, `xm`, `sample`): `number`

$$ \hat{Y} = \sum\_{i \in S} y_i n_i , $$
where $n_i$ is the number of units in the population closer to unit $i$
than to any other unit.

## Parameters

| Parameter | theme_type             | theme_description                                  |
| --------- | ---------------------- | -------------------------------------------------- |
| `y`       | `Vector` \| `number`[] | variable of interest of size n.                    |
| `xm`      | `Matrix`               | auxilliary variables of size N\*p.                 |
| `sample`  | `Vector` \| `number`[] | sample indices, in the same order as the y-values. |

## Returns

`number`

the nearest neighbour estimate
