[**@envisim/geojson-utils**](README.md)

---

[@envisim/geojson-utils](README.md) / type-guards

# type-guards

## Functions

### checkProperties()

> **checkProperties**(`obj`): obj is BaseFeature\<BaseGeometry, string \| number\>

#### Parameters

| Parameter | Type                                    |
| --------- | --------------------------------------- |
| `obj`     | [`BaseFeature`](geojson.md#basefeature) |

#### Returns

obj is BaseFeature\<BaseGeometry, string \| number\>

`true` if `obj.properties` is either `null` or an object with `string|number` values.

---

### isAreaGeometry()

> **isAreaGeometry**(`obj`): `obj is AreaGeometry`

#### Parameters

| Parameter | Type                                      |
| --------- | ----------------------------------------- |
| `obj`     | [`BaseGeometry`](geojson.md#basegeometry) |

#### Returns

`obj is AreaGeometry`

`true` if `obj` can be narrowed to `GJ.AreaGeometry`.

---

### isBaseCollection()

#### Call Signature

> **isBaseCollection**(`obj`, `checkCoordinates`, `allowGC`): `obj is BaseFeatureCollection<BaseFeature<SingleTypeObject, unknown>>`

##### Parameters

| Parameter          | Type      | Description                                                                                                                                                                                                  |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `obj`              | `unknown` | -                                                                                                                                                                                                            |
| `checkCoordinates` | `boolean` | if `true`, checks the validity of the `coordinates` property on every geometry in the collection, otherwise only checks for the existance of the `coordinates` property on every geometry in the collection. |
| `allowGC`          | `false`   | if `false`, disallowes the existance of `GJ.BaseGeometryCollection` as a geometry                                                                                                                            |

##### Returns

`obj is BaseFeatureCollection<BaseFeature<SingleTypeObject, unknown>>`

`true` if `obj` can be narrowed to `GJ.BaseFeatureCollection`.

#### Call Signature

> **isBaseCollection**(`obj`, `checkCoordinates?`, `allowGC?`): `obj is BaseFeatureCollection<BaseFeature<BaseGeometry, unknown>>`

##### Parameters

| Parameter           | Type      | Description                                                                                                                                                                                                  |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `obj`               | `unknown` | -                                                                                                                                                                                                            |
| `checkCoordinates?` | `boolean` | if `true`, checks the validity of the `coordinates` property on every geometry in the collection, otherwise only checks for the existance of the `coordinates` property on every geometry in the collection. |
| `allowGC?`          | `boolean` | if `false`, disallowes the existance of `GJ.BaseGeometryCollection` as a geometry                                                                                                                            |

##### Returns

`obj is BaseFeatureCollection<BaseFeature<BaseGeometry, unknown>>`

`true` if `obj` can be narrowed to `GJ.BaseFeatureCollection`.

---

### isBaseFeature()

#### Call Signature

> **isBaseFeature**(`obj`, `checkCoordinates`, `allowGC`): `obj is BaseFeature<SingleTypeObject, unknown>`

##### Parameters

| Parameter          | Type      | Description                                                                                                                         |
| ------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `obj`              | `unknown` | -                                                                                                                                   |
| `checkCoordinates` | `boolean` | checks the validity of `obj.geometry.coordinates` if `true`, otherwise just checks for the existance of `obj.geometry.coordinates`. |
| `allowGC`          | `false`   | if `false`, disallowes the existance of `GJ.BaseGeometryCollection` on `obj.geometry`                                               |

##### Returns

`obj is BaseFeature<SingleTypeObject, unknown>`

`true` if `obj` can be narrowed to `GJ.BaseFeature`.

#### Call Signature

> **isBaseFeature**(`obj`, `checkCoordinates?`, `allowGC?`): `obj is BaseFeature<BaseGeometry, unknown>`

##### Parameters

| Parameter           | Type      | Description                                                                                                                         |
| ------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `obj`               | `unknown` | -                                                                                                                                   |
| `checkCoordinates?` | `boolean` | checks the validity of `obj.geometry.coordinates` if `true`, otherwise just checks for the existance of `obj.geometry.coordinates`. |
| `allowGC?`          | `boolean` | if `false`, disallowes the existance of `GJ.BaseGeometryCollection` on `obj.geometry`                                               |

##### Returns

`obj is BaseFeature<BaseGeometry, unknown>`

`true` if `obj` can be narrowed to `GJ.BaseFeature`.

---

### isBaseGeometry()

#### Call Signature

> **isBaseGeometry**(`obj`, `checkCoordinates`, `allowGC`): `obj is SingleTypeObject`

##### Parameters

| Parameter          | Type      | Description                                                                                                                         |
| ------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `obj`              | `unknown` | -                                                                                                                                   |
| `checkCoordinates` | `boolean` | checks the validity of the `coordinates` property if `true`, otherwise just checks for the existance of the `coordinates` property. |
| `allowGC`          | `false`   | if `false`, disallowes the existance of `GJ.BaseGeometryCollection` on `obj`                                                        |

##### Returns

`obj is SingleTypeObject`

`true` if `obj` can be narrowed to `GJ.BaseGeometry`.

#### Call Signature

> **isBaseGeometry**(`obj`, `checkCoordinates?`, `allowGC?`): `obj is BaseGeometry`

##### Parameters

| Parameter           | Type      | Description                                                                                                                         |
| ------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `obj`               | `unknown` | -                                                                                                                                   |
| `checkCoordinates?` | `boolean` | checks the validity of the `coordinates` property if `true`, otherwise just checks for the existance of the `coordinates` property. |
| `allowGC?`          | `boolean` | if `false`, disallowes the existance of `GJ.BaseGeometryCollection` on `obj`                                                        |

##### Returns

`obj is BaseGeometry`

`true` if `obj` can be narrowed to `GJ.BaseGeometry`.

---

### isCircle()

> **isCircle**(`obj`, `checkPositiveRadius`): `obj is Circle`

#### Parameters

| Parameter             | Type                                              | Default value |
| --------------------- | ------------------------------------------------- | ------------- |
| `obj`                 | [`SingleTypeObject`](geojson.md#singletypeobject) | `undefined`   |
| `checkPositiveRadius` | `boolean`                                         | `false`       |

#### Returns

`obj is Circle`

`true` if `obj` can be narrowed to `GJ.Circle`.

---

### isCircleish()

> **isCircleish**(`obj`, `checkPositiveRadius`): obj is Circle \| MultiCircle

#### Parameters

| Parameter             | Type                                              | Default value |
| --------------------- | ------------------------------------------------- | ------------- |
| `obj`                 | [`SingleTypeObject`](geojson.md#singletypeobject) | `undefined`   |
| `checkPositiveRadius` | `boolean`                                         | `false`       |

#### Returns

obj is Circle \| MultiCircle

`true` if `obj` can be narrowed to `GJ.Circle | GJ.MultiCircle`.

---

### isLineGeometry()

> **isLineGeometry**(`obj`): `obj is LineGeometry`

#### Parameters

| Parameter | Type                                      |
| --------- | ----------------------------------------- |
| `obj`     | [`BaseGeometry`](geojson.md#basegeometry) |

#### Returns

`obj is LineGeometry`

`true` if `obj` can be narrowed to `GJ.LineGeometry`.

---

### isMultiCircle()

> **isMultiCircle**(`obj`, `checkPositiveRadius`): `obj is MultiCircle`

#### Parameters

| Parameter             | Type                                              | Default value |
| --------------------- | ------------------------------------------------- | ------------- |
| `obj`                 | [`SingleTypeObject`](geojson.md#singletypeobject) | `undefined`   |
| `checkPositiveRadius` | `boolean`                                         | `false`       |

#### Returns

`obj is MultiCircle`

`true` if `obj` can be narrowed to `GJ.MultiCircle`.

---

### isMultiPoint()

> **isMultiPoint**(`obj`): `obj is MultiPoint`

#### Parameters

| Parameter | Type                                              |
| --------- | ------------------------------------------------- |
| `obj`     | [`SingleTypeObject`](geojson.md#singletypeobject) |

#### Returns

`obj is MultiPoint`

`true` if `obj` can be narrowed to `GJ.MultiPoint`.

---

### isPoint()

> **isPoint**(`obj`): `obj is Point`

#### Parameters

| Parameter | Type                                              |
| --------- | ------------------------------------------------- |
| `obj`     | [`SingleTypeObject`](geojson.md#singletypeobject) |

#### Returns

`obj is Point`

`true` if `obj` can be narrowed to `GJ.Point`.

---

### isPointGeometry()

> **isPointGeometry**(`obj`): `obj is PointGeometry`

#### Parameters

| Parameter | Type                                      |
| --------- | ----------------------------------------- |
| `obj`     | [`BaseGeometry`](geojson.md#basegeometry) |

#### Returns

`obj is PointGeometry`

`true` if `obj` can be narrowed to `GJ.PointGeometry`.

---

### isPointish()

> **isPointish**(`obj`): obj is Point \| MultiPoint

#### Parameters

| Parameter | Type                                              |
| --------- | ------------------------------------------------- |
| `obj`     | [`SingleTypeObject`](geojson.md#singletypeobject) |

#### Returns

obj is Point \| MultiPoint

`true` if `obj` can be narrowed to `GJ.Point | GJ.MultiPoint`.

---

### isSingleTypeCollection()

> **isSingleTypeCollection**(`obj`, `checkCoordinates`): `obj is BaseFeatureCollection<BaseFeature<SingleTypeObject, unknown>>`

#### Parameters

| Parameter          | Type      | Default value |
| ------------------ | --------- | ------------- |
| `obj`              | `unknown` | `undefined`   |
| `checkCoordinates` | `boolean` | `false`       |

#### Returns

`obj is BaseFeatureCollection<BaseFeature<SingleTypeObject, unknown>>`

`true` if `obj` can be narrowed to
`GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, unknown>>`.

---

### isSingleTypeFeature()

> **isSingleTypeFeature**(`obj`, `checkCoordinates`): `obj is BaseFeature<SingleTypeObject, unknown>`

#### Parameters

| Parameter          | Type      | Default value |
| ------------------ | --------- | ------------- |
| `obj`              | `unknown` | `undefined`   |
| `checkCoordinates` | `boolean` | `false`       |

#### Returns

`obj is BaseFeature<SingleTypeObject, unknown>`

`true` if `obj` can be narrowed to `GJ.BaseFeature<GJ.SingleTypeObject, unknown>`.

---

### isSingleTypeGeometry()

> **isSingleTypeGeometry**(`obj`, `checkCoordinates`): `obj is SingleTypeObject`

#### Parameters

| Parameter          | Type      | Default value |
| ------------------ | --------- | ------------- |
| `obj`              | `unknown` | `undefined`   |
| `checkCoordinates` | `boolean` | `false`       |

#### Returns

`obj is SingleTypeObject`

`true` if `obj` can be narrowed to `GJ.SingleTypeObject`.

---

### isUniformCollection()

> **isUniformCollection**(`obj`): obj is BaseFeatureCollection\<BaseFeature\<SingleTypeObject, string \| number\>\>

#### Parameters

| Parameter | Type                                                                                                                                                                   |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `obj`     | [`BaseFeatureCollection`](geojson.md#basefeaturecollection)\<[`BaseFeature`](geojson.md#basefeature)\<[`SingleTypeObject`](geojson.md#singletypeobject), `unknown`\>\> |

#### Returns

obj is BaseFeatureCollection\<BaseFeature\<SingleTypeObject, string \| number\>\>

`true` if `obj` can be narrowed to a FeatureCollection with uniform properties, i.e. a
FeatureCollection where every feature has exactly the same property object.
