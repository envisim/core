[**@envisim/geojson-utils**](README.md)

---

[@envisim/geojson-utils](README.md) / default

# default

## Classes

### BoundingBox

#### Constructors

##### Constructor

> **new BoundingBox**(): [`BoundingBox`](#boundingbox)

###### Returns

[`BoundingBox`](#boundingbox)

#### Methods

##### altitudeRange()

> `static` **altitudeRange**(`bbox`): \[`number`, `number`\]

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `bbox`    | [`BBox`](geojson.md#bbox-7) |

###### Returns

\[`number`, `number`\]

##### center()

> `static` **center**(`bbox`): [`Position2`](geojson.md#position2)

Computes the parametric center (in longitude and latitude only) of a bounding box

###### Parameters

| Parameter | Type                        | Description    |
| --------- | --------------------------- | -------------- |
| `bbox`    | [`BBox`](geojson.md#bbox-7) | a bounding box |

###### Returns

[`Position2`](geojson.md#position2)

the center of the bounding box

##### includesAntimeridian()

> `static` **includesAntimeridian**(`bbox`): `boolean`

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `bbox`    | [`BBox`](geojson.md#bbox-7) |

###### Returns

`boolean`

##### includesPoint()

> `static` **includesPoint**(`bbox`, `point`): `boolean`

Checks if position is in bbox.
Considers the altitude only if both have it

###### Parameters

| Parameter | Type                              | Description        |
| --------- | --------------------------------- | ------------------ |
| `bbox`    | [`BBox`](geojson.md#bbox-7)       | Bounding box.      |
| `point`   | [`Position`](geojson.md#position) | Point coordinates. |

###### Returns

`boolean`

true if point is in bbox, otherwise false.

##### latitudeDiff()

> `static` **latitudeDiff**(`bbox`): `number`

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `bbox`    | [`BBox`](geojson.md#bbox-7) |

###### Returns

`number`

##### latitudeRange()

> `static` **latitudeRange**(`bbox`): \[`number`, `number`\]

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `bbox`    | [`BBox`](geojson.md#bbox-7) |

###### Returns

\[`number`, `number`\]

##### longitudeDiff()

> `static` **longitudeDiff**(`bbox`): `number`

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `bbox`    | [`BBox`](geojson.md#bbox-7) |

###### Returns

`number`

##### longitudeRange()

> `static` **longitudeRange**(`bbox`): \[`number`, `number`\]

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `bbox`    | [`BBox`](geojson.md#bbox-7) |

###### Returns

\[`number`, `number`\]

##### max2()

> `static` **max2**(`bbox`): [`Position2`](geojson.md#position2)

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `bbox`    | [`BBox`](geojson.md#bbox-7) |

###### Returns

[`Position2`](geojson.md#position2)

##### maxAltitude()

> `static` **maxAltitude**(`bbox`): `number`

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `bbox`    | [`BBox`](geojson.md#bbox-7) |

###### Returns

`number`

##### maxLatitude()

> `static` **maxLatitude**(`bbox`): `number`

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `bbox`    | [`BBox`](geojson.md#bbox-7) |

###### Returns

`number`

##### maxLongitude()

> `static` **maxLongitude**(`bbox`): `number`

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `bbox`    | [`BBox`](geojson.md#bbox-7) |

###### Returns

`number`

##### min2()

> `static` **min2**(`bbox`): [`Position2`](geojson.md#position2)

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `bbox`    | [`BBox`](geojson.md#bbox-7) |

###### Returns

[`Position2`](geojson.md#position2)

##### minAltitude()

> `static` **minAltitude**(`bbox`): `number`

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `bbox`    | [`BBox`](geojson.md#bbox-7) |

###### Returns

`number`

##### minLatitude()

> `static` **minLatitude**(`bbox`): `number`

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `bbox`    | [`BBox`](geojson.md#bbox-7) |

###### Returns

`number`

##### minLongitude()

> `static` **minLongitude**(`bbox`): `number`

###### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `bbox`    | [`BBox`](geojson.md#bbox-7) |

###### Returns

`number`

##### removeAltitude()

> `static` **removeAltitude**(`bbox`): [`BBox2`](geojson.md#bbox2)

Removes altitiude from the bounding box

###### Parameters

| Parameter | Type                        | Description     |
| --------- | --------------------------- | --------------- |
| `bbox`    | [`BBox`](geojson.md#bbox-7) | a bounding box. |

###### Returns

[`BBox2`](geojson.md#bbox2)

a copy of the bounding box, with altitude removed (i.e. with length 4).

---

### GeometricPrimitive

#### Constructors

##### Constructor

> **new GeometricPrimitive**(): [`GeometricPrimitive`](#geometricprimitive)

###### Returns

[`GeometricPrimitive`](#geometricprimitive)

#### Properties

| Property                   | Modifier | Type      |
| -------------------------- | -------- | --------- |
| <a id="area"></a> `AREA`   | `static` | `"area"`  |
| <a id="line"></a> `LINE`   | `static` | `"line"`  |
| <a id="none"></a> `NONE`   | `static` | `"none"`  |
| <a id="point"></a> `POINT` | `static` | `"point"` |

#### Methods

##### assertArea()

> `static` **assertArea**(`obj`): `asserts obj is "area"`

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `obj`     | `unknown` |

###### Returns

`asserts obj is "area"`

##### assertLine()

> `static` **assertLine**(`obj`): `asserts obj is "line"`

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `obj`     | `unknown` |

###### Returns

`asserts obj is "line"`

##### assertPoint()

> `static` **assertPoint**(`obj`): `asserts obj is "point"`

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `obj`     | `unknown` |

###### Returns

`asserts obj is "point"`

##### fromCollection()

> `static` **fromCollection**(`obj`, `allowGC`, `exhaustive`): [`GeometricPrimitiveUnion`](#geometricprimitiveunion)

###### Parameters

| Parameter    | Type                                                        | Default value |
| ------------ | ----------------------------------------------------------- | ------------- |
| `obj`        | [`BaseFeatureCollection`](geojson.md#basefeaturecollection) | `undefined`   |
| `allowGC`    | `boolean`                                                   | `false`       |
| `exhaustive` | `boolean`                                                   | `false`       |

###### Returns

[`GeometricPrimitiveUnion`](#geometricprimitiveunion)

##### fromFeature()

###### Call Signature

> `static` **fromFeature**(`obj`, `allowGC?`): `"area"`

###### Parameters

| Parameter  | Type                                    |
| ---------- | --------------------------------------- |
| `obj`      | [`AreaFeature`](geojson.md#areafeature) |
| `allowGC?` | `boolean`                               |

###### Returns

`"area"`

###### Call Signature

> `static` **fromFeature**(`obj`, `allowGC?`): `"line"`

###### Parameters

| Parameter  | Type                                    |
| ---------- | --------------------------------------- |
| `obj`      | [`LineFeature`](geojson.md#linefeature) |
| `allowGC?` | `boolean`                               |

###### Returns

`"line"`

###### Call Signature

> `static` **fromFeature**(`obj`, `allowGC?`): `"point"`

###### Parameters

| Parameter  | Type                                      |
| ---------- | ----------------------------------------- |
| `obj`      | [`PointFeature`](geojson.md#pointfeature) |
| `allowGC?` | `boolean`                                 |

###### Returns

`"point"`

###### Call Signature

> `static` **fromFeature**(`obj`, `allowGC?`): [`GeometricPrimitiveUnion`](#geometricprimitiveunion)

###### Parameters

| Parameter  | Type                                    |
| ---------- | --------------------------------------- |
| `obj`      | [`BaseFeature`](geojson.md#basefeature) |
| `allowGC?` | `boolean`                               |

###### Returns

[`GeometricPrimitiveUnion`](#geometricprimitiveunion)

##### fromGeometry()

###### Call Signature

> `static` **fromGeometry**(`obj`, `allowGC?`): `"area"`

###### Parameters

| Parameter  | Type                                      |
| ---------- | ----------------------------------------- |
| `obj`      | [`AreaGeometry`](geojson.md#areageometry) |
| `allowGC?` | `boolean`                                 |

###### Returns

`"area"`

###### Call Signature

> `static` **fromGeometry**(`obj`, `allowGC?`): `"line"`

###### Parameters

| Parameter  | Type                                      |
| ---------- | ----------------------------------------- |
| `obj`      | [`LineGeometry`](geojson.md#linegeometry) |
| `allowGC?` | `boolean`                                 |

###### Returns

`"line"`

###### Call Signature

> `static` **fromGeometry**(`obj`, `allowGC?`): `"point"`

###### Parameters

| Parameter  | Type                                        |
| ---------- | ------------------------------------------- |
| `obj`      | [`PointGeometry`](geojson.md#pointgeometry) |
| `allowGC?` | `boolean`                                   |

###### Returns

`"point"`

###### Call Signature

> `static` **fromGeometry**(`obj`, `allowGC?`): [`GeometricPrimitiveUnion`](#geometricprimitiveunion)

###### Parameters

| Parameter  | Type                                      |
| ---------- | ----------------------------------------- |
| `obj`      | [`BaseGeometry`](geojson.md#basegeometry) |
| `allowGC?` | `boolean`                                 |

###### Returns

[`GeometricPrimitiveUnion`](#geometricprimitiveunion)

##### isArea()

> `static` **isArea**(`obj`): `obj is "area"`

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `obj`     | `unknown` |

###### Returns

`obj is "area"`

##### isLine()

> `static` **isLine**(`obj`): `obj is "line"`

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `obj`     | `unknown` |

###### Returns

`obj is "line"`

##### isPoint()

> `static` **isPoint**(`obj`): `obj is "point"`

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `obj`     | `unknown` |

###### Returns

`obj is "point"`

---

### IntersectList

A class for calulating and keeping track of the intersection points of segments.

#### Constructors

##### Constructor

> **new IntersectList**(`segments`, `breaks`): [`IntersectList`](#intersectlist)

Constructs the list by finding intersections through sweepline search

###### Parameters

| Parameter  | Type                    |
| ---------- | ----------------------- |
| `segments` | [`Segment`](#segment)[] |
| `breaks`   | `number`[]              |

###### Returns

[`IntersectList`](#intersectlist)

#### Properties

| Property                             | Type                    | Default value | Description                                                                         |
| ------------------------------------ | ----------------------- | ------------- | ----------------------------------------------------------------------------------- |
| <a id="list"></a> `list`             | `IntersectPoint`[]      | `[]`          | An array of intersection points                                                     |
| <a id="segmentmap"></a> `segmentMap` | `number`[][]            | `undefined`   | A map from segment indices to the intersection points where the segment is present. |
| <a id="segments"></a> `segments`     | [`Segment`](#segment)[] | `undefined`   | The array of underlying segments                                                    |

#### Methods

##### addIntersect()

> **addIntersect**(`segments`, `params`, `position`): `void`

Adds a new intersection point

###### Parameters

| Parameter  | Type                                |
| ---------- | ----------------------------------- |
| `segments` | \[`number`, `number`\]              |
| `params`   | \[`number`, `number`\]              |
| `position` | [`Position2`](geojson.md#position2) |

###### Returns

`void`

##### appendIntersect()

> **appendIntersect**(`idx`, `segment`, `param`): `void`

Adds a segments intersection details to an intersection point

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `idx`     | `number` |
| `segment` | `number` |
| `param`   | `number` |

###### Returns

`void`

##### extremePointOfIntersectionRing()

> **extremePointOfIntersectionRing**(`ring`): \[`number`, `number`\]

Returns the list idx of the extreme points in a ring

###### Parameters

| Parameter | Type       |
| --------- | ---------- |
| `ring`    | `number`[] |

###### Returns

\[`number`, `number`\]

##### getNextIntersectOfSegment()

> **getNextIntersectOfSegment**(`start`): `null` \| `number`

Finds the closest intersect along a segment, further along the segment (larger param).

###### Parameters

| Parameter | Type               |
| --------- | ------------------ |
| `start`   | `IntersectSegment` |

###### Returns

`null` \| `number`

##### getRightmostSegment()

> **getRightmostSegment**(`start`, `intpointIdx`): `IntersectSegment`

Finds the rightmost segment in an intersection, relative to the travelled segment. The
intersect is guaranteed to have an unvisited segment.

###### Parameters

| Parameter     | Type               |
| ------------- | ------------------ |
| `start`       | `IntersectSegment` |
| `intpointIdx` | `number`           |

###### Returns

`IntersectSegment`

##### getUnvisitedIntersectAndSegment()

> **getUnvisitedIntersectAndSegment**(): `IntersectIndices`

Gives the first unvisited segment going out from an intersection point.

###### Returns

`IntersectIndices`

##### intersectionRingIsPositive()

> **intersectionRingIsPositive**(`ring`, `min`): `boolean`

###### Parameters

| Parameter | Type       |
| --------- | ---------- |
| `ring`    | `number`[] |
| `min`     | `number`   |

###### Returns

`boolean`

##### intersectionRingsToOrderedSegmentRings()

> **intersectionRingsToOrderedSegmentRings**(`ringList`, `parentIsPositive`): \[[`Segment`](#segment)[][], `number`[]\]

Orders the intersection rings (defined by intersection indices), by their parent-children
relationships, and transforms the intersection rings to segment rings.
Also filters away unnecessary rings, i.e. rings which are redundant (same direction as parent),
and nonsensical rings (topmost rings in opposite direciton).

###### Parameters

| Parameter          | Type         |
| ------------------ | ------------ |
| `ringList`         | `number`[][] |
| `parentIsPositive` | `boolean`    |

###### Returns

\[[`Segment`](#segment)[][], `number`[]\]

##### intersectionRingToSegmentRing()

> **intersectionRingToSegmentRing**(`ring`): [`Segment`](#segment)[]

###### Parameters

| Parameter | Type       |
| --------- | ---------- |
| `ring`    | `number`[] |

###### Returns

[`Segment`](#segment)[]

##### traceIntersectionRings()

> **traceIntersectionRings**(): `number`[][]

Returns an array of rings, defined gy their intersection indices, by travelling ccw around the
segments.

###### Returns

`number`[][]

##### tryAppendIntersect()

> **tryAppendIntersect**(`segments`, `params`): `boolean`

Adds an intersection point, if none exists. Returns true if the intersection point already
exists, false otherwise.

###### Parameters

| Parameter  | Type                   |
| ---------- | ---------------------- |
| `segments` | \[`number`, `number`\] |
| `params`   | \[`number`, `number`\] |

###### Returns

`boolean`

---

### Segment

#### Constructors

##### Constructor

> **new Segment**(`p1`, `p2`): [`Segment`](#segment)

###### Parameters

| Parameter | Type                              |
| --------- | --------------------------------- |
| `p1`      | [`Position`](geojson.md#position) |
| `p2`      | [`Position`](geojson.md#position) |

###### Returns

[`Segment`](#segment)

#### Properties

| Property                   | Type                                |
| -------------------------- | ----------------------------------- |
| <a id="delta"></a> `delta` | [`Position2`](geojson.md#position2) |
| <a id="p1"></a> `p1`       | [`Position2`](geojson.md#position2) |
| <a id="p2"></a> `p2`       | [`Position2`](geojson.md#position2) |

#### Methods

##### buffer()

> **buffer**(`distance`): `void`

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `distance` | `number` |

###### Returns

`void`

##### crossProduct()

> **crossProduct**(`segment`): `number`

###### Parameters

| Parameter | Type                  |
| --------- | --------------------- |
| `segment` | [`Segment`](#segment) |

###### Returns

`number`

##### distanceToPosition()

> **distanceToPosition**(`position`): `number`

Distance from a position to the segment.
Note that this is not intended to be used for very long platé carree segments.
This function uses the azimuthal equidistant projection with position as reference point.

###### Parameters

| Parameter  | Type                              |
| ---------- | --------------------------------- |
| `position` | [`Position`](geojson.md#position) |

###### Returns

`number`

the distance from the position to the segment

##### end()

> **end**(): [`Position2`](geojson.md#position2)

###### Returns

[`Position2`](geojson.md#position2)

##### intersect()

> **intersect**(`seg`): `null` \| [`Position2`](geojson.md#position2)

###### Parameters

| Parameter | Type                  |
| --------- | --------------------- |
| `seg`     | [`Segment`](#segment) |

###### Returns

`null` \| [`Position2`](geojson.md#position2)

##### intersectByPositions()

> **intersectByPositions**(`p1`, `p2`): `null` \| [`Position2`](geojson.md#position2)

###### Parameters

| Parameter | Type                              |
| --------- | --------------------------------- |
| `p1`      | [`Position`](geojson.md#position) |
| `p2`      | [`Position`](geojson.md#position) |

###### Returns

`null` \| [`Position2`](geojson.md#position2)

##### isVector()

> **isVector**(): `boolean`

###### Returns

`boolean`

##### isVertical()

> **isVertical**(): `boolean`

###### Returns

`boolean`

##### leftMost()

> **leftMost**(): [`Position2`](geojson.md#position2)

###### Returns

[`Position2`](geojson.md#position2)

##### parametricIntersect()

> **parametricIntersect**(`segment`, `includeInvalid`): `null` \| \[`number`, `number`\]

###### Parameters

| Parameter        | Type                  | Default value |
| ---------------- | --------------------- | ------------- |
| `segment`        | [`Segment`](#segment) | `undefined`   |
| `includeInvalid` | `boolean`             | `true`        |

###### Returns

`null` \| \[`number`, `number`\]

##### position()

> **position**(`param`): [`Position2`](geojson.md#position2)

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `param`   | `number` |

###### Returns

[`Position2`](geojson.md#position2)

##### rightDistanceOfPoint()

> **rightDistanceOfPoint**(`point`): `null` \| `number`

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

| Parameter | Type                              |
| --------- | --------------------------------- |
| `point`   | [`Position`](geojson.md#position) |

###### Returns

`null` \| `number`

`null` or a non-negative number

##### rightMost()

> **rightMost**(): [`Position2`](geojson.md#position2)

###### Returns

[`Position2`](geojson.md#position2)

##### start()

> **start**(): [`Position2`](geojson.md#position2)

###### Returns

[`Position2`](geojson.md#position2)

##### checkParameter()

> `static` **checkParameter**(`param`): `boolean`

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `param`   | `number` |

###### Returns

`boolean`

## Type Aliases

### GeometricPrimitiveArea

> **GeometricPrimitiveArea** = _typeof_ [`GeometricPrimitive`](#geometricprimitive)\[`"AREA"`\]

---

### GeometricPrimitiveLine

> **GeometricPrimitiveLine** = _typeof_ [`GeometricPrimitive`](#geometricprimitive)\[`"LINE"`\]

---

### GeometricPrimitiveNone

> **GeometricPrimitiveNone** = _typeof_ [`GeometricPrimitive`](#geometricprimitive)\[`"NONE"`\]

---

### GeometricPrimitivePoint

> **GeometricPrimitivePoint** = _typeof_ [`GeometricPrimitive`](#geometricprimitive)\[`"POINT"`\]

---

### GeometricPrimitiveUnion

> **GeometricPrimitiveUnion** = [`GeometricPrimitiveArea`](#geometricprimitivearea-1) \| [`GeometricPrimitiveLine`](#geometricprimitiveline-1) \| [`GeometricPrimitivePoint`](#geometricprimitivepoint-1) \| [`GeometricPrimitiveNone`](#geometricprimitivenone-1)

## Variables

### Geodesic

> `const` **Geodesic**: `SegmentOperations`

---

### PlateCarree

> `const` **PlateCarree**: `Omit`\<`SegmentOperations`, `"destination"` \| `"destinationUnrolled"` \| `"forwardAzimuth"` \| `"forwardAzimuthDistance"`\>

---

### Rhumb

> `const` **Rhumb**: `Omit`\<`SegmentOperations`, `"destinationUnrolled"` \| `"forwardAzimuthDistance"`\>

## Functions

### areaOfPolygonLonLat()

> **areaOfPolygonLonLat**(`points`): `number`

Computes the plate carrée area of a Polygon (not MultiPolygon)

#### Parameters

| Parameter | Type                                  | Description                     |
| --------- | ------------------------------------- | ------------------------------- |
| `points`  | [`Position`](geojson.md#position)[][] | the coordinates of the Polygon. |

#### Returns

`number`

the area in square meters.

---

### azimuthalEquidistant()

> **azimuthalEquidistant**(`refCoord`): `Projection`

Azimuthal Equidistant projection based on the reference coordinate
provided as argument.

#### Parameters

| Parameter  | Type                              | Description        |
| ---------- | --------------------------------- | ------------------ |
| `refCoord` | [`Position`](geojson.md#position) | A GeoJSON.Position |

#### Returns

`Projection`

- Azimuthal Equidistant projection.

---

### bboxFromPositions()

#### Call Signature

> **bboxFromPositions**(`positions`): [`BBox2`](geojson.md#bbox2)

##### Parameters

| Parameter   | Type                                  | Description           |
| ----------- | ------------------------------------- | --------------------- |
| `positions` | [`Position2`](geojson.md#position2)[] | an array of positions |

##### Returns

[`BBox2`](geojson.md#bbox2)

the bounding box around the array of positions

##### Throws

Error when positions.length === 0

#### Call Signature

> **bboxFromPositions**(`positions`): [`BBox3`](geojson.md#bbox3)

##### Parameters

| Parameter   | Type                                  | Description           |
| ----------- | ------------------------------------- | --------------------- |
| `positions` | [`Position3`](geojson.md#position3)[] | an array of positions |

##### Returns

[`BBox3`](geojson.md#bbox3)

the bounding box around the array of positions

##### Throws

Error when positions.length === 0

#### Call Signature

> **bboxFromPositions**(`positions`): [`BBox`](geojson.md#bbox-7)

##### Parameters

| Parameter   | Type                                | Description           |
| ----------- | ----------------------------------- | --------------------- |
| `positions` | [`Position`](geojson.md#position)[] | an array of positions |

##### Returns

[`BBox`](geojson.md#bbox-7)

the bounding box around the array of positions

##### Throws

Error when positions.length === 0

---

### bboxFromPositionsUnwrapped()

#### Call Signature

> **bboxFromPositionsUnwrapped**(`positions`): [`BBox2`](geojson.md#bbox2)

##### Parameters

| Parameter   | Type                                  |
| ----------- | ------------------------------------- |
| `positions` | [`Position2`](geojson.md#position2)[] |

##### Returns

[`BBox2`](geojson.md#bbox2)

#### Call Signature

> **bboxFromPositionsUnwrapped**(`positions`): [`BBox3`](geojson.md#bbox3)

##### Parameters

| Parameter   | Type                                  |
| ----------- | ------------------------------------- |
| `positions` | [`Position3`](geojson.md#position3)[] |

##### Returns

[`BBox3`](geojson.md#bbox3)

#### Call Signature

> **bboxFromPositionsUnwrapped**(`positions`): [`BBox`](geojson.md#bbox-7)

##### Parameters

| Parameter   | Type                                |
| ----------- | ----------------------------------- |
| `positions` | [`Position`](geojson.md#position)[] |

##### Returns

[`BBox`](geojson.md#bbox-7)

---

### bboxInBBox()

> **bboxInBBox**(`b1`, `b2`): `boolean`

Checks if two bounding boxes overlap.

#### Parameters

| Parameter | Type                        | Description              |
| --------- | --------------------------- | ------------------------ |
| `b1`      | [`BBox`](geojson.md#bbox-7) | The first bounding box.  |
| `b2`      | [`BBox`](geojson.md#bbox-7) | The second bounding box. |

#### Returns

`boolean`

- Returns true if the bboxes overlap, otherwise false.

---

### copyCoordinates()

> **copyCoordinates**\<`T`\>(`coords`): `T`

#### Type Parameters

| Type Parameter                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `T` _extends_ [`Position`](geojson.md#position) \| [`Position`](geojson.md#position)[] \| [`Position`](geojson.md#position)[] \| [`Position`](geojson.md#position)[][] \| [`Position`](geojson.md#position)[][] \| [`Position`](geojson.md#position)[][][] \| [`Position`](geojson.md#position)[] |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `coords`  | `T`  |

#### Returns

`T`

---

### cutAreaGeometry()

#### Call Signature

> **cutAreaGeometry**(`g`): [`Circle`](geojson.md#circle)

Cuts an AreaGeometry on the antimeridian

##### Parameters

| Parameter | Type                          | Description             |
| --------- | ----------------------------- | ----------------------- |
| `g`       | [`Circle`](geojson.md#circle) | the AreaGeometry to cut |

##### Returns

[`Circle`](geojson.md#circle)

the cut AreaGeometry

#### Call Signature

> **cutAreaGeometry**(`g`): [`MultiCircle`](geojson.md#multicircle)

Cuts an AreaGeometry on the antimeridian

##### Parameters

| Parameter | Type                                    | Description             |
| --------- | --------------------------------------- | ----------------------- |
| `g`       | [`MultiCircle`](geojson.md#multicircle) | the AreaGeometry to cut |

##### Returns

[`MultiCircle`](geojson.md#multicircle)

the cut AreaGeometry

#### Call Signature

> **cutAreaGeometry**(`g`): [`Polygon`](geojson.md#polygon) \| [`MultiPolygon`](geojson.md#multipolygon)

Cuts an AreaGeometry on the antimeridian

##### Parameters

| Parameter | Type                                                                         | Description             |
| --------- | ---------------------------------------------------------------------------- | ----------------------- |
| `g`       | [`Polygon`](geojson.md#polygon) \| [`MultiPolygon`](geojson.md#multipolygon) | the AreaGeometry to cut |

##### Returns

[`Polygon`](geojson.md#polygon) \| [`MultiPolygon`](geojson.md#multipolygon)

the cut AreaGeometry

---

### cutLineGeometry()

> **cutLineGeometry**(`g`): [`LineObject`](geojson.md#lineobject)

Cuts a LineGeometry on the antimeridian

#### Parameters

| Parameter | Type                                  | Description             |
| --------- | ------------------------------------- | ----------------------- |
| `g`       | [`LineObject`](geojson.md#lineobject) | the LineGeometry to cut |

#### Returns

[`LineObject`](geojson.md#lineobject)

the cut LineGeometry

---

### getPositionsForCircle()

> **getPositionsForCircle**(`point`, `radius`): [`Position`](geojson.md#position)[]

Computes positions needed to find bounding box of a PointCircle.

#### Parameters

| Parameter | Type                              | Description           |
| --------- | --------------------------------- | --------------------- |
| `point`   | [`Position`](geojson.md#position) | A position.           |
| `radius`  | `number`                          | The radius in meters. |

#### Returns

[`Position`](geojson.md#position)[]

- An array with four positions [top,right,bottom,left].

---

### intersectPolygons()

> **intersectPolygons**(`polygons1`, `polygons2`): [`Position2`](geojson.md#position2)[][][]

Assumes that `polygons` consists of two sets of non-overlapping polygon(s).

#### Parameters

| Parameter   | Type                                    |
| ----------- | --------------------------------------- |
| `polygons1` | [`Position`](geojson.md#position)[][][] |
| `polygons2` | [`Position`](geojson.md#position)[][][] |

#### Returns

[`Position2`](geojson.md#position2)[][][]

the intersect of these two sets.

---

### lengthOfLineString()

> **lengthOfLineString**(`ls`): `number`

Computes the approximate length of a LineString, where each segment is
of type plate carrée.

#### Parameters

| Parameter | Type                                | Description                 |
| --------- | ----------------------------------- | --------------------------- |
| `ls`      | [`Position`](geojson.md#position)[] | Coordinates of a LineString |

#### Returns

`number`

the length of the LineString in meters.

---

### longitudeCenter()

> **longitudeCenter**(`a`, `b`, `norm`): `number`

#### Parameters

| Parameter | Type     | Default value | Description            |
| --------- | -------- | ------------- | ---------------------- |
| `a`       | `number` | `undefined`   | the smallest longitude |
| `b`       | `number` | `undefined`   | the largest longitude  |
| `norm`    | `number` | `360.0`       | the normalizing factor |

#### Returns

`number`

the midpoint of the longitudes `[a, b]` in `[-norm/2, norm/2]`

---

### longitudeDistance()

> **longitudeDistance**(`a`, `b`, `norm`): `number`

#### Parameters

| Parameter | Type     | Default value | Description            |
| --------- | -------- | ------------- | ---------------------- |
| `a`       | `number` | `undefined`   | the smallest longitude |
| `b`       | `number` | `undefined`   | the largest longitude  |
| `norm`    | `number` | `360.0`       | the normalizing factor |

#### Returns

`number`

the distance in normalized longitudes on range [a, b]

---

### midpoint()

> **midpoint**(`p1`, `p2`): [`Position2`](geojson.md#position2)

#### Parameters

| Parameter | Type                                |
| --------- | ----------------------------------- |
| `p1`      | [`Position2`](geojson.md#position2) |
| `p2`      | [`Position2`](geojson.md#position2) |

#### Returns

[`Position2`](geojson.md#position2)

---

### midpointRaw()

> **midpointRaw**(`p1`, `p2`): [`Position2`](geojson.md#position2)

#### Parameters

| Parameter | Type                                |
| --------- | ----------------------------------- |
| `p1`      | [`Position2`](geojson.md#position2) |
| `p2`      | [`Position2`](geojson.md#position2) |

#### Returns

[`Position2`](geojson.md#position2)

---

### moveCoordsAroundEarth()

> **moveCoordsAroundEarth**(`coords`): [`Position`](geojson.md#position)[]

Moves rings that starts on the west side of the meridian (-180 -- 0) to the positive counterpart (180--360)

#### Parameters

| Parameter | Type                                |
| --------- | ----------------------------------- |
| `coords`  | [`Position`](geojson.md#position)[] |

#### Returns

[`Position`](geojson.md#position)[]

---

### normalizeLongitude()

> **normalizeLongitude**(`p`, `norm`): `number`

#### Parameters

| Parameter | Type     | Default value | Description                |
| --------- | -------- | ------------- | -------------------------- |
| `p`       | `number` | `undefined`   | the longitude to normalize |
| `norm`    | `number` | `360.0`       | the normalizing factor     |

#### Returns

`number`

p normalized to [-norm/2, norm/2]

---

### pointInMultiPolygonPosition()

> **pointInMultiPolygonPosition**(`point`, `polygons`): `boolean`

Checks if a point is in a MultiPolygon.
Note: Not for Polygon.

#### Parameters

| Parameter  | Type                                    | Description                                 |
| ---------- | --------------------------------------- | ------------------------------------------- |
| `point`    | [`Position`](geojson.md#position)       | Coordinates [lon,lat] of a point.           |
| `polygons` | [`Position`](geojson.md#position)[][][] | Coordinates of a MultiPolygon, not Polygon. |

#### Returns

`boolean`

`true` if point is in polygon.

---

### pointInSinglePolygonPosition()

> **pointInSinglePolygonPosition**(`point`, `polygon`): `boolean`

Checks if a point is in a Polygon.
Note: Not for MultiPolygon.

#### Parameters

| Parameter | Type                                  | Description                                 |
| --------- | ------------------------------------- | ------------------------------------------- |
| `point`   | [`Position`](geojson.md#position)     | Coordinates [lon,lat] of a point.           |
| `polygon` | [`Position`](geojson.md#position)[][] | Coordinates of a Polygon, not MultiPolygon. |

#### Returns

`boolean`

`true` if point is in polygon.

---

### rerollPolygons()

> **rerollPolygons**(`polygons`): [`Position2`](geojson.md#position2)[][][]

An unrolled polygon is a polygon which may exist outside the boundaries of normal earth
(-180, 180), as if the earth(s) was unrolled on a sheet of paper.

This function takes polygons with unrolled coordinates and, rolls them into (-180, 180). The
function assumes that no polygon exists solely on the left earth (-540, -180), or the right
earth, (180, 540), but that the following polygons may exist:

- overlapping -180,
- solely in normal earth (-180, 180),
- overlapping 180.

#### Parameters

| Parameter  | Type                                      |
| ---------- | ----------------------------------------- |
| `polygons` | [`Position2`](geojson.md#position2)[][][] |

#### Returns

[`Position2`](geojson.md#position2)[][][]

---

### ringToSegments()

> **ringToSegments**(`polygon`): [`Segment`](#segment)[]

#### Parameters

| Parameter | Type                                |
| --------- | ----------------------------------- |
| `polygon` | [`Position`](geojson.md#position)[] |

#### Returns

[`Segment`](#segment)[]

---

### segmentsToPolygon()

> **segmentsToPolygon**(`segments`): [`Position2`](geojson.md#position2)[]

#### Parameters

| Parameter  | Type                    |
| ---------- | ----------------------- |
| `segments` | [`Segment`](#segment)[] |

#### Returns

[`Position2`](geojson.md#position2)[]

---

### unionOfBBoxes()

> **unionOfBBoxes**(`bboxes`): [`BBox`](geojson.md#bbox-7)

#### Parameters

| Parameter | Type                          | Description        |
| --------- | ----------------------------- | ------------------ |
| `bboxes`  | [`BBox`](geojson.md#bbox-7)[] | an array of bboxes |

#### Returns

[`BBox`](geojson.md#bbox-7)

the bounding box around the array of bboxes

#### Throws

Error when bboxes.length === 0
