[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [model-geometry](../README.md) / rectangularCircleGeometry

# Function: rectangularCircleGeometry()

> **rectangularCircleGeometry**(`width`, `height`, `diameter`): `MultiCircle`

## Parameters

| Parameter  | theme_type | theme_default_value | theme_description                                                                         |
| ---------- | ---------- | ------------------- | ----------------------------------------------------------------------------------------- |
| `width`    | `number`   | `10.0`              | length of side west-east in meters.                                                       |
| `height`   | `number`   | `width`             | length of side south-north in meters.                                                     |
| `diameter` | `number`   | `1.0`               | the diameter in meters. If diameter is smaller than width, diameter is replaced by width. |

## Returns

`MultiCircle`

a circle model geometry in a rectangular formation.
