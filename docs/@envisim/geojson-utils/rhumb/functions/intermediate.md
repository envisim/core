[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geojson-utils](../../README.md) / [rhumb](../README.md) / intermediate

# Function: intermediate()

> **intermediate**(`p1`, `p2`, `fraction`): [`Position2`](../../geojson/type-aliases/Position2.md)

Computes an intermediate point on a rhumb line given a start point,
an end point and the fraction of the distance.

## Parameters

| Parameter  | theme_type                                           | theme_description                            |
| ---------- | ---------------------------------------------------- | -------------------------------------------- |
| `p1`       | [`Position`](../../geojson/type-aliases/Position.md) | point coordinates [lon,lat] for start point. |
| `p2`       | [`Position`](../../geojson/type-aliases/Position.md) | point coordinates [lon,lat] for end point.   |
| `fraction` | `number`                                             | the fraction of distance between the points. |

## Returns

[`Position2`](../../geojson/type-aliases/Position2.md)

the coordinates [lon,lat] of the intermediate point.
