[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/estimate](../README.md) / hansenHurwitz

# Function: hansenHurwitz()

> **hansenHurwitz**(`y`, `expected`, `inclusions`): `number`

Multiple count Hansen-Hurwitz estimator.
$$ \hat{Y} = \sum\_{i \in S} \frac{y_i}{\mu_i}S_i , $$
$$ n = |S| . $$

## Parameters

| Parameter    | theme_type             | theme_description                                 |
| ------------ | ---------------------- | ------------------------------------------------- |
| `y`          | `Vector` \| `number`[] | variable of interest of size n, $y_i$.            |
| `expected`   | `Vector` \| `number`[] | expected number of inclusions of size n, $\mu_i$. |
| `inclusions` | `Vector` \| `number`[] | number of inclusions of size n, $S_i$.            |

## Returns

`number`

the Hansen-Hurwitz estimate, $\hat{Y}$.
