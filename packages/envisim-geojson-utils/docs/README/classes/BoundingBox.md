[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [](../../README.md) / BoundingBox

# Class: BoundingBox

Defined in: bbox.ts:6

## Constructors

### Constructor

> **new BoundingBox**(): `BoundingBox`

#### Returns

`BoundingBox`

## Methods

### altitudeRange()

> `static` **altitudeRange**(`bbox`): \[`number`, `number`\]

Defined in: bbox.ts:31

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

#### Returns

\[`number`, `number`\]

---

### center()

> `static` **center**(`bbox`): [`Position2`](../../geojson/type-aliases/Position2.md)

Defined in: bbox.ts:61

Computes the parametric center (in longitude and latitude only) of a bounding box

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

a bounding box

#### Returns

[`Position2`](../../geojson/type-aliases/Position2.md)

the center of the bounding box

---

### includesAntimeridian()

> `static` **includesAntimeridian**(`bbox`): `boolean`

Defined in: bbox.ts:65

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

#### Returns

`boolean`

---

### includesPoint()

> `static` **includesPoint**(`bbox`, `point`): `boolean`

Defined in: bbox.ts:77

Checks if position is in bbox.
Considers the altitude only if both have it

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

Bounding box.

##### point

[`Position`](../../geojson/type-aliases/Position.md)

Point coordinates.

#### Returns

`boolean`

true if point is in bbox, otherwise false.

---

### latitudeDiff()

> `static` **latitudeDiff**(`bbox`): `number`

Defined in: bbox.ts:43

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

#### Returns

`number`

---

### latitudeRange()

> `static` **latitudeRange**(`bbox`): \[`number`, `number`\]

Defined in: bbox.ts:22

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

#### Returns

\[`number`, `number`\]

---

### longitudeDiff()

> `static` **longitudeDiff**(`bbox`): `number`

Defined in: bbox.ts:40

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

#### Returns

`number`

---

### longitudeRange()

> `static` **longitudeRange**(`bbox`): \[`number`, `number`\]

Defined in: bbox.ts:13

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

#### Returns

\[`number`, `number`\]

---

### max2()

> `static` **max2**(`bbox`): [`Position2`](../../geojson/type-aliases/Position2.md)

Defined in: bbox.ts:10

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

#### Returns

[`Position2`](../../geojson/type-aliases/Position2.md)

---

### maxAltitude()

> `static` **maxAltitude**(`bbox`): `number`

Defined in: bbox.ts:37

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

#### Returns

`number`

---

### maxLatitude()

> `static` **maxLatitude**(`bbox`): `number`

Defined in: bbox.ts:28

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

#### Returns

`number`

---

### maxLongitude()

> `static` **maxLongitude**(`bbox`): `number`

Defined in: bbox.ts:19

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

#### Returns

`number`

---

### min2()

> `static` **min2**(`bbox`): [`Position2`](../../geojson/type-aliases/Position2.md)

Defined in: bbox.ts:7

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

#### Returns

[`Position2`](../../geojson/type-aliases/Position2.md)

---

### minAltitude()

> `static` **minAltitude**(`bbox`): `number`

Defined in: bbox.ts:34

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

#### Returns

`number`

---

### minLatitude()

> `static` **minLatitude**(`bbox`): `number`

Defined in: bbox.ts:25

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

#### Returns

`number`

---

### minLongitude()

> `static` **minLongitude**(`bbox`): `number`

Defined in: bbox.ts:16

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

#### Returns

`number`

---

### removeAltitude()

> `static` **removeAltitude**(`bbox`): [`BBox2`](../../geojson/type-aliases/BBox2.md)

Defined in: bbox.ts:52

Removes altitiude from the bounding box

#### Parameters

##### bbox

[`BBox`](../../geojson/type-aliases/BBox.md)

a bounding box.

#### Returns

[`BBox2`](../../geojson/type-aliases/BBox2.md)

a copy of the bounding box, with altitude removed (i.e. with length 4).
