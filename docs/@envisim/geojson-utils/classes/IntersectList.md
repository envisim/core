[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson-utils](../README.md) / [](../README.md) / IntersectList

# Class: IntersectList

A class for calulating and keeping track of the intersection points of segments.

## Constructors

### Constructor

> **new IntersectList**(`segments`, `breaks`): `IntersectList`

Constructs the list by finding intersections through sweepline search

#### Parameters

| Parameter  | theme_type                |
| ---------- | ------------------------- |
| `segments` | [`Segment`](Segment.md)[] |
| `breaks`   | `number`[]                |

#### Returns

`IntersectList`

## Properties

| Property                             | theme_type                | theme_default_value | theme_description                                                                   |
| ------------------------------------ | ------------------------- | ------------------- | ----------------------------------------------------------------------------------- |
| <a id="list"></a> `list`             | `IntersectPoint`[]        | `[]`                | An array of intersection points                                                     |
| <a id="segmentmap"></a> `segmentMap` | `number`[][]              | `undefined`         | A map from segment indices to the intersection points where the segment is present. |
| <a id="segments"></a> `segments`     | [`Segment`](Segment.md)[] | `undefined`         | The array of underlying segments                                                    |

## Methods

### addIntersect()

> **addIntersect**(`segments`, `params`, `position`): `void`

Adds a new intersection point

#### Parameters

| Parameter  | theme_type                                          |
| ---------- | --------------------------------------------------- |
| `segments` | \[`number`, `number`\]                              |
| `params`   | \[`number`, `number`\]                              |
| `position` | [`Position2`](../geojson/type-aliases/Position2.md) |

#### Returns

`void`

---

### appendIntersect()

> **appendIntersect**(`idx`, `segment`, `param`): `void`

Adds a segments intersection details to an intersection point

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `idx`     | `number`   |
| `segment` | `number`   |
| `param`   | `number`   |

#### Returns

`void`

---

### extremePointOfIntersectionRing()

> **extremePointOfIntersectionRing**(`ring`): \[`number`, `number`\]

Returns the list idx of the extreme points in a ring

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `ring`    | `number`[] |

#### Returns

\[`number`, `number`\]

---

### getNextIntersectOfSegment()

> **getNextIntersectOfSegment**(`start`): `null` \| `number`

Finds the closest intersect along a segment, further along the segment (larger param).

#### Parameters

| Parameter | theme_type         |
| --------- | ------------------ |
| `start`   | `IntersectSegment` |

#### Returns

`null` \| `number`

---

### getRightmostSegment()

> **getRightmostSegment**(`start`, `intpointIdx`): `IntersectSegment`

Finds the rightmost segment in an intersection, relative to the travelled segment. The
intersect is guaranteed to have an unvisited segment.

#### Parameters

| Parameter     | theme_type         |
| ------------- | ------------------ |
| `start`       | `IntersectSegment` |
| `intpointIdx` | `number`           |

#### Returns

`IntersectSegment`

---

### getUnvisitedIntersectAndSegment()

> **getUnvisitedIntersectAndSegment**(): `IntersectIndices`

Gives the first unvisited segment going out from an intersection point.

#### Returns

`IntersectIndices`

---

### intersectionRingIsPositive()

> **intersectionRingIsPositive**(`ring`, `min`): `boolean`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `ring`    | `number`[] |
| `min`     | `number`   |

#### Returns

`boolean`

---

### intersectionRingsToOrderedSegmentRings()

> **intersectionRingsToOrderedSegmentRings**(`ringList`, `parentIsPositive`): \[[`Segment`](Segment.md)[][], `number`[]\]

Orders the intersection rings (defined by intersection indices), by their parent-children
relationships, and transforms the intersection rings to segment rings.
Also filters away unnecessary rings, i.e. rings which are redundant (same direction as parent),
and nonsensical rings (topmost rings in opposite direciton).

#### Parameters

| Parameter          | theme_type   |
| ------------------ | ------------ |
| `ringList`         | `number`[][] |
| `parentIsPositive` | `boolean`    |

#### Returns

\[[`Segment`](Segment.md)[][], `number`[]\]

---

### intersectionRingToSegmentRing()

> **intersectionRingToSegmentRing**(`ring`): [`Segment`](Segment.md)[]

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `ring`    | `number`[] |

#### Returns

[`Segment`](Segment.md)[]

---

### traceIntersectionRings()

> **traceIntersectionRings**(): `number`[][]

Returns an array of rings, defined gy their intersection indices, by travelling ccw around the
segments.

#### Returns

`number`[][]

---

### tryAppendIntersect()

> **tryAppendIntersect**(`segments`, `params`): `boolean`

Adds an intersection point, if none exists. Returns true if the intersection point already
exists, false otherwise.

#### Parameters

| Parameter  | theme_type             |
| ---------- | ---------------------- |
| `segments` | \[`number`, `number`\] |
| `params`   | \[`number`, `number`\] |

#### Returns

`boolean`
