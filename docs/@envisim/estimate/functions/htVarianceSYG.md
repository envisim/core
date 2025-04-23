[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/estimate](../README.md) / htVarianceSYG

# Function: htVarianceSYG()

> **htVarianceSYG**(`y`, `prob`, `prob2m`): `number`

Sen-Yates-Grundy HT-variance estimator of a fixed sample size

$$ \hat{V}(\hat{Y}) = -\frac{1}{2} \sum*{i \in S} \sum*{j \in S} (y*i / \pi_i - y_j / \pi_j)^2 \frac{\pi*{ij} - \pi*i \pi_j}{\pi*{ij}} $$

## Parameters

| Parameter | theme_type             | theme_description                                                                       |
| --------- | ---------------------- | --------------------------------------------------------------------------------------- |
| `y`       | `Vector` \| `number`[] | variable of interest of size n, $y_i$.                                                  |
| `prob`    | `Vector` \| `number`[] | inclusion probabilities of size n, $\pi_i$.                                             |
| `prob2m`  | `Matrix`               | second order inclusion probabilities of size n\*n, upper triangular matrix, $\pi_{ij}$. |

## Returns

`number`

the Horvitz-Thompson variance estimate.
