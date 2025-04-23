[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [sample-continuous](../README.md) / effectiveHalfWidth

# Function: effectiveHalfWidth()

> **effectiveHalfWidth**(`g`, `cutoff`): `number`

Computes the effective half width for distance sampling along a line.

## Parameters

| Parameter | theme_type          | theme_description                                                                   |
| --------- | ------------------- | ----------------------------------------------------------------------------------- |
| `g`       | `DetectionFunction` | detection function (should return detection probability, given distance in meters). |
| `cutoff`  | `number`            | maximum detection distance in meters.                                               |

## Returns

`number`

the effective half width in meters.
