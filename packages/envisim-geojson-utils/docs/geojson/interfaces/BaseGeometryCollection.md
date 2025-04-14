[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [geojson](../README.md) / BaseGeometryCollection

# Interface: BaseGeometryCollection\<G\>

Defined in: geojson.ts:47

## Extends

- [`GeoJsonObject`](GeoJsonObject.md)\<`"GeometryCollection"`\>

## Type Parameters

### G

`G` _extends_ [`BaseGeometry`](../type-aliases/BaseGeometry.md) = [`BaseGeometry`](../type-aliases/BaseGeometry.md)

## Properties

### bbox?

> `optional` **bbox**: [`BBox`](../type-aliases/BBox.md)

Defined in: geojson.ts:15

#### Inherited from

[`GeoJsonObject`](GeoJsonObject.md).[`bbox`](GeoJsonObject.md#bbox)

---

### geometries

> **geometries**: `G`[]

Defined in: geojson.ts:49

---

### type

> **type**: `"GeometryCollection"`

Defined in: geojson.ts:14

#### Inherited from

[`GeoJsonObject`](GeoJsonObject.md).[`type`](GeoJsonObject.md#type)
