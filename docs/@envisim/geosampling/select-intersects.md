[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geosampling](README.md) / select-intersects

# select-intersects

## Functions

### selectAreaintersectsArea()

> **selectAreaintersectsArea**\<`P`\>(`frame`, `base`): [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject), `P`\>

Select intersect of features as the new frame from base-collection.

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | Type                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------- |
| `frame`   | [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject)\>      |
| `base`    | [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject), `P`\> |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject), `P`\>

---

### selectAreaintersectsLine()

> **selectAreaintersectsLine**\<`P`\>(`frame`, `base`): [`FeatureCollection`](../geojson.md#featurecollection)\<[`LineObject`](../geojson.md#lineobject), `P`\>

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | Type                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------- |
| `frame`   | [`FeatureCollection`](../geojson.md#featurecollection)\<[`LineObject`](../geojson.md#lineobject)\>      |
| `base`    | [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject), `P`\> |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)\<[`LineObject`](../geojson.md#lineobject), `P`\>

---

### selectAreaintersectsPoint()

> **selectAreaintersectsPoint**\<`P`\>(`frame`, `base`): [`FeatureCollection`](../geojson.md#featurecollection)\<[`PointObject`](../geojson.md#pointobject), `P`\>

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | Type                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------- |
| `frame`   | [`FeatureCollection`](../geojson.md#featurecollection)\<[`PointObject`](../geojson.md#pointobject)\>    |
| `base`    | [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject), `P`\> |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)\<[`PointObject`](../geojson.md#pointobject), `P`\>

---

### selectLineintersectsArea()

> **selectLineintersectsArea**\<`P`\>(`frame`, `base`): [`FeatureCollection`](../geojson.md#featurecollection)\<[`LineObject`](../geojson.md#lineobject), `P`\>

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | Type                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------- |
| `frame`   | [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject)\>      |
| `base`    | [`FeatureCollection`](../geojson.md#featurecollection)\<[`LineObject`](../geojson.md#lineobject), `P`\> |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)\<[`LineObject`](../geojson.md#lineobject), `P`\>

---

### selectPointintersectsArea()

> **selectPointintersectsArea**\<`P`\>(`frame`, `base`): [`FeatureCollection`](../geojson.md#featurecollection)\<[`PointObject`](../geojson.md#pointobject), `P`\>

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | Type                                                                                                      |
| --------- | --------------------------------------------------------------------------------------------------------- |
| `frame`   | [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject)\>        |
| `base`    | [`FeatureCollection`](../geojson.md#featurecollection)\<[`PointObject`](../geojson.md#pointobject), `P`\> |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)\<[`PointObject`](../geojson.md#pointobject), `P`\>
