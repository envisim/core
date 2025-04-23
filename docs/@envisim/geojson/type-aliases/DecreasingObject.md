[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / DecreasingObject

# Type Alias: DecreasingObject\<G\>

> **DecreasingObject**\<`G`\> = `G` _extends_ [`AreaObject`](AreaObject.md) ? [`PureObject`](PureObject.md) : `G` _extends_ [`LineObject`](LineObject.md) ? [`PureObject`](PureObject.md)\<[`LineObject`](LineObject.md) \| [`PointObject`](PointObject.md)\> : `G` _extends_ [`PointObject`](PointObject.md) ? [`PointObject`](PointObject.md) : `never`

## Type Parameters

| Type Parameter                              |
| ------------------------------------------- |
| `G` _extends_ [`PureObject`](PureObject.md) |
