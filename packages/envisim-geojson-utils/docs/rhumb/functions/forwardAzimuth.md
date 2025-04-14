[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [rhumb](../README.md) / forwardAzimuth

# Function: forwardAzimuth()

> **forwardAzimuth**(`p1`, `p2`): `number`

Defined in: segments/rhumb.ts:317

Computes the forward azimuth (angle from north) from the first point
to the second point for a rhumb line between the points.
The azimuth takes values in the range -180 to +180.

## Parameters

### p1

[`Position`](../../geojson/type-aliases/Position.md)

point coordinates [lon,lat] for first point.

### p2

[`Position`](../../geojson/type-aliases/Position.md)

point coordinates [lon,lat] for second point.

## Returns

`number`

the forward azimuth in degrees.
