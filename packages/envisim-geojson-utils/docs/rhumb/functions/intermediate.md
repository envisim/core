[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [rhumb](../README.md) / intermediate

# Function: intermediate()

> **intermediate**(`p1`, `p2`, `fraction`): [`Position2`](../../geojson/type-aliases/Position2.md)

Defined in: segments/rhumb.ts:330

Computes an intermediate point on a rhumb line given a start point,
an end point and the fraction of the distance.

## Parameters

### p1

[`Position`](../../geojson/type-aliases/Position.md)

point coordinates [lon,lat] for start point.

### p2

[`Position`](../../geojson/type-aliases/Position.md)

point coordinates [lon,lat] for end point.

### fraction

`number`

the fraction of distance between the points.

## Returns

[`Position2`](../../geojson/type-aliases/Position2.md)

the coordinates [lon,lat] of the intermediate point.
