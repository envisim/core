[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [type-guards](../README.md) / checkProperties

# Function: checkProperties()

> **checkProperties**(`obj`): obj is BaseFeature\<BaseGeometry, string \| number\>

## Parameters

| Parameter | Type                                                     |
| --------- | -------------------------------------------------------- |
| `obj`     | [`BaseFeature`](../../geojson/interfaces/BaseFeature.md) |

## Returns

obj is BaseFeature\<BaseGeometry, string \| number\>

`true` if `obj.properties` is either `null` or an object with `string|number` values.
