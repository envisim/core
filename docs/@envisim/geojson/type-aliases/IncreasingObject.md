[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / IncreasingObject

# Type Alias: IncreasingObject\<G\>

> **IncreasingObject**\<`G`\> = `G` _extends_ [`AreaObject`](AreaObject.md) ? [`AreaObject`](AreaObject.md) : `G` _extends_ [`LineObject`](LineObject.md) ? [`PureObject`](PureObject.md)\<[`AreaObject`](AreaObject.md) \| [`LineObject`](LineObject.md)\> : `G` _extends_ [`PointObject`](PointObject.md) ? [`PureObject`](PureObject.md) : `never`

## Type Parameters

| Type Parameter                              |
| ------------------------------------------- |
| `G` _extends_ [`PureObject`](PureObject.md) |
