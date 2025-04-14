[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [type-guards](../README.md) / isCircleish

# Function: isCircleish()

> **isCircleish**(`obj`, `checkPositiveRadius`): obj is Circle \| MultiCircle

Defined in: type-guards/objects.ts:45

## Parameters

### obj

[`SingleTypeObject`](../../geojson/type-aliases/SingleTypeObject.md)

### checkPositiveRadius

`boolean` = `false`

## Returns

obj is Circle \| MultiCircle

`true` if `obj` can be narrowed to `GJ.Circle | GJ.MultiCircle`.
