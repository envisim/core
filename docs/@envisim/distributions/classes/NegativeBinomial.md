[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/distributions](../README.md) / NegativeBinomial

# Class: NegativeBinomial

## theme_extends

- `Distribution`\<`ParamsBinomial`\>

## Constructors

### Constructor

> **new NegativeBinomial**(`n`, `p`): `NegativeBinomial`

The Negative Binomial distribution

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `n`       | `number`   | `binomialDefault.n` |
| `p`       | `number`   | `binomialDefault.p` |

#### Returns

`NegativeBinomial`

#### Example

```ts
const x = new NegativeBinomial(10, 0.5);
x.pdf(5);
x.cdf(5);
x.quantile(0.5);
x.random(10);
```

#### Overrides

`Distribution<ParamsBinomial>.constructor`

## Properties

| Property                       | theme_modifier | theme_type       | theme_description |
| ------------------------------ | -------------- | ---------------- | ----------------- |
| <a id="params"></a> `params`   | `protected`    | `ParamsBinomial` | -                 |
| <a id="support"></a> `support` | `protected`    | `Interval`       | **`Internal`**    |

## Methods

### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `x`       | `number`   | `undefined`         |
| `eps`     | `number`   | `1e-20`             |

#### Returns

`number`

#### Overrides

`Distribution.cdf`

---

### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `x`       | `number`   |

#### Returns

`number`

#### Inherited from

`Distribution.cornishFisherExpansion`

---

### mean()

> **mean**(): `number`

the mean value

#### Returns

`number`

#### Overrides

`Distribution.mean`

---

### mode()

> **mode**(): `number`

#### Returns

`number`

the mode

#### Overrides

`Distribution.mode`

---

### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `x`       | `number`   |

#### Returns

`number`

#### Overrides

`Distribution.pdf`

---

### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `q`       | `number`   | `undefined`         |
| `eps`     | `number`   | `1e-20`             |

#### Returns

`number`

#### Overrides

`Distribution.quantile`

---

### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

#### Parameters

| Parameter  | theme_type |
| ---------- | ---------- |
| `q`        | `number`   |
| `startK`   | `number`   |
| `startCDF` | `number`   |

#### Returns

`number`

#### Inherited from

`Distribution.quantileCF`

---

### random()

> **random**(`n`, `__namedParameters`): `number`[]

Generate random numbers from the distribution.

#### Parameters

| Parameter           | theme_type                                        | theme_default_value | theme_description                          |
| ------------------- | ------------------------------------------------- | ------------------- | ------------------------------------------ |
| `n`                 | `number`                                          | `1`                 | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](../interfaces/RandomOptions.md) | `{}`                | -                                          |

#### Returns

`number`[]

#### Overrides

`Distribution.random`

---

### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

#### Parameters

| Parameter | theme_type       |
| --------- | ---------------- |
| `params`  | `ParamsBinomial` |

#### Returns

`void`

#### Overrides

`Distribution.setParameters`

---

### skewness()

> **skewness**(): `number`

#### Returns

`number`

the skewness

#### Overrides

`Distribution.skewness`

---

### standardDeviation()

> **standardDeviation**(): `number`

#### Returns

`number`

the square root of the variance

#### Inherited from

`Distribution.standardDeviation`

---

### variance()

> **variance**(): `number`

the variance

#### Returns

`number`

#### Overrides

`Distribution.variance`
