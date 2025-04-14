[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [geodesic](../README.md) / forwardAzimuthDistance

# Function: forwardAzimuthDistance()

> **forwardAzimuthDistance**(`p1`, `p2`): \[`number`, `number`\]

Defined in: segments/geodesic.ts:117

Computes the forward azimuth (angle from north) from the first point
to the second point for a geodesic path between the points.
The azimuth takes values in the range -180 to +180.

## Parameters

### p1

[`Position`](../../geojson/type-aliases/Position.md)

point coordinates [lon,lat] for first point.

### p2

[`Position`](../../geojson/type-aliases/Position.md)

point coordinates [lon,lat] for second point.

## Returns

\[`number`, `number`\]

the forward azimuth in degrees.
