[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [collect-properties](../README.md) / collectPropertyRecord

# Function: collectPropertyRecord()

> **collectPropertyRecord**\<`P`\>(`propertyRecord`, `properties`): `PropertyRecord`\<`string`\>

Derives the resulting property record of collected properties.
This property record needs to be merged with the existing
property record for a complete record of properties available
after a collect operation. Merge is done automatically when
using collectProperties.

## Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

## Parameters

| Parameter        | theme_type              | theme_description                     |
| ---------------- | ----------------------- | ------------------------------------- |
| `propertyRecord` | `PropertyRecord`\<`P`\> | the property record to collect from.  |
| `properties`     | `P`[]                   | the ids of the properties to collect. |

## Returns

`PropertyRecord`\<`string`\>

the property record collected properties.
