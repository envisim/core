[**Documentation**](../README.md)

---

[Documentation](../README.md) / @envisim/utils

# @envisim/utils

## Contents

- [Classes](#classes)
  - [EnvisimError](#envisimerror)
  - [ValidationError](#validationerror)
- [Interfaces](#interfaces)
  - [Interval](#interval)
  - [ValidationErrorCauseBase\<C>](#validationerrorcausebasec)
- [Type Aliases](#type-aliases)
  - [OptionalParam\<T, S>](#optionalparamt-s)
  - [ValidationErrorCause](#validationerrorcause)
  - [ValidationErrorChecker](#validationerrorchecker)
  - [ValidationErrorCodes](#validationerrorcodes)
  - [ValidationErrorCreator](#validationerrorcreator)
- [Functions](#functions)
  - [copy()](#copy)
  - [inInterval()](#ininterval)
  - [inUnitInterval()](#inunitinterval)
  - [reducedRowEchelonForm()](#reducedrowechelonform)
  - [swap()](#swap)

## Classes

### EnvisimError

#### Extends

- `AggregateError`

#### Constructors

##### Constructor

> **new EnvisimError**(): [`EnvisimError`](#envisimerror)

###### Returns

[`EnvisimError`](#envisimerror)

###### Overrides

`AggregateError.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="errors"></a> `errors`

</td>
<td>

`Error`\[]

</td>
</tr>
</tbody>
</table>

#### Accessors

##### length

###### Get Signature

> **get** **length**(): `number`

###### Returns

`number`

#### Methods

##### add()

> **add**(`error?`): `boolean`

###### Parameters

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

`error?`

</td>
<td>

`Error`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### append()

> **append**(`errors?`): `this`

###### Parameters

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

`errors?`

</td>
<td>

[`EnvisimError`](#envisimerror) | `Error`\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### hasErrors()

> **hasErrors**(): `boolean`

###### Returns

`boolean`

##### orNull()

> **orNull**(): `null` | [`EnvisimError`](#envisimerror)

###### Returns

`null` | [`EnvisimError`](#envisimerror)

##### throwErrors()

> **throwErrors**(`holdIfEmpty`): `undefined`

###### Parameters

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

`holdIfEmpty`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined`

##### checkErrors()

> `static` **checkErrors**(`errors?`): `undefined`

###### Parameters

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

`errors?`

</td>
<td>

[`EnvisimError`](#envisimerror)

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined`

##### isError()

> `static` **isError**(`error`): `error is EnvisimError`

###### Parameters

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

`error`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`error is EnvisimError`

---

### ValidationError

#### Extends

- `Error`

#### Constructors

##### Constructor

> **new ValidationError**(`message`, `cause`): [`ValidationError`](#validationerror)

###### Parameters

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

`message`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`cause`

</td>
<td>

[`ValidationErrorCause`](#validationerrorcause-1)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ValidationError`](#validationerror)

###### Overrides

`Error.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="cause"></a> `cause?`

</td>
<td>

`public`

</td>
<td>

[`ValidationErrorCause`](#validationerrorcause-1)

</td>
</tr>
<tr>
<td>

<a id="check"></a> `check`

</td>
<td>

`static`

</td>
<td>

{ `array-empty`: (`arg0`, `arr`) => `undefined` | [`ValidationError`](#validationerror); `array-incorrect-length`: (`arg0`, `arr`) => `undefined` | [`ValidationError`](#validationerror); `number-not-finite`: (`arg0`, `value`) => `undefined` | [`ValidationError`](#validationerror); `number-not-in-interval`: (`arg0`, `value`) => `undefined` | [`ValidationError`](#validationerror); `number-not-in-unit-interval`: (`arg0`, `value`) => `undefined` | [`ValidationError`](#validationerror); `number-not-integer`: (`arg0`, `value`) => `undefined` | [`ValidationError`](#validationerror); `number-not-nonnegative`: (`arg0`, `value`) => `undefined` | [`ValidationError`](#validationerror); `number-not-number`: (`arg0`, `value`) => `undefined` | [`ValidationError`](#validationerror); `number-not-positive`: (`arg0`, `value`) => `undefined` | [`ValidationError`](#validationerror); `other-value-not-existing`: (`arg0`, `value`) => `undefined` | [`ValidationError`](#validationerror); }

</td>
</tr>
<tr>
<td>

`check.array-empty`

</td>
<td>

`readonly`

</td>
<td>

(`arg0`, `arr`) => `undefined` | [`ValidationError`](#validationerror)

</td>
</tr>
<tr>
<td>

`check.array-incorrect-length`

</td>
<td>

`readonly`

</td>
<td>

(`arg0`, `arr`) => `undefined` | [`ValidationError`](#validationerror)

</td>
</tr>
<tr>
<td>

`check.number-not-finite`

</td>
<td>

`readonly`

</td>
<td>

(`arg0`, `value`) => `undefined` | [`ValidationError`](#validationerror)

</td>
</tr>
<tr>
<td>

`check.number-not-in-interval`

</td>
<td>

`readonly`

</td>
<td>

(`arg0`, `value`) => `undefined` | [`ValidationError`](#validationerror)

</td>
</tr>
<tr>
<td>

`check.number-not-in-unit-interval`

</td>
<td>

`readonly`

</td>
<td>

(`arg0`, `value`) => `undefined` | [`ValidationError`](#validationerror)

</td>
</tr>
<tr>
<td>

`check.number-not-integer`

</td>
<td>

`readonly`

</td>
<td>

(`arg0`, `value`) => `undefined` | [`ValidationError`](#validationerror)

</td>
</tr>
<tr>
<td>

`check.number-not-nonnegative`

</td>
<td>

`readonly`

</td>
<td>

(`arg0`, `value`) => `undefined` | [`ValidationError`](#validationerror)

</td>
</tr>
<tr>
<td>

`check.number-not-number`

</td>
<td>

`readonly`

</td>
<td>

(`arg0`, `value`) => `undefined` | [`ValidationError`](#validationerror)

</td>
</tr>
<tr>
<td>

`check.number-not-positive`

</td>
<td>

`readonly`

</td>
<td>

(`arg0`, `value`) => `undefined` | [`ValidationError`](#validationerror)

</td>
</tr>
<tr>
<td>

`check.other-value-not-existing`

</td>
<td>

`readonly`

</td>
<td>

(`arg0`, `value`) => `undefined` | [`ValidationError`](#validationerror)

</td>
</tr>
<tr>
<td>

<a id="create"></a> `create`

</td>
<td>

`static`

</td>
<td>

[`ValidationErrorCreator`](#validationerrorcreator)

</td>
</tr>
</tbody>
</table>

#### Methods

##### raise()

> **raise**(): `void`

###### Returns

`void`

## Interfaces

### Interval

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="ends"></a> `ends?`

</td>
<td>

`"closed"` | `"open"` | `"left-open"` | `"right-open"`

</td>
</tr>
<tr>
<td>

<a id="interval-1"></a> `interval`

</td>
<td>

\[`number`] | \[`number`, `number`]

</td>
</tr>
</tbody>
</table>

---

### ValidationErrorCauseBase\<C>

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

`C` _extends_ `string`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="arg"></a> `arg?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="code"></a> `code`

</td>
<td>

`C`

</td>
</tr>
</tbody>
</table>

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

---

### ValidationErrorCause

> **ValidationErrorCause** = [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"number-not-number"`> & { `value?`: `number`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"number-not-integer"`> & { `value?`: `number`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"number-not-positive"`> & { `value?`: `number`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"number-not-nonnegative"`> & { `value?`: `number`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"number-not-finite"`> & { `value?`: `number`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"number-not-in-unit-interval"`> & { `ends?`: [`Interval`](#interval)\[`"ends"`]; `value?`: `number`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"number-not-in-interval"`> & { `value?`: `number`; } & [`Interval`](#interval) | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"geojson-incorrect"`> & { `type?`: `string`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"geojson-not-area"`> & { `type?`: `string`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"geojson-not-line"`> & { `type?`: `string`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"geojson-not-point"`> & { `type?`: `string`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"geojson-not-at-least-line"`> & { `type?`: `string`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"geojson-not-at-most-line"`> & { `type?`: `string`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"geojson-empty"`> & { `type?`: `string`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"geojson-zero-measure"`> & { `type?`: `string`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"property-special-key"`> & { `key?`: `string`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"property-name-conflict"`> & { `key?`: `string`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"property-not-categorical"`> & { `key?`: `string`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"property-not-numerical"`> & { `key?`: `string`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"property-not-existing"`> & { `key?`: `string`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"property-records-not-identical"`> & { `other?`: `string`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"array-empty"`> | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"array-incorrect-length"`> & { `length`: `number`; `shape?`: `string`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"other-value-not-existing"`> | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"other-index-oob"`> & { `index?`: `number`; } | [`ValidationErrorCauseBase`](#validationerrorcausebase)<`"other-incorrect-shape"`> & { `shape?`: `string`; }

---

### ValidationErrorChecker

> **ValidationErrorChecker** = { \[C in ValidationErrorCodes]?: (arg0: Omit\<Extract\<ValidationErrorCause, { code: C }>, "code">, value: any) => ValidationError | undefined }

---

### ValidationErrorCodes

> **ValidationErrorCodes** = [`ValidationErrorCause`](#validationerrorcause-1)\[`"code"`]

---

### ValidationErrorCreator

> **ValidationErrorCreator** = `{ [C in ValidationErrorCodes]: (arg0: Omit<Extract<ValidationErrorCause, { code: C }>, "code">) => ValidationError }`

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

### inInterval()

> **inInterval**(`x`, `__namedParameters`): `boolean`

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

`x`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

---

### inUnitInterval()

> **inUnitInterval**(`x`, `__namedParameters`): `boolean`

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

`x`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`__namedParameters`

</td>
<td>

`Omit`<[`Interval`](#interval), `"interval"`>

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
