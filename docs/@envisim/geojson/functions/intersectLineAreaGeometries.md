[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / intersectLineAreaGeometries

# Function: intersectLineAreaGeometries()

> **intersectLineAreaGeometries**(`line`, `area`, `options`): `null` \| [`LineObject`](../type-aliases/LineObject.md)

Intersect between a line and an area.

## Parameters

| Parameter | theme_type                                                              |
| --------- | ----------------------------------------------------------------------- |
| `line`    | [`LineObject`](../type-aliases/LineObject.md)                           |
| `area`    | [`AreaObject`](../type-aliases/AreaObject.md)                           |
| `options` | [`CirclesToPolygonsOptions`](../interfaces/CirclesToPolygonsOptions.md) |

## Returns

`null` \| [`LineObject`](../type-aliases/LineObject.md)

the intersection or `null` if none exists.
