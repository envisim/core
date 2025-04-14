[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [rhumb](../README.md) / plateCarreeAreaOfRing

# Function: plateCarreeAreaOfRing()

> **plateCarreeAreaOfRing**(`ring`): `number`

Defined in: segments/rhumb.ts:455

Computes the area of a polygon ring where the segments are
defined as [lon1 + t * (lon2 - lon1), lat1 + t * (lat2 - lat1)], for
0 <= t <= 1.

## Parameters

### ring

[`Position`](../../geojson/type-aliases/Position.md)[]

## Returns

`number`

the area in square meters.
