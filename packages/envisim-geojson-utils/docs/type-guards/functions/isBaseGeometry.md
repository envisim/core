[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [type-guards](../README.md) / isBaseGeometry

# Function: isBaseGeometry()

## Call Signature

> **isBaseGeometry**(`obj`, `checkCoordinates`, `allowGC`): `obj is SingleTypeObject`

Defined in: type-guards/objects.ts:62

### Parameters

#### obj

`unknown`

#### checkCoordinates

`boolean`

checks the validity of the `coordinates` property if `true`, otherwise
just checks for the existance of the `coordinates` property.

#### allowGC

`false`

if `false`, disallowes the existance of `GJ.BaseGeometryCollection` on `obj`

### Returns

`obj is SingleTypeObject`

`true` if `obj` can be narrowed to `GJ.BaseGeometry`.

## Call Signature

> **isBaseGeometry**(`obj`, `checkCoordinates?`, `allowGC?`): `obj is BaseGeometry`

Defined in: type-guards/objects.ts:67

### Parameters

#### obj

`unknown`

#### checkCoordinates?

`boolean`

checks the validity of the `coordinates` property if `true`, otherwise
just checks for the existance of the `coordinates` property.

#### allowGC?

`boolean`

if `false`, disallowes the existance of `GJ.BaseGeometryCollection` on `obj`

### Returns

`obj is BaseGeometry`

`true` if `obj` can be narrowed to `GJ.BaseGeometry`.
