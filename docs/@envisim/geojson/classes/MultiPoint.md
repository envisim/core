[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / MultiPoint

# Class: MultiPoint

## theme_extends

- `AbstractPointObject`\<`GJ.MultiPoint`\>

## Implements

- `MultiPoint`

## Constructors

### Constructor

> **new MultiPoint**(`obj`, `shallow`): `MultiPoint`

#### Parameters

| Parameter | theme_type                                | theme_default_value |
| --------- | ----------------------------------------- | ------------------- |
| `obj`     | `OptionalParam`\<`MultiPoint`, `"type"`\> | `undefined`         |
| `shallow` | `boolean`                                 | `true`              |

#### Returns

`MultiPoint`

#### Overrides

`AbstractPointObject<GJ.MultiPoint>.constructor`

## Properties

| Property                               | theme_modifier | theme_type     |
| -------------------------------------- | -------------- | -------------- |
| <a id="bbox"></a> `bbox?`              | `public`       | `BBox`         |
| <a id="coordinates"></a> `coordinates` | `public`       | `Position`[]   |
| <a id="type"></a> `type`               | `readonly`     | `"MultiPoint"` |

## Methods

### buffer()

> **buffer**(`options`): `null` \| [`Polygon`](Polygon.md) \| [`MultiPolygon`](MultiPolygon.md) \| [`Circle`](Circle.md) \| [`MultiCircle`](MultiCircle.md)

#### Parameters

| Parameter | theme_type      |
| --------- | --------------- |
| `options` | `BufferOptions` |

#### Returns

`null` \| [`Polygon`](Polygon.md) \| [`MultiPolygon`](MultiPolygon.md) \| [`Circle`](Circle.md) \| [`MultiCircle`](MultiCircle.md)

---

### centroid()

> **centroid**(`iterations`): `Position`

#### Parameters

| Parameter    | theme_type | theme_default_value |
| ------------ | ---------- | ------------------- |
| `iterations` | `number`   | `2`                 |

#### Returns

`Position`

#### Overrides

`AbstractPointObject.centroid`

---

### copy()

> **copy**(`shallow`): `MultiPoint`

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

#### Returns

`MultiPoint`

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

#### Overrides

`AbstractPointObject.size`

---

### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is MultiPoint`

#### Parameters

| Parameter | theme_type | theme_default_value     |
| --------- | ---------- | ----------------------- |
| `obj`     | `unknown`  | `undefined`             |
| `msg`     | `string`   | `"Expected MultiPoint"` |

#### Returns

`asserts obj is MultiPoint`

---

### create()

> `static` **create**(`coordinates`, `shallow`): `MultiPoint`

#### Parameters

| Parameter     | theme_type   | theme_default_value |
| ------------- | ------------ | ------------------- |
| `coordinates` | `Position`[] | `undefined`         |
| `shallow`     | `boolean`    | `true`              |

#### Returns

`MultiPoint`

---

### isObject()

> `static` **isObject**(`obj`): `obj is MultiPoint`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

#### Returns

`obj is MultiPoint`
