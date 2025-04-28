[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geojson-utils](../../README.md) / @envisim/geojson-utils/geojson

# @envisim/geojson-utils/geojson

## Contents

- [Interfaces](#interfaces)
  - [BaseFeature\<G, P>](#basefeatureg-p)
  - [BaseFeatureCollection\<F>](#basefeaturecollectionf)
  - [BaseGeometryCollection\<G>](#basegeometrycollectiong)
  - [BaseObject\<T, C>](#baseobjectt-c)
  - [Circle](#circle)
  - [GeoJsonObject\<T>](#geojsonobjectt)
  - [MultiCircle](#multicircle)
- [Type Aliases](#type-aliases)
  - [AreaFeature](#areafeature)
  - [AreaFeatureCollection](#areafeaturecollection)
  - [AreaGeometry](#areageometry)
  - [AreaGeometryCollection](#areageometrycollection)
  - [AreaObject](#areaobject)
  - [BaseGeometry](#basegeometry)
  - [BBox](#bbox)
  - [BBox2](#bbox2)
  - [BBox3](#bbox3)
  - [Feature\<G>](#featureg)
  - [FeatureCollection\<F>](#featurecollectionf)
  - [FeatureProperties\<P, ID>](#featurepropertiesp-id)
  - [Geometry](#geometry)
  - [GeometryCollection\<O>](#geometrycollectiono)
  - [LineFeature](#linefeature)
  - [LineFeatureCollection](#linefeaturecollection)
  - [LineGeometry](#linegeometry)
  - [LineGeometryCollection](#linegeometrycollection)
  - [LineObject](#lineobject)
  - [LineString](#linestring)
  - [MultiLineString](#multilinestring)
  - [MultiPoint](#multipoint)
  - [MultiPolygon](#multipolygon)
  - [Point](#point)
  - [PointFeature](#pointfeature)
  - [PointFeatureCollection](#pointfeaturecollection)
  - [PointGeometry](#pointgeometry)
  - [PointGeometryCollection](#pointgeometrycollection)
  - [PointObject](#pointobject)
  - [Polygon](#polygon)
  - [Position](#position)
  - [Position2](#position2)
  - [Position3](#position3)
  - [SingleTypeObject](#singletypeobject)

## Interfaces

### BaseFeature\<G, P>

#### Extends

- [`GeoJsonObject`](#geojsonobject)<`"Feature"`>

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

`G` _extends_ [`BaseGeometry`](#basegeometry) | `null`

</td>
<td>

[`BaseGeometry`](#basegeometry)

</td>
</tr>
<tr>
<td>

`P`

</td>
<td>

`unknown`

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="bbox"></a> `bbox?`

</td>
<td>

[`BBox`](#bbox-7)

</td>
</tr>
<tr>
<td>

<a id="geometry"></a> `geometry`

</td>
<td>

`G`

</td>
</tr>
<tr>
<td>

<a id="properties"></a> `properties`

</td>
<td>

`null` | [`FeatureProperties`](#featureproperties)<`P`, `string`>

</td>
</tr>
<tr>
<td>

<a id="type"></a> `type`

</td>
<td>

`"Feature"`

</td>
</tr>
</tbody>
</table>

---

### BaseFeatureCollection\<F>

#### Extends

- [`GeoJsonObject`](#geojsonobject)<`"FeatureCollection"`>

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

`F` _extends_ [`BaseFeature`](#basefeature)

</td>
<td>

[`BaseFeature`](#basefeature)

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="bbox-1"></a> `bbox?`

</td>
<td>

[`BBox`](#bbox-7)

</td>
</tr>
<tr>
<td>

<a id="features"></a> `features`

</td>
<td>

`F`\[]

</td>
</tr>
<tr>
<td>

<a id="type-1"></a> `type`

</td>
<td>

`"FeatureCollection"`

</td>
</tr>
</tbody>
</table>

---

### BaseGeometryCollection\<G>

#### Extends

- [`GeoJsonObject`](#geojsonobject)<`"GeometryCollection"`>

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

`G` _extends_ [`BaseGeometry`](#basegeometry)

</td>
<td>

[`BaseGeometry`](#basegeometry)

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="bbox-2"></a> `bbox?`

</td>
<td>

[`BBox`](#bbox-7)

</td>
</tr>
<tr>
<td>

<a id="geometries"></a> `geometries`

</td>
<td>

`G`\[]

</td>
</tr>
<tr>
<td>

<a id="type-2"></a> `type`

</td>
<td>

`"GeometryCollection"`

</td>
</tr>
</tbody>
</table>

---

### BaseObject\<T, C>

#### Extends

- [`GeoJsonObject`](#geojsonobject)<`T`>

#### Extended by

- [`Circle`](#circle)
- [`MultiCircle`](#multicircle)

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

`T` _extends_ `string`

</td>
</tr>
<tr>
<td>

`C`

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="bbox-3"></a> `bbox?`

</td>
<td>

[`BBox`](#bbox-7)

</td>
</tr>
<tr>
<td>

<a id="coordinates"></a> `coordinates`

</td>
<td>

`C`

</td>
</tr>
<tr>
<td>

<a id="type-3"></a> `type`

</td>
<td>

`T`

</td>
</tr>
</tbody>
</table>

---

### Circle

#### Extends

- [`BaseObject`](#baseobject)<`"Point"`, [`Position`](#position)>

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

<a id="bbox-4"></a> `bbox?`

</td>
<td>

[`BBox`](#bbox-7)

</td>
</tr>
<tr>
<td>

<a id="coordinates-1"></a> `coordinates`

</td>
<td>

[`Position`](#position)

</td>
</tr>
<tr>
<td>

<a id="radius"></a> `radius`

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

`"Point"`

</td>
</tr>
</tbody>
</table>

---

### GeoJsonObject\<T>

#### Extended by

- [`BaseObject`](#baseobject)
- [`BaseGeometryCollection`](#basegeometrycollection)
- [`BaseFeature`](#basefeature)
- [`BaseFeatureCollection`](#basefeaturecollection)

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

`T` _extends_ `string`

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="bbox-5"></a> `bbox?`

</td>
<td>

[`BBox`](#bbox-7)

</td>
</tr>
<tr>
<td>

<a id="type-5"></a> `type`

</td>
<td>

`T`

</td>
</tr>
</tbody>
</table>

---

### MultiCircle

#### Extends

- [`BaseObject`](#baseobject)<`"MultiPoint"`, [`Position`](#position)\[]>

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

<a id="bbox-6"></a> `bbox?`

</td>
<td>

[`BBox`](#bbox-7)

</td>
</tr>
<tr>
<td>

<a id="coordinates-2"></a> `coordinates`

</td>
<td>

[`Position`](#position)\[]

</td>
</tr>
<tr>
<td>

<a id="radius-1"></a> `radius`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

<a id="type-6"></a> `type`

</td>
<td>

`"MultiPoint"`

</td>
</tr>
</tbody>
</table>

## Type Aliases

### AreaFeature

> **AreaFeature** = [`Feature`](#feature)<[`AreaGeometry`](#areageometry)>

---

### AreaFeatureCollection

> **AreaFeatureCollection** = [`FeatureCollection`](#featurecollection)<[`AreaFeature`](#areafeature)>

---

### AreaGeometry

> **AreaGeometry** = [`AreaObject`](#areaobject) | [`AreaGeometryCollection`](#areageometrycollection)

---

### AreaGeometryCollection

> **AreaGeometryCollection** = [`GeometryCollection`](#geometrycollection)<[`AreaObject`](#areaobject)>

---

### AreaObject

> **AreaObject** = [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon) | [`Circle`](#circle) | [`MultiCircle`](#multicircle)

---

### BaseGeometry

> **BaseGeometry** = [`SingleTypeObject`](#singletypeobject) | [`BaseGeometryCollection`](#basegeometrycollection)

---

### BBox

> **BBox** = [`BBox2`](#bbox2) | [`BBox3`](#bbox3)

---

### BBox2

> **BBox2** = \[`number`, `number`, `number`, `number`]

---

### BBox3

> **BBox3** = \[`number`, `number`, `number`, `number`, `number`, `number`]

---

### Feature\<G>

> **Feature**<`G`> = [`BaseFeature`](#basefeature)<`G`, `number` | `string`>

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

`G` _extends_ [`Geometry`](#geometry-1)

</td>
<td>

[`Geometry`](#geometry-1)

</td>
</tr>
</tbody>
</table>

---

### FeatureCollection\<F>

> **FeatureCollection**<`F`> = [`BaseFeatureCollection`](#basefeaturecollection)<`F`>

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

`F` _extends_ [`Feature`](#feature)

</td>
<td>

[`Feature`](#feature)

</td>
</tr>
</tbody>
</table>

---

### FeatureProperties\<P, ID>

> **FeatureProperties**<`P`, `ID`> = `Record`<`ID`, `P`>

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

`P`

</td>
<td>

`number` | `string`

</td>
</tr>
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

### Geometry

> **Geometry** = [`PointGeometry`](#pointgeometry) | [`LineGeometry`](#linegeometry) | [`AreaGeometry`](#areageometry)

---

### GeometryCollection\<O>

> **GeometryCollection**<`O`> = [`BaseGeometryCollection`](#basegeometrycollection)<`O`>

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

`O` _extends_ [`SingleTypeObject`](#singletypeobject)

</td>
</tr>
</tbody>
</table>

---

### LineFeature

> **LineFeature** = [`Feature`](#feature)<[`LineGeometry`](#linegeometry)>

---

### LineFeatureCollection

> **LineFeatureCollection** = [`FeatureCollection`](#featurecollection)<[`LineFeature`](#linefeature)>

---

### LineGeometry

> **LineGeometry** = [`LineObject`](#lineobject) | [`LineGeometryCollection`](#linegeometrycollection)

---

### LineGeometryCollection

> **LineGeometryCollection** = [`GeometryCollection`](#geometrycollection)<[`LineObject`](#lineobject)>

---

### LineObject

> **LineObject** = [`LineString`](#linestring) | [`MultiLineString`](#multilinestring)

---

### LineString

> **LineString** = [`BaseObject`](#baseobject)<`"LineString"`, [`Position`](#position)\[]>

---

### MultiLineString

> **MultiLineString** = [`BaseObject`](#baseobject)<`"MultiLineString"`, [`Position`](#position)\[]\[]>

---

### MultiPoint

> **MultiPoint** = [`BaseObject`](#baseobject)<`"MultiPoint"`, [`Position`](#position)\[]>

---

### MultiPolygon

> **MultiPolygon** = [`BaseObject`](#baseobject)<`"MultiPolygon"`, [`Position`](#position)\[]\[]\[]>

---

### Point

> **Point** = [`BaseObject`](#baseobject)<`"Point"`, [`Position`](#position)>

---

### PointFeature

> **PointFeature** = [`Feature`](#feature)<[`PointGeometry`](#pointgeometry)>

---

### PointFeatureCollection

> **PointFeatureCollection** = [`FeatureCollection`](#featurecollection)<[`PointFeature`](#pointfeature)>

---

### PointGeometry

> **PointGeometry** = [`PointObject`](#pointobject) | [`PointGeometryCollection`](#pointgeometrycollection)

---

### PointGeometryCollection

> **PointGeometryCollection** = [`GeometryCollection`](#geometrycollection)<[`PointObject`](#pointobject)>

---

### PointObject

> **PointObject** = [`Point`](#point) | [`MultiPoint`](#multipoint)

---

### Polygon

> **Polygon** = [`BaseObject`](#baseobject)<`"Polygon"`, [`Position`](#position)\[]\[]>

---

### Position

> **Position** = [`Position2`](#position2) | [`Position3`](#position3)

---

### Position2

> **Position2** = \[`number`, `number`]

---

### Position3

> **Position3** = \[`number`, `number`, `number`]

---

### SingleTypeObject

> **SingleTypeObject** = [`PointObject`](#pointobject) | [`LineObject`](#lineobject) | [`AreaObject`](#areaobject)
