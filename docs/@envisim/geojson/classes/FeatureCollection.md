[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / FeatureCollection

# Class: FeatureCollection\<T, PID\>

## Type Parameters

| Type Parameter                                              | theme_default_type |
| ----------------------------------------------------------- | ------------------ |
| `T` _extends_ [`PureObject`](../type-aliases/PureObject.md) | -                  |
| `PID` _extends_ `string`                                    | `string`           |

## Implements

- `BaseFeatureCollection`\<`GJ.BaseFeature`\<`GJ.SingleTypeObject`, `number` \| `string`\>\>
- `FeatureCollectionExtras`

## Properties

| Property                                     | theme_modifier | theme_type                                     | theme_default_value   | theme_description                                                   |
| -------------------------------------------- | -------------- | ---------------------------------------------- | --------------------- | ------------------------------------------------------------------- |
| <a id="bbox"></a> `bbox?`                    | `public`       | `BBox`                                         | `undefined`           | -                                                                   |
| <a id="color"></a> `color?`                  | `public`       | \[`number`, `number`, `number`\]               | `undefined`           | Foreign GeoJSON member, an RGB value associated with the collection |
| <a id="features"></a> `features`             | `public`       | [`Feature`](Feature.md)\<`T`, `PID`\>[]        | `[]`                  | -                                                                   |
| <a id="id"></a> `id?`                        | `public`       | `string`                                       | `undefined`           | Foreign GeoJSON member, the id of the collection                    |
| <a id="primitive"></a> `primitive`           | `readonly`     | `GeometricPrimitiveUnion`                      | `undefined`           | Foreign GeoJSON member, geometric primitive of the collection       |
| <a id="propertyrecord"></a> `propertyRecord` | `public`       | [`PropertyRecord`](PropertyRecord.md)\<`PID`\> | `undefined`           | Foreign GeoJSON member, the allowed properties of the collection    |
| <a id="title"></a> `title?`                  | `public`       | `string`                                       | `undefined`           | Foreign GeoJSON member, the human readable name of the collection   |
| <a id="type"></a> `type`                     | `readonly`     | `"FeatureCollection"`                          | `"FeatureCollection"` | -                                                                   |

## Methods

### addFeature()

> **addFeature**(`feature`, `shallow`): `number`

#### Parameters

| Parameter | theme_type                            | theme_default_value |
| --------- | ------------------------------------- | ------------------- |
| `feature` | [`Feature`](Feature.md)\<`T`, `PID`\> | `undefined`         |
| `shallow` | `boolean`                             | `true`              |

#### Returns

`number`

---

### addGeometry()

> **addGeometry**(`geometry`, `properties`, `shallow`): `number`

#### Parameters

| Parameter    | theme_type                                                           | theme_default_value |
| ------------ | -------------------------------------------------------------------- | ------------------- |
| `geometry`   | `T`                                                                  | `undefined`         |
| `properties` | [`FeatureProperties`](../type-aliases/FeatureProperties.md)\<`PID`\> | `undefined`         |
| `shallow`    | `boolean`                                                            | `true`              |

#### Returns

`number`

---

### appendFeatureCollection()

> **appendFeatureCollection**(`fc`, `shallow`): `void`

#### Parameters

| Parameter | theme_type                        | theme_default_value |
| --------- | --------------------------------- | ------------------- |
| `fc`      | `FeatureCollection`\<`T`, `PID`\> | `undefined`         |
| `shallow` | `boolean`                         | `true`              |

#### Returns

`void`

---

### buffer()

> **buffer**(`options`): `null` \| `FeatureCollection`\<[`AreaObject`](../type-aliases/AreaObject.md), `PID`\>

#### Parameters

| Parameter | theme_type      |
| --------- | --------------- |
| `options` | `BufferOptions` |

#### Returns

`null` \| `FeatureCollection`\<[`AreaObject`](../type-aliases/AreaObject.md), `PID`\>

---

### centroid()

> **centroid**(`iterations`): `Position`

#### Parameters

| Parameter    | theme_type | theme_default_value |
| ------------ | ---------- | ------------------- |
| `iterations` | `number`   | `2`                 |

#### Returns

`Position`

---

### clearFeatures()

> **clearFeatures**(): `void`

#### Returns

`void`

---

### copy()

> **copy**(`shallow`, `options`): `FeatureCollection`\<`T`\>

Transforms the categorical properties back to strings, and returns the json

#### Parameters

| Parameter | theme_type                                                                         | theme_default_value | theme_description                                 |
| --------- | ---------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------- |
| `shallow` | `boolean`                                                                          | `true`              | if `true`, creates shallow copies of the features |
| `options` | [`CirclesToPolygonsOptions`](../interfaces/CirclesToPolygonsOptions.md) & `object` | `{}`                | -                                                 |

#### Returns

`FeatureCollection`\<`T`\>

---

### copyEmpty()

> **copyEmpty**(`shallow`): `FeatureCollection`\<`T`, `PID`\>

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

#### Returns

`FeatureCollection`\<`T`, `PID`\>

---

### distanceToPosition()

> **distanceToPosition**(`coords`): `number`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `coords`  | `Position` |

#### Returns

`number`

---

### forEach()

> **forEach**(`callback`): `void`

#### Parameters

| Parameter  | theme_type                                                 |
| ---------- | ---------------------------------------------------------- |
| `callback` | `ForEachCallback`\<[`Feature`](Feature.md)\<`T`, `PID`\>\> |

#### Returns

`void`

---

### geomEach()

> **geomEach**(`callback`): `void`

#### Parameters

| Parameter  | theme_type               |
| ---------- | ------------------------ |
| `callback` | `ForEachCallback`\<`T`\> |

#### Returns

`void`

---

### geometricPrimitive()

> **geometricPrimitive**(): `GeometricPrimitiveUnion`

#### Returns

`GeometricPrimitiveUnion`

---

### getBBox()

> **getBBox**(): `BBox`

#### Returns

`BBox`

---

### measure()

> **measure**(): `number`

#### Returns

`number`

the measure of the collection: the total area of an area collection, the total length
of a line collection, and the total count of a point collection

---

### removeFeature()

> **removeFeature**(`index`): `void`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `index`   | `number`   |

#### Returns

`void`

---

### setBBox()

> **setBBox**(`force`): `BBox`

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `force`   | `boolean`  | `false`             |

#### Returns

`BBox`

---

### setProperty()

> **setProperty**(`id`, `index`, `value`): `void`

#### Parameters

| Parameter | theme_type           |
| --------- | -------------------- |
| `id`      | `PID`                |
| `index`   | `number`             |
| `value`   | `string` \| `number` |

#### Returns

`void`

---

### size()

> **size**(): `number`

#### Returns

`number`

---

### assertArea()

> `static` **assertArea**\<`P`\>(`obj`, `msg`): `asserts obj is FeatureCollection<AreaObject, P>`

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | theme_type                                                                | theme_default_value |
| --------- | ------------------------------------------------------------------------- | ------------------- |
| `obj`     | `FeatureCollection`\<[`PureObject`](../type-aliases/PureObject.md), `P`\> | `undefined`         |
| `msg`     | `string`                                                                  | `"Expected area"`   |

#### Returns

`asserts obj is FeatureCollection<AreaObject, P>`

---

### assertLine()

> `static` **assertLine**\<`P`\>(`obj`, `msg`): `asserts obj is FeatureCollection<LineObject, P>`

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | theme_type                                                                | theme_default_value |
| --------- | ------------------------------------------------------------------------- | ------------------- |
| `obj`     | `FeatureCollection`\<[`PureObject`](../type-aliases/PureObject.md), `P`\> | `undefined`         |
| `msg`     | `string`                                                                  | `"Expected line"`   |

#### Returns

`asserts obj is FeatureCollection<LineObject, P>`

---

### assertPoint()

> `static` **assertPoint**\<`P`\>(`obj`, `msg`): `asserts obj is FeatureCollection<PointObject, P>`

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | theme_type                                                                | theme_default_value |
| --------- | ------------------------------------------------------------------------- | ------------------- |
| `obj`     | `FeatureCollection`\<[`PureObject`](../type-aliases/PureObject.md), `P`\> | `undefined`         |
| `msg`     | `string`                                                                  | `"Expected point"`  |

#### Returns

`asserts obj is FeatureCollection<PointObject, P>`

---

### createAreaFromJson()

> `static` **createAreaFromJson**(`collection`, `shallow`, `options`): `FeatureCollection`\<[`AreaObject`](../type-aliases/AreaObject.md)\>

#### Parameters

| Parameter    | theme_type                                                              | theme_default_value |
| ------------ | ----------------------------------------------------------------------- | ------------------- |
| `collection` | `StrippedFeatureCollectionJson`                                         | `undefined`         |
| `shallow`    | `boolean`                                                               | `true`              |
| `options`    | [`CirclesToPolygonsOptions`](../interfaces/CirclesToPolygonsOptions.md) | `{}`                |

#### Returns

`FeatureCollection`\<[`AreaObject`](../type-aliases/AreaObject.md)\>

---

### createLineFromJson()

> `static` **createLineFromJson**(`collection`, `shallow`): `FeatureCollection`\<[`LineObject`](../type-aliases/LineObject.md)\>

#### Parameters

| Parameter    | theme_type                      | theme_default_value |
| ------------ | ------------------------------- | ------------------- |
| `collection` | `StrippedFeatureCollectionJson` | `undefined`         |
| `shallow`    | `boolean`                       | `true`              |

#### Returns

`FeatureCollection`\<[`LineObject`](../type-aliases/LineObject.md)\>

---

### createPointFromJson()

> `static` **createPointFromJson**(`collection`, `shallow`): `FeatureCollection`\<[`PointObject`](../type-aliases/PointObject.md)\>

#### Parameters

| Parameter    | theme_type                      | theme_default_value |
| ------------ | ------------------------------- | ------------------- |
| `collection` | `StrippedFeatureCollectionJson` | `undefined`         |
| `shallow`    | `boolean`                       | `true`              |

#### Returns

`FeatureCollection`\<[`PointObject`](../type-aliases/PointObject.md)\>

---

### isArea()

> `static` **isArea**\<`P`\>(`obj`): `obj is FeatureCollection<AreaObject, P>`

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | theme_type                                                                |
| --------- | ------------------------------------------------------------------------- |
| `obj`     | `FeatureCollection`\<[`PureObject`](../type-aliases/PureObject.md), `P`\> |

#### Returns

`obj is FeatureCollection<AreaObject, P>`

---

### isLine()

> `static` **isLine**\<`P`\>(`obj`): `obj is FeatureCollection<LineObject, P>`

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | theme_type                                                                |
| --------- | ------------------------------------------------------------------------- |
| `obj`     | `FeatureCollection`\<[`PureObject`](../type-aliases/PureObject.md), `P`\> |

#### Returns

`obj is FeatureCollection<LineObject, P>`

---

### isPoint()

> `static` **isPoint**\<`P`\>(`obj`): `obj is FeatureCollection<PointObject, P>`

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | theme_type                                                                |
| --------- | ------------------------------------------------------------------------- |
| `obj`     | `FeatureCollection`\<[`PureObject`](../type-aliases/PureObject.md), `P`\> |

#### Returns

`obj is FeatureCollection<PointObject, P>`

---

### newArea()

> `static` **newArea**\<`F`, `PID`\>(`features`, `propertyRecord?`, `shallow?`): `FeatureCollection`\<`F`, `PID`\>

#### Type Parameters

| Type Parameter                                              | theme_default_type                            |
| ----------------------------------------------------------- | --------------------------------------------- |
| `F` _extends_ [`AreaObject`](../type-aliases/AreaObject.md) | [`AreaObject`](../type-aliases/AreaObject.md) |
| `PID` _extends_ `string`                                    | `string`                                      |

#### Parameters

| Parameter         | theme_type                                     | theme_default_value |
| ----------------- | ---------------------------------------------- | ------------------- |
| `features`        | [`Feature`](Feature.md)\<`F`, `PID`\>[]        | `[]`                |
| `propertyRecord?` | [`PropertyRecord`](PropertyRecord.md)\<`PID`\> | `undefined`         |
| `shallow?`        | `boolean`                                      | `true`              |

#### Returns

`FeatureCollection`\<`F`, `PID`\>

---

### newLine()

> `static` **newLine**\<`F`, `PID`\>(`features`, `propertyRecord?`, `shallow?`): `FeatureCollection`\<`F`, `PID`\>

#### Type Parameters

| Type Parameter                                              | theme_default_type                            |
| ----------------------------------------------------------- | --------------------------------------------- |
| `F` _extends_ [`LineObject`](../type-aliases/LineObject.md) | [`LineObject`](../type-aliases/LineObject.md) |
| `PID` _extends_ `string`                                    | `string`                                      |

#### Parameters

| Parameter         | theme_type                                     | theme_default_value |
| ----------------- | ---------------------------------------------- | ------------------- |
| `features`        | [`Feature`](Feature.md)\<`F`, `PID`\>[]        | `[]`                |
| `propertyRecord?` | [`PropertyRecord`](PropertyRecord.md)\<`PID`\> | `undefined`         |
| `shallow?`        | `boolean`                                      | `true`              |

#### Returns

`FeatureCollection`\<`F`, `PID`\>

---

### newPoint()

> `static` **newPoint**\<`F`, `PID`\>(`features`, `propertyRecord?`, `shallow?`): `FeatureCollection`\<`F`, `PID`\>

#### Type Parameters

| Type Parameter                                                | theme_default_type                              |
| ------------------------------------------------------------- | ----------------------------------------------- |
| `F` _extends_ [`PointObject`](../type-aliases/PointObject.md) | [`PointObject`](../type-aliases/PointObject.md) |
| `PID` _extends_ `string`                                      | `string`                                        |

#### Parameters

| Parameter         | theme_type                                     | theme_default_value |
| ----------------- | ---------------------------------------------- | ------------------- |
| `features`        | [`Feature`](Feature.md)\<`F`, `PID`\>[]        | `[]`                |
| `propertyRecord?` | [`PropertyRecord`](PropertyRecord.md)\<`PID`\> | `undefined`         |
| `shallow?`        | `boolean`                                      | `true`              |

#### Returns

`FeatureCollection`\<`F`, `PID`\>
