[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geojson-utils](../../README.md) / [geojson](../README.md) / BaseFeatureCollection

# Interface: BaseFeatureCollection\<F\>

## theme_extends

- [`GeoJsonObject`](GeoJsonObject.md)\<`"FeatureCollection"`\>

## Type Parameters

| Type Parameter                                | theme_default_type              |
| --------------------------------------------- | ------------------------------- |
| `F` _extends_ [`BaseFeature`](BaseFeature.md) | [`BaseFeature`](BaseFeature.md) |

## Properties

| Property                         | theme_type                        |
| -------------------------------- | --------------------------------- |
| <a id="bbox"></a> `bbox?`        | [`BBox`](../type-aliases/BBox.md) |
| <a id="features"></a> `features` | `F`[]                             |
| <a id="type"></a> `type`         | `"FeatureCollection"`             |
