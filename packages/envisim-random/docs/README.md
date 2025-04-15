**@envisim/random**

---

# @envisim/random

## Classes

### Random

#### Constructors

##### Constructor

> **new Random**(`seed?`): [`Random`](#random)

Returns an instance of Random. TS/class implementation of Uheprng.

###### Parameters

| Parameter | Type                 | Description                       |
| --------- | -------------------- | --------------------------------- |
| `seed?`   | `string` \| `number` | Seed for random number generator. |

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

| Parameter | Type                     |
| --------- | ------------------------ |
| ...`args` | `number`[] \| `string`[] |

###### Returns

`this`

##### cleanString()

> **cleanString**(`inStr`): `string`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `inStr`   | `string` |

###### Returns

`string`

##### float()

> **float**(): `number`

###### Returns

`number`

##### floatArray()

> **floatArray**(`n`): `number`[]

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `n`       | `number` |

###### Returns

`number`[]

An array of (uniform) numbers on the interval `[0.0, 1.0)`

##### floate()

> **floate**(): `number`

###### Returns

`number`

Pseudo-random (uniform) number o nthe interval `(0.0, 1.0)`

##### hashString()

> **hashString**(`inStr`): `this`

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `inStr`   | `string` |

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

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `n`       | `number` | `1`           |

###### Returns

`number`

A pseudo-random integer on [0, `n`)

###### Throws

`RangeError` if `n` is not at positive integer.

##### random()

> **random**(): `number`

###### Returns

`number`

Pseudo-random (uniform) number on the interval [0.0, 1.0)

##### seed()

> **seed**(`seed`): `this`

Seed the random generator

###### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `seed`    | `string` \| `number` |

###### Returns

`this`

##### str()

> **str**(`n`): `string`

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `n`       | `number` |

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

> **randomArray**(`n`, `generator`): `number`[]

Returns an array with psudo-random standard uniform elements.

#### Parameters

| Parameter   | Type                                  | Description                       |
| ----------- | ------------------------------------- | --------------------------------- |
| `n`         | `number`                              | Length of array.                  |
| `generator` | [`RandomGenerator`](#randomgenerator) | Seed for random number generator. |

#### Returns

`number`[]

Pseudo-random (uniform) array with elements on the interval `[0.0, 1.0)`.

---

### randomFloat()

> **randomFloat**(`generator`): `number`

#### Parameters

| Parameter   | Type                                  |
| ----------- | ------------------------------------- |
| `generator` | [`RandomGenerator`](#randomgenerator) |

#### Returns

`number`

Pseudo-random (uniform) number on the interval `[0.0, 1.0)`

---

### randomFloatOpen()

> **randomFloatOpen**(`generator`): `number`

#### Parameters

| Parameter   | Type                                  |
| ----------- | ------------------------------------- |
| `generator` | [`RandomGenerator`](#randomgenerator) |

#### Returns

`number`

Pseudo-random (uniform) number o nthe interval `(0.0, 1.0)`

---

### randomInt()

> **randomInt**(`n`, `generator`): `number`

#### Parameters

| Parameter   | Type                                  | Default value |
| ----------- | ------------------------------------- | ------------- |
| `n`         | `number`                              | `1`           |
| `generator` | [`RandomGenerator`](#randomgenerator) | `...`         |

#### Returns

`number`

A pseudo-random integer on [0, `n`)

#### Throws

`RangeError` if `n` is not at positive integer.
