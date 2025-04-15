[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [geojson](../README.md) / BaseFeatureCollection

# Interface: BaseFeatureCollection\<F\>

## Extends

- [`GeoJsonObject`](GeoJsonObject.md)\<`"FeatureCollection"`\>

## Type Parameters

| Type Parameter                                | Default type                    |
| --------------------------------------------- | ------------------------------- |
| `F` _extends_ [`BaseFeature`](BaseFeature.md) | [`BaseFeature`](BaseFeature.md) |

## Properties

| Property                         | Type                              | Inherited from                                                      |
| -------------------------------- | --------------------------------- | ------------------------------------------------------------------- |
| <a id="bbox"></a> `bbox?`        | [`BBox`](../type-aliases/BBox.md) | [`GeoJsonObject`](GeoJsonObject.md).[`bbox`](GeoJsonObject.md#bbox) |
| <a id="features"></a> `features` | `F`[]                             | -                                                                   |
| <a id="type"></a> `type`         | `"FeatureCollection"`             | [`GeoJsonObject`](GeoJsonObject.md).[`type`](GeoJsonObject.md#type) |
