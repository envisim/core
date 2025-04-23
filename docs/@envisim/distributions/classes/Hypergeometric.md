[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/distributions](../README.md) / Hypergeometric

# Class: Hypergeometric

## theme_extends

- `Distribution`\<`ParamsHypergeometric`\>

## Constructors

### Constructor

> **new Hypergeometric**(`N`, `K`, `n`): `Hypergeometric`

The Hypergeometric distribution

#### Parameters

| Parameter | theme_type | theme_default_value       |
| --------- | ---------- | ------------------------- |
| `N`       | `number`   | `hypergeometricDefault.N` |
| `K`       | `number`   | `hypergeometricDefault.K` |
| `n`       | `number`   | `hypergeometricDefault.n` |

#### Returns

`Hypergeometric`

#### Example

```ts
const x = new Hypergeometric(10, 5, 2);
x.pdf(1);
x.cdf(2);
x.quantile(0.5);
x.random(10);
```

#### Overrides

`Distribution<ParamsHypergeometric>.constructor`

## Properties

| Property                       | theme_modifier | theme_type             | theme_description |
| ------------------------------ | -------------- | ---------------------- | ----------------- |
| <a id="lbc"></a> `lbc`         | `protected`    | `number`               | -                 |
| <a id="params"></a> `params`   | `protected`    | `ParamsHypergeometric` | -                 |
| <a id="support"></a> `support` | `protected`    | `Interval`             | **`Internal`**    |

## Methods

### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `x`       | `number`   | `undefined`         |
| `eps`     | `number`   | `1e-12`             |

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

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `q`       | `number`   |

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

| Parameter           | theme_type                                        | theme_default_value    | theme_description                          |
| ------------------- | ------------------------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](../interfaces/RandomOptions.md) | `randomOptionsDefault` | -                                          |

#### Returns

`number`[]

#### Overrides

`Distribution.random`

---

### setParameters()

> **setParameters**(`__namedParameters`): `void`

Sets the parameters of the distribution

#### Parameters

| Parameter           | theme_type             |
| ------------------- | ---------------------- |
| `__namedParameters` | `ParamsHypergeometric` |

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
