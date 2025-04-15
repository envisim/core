[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [type-guards](../README.md) / isSingleTypeFeature

# Function: isSingleTypeFeature()

> **isSingleTypeFeature**(`obj`, `checkCoordinates`): `obj is BaseFeature<SingleTypeObject, unknown>`

## Parameters

| Parameter          | Type      | Default value |
| ------------------ | --------- | ------------- |
| `obj`              | `unknown` | `undefined`   |
| `checkCoordinates` | `boolean` | `false`       |

## Returns

`obj is BaseFeature<SingleTypeObject, unknown>`

`true` if `obj` can be narrowed to `GJ.BaseFeature<GJ.SingleTypeObject, unknown>`.
