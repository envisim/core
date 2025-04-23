[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / ObjectOfPrimitive

# Type Alias: ObjectOfPrimitive\<T\>

> **ObjectOfPrimitive**\<`T`\> = `T` _extends_ `GeometricPrimitiveArea` ? [`AreaObject`](AreaObject.md) : `T` _extends_ `GeometricPrimitiveLine` ? [`LineObject`](LineObject.md) : `T` _extends_ `GeometricPrimitivePoint` ? [`PointObject`](PointObject.md) : `never`

## Type Parameters

| Type Parameter                          |
| --------------------------------------- |
| `T` _extends_ `GeometricPrimitiveUnion` |
