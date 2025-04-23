[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / PropertyRecord

# Class: PropertyRecord\<IDS\>

## Type Parameters

| Type Parameter           | theme_default_type |
| ------------------------ | ------------------ |
| `IDS` _extends_ `string` | `string`           |

## Constructors

### Constructor

> **new PropertyRecord**\<`IDS`\>(`record`, `shallow`): `PropertyRecord`\<`IDS`\>

#### Parameters

| Parameter | theme_type                                                 | theme_default_value |
| --------- | ---------------------------------------------------------- | ------------------- |
| `record`  | [`PropertyList`](../type-aliases/PropertyList.md)\<`IDS`\> | `undefined`         |
| `shallow` | `boolean`                                                  | `true`              |

#### Returns

`PropertyRecord`\<`IDS`\>

## Properties

| Property                                 | theme_modifier | theme_type                                                                                                | theme_default_value |
| ---------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------- | ------------------- |
| <a id="record"></a> `record`             | `public`       | [`PropertyList`](../type-aliases/PropertyList.md)\<`IDS`\>                                                | `undefined`         |
| <a id="special_keys"></a> `SPECIAL_KEYS` | `readonly`     | readonly \[`"_designWeight"`, `"_distance"`, `"_parent"`, `"_randomRotation"`, `"_measure"`, `"_count"`\] | `SPECIAL_KEYS`      |

## Methods

### addCategorical()

> **addCategorical**(`this`, `__namedParameters`): `string`

#### Parameters

| Parameter           | theme_type                                                                             |
| ------------------- | -------------------------------------------------------------------------------------- |
| `this`              | `PropertyRecord`\<`string`\>                                                           |
| `__namedParameters` | `Partial`\<[`CategoricalProperty`](../interfaces/CategoricalProperty.md)\<`string`\>\> |

#### Returns

`string`

---

### addNumerical()

> **addNumerical**(`this`, `__namedParameters`): `string`

#### Parameters

| Parameter           | theme_type                                                                         |
| ------------------- | ---------------------------------------------------------------------------------- |
| `this`              | `PropertyRecord`\<`string`\>                                                       |
| `__namedParameters` | `Partial`\<[`NumericalProperty`](../interfaces/NumericalProperty.md)\<`string`\>\> |

#### Returns

`string`

---

### addProperty()

> **addProperty**(`this`, `property`): `string`

#### Parameters

| Parameter  | theme_type                                            |
| ---------- | ----------------------------------------------------- |
| `this`     | `PropertyRecord`\<`string`\>                          |
| `property` | [`Property`](../type-aliases/Property.md)\<`string`\> |

#### Returns

`string`

---

### addValueToCategory()

> **addValueToCategory**(`id`, `value`): `number`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `id`      | `IDS`      |
| `value`   | `string`   |

#### Returns

`number`

---

### categoryHasValue()

> **categoryHasValue**(`id`, `value`): `boolean`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `id`      | `IDS`      |
| `value`   | `string`   |

#### Returns

`boolean`

---

### copy()

> **copy**(`shallow`): `PropertyRecord`\<`IDS`\>

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `shallow` | `boolean`  | `true`              |

#### Returns

`PropertyRecord`\<`IDS`\>

---

### getId()

#### Call Signature

> **getId**(`id`): [`Property`](../type-aliases/Property.md)

##### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `id`      | `IDS`      |

##### Returns

[`Property`](../type-aliases/Property.md)

#### Call Signature

> **getId**(`id?`): `null` \| [`Property`](../type-aliases/Property.md)\<`string`\>

##### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `id?`     | `IDS`      |

##### Returns

`null` \| [`Property`](../type-aliases/Property.md)\<`string`\>

---

### getIds()

> **getIds**(): `string`[]

#### Returns

`string`[]

---

### getRecord()

> **getRecord**(): [`Property`](../type-aliases/Property.md)\<`string`\>[]

#### Returns

[`Property`](../type-aliases/Property.md)\<`string`\>[]

---

### hasId()

> **hasId**(`id?`): `boolean`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `id?`     | `string`   |

#### Returns

`boolean`

---

### isCategorical()

> **isCategorical**(`id`): `boolean`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `id`      | `IDS`      |

#### Returns

`boolean`

---

### isNumerical()

> **isNumerical**(`id`): `boolean`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `id`      | `IDS`      |

#### Returns

`boolean`

---

### removeProperty()

> **removeProperty**(`this`, `id`): `void`

#### Parameters

| Parameter | theme_type                   |
| --------- | ---------------------------- |
| `this`    | `PropertyRecord`\<`string`\> |
| `id`      | `string`                     |

#### Returns

`void`

---

### copyRecord()

> `static` **copyRecord**\<`IDS`\>(`record`): [`PropertyList`](../type-aliases/PropertyList.md)\<`IDS`\>

#### Type Parameters

| Type Parameter           |
| ------------------------ |
| `IDS` _extends_ `string` |

#### Parameters

| Parameter | theme_type                                                 |
| --------- | ---------------------------------------------------------- |
| `record`  | [`PropertyList`](../type-aliases/PropertyList.md)\<`IDS`\> |

#### Returns

[`PropertyList`](../type-aliases/PropertyList.md)\<`IDS`\>

---

### createFromFeature()

> `static` **createFromFeature**\<`IDS1`\>(`feature?`): `PropertyRecord`\<`IDS1`\>

#### Type Parameters

| Type Parameter            | theme_default_type |
| ------------------------- | ------------------ |
| `IDS1` _extends_ `string` | `string`           |

#### Parameters

| Parameter  | theme_type                                                                       |
| ---------- | -------------------------------------------------------------------------------- |
| `feature?` | [`Feature`](Feature.md)\<[`PureObject`](../type-aliases/PureObject.md), `IDS1`\> |

#### Returns

`PropertyRecord`\<`IDS1`\>

---

### createFromJson()

> `static` **createFromJson**(`feature?`): `PropertyRecord`\<`string`\>

#### Parameters

| Parameter  | theme_type                                 |
| ---------- | ------------------------------------------ |
| `feature?` | `BaseFeature`\<`BaseGeometry`, `unknown`\> |

#### Returns

`PropertyRecord`\<`string`\>

---

### isCategorical()

> `static` **isCategorical**(`property`): `property is CategoricalProperty<string>`

#### Parameters

| Parameter  | theme_type                                                      |
| ---------- | --------------------------------------------------------------- |
| `property` | `null` \| [`Property`](../type-aliases/Property.md)\<`string`\> |

#### Returns

`property is CategoricalProperty<string>`

---

### isNumerical()

> `static` **isNumerical**(`property`): `property is NumericalProperty<string>`

#### Parameters

| Parameter  | theme_type                                                      |
| ---------- | --------------------------------------------------------------- |
| `property` | `null` \| [`Property`](../type-aliases/Property.md)\<`string`\> |

#### Returns

`property is NumericalProperty<string>`

---

### isRecord()

> `static` **isRecord**(`obj`): `obj is PropertyRecord<string>`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `unknown`  |

#### Returns

`obj is PropertyRecord<string>`

---

### isSpecial()

> `static` **isSpecial**(`k`): k is "\_designWeight" \| "\_distance" \| "\_parent" \| "\_randomRotation" \| "\_measure" \| "\_count"

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `k`       | `string`   |

#### Returns

k is "\_designWeight" \| "\_distance" \| "\_parent" \| "\_randomRotation" \| "\_measure" \| "\_count"

---

### mergeRecords()

> `static` **mergeRecords**\<`IDS1`, `IDS2`\>(`record1`, `record2`): `PropertyRecord`\<`IDS1` \| `IDS2`\>

#### Type Parameters

| Type Parameter            |
| ------------------------- |
| `IDS1` _extends_ `string` |
| `IDS2` _extends_ `string` |

#### Parameters

| Parameter | theme_type                 |
| --------- | -------------------------- |
| `record1` | `PropertyRecord`\<`IDS1`\> |
| `record2` | `PropertyRecord`\<`IDS2`\> |

#### Returns

`PropertyRecord`\<`IDS1` \| `IDS2`\>
