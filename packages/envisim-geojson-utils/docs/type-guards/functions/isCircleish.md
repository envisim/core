[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [type-guards](../README.md) / isCircleish

# Function: isCircleish()

> **isCircleish**(`obj`, `checkPositiveRadius`): obj is Circle \| MultiCircle

## Parameters

| Parameter             | Type                                                                 | Default value |
| --------------------- | -------------------------------------------------------------------- | ------------- |
| `obj`                 | [`SingleTypeObject`](../../geojson/type-aliases/SingleTypeObject.md) | `undefined`   |
| `checkPositiveRadius` | `boolean`                                                            | `false`       |

## Returns

obj is Circle \| MultiCircle

`true` if `obj` can be narrowed to `GJ.Circle | GJ.MultiCircle`.
