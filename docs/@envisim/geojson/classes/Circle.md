[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / Circle

# Class: Circle

## theme_extends

- `AbstractAreaObject`\<`GJ.Circle`\>

## Implements

- `Circle`

## Constructors

### Constructor

> **new Circle**(`obj`, `shallow`): `Circle`

The `Circle` is a [Point](Point.md) with the extra property `radius`.
Thus, it does not follow the GeoJSON standard, but can be converted to
a [Polygon](Polygon.md) through the [Circle.toPolygon](#topolygon).

#### Parameters

| Parameter | theme_type                            | theme_default_value | theme_description                            |
| --------- | ------------------------------------- | ------------------- | -------------------------------------------- |
| `obj`     | `OptionalParam`\<`Circle`, `"type"`\> | `undefined`         | -                                            |
| `shallow` | `boolean`                             | `true`              | if `true`, copys by reference when possible. |

#### Returns

`Circle`

#### Overrides

`AbstractAreaObject<GJ.Circle>.constructor`

## Properties

| Property                               | theme_modifier | theme_type |
| -------------------------------------- | -------------- | ---------- |
| <a id="bbox"></a> `bbox?`              | `public`       | `BBox`     |
| <a id="coordinates"></a> `coordinates` | `public`       | `Position` |
| <a id="radius"></a> `radius`           | `public`       | `number`   |
| <a id="type"></a> `type`               | `readonly`     | `"Point"`  |

## Methods

### area()

> **area**(): `number`

#### Returns

`number`

#### Overrides

`AbstractAreaObject.area`

---

### buffer()

> **buffer**(`options`): `null` \| `Circle`

#### Parameters

| Parameter | theme_type      |
| --------- | --------------- |
| `options` | `BufferOptions` |

#### Returns

`null` \| `Circle`

---

### centroid()

> **centroid**(): `Position`

#### Returns

`Position`

#### Overrides

`AbstractAreaObject.centroid`

---

### copy()

> **copy**(`shallow`): `Circle`

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

#### Returns

`Circle`

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

#### Inherited from

`AbstractAreaObject.size`

---

### toPolygon()

> **toPolygon**(`options`): `null` \| [`Polygon`](Polygon.md) \| [`MultiPolygon`](MultiPolygon.md)

#### Parameters

| Parameter | theme_type                                                              |
| --------- | ----------------------------------------------------------------------- |
| `options` | [`CirclesToPolygonsOptions`](../interfaces/CirclesToPolygonsOptions.md) |

#### Returns

`null` \| [`Polygon`](Polygon.md) \| [`MultiPolygon`](MultiPolygon.md)

---

### assert()

> `static` **assert**(`obj`, `msg`): `asserts obj is Circle`

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `obj`     | `unknown`  | `undefined`         |
| `msg`     | `string`   | `"Expected Circle"` |

#### Returns

`asserts obj is Circle`

---

### create()

> `static` **create**(`coordinates`, `radius`, `shallow`): `Circle`

#### Parameters

| Parameter     | theme_type | theme_default_value |
| ------------- | ---------- | ------------------- |
| `coordinates` | `Position` | `undefined`         |
| `radius`      | `number`   | `undefined`         |
| `shallow`     | `boolean`  | `true`              |

#### Returns

`Circle`

---

### isObject()

> `static` **isObject**(`obj`): `obj is Circle`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

#### Returns

`obj is Circle`
