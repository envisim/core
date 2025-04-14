[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [geojson](../README.md) / BaseFeatureCollection

# Interface: BaseFeatureCollection\<F\>

Defined in: geojson.ts:75

## Extends

- [`GeoJsonObject`](GeoJsonObject.md)\<`"FeatureCollection"`\>

## Type Parameters

### F

`F` _extends_ [`BaseFeature`](BaseFeature.md) = [`BaseFeature`](BaseFeature.md)

## Properties

### bbox?

> `optional` **bbox**: [`BBox`](../type-aliases/BBox.md)

Defined in: geojson.ts:15

#### Inherited from

[`GeoJsonObject`](GeoJsonObject.md).[`bbox`](GeoJsonObject.md#bbox)

---

### features

> **features**: `F`[]

Defined in: geojson.ts:77

---

### type

> **type**: `"FeatureCollection"`

Defined in: geojson.ts:14

#### Inherited from

[`GeoJsonObject`](GeoJsonObject.md).[`type`](GeoJsonObject.md#type)
