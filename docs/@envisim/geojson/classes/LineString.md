[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / LineString

# Class: LineString

## theme_extends

- `AbstractLineObject`\<`GJ.LineString`\>

## Implements

- `LineString`

## Constructors

### Constructor

> **new LineString**(`obj`, `shallow`): `LineString`

#### Parameters

| Parameter | theme_type                                | theme_default_value |
| --------- | ----------------------------------------- | ------------------- |
| `obj`     | `OptionalParam`\<`LineString`, `"type"`\> | `undefined`         |
| `shallow` | `boolean`                                 | `true`              |

#### Returns

`LineString`

#### Overrides

`AbstractLineObject<GJ.LineString>.constructor`

## Properties

| Property                               | theme_modifier | theme_type     |
| -------------------------------------- | -------------- | -------------- |
| <a id="bbox"></a> `bbox?`              | `public`       | `BBox`         |
| <a id="coordinates"></a> `coordinates` | `public`       | `Position`[]   |
| <a id="type"></a> `type`               | `readonly`     | `"LineString"` |

## Methods

### buffer()

> **buffer**(`options`): `null` \| [`Polygon`](Polygon.md) \| [`MultiPolygon`](MultiPolygon.md)

#### Parameters

| Parameter | theme_type      |
| --------- | --------------- |
| `options` | `BufferOptions` |

#### Returns

`null` \| [`Polygon`](Polygon.md) \| [`MultiPolygon`](MultiPolygon.md)

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

`AbstractLineObject.centroid`

---

### copy()

> **copy**(`shallow`): `LineString`

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

#### Returns

`LineString`

#### Overrides

`AbstractLineObject.copy`

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

`AbstractLineObject.distanceToPosition`

---

### geometricPrimitive()

> **geometricPrimitive**(): `"line"`

#### Returns

`"line"`

#### Inherited from

`AbstractLineObject.geometricPrimitive`

---

### getBBox()

> **getBBox**(): `BBox`

#### Returns

`BBox`

#### Inherited from

`AbstractLineObject.getBBox`

---

### getCoordinateArray()

> **getCoordinateArray**(): `Position`[][]

#### Returns

`Position`[][]

#### Overrides

`AbstractLineObject.getCoordinateArray`

---

### isArea()

> **isArea**(): `this is AreaObject`

#### Returns

`this is AreaObject`

#### Inherited from

`AbstractLineObject.isArea`

---

### isLine()

> **isLine**(): `this is LineObject`

#### Returns

`this is LineObject`

#### Inherited from

`AbstractLineObject.isLine`

---

### isPoint()

> **isPoint**(): `this is PointObject`

#### Returns

`this is PointObject`

#### Inherited from

`AbstractLineObject.isPoint`

---

### length()

> **length**(): `number`

#### Returns

`number`

#### Overrides

`AbstractLineObject.length`

---

### measure()

> **measure**(): `number`

#### Returns

`number`

#### Inherited from

`AbstractLineObject.measure`

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

`AbstractLineObject.pointInBBox`

---

### setBBox()

> **setBBox**(): `BBox`

#### Returns

`BBox`

#### Overrides

`AbstractLineObject.setBBox`

---

### size()

> **size**(): `number`

#### Returns

`number`

#### Inherited from

`AbstractLineObject.size`

---

### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is LineString`

#### Parameters

| Parameter | theme_type | theme_default_value     |
| --------- | ---------- | ----------------------- |
| `obj`     | `unknown`  | `undefined`             |
| `msg`     | `string`   | `"Expected LineString"` |

#### Returns

`asserts obj is LineString`

---

### create()

> `static` **create**(`coordinates`, `shallow`): `LineString`

#### Parameters

| Parameter     | theme_type   | theme_default_value |
| ------------- | ------------ | ------------------- |
| `coordinates` | `Position`[] | `undefined`         |
| `shallow`     | `boolean`    | `true`              |

#### Returns

`LineString`

---

### isObject()

> `static` **isObject**(`obj`): `obj is LineString`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

#### Returns

`obj is LineString`
