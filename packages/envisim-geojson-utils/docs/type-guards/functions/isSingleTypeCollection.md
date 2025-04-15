[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [type-guards](../README.md) / isSingleTypeCollection

# Function: isSingleTypeCollection()

> **isSingleTypeCollection**(`obj`, `checkCoordinates`): `obj is BaseFeatureCollection<BaseFeature<SingleTypeObject, unknown>>`

## Parameters

| Parameter          | Type      | Default value |
| ------------------ | --------- | ------------- |
| `obj`              | `unknown` | `undefined`   |
| `checkCoordinates` | `boolean` | `false`       |

## Returns

`obj is BaseFeatureCollection<BaseFeature<SingleTypeObject, unknown>>`

`true` if `obj` can be narrowed to
`GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, unknown>>`.
