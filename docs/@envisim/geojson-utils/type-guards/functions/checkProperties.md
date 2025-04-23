[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geojson-utils](../../README.md) / [type-guards](../README.md) / checkProperties

# Function: checkProperties()

> **checkProperties**(`obj`): obj is BaseFeature\<BaseGeometry, string \| number\>

## Parameters

| Parameter | theme_type                                               |
| --------- | -------------------------------------------------------- |
| `obj`     | [`BaseFeature`](../../geojson/interfaces/BaseFeature.md) |

## Returns

obj is BaseFeature\<BaseGeometry, string \| number\>

`true` if `obj.properties` is either `null` or an object with `string|number` values.
