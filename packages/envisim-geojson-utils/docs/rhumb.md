[**@envisim/geojson-utils**](README.md)

---

[@envisim/geojson-utils](README.md) / rhumb

# rhumb

## Functions

### areaOfRing()

> **areaOfRing**(`ring`): `number`

Computes the area of a rhumb polygon ring

#### Parameters

| Parameter | Type                                | Description |
| --------- | ----------------------------------- | ----------- |
| `ring`    | [`Position`](geojson.md#position)[] |             |

#### Returns

`number`

the area in square meters.

---

### destination()

> **destination**(`origin`, `dist`, `azimuth`): [`Position2`](geojson.md#position2)

Computes the destination point on a rhumb line given a point,
a distance and an azimuth.

#### Parameters

| Parameter | Type                              | Description                                      |
| --------- | --------------------------------- | ------------------------------------------------ |
| `origin`  | [`Position`](geojson.md#position) | point coordinates [lon,lat].                     |
| `dist`    | `number`                          | the distance in meters.                          |
| `azimuth` | `number`                          | azimuth (angle) clockwise from north in degrees. |

#### Returns

[`Position2`](geojson.md#position2)

the coordinates [lon,lat] of the destination point.

---

### distance()

> **distance**(`p1`, `p2`): `number`

Computes the distance in meters along a rhumb line between two point coordinates.

#### Parameters

| Parameter | Type                              | Description                  |
| --------- | --------------------------------- | ---------------------------- |
| `p1`      | [`Position`](geojson.md#position) | point coordinates [lon,lat]. |
| `p2`      | [`Position`](geojson.md#position) | point coordinates [lon,lat]. |

#### Returns

`number`

the distance in meters.

---

### forwardAzimuth()

> **forwardAzimuth**(`p1`, `p2`): `number`

Computes the forward azimuth (angle from north) from the first point
to the second point for a rhumb line between the points.
The azimuth takes values in the range -180 to +180.

#### Parameters

| Parameter | Type                              | Description                                   |
| --------- | --------------------------------- | --------------------------------------------- |
| `p1`      | [`Position`](geojson.md#position) | point coordinates [lon,lat] for first point.  |
| `p2`      | [`Position`](geojson.md#position) | point coordinates [lon,lat] for second point. |

#### Returns

`number`

the forward azimuth in degrees.

---

### intermediate()

> **intermediate**(`p1`, `p2`, `fraction`): [`Position2`](geojson.md#position2)

Computes an intermediate point on a rhumb line given a start point,
an end point and the fraction of the distance.

#### Parameters

| Parameter  | Type                              | Description                                  |
| ---------- | --------------------------------- | -------------------------------------------- |
| `p1`       | [`Position`](geojson.md#position) | point coordinates [lon,lat] for start point. |
| `p2`       | [`Position`](geojson.md#position) | point coordinates [lon,lat] for end point.   |
| `fraction` | `number`                          | the fraction of distance between the points. |

#### Returns

[`Position2`](geojson.md#position2)

the coordinates [lon,lat] of the intermediate point.

---

### plateCarreeAreaOfRing()

> **plateCarreeAreaOfRing**(`ring`): `number`

Computes the area of a polygon ring where the segments are
defined as [lon1 + t * (lon2 - lon1), lat1 + t * (lat2 - lat1)], for
0 <= t <= 1.

#### Parameters

| Parameter | Type                                | Description |
| --------- | ----------------------------------- | ----------- |
| `ring`    | [`Position`](geojson.md#position)[] |             |

#### Returns

`number`

the area in square meters.
