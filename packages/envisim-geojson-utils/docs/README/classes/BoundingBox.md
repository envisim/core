[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [](../../README.md) / BoundingBox

# Class: BoundingBox

## Constructors

### Constructor

> **new BoundingBox**(): `BoundingBox`

#### Returns

`BoundingBox`

## Methods

### altitudeRange()

> `static` **altitudeRange**(`bbox`): \[`number`, `number`\]

#### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md) |

#### Returns

\[`number`, `number`\]

---

### center()

> `static` **center**(`bbox`): [`Position2`](../../geojson/type-aliases/Position2.md)

Computes the parametric center (in longitude and latitude only) of a bounding box

#### Parameters

| Parameter | Type                                         | Description    |
| --------- | -------------------------------------------- | -------------- |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md) | a bounding box |

#### Returns

[`Position2`](../../geojson/type-aliases/Position2.md)

the center of the bounding box

---

### includesAntimeridian()

> `static` **includesAntimeridian**(`bbox`): `boolean`

#### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md) |

#### Returns

`boolean`

---

### includesPoint()

> `static` **includesPoint**(`bbox`, `point`): `boolean`

Checks if position is in bbox.
Considers the altitude only if both have it

#### Parameters

| Parameter | Type                                                 | Description        |
| --------- | ---------------------------------------------------- | ------------------ |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md)         | Bounding box.      |
| `point`   | [`Position`](../../geojson/type-aliases/Position.md) | Point coordinates. |

#### Returns

`boolean`

true if point is in bbox, otherwise false.

---

### latitudeDiff()

> `static` **latitudeDiff**(`bbox`): `number`

#### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md) |

#### Returns

`number`

---

### latitudeRange()

> `static` **latitudeRange**(`bbox`): \[`number`, `number`\]

#### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md) |

#### Returns

\[`number`, `number`\]

---

### longitudeDiff()

> `static` **longitudeDiff**(`bbox`): `number`

#### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md) |

#### Returns

`number`

---

### longitudeRange()

> `static` **longitudeRange**(`bbox`): \[`number`, `number`\]

#### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md) |

#### Returns

\[`number`, `number`\]

---

### max2()

> `static` **max2**(`bbox`): [`Position2`](../../geojson/type-aliases/Position2.md)

#### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md) |

#### Returns

[`Position2`](../../geojson/type-aliases/Position2.md)

---

### maxAltitude()

> `static` **maxAltitude**(`bbox`): `number`

#### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md) |

#### Returns

`number`

---

### maxLatitude()

> `static` **maxLatitude**(`bbox`): `number`

#### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md) |

#### Returns

`number`

---

### maxLongitude()

> `static` **maxLongitude**(`bbox`): `number`

#### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md) |

#### Returns

`number`

---

### min2()

> `static` **min2**(`bbox`): [`Position2`](../../geojson/type-aliases/Position2.md)

#### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md) |

#### Returns

[`Position2`](../../geojson/type-aliases/Position2.md)

---

### minAltitude()

> `static` **minAltitude**(`bbox`): `number`

#### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md) |

#### Returns

`number`

---

### minLatitude()

> `static` **minLatitude**(`bbox`): `number`

#### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md) |

#### Returns

`number`

---

### minLongitude()

> `static` **minLongitude**(`bbox`): `number`

#### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md) |

#### Returns

`number`

---

### removeAltitude()

> `static` **removeAltitude**(`bbox`): [`BBox2`](../../geojson/type-aliases/BBox2.md)

Removes altitiude from the bounding box

#### Parameters

| Parameter | Type                                         | Description     |
| --------- | -------------------------------------------- | --------------- |
| `bbox`    | [`BBox`](../../geojson/type-aliases/BBox.md) | a bounding box. |

#### Returns

[`BBox2`](../../geojson/type-aliases/BBox2.md)

a copy of the bounding box, with altitude removed (i.e. with length 4).
