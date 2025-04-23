[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geojson-utils](../../README.md) / [geojson](../README.md) / BaseFeature

# Interface: BaseFeature\<G, P\>

## theme_extends

- [`GeoJsonObject`](GeoJsonObject.md)\<`"Feature"`\>

## Type Parameters

| Type Parameter                                                            | theme_default_type                                |
| ------------------------------------------------------------------------- | ------------------------------------------------- |
| `G` _extends_ [`BaseGeometry`](../type-aliases/BaseGeometry.md) \| `null` | [`BaseGeometry`](../type-aliases/BaseGeometry.md) |
| `P`                                                                       | `unknown`                                         |

## Properties

| Property                             | theme_type                                                                             |
| ------------------------------------ | -------------------------------------------------------------------------------------- |
| <a id="bbox"></a> `bbox?`            | [`BBox`](../type-aliases/BBox.md)                                                      |
| <a id="geometry"></a> `geometry`     | `G`                                                                                    |
| <a id="properties"></a> `properties` | `null` \| [`FeatureProperties`](../type-aliases/FeatureProperties.md)\<`P`, `string`\> |
| <a id="type"></a> `type`             | `"Feature"`                                                                            |
