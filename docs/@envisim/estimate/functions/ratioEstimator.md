[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/estimate](../README.md) / ratioEstimator

# Function: ratioEstimator()

> **ratioEstimator**(`y`, `x`, `totalX`, `prob`): `number`

Ratio estimator, where a true total $X$ is available for the population.
$$ \hat{T} = \frac{ \hat{Y} }{ \hat{X} } X , $$
where $\hat{Y}, \hat{X}$ are [HT-estimators](horvitzThompson.md).

## Parameters

| Parameter | theme_type             | theme_description                  |
| --------- | ---------------------- | ---------------------------------- |
| `y`       | `Vector` \| `number`[] | variable of interest of size n.    |
| `x`       | `Vector` \| `number`[] | auxiliary variable of size n.      |
| `totalX`  | `number`               | population total, $X$.             |
| `prob`    | `Vector` \| `number`[] | inclusion probabilities of size n. |

## Returns

`number`

the ratio estimate, $\hat{T}$.
