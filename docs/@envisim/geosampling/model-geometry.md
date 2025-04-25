[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geosampling](README.md) / model-geometry

# model-geometry

## Contents

- [Interfaces](#interfaces)
  - [PlaceOptions\<G>](#placeoptionsg)
- [Functions](#functions)
  - [circleAreaGeometry()](#circleareageometry)
  - [circleLineGeometry()](#circlelinegeometry)
  - [ellLineGeometry()](#elllinegeometry)
  - [placeAreaGeometry()](#placeareageometry)
  - [placeLineGeometry()](#placelinegeometry)
  - [placePointGeometry()](#placepointgeometry)
  - [pointGeometry()](#pointgeometry)
  - [radiusOfModelGeometry()](#radiusofmodelgeometry)
  - [rectangularAreaGeometry()](#rectangularareageometry)
  - [rectangularCircleGeometry()](#rectangularcirclegeometry)
  - [rectangularLineGeometry()](#rectangularlinegeometry)
  - [rectangularPointGeometry()](#rectangularpointgeometry)
  - [regularPolygonAreaGeometry()](#regularpolygonareageometry)
  - [regularPolygonCircleGeometry()](#regularpolygoncirclegeometry)
  - [regularPolygonLineGeometry()](#regularpolygonlinegeometry)
  - [regularPolygonPointGeometry()](#regularpolygonpointgeometry)
  - [sizeOfModelGeometry()](#sizeofmodelgeometry)
  - [straightLineGeometry()](#straightlinegeometry)

## Interfaces

### PlaceOptions\<G>

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

`G` _extends_ [`SingleTypeObject`](../geojson-utils/geojson.md#singletypeobject)

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

<a id="buffer"></a> `buffer`

</td>
<td>

`number`

</td>
<td>

Buffer

</td>
</tr>
<tr>
<td>

<a id="modelgeometry"></a> `modelGeometry`

</td>
<td>

`G`

</td>
<td>

Model geometry with coordinates in meters relative to (0,0)

</td>
</tr>
<tr>
<td>

<a id="rand"></a> `rand`

</td>
<td>

[`RandomGenerator`](../random.md#randomgenerator)

</td>
<td>

Optional RNG

</td>
</tr>
<tr>
<td>

<a id="rotationofgeometry"></a> `rotationOfGeometry`

</td>
<td>

`number` | `"random"`

</td>
<td>

Angel of rotation in degrees (from north), or `random` for random rotation

</td>
</tr>
</tbody>
</table>

## Functions

### circleAreaGeometry()

> **circleAreaGeometry**(`diameter`): [`Circle`](../geojson-utils/geojson.md#circle)

#### Parameters

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

`diameter`

</td>
<td>

`number`

</td>
<td>

`10.0`

</td>
<td>

the diameter in meters.

</td>
</tr>
</tbody>
</table>

#### Returns

[`Circle`](../geojson-utils/geojson.md#circle)

a circle model geometry.

---

### circleLineGeometry()

> **circleLineGeometry**(`diameter`, `options?`): [`LineString`](../geojson-utils/geojson.md#linestring)

#### Parameters

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

`diameter`

</td>
<td>

`number`

</td>
<td>

`1.0`

</td>
<td>

the diameter of the circle in meters.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`CirclesToPolygonsOptions`](../geojson.md#circlestopolygonsoptions)

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

#### Returns

[`LineString`](../geojson-utils/geojson.md#linestring)

a circle-shaped line model geometry.

---

### ellLineGeometry()

> **ellLineGeometry**(`sideLength`): [`LineString`](../geojson-utils/geojson.md#linestring)

#### Parameters

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

`sideLength`

</td>
<td>

`number`

</td>
<td>

`10.0`

</td>
<td>

length of side in meters.

</td>
</tr>
</tbody>
</table>

#### Returns

[`LineString`](../geojson-utils/geojson.md#linestring)

an ell-shaped line model geometry.

---

### placeAreaGeometry()

> **placeAreaGeometry**(`position`, `__namedParameters`): [`AreaObject`](../geojson.md#areaobject)

Positions a modelGeometry at position and optionally rotates the coordinates around position.

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

`position`

</td>
<td>

[`Position`](../geojson-utils/geojson.md#position)

</td>
<td>

a position \[lon,lat].

</td>
</tr>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`PlaceOptions`](#placeoptions)<[`AreaObject`](../geojson-utils/geojson.md#areaobject)>

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

#### Returns

[`AreaObject`](../geojson.md#areaobject)

a GeoJSON Point/Line/AreaObject.

---

### placeLineGeometry()

> **placeLineGeometry**(`position`, `__namedParameters`): [`LineObject`](../geojson.md#lineobject)

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

`position`

</td>
<td>

[`Position`](../geojson-utils/geojson.md#position)

</td>
</tr>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`PlaceOptions`](#placeoptions)<[`LineObject`](../geojson-utils/geojson.md#lineobject)>

</td>
</tr>
</tbody>
</table>

#### Returns

[`LineObject`](../geojson.md#lineobject)

---

### placePointGeometry()

> **placePointGeometry**(`position`, `__namedParameters`): [`PointObject`](../geojson.md#pointobject)

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

`position`

</td>
<td>

[`Position`](../geojson-utils/geojson.md#position)

</td>
</tr>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`PlaceOptions`](#placeoptions)<[`PointObject`](../geojson-utils/geojson.md#pointobject)>

</td>
</tr>
</tbody>
</table>

#### Returns

[`PointObject`](../geojson.md#pointobject)

---

### pointGeometry()

> **pointGeometry**(): [`Point`](../geojson-utils/geojson.md#point)

#### Returns

[`Point`](../geojson-utils/geojson.md#point)

a single point model geometry.

---

### radiusOfModelGeometry()

> **radiusOfModelGeometry**(`geometry`): `number`

Computes the radius as maximum distance from (0,0) to any point in the given geometry.

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

`geometry`

</td>
<td>

[`SingleTypeObject`](../geojson-utils/geojson.md#singletypeobject)

</td>
<td>

a GeoJSON geometry (not geometry collection).

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the maximum distance from (0,0) to any point in the given geometry.

---

### rectangularAreaGeometry()

> **rectangularAreaGeometry**(`width`, `height`): [`Polygon`](../geojson-utils/geojson.md#polygon)

#### Parameters

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

`width`

</td>
<td>

`number`

</td>
<td>

`10.0`

</td>
<td>

length of side west-east in meters.

</td>
</tr>
<tr>
<td>

`height`

</td>
<td>

`number`

</td>
<td>

`width`

</td>
<td>

length of side south-north in meters.

</td>
</tr>
</tbody>
</table>

#### Returns

[`Polygon`](../geojson-utils/geojson.md#polygon)

a rectangular-shaped area model geometry.

---

### rectangularCircleGeometry()

> **rectangularCircleGeometry**(`width`, `height`, `diameter`): [`MultiCircle`](../geojson-utils/geojson.md#multicircle)

#### Parameters

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

`width`

</td>
<td>

`number`

</td>
<td>

`10.0`

</td>
<td>

length of side west-east in meters.

</td>
</tr>
<tr>
<td>

`height`

</td>
<td>

`number`

</td>
<td>

`width`

</td>
<td>

length of side south-north in meters.

</td>
</tr>
<tr>
<td>

`diameter`

</td>
<td>

`number`

</td>
<td>

`1.0`

</td>
<td>

the diameter in meters. If diameter is smaller than width, diameter is replaced
by width.

</td>
</tr>
</tbody>
</table>

#### Returns

[`MultiCircle`](../geojson-utils/geojson.md#multicircle)

a circle model geometry in a rectangular formation.

---

### rectangularLineGeometry()

> **rectangularLineGeometry**(`width`, `height`): [`LineString`](../geojson-utils/geojson.md#linestring)

#### Parameters

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

`width`

</td>
<td>

`number`

</td>
<td>

`10.0`

</td>
<td>

length of side west-east in meters.

</td>
</tr>
<tr>
<td>

`height`

</td>
<td>

`number`

</td>
<td>

`width`

</td>
<td>

length of side south-north in meters.

</td>
</tr>
</tbody>
</table>

#### Returns

[`LineString`](../geojson-utils/geojson.md#linestring)

a rectangular-shaped line model geometry.

---

### rectangularPointGeometry()

> **rectangularPointGeometry**(`width`, `height`): [`MultiPoint`](../geojson-utils/geojson.md#multipoint)

#### Parameters

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

`width`

</td>
<td>

`number`

</td>
<td>

`10.0`

</td>
<td>

length of side west-east in meters.

</td>
</tr>
<tr>
<td>

`height`

</td>
<td>

`number`

</td>
<td>

`width`

</td>
<td>

length of side south-north in meters.

</td>
</tr>
</tbody>
</table>

#### Returns

[`MultiPoint`](../geojson-utils/geojson.md#multipoint)

a point model geometry in a rectangular formation.

---

### regularPolygonAreaGeometry()

> **regularPolygonAreaGeometry**(`sides`, `polygonDiameter`): [`Polygon`](../geojson-utils/geojson.md#polygon)

#### Parameters

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

`sides`

</td>
<td>

`number`

</td>
<td>

`3`

</td>
<td>

the number of sides/vertices.

</td>
</tr>
<tr>
<td>

`polygonDiameter`

</td>
<td>

`number`

</td>
<td>

`1.0`

</td>
<td>

the diameter of the containing circle in meters.

</td>
</tr>
</tbody>
</table>

#### Returns

[`Polygon`](../geojson-utils/geojson.md#polygon)

a regular polygon area model geometry.

---

### regularPolygonCircleGeometry()

> **regularPolygonCircleGeometry**(`sides`, `polygonDiameter`, `diameter`): [`MultiCircle`](../geojson-utils/geojson.md#multicircle)

#### Parameters

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

`sides`

</td>
<td>

`number`

</td>
<td>

`3`

</td>
<td>

the number of sides/vertices.

</td>
</tr>
<tr>
<td>

`polygonDiameter`

</td>
<td>

`number`

</td>
<td>

`10.0`

</td>
<td>

the diameter of the containing circle in meters.

</td>
</tr>
<tr>
<td>

`diameter`

</td>
<td>

`number`

</td>
<td>

`1.0`

</td>
<td>

the diameter of the circles in meters. If diameter is smaller than the distance
between the points in the polygon, the diameter is replaced by this distance.

</td>
</tr>
</tbody>
</table>

#### Returns

[`MultiCircle`](../geojson-utils/geojson.md#multicircle)

a circle model geometry in a regular polygon formation.

---

### regularPolygonLineGeometry()

> **regularPolygonLineGeometry**(`sides`, `polygonDiameter`): [`LineString`](../geojson-utils/geojson.md#linestring)

#### Parameters

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

`sides`

</td>
<td>

`number`

</td>
<td>

`3`

</td>
<td>

the number of sides/vertices.

</td>
</tr>
<tr>
<td>

`polygonDiameter`

</td>
<td>

`number`

</td>
<td>

`1.0`

</td>
<td>

the diameter of the containing circle in meters.

</td>
</tr>
</tbody>
</table>

#### Returns

[`LineString`](../geojson-utils/geojson.md#linestring)

a regular polygon line model geometry.

---

### regularPolygonPointGeometry()

> **regularPolygonPointGeometry**(`sides`, `polygonDiameter`): [`MultiPoint`](../geojson-utils/geojson.md#multipoint)

#### Parameters

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

`sides`

</td>
<td>

`number`

</td>
<td>

`3`

</td>
<td>

the number of sides/vertices.

</td>
</tr>
<tr>
<td>

`polygonDiameter`

</td>
<td>

`number`

</td>
<td>

`1.0`

</td>
<td>

the diameter of the containing circle in meters.

</td>
</tr>
</tbody>
</table>

#### Returns

[`MultiPoint`](../geojson-utils/geojson.md#multipoint)

a point model geometry in a regular polygon formation.

---

### sizeOfModelGeometry()

> **sizeOfModelGeometry**(`geometry`): `number`

Computes the size of a model geometry which has cartesian coordinates.
Size is either number of points, length or area depending on the
type of the geometry.

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

`geometry`

</td>
<td>

[`SingleTypeObject`](../geojson-utils/geojson.md#singletypeobject)

</td>
<td>

a GeoJSON geometry (not geometry collection).

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the size of the geometry.

---

### straightLineGeometry()

> **straightLineGeometry**(`sideLength`): [`LineString`](../geojson-utils/geojson.md#linestring)

#### Parameters

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

`sideLength`

</td>
<td>

`number`

</td>
<td>

`10.0`

</td>
<td>

the length of the line in meters.

</td>
</tr>
</tbody>
</table>

#### Returns

[`LineString`](../geojson-utils/geojson.md#linestring)

a north-south straight line model geometry.
