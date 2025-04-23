[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/distributions](../README.md) / HyperbolicSecant

# Class: HyperbolicSecant

## theme_extends

- `Distribution`\<`undefined`\>

## Constructors

### Constructor

> **new HyperbolicSecant**(): `HyperbolicSecant`

The Hyperbolic Secant distribution

#### Returns

`HyperbolicSecant`

#### Example

```ts
const x = new HyperbolicSecant();
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

#### Overrides

`Distribution<undefined>.constructor`

## Properties

| Property                       | theme_modifier | theme_type  | theme_default_value | theme_description |
| ------------------------------ | -------------- | ----------- | ------------------- | ----------------- |
| <a id="params"></a> `params`   | `protected`    | `undefined` | `undefined`         | -                 |
| <a id="support"></a> `support` | `protected`    | `Interval`  | `undefined`         | **`Internal`**    |

## Methods

### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

#### Parameters

| Parameter | theme_type |
| --------- | ---------- |
| `x`       | `number`   |

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

#### Inherited from

`Distribution.random`

---

### setParameters()

> **setParameters**(): `void`

Sets the parameters of the distribution

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
