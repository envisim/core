[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/distributions](../README.md) / Poisson

# Class: Poisson

## theme_extends

- `Distribution`\<`ParamsRate`\>

## Constructors

### Constructor

> **new Poisson**(`rate`): `Poisson`

The Poisson distribution

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `rate`    | `number`   | `rateDefault`       |

#### Returns

`Poisson`

#### Example

```ts
const x = new Poisson(1);
x.pdf(2);
x.cdf(2);
x.quantile(0.5);
x.random(10);
```

#### Overrides

`Distribution<ParamsRate>.constructor`

## Properties

| Property                       | theme_modifier | theme_type | theme_default_value | theme_description |
| ------------------------------ | -------------- | ---------- | ------------------- | ----------------- |
| <a id="params"></a> `params`   | `protected`    | `number`   | `rateDefault`       | -                 |
| <a id="support"></a> `support` | `protected`    | `Interval` | `undefined`         | **`Internal`**    |

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

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `q`       | `number`   | `undefined`         |
| `eps`     | `number`   | `1e-12`             |

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

> **setParameters**(`rate`): `void`

Sets the parameters of the distribution

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `rate`    | `number`   | `rateDefault`       |

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
