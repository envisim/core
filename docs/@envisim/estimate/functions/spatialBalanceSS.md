[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/estimate](../README.md) / spatialBalanceSS

# Function: spatialBalanceSS()

> **spatialBalanceSS**(`sample`, `xm`, `prob?`): `number`

## Parameters

| Parameter | theme_type             | theme_description                            |
| --------- | ---------------------- | -------------------------------------------- |
| `sample`  | `Vector` \| `number`[] | sample indices.                              |
| `xm`      | `Matrix`               | Matrix of auxilliary variables of size N\*p. |
| `prob?`   | `Vector` \| `number`[] | inclusion probabilities of size N.           |

## Returns

`number`

spatial balance based on the sum of squares balance measure.
