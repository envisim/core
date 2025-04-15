[**@envisim/geosampling**](README.md)

---

[@envisim/geosampling]() / collect-properties

# @envisim/geosampling

## Functions

### collectProperties()

> **collectProperties**\<`PF`, `PB`, `GF`\>(`frame`, `base`, `properties`): `FeatureCollection`\<`GF`, `string` \| `PF`\>

Collect properties to a frame layer from a base layer, given an
array of properties to be collected. Categorical properties are collected as
multiple numerical properties, one for each category.

#### Type Parameters

| Type Parameter              |
| --------------------------- |
| `PF` _extends_ `string`     |
| `PB` _extends_ `string`     |
| `GF` _extends_ `PureObject` |

#### Parameters

| Parameter    | Type                                                    | Description |
| ------------ | ------------------------------------------------------- | ----------- |
| `frame`      | `FeatureCollection`\<`GF`, `PF`\>                       |             |
| `base`       | `FeatureCollection`\<`RetractingObject`\<`GF`\>, `PB`\> |             |
| `properties` | `PropertyRecord`\<`PB`\> \| `PB`[]                      |             |

#### Returns

`FeatureCollection`\<`GF`, `string` \| `PF`\>

collection

---

### collectPropertyRecord()

> **collectPropertyRecord**\<`P`\>(`propertyRecord`, `properties`): `PropertyRecord`\<`string`\>

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

| Parameter        | Type                    | Description                           |
| ---------------- | ----------------------- | ------------------------------------- |
| `propertyRecord` | `PropertyRecord`\<`P`\> | the property record to collect from.  |
| `properties`     | `P`[]                   | the ids of the properties to collect. |

#### Returns

`PropertyRecord`\<`string`\>

the property record collected properties.
