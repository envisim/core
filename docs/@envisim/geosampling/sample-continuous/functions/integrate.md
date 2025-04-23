[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [sample-continuous](../README.md) / integrate

# Function: integrate()

> **integrate**(`f`, `a`, `b`, `n`): `number`

Integrate a function f from a to b.

## Parameters

| Parameter | theme_type          | theme_default_value | theme_description                                           |
| --------- | ------------------- | ------------------- | ----------------------------------------------------------- |
| `f`       | `IntegrateFunction` | `undefined`         | function to integrate.                                      |
| `a`       | `number`            | `undefined`         | lower limit a > -Infinity.                                  |
| `b`       | `number`            | `undefined`         | upper limit b > a and b < Infinity.                         |
| `n`       | `number`            | `100`               | optional, number of intervals will be 3n (default n = 100). |

## Returns

`number`

number, f integrated from a to b.
