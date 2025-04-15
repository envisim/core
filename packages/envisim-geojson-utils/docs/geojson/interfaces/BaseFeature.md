[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [geojson](../README.md) / BaseFeature

# Interface: BaseFeature\<G, P\>

## Extends

- [`GeoJsonObject`](GeoJsonObject.md)\<`"Feature"`\>

## Type Parameters

| Type Parameter                                                            | Default type                                      |
| ------------------------------------------------------------------------- | ------------------------------------------------- |
| `G` _extends_ [`BaseGeometry`](../type-aliases/BaseGeometry.md) \| `null` | [`BaseGeometry`](../type-aliases/BaseGeometry.md) |
| `P`                                                                       | `unknown`                                         |

## Properties

| Property                             | Type                                                                                   | Inherited from                                                      |
| ------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| <a id="bbox"></a> `bbox?`            | [`BBox`](../type-aliases/BBox.md)                                                      | [`GeoJsonObject`](GeoJsonObject.md).[`bbox`](GeoJsonObject.md#bbox) |
| <a id="geometry"></a> `geometry`     | `G`                                                                                    | -                                                                   |
| <a id="properties"></a> `properties` | `null` \| [`FeatureProperties`](../type-aliases/FeatureProperties.md)\<`P`, `string`\> | -                                                                   |
| <a id="type"></a> `type`             | `"Feature"`                                                                            | [`GeoJsonObject`](GeoJsonObject.md).[`type`](GeoJsonObject.md#type) |
