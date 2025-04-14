[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [type-guards](../README.md) / checkProperties

# Function: checkProperties()

> **checkProperties**(`obj`): obj is BaseFeature\<BaseGeometry, string \| number\>

Defined in: type-guards/feature.ts:53

## Parameters

### obj

[`BaseFeature`](../../geojson/interfaces/BaseFeature.md)

## Returns

obj is BaseFeature\<BaseGeometry, string \| number\>

`true` if `obj.properties` is either `null` or an object with `string|number` values.
