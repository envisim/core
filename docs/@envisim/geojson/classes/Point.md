[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / Point

# Class: Point

## theme_extends

- `AbstractPointObject`\<`GJ.Point`\>

## Implements

- `Point`

## Constructors

### Constructor

> **new Point**(`obj`, `shallow`): `Point`

#### Parameters

| Parameter | theme_type                           | theme_default_value |
| --------- | ------------------------------------ | ------------------- |
| `obj`     | `OptionalParam`\<`Point`, `"type"`\> | `undefined`         |
| `shallow` | `boolean`                            | `true`              |

#### Returns

`Point`

#### Overrides

`AbstractPointObject<GJ.Point>.constructor`

## Properties

| Property                               | theme_modifier | theme_type |
| -------------------------------------- | -------------- | ---------- |
| <a id="bbox"></a> `bbox?`              | `public`       | `BBox`     |
| <a id="coordinates"></a> `coordinates` | `public`       | `Position` |
| <a id="type"></a> `type`               | `readonly`     | `"Point"`  |

## Methods

### buffer()

> **buffer**(`options`): `null` \| [`Circle`](Circle.md)

#### Parameters

| Parameter | theme_type      |
| --------- | --------------- |
| `options` | `BufferOptions` |

#### Returns

`null` \| [`Circle`](Circle.md)

---

### centroid()

> **centroid**(): `Position`

#### Returns

`Position`

#### Overrides

`AbstractPointObject.centroid`

---

### copy()

> **copy**(`shallow`): `Point`

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

#### Returns

`Point`

#### Overrides

`AbstractPointObject.copy`

---

### count()

> **count**(): `number`

#### Returns

`number`

#### Inherited from

`AbstractPointObject.count`

---

### distanceToPosition()

> **distanceToPosition**(`position`): `number`

#### Parameters

| Parameter  | theme_type |
| ---------- | ---------- |
| `position` | `Position` |

#### Returns

`number`

#### Overrides

`AbstractPointObject.distanceToPosition`

---

### geometricPrimitive()

> **geometricPrimitive**(): `"point"`

#### Returns

`"point"`

#### Inherited from

`AbstractPointObject.geometricPrimitive`

---

### getBBox()

> **getBBox**(): `BBox`

#### Returns

`BBox`

#### Inherited from

`AbstractPointObject.getBBox`

---

### getCoordinateArray()

> **getCoordinateArray**(): `Position`[]

#### Returns

`Position`[]

#### Overrides

`AbstractPointObject.getCoordinateArray`

---

### isArea()

> **isArea**(): `this is AreaObject`

#### Returns

`this is AreaObject`

#### Inherited from

`AbstractPointObject.isArea`

---

### isLine()

> **isLine**(): `this is LineObject`

#### Returns

`this is LineObject`

#### Inherited from

`AbstractPointObject.isLine`

---

### isPoint()

> **isPoint**(): `this is PointObject`

#### Returns

`this is PointObject`

#### Inherited from

`AbstractPointObject.isPoint`

---

### measure()

> **measure**(): `number`

#### Returns

`number`

#### Inherited from

`AbstractPointObject.measure`

---

### pointInBBox()

> **pointInBBox**(`point`): `boolean`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `point`   | `Position` |

#### Returns

`boolean`

#### Inherited from

`AbstractPointObject.pointInBBox`

---

### setBBox()

> **setBBox**(): `BBox`

#### Returns

`BBox`

#### Overrides

`AbstractPointObject.setBBox`

---

### size()

> **size**(): `number`

#### Returns

`number`

#### Inherited from

`AbstractPointObject.size`

---

### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is Point`

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `obj`     | `unknown`  | `undefined`         |
| `msg`     | `string`   | `"Expected Point"`  |

#### Returns

`asserts obj is Point`

---

### create()

> `static` **create**(`coordinates`, `shallow`): `Point`

#### Parameters

| Parameter     | theme_type | theme_default_value |
| ------------- | ---------- | ------------------- |
| `coordinates` | `Position` | `undefined`         |
| `shallow`     | `boolean`  | `true`              |

#### Returns

`Point`

---

### isObject()

> `static` **isObject**(`obj`): `obj is Point`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

#### Returns

`obj is Point`
