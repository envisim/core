[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson-utils](../README.md) / @envisim/geojson-utils

# @envisim/geojson-utils

## Contents

- [Classes](#classes)
  - [BoundingBox](#boundingbox)
  - [GeometricPrimitive](#geometricprimitive)
  - [Segment](#segment)
- [Interfaces](#interfaces)
  - [Projection](#projection)
- [Type Aliases](#type-aliases)
  - [GeometricPrimitiveArea](#geometricprimitivearea)
  - [GeometricPrimitiveLine](#geometricprimitiveline)
  - [GeometricPrimitiveNone](#geometricprimitivenone)
  - [GeometricPrimitivePoint](#geometricprimitivepoint)
  - [GeometricPrimitiveUnion](#geometricprimitiveunion)
- [Functions](#functions)
  - [areaOfPolygonLonLat()](#areaofpolygonlonlat)
  - [azimuthalEquidistant()](#azimuthalequidistant)
  - [bboxFromPositions()](#bboxfrompositions)
  - [bboxFromPositionsUnwrapped()](#bboxfrompositionsunwrapped)
  - [bboxInBBox()](#bboxinbbox)
  - [copyCoordinates()](#copycoordinates)
  - [cutAreaGeometry()](#cutareageometry)
  - [cutLineGeometry()](#cutlinegeometry)
  - [getPositionsForCircle()](#getpositionsforcircle)
  - [intersectPolygons()](#intersectpolygons)
  - [lengthOfLineString()](#lengthoflinestring)
  - [longitudeCenter()](#longitudecenter)
  - [longitudeDistance()](#longitudedistance)
  - [midpoint()](#midpoint)
  - [midpointRaw()](#midpointraw)
  - [moveCoordsAroundEarth()](#movecoordsaroundearth)
  - [normalizeLongitude()](#normalizelongitude)
  - [pointInMultiPolygonPosition()](#pointinmultipolygonposition)
  - [pointInSinglePolygonPosition()](#pointinsinglepolygonposition)
  - [rerollPolygons()](#rerollpolygons)
  - [ringToSegments()](#ringtosegments)
  - [segmentsToPolygon()](#segmentstopolygon)
  - [unionOfBBoxes()](#unionofbboxes)

## Classes

### BoundingBox

#### Constructors

##### Constructor

> **new BoundingBox**(): [`BoundingBox`](#boundingbox)

###### Returns

[`BoundingBox`](#boundingbox)

#### Methods

##### altitudeRange()

> `static` **altitudeRange**(`bbox`): \[`number`, `number`]

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
</tr>
</tbody>
</table>

###### Returns

\[`number`, `number`]

##### center()

> `static` **center**(`bbox`): [`Position2`](geojson-utils/geojson.md#position2)

Computes the parametric center (in longitude and latitude only) of a bounding box

###### Parameters

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
<td>

a bounding box

</td>
</tr>
</tbody>
</table>

###### Returns

[`Position2`](geojson-utils/geojson.md#position2)

the center of the bounding box

##### includesAntimeridian()

> `static` **includesAntimeridian**(`bbox`): `boolean`

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### includesPoint()

> `static` **includesPoint**(`bbox`, `point`): `boolean`

Checks if position is in bbox.
Considers the altitude only if both have it

###### Parameters

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
<td>

Bounding box.

</td>
</tr>
<tr>
<td>

`point`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)

</td>
<td>

Point coordinates.

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

true if point is in bbox, otherwise false.

##### latitudeDiff()

> `static` **latitudeDiff**(`bbox`): `number`

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### latitudeRange()

> `static` **latitudeRange**(`bbox`): \[`number`, `number`]

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
</tr>
</tbody>
</table>

###### Returns

\[`number`, `number`]

##### longitudeDiff()

> `static` **longitudeDiff**(`bbox`): `number`

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### longitudeRange()

> `static` **longitudeRange**(`bbox`): \[`number`, `number`]

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
</tr>
</tbody>
</table>

###### Returns

\[`number`, `number`]

##### max2()

> `static` **max2**(`bbox`): [`Position2`](geojson-utils/geojson.md#position2)

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Position2`](geojson-utils/geojson.md#position2)

##### maxAltitude()

> `static` **maxAltitude**(`bbox`): `number`

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### maxLatitude()

> `static` **maxLatitude**(`bbox`): `number`

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### maxLongitude()

> `static` **maxLongitude**(`bbox`): `number`

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### min2()

> `static` **min2**(`bbox`): [`Position2`](geojson-utils/geojson.md#position2)

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Position2`](geojson-utils/geojson.md#position2)

##### minAltitude()

> `static` **minAltitude**(`bbox`): `number`

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### minLatitude()

> `static` **minLatitude**(`bbox`): `number`

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### minLongitude()

> `static` **minLongitude**(`bbox`): `number`

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### removeAltitude()

> `static` **removeAltitude**(`bbox`): [`BBox2`](geojson-utils/geojson.md#bbox2)

Removes altitiude from the bounding box

###### Parameters

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

`bbox`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
<td>

a bounding box.

</td>
</tr>
</tbody>
</table>

###### Returns

[`BBox2`](geojson-utils/geojson.md#bbox2)

a copy of the bounding box, with altitude removed (i.e. with length 4).

---

### GeometricPrimitive

#### Constructors

##### Constructor

> **new GeometricPrimitive**(): [`GeometricPrimitive`](#geometricprimitive)

###### Returns

[`GeometricPrimitive`](#geometricprimitive)

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

<a id="area"></a> `AREA`

</td>
<td>

`static`

</td>
<td>

`"area"`

</td>
</tr>
<tr>
<td>

<a id="line"></a> `LINE`

</td>
<td>

`static`

</td>
<td>

`"line"`

</td>
</tr>
<tr>
<td>

<a id="none"></a> `NONE`

</td>
<td>

`static`

</td>
<td>

`"none"`

</td>
</tr>
<tr>
<td>

<a id="point"></a> `POINT`

</td>
<td>

`static`

</td>
<td>

`"point"`

</td>
</tr>
</tbody>
</table>

#### Methods

##### assertArea()

> `static` **assertArea**(`obj`): `asserts obj is "area"`

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

`asserts obj is "area"`

##### assertLine()

> `static` **assertLine**(`obj`): `asserts obj is "line"`

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

`asserts obj is "line"`

##### assertPoint()

> `static` **assertPoint**(`obj`): `asserts obj is "point"`

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

`asserts obj is "point"`

##### fromCollection()

> `static` **fromCollection**(`obj`, `allowGC`, `exhaustive`): [`GeometricPrimitiveUnion`](#geometricprimitiveunion)

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

[`BaseFeatureCollection`](geojson-utils/geojson.md#basefeaturecollection)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`allowGC`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`exhaustive`

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

[`GeometricPrimitiveUnion`](#geometricprimitiveunion)

##### fromFeature()

###### Call Signature

> `static` **fromFeature**(`obj`, `allowGC?`): `"area"`

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

[`AreaFeature`](geojson-utils/geojson.md#areafeature)

</td>
</tr>
<tr>
<td>

`allowGC?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`"area"`

###### Call Signature

> `static` **fromFeature**(`obj`, `allowGC?`): `"line"`

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

[`LineFeature`](geojson-utils/geojson.md#linefeature)

</td>
</tr>
<tr>
<td>

`allowGC?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`"line"`

###### Call Signature

> `static` **fromFeature**(`obj`, `allowGC?`): `"point"`

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

[`PointFeature`](geojson-utils/geojson.md#pointfeature)

</td>
</tr>
<tr>
<td>

`allowGC?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`"point"`

###### Call Signature

> `static` **fromFeature**(`obj`, `allowGC?`): [`GeometricPrimitiveUnion`](#geometricprimitiveunion)

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

[`BaseFeature`](geojson-utils/geojson.md#basefeature)

</td>
</tr>
<tr>
<td>

`allowGC?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`GeometricPrimitiveUnion`](#geometricprimitiveunion)

##### fromGeometry()

###### Call Signature

> `static` **fromGeometry**(`obj`, `allowGC?`): `"area"`

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

[`AreaGeometry`](geojson-utils/geojson.md#areageometry)

</td>
</tr>
<tr>
<td>

`allowGC?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`"area"`

###### Call Signature

> `static` **fromGeometry**(`obj`, `allowGC?`): `"line"`

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

[`LineGeometry`](geojson-utils/geojson.md#linegeometry)

</td>
</tr>
<tr>
<td>

`allowGC?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`"line"`

###### Call Signature

> `static` **fromGeometry**(`obj`, `allowGC?`): `"point"`

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

[`PointGeometry`](geojson-utils/geojson.md#pointgeometry)

</td>
</tr>
<tr>
<td>

`allowGC?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`"point"`

###### Call Signature

> `static` **fromGeometry**(`obj`, `allowGC?`): [`GeometricPrimitiveUnion`](#geometricprimitiveunion)

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

[`BaseGeometry`](geojson-utils/geojson.md#basegeometry)

</td>
</tr>
<tr>
<td>

`allowGC?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`GeometricPrimitiveUnion`](#geometricprimitiveunion)

##### isArea()

> `static` **isArea**(`obj`): `obj is "area"`

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

`obj is "area"`

##### isLine()

> `static` **isLine**(`obj`): `obj is "line"`

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

`obj is "line"`

##### isPoint()

> `static` **isPoint**(`obj`): `obj is "point"`

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

`obj is "point"`

---

### Segment

#### Constructors

##### Constructor

> **new Segment**(`p1`, `p2`): [`Segment`](#segment)

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

`p1`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)

</td>
</tr>
<tr>
<td>

`p2`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Segment`](#segment)

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

<a id="delta"></a> `delta`

</td>
<td>

[`Position2`](geojson-utils/geojson.md#position2)

</td>
</tr>
<tr>
<td>

<a id="p1"></a> `p1`

</td>
<td>

[`Position2`](geojson-utils/geojson.md#position2)

</td>
</tr>
<tr>
<td>

<a id="p2"></a> `p2`

</td>
<td>

[`Position2`](geojson-utils/geojson.md#position2)

</td>
</tr>
</tbody>
</table>

#### Methods

##### buffer()

> **buffer**(`distance`): `void`

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

`distance`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### crossProduct()

> **crossProduct**(`segment`): `number`

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

`segment`

</td>
<td>

[`Segment`](#segment)

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### distanceToPosition()

> **distanceToPosition**(`position`): `number`

Distance from a position to the segment.
Note that this is not intended to be used for very long platé carree segments.
This function uses the azimuthal equidistant projection with position as reference point.

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

[`Position`](geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

the distance from the position to the segment

##### end()

> **end**(): [`Position2`](geojson-utils/geojson.md#position2)

###### Returns

[`Position2`](geojson-utils/geojson.md#position2)

##### intersect()

> **intersect**(`seg`): `null` | [`Position2`](geojson-utils/geojson.md#position2)

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

`seg`

</td>
<td>

[`Segment`](#segment)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Position2`](geojson-utils/geojson.md#position2)

##### intersectByPositions()

> **intersectByPositions**(`p1`, `p2`): `null` | [`Position2`](geojson-utils/geojson.md#position2)

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

`p1`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)

</td>
</tr>
<tr>
<td>

`p2`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | [`Position2`](geojson-utils/geojson.md#position2)

##### isVector()

> **isVector**(): `boolean`

###### Returns

`boolean`

##### isVertical()

> **isVertical**(): `boolean`

###### Returns

`boolean`

##### leftMost()

> **leftMost**(): [`Position2`](geojson-utils/geojson.md#position2)

###### Returns

[`Position2`](geojson-utils/geojson.md#position2)

##### parametricIntersect()

> **parametricIntersect**(`segment`, `includeInvalid`): `null` | \[`number`, `number`]

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

`segment`

</td>
<td>

[`Segment`](#segment)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`includeInvalid`

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

`null` | \[`number`, `number`]

##### position()

> **position**(`param`): [`Position2`](geojson-utils/geojson.md#position2)

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

`param`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Position2`](geojson-utils/geojson.md#position2)

##### rightDistanceOfPoint()

> **rightDistanceOfPoint**(`point`): `null` | `number`

Calculates the distance between a point and a segment along a ray travelling rightward from the
point.

We should (but do not) assume that:
(1) An upward segment excludes its final point
(2) A downward segment excludes its starting point
(3) Horizontal segments are excluded
(4) The segment/ray intersection point must be strictly to the right of the point
However, we only exclude horizontal segments not on the point, and
allow intersections to happen on the point. Thus, 0.0 returns should be disregarded when
determining point-in-polygon.

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

[`Position`](geojson-utils/geojson.md#position)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | `number`

`null` or a non-negative number

##### rightMost()

> **rightMost**(): [`Position2`](geojson-utils/geojson.md#position2)

###### Returns

[`Position2`](geojson-utils/geojson.md#position2)

##### start()

> **start**(): [`Position2`](geojson-utils/geojson.md#position2)

###### Returns

[`Position2`](geojson-utils/geojson.md#position2)

##### checkParameter()

> `static` **checkParameter**(`param`): `boolean`

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

`param`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

## Interfaces

### Projection

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

<a id="project"></a> `project`

</td>
<td>

(`coord`) => [`Position2`](geojson-utils/geojson.md#position2)

</td>
</tr>
<tr>
<td>

<a id="unproject"></a> `unproject`

</td>
<td>

(`coord`) => [`Position2`](geojson-utils/geojson.md#position2)

</td>
</tr>
</tbody>
</table>

## Type Aliases

### GeometricPrimitiveArea

> **GeometricPrimitiveArea** = _typeof_ [`GeometricPrimitive`](#geometricprimitive)\[`"AREA"`]

---

### GeometricPrimitiveLine

> **GeometricPrimitiveLine** = _typeof_ [`GeometricPrimitive`](#geometricprimitive)\[`"LINE"`]

---

### GeometricPrimitiveNone

> **GeometricPrimitiveNone** = _typeof_ [`GeometricPrimitive`](#geometricprimitive)\[`"NONE"`]

---

### GeometricPrimitivePoint

> **GeometricPrimitivePoint** = _typeof_ [`GeometricPrimitive`](#geometricprimitive)\[`"POINT"`]

---

### GeometricPrimitiveUnion

> **GeometricPrimitiveUnion** = [`GeometricPrimitiveArea`](#geometricprimitivearea-1) | [`GeometricPrimitiveLine`](#geometricprimitiveline-1) | [`GeometricPrimitivePoint`](#geometricprimitivepoint-1) | [`GeometricPrimitiveNone`](#geometricprimitivenone-1)

## Functions

### areaOfPolygonLonLat()

> **areaOfPolygonLonLat**(`points`): `number`

Computes the plate carrée area of a Polygon (not MultiPolygon)

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

`points`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)\[]\[]

</td>
<td>

the coordinates of the Polygon.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the area in square meters.

---

### azimuthalEquidistant()

> **azimuthalEquidistant**(`refCoord`): [`Projection`](#projection)

Azimuthal Equidistant projection based on the reference coordinate
provided as argument.

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

`refCoord`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)

</td>
<td>

the reference coordinate

</td>
</tr>
</tbody>
</table>

#### Returns

[`Projection`](#projection)

an azimuthal equidistant projection.

---

### bboxFromPositions()

#### Call Signature

> **bboxFromPositions**(`positions`): [`BBox2`](geojson-utils/geojson.md#bbox2)

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

`positions`

</td>
<td>

[`Position2`](geojson-utils/geojson.md#position2)\[]

</td>
<td>

an array of positions

</td>
</tr>
</tbody>
</table>

##### Returns

[`BBox2`](geojson-utils/geojson.md#bbox2)

the bounding box around the array of positions

##### Throws

ValidationError when positions.length === 0

#### Call Signature

> **bboxFromPositions**(`positions`): [`BBox3`](geojson-utils/geojson.md#bbox3)

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

`positions`

</td>
<td>

[`Position3`](geojson-utils/geojson.md#position3)\[]

</td>
<td>

an array of positions

</td>
</tr>
</tbody>
</table>

##### Returns

[`BBox3`](geojson-utils/geojson.md#bbox3)

the bounding box around the array of positions

##### Throws

ValidationError when positions.length === 0

#### Call Signature

> **bboxFromPositions**(`positions`): [`BBox`](geojson-utils/geojson.md#bbox-7)

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

`positions`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)\[]

</td>
<td>

an array of positions

</td>
</tr>
</tbody>
</table>

##### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

the bounding box around the array of positions

##### Throws

ValidationError when positions.length === 0

---

### bboxFromPositionsUnwrapped()

#### Call Signature

> **bboxFromPositionsUnwrapped**(`positions`): [`BBox2`](geojson-utils/geojson.md#bbox2)

##### Parameters

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

`positions`

</td>
<td>

[`Position2`](geojson-utils/geojson.md#position2)\[]

</td>
</tr>
</tbody>
</table>

##### Returns

[`BBox2`](geojson-utils/geojson.md#bbox2)

##### Throws

ValidationError when positions.length === 0

#### Call Signature

> **bboxFromPositionsUnwrapped**(`positions`): [`BBox3`](geojson-utils/geojson.md#bbox3)

##### Parameters

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

`positions`

</td>
<td>

[`Position3`](geojson-utils/geojson.md#position3)\[]

</td>
</tr>
</tbody>
</table>

##### Returns

[`BBox3`](geojson-utils/geojson.md#bbox3)

##### Throws

ValidationError when positions.length === 0

#### Call Signature

> **bboxFromPositionsUnwrapped**(`positions`): [`BBox`](geojson-utils/geojson.md#bbox-7)

##### Parameters

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

`positions`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)\[]

</td>
</tr>
</tbody>
</table>

##### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

##### Throws

ValidationError when positions.length === 0

---

### bboxInBBox()

> **bboxInBBox**(`b1`, `b2`): `boolean`

Checks if two bounding boxes overlap.

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

`b1`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
<td>

The first bounding box.

</td>
</tr>
<tr>
<td>

`b2`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)

</td>
<td>

The second bounding box.

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

- Returns true if the bboxes overlap, otherwise false.

---

### copyCoordinates()

> **copyCoordinates**<`T`>(`coords`): `T`

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

`T` _extends_ [`Position`](geojson-utils/geojson.md#position) | [`Position`](geojson-utils/geojson.md#position)\[] | [`Position`](geojson-utils/geojson.md#position)\[] | [`Position`](geojson-utils/geojson.md#position)\[]\[] | [`Position`](geojson-utils/geojson.md#position)\[]\[] | [`Position`](geojson-utils/geojson.md#position)\[]\[]\[] | [`Position`](geojson-utils/geojson.md#position)\[]

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

`coords`

</td>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Returns

`T`

---

### cutAreaGeometry()

#### Call Signature

> **cutAreaGeometry**(`g`): [`Circle`](geojson-utils/geojson.md#circle)

Cuts an AreaGeometry on the antimeridian

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

`g`

</td>
<td>

[`Circle`](geojson-utils/geojson.md#circle)

</td>
<td>

the AreaGeometry to cut

</td>
</tr>
</tbody>
</table>

##### Returns

[`Circle`](geojson-utils/geojson.md#circle)

the cut AreaGeometry

#### Call Signature

> **cutAreaGeometry**(`g`): [`MultiCircle`](geojson-utils/geojson.md#multicircle)

Cuts an AreaGeometry on the antimeridian

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

`g`

</td>
<td>

[`MultiCircle`](geojson-utils/geojson.md#multicircle)

</td>
<td>

the AreaGeometry to cut

</td>
</tr>
</tbody>
</table>

##### Returns

[`MultiCircle`](geojson-utils/geojson.md#multicircle)

the cut AreaGeometry

#### Call Signature

> **cutAreaGeometry**(`g`): [`Polygon`](geojson-utils/geojson.md#polygon) | [`MultiPolygon`](geojson-utils/geojson.md#multipolygon)

Cuts an AreaGeometry on the antimeridian

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

`g`

</td>
<td>

[`Polygon`](geojson-utils/geojson.md#polygon) | [`MultiPolygon`](geojson-utils/geojson.md#multipolygon)

</td>
<td>

the AreaGeometry to cut

</td>
</tr>
</tbody>
</table>

##### Returns

[`Polygon`](geojson-utils/geojson.md#polygon) | [`MultiPolygon`](geojson-utils/geojson.md#multipolygon)

the cut AreaGeometry

---

### cutLineGeometry()

> **cutLineGeometry**(`g`): [`LineObject`](geojson-utils/geojson.md#lineobject)

Cuts a LineGeometry on the antimeridian

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

`g`

</td>
<td>

[`LineObject`](geojson-utils/geojson.md#lineobject)

</td>
<td>

the LineGeometry to cut

</td>
</tr>
</tbody>
</table>

#### Returns

[`LineObject`](geojson-utils/geojson.md#lineobject)

the cut LineGeometry

---

### getPositionsForCircle()

> **getPositionsForCircle**(`point`, `radius`): [`Position`](geojson-utils/geojson.md#position)\[]

Computes positions needed to find bounding box of a PointCircle.

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

`point`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)

</td>
<td>

A position.

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

The radius in meters.

</td>
</tr>
</tbody>
</table>

#### Returns

[`Position`](geojson-utils/geojson.md#position)\[]

- An array with four positions \[top,right,bottom,left].

---

### intersectPolygons()

> **intersectPolygons**(`polygons1`, `polygons2`): [`Position2`](geojson-utils/geojson.md#position2)\[]\[]\[]

Assumes that `polygons` consists of two sets of non-overlapping polygon(s).

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

`polygons1`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)\[]\[]\[]

</td>
</tr>
<tr>
<td>

`polygons2`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)\[]\[]\[]

</td>
</tr>
</tbody>
</table>

#### Returns

[`Position2`](geojson-utils/geojson.md#position2)\[]\[]\[]

the intersect of these two sets.

---

### lengthOfLineString()

> **lengthOfLineString**(`ls`): `number`

Computes the approximate length of a LineString, where each segment is
of type plate carrée.

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

`ls`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)\[]

</td>
<td>

Coordinates of a LineString

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the length of the LineString in meters.

---

### longitudeCenter()

> **longitudeCenter**(`a`, `b`, `norm`): `number`

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

`a`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

the smallest longitude

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

the largest longitude

</td>
</tr>
<tr>
<td>

`norm`

</td>
<td>

`number`

</td>
<td>

`360.0`

</td>
<td>

the normalizing factor

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the midpoint of the longitudes `[a, b]` in `[-norm/2, norm/2]`

---

### longitudeDistance()

> **longitudeDistance**(`a`, `b`, `norm`): `number`

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

`a`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

the smallest longitude

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

the largest longitude

</td>
</tr>
<tr>
<td>

`norm`

</td>
<td>

`number`

</td>
<td>

`360.0`

</td>
<td>

the normalizing factor

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the distance in normalized longitudes on range \[a, b]

---

### midpoint()

> **midpoint**(`p1`, `p2`): [`Position2`](geojson-utils/geojson.md#position2)

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

`p1`

</td>
<td>

[`Position2`](geojson-utils/geojson.md#position2)

</td>
</tr>
<tr>
<td>

`p2`

</td>
<td>

[`Position2`](geojson-utils/geojson.md#position2)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Position2`](geojson-utils/geojson.md#position2)

---

### midpointRaw()

> **midpointRaw**(`p1`, `p2`): [`Position2`](geojson-utils/geojson.md#position2)

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

`p1`

</td>
<td>

[`Position2`](geojson-utils/geojson.md#position2)

</td>
</tr>
<tr>
<td>

`p2`

</td>
<td>

[`Position2`](geojson-utils/geojson.md#position2)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Position2`](geojson-utils/geojson.md#position2)

---

### moveCoordsAroundEarth()

> **moveCoordsAroundEarth**(`coords`): [`Position`](geojson-utils/geojson.md#position)\[]

Moves rings that starts on the west side of the meridian (-180 -- 0) to the positive counterpart (180--360)

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

`coords`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)\[]

</td>
</tr>
</tbody>
</table>

#### Returns

[`Position`](geojson-utils/geojson.md#position)\[]

---

### normalizeLongitude()

> **normalizeLongitude**(`p`, `norm`): `number`

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

`p`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

the longitude to normalize

</td>
</tr>
<tr>
<td>

`norm`

</td>
<td>

`number`

</td>
<td>

`360.0`

</td>
<td>

the normalizing factor

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

p normalized to \[-norm/2, norm/2]

---

### pointInMultiPolygonPosition()

> **pointInMultiPolygonPosition**(`point`, `polygons`): `boolean`

Checks if a point is in a MultiPolygon.
Note: Not for Polygon.

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

`point`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)

</td>
<td>

Coordinates \[lon,lat] of a point.

</td>
</tr>
<tr>
<td>

`polygons`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)\[]\[]\[]

</td>
<td>

Coordinates of a MultiPolygon, not Polygon.

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

`true` if point is in polygon.

---

### pointInSinglePolygonPosition()

> **pointInSinglePolygonPosition**(`point`, `polygon`): `boolean`

Checks if a point is in a Polygon.
Note: Not for MultiPolygon.

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

`point`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)

</td>
<td>

Coordinates \[lon,lat] of a point.

</td>
</tr>
<tr>
<td>

`polygon`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)\[]\[]

</td>
<td>

Coordinates of a Polygon, not MultiPolygon.

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

`true` if point is in polygon.

---

### rerollPolygons()

> **rerollPolygons**(`polygons`): [`Position2`](geojson-utils/geojson.md#position2)\[]\[]\[]

An unrolled polygon is a polygon which may exist outside the boundaries of normal earth
(-180, 180), as if the earth(s) was unrolled on a sheet of paper.

This function takes polygons with unrolled coordinates and, rolls them into (-180, 180). The
function assumes that no polygon exists solely on the left earth (-540, -180), or the right
earth, (180, 540), but that the following polygons may exist:

- overlapping -180,
- solely in normal earth (-180, 180),
- overlapping 180.

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

`polygons`

</td>
<td>

[`Position2`](geojson-utils/geojson.md#position2)\[]\[]\[]

</td>
</tr>
</tbody>
</table>

#### Returns

[`Position2`](geojson-utils/geojson.md#position2)\[]\[]\[]

---

### ringToSegments()

> **ringToSegments**(`polygon`): [`Segment`](#segment)\[]

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

`polygon`

</td>
<td>

[`Position`](geojson-utils/geojson.md#position)\[]

</td>
</tr>
</tbody>
</table>

#### Returns

[`Segment`](#segment)\[]

---

### segmentsToPolygon()

> **segmentsToPolygon**(`segments`): [`Position2`](geojson-utils/geojson.md#position2)\[]

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

`segments`

</td>
<td>

[`Segment`](#segment)\[]

</td>
</tr>
</tbody>
</table>

#### Returns

[`Position2`](geojson-utils/geojson.md#position2)\[]

---

### unionOfBBoxes()

> **unionOfBBoxes**(`bboxes`): [`BBox`](geojson-utils/geojson.md#bbox-7)

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

`bboxes`

</td>
<td>

[`BBox`](geojson-utils/geojson.md#bbox-7)\[]

</td>
<td>

an array of bboxes

</td>
</tr>
</tbody>
</table>

#### Returns

[`BBox`](geojson-utils/geojson.md#bbox-7)

the bounding box around the array of bboxes

#### Throws

ValidationError when bboxes.length === 0
