[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / MultiCircle

# Class: MultiCircle

## theme_extends

- `AbstractAreaObject`\<`GJ.MultiCircle`\>

## Implements

- `MultiCircle`

## Constructors

### Constructor

> **new MultiCircle**(`obj`, `shallow`): `MultiCircle`

The `Circle` is a [MultiPoint](MultiPoint.md) with the extra property `radius`.
Thus, it does not follow the GeoJSON standard, but can be converted to
a [MultiPolygon](MultiPolygon.md) through the [MultiCircle.toPolygon](#topolygon).

MultiCircles MUST be non-overlapping.

#### Parameters

| Parameter | theme_type                                 | theme_default_value | theme_description                            |
| --------- | ------------------------------------------ | ------------------- | -------------------------------------------- |
| `obj`     | `OptionalParam`\<`MultiCircle`, `"type"`\> | `undefined`         | -                                            |
| `shallow` | `boolean`                                  | `true`              | if `true`, copys by reference when possible. |

#### Returns

`MultiCircle`

#### Overrides

`AbstractAreaObject<GJ.MultiCircle>.constructor`

## Properties

| Property                               | theme_modifier | theme_type     |
| -------------------------------------- | -------------- | -------------- |
| <a id="bbox"></a> `bbox?`              | `public`       | `BBox`         |
| <a id="coordinates"></a> `coordinates` | `public`       | `Position`[]   |
| <a id="radius"></a> `radius`           | `public`       | `number`       |
| <a id="type"></a> `type`               | `readonly`     | `"MultiPoint"` |

## Methods

### area()

> **area**(): `number`

#### Returns

`number`

#### Overrides

`AbstractAreaObject.area`

---

### buffer()

> **buffer**(`options`): `null` \| [`Polygon`](Polygon.md) \| [`MultiPolygon`](MultiPolygon.md) \| [`Circle`](Circle.md) \| `MultiCircle`

#### Parameters

| Parameter | theme_type      |
| --------- | --------------- |
| `options` | `BufferOptions` |

#### Returns

`null` \| [`Polygon`](Polygon.md) \| [`MultiPolygon`](MultiPolygon.md) \| [`Circle`](Circle.md) \| `MultiCircle`

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

> **copy**(`shallow`): `MultiCircle`

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

#### Returns

`MultiCircle`

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

> **getCoordinateArray**(): `Position`[]

#### Returns

`Position`[]

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

#### Overrides

`AbstractAreaObject.size`

---

### toPolygon()

> **toPolygon**(`options`): `null` \| [`Polygon`](Polygon.md) \| [`MultiPolygon`](MultiPolygon.md)

Transforms the circles into (Multi)Polygon. If circles are overlapping, the MultiPolygon will
overlap as well.

#### Parameters

| Parameter | theme_type                                                              |
| --------- | ----------------------------------------------------------------------- |
| `options` | [`CirclesToPolygonsOptions`](../interfaces/CirclesToPolygonsOptions.md) |

#### Returns

`null` \| [`Polygon`](Polygon.md) \| [`MultiPolygon`](MultiPolygon.md)

---

### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is MultiCircle`

#### Parameters

| Parameter | theme_type | theme_default_value      |
| --------- | ---------- | ------------------------ |
| `obj`     | `unknown`  | `undefined`              |
| `msg`     | `string`   | `"Expected MultiCircle"` |

#### Returns

`asserts obj is MultiCircle`

---

### create()

> `static` **create**(`coordinates`, `radius`, `shallow`): `MultiCircle`

#### Parameters

| Parameter     | theme_type   | theme_default_value |
| ------------- | ------------ | ------------------- |
| `coordinates` | `Position`[] | `undefined`         |
| `radius`      | `number`     | `undefined`         |
| `shallow`     | `boolean`    | `true`              |

#### Returns

`MultiCircle`

---

### isObject()

> `static` **isObject**(`obj`): `obj is MultiCircle`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

#### Returns

`obj is MultiCircle`
