[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/distributions](../README.md) / Beta

# Class: Beta

## theme_extends

- `Distribution`\<`ParamsBeta`\>

## Constructors

### Constructor

> **new Beta**(`alpha`, `beta`): `Beta`

The Beta distribution

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `alpha`   | `number`   | `betaDefault.alpha` |
| `beta`    | `number`   | `betaDefault.beta`  |

#### Returns

`Beta`

#### Example

```ts
const x = new Beta(1, 1);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.1);
x.random(10);
```

#### Overrides

`Distribution<ParamsBeta>.constructor`

## Properties

| Property                       | theme_modifier | theme_type   | theme_description |
| ------------------------------ | -------------- | ------------ | ----------------- |
| <a id="lbf"></a> `lbf`         | `protected`    | `number`     | -                 |
| <a id="params"></a> `params`   | `protected`    | `ParamsBeta` | -                 |
| <a id="support"></a> `support` | `protected`    | `Interval`   | **`Internal`**    |

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

| Parameter | theme_type   |
| --------- | ------------ |
| `params`  | `ParamsBeta` |

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
