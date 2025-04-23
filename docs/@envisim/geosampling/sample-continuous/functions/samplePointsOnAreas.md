[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [sample-continuous](../README.md) / samplePointsOnAreas

# Function: samplePointsOnAreas()

> **samplePointsOnAreas**(`collection`, `options`): `FeatureCollection`\<`Point`, `never`\>

Selects points on areas (if features have bbox, it is used in pointInPolygon
to reject point outside bbox if buffer is zero).

## Parameters

| Parameter    | theme_type                                                                  |
| ------------ | --------------------------------------------------------------------------- |
| `collection` | `FeatureCollection`\<`AreaObject`\>                                         |
| `options`    | [`SamplePointsOnAreasOptions`](../interfaces/SamplePointsOnAreasOptions.md) |

## Returns

`FeatureCollection`\<`Point`, `never`\>
