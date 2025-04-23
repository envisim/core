[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/estimate](../README.md) / hhVariance

# Function: hhVariance()

> **hhVariance**(`y`, `expected`, `inclusions`, `mu2m`): `number`

$$ \hat{V}(\hat{Y}) = \sum*{i \in S} \sum*{j \in S} \frac{y*i y_j}{\mu_i \mu_j} S_i S_j \frac{\mu*{ij} - \mu*i \mu_j}{\mu*{ij}} $$

## Parameters

| Parameter    | theme_type             | theme_description                                                                             |
| ------------ | ---------------------- | --------------------------------------------------------------------------------------------- |
| `y`          | `Vector` \| `number`[] | variable of interest of size n, $y_i$.                                                        |
| `expected`   | `Vector` \| `number`[] | expected number of inclusions of size n, $\mu_i$.                                             |
| `inclusions` | `Vector` \| `number`[] | number of inclusions of size n, $S_i$.                                                        |
| `mu2m`       | `Matrix`               | second order expected number of inclusions of size n\*n, upper triangular matrix, $\mu_{ij}$. |

## Returns

`number`

the Hansen-Hurwitz variance estimate.
