[**Documentation**](../README.md)

---

[Documentation](../README.md) / @envisim/utils

# @envisim/utils

## Type Aliases

### OptionalParam\<T, S\>

> **OptionalParam**\<`T`, `S`\> = `Omit`\<`T`, `S`\> & `Partial`\<`Pick`\<`T`, `S`\>\>

#### Type Parameters

| Type Parameter          |
| ----------------------- |
| `T`                     |
| `S` _extends_ keyof `T` |

## Functions

### copy()

> **copy**\<`T`\>(`obj`): `T`

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `obj`     | `T`        |

#### Returns

`T`

---

### inClosedInterval()

> **inClosedInterval**(`x`, `a`, `b`): `boolean`

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `x`       | `number`   | `undefined`         |
| `a`       | `number`   | `0.0`               |
| `b`       | `number`   | `1.0`               |

#### Returns

`boolean`

---

### inOpenInterval()

> **inOpenInterval**(`x`, `a`, `b`): `boolean`

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `x`       | `number`   | `undefined`         |
| `a`       | `number`   | `0.0`               |
| `b`       | `number`   | `1.0`               |

#### Returns

`boolean`

---

### reducedRowEchelonForm()

> **reducedRowEchelonForm**(`mat`, `rowCount`, `colCount`, `eps`, `mIdx`): `void`

Transforms an array into reducedRowEchelonForm in place.

#### Parameters

| Parameter  | theme_type             | theme_default_value | theme_description     |
| ---------- | ---------------------- | ------------------- | --------------------- |
| `mat`      | `number`[]             | `undefined`         | A flat array          |
| `rowCount` | `number`               | `undefined`         | The number of rows    |
| `colCount` | `number`               | `undefined`         | The number of columns |
| `eps`      | `number`               | `1e-9`              | -                     |
| `mIdx`     | (`r`, `c`) => `number` | `...`               | -                     |

#### Returns

`void`

---

### swap()

> **swap**\<`T`\>(`arr`, `a`, `b`): `void`

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `arr`     | `T`[]      |
| `a`       | `number`   |
| `b`       | `number`   |

#### Returns

`void`

---

### throwRangeError()

> **throwRangeError**(`err`): asserts err is undefined \| null

#### Parameters

| Parameter | theme_type                        |
| --------- | --------------------------------- |
| `err`     | `undefined` \| `null` \| `string` |

#### Returns

asserts err is undefined \| null
