[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geojson-utils](../../README.md) / [type-guards](../README.md) / isCircleish

# Function: isCircleish()

> **isCircleish**(`obj`, `checkPositiveRadius`): obj is Circle \| MultiCircle

## Parameters

| Parameter             | theme_type                                                           | theme_default_value |
| --------------------- | -------------------------------------------------------------------- | ------------------- |
| `obj`                 | [`SingleTypeObject`](../../geojson/type-aliases/SingleTypeObject.md) | `undefined`         |
| `checkPositiveRadius` | `boolean`                                                            | `false`             |

## Returns

obj is Circle \| MultiCircle

`true` if `obj` can be narrowed to `GJ.Circle | GJ.MultiCircle`.
