[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson-utils](../README.md) / [](../README.md) / Segment

# Class: Segment

## Constructors

### Constructor

> **new Segment**(`p1`, `p2`): `Segment`

#### Parameters

| Parameter | theme_type                                        |
| --------- | ------------------------------------------------- |
| `p1`      | [`Position`](../geojson/type-aliases/Position.md) |
| `p2`      | [`Position`](../geojson/type-aliases/Position.md) |

#### Returns

`Segment`

## Properties

| Property                   | theme_type                                          |
| -------------------------- | --------------------------------------------------- |
| <a id="delta"></a> `delta` | [`Position2`](../geojson/type-aliases/Position2.md) |
| <a id="p1"></a> `p1`       | [`Position2`](../geojson/type-aliases/Position2.md) |
| <a id="p2"></a> `p2`       | [`Position2`](../geojson/type-aliases/Position2.md) |

## Methods

### buffer()

> **buffer**(`distance`): `void`

#### Parameters

| Parameter  | theme_type |
| ---------- | ---------- |
| `distance` | `number`   |

#### Returns

`void`

---

### crossProduct()

> **crossProduct**(`segment`): `number`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `segment` | `Segment`  |

#### Returns

`number`

---

### distanceToPosition()

> **distanceToPosition**(`position`): `number`

Distance from a position to the segment.
Note that this is not intended to be used for very long platé carree segments.
This function uses the azimuthal equidistant projection with position as reference point.

#### Parameters

| Parameter  | theme_type                                        |
| ---------- | ------------------------------------------------- |
| `position` | [`Position`](../geojson/type-aliases/Position.md) |

#### Returns

`number`

the distance from the position to the segment

---

### end()

> **end**(): [`Position2`](../geojson/type-aliases/Position2.md)

#### Returns

[`Position2`](../geojson/type-aliases/Position2.md)

---

### intersect()

> **intersect**(`seg`): `null` \| [`Position2`](../geojson/type-aliases/Position2.md)

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `seg`     | `Segment`  |

#### Returns

`null` \| [`Position2`](../geojson/type-aliases/Position2.md)

---

### intersectByPositions()

> **intersectByPositions**(`p1`, `p2`): `null` \| [`Position2`](../geojson/type-aliases/Position2.md)

#### Parameters

| Parameter | theme_type                                        |
| --------- | ------------------------------------------------- |
| `p1`      | [`Position`](../geojson/type-aliases/Position.md) |
| `p2`      | [`Position`](../geojson/type-aliases/Position.md) |

#### Returns

`null` \| [`Position2`](../geojson/type-aliases/Position2.md)

---

### isVector()

> **isVector**(): `boolean`

#### Returns

`boolean`

---

### isVertical()

> **isVertical**(): `boolean`

#### Returns

`boolean`

---

### leftMost()

> **leftMost**(): [`Position2`](../geojson/type-aliases/Position2.md)

#### Returns

[`Position2`](../geojson/type-aliases/Position2.md)

---

### parametricIntersect()

> **parametricIntersect**(`segment`, `includeInvalid`): `null` \| \[`number`, `number`\]

#### Parameters

| Parameter        | theme_type | theme_default_value |
| ---------------- | ---------- | ------------------- |
| `segment`        | `Segment`  | `undefined`         |
| `includeInvalid` | `boolean`  | `true`              |

#### Returns

`null` \| \[`number`, `number`\]

---

### position()

> **position**(`param`): [`Position2`](../geojson/type-aliases/Position2.md)

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `param`   | `number`   |

#### Returns

[`Position2`](../geojson/type-aliases/Position2.md)

---

### rightDistanceOfPoint()

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

#### Parameters

| Parameter | theme_type                                        |
| --------- | ------------------------------------------------- |
| `point`   | [`Position`](../geojson/type-aliases/Position.md) |

#### Returns

`null` \| `number`

`null` or a non-negative number

---

### rightMost()

> **rightMost**(): [`Position2`](../geojson/type-aliases/Position2.md)

#### Returns

[`Position2`](../geojson/type-aliases/Position2.md)

---

### start()

> **start**(): [`Position2`](../geojson/type-aliases/Position2.md)

#### Returns

[`Position2`](../geojson/type-aliases/Position2.md)

---

### checkParameter()

> `static` **checkParameter**(`param`): `boolean`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `param`   | `number`   |

#### Returns

`boolean`
