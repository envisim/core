[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / intersectLineLineGeometries

# Function: intersectLineLineGeometries()

> **intersectLineLineGeometries**(`geometry1`, `geometry2`): `null` \| [`PointObject`](../type-aliases/PointObject.md)

Intersect of two lines: the crossing-points between the lines in the two features.

## Parameters

| Parameter   | theme_type                                    |
| ----------- | --------------------------------------------- |
| `geometry1` | [`LineObject`](../type-aliases/LineObject.md) |
| `geometry2` | [`LineObject`](../type-aliases/LineObject.md) |

## Returns

`null` \| [`PointObject`](../type-aliases/PointObject.md)

the points of the crossings, or `null` if no crossings.
