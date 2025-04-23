[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geojson-utils](../../README.md) / [rhumb](../README.md) / plateCarreeAreaOfRing

# Function: plateCarreeAreaOfRing()

> **plateCarreeAreaOfRing**(`ring`): `number`

Computes the area of a polygon ring where the segments are
defined as [lon1 + t * (lon2 - lon1), lat1 + t * (lat2 - lat1)], for
0 <= t <= 1.

## Parameters

| Parameter | theme_type                                             |
| --------- | ------------------------------------------------------ |
| `ring`    | [`Position`](../../geojson/type-aliases/Position.md)[] |

## Returns

`number`

the area in square meters.
