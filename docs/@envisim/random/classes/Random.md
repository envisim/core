[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/random](../README.md) / Random

# Class: Random

## Constructors

### Constructor

> **new Random**(`seed?`): `Random`

Returns an instance of Random. TS/class implementation of Uheprng.

#### Parameters

| Parameter | theme_type           | theme_description                 |
| --------- | -------------------- | --------------------------------- |
| `seed?`   | `string` \| `number` | Seed for random number generator. |

#### Returns

`Random`

Uheprng

#### See

[grc.com/otg/uheprng.htm](https://www.grc.com/otg/uheprng.htm)

#### Example

```ts
const rand = new Random("selectrandom");
const a = rand.float();
const b = rand.float();
const c = rand.seed("selectrandom").float();
console.log(a === b, a === c); // false, true
```

## Methods

### addEntropy()

> **addEntropy**(...`args`): `this`

Adds entropy to Uheprng.

#### Parameters

| Parameter | theme_type               |
| --------- | ------------------------ |
| ...`args` | `number`[] \| `string`[] |

#### Returns

`this`

---

### cleanString()

> **cleanString**(`inStr`): `string`

**`Internal`**

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `inStr`   | `string`   |

#### Returns

`string`

---

### float()

> **float**(): `number`

#### Returns

`number`

---

### floatArray()

> **floatArray**(`n`): `number`[]

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `n`       | `number`   |

#### Returns

`number`[]

An array of (uniform) numbers on the interval `[0.0, 1.0)`

---

### floate()

> **floate**(): `number`

#### Returns

`number`

Pseudo-random (uniform) number o nthe interval `(0.0, 1.0)`

---

### hashString()

> **hashString**(`inStr`): `this`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `inStr`   | `string`   |

#### Returns

`this`

---

### initState()

> **initState**(): `this`

Initializes state

#### Returns

`this`

---

### intn()

> **intn**(`n`): `number`

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `n`       | `number`   | `1`                 |

#### Returns

`number`

A pseudo-random integer on [0, `n`)

#### Throws

`RangeError` if `n` is not at positive integer.

---

### random()

> **random**(): `number`

#### Returns

`number`

Pseudo-random (uniform) number on the interval [0.0, 1.0)

---

### seed()

> **seed**(`seed`): `this`

Seed the random generator

#### Parameters

| Parameter | theme_type           |
| --------- | -------------------- |
| `seed`    | `string` \| `number` |

#### Returns

`this`

---

### str()

> **str**(`n`): `string`

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `n`       | `number`   |

#### Returns

`string`

A pseudo-random string of `n` printable characters ranging from
`chr(33)` to `chr(126)` inclusive.
