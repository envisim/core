[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [type-guards](../README.md) / isBaseCollection

# Function: isBaseCollection()

## Call Signature

> **isBaseCollection**(`obj`, `checkCoordinates`, `allowGC`): `obj is BaseFeatureCollection<BaseFeature<SingleTypeObject, unknown>>`

Defined in: type-guards/collection.ts:11

### Parameters

#### obj

`unknown`

#### checkCoordinates

`boolean`

if `true`, checks the validity of the `coordinates` property on every
geometry in the collection, otherwise only checks for the existance of the `coordinates` property
on every geometry in the collection.

#### allowGC

`false`

if `false`, disallowes the existance of `GJ.BaseGeometryCollection` as a geometry

### Returns

`obj is BaseFeatureCollection<BaseFeature<SingleTypeObject, unknown>>`

`true` if `obj` can be narrowed to `GJ.BaseFeatureCollection`.

## Call Signature

> **isBaseCollection**(`obj`, `checkCoordinates?`, `allowGC?`): `obj is BaseFeatureCollection<BaseFeature<BaseGeometry, unknown>>`

Defined in: type-guards/collection.ts:16

### Parameters

#### obj

`unknown`

#### checkCoordinates?

`boolean`

if `true`, checks the validity of the `coordinates` property on every
geometry in the collection, otherwise only checks for the existance of the `coordinates` property
on every geometry in the collection.

#### allowGC?

`boolean`

if `false`, disallowes the existance of `GJ.BaseGeometryCollection` as a geometry

### Returns

`obj is BaseFeatureCollection<BaseFeature<BaseGeometry, unknown>>`

`true` if `obj` can be narrowed to `GJ.BaseFeatureCollection`.
