[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geojson-utils](README.md) / geodesic

# geodesic

## Functions

### areaOfRing()

> **areaOfRing**(`coords`): `number`

Computes the area of a polygon ring where the segments are the shortest
(geodesic) paths between the points.

#### Parameters

| Parameter | Type                                | Description                    |
| --------- | ----------------------------------- | ------------------------------ |
| `coords`  | [`Position`](geojson.md#position)[] | coordinates of a polygon ring. |

#### Returns

`number`

the area in square meters.

---

### destination()

> **destination**(`point`, `dist`, `azimuth`): [`Position2`](geojson.md#position2)

Computes the destination point on a geodesic path given a point,
a distance and an azimuth.

#### Parameters

| Parameter | Type                              | Description                                      |
| --------- | --------------------------------- | ------------------------------------------------ |
| `point`   | [`Position`](geojson.md#position) | point coordinates [lon,lat].                     |
| `dist`    | `number`                          | the distance in meters.                          |
| `azimuth` | `number`                          | azimuth (angle) clockwise from north in degrees. |

#### Returns

[`Position2`](geojson.md#position2)

the coordinates [lon,lat] of the destination point.

---

### destinationUnrolled()

> **destinationUnrolled**(`point`, `dist`, `azimuth`): [`Position2`](geojson.md#position2)

Computes the destination point on a geodesic path given a point,
a distance and an azimuth.

#### Parameters

| Parameter | Type                              | Description                                      |
| --------- | --------------------------------- | ------------------------------------------------ |
| `point`   | [`Position`](geojson.md#position) | point coordinates [lon,lat].                     |
| `dist`    | `number`                          | the distance in meters.                          |
| `azimuth` | `number`                          | azimuth (angle) clockwise from north in degrees. |

#### Returns

[`Position2`](geojson.md#position2)

the coordinates [lon,lat] of the destination point.

---

### distance()

> **distance**(`p1`, `p2`): `number`

Computes the shortest distance in meters between two point coordinates.

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
to the second point for a geodesic path between the points.
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

### forwardAzimuthDistance()

> **forwardAzimuthDistance**(`p1`, `p2`): \[`number`, `number`\]

Computes the forward azimuth (angle from north) from the first point
to the second point for a geodesic path between the points.
The azimuth takes values in the range -180 to +180.

#### Parameters

| Parameter | Type                              | Description                                   |
| --------- | --------------------------------- | --------------------------------------------- |
| `p1`      | [`Position`](geojson.md#position) | point coordinates [lon,lat] for first point.  |
| `p2`      | [`Position`](geojson.md#position) | point coordinates [lon,lat] for second point. |

#### Returns

\[`number`, `number`\]

the forward azimuth in degrees.

---

### intermediate()

> **intermediate**(`p1`, `p2`, `fraction`): [`Position2`](geojson.md#position2)

Computes an intermediate point on a geodesic path given a start point,
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
