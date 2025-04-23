[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / RetractingObject

# Type Alias: RetractingObject\<G\>

> **RetractingObject**\<`G`\> = `G` _extends_ [`AreaObject`](AreaObject.md) ? [`PureObject`](PureObject.md) : `G` _extends_ [`LineObject`](LineObject.md) ? [`PureObject`](PureObject.md)\<[`AreaObject`](AreaObject.md) \| [`LineObject`](LineObject.md)\> : `G` _extends_ [`PointObject`](PointObject.md) ? [`AreaObject`](AreaObject.md) : `never`

## Type Parameters

| Type Parameter                              |
| ------------------------------------------- |
| `G` _extends_ [`PureObject`](PureObject.md) |
