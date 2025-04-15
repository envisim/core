[**@envisim/geosampling**](README.md)

---

[@envisim/geosampling]() / select-intersects

# @envisim/geosampling

## Functions

### selectAreaintersectsArea()

> **selectAreaintersectsArea**\<`P`\>(`frame`, `base`): `FeatureCollection`\<`AreaObject`, `P`\>

Select intersect of features as the new frame from base-collection.

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | Type                                     | Description |
| --------- | ---------------------------------------- | ----------- |
| `frame`   | `FeatureCollection`\<`AreaObject`\>      |             |
| `base`    | `FeatureCollection`\<`AreaObject`, `P`\> |             |

#### Returns

`FeatureCollection`\<`AreaObject`, `P`\>

---

### selectAreaintersectsLine()

> **selectAreaintersectsLine**\<`P`\>(`frame`, `base`): `FeatureCollection`\<`LineObject`, `P`\>

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | Type                                     |
| --------- | ---------------------------------------- |
| `frame`   | `FeatureCollection`\<`LineObject`\>      |
| `base`    | `FeatureCollection`\<`AreaObject`, `P`\> |

#### Returns

`FeatureCollection`\<`LineObject`, `P`\>

---

### selectAreaintersectsPoint()

> **selectAreaintersectsPoint**\<`P`\>(`frame`, `base`): `FeatureCollection`\<`PointObject`, `P`\>

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | Type                                     |
| --------- | ---------------------------------------- |
| `frame`   | `FeatureCollection`\<`PointObject`\>     |
| `base`    | `FeatureCollection`\<`AreaObject`, `P`\> |

#### Returns

`FeatureCollection`\<`PointObject`, `P`\>

---

### selectLineintersectsArea()

> **selectLineintersectsArea**\<`P`\>(`frame`, `base`): `FeatureCollection`\<`LineObject`, `P`\>

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | Type                                     |
| --------- | ---------------------------------------- |
| `frame`   | `FeatureCollection`\<`AreaObject`\>      |
| `base`    | `FeatureCollection`\<`LineObject`, `P`\> |

#### Returns

`FeatureCollection`\<`LineObject`, `P`\>

---

### selectPointintersectsArea()

> **selectPointintersectsArea**\<`P`\>(`frame`, `base`): `FeatureCollection`\<`PointObject`, `P`\>

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | Type                                      |
| --------- | ----------------------------------------- |
| `frame`   | `FeatureCollection`\<`AreaObject`\>       |
| `base`    | `FeatureCollection`\<`PointObject`, `P`\> |

#### Returns

`FeatureCollection`\<`PointObject`, `P`\>
