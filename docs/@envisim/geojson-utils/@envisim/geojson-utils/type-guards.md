[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geojson-utils](../../README.md) / @envisim/geojson-utils/type-guards

# @envisim/geojson-utils/type-guards

## Contents

- [Functions](#functions)
  - [checkProperties()](#checkproperties)
  - [isAreaGeometry()](#isareageometry)
  - [isBaseCollection()](#isbasecollection)
  - [isBaseFeature()](#isbasefeature)
  - [isBaseGeometry()](#isbasegeometry)
  - [isCircle()](#iscircle)
  - [isCircleish()](#iscircleish)
  - [isLineGeometry()](#islinegeometry)
  - [isMultiCircle()](#ismulticircle)
  - [isMultiPoint()](#ismultipoint)
  - [isPoint()](#ispoint)
  - [isPointGeometry()](#ispointgeometry)
  - [isPointish()](#ispointish)
  - [isSingleTypeCollection()](#issingletypecollection)
  - [isSingleTypeFeature()](#issingletypefeature)
  - [isSingleTypeGeometry()](#issingletypegeometry)
  - [isUniformCollection()](#isuniformcollection)

## Functions

### checkProperties()

> **checkProperties**(`obj`): obj is BaseFeature\<BaseGeometry, string | number>

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

[`BaseFeature`](geojson.md#basefeature)

</td>
</tr>
</tbody>
</table>

#### Returns

obj is BaseFeature\<BaseGeometry, string | number>

`true` if `obj.properties` is either `null` or an object with `string|number` values.

---

### isAreaGeometry()

> **isAreaGeometry**(`obj`): `obj is AreaGeometry`

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

[`BaseGeometry`](geojson.md#basegeometry)

</td>
</tr>
</tbody>
</table>

#### Returns

`obj is AreaGeometry`

`true` if `obj` can be narrowed to `GJ.AreaGeometry`.

---

### isBaseCollection()

#### Call Signature

> **isBaseCollection**(`obj`, `checkCoordinates`, `allowGC`): `obj is BaseFeatureCollection<BaseFeature<SingleTypeObject, unknown>>`

##### Parameters

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

`obj`

</td>
<td>

`unknown`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`checkCoordinates`

</td>
<td>

`boolean`

</td>
<td>

if `true`, checks the validity of the `coordinates` property on every
geometry in the collection, otherwise only checks for the existance of the `coordinates` property
on every geometry in the collection.

</td>
</tr>
<tr>
<td>

`allowGC`

</td>
<td>

`false`

</td>
<td>

if `false`, disallowes the existance of `GJ.BaseGeometryCollection` as a geometry

</td>
</tr>
</tbody>
</table>

##### Returns

`obj is BaseFeatureCollection<BaseFeature<SingleTypeObject, unknown>>`

`true` if `obj` can be narrowed to `GJ.BaseFeatureCollection`.

#### Call Signature

> **isBaseCollection**(`obj`, `checkCoordinates?`, `allowGC?`): `obj is BaseFeatureCollection<BaseFeature<BaseGeometry, unknown>>`

##### Parameters

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

`obj`

</td>
<td>

`unknown`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`checkCoordinates?`

</td>
<td>

`boolean`

</td>
<td>

if `true`, checks the validity of the `coordinates` property on every
geometry in the collection, otherwise only checks for the existance of the `coordinates` property
on every geometry in the collection.

</td>
</tr>
<tr>
<td>

`allowGC?`

</td>
<td>

`boolean`

</td>
<td>

if `false`, disallowes the existance of `GJ.BaseGeometryCollection` as a geometry

</td>
</tr>
</tbody>
</table>

##### Returns

`obj is BaseFeatureCollection<BaseFeature<BaseGeometry, unknown>>`

`true` if `obj` can be narrowed to `GJ.BaseFeatureCollection`.

---

### isBaseFeature()

#### Call Signature

> **isBaseFeature**(`obj`, `checkCoordinates`, `allowGC`): `obj is BaseFeature<SingleTypeObject, unknown>`

##### Parameters

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

`obj`

</td>
<td>

`unknown`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`checkCoordinates`

</td>
<td>

`boolean`

</td>
<td>

checks the validity of `obj.geometry.coordinates` if `true`, otherwise
just checks for the existance of `obj.geometry.coordinates`.

</td>
</tr>
<tr>
<td>

`allowGC`

</td>
<td>

`false`

</td>
<td>

if `false`, disallowes the existance of `GJ.BaseGeometryCollection` on
`obj.geometry`

</td>
</tr>
</tbody>
</table>

##### Returns

`obj is BaseFeature<SingleTypeObject, unknown>`

`true` if `obj` can be narrowed to `GJ.BaseFeature`.

#### Call Signature

> **isBaseFeature**(`obj`, `checkCoordinates?`, `allowGC?`): `obj is BaseFeature<BaseGeometry, unknown>`

##### Parameters

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

`obj`

</td>
<td>

`unknown`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`checkCoordinates?`

</td>
<td>

`boolean`

</td>
<td>

checks the validity of `obj.geometry.coordinates` if `true`, otherwise
just checks for the existance of `obj.geometry.coordinates`.

</td>
</tr>
<tr>
<td>

`allowGC?`

</td>
<td>

`boolean`

</td>
<td>

if `false`, disallowes the existance of `GJ.BaseGeometryCollection` on
`obj.geometry`

</td>
</tr>
</tbody>
</table>

##### Returns

`obj is BaseFeature<BaseGeometry, unknown>`

`true` if `obj` can be narrowed to `GJ.BaseFeature`.

---

### isBaseGeometry()

#### Call Signature

> **isBaseGeometry**(`obj`, `checkCoordinates`, `allowGC`): `obj is SingleTypeObject`

##### Parameters

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

`obj`

</td>
<td>

`unknown`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`checkCoordinates`

</td>
<td>

`boolean`

</td>
<td>

checks the validity of the `coordinates` property if `true`, otherwise
just checks for the existance of the `coordinates` property.

</td>
</tr>
<tr>
<td>

`allowGC`

</td>
<td>

`false`

</td>
<td>

if `false`, disallowes the existance of `GJ.BaseGeometryCollection` on `obj`

</td>
</tr>
</tbody>
</table>

##### Returns

`obj is SingleTypeObject`

`true` if `obj` can be narrowed to `GJ.BaseGeometry`.

#### Call Signature

> **isBaseGeometry**(`obj`, `checkCoordinates?`, `allowGC?`): `obj is BaseGeometry`

##### Parameters

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

`obj`

</td>
<td>

`unknown`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`checkCoordinates?`

</td>
<td>

`boolean`

</td>
<td>

checks the validity of the `coordinates` property if `true`, otherwise
just checks for the existance of the `coordinates` property.

</td>
</tr>
<tr>
<td>

`allowGC?`

</td>
<td>

`boolean`

</td>
<td>

if `false`, disallowes the existance of `GJ.BaseGeometryCollection` on `obj`

</td>
</tr>
</tbody>
</table>

##### Returns

`obj is BaseGeometry`

`true` if `obj` can be narrowed to `GJ.BaseGeometry`.

---

### isCircle()

> **isCircle**(`obj`, `checkPositiveRadius`): `obj is Circle`

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

`obj`

</td>
<td>

[`SingleTypeObject`](geojson.md#singletypeobject)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`checkPositiveRadius`

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

#### Returns

`obj is Circle`

`true` if `obj` can be narrowed to `GJ.Circle`.

---

### isCircleish()

> **isCircleish**(`obj`, `checkPositiveRadius`): obj is Circle | MultiCircle

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

`obj`

</td>
<td>

[`SingleTypeObject`](geojson.md#singletypeobject)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`checkPositiveRadius`

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

#### Returns

obj is Circle | MultiCircle

`true` if `obj` can be narrowed to `GJ.Circle | GJ.MultiCircle`.

---

### isLineGeometry()

> **isLineGeometry**(`obj`): `obj is LineGeometry`

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

[`BaseGeometry`](geojson.md#basegeometry)

</td>
</tr>
</tbody>
</table>

#### Returns

`obj is LineGeometry`

`true` if `obj` can be narrowed to `GJ.LineGeometry`.

---

### isMultiCircle()

> **isMultiCircle**(`obj`, `checkPositiveRadius`): `obj is MultiCircle`

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

`obj`

</td>
<td>

[`SingleTypeObject`](geojson.md#singletypeobject)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`checkPositiveRadius`

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

#### Returns

`obj is MultiCircle`

`true` if `obj` can be narrowed to `GJ.MultiCircle`.

---

### isMultiPoint()

> **isMultiPoint**(`obj`): `obj is MultiPoint`

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

[`SingleTypeObject`](geojson.md#singletypeobject)

</td>
</tr>
</tbody>
</table>

#### Returns

`obj is MultiPoint`

`true` if `obj` can be narrowed to `GJ.MultiPoint`.

---

### isPoint()

> **isPoint**(`obj`): `obj is Point`

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

[`SingleTypeObject`](geojson.md#singletypeobject)

</td>
</tr>
</tbody>
</table>

#### Returns

`obj is Point`

`true` if `obj` can be narrowed to `GJ.Point`.

---

### isPointGeometry()

> **isPointGeometry**(`obj`): `obj is PointGeometry`

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

[`BaseGeometry`](geojson.md#basegeometry)

</td>
</tr>
</tbody>
</table>

#### Returns

`obj is PointGeometry`

`true` if `obj` can be narrowed to `GJ.PointGeometry`.

---

### isPointish()

> **isPointish**(`obj`): obj is Point | MultiPoint

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

[`SingleTypeObject`](geojson.md#singletypeobject)

</td>
</tr>
</tbody>
</table>

#### Returns

obj is Point | MultiPoint

`true` if `obj` can be narrowed to `GJ.Point | GJ.MultiPoint`.

---

### isSingleTypeCollection()

> **isSingleTypeCollection**(`obj`, `checkCoordinates`): `obj is BaseFeatureCollection<BaseFeature<SingleTypeObject, unknown>>`

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

`checkCoordinates`

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

#### Returns

`obj is BaseFeatureCollection<BaseFeature<SingleTypeObject, unknown>>`

`true` if `obj` can be narrowed to
`GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, unknown>>`.

---

### isSingleTypeFeature()

> **isSingleTypeFeature**(`obj`, `checkCoordinates`): `obj is BaseFeature<SingleTypeObject, unknown>`

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

`checkCoordinates`

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

#### Returns

`obj is BaseFeature<SingleTypeObject, unknown>`

`true` if `obj` can be narrowed to `GJ.BaseFeature<GJ.SingleTypeObject, unknown>`.

---

### isSingleTypeGeometry()

> **isSingleTypeGeometry**(`obj`, `checkCoordinates`): `obj is SingleTypeObject`

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

`checkCoordinates`

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

#### Returns

`obj is SingleTypeObject`

`true` if `obj` can be narrowed to `GJ.SingleTypeObject`.

---

### isUniformCollection()

> **isUniformCollection**(`obj`): obj is BaseFeatureCollection\<BaseFeature\<SingleTypeObject, string | number>>

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

[`BaseFeatureCollection`](geojson.md#basefeaturecollection)<[`BaseFeature`](geojson.md#basefeature)<[`SingleTypeObject`](geojson.md#singletypeobject), `unknown`>>

</td>
</tr>
</tbody>
</table>

#### Returns

obj is BaseFeatureCollection\<BaseFeature\<SingleTypeObject, string | number>>

`true` if `obj` can be narrowed to a FeatureCollection with uniform properties, i.e. a
FeatureCollection where every feature has exactly the same property object.
