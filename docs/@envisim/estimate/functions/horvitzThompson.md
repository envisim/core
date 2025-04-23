[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/estimate](../README.md) / horvitzThompson

# Function: horvitzThompson()

> **horvitzThompson**(`y`, `prob`): `number`

Single count Horvitz-Thompson estimator of the total
$$ \hat{Y} = \sum\_{i \in S} \frac{y_i}{\pi_i} , $$
$$ n = |S| . $$

## Parameters

| Parameter | theme_type             | theme_description                           |
| --------- | ---------------------- | ------------------------------------------- |
| `y`       | `Vector` \| `number`[] | variable of interest of size n, $y_i$.      |
| `prob`    | `Vector` \| `number`[] | inclusion probabilities of size n, $\pi_i$. |

## Returns

`number`

the Horvitz-Thompson estimate, $\hat{Y}$.
