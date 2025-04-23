[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geojson-utils](../../README.md) / [geodesic](../README.md) / areaOfRing

# Function: areaOfRing()

> **areaOfRing**(`coords`): `number`

Computes the area of a polygon ring where the segments are the shortest
(geodesic) paths between the points.

## Parameters

| Parameter | theme_type                                             | theme_description              |
| --------- | ------------------------------------------------------ | ------------------------------ |
| `coords`  | [`Position`](../../geojson/type-aliases/Position.md)[] | coordinates of a polygon ring. |

## Returns

`number`

the area in square meters.
