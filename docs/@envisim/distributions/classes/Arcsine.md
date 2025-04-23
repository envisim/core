[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/distributions](../README.md) / Arcsine

# Class: Arcsine

## theme_extends

- `Distribution`\<`ParamsBound`\>

## Constructors

### Constructor

> **new Arcsine**(`a`, `b`): `Arcsine`

The Arcsine distribution

#### Parameters

| Parameter | theme_type | theme_default_value |
| --------- | ---------- | ------------------- |
| `a`       | `number`   | `boundDefault.a`    |
| `b`       | `number`   | `boundDefault.b`    |

#### Returns

`Arcsine`

#### Example

```ts
const x = new Arcsine(1, 1);
x.pdf(0.1);
x.cdf(0.1);
```

#### Overrides

`Distribution<ParamsBound>.constructor`

## Properties

| Property                       | theme_modifier | theme_type | theme_description |
| ------------------------------ | -------------- | ---------- | ----------------- |
| <a id="params"></a> `params`   | `protected`    | `object`   | -                 |
| `params.a`                     | `public`       | `number`   | Left bound        |
| `params.b`                     | `public`       | `number`   | Right bound       |
| <a id="range"></a> `range`     | `protected`    | `number`   | **`Internal`**    |
| <a id="support"></a> `support` | `protected`    | `Interval` | **`Internal`**    |

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

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

#### Parameters

| Parameter  | theme_type                          | theme_description |
| ---------- | ----------------------------------- | ----------------- |
| `params`   | \{ `a`: `number`; `b`: `number`; \} | -                 |
| `params.a` | `number`                            | Left bound        |
| `params.b` | `number`                            | Right bound       |

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
