[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / convexHull

# Function: convexHull()

> **convexHull**(`collection`, `options`): `null` \| [`Polygon`](../classes/Polygon.md) \| [`MultiPolygon`](../classes/MultiPolygon.md)

Computes the convex hull from a collection using
Andrew's monotone chain algorithm. If the hull polygon
crosses the antimeridian, then the resulting collection will
contain a multipolygon.

## Parameters

| Parameter    | theme_type                                                                                                                                                                                                                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../classes/FeatureCollection.md)\<[`AreaObject`](../type-aliases/AreaObject.md), `string`\> \| [`FeatureCollection`](../classes/FeatureCollection.md)\<[`LineObject`](../type-aliases/LineObject.md), `string`\> \| [`FeatureCollection`](../classes/FeatureCollection.md)\<[`PointObject`](../type-aliases/PointObject.md), `string`\> |
| `options`    | [`CirclesToPolygonsOptions`](../interfaces/CirclesToPolygonsOptions.md)                                                                                                                                                                                                                                                                                       |

## Returns

`null` \| [`Polygon`](../classes/Polygon.md) \| [`MultiPolygon`](../classes/MultiPolygon.md)
