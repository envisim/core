[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [plate-carree](../README.md) / areaOfRing

# Function: areaOfRing()

> **areaOfRing**(`ring`): `number`

Computes the area of a polygon ring where the segments are
defined as [lon1 + t * (lon2 - lon1), lat1 + t * (lat2 - lat1)], for
0 <= t <= 1.

## Parameters

| Parameter | Type                                                   | Description |
| --------- | ------------------------------------------------------ | ----------- |
| `ring`    | [`Position`](../../geojson/type-aliases/Position.md)[] |             |

## Returns

`number`

the area in square meters.
