[**Documentation**](../README.md)

---

[Documentation](../README.md) / @envisim/random

# @envisim/random

## Contents

- [Classes](#classes)
  - [Random](#random)
- [Interfaces](#interfaces)
  - [RandomGenerator](#randomgenerator)
- [Functions](#functions)
  - [randomArray()](#randomarray)
  - [randomFloat()](#randomfloat)
  - [randomFloatOpen()](#randomfloatopen)
  - [randomInt()](#randomint)

## Classes

### Random

#### Constructors

##### Constructor

> **new Random**(`seed?`): [`Random`](#random)

Returns an instance of Random. TS/class implementation of Uheprng.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`seed?`

</td>
<td>

`string` | `number`

</td>
<td>

Seed for random number generator.

</td>
</tr>
</tbody>
</table>

###### Returns

[`Random`](#random)

Uheprng

###### See

[grc.com/otg/uheprng.htm](https://www.grc.com/otg/uheprng.htm)

###### Example

```ts
const rand = new Random("selectrandom");
const a = rand.float();
const b = rand.float();
const c = rand.seed("selectrandom").float();
console.log(a === b, a === c); // false, true
```

#### Methods

##### addEntropy()

> **addEntropy**(...`args`): `this`

Adds entropy to Uheprng.

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

...`args`

</td>
<td>

`number`\[] | `string`\[]

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### cleanString()

> **cleanString**(`inStr`): `string`

**`Internal`**

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

`inStr`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### float()

> **float**(): `number`

###### Returns

`number`

##### floatArray()

> **floatArray**(`n`): `number`\[]

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

`n`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

An array of (uniform) numbers on the interval `[0.0, 1.0)`

##### floate()

> **floate**(): `number`

###### Returns

`number`

Pseudo-random (uniform) number o nthe interval `(0.0, 1.0)`

##### hashString()

> **hashString**(`inStr`): `this`

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

`inStr`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### initState()

> **initState**(): `this`

Initializes state

###### Returns

`this`

##### intn()

> **intn**(`n`): `number`

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

`n`

</td>
<td>

`number`

</td>
<td>

`1`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

A pseudo-random integer on \[0, `n`)

###### Throws

`RangeError` if `n` is not at positive integer.

##### random()

> **random**(): `number`

###### Returns

`number`

Pseudo-random (uniform) number on the interval \[0.0, 1.0)

##### seed()

> **seed**(`seed`): `this`

Seed the random generator

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

`seed`

</td>
<td>

`string` | `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### str()

> **str**(`n`): `string`

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

`n`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

A pseudo-random string of `n` printable characters ranging from
`chr(33)` to `chr(126)` inclusive.

## Interfaces

### RandomGenerator

#### Methods

##### random()

> **random**(): `number`

###### Returns

`number`

## Functions

### randomArray()

> **randomArray**(`n`, `generator`): `number`\[]

Returns an array with psudo-random standard uniform elements.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`n`

</td>
<td>

`number`

</td>
<td>

Length of array.

</td>
</tr>
<tr>
<td>

`generator`

</td>
<td>

[`RandomGenerator`](#randomgenerator)

</td>
<td>

Seed for random number generator.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`\[]

Pseudo-random (uniform) array with elements on the interval `[0.0, 1.0)`.

---

### randomFloat()

> **randomFloat**(`generator`): `number`

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

`generator`

</td>
<td>

[`RandomGenerator`](#randomgenerator)

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

Pseudo-random (uniform) number on the interval `[0.0, 1.0)`

---

### randomFloatOpen()

> **randomFloatOpen**(`generator`): `number`

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

`generator`

</td>
<td>

[`RandomGenerator`](#randomgenerator)

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

Pseudo-random (uniform) number o nthe interval `(0.0, 1.0)`

---

### randomInt()

> **randomInt**(`n`, `generator`): `number`

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

`n`

</td>
<td>

`number`

</td>
<td>

`1`

</td>
</tr>
<tr>
<td>

`generator`

</td>
<td>

[`RandomGenerator`](#randomgenerator)

</td>
<td>

`...`

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

A pseudo-random integer on \[0, `n`)

#### Throws

`RangeError` if `n` is not at positive integer.
