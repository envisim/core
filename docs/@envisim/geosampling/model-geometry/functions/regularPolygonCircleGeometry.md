[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [model-geometry](../README.md) / regularPolygonCircleGeometry

# Function: regularPolygonCircleGeometry()

> **regularPolygonCircleGeometry**(`sides`, `polygonDiameter`, `diameter`): `MultiCircle`

## Parameters

| Parameter         | theme_type | theme_default_value | theme_description                                                                                                                                             |
| ----------------- | ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sides`           | `number`   | `3`                 | the number of sides/vertices.                                                                                                                                 |
| `polygonDiameter` | `number`   | `10.0`              | the diameter of the containing circle in meters.                                                                                                              |
| `diameter`        | `number`   | `1.0`               | the diameter of the circles in meters. If diameter is smaller than the distance between the points in the polygon, the diameter is replaced by this distance. |

## Returns

`MultiCircle`

a circle model geometry in a regular polygon formation.
