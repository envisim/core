[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [](../../README.md) / pointInSinglePolygonPosition

# Function: pointInSinglePolygonPosition()

> **pointInSinglePolygonPosition**(`point`, `polygon`): `boolean`

Defined in: point-in-polygon.ts:29

Checks if a point is in a Polygon.
Note: Not for MultiPolygon.

## Parameters

### point

[`Position`](../../geojson/type-aliases/Position.md)

Coordinates [lon,lat] of a point.

### polygon

[`Position`](../../geojson/type-aliases/Position.md)[][]

Coordinates of a Polygon, not MultiPolygon.

## Returns

`boolean`

`true` if point is in polygon.
