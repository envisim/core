[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / Polygon

# Class: Polygon

## theme_extends

- `AbstractAreaObject`\<`GJ.Polygon`\>

## Implements

- `Polygon`

## Constructors

### Constructor

> **new Polygon**(`obj`, `shallow`): `Polygon`

#### Parameters

| Parameter | theme_type                             | theme_default_value |
| --------- | -------------------------------------- | ------------------- |
| `obj`     | `OptionalParam`\<`Polygon`, `"type"`\> | `undefined`         |
| `shallow` | `boolean`                              | `true`              |

#### Returns

`Polygon`

#### Overrides

`AbstractAreaObject<GJ.Polygon>.constructor`

## Properties

| Property                               | theme_modifier | theme_type     |
| -------------------------------------- | -------------- | -------------- |
| <a id="bbox"></a> `bbox?`              | `public`       | `BBox`         |
| <a id="coordinates"></a> `coordinates` | `public`       | `Position`[][] |
| <a id="type"></a> `type`               | `readonly`     | `"Polygon"`    |

## Methods

### area()

> **area**(): `number`

#### Returns

`number`

#### Overrides

`AbstractAreaObject.area`

---

### buffer()

> **buffer**(`options`): `null` \| `Polygon` \| [`MultiPolygon`](MultiPolygon.md)

#### Parameters

| Parameter | theme_type      |
| --------- | --------------- |
| `options` | `BufferOptions` |

#### Returns

`null` \| `Polygon` \| [`MultiPolygon`](MultiPolygon.md)

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

`AbstractAreaObject.centroid`

---

### copy()

> **copy**(`shallow`): `Polygon`

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

#### Returns

`Polygon`

#### Overrides

`AbstractAreaObject.copy`

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

`AbstractAreaObject.distanceToPosition`

---

### geometricPrimitive()

> **geometricPrimitive**(): `"area"`

#### Returns

`"area"`

#### Inherited from

`AbstractAreaObject.geometricPrimitive`

---

### getBBox()

> **getBBox**(): `BBox`

#### Returns

`BBox`

#### Inherited from

`AbstractAreaObject.getBBox`

---

### getCoordinateArray()

> **getCoordinateArray**(): `Position`[][][]

#### Returns

`Position`[][][]

#### Overrides

`AbstractAreaObject.getCoordinateArray`

---

### includesPosition()

> **includesPosition**(`position`): `boolean`

#### Parameters

| Parameter  | theme_type |
| ---------- | ---------- |
| `position` | `Position` |

#### Returns

`boolean`

#### Overrides

`AbstractAreaObject.includesPosition`

---

### isArea()

> **isArea**(): `this is AreaObject`

#### Returns

`this is AreaObject`

#### Inherited from

`AbstractAreaObject.isArea`

---

### isLine()

> **isLine**(): `this is LineObject`

#### Returns

`this is LineObject`

#### Inherited from

`AbstractAreaObject.isLine`

---

### isPoint()

> **isPoint**(): `this is PointObject`

#### Returns

`this is PointObject`

#### Inherited from

`AbstractAreaObject.isPoint`

---

### measure()

> **measure**(): `number`

#### Returns

`number`

#### Inherited from

`AbstractAreaObject.measure`

---

### perimeter()

> **perimeter**(): `number`

#### Returns

`number`

#### Overrides

`AbstractAreaObject.perimeter`

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

`AbstractAreaObject.pointInBBox`

---

### setBBox()

> **setBBox**(): `BBox`

#### Returns

`BBox`

#### Overrides

`AbstractAreaObject.setBBox`

---

### size()

> **size**(): `number`

#### Returns

`number`

#### Inherited from

`AbstractAreaObject.size`

---

### toPolygon()

> **toPolygon**(): `Polygon`

#### Returns

`Polygon`

---

### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is Polygon`

#### Parameters

| Parameter | theme_type | theme_default_value  |
| --------- | ---------- | -------------------- |
| `obj`     | `unknown`  | `undefined`          |
| `msg`     | `string`   | `"Expected Polygon"` |

#### Returns

`asserts obj is Polygon`

---

### create()

> `static` **create**(`coordinates`, `shallow`): `Polygon`

#### Parameters

| Parameter     | theme_type     | theme_default_value |
| ------------- | -------------- | ------------------- |
| `coordinates` | `Position`[][] | `undefined`         |
| `shallow`     | `boolean`      | `true`              |

#### Returns

`Polygon`

---

### isObject()

> `static` **isObject**(`obj`): `obj is Polygon`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

#### Returns

`obj is Polygon`
