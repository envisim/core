[**Documentation**](../README.md)

---

[Documentation](../README.md) / @envisim/utils

# @envisim/utils

## Contents

- [Type Aliases](#type-aliases)
  - [OptionalParam\<T, S>](#optionalparamt-s)
- [Functions](#functions)
  - [copy()](#copy)
  - [inClosedInterval()](#inclosedinterval)
  - [inOpenInterval()](#inopeninterval)
  - [reducedRowEchelonForm()](#reducedrowechelonform)
  - [swap()](#swap)
  - [throwRangeError()](#throwrangeerror)

## Type Aliases

### OptionalParam\<T, S>

> **OptionalParam**<`T`, `S`> = `Omit`<`T`, `S`> & `Partial`<`Pick`<`T`, `S`>>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
<tr>
<td>

`S` _extends_ keyof `T`

</td>
</tr>
</tbody>
</table>

## Functions

### copy()

> **copy**<`T`>(`obj`): `T`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`obj`

</td>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Returns

`T`

---

### inClosedInterval()

> **inClosedInterval**(`x`, `a`, `b`): `boolean`

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`x`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`a`

</td>
<td>

`number`

</td>
<td>

`0.0`

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`number`

</td>
<td>

`1.0`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

---

### inOpenInterval()

> **inOpenInterval**(`x`, `a`, `b`): `boolean`

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`x`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`a`

</td>
<td>

`number`

</td>
<td>

`0.0`

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`number`

</td>
<td>

`1.0`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

---

### reducedRowEchelonForm()

> **reducedRowEchelonForm**(`mat`, `rowCount`, `colCount`, `eps`, `mIdx`): `void`

Transforms an array into reducedRowEchelonForm in place.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mat`

</td>
<td>

`number`\[]

</td>
<td>

`undefined`

</td>
<td>

A flat array

</td>
</tr>
<tr>
<td>

`rowCount`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The number of rows

</td>
</tr>
<tr>
<td>

`colCount`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The number of columns

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-9`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`mIdx`

</td>
<td>

(`r`, `c`) => `number`

</td>
<td>

`...`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### swap()

> **swap**<`T`>(`arr`, `a`, `b`): `void`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`arr`

</td>
<td>

`T`\[]

</td>
</tr>
<tr>
<td>

`a`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### throwRangeError()

> **throwRangeError**(`err`): asserts err is undefined | null

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`err`

</td>
<td>

`undefined` | `null` | `string`

</td>
</tr>
</tbody>
</table>

#### Returns

asserts err is undefined | null
