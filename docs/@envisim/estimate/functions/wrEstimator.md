[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/estimate](../README.md) / wrEstimator

# Function: wrEstimator()

> **wrEstimator**(`y`, `prob`): `number`

$$ \hat{Y} = \sum\_{i=1}^n \frac{y_i}{n p_i} $$

## Parameters

| Parameter | theme_type             | theme_description                       |
| --------- | ---------------------- | --------------------------------------- |
| `y`       | `Vector` \| `number`[] | variable of interest of size n, $y_i$.  |
| `prob`    | `Vector` \| `number`[] | drawing probabilities of size n, $p_i$. |

## Returns

`number`

the wr estimate, $\hat{Y}$.
