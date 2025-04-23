[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson-utils](../README.md) / [](../README.md) / pointInMultiPolygonPosition

# Function: pointInMultiPolygonPosition()

> **pointInMultiPolygonPosition**(`point`, `polygons`): `boolean`

Checks if a point is in a MultiPolygon.
Note: Not for Polygon.

## Parameters

| Parameter  | theme_type                                              | theme_description                           |
| ---------- | ------------------------------------------------------- | ------------------------------------------- |
| `point`    | [`Position`](../geojson/type-aliases/Position.md)       | Coordinates [lon,lat] of a point.           |
| `polygons` | [`Position`](../geojson/type-aliases/Position.md)[][][] | Coordinates of a MultiPolygon, not Polygon. |

## Returns

`boolean`

`true` if point is in polygon.
