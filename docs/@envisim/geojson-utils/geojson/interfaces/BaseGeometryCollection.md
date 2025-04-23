[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geojson-utils](../../README.md) / [geojson](../README.md) / BaseGeometryCollection

# Interface: BaseGeometryCollection\<G\>

## theme_extends

- [`GeoJsonObject`](GeoJsonObject.md)\<`"GeometryCollection"`\>

## Type Parameters

| Type Parameter                                                  | theme_default_type                                |
| --------------------------------------------------------------- | ------------------------------------------------- |
| `G` _extends_ [`BaseGeometry`](../type-aliases/BaseGeometry.md) | [`BaseGeometry`](../type-aliases/BaseGeometry.md) |

## Properties

| Property                             | theme_type                        |
| ------------------------------------ | --------------------------------- |
| <a id="bbox"></a> `bbox?`            | [`BBox`](../type-aliases/BBox.md) |
| <a id="geometries"></a> `geometries` | `G`[]                             |
| <a id="type"></a> `type`             | `"GeometryCollection"`            |
