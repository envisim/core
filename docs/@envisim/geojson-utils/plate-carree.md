[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geojson-utils](README.md) / plate-carree

# plate-carree

## Functions

### areaOfRing()

> **areaOfRing**(`ring`): `number`

Computes the area of a polygon ring where the segments are
defined as [lon1 + t * (lon2 - lon1), lat1 + t * (lat2 - lat1)], for
0 <= t <= 1.

#### Parameters

| Parameter | Type                                |
| --------- | ----------------------------------- |
| `ring`    | [`Position`](geojson.md#position)[] |

#### Returns

`number`

the area in square meters.

---

### distance()

> **distance**(`p1`, `p2`): `number`

Computes the plate carrée distance between two points

#### Parameters

| Parameter | Type                              | Description      |
| --------- | --------------------------------- | ---------------- |
| `p1`      | [`Position`](geojson.md#position) | the first point  |
| `p2`      | [`Position`](geojson.md#position) | the second point |

#### Returns

`number`

the distance in meters

---

### intermediate()

> **intermediate**(`p1`, `p2`, `fraction`): [`Position2`](geojson.md#position2)

Computes a position on the segment at a fraction of the length of the
segment, where the segment is of type plate carrée.

#### Parameters

| Parameter  | Type                              | Description                |
| ---------- | --------------------------------- | -------------------------- |
| `p1`       | [`Position`](geojson.md#position) | start point [lon,lat]      |
| `p2`       | [`Position`](geojson.md#position) | end point [lon,lat]        |
| `fraction` | `number`                          | the fraction of the length |

#### Returns

[`Position2`](geojson.md#position2)

the position on the segment
