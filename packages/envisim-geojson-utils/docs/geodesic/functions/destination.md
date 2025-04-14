[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [geodesic](../README.md) / destination

# Function: destination()

> **destination**(`point`, `dist`, `azimuth`): [`Position2`](../../geojson/type-aliases/Position2.md)

Defined in: segments/geodesic.ts:53

Computes the destination point on a geodesic path given a point,
a distance and an azimuth.

## Parameters

### point

[`Position`](../../geojson/type-aliases/Position.md)

point coordinates [lon,lat].

### dist

`number`

the distance in meters.

### azimuth

`number`

azimuth (angle) clockwise from north in degrees.

## Returns

[`Position2`](../../geojson/type-aliases/Position2.md)

the coordinates [lon,lat] of the destination point.
