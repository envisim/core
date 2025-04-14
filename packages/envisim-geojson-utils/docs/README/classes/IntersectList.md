[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [](../../README.md) / IntersectList

# Class: IntersectList

Defined in: class-intersects.ts:11

A class for calulating and keeping track of the intersection points of segments.

## Constructors

### Constructor

> **new IntersectList**(`segments`, `breaks`): `IntersectList`

Defined in: class-intersects.ts:29

Constructs the list by finding intersections through sweepline search

#### Parameters

##### segments

[`Segment`](Segment.md)[]

##### breaks

`number`[] = `...`

#### Returns

`IntersectList`

## Properties

### list

> **list**: `IntersectPoint`[] = `[]`

Defined in: class-intersects.ts:19

An array of intersection points

---

### segmentMap

> **segmentMap**: `number`[][]

Defined in: class-intersects.ts:24

A map from segment indices to the intersection points where the segment is present.

---

### segments

> **segments**: [`Segment`](Segment.md)[]

Defined in: class-intersects.ts:15

The array of underlying segments

## Methods

### addIntersect()

> **addIntersect**(`segments`, `params`, `position`): `void`

Defined in: class-intersects.ts:90

Adds a new intersection point

#### Parameters

##### segments

\[`number`, `number`\]

##### params

\[`number`, `number`\]

##### position

[`Position2`](../../geojson/type-aliases/Position2.md)

#### Returns

`void`

---

### appendIntersect()

> **appendIntersect**(`idx`, `segment`, `param`): `void`

Defined in: class-intersects.ts:102

Adds a segments intersection details to an intersection point

#### Parameters

##### idx

`number`

##### segment

`number`

##### param

`number`

#### Returns

`void`

---

### extremePointOfIntersectionRing()

> **extremePointOfIntersectionRing**(`ring`): \[`number`, `number`\]

Defined in: class-intersects.ts:451

Returns the list idx of the extreme points in a ring

#### Parameters

##### ring

`number`[]

#### Returns

\[`number`, `number`\]

---

### getNextIntersectOfSegment()

> **getNextIntersectOfSegment**(`start`): `null` \| `number`

Defined in: class-intersects.ts:146

Finds the closest intersect along a segment, further along the segment (larger param).

#### Parameters

##### start

`IntersectSegment`

#### Returns

`null` \| `number`

---

### getRightmostSegment()

> **getRightmostSegment**(`start`, `intpointIdx`): `IntersectSegment`

Defined in: class-intersects.ts:167

Finds the rightmost segment in an intersection, relative to the travelled segment. The
intersect is guaranteed to have an unvisited segment.

#### Parameters

##### start

`IntersectSegment`

##### intpointIdx

`number`

#### Returns

`IntersectSegment`

---

### getUnvisitedIntersectAndSegment()

> **getUnvisitedIntersectAndSegment**(): `IntersectIndices`

Defined in: class-intersects.ts:133

Gives the first unvisited segment going out from an intersection point.

#### Returns

`IntersectIndices`

---

### intersectionRingIsPositive()

> **intersectionRingIsPositive**(`ring`, `min`): `boolean`

Defined in: class-intersects.ts:478

#### Parameters

##### ring

`number`[]

##### min

`number` = `...`

#### Returns

`boolean`

---

### intersectionRingsToOrderedSegmentRings()

> **intersectionRingsToOrderedSegmentRings**(`ringList`, `parentIsPositive`): \[[`Segment`](Segment.md)[][], `number`[]\]

Defined in: class-intersects.ts:358

Orders the intersection rings (defined by intersection indices), by their parent-children
relationships, and transforms the intersection rings to segment rings.
Also filters away unnecessary rings, i.e. rings which are redundant (same direction as parent),
and nonsensical rings (topmost rings in opposite direciton).

#### Parameters

##### ringList

`number`[][]

##### parentIsPositive

`boolean`

#### Returns

\[[`Segment`](Segment.md)[][], `number`[]\]

---

### intersectionRingToSegmentRing()

> **intersectionRingToSegmentRing**(`ring`): [`Segment`](Segment.md)[]

Defined in: class-intersects.ts:496

#### Parameters

##### ring

`number`[]

#### Returns

[`Segment`](Segment.md)[]

---

### traceIntersectionRings()

> **traceIntersectionRings**(): `number`[][]

Defined in: class-intersects.ts:305

Returns an array of rings, defined gy their intersection indices, by travelling ccw around the
segments.

#### Returns

`number`[][]

---

### tryAppendIntersect()

> **tryAppendIntersect**(`segments`, `params`): `boolean`

Defined in: class-intersects.ts:112

Adds an intersection point, if none exists. Returns true if the intersection point already
exists, false otherwise.

#### Parameters

##### segments

\[`number`, `number`\]

##### params

\[`number`, `number`\]

#### Returns

`boolean`
