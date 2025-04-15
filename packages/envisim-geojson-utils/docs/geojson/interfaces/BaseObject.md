[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [geojson](../README.md) / BaseObject

# Interface: BaseObject\<T, C\>

## Extends

- [`GeoJsonObject`](GeoJsonObject.md)\<`T`\>

## Extended by

- [`Circle`](Circle.md)
- [`MultiCircle`](MultiCircle.md)

## Type Parameters

| Type Parameter         |
| ---------------------- |
| `T` _extends_ `string` |
| `C`                    |

## Properties

| Property                               | Type                              | Inherited from                                                      |
| -------------------------------------- | --------------------------------- | ------------------------------------------------------------------- |
| <a id="bbox"></a> `bbox?`              | [`BBox`](../type-aliases/BBox.md) | [`GeoJsonObject`](GeoJsonObject.md).[`bbox`](GeoJsonObject.md#bbox) |
| <a id="coordinates"></a> `coordinates` | `C`                               | -                                                                   |
| <a id="type"></a> `type`               | `T`                               | [`GeoJsonObject`](GeoJsonObject.md).[`type`](GeoJsonObject.md#type) |
