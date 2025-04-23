[**Documentation**](../README.md)

---

[Documentation](../README.md) / @envisim/geojson

# @envisim/geojson

## Classes

### Circle

#### theme_extends

- `AbstractAreaObject`\<[`Circle`](geojson-utils/geojson.md#circle)\>

#### Implements

- [`Circle`](geojson-utils/geojson.md#circle)

#### Constructors

##### Constructor

> **new Circle**(`obj`, `shallow`): [`Circle`](#circle)

The `Circle` is a [Point](#point) with the extra property `radius`.
Thus, it does not follow the GeoJSON standard, but can be converted to
a [Polygon](#polygon) through the [Circle.toPolygon](#topolygon).

###### Parameters

| Parameter | theme_type                                                                                         | theme_default_value | theme_description                            |
| --------- | -------------------------------------------------------------------------------------------------- | ------------------- | -------------------------------------------- |
| `obj`     | [`OptionalParam`](utils.md#optionalparam)\<[`Circle`](geojson-utils/geojson.md#circle), `"type"`\> | `undefined`         | -                                            |
| `shallow` | `boolean`                                                                                          | `true`              | if `true`, copys by reference when possible. |

###### Returns

[`Circle`](#circle)

###### Overrides

`AbstractAreaObject<GJ.Circle>.constructor`

#### Properties

| Property                               | theme_modifier | theme_type                                      |
| -------------------------------------- | -------------- | ----------------------------------------------- |
| <a id="bbox"></a> `bbox?`              | `public`       | [`BBox`](geojson-utils/geojson.md#bbox-7)       |
| <a id="coordinates"></a> `coordinates` | `public`       | [`Position`](geojson-utils/geojson.md#position) |
| <a id="radius"></a> `radius`           | `public`       | `number`                                        |
| <a id="type"></a> `type`               | `readonly`     | `"Point"`                                       |

#### Methods

##### area()

> **area**(): `number`

###### Returns

`number`

###### Overrides

`AbstractAreaObject.area`

##### buffer()

> **buffer**(`options`): `null` \| [`Circle`](#circle)

###### Parameters

| Parameter | theme_type      |
| --------- | --------------- |
| `options` | `BufferOptions` |

###### Returns

`null` \| [`Circle`](#circle)

##### centroid()

> **centroid**(): [`Position`](geojson-utils/geojson.md#position)

###### Returns

[`Position`](geojson-utils/geojson.md#position)

###### Overrides

`AbstractAreaObject.centroid`

##### copy()

> **copy**(`shallow`): [`Circle`](#circle)

###### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

###### Returns

[`Circle`](#circle)

###### Overrides

`AbstractAreaObject.copy`

##### distanceToPosition()

> **distanceToPosition**(`position`): `number`

###### Parameters

| Parameter  | theme_type                                      |
| ---------- | ----------------------------------------------- |
| `position` | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`number`

###### Overrides

`AbstractAreaObject.distanceToPosition`

##### geometricPrimitive()

> **geometricPrimitive**(): `"area"`

###### Returns

`"area"`

###### Inherited from

`AbstractAreaObject.geometricPrimitive`

##### getBBox()

> **getBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

###### Inherited from

`AbstractAreaObject.getBBox`

##### getCoordinateArray()

> **getCoordinateArray**(): [`Position`](geojson-utils/geojson.md#position)[]

###### Returns

[`Position`](geojson-utils/geojson.md#position)[]

###### Overrides

`AbstractAreaObject.getCoordinateArray`

##### includesPosition()

> **includesPosition**(`position`): `boolean`

###### Parameters

| Parameter  | theme_type                                      |
| ---------- | ----------------------------------------------- |
| `position` | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`boolean`

###### Overrides

`AbstractAreaObject.includesPosition`

##### isArea()

> **isArea**(): `this is AreaObject`

###### Returns

`this is AreaObject`

###### Inherited from

`AbstractAreaObject.isArea`

##### isLine()

> **isLine**(): `this is LineObject`

###### Returns

`this is LineObject`

###### Inherited from

`AbstractAreaObject.isLine`

##### isPoint()

> **isPoint**(): `this is PointObject`

###### Returns

`this is PointObject`

###### Inherited from

`AbstractAreaObject.isPoint`

##### measure()

> **measure**(): `number`

###### Returns

`number`

###### Inherited from

`AbstractAreaObject.measure`

##### perimeter()

> **perimeter**(): `number`

###### Returns

`number`

###### Overrides

`AbstractAreaObject.perimeter`

##### pointInBBox()

> **pointInBBox**(`point`): `boolean`

###### Parameters

| Parameter | theme_type                                      |
| --------- | ----------------------------------------------- |
| `point`   | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`boolean`

###### Inherited from

`AbstractAreaObject.pointInBBox`

##### setBBox()

> **setBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

###### Overrides

`AbstractAreaObject.setBBox`

##### size()

> **size**(): `number`

###### Returns

`number`

###### Inherited from

`AbstractAreaObject.size`

##### toPolygon()

> **toPolygon**(`options`): `null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

###### Parameters

| Parameter | theme_type                                              |
| --------- | ------------------------------------------------------- |
| `options` | [`CirclesToPolygonsOptions`](#circlestopolygonsoptions) |

###### Returns

`null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

##### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is Circle`

###### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `obj`     | `unknown`  | `undefined`         |
| `msg`     | `string`   | `"Expected Circle"` |

###### Returns

`asserts obj is Circle`

##### create()

> `static` **create**(`coordinates`, `radius`, `shallow`): [`Circle`](#circle)

###### Parameters

| Parameter     | theme_type                                      | theme_default_value |
| ------------- | ----------------------------------------------- | ------------------- |
| `coordinates` | [`Position`](geojson-utils/geojson.md#position) | `undefined`         |
| `radius`      | `number`                                        | `undefined`         |
| `shallow`     | `boolean`                                       | `true`              |

###### Returns

[`Circle`](#circle)

##### isObject()

> `static` **isObject**(`obj`): `obj is Circle`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

###### Returns

`obj is Circle`

---

### Feature\<T, PID\>

#### Type Parameters

| Type Parameter                            | theme_default_type |
| ----------------------------------------- | ------------------ |
| `T` _extends_ [`PureObject`](#pureobject) | -                  |
| `PID` _extends_ `string`                  | `string`           |

#### Implements

- [`BaseFeature`](geojson-utils/geojson.md#basefeature)\<[`SingleTypeObject`](geojson-utils/geojson.md#singletypeobject), `number` \| `string`\>

#### Constructors

##### Constructor

> **new Feature**\<`T`, `PID`\>(`geometry`, `properties`, `shallow`): [`Feature`](#feature)\<`T`, `PID`\>

###### Parameters

| Parameter    | theme_type                                           | theme_default_value |
| ------------ | ---------------------------------------------------- | ------------------- |
| `geometry`   | `T`                                                  | `undefined`         |
| `properties` | [`FeatureProperties`](#featureproperties-1)\<`PID`\> | `undefined`         |
| `shallow`    | `boolean`                                            | `true`              |

###### Returns

[`Feature`](#feature)\<`T`, `PID`\>

#### Properties

| Property                             | theme_modifier | theme_type                                           | theme_default_value |
| ------------------------------------ | -------------- | ---------------------------------------------------- | ------------------- |
| <a id="geometry"></a> `geometry`     | `public`       | `T`                                                  | `undefined`         |
| <a id="properties"></a> `properties` | `public`       | [`FeatureProperties`](#featureproperties-1)\<`PID`\> | `undefined`         |
| <a id="type-1"></a> `type`           | `readonly`     | `"Feature"`                                          | `"Feature"`         |

#### Methods

##### editProperty()

> **editProperty**(`id`, `callback`): [`FeatureProperties`](#featureproperties-1)\[`PID`\]

###### Parameters

| Parameter  | theme_type                                                        |
| ---------- | ----------------------------------------------------------------- |
| `id`       | `PID`                                                             |
| `callback` | (`value`) => [`FeatureProperties`](#featureproperties-1)\[`PID`\] |

###### Returns

[`FeatureProperties`](#featureproperties-1)\[`PID`\]

##### geometricPrimitive()

> **geometricPrimitive**(): `"area"` \| `"line"` \| `"point"`

###### Returns

`"area"` \| `"line"` \| `"point"`

##### getProperty()

> **getProperty**(`id`): `string` \| `number`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `id`      | `PID`      |

###### Returns

`string` \| `number`

##### getSpecialPropertyDesignWeight()

> **getSpecialPropertyDesignWeight**(): `number`

###### Returns

`number`

##### getSpecialPropertyDistance()

> **getSpecialPropertyDistance**(): `number`

###### Returns

`number`

##### getSpecialPropertyParent()

> **getSpecialPropertyParent**(): `number`

###### Returns

`number`

##### getSpecialPropertyRandomRotation()

> **getSpecialPropertyRandomRotation**(): `number`

###### Returns

`number`

##### measure()

> **measure**(): `number`

###### Returns

`number`

##### multSpecialPropertyDesignWeight()

> **multSpecialPropertyDesignWeight**(`value`): `number`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `value`   | `number`   |

###### Returns

`number`

##### setProperty()

> **setProperty**(`id`, `value`): `void`

###### Parameters

| Parameter | theme_type                                           |
| --------- | ---------------------------------------------------- |
| `id`      | `PID`                                                |
| `value`   | [`FeatureProperties`](#featureproperties-1)\[`PID`\] |

###### Returns

`void`

##### setSpecialPropertyDesignWeight()

> **setSpecialPropertyDesignWeight**(`value`): `void`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `value`   | `number`   |

###### Returns

`void`

##### setSpecialPropertyDistance()

> **setSpecialPropertyDistance**(`value`): `void`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `value`   | `number`   |

###### Returns

`void`

##### setSpecialPropertyMeasure()

> **setSpecialPropertyMeasure**(): `void`

###### Returns

`void`

##### setSpecialPropertyParent()

> **setSpecialPropertyParent**(`value`): `void`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `value`   | `number`   |

###### Returns

`void`

##### setSpecialPropertyRandomRotation()

> **setSpecialPropertyRandomRotation**(`value`): `void`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `value`   | `number`   |

###### Returns

`void`

##### assertArea()

> `static` **assertArea**(`obj`, `msg`): `asserts obj is Feature<AreaObject, string>`

###### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `obj`     | `unknown`  | `undefined`         |
| `msg`     | `string`   | `"Expected area"`   |

###### Returns

`asserts obj is Feature<AreaObject, string>`

##### assertLine()

> `static` **assertLine**(`obj`, `msg`): `asserts obj is Feature<LineObject, string>`

###### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `obj`     | `unknown`  | `undefined`         |
| `msg`     | `string`   | `"Expected line"`   |

###### Returns

`asserts obj is Feature<LineObject, string>`

##### assertPoint()

> `static` **assertPoint**(`obj`, `msg`): `asserts obj is Feature<PointObject, string>`

###### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `obj`     | `unknown`  | `undefined`         |
| `msg`     | `string`   | `"Expected point"`  |

###### Returns

`asserts obj is Feature<PointObject, string>`

##### createArea()

> `static` **createArea**\<`PID`\>(`geometry`, `properties?`, `shallow?`, `options?`): `null` \| [`Feature`](#feature)\<[`AreaObject`](#areaobject), `PID`\>

###### Type Parameters

| Type Parameter           | theme_default_type |
| ------------------------ | ------------------ |
| `PID` _extends_ `string` | `string`           |

###### Parameters

| Parameter     | theme_type                                                     | theme_default_value |
| ------------- | -------------------------------------------------------------- | ------------------- |
| `geometry`    | [`BaseGeometry`](geojson-utils/geojson.md#basegeometry)        | `undefined`         |
| `properties?` | `null` \| [`FeatureProperties`](#featureproperties-1)\<`PID`\> | `undefined`         |
| `shallow?`    | `boolean`                                                      | `true`              |
| `options?`    | [`CirclesToPolygonsOptions`](#circlestopolygonsoptions)        | `{}`                |

###### Returns

`null` \| [`Feature`](#feature)\<[`AreaObject`](#areaobject), `PID`\>

##### createAreaFromJson()

> `static` **createAreaFromJson**(`feature`, `shallow`): `null` \| [`Feature`](#feature)\<[`AreaObject`](#areaobject), `string`\>

###### Parameters

| Parameter | theme_type                                                                                                                                                                                    | theme_default_value |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `feature` | [`OptionalParam`](utils.md#optionalparam)\<[`BaseFeature`](geojson-utils/geojson.md#basefeature)\<[`BaseGeometry`](geojson-utils/geojson.md#basegeometry), `string` \| `number`\>, `"type"`\> | `undefined`         |
| `shallow` | `boolean`                                                                                                                                                                                     | `true`              |

###### Returns

`null` \| [`Feature`](#feature)\<[`AreaObject`](#areaobject), `string`\>

##### createLine()

> `static` **createLine**\<`PID`\>(`geometry`, `properties?`, `shallow?`): `null` \| [`Feature`](#feature)\<[`LineObject`](#lineobject), `string`\>

###### Type Parameters

| Type Parameter           | theme_default_type |
| ------------------------ | ------------------ |
| `PID` _extends_ `string` | `string`           |

###### Parameters

| Parameter     | theme_type                                                     | theme_default_value |
| ------------- | -------------------------------------------------------------- | ------------------- |
| `geometry`    | [`BaseGeometry`](geojson-utils/geojson.md#basegeometry)        | `undefined`         |
| `properties?` | `null` \| [`FeatureProperties`](#featureproperties-1)\<`PID`\> | `undefined`         |
| `shallow?`    | `boolean`                                                      | `true`              |

###### Returns

`null` \| [`Feature`](#feature)\<[`LineObject`](#lineobject), `string`\>

##### createLineFromJson()

> `static` **createLineFromJson**(`feature`, `shallow`): `null` \| [`Feature`](#feature)\<[`LineObject`](#lineobject), `string`\>

###### Parameters

| Parameter | theme_type                                                                                                                                                                                    | theme_default_value |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `feature` | [`OptionalParam`](utils.md#optionalparam)\<[`BaseFeature`](geojson-utils/geojson.md#basefeature)\<[`BaseGeometry`](geojson-utils/geojson.md#basegeometry), `string` \| `number`\>, `"type"`\> | `undefined`         |
| `shallow` | `boolean`                                                                                                                                                                                     | `true`              |

###### Returns

`null` \| [`Feature`](#feature)\<[`LineObject`](#lineobject), `string`\>

##### createPoint()

> `static` **createPoint**\<`PID`\>(`geometry`, `properties?`, `shallow?`): `null` \| [`Feature`](#feature)\<[`PointObject`](#pointobject), `string`\>

###### Type Parameters

| Type Parameter           | theme_default_type |
| ------------------------ | ------------------ |
| `PID` _extends_ `string` | `string`           |

###### Parameters

| Parameter     | theme_type                                                     | theme_default_value |
| ------------- | -------------------------------------------------------------- | ------------------- |
| `geometry`    | [`BaseGeometry`](geojson-utils/geojson.md#basegeometry)        | `undefined`         |
| `properties?` | `null` \| [`FeatureProperties`](#featureproperties-1)\<`PID`\> | `undefined`         |
| `shallow?`    | `boolean`                                                      | `true`              |

###### Returns

`null` \| [`Feature`](#feature)\<[`PointObject`](#pointobject), `string`\>

##### createPointFromJson()

> `static` **createPointFromJson**(`feature`, `shallow`): `null` \| [`Feature`](#feature)\<[`PointObject`](#pointobject), `string`\>

###### Parameters

| Parameter | theme_type                                                                                                                                                                                    | theme_default_value |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `feature` | [`OptionalParam`](utils.md#optionalparam)\<[`BaseFeature`](geojson-utils/geojson.md#basefeature)\<[`BaseGeometry`](geojson-utils/geojson.md#basegeometry), `string` \| `number`\>, `"type"`\> | `undefined`         |
| `shallow` | `boolean`                                                                                                                                                                                     | `true`              |

###### Returns

`null` \| [`Feature`](#feature)\<[`PointObject`](#pointobject), `string`\>

##### isArea()

> `static` **isArea**(`obj`): `obj is Feature<AreaObject, string>`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

###### Returns

`obj is Feature<AreaObject, string>`

##### isLine()

> `static` **isLine**(`obj`): `obj is Feature<LineObject, string>`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

###### Returns

`obj is Feature<LineObject, string>`

##### isPoint()

> `static` **isPoint**(`obj`): `obj is Feature<PointObject, string>`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

###### Returns

`obj is Feature<PointObject, string>`

---

### FeatureCollection\<T, PID\>

#### Type Parameters

| Type Parameter                            | theme_default_type |
| ----------------------------------------- | ------------------ |
| `T` _extends_ [`PureObject`](#pureobject) | -                  |
| `PID` _extends_ `string`                  | `string`           |

#### Implements

- [`BaseFeatureCollection`](geojson-utils/geojson.md#basefeaturecollection)\<[`BaseFeature`](geojson-utils/geojson.md#basefeature)\<[`SingleTypeObject`](geojson-utils/geojson.md#singletypeobject), `number` \| `string`\>\>
- `FeatureCollectionExtras`

#### Properties

| Property                                     | theme_modifier | theme_type                                                             | theme_default_value   | theme_description                                                   |
| -------------------------------------------- | -------------- | ---------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------- |
| <a id="bbox-1"></a> `bbox?`                  | `public`       | [`BBox`](geojson-utils/geojson.md#bbox-7)                              | `undefined`           | -                                                                   |
| <a id="color"></a> `color?`                  | `public`       | \[`number`, `number`, `number`\]                                       | `undefined`           | Foreign GeoJSON member, an RGB value associated with the collection |
| <a id="features"></a> `features`             | `public`       | [`Feature`](#feature)\<`T`, `PID`\>[]                                  | `[]`                  | -                                                                   |
| <a id="id"></a> `id?`                        | `public`       | `string`                                                               | `undefined`           | Foreign GeoJSON member, the id of the collection                    |
| <a id="primitive"></a> `primitive`           | `readonly`     | [`GeometricPrimitiveUnion`](geojson-utils/.md#geometricprimitiveunion) | `undefined`           | Foreign GeoJSON member, geometric primitive of the collection       |
| <a id="propertyrecord"></a> `propertyRecord` | `public`       | [`PropertyRecord`](#propertyrecord-1)\<`PID`\>                         | `undefined`           | Foreign GeoJSON member, the allowed properties of the collection    |
| <a id="title"></a> `title?`                  | `public`       | `string`                                                               | `undefined`           | Foreign GeoJSON member, the human readable name of the collection   |
| <a id="type-2"></a> `type`                   | `readonly`     | `"FeatureCollection"`                                                  | `"FeatureCollection"` | -                                                                   |

#### Methods

##### addFeature()

> **addFeature**(`feature`, `shallow`): `number`

###### Parameters

| Parameter | theme_type                          | theme_default_value |
| --------- | ----------------------------------- | ------------------- |
| `feature` | [`Feature`](#feature)\<`T`, `PID`\> | `undefined`         |
| `shallow` | `boolean`                           | `true`              |

###### Returns

`number`

##### addGeometry()

> **addGeometry**(`geometry`, `properties`, `shallow`): `number`

###### Parameters

| Parameter    | theme_type                                           | theme_default_value |
| ------------ | ---------------------------------------------------- | ------------------- |
| `geometry`   | `T`                                                  | `undefined`         |
| `properties` | [`FeatureProperties`](#featureproperties-1)\<`PID`\> | `undefined`         |
| `shallow`    | `boolean`                                            | `true`              |

###### Returns

`number`

##### appendFeatureCollection()

> **appendFeatureCollection**(`fc`, `shallow`): `void`

###### Parameters

| Parameter | theme_type                                              | theme_default_value |
| --------- | ------------------------------------------------------- | ------------------- |
| `fc`      | [`FeatureCollection`](#featurecollection)\<`T`, `PID`\> | `undefined`         |
| `shallow` | `boolean`                                               | `true`              |

###### Returns

`void`

##### buffer()

> **buffer**(`options`): `null` \| [`FeatureCollection`](#featurecollection)\<[`AreaObject`](#areaobject), `PID`\>

###### Parameters

| Parameter | theme_type      |
| --------- | --------------- |
| `options` | `BufferOptions` |

###### Returns

`null` \| [`FeatureCollection`](#featurecollection)\<[`AreaObject`](#areaobject), `PID`\>

##### centroid()

> **centroid**(`iterations`): [`Position`](geojson-utils/geojson.md#position)

###### Parameters

| Parameter    | theme_type | theme_default_value |
| ------------ | ---------- | ------------------- |
| `iterations` | `number`   | `2`                 |

###### Returns

[`Position`](geojson-utils/geojson.md#position)

##### clearFeatures()

> **clearFeatures**(): `void`

###### Returns

`void`

##### copy()

> **copy**(`shallow`, `options`): [`FeatureCollection`](#featurecollection)\<`T`\>

Transforms the categorical properties back to strings, and returns the json

###### Parameters

| Parameter | theme_type                                                         | theme_default_value | theme_description                                 |
| --------- | ------------------------------------------------------------------ | ------------------- | ------------------------------------------------- |
| `shallow` | `boolean`                                                          | `true`              | if `true`, creates shallow copies of the features |
| `options` | [`CirclesToPolygonsOptions`](#circlestopolygonsoptions) & `object` | `{}`                | -                                                 |

###### Returns

[`FeatureCollection`](#featurecollection)\<`T`\>

##### copyEmpty()

> **copyEmpty**(`shallow`): [`FeatureCollection`](#featurecollection)\<`T`, `PID`\>

###### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

###### Returns

[`FeatureCollection`](#featurecollection)\<`T`, `PID`\>

##### distanceToPosition()

> **distanceToPosition**(`coords`): `number`

###### Parameters

| Parameter | theme_type                                      |
| --------- | ----------------------------------------------- |
| `coords`  | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`number`

##### forEach()

> **forEach**(`callback`): `void`

###### Parameters

| Parameter  | theme_type                                               |
| ---------- | -------------------------------------------------------- |
| `callback` | `ForEachCallback`\<[`Feature`](#feature)\<`T`, `PID`\>\> |

###### Returns

`void`

##### geomEach()

> **geomEach**(`callback`): `void`

###### Parameters

| Parameter  | theme_type               |
| ---------- | ------------------------ |
| `callback` | `ForEachCallback`\<`T`\> |

###### Returns

`void`

##### geometricPrimitive()

> **geometricPrimitive**(): [`GeometricPrimitiveUnion`](geojson-utils/.md#geometricprimitiveunion)

###### Returns

[`GeometricPrimitiveUnion`](geojson-utils/.md#geometricprimitiveunion)

##### getBBox()

> **getBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

##### measure()

> **measure**(): `number`

###### Returns

`number`

the measure of the collection: the total area of an area collection, the total length
of a line collection, and the total count of a point collection

##### removeFeature()

> **removeFeature**(`index`): `void`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `index`   | `number`   |

###### Returns

`void`

##### setBBox()

> **setBBox**(`force`): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `force`   | `boolean`  | `false`             |

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

##### setProperty()

> **setProperty**(`id`, `index`, `value`): `void`

###### Parameters

| Parameter | theme_type           |
| --------- | -------------------- |
| `id`      | `PID`                |
| `index`   | `number`             |
| `value`   | `string` \| `number` |

###### Returns

`void`

##### size()

> **size**(): `number`

###### Returns

`number`

##### assertArea()

> `static` **assertArea**\<`P`\>(`obj`, `msg`): `asserts obj is FeatureCollection<AreaObject, P>`

###### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

###### Parameters

| Parameter | theme_type                                                                    | theme_default_value |
| --------- | ----------------------------------------------------------------------------- | ------------------- |
| `obj`     | [`FeatureCollection`](#featurecollection)\<[`PureObject`](#pureobject), `P`\> | `undefined`         |
| `msg`     | `string`                                                                      | `"Expected area"`   |

###### Returns

`asserts obj is FeatureCollection<AreaObject, P>`

##### assertLine()

> `static` **assertLine**\<`P`\>(`obj`, `msg`): `asserts obj is FeatureCollection<LineObject, P>`

###### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

###### Parameters

| Parameter | theme_type                                                                    | theme_default_value |
| --------- | ----------------------------------------------------------------------------- | ------------------- |
| `obj`     | [`FeatureCollection`](#featurecollection)\<[`PureObject`](#pureobject), `P`\> | `undefined`         |
| `msg`     | `string`                                                                      | `"Expected line"`   |

###### Returns

`asserts obj is FeatureCollection<LineObject, P>`

##### assertPoint()

> `static` **assertPoint**\<`P`\>(`obj`, `msg`): `asserts obj is FeatureCollection<PointObject, P>`

###### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

###### Parameters

| Parameter | theme_type                                                                    | theme_default_value |
| --------- | ----------------------------------------------------------------------------- | ------------------- |
| `obj`     | [`FeatureCollection`](#featurecollection)\<[`PureObject`](#pureobject), `P`\> | `undefined`         |
| `msg`     | `string`                                                                      | `"Expected point"`  |

###### Returns

`asserts obj is FeatureCollection<PointObject, P>`

##### createAreaFromJson()

> `static` **createAreaFromJson**(`collection`, `shallow`, `options`): [`FeatureCollection`](#featurecollection)\<[`AreaObject`](#areaobject)\>

###### Parameters

| Parameter    | theme_type                                              | theme_default_value |
| ------------ | ------------------------------------------------------- | ------------------- |
| `collection` | `StrippedFeatureCollectionJson`                         | `undefined`         |
| `shallow`    | `boolean`                                               | `true`              |
| `options`    | [`CirclesToPolygonsOptions`](#circlestopolygonsoptions) | `{}`                |

###### Returns

[`FeatureCollection`](#featurecollection)\<[`AreaObject`](#areaobject)\>

##### createLineFromJson()

> `static` **createLineFromJson**(`collection`, `shallow`): [`FeatureCollection`](#featurecollection)\<[`LineObject`](#lineobject)\>

###### Parameters

| Parameter    | theme_type                      | theme_default_value |
| ------------ | ------------------------------- | ------------------- |
| `collection` | `StrippedFeatureCollectionJson` | `undefined`         |
| `shallow`    | `boolean`                       | `true`              |

###### Returns

[`FeatureCollection`](#featurecollection)\<[`LineObject`](#lineobject)\>

##### createPointFromJson()

> `static` **createPointFromJson**(`collection`, `shallow`): [`FeatureCollection`](#featurecollection)\<[`PointObject`](#pointobject)\>

###### Parameters

| Parameter    | theme_type                      | theme_default_value |
| ------------ | ------------------------------- | ------------------- |
| `collection` | `StrippedFeatureCollectionJson` | `undefined`         |
| `shallow`    | `boolean`                       | `true`              |

###### Returns

[`FeatureCollection`](#featurecollection)\<[`PointObject`](#pointobject)\>

##### isArea()

> `static` **isArea**\<`P`\>(`obj`): `obj is FeatureCollection<AreaObject, P>`

###### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

###### Parameters

| Parameter | theme_type                                                                    |
| --------- | ----------------------------------------------------------------------------- |
| `obj`     | [`FeatureCollection`](#featurecollection)\<[`PureObject`](#pureobject), `P`\> |

###### Returns

`obj is FeatureCollection<AreaObject, P>`

##### isLine()

> `static` **isLine**\<`P`\>(`obj`): `obj is FeatureCollection<LineObject, P>`

###### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

###### Parameters

| Parameter | theme_type                                                                    |
| --------- | ----------------------------------------------------------------------------- |
| `obj`     | [`FeatureCollection`](#featurecollection)\<[`PureObject`](#pureobject), `P`\> |

###### Returns

`obj is FeatureCollection<LineObject, P>`

##### isPoint()

> `static` **isPoint**\<`P`\>(`obj`): `obj is FeatureCollection<PointObject, P>`

###### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

###### Parameters

| Parameter | theme_type                                                                    |
| --------- | ----------------------------------------------------------------------------- |
| `obj`     | [`FeatureCollection`](#featurecollection)\<[`PureObject`](#pureobject), `P`\> |

###### Returns

`obj is FeatureCollection<PointObject, P>`

##### newArea()

> `static` **newArea**\<`F`, `PID`\>(`features`, `propertyRecord?`, `shallow?`): [`FeatureCollection`](#featurecollection)\<`F`, `PID`\>

###### Type Parameters

| Type Parameter                            | theme_default_type          |
| ----------------------------------------- | --------------------------- |
| `F` _extends_ [`AreaObject`](#areaobject) | [`AreaObject`](#areaobject) |
| `PID` _extends_ `string`                  | `string`                    |

###### Parameters

| Parameter         | theme_type                                     | theme_default_value |
| ----------------- | ---------------------------------------------- | ------------------- |
| `features`        | [`Feature`](#feature)\<`F`, `PID`\>[]          | `[]`                |
| `propertyRecord?` | [`PropertyRecord`](#propertyrecord-1)\<`PID`\> | `undefined`         |
| `shallow?`        | `boolean`                                      | `true`              |

###### Returns

[`FeatureCollection`](#featurecollection)\<`F`, `PID`\>

##### newLine()

> `static` **newLine**\<`F`, `PID`\>(`features`, `propertyRecord?`, `shallow?`): [`FeatureCollection`](#featurecollection)\<`F`, `PID`\>

###### Type Parameters

| Type Parameter                            | theme_default_type          |
| ----------------------------------------- | --------------------------- |
| `F` _extends_ [`LineObject`](#lineobject) | [`LineObject`](#lineobject) |
| `PID` _extends_ `string`                  | `string`                    |

###### Parameters

| Parameter         | theme_type                                     | theme_default_value |
| ----------------- | ---------------------------------------------- | ------------------- |
| `features`        | [`Feature`](#feature)\<`F`, `PID`\>[]          | `[]`                |
| `propertyRecord?` | [`PropertyRecord`](#propertyrecord-1)\<`PID`\> | `undefined`         |
| `shallow?`        | `boolean`                                      | `true`              |

###### Returns

[`FeatureCollection`](#featurecollection)\<`F`, `PID`\>

##### newPoint()

> `static` **newPoint**\<`F`, `PID`\>(`features`, `propertyRecord?`, `shallow?`): [`FeatureCollection`](#featurecollection)\<`F`, `PID`\>

###### Type Parameters

| Type Parameter                              | theme_default_type            |
| ------------------------------------------- | ----------------------------- |
| `F` _extends_ [`PointObject`](#pointobject) | [`PointObject`](#pointobject) |
| `PID` _extends_ `string`                    | `string`                      |

###### Parameters

| Parameter         | theme_type                                     | theme_default_value |
| ----------------- | ---------------------------------------------- | ------------------- |
| `features`        | [`Feature`](#feature)\<`F`, `PID`\>[]          | `[]`                |
| `propertyRecord?` | [`PropertyRecord`](#propertyrecord-1)\<`PID`\> | `undefined`         |
| `shallow?`        | `boolean`                                      | `true`              |

###### Returns

[`FeatureCollection`](#featurecollection)\<`F`, `PID`\>

---

### LineString

#### theme_extends

- `AbstractLineObject`\<[`LineString`](geojson-utils/geojson.md#linestring)\>

#### Implements

- [`LineString`](geojson-utils/geojson.md#linestring)

#### Constructors

##### Constructor

> **new LineString**(`obj`, `shallow`): [`LineString`](#linestring)

###### Parameters

| Parameter | theme_type                                                                                                 | theme_default_value |
| --------- | ---------------------------------------------------------------------------------------------------------- | ------------------- |
| `obj`     | [`OptionalParam`](utils.md#optionalparam)\<[`LineString`](geojson-utils/geojson.md#linestring), `"type"`\> | `undefined`         |
| `shallow` | `boolean`                                                                                                  | `true`              |

###### Returns

[`LineString`](#linestring)

###### Overrides

`AbstractLineObject<GJ.LineString>.constructor`

#### Properties

| Property                                 | theme_modifier | theme_type                                        |
| ---------------------------------------- | -------------- | ------------------------------------------------- |
| <a id="bbox-2"></a> `bbox?`              | `public`       | [`BBox`](geojson-utils/geojson.md#bbox-7)         |
| <a id="coordinates-1"></a> `coordinates` | `public`       | [`Position`](geojson-utils/geojson.md#position)[] |
| <a id="type-3"></a> `type`               | `readonly`     | `"LineString"`                                    |

#### Methods

##### buffer()

> **buffer**(`options`): `null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

###### Parameters

| Parameter | theme_type      |
| --------- | --------------- |
| `options` | `BufferOptions` |

###### Returns

`null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

##### centroid()

> **centroid**(`iterations`): [`Position`](geojson-utils/geojson.md#position)

###### Parameters

| Parameter    | theme_type | theme_default_value |
| ------------ | ---------- | ------------------- |
| `iterations` | `number`   | `2`                 |

###### Returns

[`Position`](geojson-utils/geojson.md#position)

###### Overrides

`AbstractLineObject.centroid`

##### copy()

> **copy**(`shallow`): [`LineString`](#linestring)

###### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

###### Returns

[`LineString`](#linestring)

###### Overrides

`AbstractLineObject.copy`

##### distanceToPosition()

> **distanceToPosition**(`position`): `number`

###### Parameters

| Parameter  | theme_type                                      |
| ---------- | ----------------------------------------------- |
| `position` | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`number`

###### Overrides

`AbstractLineObject.distanceToPosition`

##### geometricPrimitive()

> **geometricPrimitive**(): `"line"`

###### Returns

`"line"`

###### Inherited from

`AbstractLineObject.geometricPrimitive`

##### getBBox()

> **getBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

###### Inherited from

`AbstractLineObject.getBBox`

##### getCoordinateArray()

> **getCoordinateArray**(): [`Position`](geojson-utils/geojson.md#position)[][]

###### Returns

[`Position`](geojson-utils/geojson.md#position)[][]

###### Overrides

`AbstractLineObject.getCoordinateArray`

##### isArea()

> **isArea**(): `this is AreaObject`

###### Returns

`this is AreaObject`

###### Inherited from

`AbstractLineObject.isArea`

##### isLine()

> **isLine**(): `this is LineObject`

###### Returns

`this is LineObject`

###### Inherited from

`AbstractLineObject.isLine`

##### isPoint()

> **isPoint**(): `this is PointObject`

###### Returns

`this is PointObject`

###### Inherited from

`AbstractLineObject.isPoint`

##### length()

> **length**(): `number`

###### Returns

`number`

###### Overrides

`AbstractLineObject.length`

##### measure()

> **measure**(): `number`

###### Returns

`number`

###### Inherited from

`AbstractLineObject.measure`

##### pointInBBox()

> **pointInBBox**(`point`): `boolean`

###### Parameters

| Parameter | theme_type                                      |
| --------- | ----------------------------------------------- |
| `point`   | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`boolean`

###### Inherited from

`AbstractLineObject.pointInBBox`

##### setBBox()

> **setBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

###### Overrides

`AbstractLineObject.setBBox`

##### size()

> **size**(): `number`

###### Returns

`number`

###### Inherited from

`AbstractLineObject.size`

##### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is LineString`

###### Parameters

| Parameter | theme_type | theme_default_value     |
| --------- | ---------- | ----------------------- |
| `obj`     | `unknown`  | `undefined`             |
| `msg`     | `string`   | `"Expected LineString"` |

###### Returns

`asserts obj is LineString`

##### create()

> `static` **create**(`coordinates`, `shallow`): [`LineString`](#linestring)

###### Parameters

| Parameter     | theme_type                                        | theme_default_value |
| ------------- | ------------------------------------------------- | ------------------- |
| `coordinates` | [`Position`](geojson-utils/geojson.md#position)[] | `undefined`         |
| `shallow`     | `boolean`                                         | `true`              |

###### Returns

[`LineString`](#linestring)

##### isObject()

> `static` **isObject**(`obj`): `obj is LineString`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

###### Returns

`obj is LineString`

---

### MultiCircle

#### theme_extends

- `AbstractAreaObject`\<[`MultiCircle`](geojson-utils/geojson.md#multicircle)\>

#### Implements

- [`MultiCircle`](geojson-utils/geojson.md#multicircle)

#### Constructors

##### Constructor

> **new MultiCircle**(`obj`, `shallow`): [`MultiCircle`](#multicircle)

The `Circle` is a [MultiPoint](#multipoint) with the extra property `radius`.
Thus, it does not follow the GeoJSON standard, but can be converted to
a [MultiPolygon](#multipolygon) through the [MultiCircle.toPolygon](#topolygon-2).

MultiCircles MUST be non-overlapping.

###### Parameters

| Parameter | theme_type                                                                                                   | theme_default_value | theme_description                            |
| --------- | ------------------------------------------------------------------------------------------------------------ | ------------------- | -------------------------------------------- |
| `obj`     | [`OptionalParam`](utils.md#optionalparam)\<[`MultiCircle`](geojson-utils/geojson.md#multicircle), `"type"`\> | `undefined`         | -                                            |
| `shallow` | `boolean`                                                                                                    | `true`              | if `true`, copys by reference when possible. |

###### Returns

[`MultiCircle`](#multicircle)

###### Overrides

`AbstractAreaObject<GJ.MultiCircle>.constructor`

#### Properties

| Property                                 | theme_modifier | theme_type                                        |
| ---------------------------------------- | -------------- | ------------------------------------------------- |
| <a id="bbox-3"></a> `bbox?`              | `public`       | [`BBox`](geojson-utils/geojson.md#bbox-7)         |
| <a id="coordinates-2"></a> `coordinates` | `public`       | [`Position`](geojson-utils/geojson.md#position)[] |
| <a id="radius-1"></a> `radius`           | `public`       | `number`                                          |
| <a id="type-4"></a> `type`               | `readonly`     | `"MultiPoint"`                                    |

#### Methods

##### area()

> **area**(): `number`

###### Returns

`number`

###### Overrides

`AbstractAreaObject.area`

##### buffer()

> **buffer**(`options`): `null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon) \| [`Circle`](#circle) \| [`MultiCircle`](#multicircle)

###### Parameters

| Parameter | theme_type      |
| --------- | --------------- |
| `options` | `BufferOptions` |

###### Returns

`null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon) \| [`Circle`](#circle) \| [`MultiCircle`](#multicircle)

##### centroid()

> **centroid**(`iterations`): [`Position`](geojson-utils/geojson.md#position)

###### Parameters

| Parameter    | theme_type | theme_default_value |
| ------------ | ---------- | ------------------- |
| `iterations` | `number`   | `2`                 |

###### Returns

[`Position`](geojson-utils/geojson.md#position)

###### Overrides

`AbstractAreaObject.centroid`

##### copy()

> **copy**(`shallow`): [`MultiCircle`](#multicircle)

###### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

###### Returns

[`MultiCircle`](#multicircle)

###### Overrides

`AbstractAreaObject.copy`

##### distanceToPosition()

> **distanceToPosition**(`position`): `number`

###### Parameters

| Parameter  | theme_type                                      |
| ---------- | ----------------------------------------------- |
| `position` | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`number`

###### Overrides

`AbstractAreaObject.distanceToPosition`

##### geometricPrimitive()

> **geometricPrimitive**(): `"area"`

###### Returns

`"area"`

###### Inherited from

`AbstractAreaObject.geometricPrimitive`

##### getBBox()

> **getBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

###### Inherited from

`AbstractAreaObject.getBBox`

##### getCoordinateArray()

> **getCoordinateArray**(): [`Position`](geojson-utils/geojson.md#position)[]

###### Returns

[`Position`](geojson-utils/geojson.md#position)[]

###### Overrides

`AbstractAreaObject.getCoordinateArray`

##### includesPosition()

> **includesPosition**(`position`): `boolean`

###### Parameters

| Parameter  | theme_type                                      |
| ---------- | ----------------------------------------------- |
| `position` | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`boolean`

###### Overrides

`AbstractAreaObject.includesPosition`

##### isArea()

> **isArea**(): `this is AreaObject`

###### Returns

`this is AreaObject`

###### Inherited from

`AbstractAreaObject.isArea`

##### isLine()

> **isLine**(): `this is LineObject`

###### Returns

`this is LineObject`

###### Inherited from

`AbstractAreaObject.isLine`

##### isPoint()

> **isPoint**(): `this is PointObject`

###### Returns

`this is PointObject`

###### Inherited from

`AbstractAreaObject.isPoint`

##### measure()

> **measure**(): `number`

###### Returns

`number`

###### Inherited from

`AbstractAreaObject.measure`

##### perimeter()

> **perimeter**(): `number`

###### Returns

`number`

###### Overrides

`AbstractAreaObject.perimeter`

##### pointInBBox()

> **pointInBBox**(`point`): `boolean`

###### Parameters

| Parameter | theme_type                                      |
| --------- | ----------------------------------------------- |
| `point`   | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`boolean`

###### Inherited from

`AbstractAreaObject.pointInBBox`

##### setBBox()

> **setBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

###### Overrides

`AbstractAreaObject.setBBox`

##### size()

> **size**(): `number`

###### Returns

`number`

###### Overrides

`AbstractAreaObject.size`

##### toPolygon()

> **toPolygon**(`options`): `null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

Transforms the circles into (Multi)Polygon. If circles are overlapping, the MultiPolygon will
overlap as well.

###### Parameters

| Parameter | theme_type                                              |
| --------- | ------------------------------------------------------- |
| `options` | [`CirclesToPolygonsOptions`](#circlestopolygonsoptions) |

###### Returns

`null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

##### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is MultiCircle`

###### Parameters

| Parameter | theme_type | theme_default_value      |
| --------- | ---------- | ------------------------ |
| `obj`     | `unknown`  | `undefined`              |
| `msg`     | `string`   | `"Expected MultiCircle"` |

###### Returns

`asserts obj is MultiCircle`

##### create()

> `static` **create**(`coordinates`, `radius`, `shallow`): [`MultiCircle`](#multicircle)

###### Parameters

| Parameter     | theme_type                                        | theme_default_value |
| ------------- | ------------------------------------------------- | ------------------- |
| `coordinates` | [`Position`](geojson-utils/geojson.md#position)[] | `undefined`         |
| `radius`      | `number`                                          | `undefined`         |
| `shallow`     | `boolean`                                         | `true`              |

###### Returns

[`MultiCircle`](#multicircle)

##### isObject()

> `static` **isObject**(`obj`): `obj is MultiCircle`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

###### Returns

`obj is MultiCircle`

---

### MultiLineString

#### theme_extends

- `AbstractLineObject`\<[`MultiLineString`](geojson-utils/geojson.md#multilinestring)\>

#### Implements

- [`MultiLineString`](geojson-utils/geojson.md#multilinestring)

#### Constructors

##### Constructor

> **new MultiLineString**(`obj`, `shallow`): [`MultiLineString`](#multilinestring)

###### Parameters

| Parameter | theme_type                                                                                                           | theme_default_value |
| --------- | -------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `obj`     | [`OptionalParam`](utils.md#optionalparam)\<[`MultiLineString`](geojson-utils/geojson.md#multilinestring), `"type"`\> | `undefined`         |
| `shallow` | `boolean`                                                                                                            | `true`              |

###### Returns

[`MultiLineString`](#multilinestring)

###### Overrides

`AbstractLineObject<GJ.MultiLineString>.constructor`

#### Properties

| Property                                 | theme_modifier | theme_type                                          |
| ---------------------------------------- | -------------- | --------------------------------------------------- |
| <a id="bbox-4"></a> `bbox?`              | `public`       | [`BBox`](geojson-utils/geojson.md#bbox-7)           |
| <a id="coordinates-3"></a> `coordinates` | `public`       | [`Position`](geojson-utils/geojson.md#position)[][] |
| <a id="type-5"></a> `type`               | `readonly`     | `"MultiLineString"`                                 |

#### Methods

##### buffer()

> **buffer**(`options`): `null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

###### Parameters

| Parameter | theme_type      |
| --------- | --------------- |
| `options` | `BufferOptions` |

###### Returns

`null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

##### centroid()

> **centroid**(`iterations`): [`Position`](geojson-utils/geojson.md#position)

###### Parameters

| Parameter    | theme_type | theme_default_value |
| ------------ | ---------- | ------------------- |
| `iterations` | `number`   | `2`                 |

###### Returns

[`Position`](geojson-utils/geojson.md#position)

###### Overrides

`AbstractLineObject.centroid`

##### copy()

> **copy**(`shallow`): [`MultiLineString`](#multilinestring)

###### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

###### Returns

[`MultiLineString`](#multilinestring)

###### Overrides

`AbstractLineObject.copy`

##### distanceToPosition()

> **distanceToPosition**(`position`): `number`

###### Parameters

| Parameter  | theme_type                                      |
| ---------- | ----------------------------------------------- |
| `position` | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`number`

###### Overrides

`AbstractLineObject.distanceToPosition`

##### geometricPrimitive()

> **geometricPrimitive**(): `"line"`

###### Returns

`"line"`

###### Inherited from

`AbstractLineObject.geometricPrimitive`

##### getBBox()

> **getBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

###### Inherited from

`AbstractLineObject.getBBox`

##### getCoordinateArray()

> **getCoordinateArray**(): [`Position`](geojson-utils/geojson.md#position)[][]

###### Returns

[`Position`](geojson-utils/geojson.md#position)[][]

###### Overrides

`AbstractLineObject.getCoordinateArray`

##### isArea()

> **isArea**(): `this is AreaObject`

###### Returns

`this is AreaObject`

###### Inherited from

`AbstractLineObject.isArea`

##### isLine()

> **isLine**(): `this is LineObject`

###### Returns

`this is LineObject`

###### Inherited from

`AbstractLineObject.isLine`

##### isPoint()

> **isPoint**(): `this is PointObject`

###### Returns

`this is PointObject`

###### Inherited from

`AbstractLineObject.isPoint`

##### length()

> **length**(): `number`

###### Returns

`number`

###### Overrides

`AbstractLineObject.length`

##### measure()

> **measure**(): `number`

###### Returns

`number`

###### Inherited from

`AbstractLineObject.measure`

##### pointInBBox()

> **pointInBBox**(`point`): `boolean`

###### Parameters

| Parameter | theme_type                                      |
| --------- | ----------------------------------------------- |
| `point`   | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`boolean`

###### Inherited from

`AbstractLineObject.pointInBBox`

##### setBBox()

> **setBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

###### Overrides

`AbstractLineObject.setBBox`

##### size()

> **size**(): `number`

###### Returns

`number`

###### Overrides

`AbstractLineObject.size`

##### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is MultiLineString`

###### Parameters

| Parameter | theme_type | theme_default_value          |
| --------- | ---------- | ---------------------------- |
| `obj`     | `unknown`  | `undefined`                  |
| `msg`     | `string`   | `"Expected MultiLineString"` |

###### Returns

`asserts obj is MultiLineString`

##### create()

> `static` **create**(`coordinates`, `shallow`): [`MultiLineString`](#multilinestring)

###### Parameters

| Parameter     | theme_type                                          | theme_default_value |
| ------------- | --------------------------------------------------- | ------------------- |
| `coordinates` | [`Position`](geojson-utils/geojson.md#position)[][] | `undefined`         |
| `shallow`     | `boolean`                                           | `true`              |

###### Returns

[`MultiLineString`](#multilinestring)

##### isObject()

> `static` **isObject**(`obj`): `obj is MultiLineString`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

###### Returns

`obj is MultiLineString`

---

### MultiPoint

#### theme_extends

- `AbstractPointObject`\<[`MultiPoint`](geojson-utils/geojson.md#multipoint)\>

#### Implements

- [`MultiPoint`](geojson-utils/geojson.md#multipoint)

#### Constructors

##### Constructor

> **new MultiPoint**(`obj`, `shallow`): [`MultiPoint`](#multipoint)

###### Parameters

| Parameter | theme_type                                                                                                 | theme_default_value |
| --------- | ---------------------------------------------------------------------------------------------------------- | ------------------- |
| `obj`     | [`OptionalParam`](utils.md#optionalparam)\<[`MultiPoint`](geojson-utils/geojson.md#multipoint), `"type"`\> | `undefined`         |
| `shallow` | `boolean`                                                                                                  | `true`              |

###### Returns

[`MultiPoint`](#multipoint)

###### Overrides

`AbstractPointObject<GJ.MultiPoint>.constructor`

#### Properties

| Property                                 | theme_modifier | theme_type                                        |
| ---------------------------------------- | -------------- | ------------------------------------------------- |
| <a id="bbox-5"></a> `bbox?`              | `public`       | [`BBox`](geojson-utils/geojson.md#bbox-7)         |
| <a id="coordinates-4"></a> `coordinates` | `public`       | [`Position`](geojson-utils/geojson.md#position)[] |
| <a id="type-6"></a> `type`               | `readonly`     | `"MultiPoint"`                                    |

#### Methods

##### buffer()

> **buffer**(`options`): `null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon) \| [`Circle`](#circle) \| [`MultiCircle`](#multicircle)

###### Parameters

| Parameter | theme_type      |
| --------- | --------------- |
| `options` | `BufferOptions` |

###### Returns

`null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon) \| [`Circle`](#circle) \| [`MultiCircle`](#multicircle)

##### centroid()

> **centroid**(`iterations`): [`Position`](geojson-utils/geojson.md#position)

###### Parameters

| Parameter    | theme_type | theme_default_value |
| ------------ | ---------- | ------------------- |
| `iterations` | `number`   | `2`                 |

###### Returns

[`Position`](geojson-utils/geojson.md#position)

###### Overrides

`AbstractPointObject.centroid`

##### copy()

> **copy**(`shallow`): [`MultiPoint`](#multipoint)

###### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

###### Returns

[`MultiPoint`](#multipoint)

###### Overrides

`AbstractPointObject.copy`

##### count()

> **count**(): `number`

###### Returns

`number`

###### Inherited from

`AbstractPointObject.count`

##### distanceToPosition()

> **distanceToPosition**(`position`): `number`

###### Parameters

| Parameter  | theme_type                                      |
| ---------- | ----------------------------------------------- |
| `position` | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`number`

###### Overrides

`AbstractPointObject.distanceToPosition`

##### geometricPrimitive()

> **geometricPrimitive**(): `"point"`

###### Returns

`"point"`

###### Inherited from

`AbstractPointObject.geometricPrimitive`

##### getBBox()

> **getBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

###### Inherited from

`AbstractPointObject.getBBox`

##### getCoordinateArray()

> **getCoordinateArray**(): [`Position`](geojson-utils/geojson.md#position)[]

###### Returns

[`Position`](geojson-utils/geojson.md#position)[]

###### Overrides

`AbstractPointObject.getCoordinateArray`

##### isArea()

> **isArea**(): `this is AreaObject`

###### Returns

`this is AreaObject`

###### Inherited from

`AbstractPointObject.isArea`

##### isLine()

> **isLine**(): `this is LineObject`

###### Returns

`this is LineObject`

###### Inherited from

`AbstractPointObject.isLine`

##### isPoint()

> **isPoint**(): `this is PointObject`

###### Returns

`this is PointObject`

###### Inherited from

`AbstractPointObject.isPoint`

##### measure()

> **measure**(): `number`

###### Returns

`number`

###### Inherited from

`AbstractPointObject.measure`

##### pointInBBox()

> **pointInBBox**(`point`): `boolean`

###### Parameters

| Parameter | theme_type                                      |
| --------- | ----------------------------------------------- |
| `point`   | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`boolean`

###### Inherited from

`AbstractPointObject.pointInBBox`

##### setBBox()

> **setBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

###### Overrides

`AbstractPointObject.setBBox`

##### size()

> **size**(): `number`

###### Returns

`number`

###### Overrides

`AbstractPointObject.size`

##### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is MultiPoint`

###### Parameters

| Parameter | theme_type | theme_default_value     |
| --------- | ---------- | ----------------------- |
| `obj`     | `unknown`  | `undefined`             |
| `msg`     | `string`   | `"Expected MultiPoint"` |

###### Returns

`asserts obj is MultiPoint`

##### create()

> `static` **create**(`coordinates`, `shallow`): [`MultiPoint`](#multipoint)

###### Parameters

| Parameter     | theme_type                                        | theme_default_value |
| ------------- | ------------------------------------------------- | ------------------- |
| `coordinates` | [`Position`](geojson-utils/geojson.md#position)[] | `undefined`         |
| `shallow`     | `boolean`                                         | `true`              |

###### Returns

[`MultiPoint`](#multipoint)

##### isObject()

> `static` **isObject**(`obj`): `obj is MultiPoint`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

###### Returns

`obj is MultiPoint`

---

### MultiPolygon

#### theme_extends

- `AbstractAreaObject`\<[`MultiPolygon`](geojson-utils/geojson.md#multipolygon)\>

#### Implements

- [`MultiPolygon`](geojson-utils/geojson.md#multipolygon)

#### Constructors

##### Constructor

> **new MultiPolygon**(`obj`, `shallow`): [`MultiPolygon`](#multipolygon)

###### Parameters

| Parameter | theme_type                                                                                                     | theme_default_value |
| --------- | -------------------------------------------------------------------------------------------------------------- | ------------------- |
| `obj`     | [`OptionalParam`](utils.md#optionalparam)\<[`MultiPolygon`](geojson-utils/geojson.md#multipolygon), `"type"`\> | `undefined`         |
| `shallow` | `boolean`                                                                                                      | `true`              |

###### Returns

[`MultiPolygon`](#multipolygon)

###### Overrides

`AbstractAreaObject<GJ.MultiPolygon>.constructor`

#### Properties

| Property                                 | theme_modifier | theme_type                                            |
| ---------------------------------------- | -------------- | ----------------------------------------------------- |
| <a id="bbox-6"></a> `bbox?`              | `public`       | [`BBox`](geojson-utils/geojson.md#bbox-7)             |
| <a id="coordinates-5"></a> `coordinates` | `public`       | [`Position`](geojson-utils/geojson.md#position)[][][] |
| <a id="type-7"></a> `type`               | `readonly`     | `"MultiPolygon"`                                      |

#### Methods

##### area()

> **area**(): `number`

###### Returns

`number`

###### Overrides

`AbstractAreaObject.area`

##### buffer()

> **buffer**(`options`): `null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

###### Parameters

| Parameter | theme_type      |
| --------- | --------------- |
| `options` | `BufferOptions` |

###### Returns

`null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

##### centroid()

> **centroid**(`iterations`): [`Position`](geojson-utils/geojson.md#position)

###### Parameters

| Parameter    | theme_type | theme_default_value |
| ------------ | ---------- | ------------------- |
| `iterations` | `number`   | `2`                 |

###### Returns

[`Position`](geojson-utils/geojson.md#position)

###### Overrides

`AbstractAreaObject.centroid`

##### copy()

> **copy**(`shallow`): [`MultiPolygon`](#multipolygon)

###### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

###### Returns

[`MultiPolygon`](#multipolygon)

###### Overrides

`AbstractAreaObject.copy`

##### distanceToPosition()

> **distanceToPosition**(`position`): `number`

###### Parameters

| Parameter  | theme_type                                      |
| ---------- | ----------------------------------------------- |
| `position` | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`number`

###### Overrides

`AbstractAreaObject.distanceToPosition`

##### geometricPrimitive()

> **geometricPrimitive**(): `"area"`

###### Returns

`"area"`

###### Inherited from

`AbstractAreaObject.geometricPrimitive`

##### getBBox()

> **getBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

###### Inherited from

`AbstractAreaObject.getBBox`

##### getCoordinateArray()

> **getCoordinateArray**(): [`Position`](geojson-utils/geojson.md#position)[][][]

###### Returns

[`Position`](geojson-utils/geojson.md#position)[][][]

###### Overrides

`AbstractAreaObject.getCoordinateArray`

##### includesPosition()

> **includesPosition**(`position`): `boolean`

###### Parameters

| Parameter  | theme_type                                      |
| ---------- | ----------------------------------------------- |
| `position` | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`boolean`

###### Overrides

`AbstractAreaObject.includesPosition`

##### isArea()

> **isArea**(): `this is AreaObject`

###### Returns

`this is AreaObject`

###### Inherited from

`AbstractAreaObject.isArea`

##### isLine()

> **isLine**(): `this is LineObject`

###### Returns

`this is LineObject`

###### Inherited from

`AbstractAreaObject.isLine`

##### isPoint()

> **isPoint**(): `this is PointObject`

###### Returns

`this is PointObject`

###### Inherited from

`AbstractAreaObject.isPoint`

##### measure()

> **measure**(): `number`

###### Returns

`number`

###### Inherited from

`AbstractAreaObject.measure`

##### perimeter()

> **perimeter**(): `number`

###### Returns

`number`

###### Overrides

`AbstractAreaObject.perimeter`

##### pointInBBox()

> **pointInBBox**(`point`): `boolean`

###### Parameters

| Parameter | theme_type                                      |
| --------- | ----------------------------------------------- |
| `point`   | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`boolean`

###### Inherited from

`AbstractAreaObject.pointInBBox`

##### setBBox()

> **setBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

###### Overrides

`AbstractAreaObject.setBBox`

##### size()

> **size**(): `number`

###### Returns

`number`

###### Overrides

`AbstractAreaObject.size`

##### toPolygon()

> **toPolygon**(): `null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

###### Returns

`null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

##### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is MultiPolygon`

###### Parameters

| Parameter | theme_type | theme_default_value       |
| --------- | ---------- | ------------------------- |
| `obj`     | `unknown`  | `undefined`               |
| `msg`     | `string`   | `"Expected MultiPolygon"` |

###### Returns

`asserts obj is MultiPolygon`

##### create()

> `static` **create**(`coordinates`, `shallow`): [`MultiPolygon`](#multipolygon)

###### Parameters

| Parameter     | theme_type                                            | theme_default_value |
| ------------- | ----------------------------------------------------- | ------------------- |
| `coordinates` | [`Position`](geojson-utils/geojson.md#position)[][][] | `undefined`         |
| `shallow`     | `boolean`                                             | `true`              |

###### Returns

[`MultiPolygon`](#multipolygon)

##### isObject()

> `static` **isObject**(`obj`): `obj is MultiPolygon`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

###### Returns

`obj is MultiPolygon`

---

### Point

#### theme_extends

- `AbstractPointObject`\<[`Point`](geojson-utils/geojson.md#point)\>

#### Implements

- [`Point`](geojson-utils/geojson.md#point)

#### Constructors

##### Constructor

> **new Point**(`obj`, `shallow`): [`Point`](#point)

###### Parameters

| Parameter | theme_type                                                                                       | theme_default_value |
| --------- | ------------------------------------------------------------------------------------------------ | ------------------- |
| `obj`     | [`OptionalParam`](utils.md#optionalparam)\<[`Point`](geojson-utils/geojson.md#point), `"type"`\> | `undefined`         |
| `shallow` | `boolean`                                                                                        | `true`              |

###### Returns

[`Point`](#point)

###### Overrides

`AbstractPointObject<GJ.Point>.constructor`

#### Properties

| Property                                 | theme_modifier | theme_type                                      |
| ---------------------------------------- | -------------- | ----------------------------------------------- |
| <a id="bbox-7"></a> `bbox?`              | `public`       | [`BBox`](geojson-utils/geojson.md#bbox-7)       |
| <a id="coordinates-6"></a> `coordinates` | `public`       | [`Position`](geojson-utils/geojson.md#position) |
| <a id="type-8"></a> `type`               | `readonly`     | `"Point"`                                       |

#### Methods

##### buffer()

> **buffer**(`options`): `null` \| [`Circle`](#circle)

###### Parameters

| Parameter | theme_type      |
| --------- | --------------- |
| `options` | `BufferOptions` |

###### Returns

`null` \| [`Circle`](#circle)

##### centroid()

> **centroid**(): [`Position`](geojson-utils/geojson.md#position)

###### Returns

[`Position`](geojson-utils/geojson.md#position)

###### Overrides

`AbstractPointObject.centroid`

##### copy()

> **copy**(`shallow`): [`Point`](#point)

###### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

###### Returns

[`Point`](#point)

###### Overrides

`AbstractPointObject.copy`

##### count()

> **count**(): `number`

###### Returns

`number`

###### Inherited from

`AbstractPointObject.count`

##### distanceToPosition()

> **distanceToPosition**(`position`): `number`

###### Parameters

| Parameter  | theme_type                                      |
| ---------- | ----------------------------------------------- |
| `position` | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`number`

###### Overrides

`AbstractPointObject.distanceToPosition`

##### geometricPrimitive()

> **geometricPrimitive**(): `"point"`

###### Returns

`"point"`

###### Inherited from

`AbstractPointObject.geometricPrimitive`

##### getBBox()

> **getBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

###### Inherited from

`AbstractPointObject.getBBox`

##### getCoordinateArray()

> **getCoordinateArray**(): [`Position`](geojson-utils/geojson.md#position)[]

###### Returns

[`Position`](geojson-utils/geojson.md#position)[]

###### Overrides

`AbstractPointObject.getCoordinateArray`

##### isArea()

> **isArea**(): `this is AreaObject`

###### Returns

`this is AreaObject`

###### Inherited from

`AbstractPointObject.isArea`

##### isLine()

> **isLine**(): `this is LineObject`

###### Returns

`this is LineObject`

###### Inherited from

`AbstractPointObject.isLine`

##### isPoint()

> **isPoint**(): `this is PointObject`

###### Returns

`this is PointObject`

###### Inherited from

`AbstractPointObject.isPoint`

##### measure()

> **measure**(): `number`

###### Returns

`number`

###### Inherited from

`AbstractPointObject.measure`

##### pointInBBox()

> **pointInBBox**(`point`): `boolean`

###### Parameters

| Parameter | theme_type                                      |
| --------- | ----------------------------------------------- |
| `point`   | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`boolean`

###### Inherited from

`AbstractPointObject.pointInBBox`

##### setBBox()

> **setBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

###### Overrides

`AbstractPointObject.setBBox`

##### size()

> **size**(): `number`

###### Returns

`number`

###### Inherited from

`AbstractPointObject.size`

##### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is Point`

###### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `obj`     | `unknown`  | `undefined`         |
| `msg`     | `string`   | `"Expected Point"`  |

###### Returns

`asserts obj is Point`

##### create()

> `static` **create**(`coordinates`, `shallow`): [`Point`](#point)

###### Parameters

| Parameter     | theme_type                                      | theme_default_value |
| ------------- | ----------------------------------------------- | ------------------- |
| `coordinates` | [`Position`](geojson-utils/geojson.md#position) | `undefined`         |
| `shallow`     | `boolean`                                       | `true`              |

###### Returns

[`Point`](#point)

##### isObject()

> `static` **isObject**(`obj`): `obj is Point`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

###### Returns

`obj is Point`

---

### Polygon

#### theme_extends

- `AbstractAreaObject`\<[`Polygon`](geojson-utils/geojson.md#polygon)\>

#### Implements

- [`Polygon`](geojson-utils/geojson.md#polygon)

#### Constructors

##### Constructor

> **new Polygon**(`obj`, `shallow`): [`Polygon`](#polygon)

###### Parameters

| Parameter | theme_type                                                                                           | theme_default_value |
| --------- | ---------------------------------------------------------------------------------------------------- | ------------------- |
| `obj`     | [`OptionalParam`](utils.md#optionalparam)\<[`Polygon`](geojson-utils/geojson.md#polygon), `"type"`\> | `undefined`         |
| `shallow` | `boolean`                                                                                            | `true`              |

###### Returns

[`Polygon`](#polygon)

###### Overrides

`AbstractAreaObject<GJ.Polygon>.constructor`

#### Properties

| Property                                 | theme_modifier | theme_type                                          |
| ---------------------------------------- | -------------- | --------------------------------------------------- |
| <a id="bbox-8"></a> `bbox?`              | `public`       | [`BBox`](geojson-utils/geojson.md#bbox-7)           |
| <a id="coordinates-7"></a> `coordinates` | `public`       | [`Position`](geojson-utils/geojson.md#position)[][] |
| <a id="type-9"></a> `type`               | `readonly`     | `"Polygon"`                                         |

#### Methods

##### area()

> **area**(): `number`

###### Returns

`number`

###### Overrides

`AbstractAreaObject.area`

##### buffer()

> **buffer**(`options`): `null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

###### Parameters

| Parameter | theme_type      |
| --------- | --------------- |
| `options` | `BufferOptions` |

###### Returns

`null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

##### centroid()

> **centroid**(`iterations`): [`Position`](geojson-utils/geojson.md#position)

###### Parameters

| Parameter    | theme_type | theme_default_value |
| ------------ | ---------- | ------------------- |
| `iterations` | `number`   | `2`                 |

###### Returns

[`Position`](geojson-utils/geojson.md#position)

###### Overrides

`AbstractAreaObject.centroid`

##### copy()

> **copy**(`shallow`): [`Polygon`](#polygon)

###### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

###### Returns

[`Polygon`](#polygon)

###### Overrides

`AbstractAreaObject.copy`

##### distanceToPosition()

> **distanceToPosition**(`position`): `number`

###### Parameters

| Parameter  | theme_type                                      |
| ---------- | ----------------------------------------------- |
| `position` | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`number`

###### Overrides

`AbstractAreaObject.distanceToPosition`

##### geometricPrimitive()

> **geometricPrimitive**(): `"area"`

###### Returns

`"area"`

###### Inherited from

`AbstractAreaObject.geometricPrimitive`

##### getBBox()

> **getBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

###### Inherited from

`AbstractAreaObject.getBBox`

##### getCoordinateArray()

> **getCoordinateArray**(): [`Position`](geojson-utils/geojson.md#position)[][][]

###### Returns

[`Position`](geojson-utils/geojson.md#position)[][][]

###### Overrides

`AbstractAreaObject.getCoordinateArray`

##### includesPosition()

> **includesPosition**(`position`): `boolean`

###### Parameters

| Parameter  | theme_type                                      |
| ---------- | ----------------------------------------------- |
| `position` | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`boolean`

###### Overrides

`AbstractAreaObject.includesPosition`

##### isArea()

> **isArea**(): `this is AreaObject`

###### Returns

`this is AreaObject`

###### Inherited from

`AbstractAreaObject.isArea`

##### isLine()

> **isLine**(): `this is LineObject`

###### Returns

`this is LineObject`

###### Inherited from

`AbstractAreaObject.isLine`

##### isPoint()

> **isPoint**(): `this is PointObject`

###### Returns

`this is PointObject`

###### Inherited from

`AbstractAreaObject.isPoint`

##### measure()

> **measure**(): `number`

###### Returns

`number`

###### Inherited from

`AbstractAreaObject.measure`

##### perimeter()

> **perimeter**(): `number`

###### Returns

`number`

###### Overrides

`AbstractAreaObject.perimeter`

##### pointInBBox()

> **pointInBBox**(`point`): `boolean`

###### Parameters

| Parameter | theme_type                                      |
| --------- | ----------------------------------------------- |
| `point`   | [`Position`](geojson-utils/geojson.md#position) |

###### Returns

`boolean`

###### Inherited from

`AbstractAreaObject.pointInBBox`

##### setBBox()

> **setBBox**(): [`BBox`](geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

###### Overrides

`AbstractAreaObject.setBBox`

##### size()

> **size**(): `number`

###### Returns

`number`

###### Inherited from

`AbstractAreaObject.size`

##### toPolygon()

> **toPolygon**(): [`Polygon`](#polygon)

###### Returns

[`Polygon`](#polygon)

##### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is Polygon`

###### Parameters

| Parameter | theme_type | theme_default_value  |
| --------- | ---------- | -------------------- |
| `obj`     | `unknown`  | `undefined`          |
| `msg`     | `string`   | `"Expected Polygon"` |

###### Returns

`asserts obj is Polygon`

##### create()

> `static` **create**(`coordinates`, `shallow`): [`Polygon`](#polygon)

###### Parameters

| Parameter     | theme_type                                          | theme_default_value |
| ------------- | --------------------------------------------------- | ------------------- |
| `coordinates` | [`Position`](geojson-utils/geojson.md#position)[][] | `undefined`         |
| `shallow`     | `boolean`                                           | `true`              |

###### Returns

[`Polygon`](#polygon)

##### isObject()

> `static` **isObject**(`obj`): `obj is Polygon`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

###### Returns

`obj is Polygon`

---

### PropertyRecord\<IDS\>

#### Type Parameters

| Type Parameter           | theme_default_type |
| ------------------------ | ------------------ |
| `IDS` _extends_ `string` | `string`           |

#### Constructors

##### Constructor

> **new PropertyRecord**\<`IDS`\>(`record`, `shallow`): [`PropertyRecord`](#propertyrecord-1)\<`IDS`\>

###### Parameters

| Parameter | theme_type                               | theme_default_value |
| --------- | ---------------------------------------- | ------------------- |
| `record`  | [`PropertyList`](#propertylist)\<`IDS`\> | `undefined`         |
| `shallow` | `boolean`                                | `true`              |

###### Returns

[`PropertyRecord`](#propertyrecord-1)\<`IDS`\>

#### Properties

| Property                                 | theme_modifier | theme_type                                                                                                | theme_default_value |
| ---------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------- | ------------------- |
| <a id="record"></a> `record`             | `public`       | [`PropertyList`](#propertylist)\<`IDS`\>                                                                  | `undefined`         |
| <a id="special_keys"></a> `SPECIAL_KEYS` | `readonly`     | readonly \[`"_designWeight"`, `"_distance"`, `"_parent"`, `"_randomRotation"`, `"_measure"`, `"_count"`\] | `SPECIAL_KEYS`      |

#### Methods

##### addCategorical()

> **addCategorical**(`this`, `__namedParameters`): `string`

###### Parameters

| Parameter           | theme_type                                                             |
| ------------------- | ---------------------------------------------------------------------- |
| `this`              | [`PropertyRecord`](#propertyrecord-1)\<`string`\>                      |
| `__namedParameters` | `Partial`\<[`CategoricalProperty`](#categoricalproperty)\<`string`\>\> |

###### Returns

`string`

##### addNumerical()

> **addNumerical**(`this`, `__namedParameters`): `string`

###### Parameters

| Parameter           | theme_type                                                         |
| ------------------- | ------------------------------------------------------------------ |
| `this`              | [`PropertyRecord`](#propertyrecord-1)\<`string`\>                  |
| `__namedParameters` | `Partial`\<[`NumericalProperty`](#numericalproperty)\<`string`\>\> |

###### Returns

`string`

##### addProperty()

> **addProperty**(`this`, `property`): `string`

###### Parameters

| Parameter  | theme_type                                        |
| ---------- | ------------------------------------------------- |
| `this`     | [`PropertyRecord`](#propertyrecord-1)\<`string`\> |
| `property` | [`Property`](#property)\<`string`\>               |

###### Returns

`string`

##### addValueToCategory()

> **addValueToCategory**(`id`, `value`): `number`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `id`      | `IDS`      |
| `value`   | `string`   |

###### Returns

`number`

##### categoryHasValue()

> **categoryHasValue**(`id`, `value`): `boolean`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `id`      | `IDS`      |
| `value`   | `string`   |

###### Returns

`boolean`

##### copy()

> **copy**(`shallow`): [`PropertyRecord`](#propertyrecord-1)\<`IDS`\>

###### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

###### Returns

[`PropertyRecord`](#propertyrecord-1)\<`IDS`\>

##### getId()

###### Call Signature

> **getId**(`id`): [`Property`](#property)

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `id`      | `IDS`      |

###### Returns

[`Property`](#property)

###### Call Signature

> **getId**(`id?`): `null` \| [`Property`](#property)\<`string`\>

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `id?`     | `IDS`      |

###### Returns

`null` \| [`Property`](#property)\<`string`\>

##### getIds()

> **getIds**(): `string`[]

###### Returns

`string`[]

##### getRecord()

> **getRecord**(): [`Property`](#property)\<`string`\>[]

###### Returns

[`Property`](#property)\<`string`\>[]

##### hasId()

> **hasId**(`id?`): `boolean`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `id?`     | `string`   |

###### Returns

`boolean`

##### isCategorical()

> **isCategorical**(`id`): `boolean`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `id`      | `IDS`      |

###### Returns

`boolean`

##### isNumerical()

> **isNumerical**(`id`): `boolean`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `id`      | `IDS`      |

###### Returns

`boolean`

##### removeProperty()

> **removeProperty**(`this`, `id`): `void`

###### Parameters

| Parameter | theme_type                                        |
| --------- | ------------------------------------------------- |
| `this`    | [`PropertyRecord`](#propertyrecord-1)\<`string`\> |
| `id`      | `string`                                          |

###### Returns

`void`

##### copyRecord()

> `static` **copyRecord**\<`IDS`\>(`record`): [`PropertyList`](#propertylist)\<`IDS`\>

###### Type Parameters

| Type Parameter           |
| ------------------------ |
| `IDS` _extends_ `string` |

###### Parameters

| Parameter | theme_type                               |
| --------- | ---------------------------------------- |
| `record`  | [`PropertyList`](#propertylist)\<`IDS`\> |

###### Returns

[`PropertyList`](#propertylist)\<`IDS`\>

##### createFromFeature()

> `static` **createFromFeature**\<`IDS1`\>(`feature?`): [`PropertyRecord`](#propertyrecord-1)\<`IDS1`\>

###### Type Parameters

| Type Parameter            | theme_default_type |
| ------------------------- | ------------------ |
| `IDS1` _extends_ `string` | `string`           |

###### Parameters

| Parameter  | theme_type                                                   |
| ---------- | ------------------------------------------------------------ |
| `feature?` | [`Feature`](#feature)\<[`PureObject`](#pureobject), `IDS1`\> |

###### Returns

[`PropertyRecord`](#propertyrecord-1)\<`IDS1`\>

##### createFromJson()

> `static` **createFromJson**(`feature?`): [`PropertyRecord`](#propertyrecord-1)\<`string`\>

###### Parameters

| Parameter  | theme_type                                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| `feature?` | [`BaseFeature`](geojson-utils/geojson.md#basefeature)\<[`BaseGeometry`](geojson-utils/geojson.md#basegeometry), `unknown`\> |

###### Returns

[`PropertyRecord`](#propertyrecord-1)\<`string`\>

##### isCategorical()

> `static` **isCategorical**(`property`): `property is CategoricalProperty<string>`

###### Parameters

| Parameter  | theme_type                                    |
| ---------- | --------------------------------------------- |
| `property` | `null` \| [`Property`](#property)\<`string`\> |

###### Returns

`property is CategoricalProperty<string>`

##### isNumerical()

> `static` **isNumerical**(`property`): `property is NumericalProperty<string>`

###### Parameters

| Parameter  | theme_type                                    |
| ---------- | --------------------------------------------- |
| `property` | `null` \| [`Property`](#property)\<`string`\> |

###### Returns

`property is NumericalProperty<string>`

##### isRecord()

> `static` **isRecord**(`obj`): `obj is PropertyRecord<string>`

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

###### Returns

`obj is PropertyRecord<string>`

##### isSpecial()

> `static` **isSpecial**(`k`): k is "\_designWeight" \| "\_distance" \| "\_parent" \| "\_randomRotation" \| "\_measure" \| "\_count"

###### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `k`       | `string`   |

###### Returns

k is "\_designWeight" \| "\_distance" \| "\_parent" \| "\_randomRotation" \| "\_measure" \| "\_count"

##### mergeRecords()

> `static` **mergeRecords**\<`IDS1`, `IDS2`\>(`record1`, `record2`): [`PropertyRecord`](#propertyrecord-1)\<`IDS1` \| `IDS2`\>

###### Type Parameters

| Type Parameter            |
| ------------------------- |
| `IDS1` _extends_ `string` |
| `IDS2` _extends_ `string` |

###### Parameters

| Parameter | theme_type                                      |
| --------- | ----------------------------------------------- |
| `record1` | [`PropertyRecord`](#propertyrecord-1)\<`IDS1`\> |
| `record2` | [`PropertyRecord`](#propertyrecord-1)\<`IDS2`\> |

###### Returns

[`PropertyRecord`](#propertyrecord-1)\<`IDS1` \| `IDS2`\>

## Interfaces

### CategoricalProperty\<ID\>

#### theme_extends

- `PropertyBase`\<`ID`\>

#### Type Parameters

| Type Parameter          | theme_default_type |
| ----------------------- | ------------------ |
| `ID` _extends_ `string` | `string`           |

#### Properties

| Property                     | theme_type      | theme_description                                      |
| ---------------------------- | --------------- | ------------------------------------------------------ |
| <a id="id-2"></a> `id`       | `ID`            | The UUID of the Features property using this category. |
| <a id="name"></a> `name?`    | `string`        | A human-friendly name                                  |
| <a id="type-10"></a> `type`  | `"categorical"` | -                                                      |
| <a id="values"></a> `values` | `string`[]      | An ordered array of values defined on this category    |

---

### CirclesToPolygonsOptions

#### Properties

| Property                                        | theme_type | theme_description                              |
| ----------------------------------------------- | ---------- | ---------------------------------------------- |
| <a id="pointspercircle"></a> `pointsPerCircle?` | `number`   | The number of vertices to create on the circle |

---

### NumericalProperty\<ID\>

#### theme_extends

- `PropertyBase`\<`ID`\>

#### Type Parameters

| Type Parameter          | theme_default_type |
| ----------------------- | ------------------ |
| `ID` _extends_ `string` | `string`           |

#### Properties

| Property                      | theme_type             | theme_description                                      |
| ----------------------------- | ---------------------- | ------------------------------------------------------ |
| <a id="id-4"></a> `id`        | `ID`                   | The UUID of the Features property using this category. |
| <a id="name-1"></a> `name?`   | `string`               | A human-friendly name                                  |
| <a id="parent"></a> `parent?` | \[`string`, `number`\] | Holds id and index of collected categorical variable   |
| <a id="type-11"></a> `type`   | `"numerical"`          | -                                                      |

## Type Aliases

### AreaObject

> **AreaObject** = [`Circle`](#circle) \| [`MultiCircle`](#multicircle) \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

---

### DecreasingObject\<G\>

> **DecreasingObject**\<`G`\> = `G` _extends_ [`AreaObject`](#areaobject) ? [`PureObject`](#pureobject) : `G` _extends_ [`LineObject`](#lineobject) ? [`PureObject`](#pureobject)\<[`LineObject`](#lineobject) \| [`PointObject`](#pointobject)\> : `G` _extends_ [`PointObject`](#pointobject) ? [`PointObject`](#pointobject) : `never`

#### Type Parameters

| Type Parameter                            |
| ----------------------------------------- |
| `G` _extends_ [`PureObject`](#pureobject) |

---

### FeatureProperties\<IDS\>

> **FeatureProperties**\<`IDS`\> = `SpecialFeatureProperties` & `Record`\<`IDS`, `number` \| `string`\>

#### Type Parameters

| Type Parameter           | theme_default_type |
| ------------------------ | ------------------ |
| `IDS` _extends_ `string` | `string`           |

---

### IncreasingObject\<G\>

> **IncreasingObject**\<`G`\> = `G` _extends_ [`AreaObject`](#areaobject) ? [`AreaObject`](#areaobject) : `G` _extends_ [`LineObject`](#lineobject) ? [`PureObject`](#pureobject)\<[`AreaObject`](#areaobject) \| [`LineObject`](#lineobject)\> : `G` _extends_ [`PointObject`](#pointobject) ? [`PureObject`](#pureobject) : `never`

#### Type Parameters

| Type Parameter                            |
| ----------------------------------------- |
| `G` _extends_ [`PureObject`](#pureobject) |

---

### LineObject

> **LineObject** = [`LineString`](#linestring) \| [`MultiLineString`](#multilinestring)

---

### ObjectOfPrimitive\<T\>

> **ObjectOfPrimitive**\<`T`\> = `T` _extends_ [`GeometricPrimitiveArea`](geojson-utils/.md#geometricprimitivearea-1) ? [`AreaObject`](#areaobject) : `T` _extends_ [`GeometricPrimitiveLine`](geojson-utils/.md#geometricprimitiveline-1) ? [`LineObject`](#lineobject) : `T` _extends_ [`GeometricPrimitivePoint`](geojson-utils/.md#geometricprimitivepoint-1) ? [`PointObject`](#pointobject) : `never`

#### Type Parameters

| Type Parameter                                                                       |
| ------------------------------------------------------------------------------------ |
| `T` _extends_ [`GeometricPrimitiveUnion`](geojson-utils/.md#geometricprimitiveunion) |

---

### PointObject

> **PointObject** = [`Point`](#point) \| [`MultiPoint`](#multipoint)

---

### PrimitiveOfObject\<T\>

> **PrimitiveOfObject**\<`T`\> = `T` _extends_ [`AreaObject`](#areaobject) ? [`GeometricPrimitiveArea`](geojson-utils/.md#geometricprimitivearea-1) : `T` _extends_ [`LineObject`](#lineobject) ? [`GeometricPrimitiveLine`](geojson-utils/.md#geometricprimitiveline-1) : `T` _extends_ [`PointObject`](#pointobject) ? [`GeometricPrimitivePoint`](geojson-utils/.md#geometricprimitivepoint-1) : [`GeometricPrimitiveNone`](geojson-utils/.md#geometricprimitivenone-1)

#### Type Parameters

| Type Parameter                                                                                            |
| --------------------------------------------------------------------------------------------------------- |
| `T` _extends_ [`AreaObject`](#areaobject) \| [`LineObject`](#lineobject) \| [`PointObject`](#pointobject) |

---

### Property\<ID\>

> **Property**\<`ID`\> = [`NumericalProperty`](#numericalproperty)\<`ID`\> \| [`CategoricalProperty`](#categoricalproperty)\<`ID`\>

#### Type Parameters

| Type Parameter          | theme_default_type |
| ----------------------- | ------------------ |
| `ID` _extends_ `string` | `string`           |

---

### PropertyList\<IDS\>

> **PropertyList**\<`IDS`\> = `Record`\<`IDS`, [`Property`](#property)\<`IDS`\>\>

#### Type Parameters

| Type Parameter           | theme_default_type |
| ------------------------ | ------------------ |
| `IDS` _extends_ `string` | `string`           |

---

### PureObject\<T\>

> **PureObject**\<`T`\> = `T` _extends_ [`AreaObject`](#areaobject) ? `T` : `T` _extends_ [`LineObject`](#lineobject) ? `T` : `T` _extends_ [`PointObject`](#pointobject) ? `T` : `never`

#### Type Parameters

| Type Parameter                                                                                            | theme_default_type                                                                          |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `T` _extends_ [`AreaObject`](#areaobject) \| [`LineObject`](#lineobject) \| [`PointObject`](#pointobject) | [`AreaObject`](#areaobject) \| [`LineObject`](#lineobject) \| [`PointObject`](#pointobject) |

---

### RetractingObject\<G\>

> **RetractingObject**\<`G`\> = `G` _extends_ [`AreaObject`](#areaobject) ? [`PureObject`](#pureobject) : `G` _extends_ [`LineObject`](#lineobject) ? [`PureObject`](#pureobject)\<[`AreaObject`](#areaobject) \| [`LineObject`](#lineobject)\> : `G` _extends_ [`PointObject`](#pointobject) ? [`AreaObject`](#areaobject) : `never`

#### Type Parameters

| Type Parameter                            |
| ----------------------------------------- |
| `G` _extends_ [`PureObject`](#pureobject) |

---

### SpecialPropertyNames

> **SpecialPropertyNames** = _typeof_ `SPECIAL_KEYS`\[`number`\]

## Functions

### convexHull()

> **convexHull**(`collection`, `options`): `null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

Computes the convex hull from a collection using
Andrew's monotone chain algorithm. If the hull polygon
crosses the antimeridian, then the resulting collection will
contain a multipolygon.

#### Parameters

| Parameter    | theme_type                                                                                                                                                                                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](#featurecollection)\<[`AreaObject`](#areaobject), `string`\> \| [`FeatureCollection`](#featurecollection)\<[`LineObject`](#lineobject), `string`\> \| [`FeatureCollection`](#featurecollection)\<[`PointObject`](#pointobject), `string`\> |
| `options`    | [`CirclesToPolygonsOptions`](#circlestopolygonsoptions)                                                                                                                                                                                                          |

#### Returns

`null` \| [`Polygon`](#polygon) \| [`MultiPolygon`](#multipolygon)

---

### intersectAreaAreaGeometries()

> **intersectAreaAreaGeometries**(`geometry1`, `geometry2`, `options`): `null` \| [`AreaObject`](#areaobject)

Intersect of two areas.

#### Parameters

| Parameter   | theme_type                                              |
| ----------- | ------------------------------------------------------- |
| `geometry1` | [`AreaObject`](#areaobject)                             |
| `geometry2` | [`AreaObject`](#areaobject)                             |
| `options`   | [`CirclesToPolygonsOptions`](#circlestopolygonsoptions) |

#### Returns

`null` \| [`AreaObject`](#areaobject)

the intersect or `null` if no intersect

---

### intersectLineAreaGeometries()

> **intersectLineAreaGeometries**(`line`, `area`, `options`): `null` \| [`LineObject`](#lineobject)

Intersect between a line and an area.

#### Parameters

| Parameter | theme_type                                              |
| --------- | ------------------------------------------------------- |
| `line`    | [`LineObject`](#lineobject)                             |
| `area`    | [`AreaObject`](#areaobject)                             |
| `options` | [`CirclesToPolygonsOptions`](#circlestopolygonsoptions) |

#### Returns

`null` \| [`LineObject`](#lineobject)

the intersection or `null` if none exists.

---

### intersectLineLineGeometries()

> **intersectLineLineGeometries**(`geometry1`, `geometry2`): `null` \| [`PointObject`](#pointobject)

Intersect of two lines: the crossing-points between the lines in the two features.

#### Parameters

| Parameter   | theme_type                  |
| ----------- | --------------------------- |
| `geometry1` | [`LineObject`](#lineobject) |
| `geometry2` | [`LineObject`](#lineobject) |

#### Returns

`null` \| [`PointObject`](#pointobject)

the points of the crossings, or `null` if no crossings.

---

### intersectPointAreaGeometries()

> **intersectPointAreaGeometries**(`point`, `area`): `null` \| [`PointObject`](#pointobject)

Intersection of points and area.

#### Parameters

| Parameter | theme_type                    |
| --------- | ----------------------------- |
| `point`   | [`PointObject`](#pointobject) |
| `area`    | [`AreaObject`](#areaobject)   |

#### Returns

`null` \| [`PointObject`](#pointobject)

`null` if no intersection and PointFeature if intersection.

---

### perimeter()

> **perimeter**(`collection`): `number`

#### Parameters

| Parameter    | theme_type                                                               |
| ------------ | ------------------------------------------------------------------------ |
| `collection` | [`FeatureCollection`](#featurecollection)\<[`AreaObject`](#areaobject)\> |

#### Returns

`number`

---

### toAreaObject()

> **toAreaObject**(`geometry`, `shallow`, `options`): `null` \| [`AreaObject`](#areaobject)

#### Parameters

| Parameter  | theme_type                                              | theme_default_value |
| ---------- | ------------------------------------------------------- | ------------------- |
| `geometry` | [`BaseGeometry`](geojson-utils/geojson.md#basegeometry) | `undefined`         |
| `shallow`  | `boolean`                                               | `true`              |
| `options`  | [`CirclesToPolygonsOptions`](#circlestopolygonsoptions) | `{}`                |

#### Returns

`null` \| [`AreaObject`](#areaobject)

---

### toLineObject()

> **toLineObject**(`geometry`, `shallow`): `null` \| [`LineObject`](#lineobject)

#### Parameters

| Parameter  | theme_type                                              | theme_default_value |
| ---------- | ------------------------------------------------------- | ------------------- |
| `geometry` | [`BaseGeometry`](geojson-utils/geojson.md#basegeometry) | `undefined`         |
| `shallow`  | `boolean`                                               | `true`              |

#### Returns

`null` \| [`LineObject`](#lineobject)

---

### toPointObject()

> **toPointObject**(`geometry`, `shallow`): `null` \| [`PointObject`](#pointobject)

#### Parameters

| Parameter  | theme_type                                              | theme_default_value |
| ---------- | ------------------------------------------------------- | ------------------- |
| `geometry` | [`BaseGeometry`](geojson-utils/geojson.md#basegeometry) | `undefined`         |
| `shallow`  | `boolean`                                               | `true`              |

#### Returns

`null` \| [`PointObject`](#pointobject)

---

### union()

> **union**(`collection`, `options`): [`FeatureCollection`](#featurecollection)\<[`AreaObject`](#areaobject), `string`\>

#### Parameters

| Parameter    | theme_type                                                               | theme_description                        |
| ------------ | ------------------------------------------------------------------------ | ---------------------------------------- |
| `collection` | [`FeatureCollection`](#featurecollection)\<[`AreaObject`](#areaobject)\> | the collection to compute the union from |
| `options`    | [`CirclesToPolygonsOptions`](#circlestopolygonsoptions)                  | -                                        |

#### Returns

[`FeatureCollection`](#featurecollection)\<[`AreaObject`](#areaobject), `string`\>

the union of the polygons in the areaCollection
