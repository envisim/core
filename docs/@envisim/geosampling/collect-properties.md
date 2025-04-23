[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geosampling](README.md) / collect-properties

# collect-properties

## Functions

### collectProperties()

> **collectProperties**\<`PF`, `PB`, `GF`\>(`frame`, `base`, `properties`): [`FeatureCollection`](../geojson.md#featurecollection)\<`GF`, `string` \| `PF`\>

Collect properties to a frame layer from a base layer, given an
array of properties to be collected. Categorical properties are collected as
multiple numerical properties, one for each category.

#### Type Parameters

| Type Parameter                                          |
| ------------------------------------------------------- |
| `PF` _extends_ `string`                                 |
| `PB` _extends_ `string`                                 |
| `GF` _extends_ [`PureObject`](../geojson.md#pureobject) |

#### Parameters

| Parameter    | theme_type                                                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `frame`      | [`FeatureCollection`](../geojson.md#featurecollection)\<`GF`, `PF`\>                                                         |
| `base`       | [`FeatureCollection`](../geojson.md#featurecollection)\<[`RetractingObject`](../geojson.md#retractingobject)\<`GF`\>, `PB`\> |
| `properties` | [`PropertyRecord`](../geojson.md#propertyrecord-1)\<`PB`\> \| `PB`[]                                                         |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)\<`GF`, `string` \| `PF`\>

collection

---

### collectPropertyRecord()

> **collectPropertyRecord**\<`P`\>(`propertyRecord`, `properties`): [`PropertyRecord`](../geojson.md#propertyrecord-1)\<`string`\>

Derives the resulting property record of collected properties.
This property record needs to be merged with the existing
property record for a complete record of properties available
after a collect operation. Merge is done automatically when
using collectProperties.

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter        | theme_type                                                | theme_description                     |
| ---------------- | --------------------------------------------------------- | ------------------------------------- |
| `propertyRecord` | [`PropertyRecord`](../geojson.md#propertyrecord-1)\<`P`\> | the property record to collect from.  |
| `properties`     | `P`[]                                                     | the ids of the properties to collect. |

#### Returns

[`PropertyRecord`](../geojson.md#propertyrecord-1)\<`string`\>

the property record collected properties.
