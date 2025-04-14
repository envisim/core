[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [](../../README.md) / Segment

# Class: Segment

Defined in: class-segment.ts:6

## Constructors

### Constructor

> **new Segment**(`p1`, `p2`): `Segment`

Defined in: class-segment.ts:15

#### Parameters

##### p1

[`Position`](../../geojson/type-aliases/Position.md)

##### p2

[`Position`](../../geojson/type-aliases/Position.md)

#### Returns

`Segment`

## Properties

### delta

> **delta**: [`Position2`](../../geojson/type-aliases/Position2.md)

Defined in: class-segment.ts:13

---

### p1

> **p1**: [`Position2`](../../geojson/type-aliases/Position2.md)

Defined in: class-segment.ts:11

---

### p2

> **p2**: [`Position2`](../../geojson/type-aliases/Position2.md)

Defined in: class-segment.ts:12

## Methods

### buffer()

> **buffer**(`distance`): `void`

Defined in: class-segment.ts:155

#### Parameters

##### distance

`number`

#### Returns

`void`

---

### crossProduct()

> **crossProduct**(`segment`): `number`

Defined in: class-segment.ts:55

#### Parameters

##### segment

`Segment`

#### Returns

`number`

---

### distanceToPosition()

> **distanceToPosition**(`position`): `number`

Defined in: class-segment.ts:198

Distance from a position to the segment.
Note that this is not intended to be used for very long platé carree segments.
This function uses the azimuthal equidistant projection with position as reference point.

#### Parameters

##### position

[`Position`](../../geojson/type-aliases/Position.md)

#### Returns

`number`

the distance from the position to the segment

---

### end()

> **end**(): [`Position2`](../../geojson/type-aliases/Position2.md)

Defined in: class-segment.ts:25

#### Returns

[`Position2`](../../geojson/type-aliases/Position2.md)

---

### intersect()

> **intersect**(`seg`): `null` \| [`Position2`](../../geojson/type-aliases/Position2.md)

Defined in: class-segment.ts:43

#### Parameters

##### seg

`Segment`

#### Returns

`null` \| [`Position2`](../../geojson/type-aliases/Position2.md)

---

### intersectByPositions()

> **intersectByPositions**(`p1`, `p2`): `null` \| [`Position2`](../../geojson/type-aliases/Position2.md)

Defined in: class-segment.ts:49

#### Parameters

##### p1

[`Position`](../../geojson/type-aliases/Position.md)

##### p2

[`Position`](../../geojson/type-aliases/Position.md)

#### Returns

`null` \| [`Position2`](../../geojson/type-aliases/Position2.md)

---

### isVector()

> **isVector**(): `boolean`

Defined in: class-segment.ts:33

#### Returns

`boolean`

---

### isVertical()

> **isVertical**(): `boolean`

Defined in: class-segment.ts:29

#### Returns

`boolean`

---

### leftMost()

> **leftMost**(): [`Position2`](../../geojson/type-aliases/Position2.md)

Defined in: class-segment.ts:174

#### Returns

[`Position2`](../../geojson/type-aliases/Position2.md)

---

### parametricIntersect()

> **parametricIntersect**(`segment`, `includeInvalid`): `null` \| \[`number`, `number`\]

Defined in: class-segment.ts:61

#### Parameters

##### segment

`Segment`

##### includeInvalid

`boolean` = `true`

#### Returns

`null` \| \[`number`, `number`\]

---

### position()

> **position**(`param`): [`Position2`](../../geojson/type-aliases/Position2.md)

Defined in: class-segment.ts:37

#### Parameters

##### param

`number`

#### Returns

[`Position2`](../../geojson/type-aliases/Position2.md)

---

### rightDistanceOfPoint()

> **rightDistanceOfPoint**(`point`): `null` \| `number`

Defined in: class-segment.ts:115

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

#### Parameters

##### point

[`Position`](../../geojson/type-aliases/Position.md)

#### Returns

`null` \| `number`

`null` or a non-negative number

---

### rightMost()

> **rightMost**(): [`Position2`](../../geojson/type-aliases/Position2.md)

Defined in: class-segment.ts:183

#### Returns

[`Position2`](../../geojson/type-aliases/Position2.md)

---

### start()

> **start**(): [`Position2`](../../geojson/type-aliases/Position2.md)

Defined in: class-segment.ts:21

#### Returns

[`Position2`](../../geojson/type-aliases/Position2.md)

---

### checkParameter()

> `static` **checkParameter**(`param`): `boolean`

Defined in: class-segment.ts:7

#### Parameters

##### param

`number`

#### Returns

`boolean`
