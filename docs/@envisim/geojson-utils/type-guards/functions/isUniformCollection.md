[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geojson-utils](../../README.md) / [type-guards](../README.md) / isUniformCollection

# Function: isUniformCollection()

> **isUniformCollection**(`obj`): obj is BaseFeatureCollection\<BaseFeature\<SingleTypeObject, string \| number\>\>

## Parameters

| Parameter | theme_type                                                                                                                                                                                                                  |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `obj`     | [`BaseFeatureCollection`](../../geojson/interfaces/BaseFeatureCollection.md)\<[`BaseFeature`](../../geojson/interfaces/BaseFeature.md)\<[`SingleTypeObject`](../../geojson/type-aliases/SingleTypeObject.md), `unknown`\>\> |

## Returns

obj is BaseFeatureCollection\<BaseFeature\<SingleTypeObject, string \| number\>\>

`true` if `obj` can be narrowed to a FeatureCollection with uniform properties, i.e. a
FeatureCollection where every feature has exactly the same property object.
