[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [](../../README.md) / GeometricPrimitive

# Class: GeometricPrimitive

## Constructors

### Constructor

> **new GeometricPrimitive**(): `GeometricPrimitive`

#### Returns

`GeometricPrimitive`

## Properties

| Property                   | Modifier | Type      |
| -------------------------- | -------- | --------- |
| <a id="area"></a> `AREA`   | `static` | `"area"`  |
| <a id="line"></a> `LINE`   | `static` | `"line"`  |
| <a id="none"></a> `NONE`   | `static` | `"none"`  |
| <a id="point"></a> `POINT` | `static` | `"point"` |

## Methods

### assertArea()

> `static` **assertArea**(`obj`): `asserts obj is "area"`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `obj`     | `unknown` |

#### Returns

`asserts obj is "area"`

---

### assertLine()

> `static` **assertLine**(`obj`): `asserts obj is "line"`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `obj`     | `unknown` |

#### Returns

`asserts obj is "line"`

---

### assertPoint()

> `static` **assertPoint**(`obj`): `asserts obj is "point"`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `obj`     | `unknown` |

#### Returns

`asserts obj is "point"`

---

### fromCollection()

> `static` **fromCollection**(`obj`, `allowGC`, `exhaustive`): [`GeometricPrimitiveUnion`](../type-aliases/GeometricPrimitiveUnion.md)

#### Parameters

| Parameter    | Type                                                                         | Default value |
| ------------ | ---------------------------------------------------------------------------- | ------------- |
| `obj`        | [`BaseFeatureCollection`](../../geojson/interfaces/BaseFeatureCollection.md) | `undefined`   |
| `allowGC`    | `boolean`                                                                    | `false`       |
| `exhaustive` | `boolean`                                                                    | `false`       |

#### Returns

[`GeometricPrimitiveUnion`](../type-aliases/GeometricPrimitiveUnion.md)

---

### fromFeature()

#### Call Signature

> `static` **fromFeature**(`obj`, `allowGC?`): `"area"`

##### Parameters

| Parameter  | Type                                                       |
| ---------- | ---------------------------------------------------------- |
| `obj`      | [`AreaFeature`](../../geojson/type-aliases/AreaFeature.md) |
| `allowGC?` | `boolean`                                                  |

##### Returns

`"area"`

#### Call Signature

> `static` **fromFeature**(`obj`, `allowGC?`): `"line"`

##### Parameters

| Parameter  | Type                                                       |
| ---------- | ---------------------------------------------------------- |
| `obj`      | [`LineFeature`](../../geojson/type-aliases/LineFeature.md) |
| `allowGC?` | `boolean`                                                  |

##### Returns

`"line"`

#### Call Signature

> `static` **fromFeature**(`obj`, `allowGC?`): `"point"`

##### Parameters

| Parameter  | Type                                                         |
| ---------- | ------------------------------------------------------------ |
| `obj`      | [`PointFeature`](../../geojson/type-aliases/PointFeature.md) |
| `allowGC?` | `boolean`                                                    |

##### Returns

`"point"`

#### Call Signature

> `static` **fromFeature**(`obj`, `allowGC?`): [`GeometricPrimitiveUnion`](../type-aliases/GeometricPrimitiveUnion.md)

##### Parameters

| Parameter  | Type                                                     |
| ---------- | -------------------------------------------------------- |
| `obj`      | [`BaseFeature`](../../geojson/interfaces/BaseFeature.md) |
| `allowGC?` | `boolean`                                                |

##### Returns

[`GeometricPrimitiveUnion`](../type-aliases/GeometricPrimitiveUnion.md)

---

### fromGeometry()

#### Call Signature

> `static` **fromGeometry**(`obj`, `allowGC?`): `"area"`

##### Parameters

| Parameter  | Type                                                         |
| ---------- | ------------------------------------------------------------ |
| `obj`      | [`AreaGeometry`](../../geojson/type-aliases/AreaGeometry.md) |
| `allowGC?` | `boolean`                                                    |

##### Returns

`"area"`

#### Call Signature

> `static` **fromGeometry**(`obj`, `allowGC?`): `"line"`

##### Parameters

| Parameter  | Type                                                         |
| ---------- | ------------------------------------------------------------ |
| `obj`      | [`LineGeometry`](../../geojson/type-aliases/LineGeometry.md) |
| `allowGC?` | `boolean`                                                    |

##### Returns

`"line"`

#### Call Signature

> `static` **fromGeometry**(`obj`, `allowGC?`): `"point"`

##### Parameters

| Parameter  | Type                                                           |
| ---------- | -------------------------------------------------------------- |
| `obj`      | [`PointGeometry`](../../geojson/type-aliases/PointGeometry.md) |
| `allowGC?` | `boolean`                                                      |

##### Returns

`"point"`

#### Call Signature

> `static` **fromGeometry**(`obj`, `allowGC?`): [`GeometricPrimitiveUnion`](../type-aliases/GeometricPrimitiveUnion.md)

##### Parameters

| Parameter  | Type                                                         |
| ---------- | ------------------------------------------------------------ |
| `obj`      | [`BaseGeometry`](../../geojson/type-aliases/BaseGeometry.md) |
| `allowGC?` | `boolean`                                                    |

##### Returns

[`GeometricPrimitiveUnion`](../type-aliases/GeometricPrimitiveUnion.md)

---

### isArea()

> `static` **isArea**(`obj`): `obj is "area"`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `obj`     | `unknown` |

#### Returns

`obj is "area"`

---

### isLine()

> `static` **isLine**(`obj`): `obj is "line"`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `obj`     | `unknown` |

#### Returns

`obj is "line"`

---

### isPoint()

> `static` **isPoint**(`obj`): `obj is "point"`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `obj`     | `unknown` |

#### Returns

`obj is "point"`
