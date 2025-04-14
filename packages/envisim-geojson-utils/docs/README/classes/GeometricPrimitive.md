[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [](../../README.md) / GeometricPrimitive

# Class: GeometricPrimitive

Defined in: geometric-primitive.ts:13

## Constructors

### Constructor

> **new GeometricPrimitive**(): `GeometricPrimitive`

#### Returns

`GeometricPrimitive`

## Properties

### AREA

> `static` **AREA**: `"area"`

Defined in: geometric-primitive.ts:14

---

### LINE

> `static` **LINE**: `"line"`

Defined in: geometric-primitive.ts:15

---

### NONE

> `static` **NONE**: `"none"`

Defined in: geometric-primitive.ts:17

---

### POINT

> `static` **POINT**: `"point"`

Defined in: geometric-primitive.ts:16

## Methods

### assertArea()

> `static` **assertArea**(`obj`): `asserts obj is "area"`

Defined in: geometric-primitive.ts:29

#### Parameters

##### obj

`unknown`

#### Returns

`asserts obj is "area"`

---

### assertLine()

> `static` **assertLine**(`obj`): `asserts obj is "line"`

Defined in: geometric-primitive.ts:32

#### Parameters

##### obj

`unknown`

#### Returns

`asserts obj is "line"`

---

### assertPoint()

> `static` **assertPoint**(`obj`): `asserts obj is "point"`

Defined in: geometric-primitive.ts:35

#### Parameters

##### obj

`unknown`

#### Returns

`asserts obj is "point"`

---

### fromCollection()

> `static` **fromCollection**(`obj`, `allowGC`, `exhaustive`): [`GeometricPrimitiveUnion`](../type-aliases/GeometricPrimitiveUnion.md)

Defined in: geometric-primitive.ts:83

#### Parameters

##### obj

[`BaseFeatureCollection`](../../geojson/interfaces/BaseFeatureCollection.md)

##### allowGC

`boolean` = `false`

##### exhaustive

`boolean` = `false`

#### Returns

[`GeometricPrimitiveUnion`](../type-aliases/GeometricPrimitiveUnion.md)

---

### fromFeature()

#### Call Signature

> `static` **fromFeature**(`obj`, `allowGC?`): `"area"`

Defined in: geometric-primitive.ts:75

##### Parameters

###### obj

[`AreaFeature`](../../geojson/type-aliases/AreaFeature.md)

###### allowGC?

`boolean`

##### Returns

`"area"`

#### Call Signature

> `static` **fromFeature**(`obj`, `allowGC?`): `"line"`

Defined in: geometric-primitive.ts:76

##### Parameters

###### obj

[`LineFeature`](../../geojson/type-aliases/LineFeature.md)

###### allowGC?

`boolean`

##### Returns

`"line"`

#### Call Signature

> `static` **fromFeature**(`obj`, `allowGC?`): `"point"`

Defined in: geometric-primitive.ts:77

##### Parameters

###### obj

[`PointFeature`](../../geojson/type-aliases/PointFeature.md)

###### allowGC?

`boolean`

##### Returns

`"point"`

#### Call Signature

> `static` **fromFeature**(`obj`, `allowGC?`): [`GeometricPrimitiveUnion`](../type-aliases/GeometricPrimitiveUnion.md)

Defined in: geometric-primitive.ts:78

##### Parameters

###### obj

[`BaseFeature`](../../geojson/interfaces/BaseFeature.md)

###### allowGC?

`boolean`

##### Returns

[`GeometricPrimitiveUnion`](../type-aliases/GeometricPrimitiveUnion.md)

---

### fromGeometry()

#### Call Signature

> `static` **fromGeometry**(`obj`, `allowGC?`): `"area"`

Defined in: geometric-primitive.ts:40

##### Parameters

###### obj

[`AreaGeometry`](../../geojson/type-aliases/AreaGeometry.md)

###### allowGC?

`boolean`

##### Returns

`"area"`

#### Call Signature

> `static` **fromGeometry**(`obj`, `allowGC?`): `"line"`

Defined in: geometric-primitive.ts:41

##### Parameters

###### obj

[`LineGeometry`](../../geojson/type-aliases/LineGeometry.md)

###### allowGC?

`boolean`

##### Returns

`"line"`

#### Call Signature

> `static` **fromGeometry**(`obj`, `allowGC?`): `"point"`

Defined in: geometric-primitive.ts:42

##### Parameters

###### obj

[`PointGeometry`](../../geojson/type-aliases/PointGeometry.md)

###### allowGC?

`boolean`

##### Returns

`"point"`

#### Call Signature

> `static` **fromGeometry**(`obj`, `allowGC?`): [`GeometricPrimitiveUnion`](../type-aliases/GeometricPrimitiveUnion.md)

Defined in: geometric-primitive.ts:43

##### Parameters

###### obj

[`BaseGeometry`](../../geojson/type-aliases/BaseGeometry.md)

###### allowGC?

`boolean`

##### Returns

[`GeometricPrimitiveUnion`](../type-aliases/GeometricPrimitiveUnion.md)

---

### isArea()

> `static` **isArea**(`obj`): `obj is "area"`

Defined in: geometric-primitive.ts:19

#### Parameters

##### obj

`unknown`

#### Returns

`obj is "area"`

---

### isLine()

> `static` **isLine**(`obj`): `obj is "line"`

Defined in: geometric-primitive.ts:22

#### Parameters

##### obj

`unknown`

#### Returns

`obj is "line"`

---

### isPoint()

> `static` **isPoint**(`obj`): `obj is "point"`

Defined in: geometric-primitive.ts:25

#### Parameters

##### obj

`unknown`

#### Returns

`obj is "point"`
