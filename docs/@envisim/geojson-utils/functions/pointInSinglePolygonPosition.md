[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson-utils](../README.md) / [](../README.md) / pointInSinglePolygonPosition

# Function: pointInSinglePolygonPosition()

> **pointInSinglePolygonPosition**(`point`, `polygon`): `boolean`

Checks if a point is in a Polygon.
Note: Not for MultiPolygon.

## Parameters

| Parameter | theme_type                                            | theme_description                           |
| --------- | ----------------------------------------------------- | ------------------------------------------- |
| `point`   | [`Position`](../geojson/type-aliases/Position.md)     | Coordinates [lon,lat] of a point.           |
| `polygon` | [`Position`](../geojson/type-aliases/Position.md)[][] | Coordinates of a Polygon, not MultiPolygon. |

## Returns

`boolean`

`true` if point is in polygon.
