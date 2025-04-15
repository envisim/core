[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [geojson](../README.md) / BaseGeometryCollection

# Interface: BaseGeometryCollection\<G\>

## Extends

- [`GeoJsonObject`](GeoJsonObject.md)\<`"GeometryCollection"`\>

## Type Parameters

| Type Parameter                                                  | Default type                                      |
| --------------------------------------------------------------- | ------------------------------------------------- |
| `G` _extends_ [`BaseGeometry`](../type-aliases/BaseGeometry.md) | [`BaseGeometry`](../type-aliases/BaseGeometry.md) |

## Properties

| Property                             | Type                              | Inherited from                                                      |
| ------------------------------------ | --------------------------------- | ------------------------------------------------------------------- |
| <a id="bbox"></a> `bbox?`            | [`BBox`](../type-aliases/BBox.md) | [`GeoJsonObject`](GeoJsonObject.md).[`bbox`](GeoJsonObject.md#bbox) |
| <a id="geometries"></a> `geometries` | `G`[]                             | -                                                                   |
| <a id="type"></a> `type`             | `"GeometryCollection"`            | [`GeoJsonObject`](GeoJsonObject.md).[`type`](GeoJsonObject.md#type) |
