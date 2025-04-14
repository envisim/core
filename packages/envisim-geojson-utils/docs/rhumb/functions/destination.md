[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [rhumb](../README.md) / destination

# Function: destination()

> **destination**(`origin`, `dist`, `azimuth`): [`Position2`](../../geojson/type-aliases/Position2.md)

Defined in: segments/rhumb.ts:262

Computes the destination point on a rhumb line given a point,
a distance and an azimuth.

## Parameters

### origin

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
