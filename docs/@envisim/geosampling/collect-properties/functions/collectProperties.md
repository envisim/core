[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [collect-properties](../README.md) / collectProperties

# Function: collectProperties()

> **collectProperties**\<`PF`, `PB`, `GF`\>(`frame`, `base`, `properties`): `FeatureCollection`\<`GF`, `string` \| `PF`\>

Collect properties to a frame layer from a base layer, given an
array of properties to be collected. Categorical properties are collected as
multiple numerical properties, one for each category.

## Type Parameters

| Type Parameter              |
| --------------------------- |
| `PF` _extends_ `string`     |
| `PB` _extends_ `string`     |
| `GF` _extends_ `PureObject` |

## Parameters

| Parameter    | theme_type                                              |
| ------------ | ------------------------------------------------------- |
| `frame`      | `FeatureCollection`\<`GF`, `PF`\>                       |
| `base`       | `FeatureCollection`\<`RetractingObject`\<`GF`\>, `PB`\> |
| `properties` | `PropertyRecord`\<`PB`\> \| `PB`[]                      |

## Returns

`FeatureCollection`\<`GF`, `string` \| `PF`\>

collection
