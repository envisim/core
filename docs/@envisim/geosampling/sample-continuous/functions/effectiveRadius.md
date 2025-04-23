[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [sample-continuous](../README.md) / effectiveRadius

# Function: effectiveRadius()

> **effectiveRadius**(`g`, `cutoff`): `number`

Computes the effective radius for distance sampling with points.

## Parameters

| Parameter | theme_type          | theme_description                                                                   |
| --------- | ------------------- | ----------------------------------------------------------------------------------- |
| `g`       | `DetectionFunction` | detection function (should return detection probability, given distance in meters). |
| `cutoff`  | `number`            | maximum detection distance in meters.                                               |

## Returns

`number`

the effective radius in meters.
