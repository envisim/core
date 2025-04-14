[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [type-guards](../README.md) / isUniformCollection

# Function: isUniformCollection()

> **isUniformCollection**(`obj`): obj is BaseFeatureCollection\<BaseFeature\<SingleTypeObject, string \| number\>\>

Defined in: type-guards/collection.ts:47

## Parameters

### obj

[`BaseFeatureCollection`](../../geojson/interfaces/BaseFeatureCollection.md)\<[`BaseFeature`](../../geojson/interfaces/BaseFeature.md)\<[`SingleTypeObject`](../../geojson/type-aliases/SingleTypeObject.md), `unknown`\>\>

## Returns

obj is BaseFeatureCollection\<BaseFeature\<SingleTypeObject, string \| number\>\>

`true` if `obj` can be narrowed to a FeatureCollection with uniform properties, i.e. a
FeatureCollection where every feature has exactly the same property object.
