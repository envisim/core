[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [type-guards](../README.md) / isBaseFeature

# Function: isBaseFeature()

## Call Signature

> **isBaseFeature**(`obj`, `checkCoordinates`, `allowGC`): `obj is BaseFeature<SingleTypeObject, unknown>`

Defined in: type-guards/feature.ts:11

### Parameters

#### obj

`unknown`

#### checkCoordinates

`boolean`

checks the validity of `obj.geometry.coordinates` if `true`, otherwise
just checks for the existance of `obj.geometry.coordinates`.

#### allowGC

`false`

if `false`, disallowes the existance of `GJ.BaseGeometryCollection` on
`obj.geometry`

### Returns

`obj is BaseFeature<SingleTypeObject, unknown>`

`true` if `obj` can be narrowed to `GJ.BaseFeature`.

## Call Signature

> **isBaseFeature**(`obj`, `checkCoordinates?`, `allowGC?`): `obj is BaseFeature<BaseGeometry, unknown>`

Defined in: type-guards/feature.ts:16

### Parameters

#### obj

`unknown`

#### checkCoordinates?

`boolean`

checks the validity of `obj.geometry.coordinates` if `true`, otherwise
just checks for the existance of `obj.geometry.coordinates`.

#### allowGC?

`boolean`

if `false`, disallowes the existance of `GJ.BaseGeometryCollection` on
`obj.geometry`

### Returns

`obj is BaseFeature<BaseGeometry, unknown>`

`true` if `obj` can be narrowed to `GJ.BaseFeature`.
