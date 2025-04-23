[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [sample-continuous](../README.md) / sampleSystematicDistanceLines

# Function: sampleSystematicDistanceLines()

> **sampleSystematicDistanceLines**(`collection`, `options`): `FeatureCollection`\<`Point`\>

Distance sampling with line transects.
Selects a line sample on an area frame and collect point objects from a base
layer using a detection function to (randomly) determine inclusion.

## Parameters

| Parameter    | theme_type                                                                                      |
| ------------ | ----------------------------------------------------------------------------------------------- |
| `collection` | `FeatureCollection`\<`AreaObject`\>                                                             |
| `options`    | [`SampleSystematicDistanceLinesOptions`](../interfaces/SampleSystematicDistanceLinesOptions.md) |

## Returns

`FeatureCollection`\<`Point`\>
