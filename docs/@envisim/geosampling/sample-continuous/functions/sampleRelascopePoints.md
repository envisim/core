[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [sample-continuous](../README.md) / sampleRelascopePoints

# Function: sampleRelascopePoints()

> **sampleRelascopePoints**\<`P`\>(`collection`, `options`): `object`

Selects a point sample on an area frame and collect point objects from a base
layer using a relascope to determine inclusion. A buffer is needed for unbiased
estimation. The buffer should be set to the largest radius of the inclusion zones.
The largest radius depends on maximum value of sizeProperty and the factor of
the relascope, according to max(radius) = (50 \* max(sizePropertyValue)) / sqrt(factor).
Default buffer is zero, which gives a negative bias for estimates of positive
quantities.

## Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

## Parameters

| Parameter    | theme_type                                                                             |
| ------------ | -------------------------------------------------------------------------------------- |
| `collection` | `FeatureCollection`\<`AreaObject`\>                                                    |
| `options`    | [`SampleRelascopePointsOptions`](../interfaces/SampleRelascopePointsOptions.md)\<`P`\> |

## Returns

`object`

an object containing the resulting sample, the relascope points and the area ratio

| theme_name    | theme_type                          |
| ------------- | ----------------------------------- |
| `areaRatio`   | `number`                            |
| `collection`  | `FeatureCollection`\<`Point`, `P`\> |
| `pointSample` | `FeatureCollection`\<`Point`\>      |
