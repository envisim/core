[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [sample-continuous](../README.md) / sampleDistancePoints

# Function: sampleDistancePoints()

> **sampleDistancePoints**(`collection`, `options`): `FeatureCollection`\<`PointObject`\>

Distance sampling with points. Selects a point sample on an area layer
and collect point objects from a base layer using a detection function
to (randomly) determine inclusion.

## Parameters

| Parameter    | theme_type                                                                      |
| ------------ | ------------------------------------------------------------------------------- |
| `collection` | `FeatureCollection`\<`AreaObject`\>                                             |
| `options`    | [`SampleDistancePointsOptions`](../type-aliases/SampleDistancePointsOptions.md) |

## Returns

`FeatureCollection`\<`PointObject`\>
