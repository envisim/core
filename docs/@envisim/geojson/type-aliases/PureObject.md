[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / PureObject

# Type Alias: PureObject\<T\>

> **PureObject**\<`T`\> = `T` _extends_ [`AreaObject`](AreaObject.md) ? `T` : `T` _extends_ [`LineObject`](LineObject.md) ? `T` : `T` _extends_ [`PointObject`](PointObject.md) ? `T` : `never`

## Type Parameters

| Type Parameter                                                                                                  | theme_default_type                                                                                |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `T` _extends_ [`AreaObject`](AreaObject.md) \| [`LineObject`](LineObject.md) \| [`PointObject`](PointObject.md) | [`AreaObject`](AreaObject.md) \| [`LineObject`](LineObject.md) \| [`PointObject`](PointObject.md) |
