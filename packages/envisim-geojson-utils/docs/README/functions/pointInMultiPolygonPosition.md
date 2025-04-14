[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [](../../README.md) / pointInMultiPolygonPosition

# Function: pointInMultiPolygonPosition()

> **pointInMultiPolygonPosition**(`point`, `polygons`): `boolean`

Defined in: point-in-polygon.ts:54

Checks if a point is in a MultiPolygon.
Note: Not for Polygon.

## Parameters

### point

[`Position`](../../geojson/type-aliases/Position.md)

Coordinates [lon,lat] of a point.

### polygons

[`Position`](../../geojson/type-aliases/Position.md)[][][]

## Returns

`boolean`

`true` if point is in polygon.
