[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / PrimitiveOfObject

# Type Alias: PrimitiveOfObject\<T\>

> **PrimitiveOfObject**\<`T`\> = `T` _extends_ [`AreaObject`](AreaObject.md) ? `GeometricPrimitiveArea` : `T` _extends_ [`LineObject`](LineObject.md) ? `GeometricPrimitiveLine` : `T` _extends_ [`PointObject`](PointObject.md) ? `GeometricPrimitivePoint` : `GeometricPrimitiveNone`

## Type Parameters

| Type Parameter                                                                                                  |
| --------------------------------------------------------------------------------------------------------------- |
| `T` _extends_ [`AreaObject`](AreaObject.md) \| [`LineObject`](LineObject.md) \| [`PointObject`](PointObject.md) |
