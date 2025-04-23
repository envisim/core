[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / Feature

# Class: Feature\<T, PID\>

## Type Parameters

| Type Parameter                                              | theme_default_type |
| ----------------------------------------------------------- | ------------------ |
| `T` _extends_ [`PureObject`](../type-aliases/PureObject.md) | -                  |
| `PID` _extends_ `string`                                    | `string`           |

## Implements

- `BaseFeature`\<`GJ.SingleTypeObject`, `number` \| `string`\>

## Constructors

### Constructor

> **new Feature**\<`T`, `PID`\>(`geometry`, `properties`, `shallow`): `Feature`\<`T`, `PID`\>

#### Parameters

| Parameter    | theme_type                                                           | theme_default_value |
| ------------ | -------------------------------------------------------------------- | ------------------- |
| `geometry`   | `T`                                                                  | `undefined`         |
| `properties` | [`FeatureProperties`](../type-aliases/FeatureProperties.md)\<`PID`\> | `undefined`         |
| `shallow`    | `boolean`                                                            | `true`              |

#### Returns

`Feature`\<`T`, `PID`\>

## Properties

| Property                             | theme_modifier | theme_type                                                           | theme_default_value |
| ------------------------------------ | -------------- | -------------------------------------------------------------------- | ------------------- |
| <a id="geometry"></a> `geometry`     | `public`       | `T`                                                                  | `undefined`         |
| <a id="properties"></a> `properties` | `public`       | [`FeatureProperties`](../type-aliases/FeatureProperties.md)\<`PID`\> | `undefined`         |
| <a id="type"></a> `type`             | `readonly`     | `"Feature"`                                                          | `"Feature"`         |

## Methods

### editProperty()

> **editProperty**(`id`, `callback`): [`FeatureProperties`](../type-aliases/FeatureProperties.md)\[`PID`\]

#### Parameters

| Parameter  | theme_type                                                                        |
| ---------- | --------------------------------------------------------------------------------- |
| `id`       | `PID`                                                                             |
| `callback` | (`value`) => [`FeatureProperties`](../type-aliases/FeatureProperties.md)\[`PID`\] |

#### Returns

[`FeatureProperties`](../type-aliases/FeatureProperties.md)\[`PID`\]

---

### geometricPrimitive()

> **geometricPrimitive**(): `"area"` \| `"line"` \| `"point"`

#### Returns

`"area"` \| `"line"` \| `"point"`

---

### getProperty()

> **getProperty**(`id`): `string` \| `number`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `id`      | `PID`      |

#### Returns

`string` \| `number`

---

### getSpecialPropertyDesignWeight()

> **getSpecialPropertyDesignWeight**(): `number`

#### Returns

`number`

---

### getSpecialPropertyDistance()

> **getSpecialPropertyDistance**(): `number`

#### Returns

`number`

---

### getSpecialPropertyParent()

> **getSpecialPropertyParent**(): `number`

#### Returns

`number`

---

### getSpecialPropertyRandomRotation()

> **getSpecialPropertyRandomRotation**(): `number`

#### Returns

`number`

---

### measure()

> **measure**(): `number`

#### Returns

`number`

---

### multSpecialPropertyDesignWeight()

> **multSpecialPropertyDesignWeight**(`value`): `number`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `value`   | `number`   |

#### Returns

`number`

---

### setProperty()

> **setProperty**(`id`, `value`): `void`

#### Parameters

| Parameter | theme_type                                                           |
| --------- | -------------------------------------------------------------------- |
| `id`      | `PID`                                                                |
| `value`   | [`FeatureProperties`](../type-aliases/FeatureProperties.md)\[`PID`\] |

#### Returns

`void`

---

### setSpecialPropertyDesignWeight()

> **setSpecialPropertyDesignWeight**(`value`): `void`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `value`   | `number`   |

#### Returns

`void`

---

### setSpecialPropertyDistance()

> **setSpecialPropertyDistance**(`value`): `void`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `value`   | `number`   |

#### Returns

`void`

---

### setSpecialPropertyMeasure()

> **setSpecialPropertyMeasure**(): `void`

#### Returns

`void`

---

### setSpecialPropertyParent()

> **setSpecialPropertyParent**(`value`): `void`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `value`   | `number`   |

#### Returns

`void`

---

### setSpecialPropertyRandomRotation()

> **setSpecialPropertyRandomRotation**(`value`): `void`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `value`   | `number`   |

#### Returns

`void`

---

### assertArea()

> `static` **assertArea**(`obj`, `msg`): `asserts obj is Feature<AreaObject, string>`

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `obj`     | `unknown`  | `undefined`         |
| `msg`     | `string`   | `"Expected area"`   |

#### Returns

`asserts obj is Feature<AreaObject, string>`

---

### assertLine()

> `static` **assertLine**(`obj`, `msg`): `asserts obj is Feature<LineObject, string>`

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `obj`     | `unknown`  | `undefined`         |
| `msg`     | `string`   | `"Expected line"`   |

#### Returns

`asserts obj is Feature<LineObject, string>`

---

### assertPoint()

> `static` **assertPoint**(`obj`, `msg`): `asserts obj is Feature<PointObject, string>`

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `obj`     | `unknown`  | `undefined`         |
| `msg`     | `string`   | `"Expected point"`  |

#### Returns

`asserts obj is Feature<PointObject, string>`

---

### createArea()

> `static` **createArea**\<`PID`\>(`geometry`, `properties?`, `shallow?`, `options?`): `null` \| `Feature`\<[`AreaObject`](../type-aliases/AreaObject.md), `PID`\>

#### Type Parameters

| Type Parameter           | theme_default_type |
| ------------------------ | ------------------ |
| `PID` _extends_ `string` | `string`           |

#### Parameters

| Parameter     | theme_type                                                                     | theme_default_value |
| ------------- | ------------------------------------------------------------------------------ | ------------------- |
| `geometry`    | `BaseGeometry`                                                                 | `undefined`         |
| `properties?` | `null` \| [`FeatureProperties`](../type-aliases/FeatureProperties.md)\<`PID`\> | `undefined`         |
| `shallow?`    | `boolean`                                                                      | `true`              |
| `options?`    | [`CirclesToPolygonsOptions`](../interfaces/CirclesToPolygonsOptions.md)        | `{}`                |

#### Returns

`null` \| `Feature`\<[`AreaObject`](../type-aliases/AreaObject.md), `PID`\>

---

### createAreaFromJson()

> `static` **createAreaFromJson**(`feature`, `shallow`): `null` \| `Feature`\<[`AreaObject`](../type-aliases/AreaObject.md), `string`\>

#### Parameters

| Parameter | theme_type                                                                         | theme_default_value |
| --------- | ---------------------------------------------------------------------------------- | ------------------- |
| `feature` | `OptionalParam`\<`BaseFeature`\<`BaseGeometry`, `string` \| `number`\>, `"type"`\> | `undefined`         |
| `shallow` | `boolean`                                                                          | `true`              |

#### Returns

`null` \| `Feature`\<[`AreaObject`](../type-aliases/AreaObject.md), `string`\>

---

### createLine()

> `static` **createLine**\<`PID`\>(`geometry`, `properties?`, `shallow?`): `null` \| `Feature`\<[`LineObject`](../type-aliases/LineObject.md), `string`\>

#### Type Parameters

| Type Parameter           | theme_default_type |
| ------------------------ | ------------------ |
| `PID` _extends_ `string` | `string`           |

#### Parameters

| Parameter     | theme_type                                                                     | theme_default_value |
| ------------- | ------------------------------------------------------------------------------ | ------------------- |
| `geometry`    | `BaseGeometry`                                                                 | `undefined`         |
| `properties?` | `null` \| [`FeatureProperties`](../type-aliases/FeatureProperties.md)\<`PID`\> | `undefined`         |
| `shallow?`    | `boolean`                                                                      | `true`              |

#### Returns

`null` \| `Feature`\<[`LineObject`](../type-aliases/LineObject.md), `string`\>

---

### createLineFromJson()

> `static` **createLineFromJson**(`feature`, `shallow`): `null` \| `Feature`\<[`LineObject`](../type-aliases/LineObject.md), `string`\>

#### Parameters

| Parameter | theme_type                                                                         | theme_default_value |
| --------- | ---------------------------------------------------------------------------------- | ------------------- |
| `feature` | `OptionalParam`\<`BaseFeature`\<`BaseGeometry`, `string` \| `number`\>, `"type"`\> | `undefined`         |
| `shallow` | `boolean`                                                                          | `true`              |

#### Returns

`null` \| `Feature`\<[`LineObject`](../type-aliases/LineObject.md), `string`\>

---

### createPoint()

> `static` **createPoint**\<`PID`\>(`geometry`, `properties?`, `shallow?`): `null` \| `Feature`\<[`PointObject`](../type-aliases/PointObject.md), `string`\>

#### Type Parameters

| Type Parameter           | theme_default_type |
| ------------------------ | ------------------ |
| `PID` _extends_ `string` | `string`           |

#### Parameters

| Parameter     | theme_type                                                                     | theme_default_value |
| ------------- | ------------------------------------------------------------------------------ | ------------------- |
| `geometry`    | `BaseGeometry`                                                                 | `undefined`         |
| `properties?` | `null` \| [`FeatureProperties`](../type-aliases/FeatureProperties.md)\<`PID`\> | `undefined`         |
| `shallow?`    | `boolean`                                                                      | `true`              |

#### Returns

`null` \| `Feature`\<[`PointObject`](../type-aliases/PointObject.md), `string`\>

---

### createPointFromJson()

> `static` **createPointFromJson**(`feature`, `shallow`): `null` \| `Feature`\<[`PointObject`](../type-aliases/PointObject.md), `string`\>

#### Parameters

| Parameter | theme_type                                                                         | theme_default_value |
| --------- | ---------------------------------------------------------------------------------- | ------------------- |
| `feature` | `OptionalParam`\<`BaseFeature`\<`BaseGeometry`, `string` \| `number`\>, `"type"`\> | `undefined`         |
| `shallow` | `boolean`                                                                          | `true`              |

#### Returns

`null` \| `Feature`\<[`PointObject`](../type-aliases/PointObject.md), `string`\>

---

### isArea()

> `static` **isArea**(`obj`): `obj is Feature<AreaObject, string>`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

#### Returns

`obj is Feature<AreaObject, string>`

---

### isLine()

> `static` **isLine**(`obj`): `obj is Feature<LineObject, string>`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

#### Returns

`obj is Feature<LineObject, string>`

---

### isPoint()

> `static` **isPoint**(`obj`): `obj is Feature<PointObject, string>`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

#### Returns

`obj is Feature<PointObject, string>`
