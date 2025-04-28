[**Documentation**](../README.md)

---

[Documentation](../README.md) / @envisim/geojson

# @envisim/geojson

## Contents

- [Classes](#classes)
  - [Circle](#circle)
  - [Feature\<T, PID>](#featuret-pid)
  - [FeatureCollection\<T, PID>](#featurecollectiont-pid)
  - [LineString](#linestring)
  - [MultiCircle](#multicircle)
  - [MultiLineString](#multilinestring)
  - [MultiPoint](#multipoint)
  - [MultiPolygon](#multipolygon)
  - [Point](#point)
  - [Polygon](#polygon)
  - [PropertyRecord\<IDS>](#propertyrecordids)
- [Interfaces](#interfaces)
  - [BufferOptions](#bufferoptions)
  - [CategoricalProperty\<ID>](#categoricalpropertyid)
  - [CirclesToPolygonsOptions](#circlestopolygonsoptions)
  - [FeatureCollectionExtrasJson](#featurecollectionextrasjson)
  - [NumericalProperty\<ID>](#numericalpropertyid)
- [Type Aliases](#type-aliases)
  - [AreaObject](#areaobject)
  - [DecreasingObject\<G>](#decreasingobjectg)
  - [FeatureProperties\<IDS>](#featurepropertiesids)
  - [ForEachCallback()\<T>](#foreachcallbackt)
  - [IncreasingObject\<G>](#increasingobjectg)
  - [LineObject](#lineobject)
  - [ObjectOfPrimitive\<T>](#objectofprimitivet)
  - [PointObject](#pointobject)
  - [PrimitiveOfObject\<T>](#primitiveofobjectt)
  - [Property\<ID>](#propertyid)
  - [PropertyList\<IDS>](#propertylistids)
  - [PureObject\<T>](#pureobjectt)
  - [RetractingObject\<G>](#retractingobjectg)
  - [SpecialFeatureProperties](#specialfeatureproperties)
  - [SpecialPropertyNames](#specialpropertynames)
  - [StrippedFeatureCollectionJson](#strippedfeaturecollectionjson)
- [Variables](#variables)
  - [SPECIAL_KEYS](#special_keys)
- [Functions](#functions)
  - [convexHull()](#convexhull)
  - [intersectAreaAreaGeometries()](#intersectareaareageometries)
  - [intersectLineAreaGeometries()](#intersectlineareageometries)
  - [intersectLineLineGeometries()](#intersectlinelinegeometries)
  - [intersectPointAreaGeometries()](#intersectpointareageometries)
  - [perimeter()](#perimeter-4)
  - [toAreaObject()](#toareaobject)
  - [toLineObject()](#tolineobject)
  - [toPointObject()](#topointobject)
  - [union()](#union)

## Classes

### Circle

#### Extends

- `AbstractAreaObject`<[`Circle`](geojson-utils/@envisim/geojson-utils/geojson.md#circle)>

#### Implements

- [`Circle`](geojson-utils/@envisim/geojson-utils/geojson.md#circle)

#### Constructors

##### Constructor

> **new Circle**(`obj`, `shallow`): [`Circle`](#circle)

The `Circle` is a [Point](#point) with the extra property `radius`.
Thus, it does not follow the GeoJSON standard, but can be converted to
a [Polygon](#polygon) through the [Circle.toPolygon](#topolygon).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

[`OptionalParam`](utils.md#optionalparam)<[`Circle`](geojson-utils/@envisim/geojson-utils/geojson.md#circle), `"type"`>

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

if `true`, copys by reference when possible.

</td>
</tr>
</tbody>
</table>

###### Returns

[`Circle`](#circle)

###### Overrides

`AbstractAreaObject<GJ.Circle>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="bbox"></a> `bbox?`

</td>
<td>

`public`

</td>
<td>

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

</td>
</tr>
<tr>
<td>

<a id="coordinates"></a> `coordinates`

</td>
<td>

`public`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
<tr>
<td>

<a id="radius"></a> `radius`

</td>
<td>

`public`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

<a id="type"></a> `type`

</td>
<td>

`readonly`

</td>
<td>

`"Point"`

</td>
</tr>
</tbody>
</table>

#### Methods

##### area()

> **area**(): `number`

###### Returns

`number`

###### Overrides

`AbstractAreaObject.area`

##### buffer()

> **buffer**(`options`): `null` | [`Circle`](#circle)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`BufferOptions`](#bufferoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Circle`](#circle)

##### centroid()

> **centroid**(): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Overrides

`AbstractAreaObject.centroid`

##### copy()

> **copy**(`shallow`): [`Circle`](#circle)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Circle`](#circle)

###### Overrides

`AbstractAreaObject.copy`

##### distanceToPosition()

> **distanceToPosition**(`position`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`position`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

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

> **getBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Inherited from

`AbstractAreaObject.getBBox`

##### getCoordinateArray()

> **getCoordinateArray**(): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]

###### Overrides

`AbstractAreaObject.getCoordinateArray`

##### includesPosition()

> **includesPosition**(`position`): `boolean`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`position`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`point`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

`AbstractAreaObject.pointInBBox`

##### setBBox()

> **setBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Overrides

`AbstractAreaObject.setBBox`

##### size()

> **size**(): `number`

###### Returns

`number`

###### Inherited from

`AbstractAreaObject.size`

##### toPolygon()

> **toPolygon**(`options`): `null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`CirclesToPolygonsOptions`](#circlestopolygonsoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

##### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is Circle`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

`"Expected Circle"`

</td>
</tr>
</tbody>
</table>

###### Returns

`asserts obj is Circle`

##### create()

> `static` **create**(`coordinates`, `radius`, `shallow`): [`Circle`](#circle)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`coordinates`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`radius`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Circle`](#circle)

##### isObject()

> `static` **isObject**(`obj`): `obj is Circle`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`obj is Circle`

---

### Feature\<T, PID>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`PureObject`](#pureobject)

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`PID` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Implements

- [`BaseFeature`](geojson-utils/@envisim/geojson-utils/geojson.md#basefeature)<[`SingleTypeObject`](geojson-utils/@envisim/geojson-utils/geojson.md#singletypeobject), `number` | `string`>

#### Constructors

##### Constructor

> **new Feature**<`T`, `PID`>(`geometry`, `properties`, `shallow`): [`Feature`](#feature)<`T`, `PID`>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`geometry`

</td>
<td>

`T`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`properties`

</td>
<td>

[`FeatureProperties`](#featureproperties-1)<`PID`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Feature`](#feature)<`T`, `PID`>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="geometry"></a> `geometry`

</td>
<td>

`public`

</td>
<td>

`T`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="properties"></a> `properties`

</td>
<td>

`public`

</td>
<td>

[`FeatureProperties`](#featureproperties-1)<`PID`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="type-1"></a> `type`

</td>
<td>

`readonly`

</td>
<td>

`"Feature"`

</td>
<td>

`"Feature"`

</td>
</tr>
</tbody>
</table>

#### Methods

##### editProperty()

> **editProperty**(`id`, `callback`): [`FeatureProperties`](#featureproperties-1)\[`PID`]

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id`

</td>
<td>

`PID`

</td>
</tr>
<tr>
<td>

`callback`

</td>
<td>

(`value`) => [`FeatureProperties`](#featureproperties-1)\[`PID`]

</td>
</tr>
</tbody>
</table>

###### Returns

[`FeatureProperties`](#featureproperties-1)\[`PID`]

##### geometricPrimitive()

> **geometricPrimitive**(): `"area"` | `"line"` | `"point"`

###### Returns

`"area"` | `"line"` | `"point"`

##### getProperty()

> **getProperty**(`id`): `string` | `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id`

</td>
<td>

`PID`

</td>
</tr>
</tbody>
</table>

###### Returns

`string` | `number`

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### setProperty()

> **setProperty**(`id`, `value`): `void`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id`

</td>
<td>

`PID`

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

[`FeatureProperties`](#featureproperties-1)\[`PID`]

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### setSpecialPropertyDesignWeight()

> **setSpecialPropertyDesignWeight**(`value`): `void`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### setSpecialPropertyDistance()

> **setSpecialPropertyDistance**(`value`): `void`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### setSpecialPropertyMeasure()

> **setSpecialPropertyMeasure**(): `void`

###### Returns

`void`

##### setSpecialPropertyParent()

> **setSpecialPropertyParent**(`value`): `void`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### setSpecialPropertyRandomRotation()

> **setSpecialPropertyRandomRotation**(`value`): `void`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### assertArea()

> `static` **assertArea**(`obj`, `msg`): `asserts obj is Feature<AreaObject, string>`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

`"Expected area"`

</td>
</tr>
</tbody>
</table>

###### Returns

`asserts obj is Feature<AreaObject, string>`

##### assertLine()

> `static` **assertLine**(`obj`, `msg`): `asserts obj is Feature<LineObject, string>`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

`"Expected line"`

</td>
</tr>
</tbody>
</table>

###### Returns

`asserts obj is Feature<LineObject, string>`

##### assertPoint()

> `static` **assertPoint**(`obj`, `msg`): `asserts obj is Feature<PointObject, string>`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

`"Expected point"`

</td>
</tr>
</tbody>
</table>

###### Returns

`asserts obj is Feature<PointObject, string>`

##### createArea()

> `static` **createArea**<`PID`>(`geometry`, `properties?`, `shallow?`, `options?`): `null` | [`Feature`](#feature)<[`AreaObject`](#areaobject), `PID`>

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`PID` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`geometry`

</td>
<td>

[`BaseGeometry`](geojson-utils/@envisim/geojson-utils/geojson.md#basegeometry)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`properties?`

</td>
<td>

`null` | [`FeatureProperties`](#featureproperties-1)<`PID`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow?`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`CirclesToPolygonsOptions`](#circlestopolygonsoptions)

</td>
<td>

`{}`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Feature`](#feature)<[`AreaObject`](#areaobject), `PID`>

##### createAreaFromJson()

> `static` **createAreaFromJson**(`feature`, `shallow`): `null` | [`Feature`](#feature)<[`AreaObject`](#areaobject), `string`>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`feature`

</td>
<td>

[`OptionalParam`](utils.md#optionalparam)<[`BaseFeature`](geojson-utils/@envisim/geojson-utils/geojson.md#basefeature)<[`BaseGeometry`](geojson-utils/@envisim/geojson-utils/geojson.md#basegeometry), `string` | `number`>, `"type"`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Feature`](#feature)<[`AreaObject`](#areaobject), `string`>

##### createLine()

> `static` **createLine**<`PID`>(`geometry`, `properties?`, `shallow?`): `null` | [`Feature`](#feature)<[`LineObject`](#lineobject), `string`>

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`PID` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`geometry`

</td>
<td>

[`BaseGeometry`](geojson-utils/@envisim/geojson-utils/geojson.md#basegeometry)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`properties?`

</td>
<td>

`null` | [`FeatureProperties`](#featureproperties-1)<`PID`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow?`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Feature`](#feature)<[`LineObject`](#lineobject), `string`>

##### createLineFromJson()

> `static` **createLineFromJson**(`feature`, `shallow`): `null` | [`Feature`](#feature)<[`LineObject`](#lineobject), `string`>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`feature`

</td>
<td>

[`OptionalParam`](utils.md#optionalparam)<[`BaseFeature`](geojson-utils/@envisim/geojson-utils/geojson.md#basefeature)<[`BaseGeometry`](geojson-utils/@envisim/geojson-utils/geojson.md#basegeometry), `string` | `number`>, `"type"`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Feature`](#feature)<[`LineObject`](#lineobject), `string`>

##### createPoint()

> `static` **createPoint**<`PID`>(`geometry`, `properties?`, `shallow?`): `null` | [`Feature`](#feature)<[`PointObject`](#pointobject), `string`>

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`PID` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`geometry`

</td>
<td>

[`BaseGeometry`](geojson-utils/@envisim/geojson-utils/geojson.md#basegeometry)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`properties?`

</td>
<td>

`null` | [`FeatureProperties`](#featureproperties-1)<`PID`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow?`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Feature`](#feature)<[`PointObject`](#pointobject), `string`>

##### createPointFromJson()

> `static` **createPointFromJson**(`feature`, `shallow`): `null` | [`Feature`](#feature)<[`PointObject`](#pointobject), `string`>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`feature`

</td>
<td>

[`OptionalParam`](utils.md#optionalparam)<[`BaseFeature`](geojson-utils/@envisim/geojson-utils/geojson.md#basefeature)<[`BaseGeometry`](geojson-utils/@envisim/geojson-utils/geojson.md#basegeometry), `string` | `number`>, `"type"`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Feature`](#feature)<[`PointObject`](#pointobject), `string`>

##### isArea()

> `static` **isArea**(`obj`): `obj is Feature<AreaObject, string>`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`obj is Feature<AreaObject, string>`

##### isLine()

> `static` **isLine**(`obj`): `obj is Feature<LineObject, string>`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`obj is Feature<LineObject, string>`

##### isPoint()

> `static` **isPoint**(`obj`): `obj is Feature<PointObject, string>`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`obj is Feature<PointObject, string>`

---

### FeatureCollection\<T, PID>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`PureObject`](#pureobject)

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`PID` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Implements

- [`BaseFeatureCollection`](geojson-utils/@envisim/geojson-utils/geojson.md#basefeaturecollection)<[`BaseFeature`](geojson-utils/@envisim/geojson-utils/geojson.md#basefeature)<[`SingleTypeObject`](geojson-utils/@envisim/geojson-utils/geojson.md#singletypeobject), `number` | `string`>>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="bbox-1"></a> `bbox?`

</td>
<td>

`public`

</td>
<td>

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="color"></a> `color?`

</td>
<td>

`public`

</td>
<td>

\[`number`, `number`, `number`]

</td>
<td>

`undefined`

</td>
<td>

Foreign GeoJSON member, an RGB value associated with the collection

</td>
</tr>
<tr>
<td>

<a id="features"></a> `features`

</td>
<td>

`public`

</td>
<td>

[`Feature`](#feature)<`T`, `PID`>\[]

</td>
<td>

`[]`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="id"></a> `id?`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

Foreign GeoJSON member, the id of the collection

</td>
</tr>
<tr>
<td>

<a id="primitive"></a> `primitive`

</td>
<td>

`readonly`

</td>
<td>

[`GeometricPrimitiveUnion`](geojson-utils/@envisim/geojson-utils.md#geometricprimitiveunion)

</td>
<td>

`undefined`

</td>
<td>

Foreign GeoJSON member, geometric primitive of the collection

</td>
</tr>
<tr>
<td>

<a id="propertyrecord"></a> `propertyRecord`

</td>
<td>

`public`

</td>
<td>

[`PropertyRecord`](#propertyrecord-1)<`PID`>

</td>
<td>

`undefined`

</td>
<td>

Foreign GeoJSON member, the allowed properties of the collection

</td>
</tr>
<tr>
<td>

<a id="title"></a> `title?`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

Foreign GeoJSON member, the human readable name of the collection

</td>
</tr>
<tr>
<td>

<a id="type-2"></a> `type`

</td>
<td>

`readonly`

</td>
<td>

`"FeatureCollection"`

</td>
<td>

`"FeatureCollection"`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

#### Methods

##### addFeature()

> **addFeature**(`feature`, `shallow`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`feature`

</td>
<td>

[`Feature`](#feature)<`T`, `PID`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### addGeometry()

> **addGeometry**(`geometry`, `properties`, `shallow`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`geometry`

</td>
<td>

`T`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`properties`

</td>
<td>

[`FeatureProperties`](#featureproperties-1)<`PID`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### appendFeatureCollection()

> **appendFeatureCollection**(`fc`, `shallow`): `void`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`fc`

</td>
<td>

[`FeatureCollection`](#featurecollection)<`T`, `PID`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### buffer()

> **buffer**(`options`): `null` | [`FeatureCollection`](#featurecollection)<[`AreaObject`](#areaobject), `PID`>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`BufferOptions`](#bufferoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`FeatureCollection`](#featurecollection)<[`AreaObject`](#areaobject), `PID`>

##### centroid()

> **centroid**(`iterations`): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`iterations`

</td>
<td>

`number`

</td>
<td>

`2`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

##### clearFeatures()

> **clearFeatures**(): `void`

###### Returns

`void`

##### copy()

> **copy**(`shallow`, `options`): [`FeatureCollection`](#featurecollection)<`T`>

Transforms the categorical properties back to strings, and returns the json

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

if `true`, creates shallow copies of the features

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CirclesToPolygonsOptions`](#circlestopolygonsoptions) & { `convertCircles`: `boolean`; }

</td>
<td>

`{}`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

[`FeatureCollection`](#featurecollection)<`T`>

##### copyEmpty()

> **copyEmpty**(`shallow`): [`FeatureCollection`](#featurecollection)<`T`, `PID`>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`FeatureCollection`](#featurecollection)<`T`, `PID`>

##### distanceToPosition()

> **distanceToPosition**(`coords`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`coords`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### forEach()

> **forEach**(`callback`): `void`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`ForEachCallback`](#foreachcallback)<[`Feature`](#feature)<`T`, `PID`>>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### geomEach()

> **geomEach**(`callback`): `void`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`callback`

</td>
<td>

[`ForEachCallback`](#foreachcallback)<`T`>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### geometricPrimitive()

> **geometricPrimitive**(): [`GeometricPrimitiveUnion`](geojson-utils/@envisim/geojson-utils.md#geometricprimitiveunion)

###### Returns

[`GeometricPrimitiveUnion`](geojson-utils/@envisim/geojson-utils.md#geometricprimitiveunion)

##### getBBox()

> **getBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

##### measure()

> **measure**(): `number`

###### Returns

`number`

the measure of the collection: the total area of an area collection, the total length
of a line collection, and the total count of a point collection

##### removeFeature()

> **removeFeature**(`index`): `void`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### setBBox()

> **setBBox**(`force`): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`force`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

##### setProperty()

> **setProperty**(`id`, `index`, `value`): `void`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id`

</td>
<td>

`PID`

</td>
</tr>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`string` | `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### size()

> **size**(): `number`

###### Returns

`number`

##### assertArea()

> `static` **assertArea**<`P`>(`obj`, `msg`): `asserts obj is FeatureCollection<AreaObject, P>`

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

[`FeatureCollection`](#featurecollection)<[`PureObject`](#pureobject), `P`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

`"Expected area"`

</td>
</tr>
</tbody>
</table>

###### Returns

`asserts obj is FeatureCollection<AreaObject, P>`

##### assertLine()

> `static` **assertLine**<`P`>(`obj`, `msg`): `asserts obj is FeatureCollection<LineObject, P>`

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

[`FeatureCollection`](#featurecollection)<[`PureObject`](#pureobject), `P`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

`"Expected line"`

</td>
</tr>
</tbody>
</table>

###### Returns

`asserts obj is FeatureCollection<LineObject, P>`

##### assertPoint()

> `static` **assertPoint**<`P`>(`obj`, `msg`): `asserts obj is FeatureCollection<PointObject, P>`

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

[`FeatureCollection`](#featurecollection)<[`PureObject`](#pureobject), `P`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

`"Expected point"`

</td>
</tr>
</tbody>
</table>

###### Returns

`asserts obj is FeatureCollection<PointObject, P>`

##### createAreaFromJson()

> `static` **createAreaFromJson**(`collection`, `shallow`, `options`): [`FeatureCollection`](#featurecollection)<[`AreaObject`](#areaobject)>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`collection`

</td>
<td>

[`StrippedFeatureCollectionJson`](#strippedfeaturecollectionjson)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CirclesToPolygonsOptions`](#circlestopolygonsoptions)

</td>
<td>

`{}`

</td>
</tr>
</tbody>
</table>

###### Returns

[`FeatureCollection`](#featurecollection)<[`AreaObject`](#areaobject)>

##### createLineFromJson()

> `static` **createLineFromJson**(`collection`, `shallow`): [`FeatureCollection`](#featurecollection)<[`LineObject`](#lineobject)>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`collection`

</td>
<td>

[`StrippedFeatureCollectionJson`](#strippedfeaturecollectionjson)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`FeatureCollection`](#featurecollection)<[`LineObject`](#lineobject)>

##### createPointFromJson()

> `static` **createPointFromJson**(`collection`, `shallow`): [`FeatureCollection`](#featurecollection)<[`PointObject`](#pointobject)>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`collection`

</td>
<td>

[`StrippedFeatureCollectionJson`](#strippedfeaturecollectionjson)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`FeatureCollection`](#featurecollection)<[`PointObject`](#pointobject)>

##### isArea()

> `static` **isArea**<`P`>(`obj`): `obj is FeatureCollection<AreaObject, P>`

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

[`FeatureCollection`](#featurecollection)<[`PureObject`](#pureobject), `P`>

</td>
</tr>
</tbody>
</table>

###### Returns

`obj is FeatureCollection<AreaObject, P>`

##### isLine()

> `static` **isLine**<`P`>(`obj`): `obj is FeatureCollection<LineObject, P>`

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

[`FeatureCollection`](#featurecollection)<[`PureObject`](#pureobject), `P`>

</td>
</tr>
</tbody>
</table>

###### Returns

`obj is FeatureCollection<LineObject, P>`

##### isPoint()

> `static` **isPoint**<`P`>(`obj`): `obj is FeatureCollection<PointObject, P>`

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

[`FeatureCollection`](#featurecollection)<[`PureObject`](#pureobject), `P`>

</td>
</tr>
</tbody>
</table>

###### Returns

`obj is FeatureCollection<PointObject, P>`

##### newArea()

> `static` **newArea**<`F`, `PID`>(`features`, `propertyRecord?`, `shallow?`): [`FeatureCollection`](#featurecollection)<`F`, `PID`>

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`F` _extends_ [`AreaObject`](#areaobject)

</td>
<td>

[`AreaObject`](#areaobject)

</td>
</tr>
<tr>
<td>

`PID` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`features`

</td>
<td>

[`Feature`](#feature)<`F`, `PID`>\[]

</td>
<td>

`[]`

</td>
</tr>
<tr>
<td>

`propertyRecord?`

</td>
<td>

[`PropertyRecord`](#propertyrecord-1)<`PID`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow?`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`FeatureCollection`](#featurecollection)<`F`, `PID`>

##### newLine()

> `static` **newLine**<`F`, `PID`>(`features`, `propertyRecord?`, `shallow?`): [`FeatureCollection`](#featurecollection)<`F`, `PID`>

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`F` _extends_ [`LineObject`](#lineobject)

</td>
<td>

[`LineObject`](#lineobject)

</td>
</tr>
<tr>
<td>

`PID` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`features`

</td>
<td>

[`Feature`](#feature)<`F`, `PID`>\[]

</td>
<td>

`[]`

</td>
</tr>
<tr>
<td>

`propertyRecord?`

</td>
<td>

[`PropertyRecord`](#propertyrecord-1)<`PID`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow?`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`FeatureCollection`](#featurecollection)<`F`, `PID`>

##### newPoint()

> `static` **newPoint**<`F`, `PID`>(`features`, `propertyRecord?`, `shallow?`): [`FeatureCollection`](#featurecollection)<`F`, `PID`>

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`F` _extends_ [`PointObject`](#pointobject)

</td>
<td>

[`PointObject`](#pointobject)

</td>
</tr>
<tr>
<td>

`PID` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`features`

</td>
<td>

[`Feature`](#feature)<`F`, `PID`>\[]

</td>
<td>

`[]`

</td>
</tr>
<tr>
<td>

`propertyRecord?`

</td>
<td>

[`PropertyRecord`](#propertyrecord-1)<`PID`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow?`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`FeatureCollection`](#featurecollection)<`F`, `PID`>

---

### LineString

#### Extends

- `AbstractLineObject`<[`LineString`](geojson-utils/@envisim/geojson-utils/geojson.md#linestring)>

#### Implements

- [`LineString`](geojson-utils/@envisim/geojson-utils/geojson.md#linestring)

#### Constructors

##### Constructor

> **new LineString**(`obj`, `shallow`): [`LineString`](#linestring)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

[`OptionalParam`](utils.md#optionalparam)<[`LineString`](geojson-utils/@envisim/geojson-utils/geojson.md#linestring), `"type"`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`LineString`](#linestring)

###### Overrides

`AbstractLineObject<GJ.LineString>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="bbox-2"></a> `bbox?`

</td>
<td>

`public`

</td>
<td>

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

</td>
</tr>
<tr>
<td>

<a id="coordinates-1"></a> `coordinates`

</td>
<td>

`public`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]

</td>
</tr>
<tr>
<td>

<a id="type-3"></a> `type`

</td>
<td>

`readonly`

</td>
<td>

`"LineString"`

</td>
</tr>
</tbody>
</table>

#### Methods

##### buffer()

> **buffer**(`options`): `null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`BufferOptions`](#bufferoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

##### centroid()

> **centroid**(`iterations`): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`iterations`

</td>
<td>

`number`

</td>
<td>

`2`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Overrides

`AbstractLineObject.centroid`

##### copy()

> **copy**(`shallow`): [`LineString`](#linestring)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`LineString`](#linestring)

###### Overrides

`AbstractLineObject.copy`

##### distanceToPosition()

> **distanceToPosition**(`position`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`position`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

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

> **getBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Inherited from

`AbstractLineObject.getBBox`

##### getCoordinateArray()

> **getCoordinateArray**(): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]\[]

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]\[]

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`point`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

`AbstractLineObject.pointInBBox`

##### setBBox()

> **setBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

`"Expected LineString"`

</td>
</tr>
</tbody>
</table>

###### Returns

`asserts obj is LineString`

##### create()

> `static` **create**(`coordinates`, `shallow`): [`LineString`](#linestring)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`coordinates`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`LineString`](#linestring)

##### isObject()

> `static` **isObject**(`obj`): `obj is LineString`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`obj is LineString`

---

### MultiCircle

#### Extends

- `AbstractAreaObject`<[`MultiCircle`](geojson-utils/@envisim/geojson-utils/geojson.md#multicircle)>

#### Implements

- [`MultiCircle`](geojson-utils/@envisim/geojson-utils/geojson.md#multicircle)

#### Constructors

##### Constructor

> **new MultiCircle**(`obj`, `shallow`): [`MultiCircle`](#multicircle)

The `Circle` is a [MultiPoint](#multipoint) with the extra property `radius`.
Thus, it does not follow the GeoJSON standard, but can be converted to
a [MultiPolygon](#multipolygon) through the [MultiCircle.toPolygon](#topolygon-2).

MultiCircles MUST be non-overlapping.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

[`OptionalParam`](utils.md#optionalparam)<[`MultiCircle`](geojson-utils/@envisim/geojson-utils/geojson.md#multicircle), `"type"`>

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

if `true`, copys by reference when possible.

</td>
</tr>
</tbody>
</table>

###### Returns

[`MultiCircle`](#multicircle)

###### Overrides

`AbstractAreaObject<GJ.MultiCircle>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="bbox-3"></a> `bbox?`

</td>
<td>

`public`

</td>
<td>

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

</td>
</tr>
<tr>
<td>

<a id="coordinates-2"></a> `coordinates`

</td>
<td>

`public`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]

</td>
</tr>
<tr>
<td>

<a id="radius-1"></a> `radius`

</td>
<td>

`public`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

<a id="type-4"></a> `type`

</td>
<td>

`readonly`

</td>
<td>

`"MultiPoint"`

</td>
</tr>
</tbody>
</table>

#### Methods

##### area()

> **area**(): `number`

###### Returns

`number`

###### Overrides

`AbstractAreaObject.area`

##### buffer()

> **buffer**(`options`): `null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon) | [`Circle`](#circle) | [`MultiCircle`](#multicircle)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`BufferOptions`](#bufferoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon) | [`Circle`](#circle) | [`MultiCircle`](#multicircle)

##### centroid()

> **centroid**(`iterations`): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`iterations`

</td>
<td>

`number`

</td>
<td>

`2`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Overrides

`AbstractAreaObject.centroid`

##### copy()

> **copy**(`shallow`): [`MultiCircle`](#multicircle)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MultiCircle`](#multicircle)

###### Overrides

`AbstractAreaObject.copy`

##### distanceToPosition()

> **distanceToPosition**(`position`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`position`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

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

> **getBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Inherited from

`AbstractAreaObject.getBBox`

##### getCoordinateArray()

> **getCoordinateArray**(): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]

###### Overrides

`AbstractAreaObject.getCoordinateArray`

##### includesPosition()

> **includesPosition**(`position`): `boolean`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`position`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`point`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

`AbstractAreaObject.pointInBBox`

##### setBBox()

> **setBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Overrides

`AbstractAreaObject.setBBox`

##### size()

> **size**(): `number`

###### Returns

`number`

###### Overrides

`AbstractAreaObject.size`

##### toPolygon()

> **toPolygon**(`options`): `null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

Transforms the circles into (Multi)Polygon. If circles are overlapping, the MultiPolygon will
overlap as well.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`CirclesToPolygonsOptions`](#circlestopolygonsoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

##### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is MultiCircle`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

`"Expected MultiCircle"`

</td>
</tr>
</tbody>
</table>

###### Returns

`asserts obj is MultiCircle`

##### create()

> `static` **create**(`coordinates`, `radius`, `shallow`): [`MultiCircle`](#multicircle)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`coordinates`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`radius`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MultiCircle`](#multicircle)

##### isObject()

> `static` **isObject**(`obj`): `obj is MultiCircle`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`obj is MultiCircle`

---

### MultiLineString

#### Extends

- `AbstractLineObject`<[`MultiLineString`](geojson-utils/@envisim/geojson-utils/geojson.md#multilinestring)>

#### Implements

- [`MultiLineString`](geojson-utils/@envisim/geojson-utils/geojson.md#multilinestring)

#### Constructors

##### Constructor

> **new MultiLineString**(`obj`, `shallow`): [`MultiLineString`](#multilinestring)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

[`OptionalParam`](utils.md#optionalparam)<[`MultiLineString`](geojson-utils/@envisim/geojson-utils/geojson.md#multilinestring), `"type"`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MultiLineString`](#multilinestring)

###### Overrides

`AbstractLineObject<GJ.MultiLineString>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="bbox-4"></a> `bbox?`

</td>
<td>

`public`

</td>
<td>

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

</td>
</tr>
<tr>
<td>

<a id="coordinates-3"></a> `coordinates`

</td>
<td>

`public`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]\[]

</td>
</tr>
<tr>
<td>

<a id="type-5"></a> `type`

</td>
<td>

`readonly`

</td>
<td>

`"MultiLineString"`

</td>
</tr>
</tbody>
</table>

#### Methods

##### buffer()

> **buffer**(`options`): `null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`BufferOptions`](#bufferoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

##### centroid()

> **centroid**(`iterations`): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`iterations`

</td>
<td>

`number`

</td>
<td>

`2`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Overrides

`AbstractLineObject.centroid`

##### copy()

> **copy**(`shallow`): [`MultiLineString`](#multilinestring)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MultiLineString`](#multilinestring)

###### Overrides

`AbstractLineObject.copy`

##### distanceToPosition()

> **distanceToPosition**(`position`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`position`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

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

> **getBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Inherited from

`AbstractLineObject.getBBox`

##### getCoordinateArray()

> **getCoordinateArray**(): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]\[]

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]\[]

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`point`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

`AbstractLineObject.pointInBBox`

##### setBBox()

> **setBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

`"Expected MultiLineString"`

</td>
</tr>
</tbody>
</table>

###### Returns

`asserts obj is MultiLineString`

##### create()

> `static` **create**(`coordinates`, `shallow`): [`MultiLineString`](#multilinestring)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`coordinates`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]\[]

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MultiLineString`](#multilinestring)

##### isObject()

> `static` **isObject**(`obj`): `obj is MultiLineString`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`obj is MultiLineString`

---

### MultiPoint

#### Extends

- `AbstractPointObject`<[`MultiPoint`](geojson-utils/@envisim/geojson-utils/geojson.md#multipoint)>

#### Implements

- [`MultiPoint`](geojson-utils/@envisim/geojson-utils/geojson.md#multipoint)

#### Constructors

##### Constructor

> **new MultiPoint**(`obj`, `shallow`): [`MultiPoint`](#multipoint)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

[`OptionalParam`](utils.md#optionalparam)<[`MultiPoint`](geojson-utils/@envisim/geojson-utils/geojson.md#multipoint), `"type"`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MultiPoint`](#multipoint)

###### Overrides

`AbstractPointObject<GJ.MultiPoint>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="bbox-5"></a> `bbox?`

</td>
<td>

`public`

</td>
<td>

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

</td>
</tr>
<tr>
<td>

<a id="coordinates-4"></a> `coordinates`

</td>
<td>

`public`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]

</td>
</tr>
<tr>
<td>

<a id="type-6"></a> `type`

</td>
<td>

`readonly`

</td>
<td>

`"MultiPoint"`

</td>
</tr>
</tbody>
</table>

#### Methods

##### buffer()

> **buffer**(`options`): `null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon) | [`Circle`](#circle) | [`MultiCircle`](#multicircle)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`BufferOptions`](#bufferoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon) | [`Circle`](#circle) | [`MultiCircle`](#multicircle)

##### centroid()

> **centroid**(`iterations`): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`iterations`

</td>
<td>

`number`

</td>
<td>

`2`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Overrides

`AbstractPointObject.centroid`

##### copy()

> **copy**(`shallow`): [`MultiPoint`](#multipoint)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`position`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

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

> **getBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Inherited from

`AbstractPointObject.getBBox`

##### getCoordinateArray()

> **getCoordinateArray**(): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`point`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

`AbstractPointObject.pointInBBox`

##### setBBox()

> **setBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

`"Expected MultiPoint"`

</td>
</tr>
</tbody>
</table>

###### Returns

`asserts obj is MultiPoint`

##### create()

> `static` **create**(`coordinates`, `shallow`): [`MultiPoint`](#multipoint)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`coordinates`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MultiPoint`](#multipoint)

##### isObject()

> `static` **isObject**(`obj`): `obj is MultiPoint`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`obj is MultiPoint`

---

### MultiPolygon

#### Extends

- `AbstractAreaObject`<[`MultiPolygon`](geojson-utils/@envisim/geojson-utils/geojson.md#multipolygon)>

#### Implements

- [`MultiPolygon`](geojson-utils/@envisim/geojson-utils/geojson.md#multipolygon)

#### Constructors

##### Constructor

> **new MultiPolygon**(`obj`, `shallow`): [`MultiPolygon`](#multipolygon)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

[`OptionalParam`](utils.md#optionalparam)<[`MultiPolygon`](geojson-utils/@envisim/geojson-utils/geojson.md#multipolygon), `"type"`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MultiPolygon`](#multipolygon)

###### Overrides

`AbstractAreaObject<GJ.MultiPolygon>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="bbox-6"></a> `bbox?`

</td>
<td>

`public`

</td>
<td>

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

</td>
</tr>
<tr>
<td>

<a id="coordinates-5"></a> `coordinates`

</td>
<td>

`public`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]\[]\[]

</td>
</tr>
<tr>
<td>

<a id="type-7"></a> `type`

</td>
<td>

`readonly`

</td>
<td>

`"MultiPolygon"`

</td>
</tr>
</tbody>
</table>

#### Methods

##### area()

> **area**(): `number`

###### Returns

`number`

###### Overrides

`AbstractAreaObject.area`

##### buffer()

> **buffer**(`options`): `null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`BufferOptions`](#bufferoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

##### centroid()

> **centroid**(`iterations`): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`iterations`

</td>
<td>

`number`

</td>
<td>

`2`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Overrides

`AbstractAreaObject.centroid`

##### copy()

> **copy**(`shallow`): [`MultiPolygon`](#multipolygon)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MultiPolygon`](#multipolygon)

###### Overrides

`AbstractAreaObject.copy`

##### distanceToPosition()

> **distanceToPosition**(`position`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`position`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

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

> **getBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Inherited from

`AbstractAreaObject.getBBox`

##### getCoordinateArray()

> **getCoordinateArray**(): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]\[]\[]

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]\[]\[]

###### Overrides

`AbstractAreaObject.getCoordinateArray`

##### includesPosition()

> **includesPosition**(`position`): `boolean`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`position`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`point`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

`AbstractAreaObject.pointInBBox`

##### setBBox()

> **setBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Overrides

`AbstractAreaObject.setBBox`

##### size()

> **size**(): `number`

###### Returns

`number`

###### Overrides

`AbstractAreaObject.size`

##### toPolygon()

> **toPolygon**(): `null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

###### Returns

`null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

##### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is MultiPolygon`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

`"Expected MultiPolygon"`

</td>
</tr>
</tbody>
</table>

###### Returns

`asserts obj is MultiPolygon`

##### create()

> `static` **create**(`coordinates`, `shallow`): [`MultiPolygon`](#multipolygon)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`coordinates`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]\[]\[]

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MultiPolygon`](#multipolygon)

##### isObject()

> `static` **isObject**(`obj`): `obj is MultiPolygon`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`obj is MultiPolygon`

---

### Point

#### Extends

- `AbstractPointObject`<[`Point`](geojson-utils/@envisim/geojson-utils/geojson.md#point)>

#### Implements

- [`Point`](geojson-utils/@envisim/geojson-utils/geojson.md#point)

#### Constructors

##### Constructor

> **new Point**(`obj`, `shallow`): [`Point`](#point)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

[`OptionalParam`](utils.md#optionalparam)<[`Point`](geojson-utils/@envisim/geojson-utils/geojson.md#point), `"type"`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Point`](#point)

###### Overrides

`AbstractPointObject<GJ.Point>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="bbox-7"></a> `bbox?`

</td>
<td>

`public`

</td>
<td>

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

</td>
</tr>
<tr>
<td>

<a id="coordinates-6"></a> `coordinates`

</td>
<td>

`public`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
<tr>
<td>

<a id="type-8"></a> `type`

</td>
<td>

`readonly`

</td>
<td>

`"Point"`

</td>
</tr>
</tbody>
</table>

#### Methods

##### buffer()

> **buffer**(`options`): `null` | [`Circle`](#circle)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`BufferOptions`](#bufferoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Circle`](#circle)

##### centroid()

> **centroid**(): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Overrides

`AbstractPointObject.centroid`

##### copy()

> **copy**(`shallow`): [`Point`](#point)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`position`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

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

> **getBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Inherited from

`AbstractPointObject.getBBox`

##### getCoordinateArray()

> **getCoordinateArray**(): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`point`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

`AbstractPointObject.pointInBBox`

##### setBBox()

> **setBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

`"Expected Point"`

</td>
</tr>
</tbody>
</table>

###### Returns

`asserts obj is Point`

##### create()

> `static` **create**(`coordinates`, `shallow`): [`Point`](#point)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`coordinates`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Point`](#point)

##### isObject()

> `static` **isObject**(`obj`): `obj is Point`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`obj is Point`

---

### Polygon

#### Extends

- `AbstractAreaObject`<[`Polygon`](geojson-utils/@envisim/geojson-utils/geojson.md#polygon)>

#### Implements

- [`Polygon`](geojson-utils/@envisim/geojson-utils/geojson.md#polygon)

#### Constructors

##### Constructor

> **new Polygon**(`obj`, `shallow`): [`Polygon`](#polygon)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

[`OptionalParam`](utils.md#optionalparam)<[`Polygon`](geojson-utils/@envisim/geojson-utils/geojson.md#polygon), `"type"`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Polygon`](#polygon)

###### Overrides

`AbstractAreaObject<GJ.Polygon>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="bbox-8"></a> `bbox?`

</td>
<td>

`public`

</td>
<td>

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

</td>
</tr>
<tr>
<td>

<a id="coordinates-7"></a> `coordinates`

</td>
<td>

`public`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]\[]

</td>
</tr>
<tr>
<td>

<a id="type-9"></a> `type`

</td>
<td>

`readonly`

</td>
<td>

`"Polygon"`

</td>
</tr>
</tbody>
</table>

#### Methods

##### area()

> **area**(): `number`

###### Returns

`number`

###### Overrides

`AbstractAreaObject.area`

##### buffer()

> **buffer**(`options`): `null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`BufferOptions`](#bufferoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

##### centroid()

> **centroid**(`iterations`): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`iterations`

</td>
<td>

`number`

</td>
<td>

`2`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

###### Overrides

`AbstractAreaObject.centroid`

##### copy()

> **copy**(`shallow`): [`Polygon`](#polygon)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Polygon`](#polygon)

###### Overrides

`AbstractAreaObject.copy`

##### distanceToPosition()

> **distanceToPosition**(`position`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`position`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

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

> **getBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Inherited from

`AbstractAreaObject.getBBox`

##### getCoordinateArray()

> **getCoordinateArray**(): [`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]\[]\[]

###### Returns

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]\[]\[]

###### Overrides

`AbstractAreaObject.getCoordinateArray`

##### includesPosition()

> **includesPosition**(`position`): `boolean`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`position`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`point`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

`AbstractAreaObject.pointInBBox`

##### setBBox()

> **setBBox**(): [`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

###### Returns

[`BBox`](geojson-utils/@envisim/geojson-utils/geojson.md#bbox-7)

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

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`msg`

</td>
<td>

`string`

</td>
<td>

`"Expected Polygon"`

</td>
</tr>
</tbody>
</table>

###### Returns

`asserts obj is Polygon`

##### create()

> `static` **create**(`coordinates`, `shallow`): [`Polygon`](#polygon)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`coordinates`

</td>
<td>

[`Position`](geojson-utils/@envisim/geojson-utils/geojson.md#position)\[]\[]

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Polygon`](#polygon)

##### isObject()

> `static` **isObject**(`obj`): `obj is Polygon`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`obj is Polygon`

---

### PropertyRecord\<IDS>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`IDS` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Constructors

##### Constructor

> **new PropertyRecord**<`IDS`>(`record`, `shallow`): [`PropertyRecord`](#propertyrecord-1)<`IDS`>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`record`

</td>
<td>

[`PropertyList`](#propertylist)<`IDS`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`PropertyRecord`](#propertyrecord-1)<`IDS`>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="record"></a> `record`

</td>
<td>

`public`

</td>
<td>

[`PropertyList`](#propertylist)<`IDS`>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="special_keys"></a> `SPECIAL_KEYS`

</td>
<td>

`readonly`

</td>
<td>

readonly \[`"_designWeight"`, `"_distance"`, `"_parent"`, `"_randomRotation"`, `"_measure"`, `"_count"`]

</td>
<td>

`SPECIAL_KEYS`

</td>
</tr>
</tbody>
</table>

#### Methods

##### addCategorical()

> **addCategorical**(`this`, `__namedParameters`): `string`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

[`PropertyRecord`](#propertyrecord-1)<`string`>

</td>
</tr>
<tr>
<td>

`__namedParameters`

</td>
<td>

`Partial`<[`CategoricalProperty`](#categoricalproperty)<`string`>>

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### addNumerical()

> **addNumerical**(`this`, `__namedParameters`): `string`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

[`PropertyRecord`](#propertyrecord-1)<`string`>

</td>
</tr>
<tr>
<td>

`__namedParameters`

</td>
<td>

`Partial`<[`NumericalProperty`](#numericalproperty)<`string`>>

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### addProperty()

> **addProperty**(`this`, `property`): `string`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

[`PropertyRecord`](#propertyrecord-1)<`string`>

</td>
</tr>
<tr>
<td>

`property`

</td>
<td>

[`Property`](#property)<`string`>

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### addValueToCategory()

> **addValueToCategory**(`id`, `value`): `number`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id`

</td>
<td>

`IDS`

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### categoryHasValue()

> **categoryHasValue**(`id`, `value`): `boolean`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id`

</td>
<td>

`IDS`

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### copy()

> **copy**(`shallow`): [`PropertyRecord`](#propertyrecord-1)<`IDS`>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`PropertyRecord`](#propertyrecord-1)<`IDS`>

##### getId()

###### Call Signature

> **getId**(`id`): [`Property`](#property)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id`

</td>
<td>

`IDS`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Property`](#property)

###### Call Signature

> **getId**(`id?`): `null` | [`Property`](#property)<`string`>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id?`

</td>
<td>

`IDS`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Property`](#property)<`string`>

##### getIds()

> **getIds**(): `string`\[]

###### Returns

`string`\[]

##### getRecord()

> **getRecord**(): [`Property`](#property)<`string`>\[]

###### Returns

[`Property`](#property)<`string`>\[]

##### hasId()

> **hasId**(`id?`): `boolean`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### isCategorical()

> **isCategorical**(`id`): `boolean`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id`

</td>
<td>

`IDS`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### isNumerical()

> **isNumerical**(`id`): `boolean`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id`

</td>
<td>

`IDS`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### removeProperty()

> **removeProperty**(`this`, `id`): `void`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`this`

</td>
<td>

[`PropertyRecord`](#propertyrecord-1)<`string`>

</td>
</tr>
<tr>
<td>

`id`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### copyRecord()

> `static` **copyRecord**<`IDS`>(`record`): [`PropertyList`](#propertylist)<`IDS`>

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`IDS` _extends_ `string`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`record`

</td>
<td>

[`PropertyList`](#propertylist)<`IDS`>

</td>
</tr>
</tbody>
</table>

###### Returns

[`PropertyList`](#propertylist)<`IDS`>

##### createFromFeature()

> `static` **createFromFeature**<`IDS1`>(`feature?`): [`PropertyRecord`](#propertyrecord-1)<`IDS1`>

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`IDS1` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`feature?`

</td>
<td>

[`Feature`](#feature)<[`PureObject`](#pureobject), `IDS1`>

</td>
</tr>
</tbody>
</table>

###### Returns

[`PropertyRecord`](#propertyrecord-1)<`IDS1`>

##### createFromJson()

> `static` **createFromJson**(`feature?`): [`PropertyRecord`](#propertyrecord-1)<`string`>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`feature?`

</td>
<td>

[`BaseFeature`](geojson-utils/@envisim/geojson-utils/geojson.md#basefeature)<[`BaseGeometry`](geojson-utils/@envisim/geojson-utils/geojson.md#basegeometry), `unknown`>

</td>
</tr>
</tbody>
</table>

###### Returns

[`PropertyRecord`](#propertyrecord-1)<`string`>

##### isCategorical()

> `static` **isCategorical**(`property`): `property is CategoricalProperty<string>`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`property`

</td>
<td>

`null` | [`Property`](#property)<`string`>

</td>
</tr>
</tbody>
</table>

###### Returns

`property is CategoricalProperty<string>`

##### isNumerical()

> `static` **isNumerical**(`property`): `property is NumericalProperty<string>`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`property`

</td>
<td>

`null` | [`Property`](#property)<`string`>

</td>
</tr>
</tbody>
</table>

###### Returns

`property is NumericalProperty<string>`

##### isRecord()

> `static` **isRecord**(`obj`): `obj is PropertyRecord<string>`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`obj is PropertyRecord<string>`

##### isSpecial()

> `static` **isSpecial**(`k`): k is "\_designWeight" | "\_distance" | "\_parent" | "\_randomRotation" | "\_measure" | "\_count"

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`k`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

k is "\_designWeight" | "\_distance" | "\_parent" | "\_randomRotation" | "\_measure" | "\_count"

##### mergeRecords()

> `static` **mergeRecords**<`IDS1`, `IDS2`>(`record1`, `record2`): [`PropertyRecord`](#propertyrecord-1)<`IDS1` | `IDS2`>

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`IDS1` _extends_ `string`

</td>
</tr>
<tr>
<td>

`IDS2` _extends_ `string`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`record1`

</td>
<td>

[`PropertyRecord`](#propertyrecord-1)<`IDS1`>

</td>
</tr>
<tr>
<td>

`record2`

</td>
<td>

[`PropertyRecord`](#propertyrecord-1)<`IDS2`>

</td>
</tr>
</tbody>
</table>

###### Returns

[`PropertyRecord`](#propertyrecord-1)<`IDS1` | `IDS2`>

## Interfaces

### BufferOptions

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="distance"></a> `distance?`

</td>
<td>

`number`

</td>
<td>

The radius/distance to buffer in meters.

</td>
</tr>
<tr>
<td>

<a id="steps"></a> `steps?`

</td>
<td>

`number`

</td>
<td>

How to connect segments: A step of 1 (or undefined) will connect segments by straight
lines. Any other positive step will connect segments by a (semi)-circle, with `steps` segments
per quadrant.

</td>
</tr>
</tbody>
</table>

---

### CategoricalProperty\<ID>

#### Extends

- `PropertyBase`<`ID`>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`ID` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-2"></a> `id`

</td>
<td>

`ID`

</td>
<td>

The UUID of the Features property using this category.

</td>
</tr>
<tr>
<td>

<a id="name"></a> `name?`

</td>
<td>

`string`

</td>
<td>

A human-friendly name

</td>
</tr>
<tr>
<td>

<a id="type-10"></a> `type`

</td>
<td>

`"categorical"`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="values"></a> `values`

</td>
<td>

`string`\[]

</td>
<td>

An ordered array of values defined on this category

</td>
</tr>
</tbody>
</table>

---

### CirclesToPolygonsOptions

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="pointspercircle"></a> `pointsPerCircle?`

</td>
<td>

`number`

</td>
<td>

The number of vertices to create on the circle

</td>
</tr>
</tbody>
</table>

---

### FeatureCollectionExtrasJson

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="color-1"></a> `color?`

</td>
<td>

\[`number`, `number`, `number`]

</td>
</tr>
<tr>
<td>

<a id="id-3"></a> `id?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="primitive-1"></a> `primitive`

</td>
<td>

[`GeometricPrimitiveUnion`](geojson-utils/@envisim/geojson-utils.md#geometricprimitiveunion)

</td>
</tr>
<tr>
<td>

<a id="propertyrecord-2"></a> `propertyRecord`

</td>
<td>

{ `record`: [`PropertyList`](#propertylist)<`string`>; }

</td>
</tr>
<tr>
<td>

`propertyRecord.record`

</td>
<td>

[`PropertyList`](#propertylist)<`string`>

</td>
</tr>
<tr>
<td>

<a id="title-1"></a> `title?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### NumericalProperty\<ID>

#### Extends

- `PropertyBase`<`ID`>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`ID` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="id-5"></a> `id`

</td>
<td>

`ID`

</td>
<td>

The UUID of the Features property using this category.

</td>
</tr>
<tr>
<td>

<a id="name-1"></a> `name?`

</td>
<td>

`string`

</td>
<td>

A human-friendly name

</td>
</tr>
<tr>
<td>

<a id="parent"></a> `parent?`

</td>
<td>

\[`string`, `number`]

</td>
<td>

Holds id and index of collected categorical variable

</td>
</tr>
<tr>
<td>

<a id="type-11"></a> `type`

</td>
<td>

`"numerical"`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

## Type Aliases

### AreaObject

> **AreaObject** = [`Circle`](#circle) | [`MultiCircle`](#multicircle) | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

---

### DecreasingObject\<G>

> **DecreasingObject**<`G`> = `G` _extends_ [`AreaObject`](#areaobject) ? [`PureObject`](#pureobject) : `G` _extends_ [`LineObject`](#lineobject) ? [`PureObject`](#pureobject)<[`LineObject`](#lineobject) | [`PointObject`](#pointobject)> : `G` _extends_ [`PointObject`](#pointobject) ? [`PointObject`](#pointobject) : `never`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`G` _extends_ [`PureObject`](#pureobject)

</td>
</tr>
</tbody>
</table>

---

### FeatureProperties\<IDS>

> **FeatureProperties**<`IDS`> = [`SpecialFeatureProperties`](#specialfeatureproperties) & `Record`<`IDS`, `number` | `string`>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`IDS` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### ForEachCallback()\<T>

> **ForEachCallback**<`T`> = (`obj`, `index`) => `void`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### IncreasingObject\<G>

> **IncreasingObject**<`G`> = `G` _extends_ [`AreaObject`](#areaobject) ? [`AreaObject`](#areaobject) : `G` _extends_ [`LineObject`](#lineobject) ? [`PureObject`](#pureobject)<[`AreaObject`](#areaobject) | [`LineObject`](#lineobject)> : `G` _extends_ [`PointObject`](#pointobject) ? [`PureObject`](#pureobject) : `never`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`G` _extends_ [`PureObject`](#pureobject)

</td>
</tr>
</tbody>
</table>

---

### LineObject

> **LineObject** = [`LineString`](#linestring) | [`MultiLineString`](#multilinestring)

---

### ObjectOfPrimitive\<T>

> **ObjectOfPrimitive**<`T`> = `T` _extends_ [`GeometricPrimitiveArea`](geojson-utils/@envisim/geojson-utils.md#geometricprimitivearea-1) ? [`AreaObject`](#areaobject) : `T` _extends_ [`GeometricPrimitiveLine`](geojson-utils/@envisim/geojson-utils.md#geometricprimitiveline-1) ? [`LineObject`](#lineobject) : `T` _extends_ [`GeometricPrimitivePoint`](geojson-utils/@envisim/geojson-utils.md#geometricprimitivepoint-1) ? [`PointObject`](#pointobject) : `never`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`GeometricPrimitiveUnion`](geojson-utils/@envisim/geojson-utils.md#geometricprimitiveunion)

</td>
</tr>
</tbody>
</table>

---

### PointObject

> **PointObject** = [`Point`](#point) | [`MultiPoint`](#multipoint)

---

### PrimitiveOfObject\<T>

> **PrimitiveOfObject**<`T`> = `T` _extends_ [`AreaObject`](#areaobject) ? [`GeometricPrimitiveArea`](geojson-utils/@envisim/geojson-utils.md#geometricprimitivearea-1) : `T` _extends_ [`LineObject`](#lineobject) ? [`GeometricPrimitiveLine`](geojson-utils/@envisim/geojson-utils.md#geometricprimitiveline-1) : `T` _extends_ [`PointObject`](#pointobject) ? [`GeometricPrimitivePoint`](geojson-utils/@envisim/geojson-utils.md#geometricprimitivepoint-1) : [`GeometricPrimitiveNone`](geojson-utils/@envisim/geojson-utils.md#geometricprimitivenone-1)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`AreaObject`](#areaobject) | [`LineObject`](#lineobject) | [`PointObject`](#pointobject)

</td>
</tr>
</tbody>
</table>

---

### Property\<ID>

> **Property**<`ID`> = [`NumericalProperty`](#numericalproperty)<`ID`> | [`CategoricalProperty`](#categoricalproperty)<`ID`>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`ID` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### PropertyList\<IDS>

> **PropertyList**<`IDS`> = `Record`<`IDS`, [`Property`](#property)<`IDS`>>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`IDS` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### PureObject\<T>

> **PureObject**<`T`> = `T` _extends_ [`AreaObject`](#areaobject) ? `T` : `T` _extends_ [`LineObject`](#lineobject) ? `T` : `T` _extends_ [`PointObject`](#pointobject) ? `T` : `never`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`AreaObject`](#areaobject) | [`LineObject`](#lineobject) | [`PointObject`](#pointobject)

</td>
<td>

[`AreaObject`](#areaobject) | [`LineObject`](#lineobject) | [`PointObject`](#pointobject)

</td>
</tr>
</tbody>
</table>

---

### RetractingObject\<G>

> **RetractingObject**<`G`> = `G` _extends_ [`AreaObject`](#areaobject) ? [`PureObject`](#pureobject) : `G` _extends_ [`LineObject`](#lineobject) ? [`PureObject`](#pureobject)<[`AreaObject`](#areaobject) | [`LineObject`](#lineobject)> : `G` _extends_ [`PointObject`](#pointobject) ? [`AreaObject`](#areaobject) : `never`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`G` _extends_ [`PureObject`](#pureobject)

</td>
</tr>
</tbody>
</table>

---

### SpecialFeatureProperties

> **SpecialFeatureProperties** = `Partial`<`Record`<[`SpecialPropertyNames`](#specialpropertynames), `number`>>

Record of special properties

---

### SpecialPropertyNames

> **SpecialPropertyNames** = _typeof_ [`SPECIAL_KEYS`](#special_keys-1)\[`number`]

---

### StrippedFeatureCollectionJson

> **StrippedFeatureCollectionJson** = [`OptionalParam`](utils.md#optionalparam)<[`BaseFeatureCollection`](geojson-utils/@envisim/geojson-utils/geojson.md#basefeaturecollection)<[`BaseFeature`](geojson-utils/@envisim/geojson-utils/geojson.md#basefeature)<[`BaseGeometry`](geojson-utils/@envisim/geojson-utils/geojson.md#basegeometry), `unknown`>> & [`FeatureCollectionExtrasJson`](#featurecollectionextrasjson), `"type"` | `"primitive"` | `"propertyRecord"`>

## Variables

### SPECIAL_KEYS

> `const` **SPECIAL_KEYS**: readonly \[`"_designWeight"`, `"_distance"`, `"_parent"`, `"_randomRotation"`, `"_measure"`, `"_count"`]

Special keys (reserved names) of properties

## Functions

### convexHull()

> **convexHull**(`collection`, `options`): `null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

Computes the convex hull from a collection using
Andrew's monotone chain algorithm. If the hull polygon
crosses the antimeridian, then the resulting collection will
contain a multipolygon.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`collection`

</td>
<td>

[`FeatureCollection`](#featurecollection)<[`AreaObject`](#areaobject), `string`> | [`FeatureCollection`](#featurecollection)<[`LineObject`](#lineobject), `string`> | [`FeatureCollection`](#featurecollection)<[`PointObject`](#pointobject), `string`>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CirclesToPolygonsOptions`](#circlestopolygonsoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`null` | [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon)

---

### intersectAreaAreaGeometries()

> **intersectAreaAreaGeometries**(`geometry1`, `geometry2`, `options`): `null` | [`AreaObject`](#areaobject)

Intersect of two areas.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`geometry1`

</td>
<td>

[`AreaObject`](#areaobject)

</td>
</tr>
<tr>
<td>

`geometry2`

</td>
<td>

[`AreaObject`](#areaobject)

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CirclesToPolygonsOptions`](#circlestopolygonsoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`null` | [`AreaObject`](#areaobject)

the intersect or `null` if no intersect

---

### intersectLineAreaGeometries()

> **intersectLineAreaGeometries**(`line`, `area`, `options`): `null` | [`LineObject`](#lineobject)

Intersect between a line and an area.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`line`

</td>
<td>

[`LineObject`](#lineobject)

</td>
</tr>
<tr>
<td>

`area`

</td>
<td>

[`AreaObject`](#areaobject)

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CirclesToPolygonsOptions`](#circlestopolygonsoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`null` | [`LineObject`](#lineobject)

the intersection or `null` if none exists.

---

### intersectLineLineGeometries()

> **intersectLineLineGeometries**(`geometry1`, `geometry2`): `null` | [`PointObject`](#pointobject)

Intersect of two lines: the crossing-points between the lines in the two features.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`geometry1`

</td>
<td>

[`LineObject`](#lineobject)

</td>
</tr>
<tr>
<td>

`geometry2`

</td>
<td>

[`LineObject`](#lineobject)

</td>
</tr>
</tbody>
</table>

#### Returns

`null` | [`PointObject`](#pointobject)

the points of the crossings, or `null` if no crossings.

---

### intersectPointAreaGeometries()

> **intersectPointAreaGeometries**(`point`, `area`): `null` | [`PointObject`](#pointobject)

Intersection of points and area.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`point`

</td>
<td>

[`PointObject`](#pointobject)

</td>
</tr>
<tr>
<td>

`area`

</td>
<td>

[`AreaObject`](#areaobject)

</td>
</tr>
</tbody>
</table>

#### Returns

`null` | [`PointObject`](#pointobject)

`null` if no intersection and PointFeature if intersection.

---

### perimeter()

> **perimeter**(`collection`): `number`

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`collection`

</td>
<td>

[`FeatureCollection`](#featurecollection)<[`AreaObject`](#areaobject)>

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

---

### toAreaObject()

> **toAreaObject**(`geometry`, `shallow`, `options`): `null` | [`AreaObject`](#areaobject)

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`geometry`

</td>
<td>

[`BaseGeometry`](geojson-utils/@envisim/geojson-utils/geojson.md#basegeometry)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CirclesToPolygonsOptions`](#circlestopolygonsoptions)

</td>
<td>

`{}`

</td>
</tr>
</tbody>
</table>

#### Returns

`null` | [`AreaObject`](#areaobject)

---

### toLineObject()

> **toLineObject**(`geometry`, `shallow`): `null` | [`LineObject`](#lineobject)

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`geometry`

</td>
<td>

[`BaseGeometry`](geojson-utils/@envisim/geojson-utils/geojson.md#basegeometry)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

#### Returns

`null` | [`LineObject`](#lineobject)

---

### toPointObject()

> **toPointObject**(`geometry`, `shallow`): `null` | [`PointObject`](#pointobject)

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`geometry`

</td>
<td>

[`BaseGeometry`](geojson-utils/@envisim/geojson-utils/geojson.md#basegeometry)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shallow`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

#### Returns

`null` | [`PointObject`](#pointobject)

---

### union()

> **union**(`collection`, `options`): [`FeatureCollection`](#featurecollection)<[`AreaObject`](#areaobject), `string`>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`collection`

</td>
<td>

[`FeatureCollection`](#featurecollection)<[`AreaObject`](#areaobject)>

</td>
<td>

the collection to compute the union from

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CirclesToPolygonsOptions`](#circlestopolygonsoptions)

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](#featurecollection)<[`AreaObject`](#areaobject), `string`>

the union of the polygons in the areaCollection
