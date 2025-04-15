[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [plate-carree](../README.md) / intermediate

# Function: intermediate()

> **intermediate**(`p1`, `p2`, `fraction`): [`Position2`](../../geojson/type-aliases/Position2.md)

Computes a position on the segment at a fraction of the length of the
segment, where the segment is of type plate carrée.

## Parameters

| Parameter  | Type                                                 | Description                |
| ---------- | ---------------------------------------------------- | -------------------------- |
| `p1`       | [`Position`](../../geojson/type-aliases/Position.md) | start point [lon,lat]      |
| `p2`       | [`Position`](../../geojson/type-aliases/Position.md) | end point [lon,lat]        |
| `fraction` | `number`                                             | the fraction of the length |

## Returns

[`Position2`](../../geojson/type-aliases/Position2.md)

the position on the segment
