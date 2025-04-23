[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/estimate](../README.md) / htVariance

# Function: htVariance()

> **htVariance**(`y`, `prob`, `prob2m`): `number`

$$ \hat{V}(\hat{Y}) = \sum*{i \in S} \sum*{j \in S} \frac{y*i y_j}{\pi_i \pi_j} \frac{\pi*{ij} - \pi*i \pi_j}{\pi*{ij}} $$

## Parameters

| Parameter | theme_type             | theme_description                                                                       |
| --------- | ---------------------- | --------------------------------------------------------------------------------------- |
| `y`       | `Vector` \| `number`[] | variable of interest of size n, $y_i$.                                                  |
| `prob`    | `Vector` \| `number`[] | inclusion probabilities of size n, $\pi_i$.                                             |
| `prob2m`  | `Matrix`               | second order inclusion probabilities of size n\*n, upper triangular matrix, $\pi_{ij}$. |

## Returns

`number`

the Horvitz-Thompson variance estimate.
