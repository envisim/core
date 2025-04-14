[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [geojson](../README.md) / BaseFeature

# Interface: BaseFeature\<G, P\>

Defined in: geojson.ts:64

## Extends

- [`GeoJsonObject`](GeoJsonObject.md)\<`"Feature"`\>

## Type Parameters

### G

`G` _extends_ [`BaseGeometry`](../type-aliases/BaseGeometry.md) \| `null` = [`BaseGeometry`](../type-aliases/BaseGeometry.md)

### P

`P` = `unknown`

## Properties

### bbox?

> `optional` **bbox**: [`BBox`](../type-aliases/BBox.md)

Defined in: geojson.ts:15

#### Inherited from

[`GeoJsonObject`](GeoJsonObject.md).[`bbox`](GeoJsonObject.md#bbox)

---

### geometry

> **geometry**: `G`

Defined in: geojson.ts:66

---

### properties

> **properties**: `null` \| [`FeatureProperties`](../type-aliases/FeatureProperties.md)\<`P`, `string`\>

Defined in: geojson.ts:67

---

### type

> **type**: `"Feature"`

Defined in: geojson.ts:14

#### Inherited from

[`GeoJsonObject`](GeoJsonObject.md).[`type`](GeoJsonObject.md#type)
