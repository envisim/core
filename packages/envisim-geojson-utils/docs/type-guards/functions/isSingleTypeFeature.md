[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [type-guards](../README.md) / isSingleTypeFeature

# Function: isSingleTypeFeature()

> **isSingleTypeFeature**(`obj`, `checkCoordinates`): `obj is BaseFeature<SingleTypeObject, unknown>`

Defined in: type-guards/feature.ts:43

## Parameters

### obj

`unknown`

### checkCoordinates

`boolean` = `false`

## Returns

`obj is BaseFeature<SingleTypeObject, unknown>`

`true` if `obj` can be narrowed to `GJ.BaseFeature<GJ.SingleTypeObject, unknown>`.
