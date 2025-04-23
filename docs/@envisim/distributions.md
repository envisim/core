[**Documentation**](../README.md)

---

[Documentation](../README.md) / @envisim/distributions

# @envisim/distributions

## Contents

- [Classes](#classes)
  - [Arcsine](#arcsine)
  - [BenfordMantissa](#benfordmantissa)
  - [Bernoulli](#bernoulli)
  - [Beta](#beta)
  - [BetaPrime](#betaprime)
  - [Binomial](#binomial)
  - [Cauchy](#cauchy)
  - [ChiSquared](#chisquared)
  - [Exponential](#exponential)
  - [ExtremeValue](#extremevalue)
  - [FoldedNormal](#foldednormal)
  - [FRatio](#fratio)
  - [Gamma](#gamma)
  - [Geometric](#geometric)
  - [HyperbolicSecant](#hyperbolicsecant)
  - [Hypergeometric](#hypergeometric)
  - [Laplace](#laplace)
  - [Logarithmic](#logarithmic)
  - [Logistic](#logistic)
  - [LogLogistic](#loglogistic)
  - [LogNormal](#lognormal)
  - [NegativeBinomial](#negativebinomial)
  - [Normal](#normal)
  - [Pareto](#pareto)
  - [Poisson](#poisson)
  - [Semicircle](#semicircle)
  - [StudentsT](#studentst)
  - [Triangular](#triangular)
  - [Uniform](#uniform)
  - [UniformDiscrete](#uniformdiscrete)
  - [UQuadratic](#uquadratic)
  - [Weibull](#weibull)
- [Interfaces](#interfaces)
  - [RandomOptions](#randomoptions)

## Classes

### Arcsine

#### Extends

- `Distribution`<`ParamsBound`>

#### Constructors

##### Constructor

> **new Arcsine**(`a`, `b`): [`Arcsine`](#arcsine)

The Arcsine distribution

###### Parameters

| Parameter | Type     | Default value    |
| --------- | -------- | ---------------- |
| `a`       | `number` | `boundDefault.a` |
| `b`       | `number` | `boundDefault.b` |

###### Returns

[`Arcsine`](#arcsine)

###### Example

```ts
const x = new Arcsine(1, 1);
x.pdf(0.1);
x.cdf(0.1);
```

###### Overrides

`Distribution<ParamsBound>.constructor`

#### Properties

| Property                       | Modifier    | Type                              | Description    |
| ------------------------------ | ----------- | --------------------------------- | -------------- |
| <a id="params"></a> `params`   | `protected` | { `a`: `number`; `b`: `number`; } | -              |
| `params.a`                     | `public`    | `number`                          | Left bound     |
| `params.b`                     | `public`    | `number`                          | Right bound    |
| <a id="range"></a> `range`     | `protected` | `number`                          | **`Internal`** |
| <a id="support"></a> `support` | `protected` | `Interval`                        | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter  | Type                              | Description |
| ---------- | --------------------------------- | ----------- |
| `params`   | { `a`: `number`; `b`: `number`; } | -           |
| `params.a` | `number`                          | Left bound  |
| `params.b` | `number`                          | Right bound |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### BenfordMantissa

#### Extends

- `Distribution`<`ParamsBenfordMantissa`>

#### Constructors

##### Constructor

> **new BenfordMantissa**(`base`): [`BenfordMantissa`](#benfordmantissa)

The Benford Mantissa distribution

###### Parameters

| Parameter | Type     | Default value            |
| --------- | -------- | ------------------------ |
| `base`    | `number` | `benfordMantissaDefault` |

###### Returns

[`BenfordMantissa`](#benfordmantissa)

###### Example

```ts
const x = new BenfordMantissa(1);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.1);
x.random(10);
```

###### Overrides

`Distribution<ParamsBenfordMantissa>.constructor`

#### Properties

| Property                         | Modifier    | Type       | Default value            | Description    |
| -------------------------------- | ----------- | ---------- | ------------------------ | -------------- |
| <a id="logbase"></a> `logBase`   | `protected` | `number`   | `undefined`              | -              |
| <a id="params-1"></a> `params`   | `protected` | `number`   | `benfordMantissaDefault` | -              |
| <a id="support-1"></a> `support` | `protected` | `Interval` | `undefined`              | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### setParameters()

> **setParameters**(`base`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type     | Default value            |
| --------- | -------- | ------------------------ |
| `base`    | `number` | `benfordMantissaDefault` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### ~~skewness()~~

> **skewness**(): `number`

###### Returns

`number`

###### Deprecated

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Bernoulli

#### Extends

- `Distribution`<`ParamsBernoulli`>

#### Constructors

##### Constructor

> **new Bernoulli**(`p`): [`Bernoulli`](#bernoulli)

The Bernoulli distribution

###### Parameters

| Parameter | Type     | Default value      |
| --------- | -------- | ------------------ |
| `p`       | `number` | `bernoulliDefault` |

###### Returns

[`Bernoulli`](#bernoulli)

###### Example

```ts
const x = new Bernoulli(0.9);
x.pdf(1);
x.quantile(0.5);
```

###### Overrides

`Distribution<ParamsBernoulli>.constructor`

#### Properties

| Property                         | Modifier    | Type       | Default value      | Description    |
| -------------------------------- | ----------- | ---------- | ------------------ | -------------- |
| <a id="params-2"></a> `params`   | `protected` | `number`   | `bernoulliDefault` | -              |
| <a id="support-2"></a> `support` | `protected` | `Interval` | `undefined`        | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### setParameters()

> **setParameters**(`p`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type     | Default value      |
| --------- | -------- | ------------------ |
| `p`       | `number` | `bernoulliDefault` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Beta

#### Extends

- `Distribution`<`ParamsBeta`>

#### Constructors

##### Constructor

> **new Beta**(`alpha`, `beta`): [`Beta`](#beta)

The Beta distribution

###### Parameters

| Parameter | Type     | Default value       |
| --------- | -------- | ------------------- |
| `alpha`   | `number` | `betaDefault.alpha` |
| `beta`    | `number` | `betaDefault.beta`  |

###### Returns

[`Beta`](#beta)

###### Example

```ts
const x = new Beta(1, 1);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.1);
x.random(10);
```

###### Overrides

`Distribution<ParamsBeta>.constructor`

#### Properties

| Property                         | Modifier    | Type         | Description    |
| -------------------------------- | ----------- | ------------ | -------------- |
| <a id="lbf"></a> `lbf`           | `protected` | `number`     | -              |
| <a id="params-3"></a> `params`   | `protected` | `ParamsBeta` | -              |
| <a id="support-3"></a> `support` | `protected` | `Interval`   | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `x`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-20`       |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `q`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-20`       |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value | Description                                |
| ------------------- | --------------------------------- | ------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`           | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `{}`          | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type         |
| --------- | ------------ |
| `params`  | `ParamsBeta` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### BetaPrime

#### Extends

- `Distribution`<`ParamsBeta`>

#### Constructors

##### Constructor

> **new BetaPrime**(`alpha`, `beta`): [`BetaPrime`](#betaprime)

The Beta Prime distribution

###### Parameters

| Parameter | Type     | Default value       |
| --------- | -------- | ------------------- |
| `alpha`   | `number` | `betaDefault.alpha` |
| `beta`    | `number` | `betaDefault.beta`  |

###### Returns

[`BetaPrime`](#betaprime)

###### Example

```ts
const x = new BetaPrime(1, 1);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.1);
x.random(10);
```

###### Overrides

`Distribution<ParamsBeta>.constructor`

#### Properties

| Property                         | Modifier    | Type         | Description    |
| -------------------------------- | ----------- | ------------ | -------------- |
| <a id="lbf-1"></a> `lbf`         | `protected` | `number`     | -              |
| <a id="params-4"></a> `params`   | `protected` | `ParamsBeta` | -              |
| <a id="support-4"></a> `support` | `protected` | `Interval`   | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `x`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-20`       |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `q`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-20`       |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value | Description                                |
| ------------------- | --------------------------------- | ------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`           | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `{}`          | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type         |
| --------- | ------------ |
| `params`  | `ParamsBeta` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Binomial

#### Extends

- `Distribution`<`ParamsBinomial`>

#### Constructors

##### Constructor

> **new Binomial**(`n`, `p`): [`Binomial`](#binomial)

The Binomial distribution

###### Parameters

| Parameter | Type     | Default value       |
| --------- | -------- | ------------------- |
| `n`       | `number` | `binomialDefault.n` |
| `p`       | `number` | `binomialDefault.p` |

###### Returns

[`Binomial`](#binomial)

###### Example

```ts
const params = { n: 10, p: 0.5 };
const x = new Binomial(10, 0.5);
x.pdf(5);
x.cdf(5);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsBinomial>.constructor`

#### Properties

| Property                         | Modifier    | Type             | Description    |
| -------------------------------- | ----------- | ---------------- | -------------- |
| <a id="params-5"></a> `params`   | `protected` | `ParamsBinomial` | -              |
| <a id="support-5"></a> `support` | `protected` | `Interval`       | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `x`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-20`       |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `q`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-20`       |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value | Description                                |
| ------------------- | --------------------------------- | ------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`           | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `{}`          | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type             |
| --------- | ---------------- |
| `params`  | `ParamsBinomial` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Cauchy

#### Extends

- `Distribution`<`ParamsLocationScale`>

#### Constructors

##### Constructor

> **new Cauchy**(`location`, `scale`): [`Cauchy`](#cauchy)

The Cauchy distribution

###### Parameters

| Parameter  | Type     | Default value                   |
| ---------- | -------- | ------------------------------- |
| `location` | `number` | `locationScaleDefault.location` |
| `scale`    | `number` | `locationScaleDefault.scale`    |

###### Returns

[`Cauchy`](#cauchy)

###### Example

```ts
const x = new Cauchy(1, 1);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.1);
x.random(10);
```

###### Overrides

`Distribution<ParamsLocationScale>.constructor`

#### Properties

| Property                         | Modifier    | Type                  | Description    |
| -------------------------------- | ----------- | --------------------- | -------------- |
| <a id="params-6"></a> `params`   | `protected` | `ParamsLocationScale` | -              |
| <a id="support-6"></a> `support` | `protected` | `Interval`            | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type                  |
| --------- | --------------------- |
| `params`  | `ParamsLocationScale` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### ChiSquared

#### Extends

- `Distribution`<`ParamsDegreesOfFreedom`>

#### Constructors

##### Constructor

> **new ChiSquared**(`df`): [`ChiSquared`](#chisquared)

The Chi-squared distribution

###### Parameters

| Parameter | Type     | Default value             |
| --------- | -------- | ------------------------- |
| `df`      | `number` | `degreesOfFreedomDefault` |

###### Returns

[`ChiSquared`](#chisquared)

###### Example

```ts
const x = new ChiSquared(10);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsDegreesOfFreedom>.constructor`

#### Properties

| Property                         | Modifier    | Type       | Default value             | Description    |
| -------------------------------- | ----------- | ---------- | ------------------------- | -------------- |
| <a id="params-7"></a> `params`   | `protected` | `number`   | `degreesOfFreedomDefault` | -              |
| <a id="support-7"></a> `support` | `protected` | `Interval` | `undefined`               | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `x`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-12`       |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |
| `eps`     | `1e-12`  |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value | Description                                |
| ------------------- | --------------------------------- | ------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`           | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `{}`          | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`df`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type     | Default value             |
| --------- | -------- | ------------------------- |
| `df`      | `number` | `degreesOfFreedomDefault` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Exponential

#### Extends

- `Distribution`<`ParamsRate`>

#### Constructors

##### Constructor

> **new Exponential**(`rate`): [`Exponential`](#exponential)

The Exponential distribution

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `rate`    | `number` | `rateDefault` |

###### Returns

[`Exponential`](#exponential)

###### Example

```ts
const x = new Exponential(1);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsRate>.constructor`

#### Properties

| Property                         | Modifier    | Type       | Default value | Description    |
| -------------------------------- | ----------- | ---------- | ------------- | -------------- |
| <a id="params-8"></a> `params`   | `protected` | `number`   | `rateDefault` | -              |
| <a id="support-8"></a> `support` | `protected` | `Interval` | `undefined`   | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`rate`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `rate`    | `number` | `rateDefault` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### ExtremeValue

#### Extends

- `Distribution`<`ParamsLocationScale`>

#### Constructors

##### Constructor

> **new ExtremeValue**(`location`, `scale`): [`ExtremeValue`](#extremevalue)

The Extreme Value distribution

###### Parameters

| Parameter  | Type     | Default value                   |
| ---------- | -------- | ------------------------------- |
| `location` | `number` | `locationScaleDefault.location` |
| `scale`    | `number` | `locationScaleDefault.scale`    |

###### Returns

[`ExtremeValue`](#extremevalue)

###### Example

```ts
const x = new ExtremeValue(0, 1);
x.pdf(1);
x.quantile(0.5);
```

###### Overrides

`Distribution<ParamsLocationScale>.constructor`

#### Properties

| Property                         | Modifier    | Type                  | Description    |
| -------------------------------- | ----------- | --------------------- | -------------- |
| <a id="params-9"></a> `params`   | `protected` | `ParamsLocationScale` | -              |
| <a id="support-9"></a> `support` | `protected` | `Interval`            | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type                  |
| --------- | --------------------- |
| `params`  | `ParamsLocationScale` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### FoldedNormal

#### Extends

- `Distribution`<`ParamsNormal`>

#### Constructors

##### Constructor

> **new FoldedNormal**(`mu`, `sigma`): [`FoldedNormal`](#foldednormal)

The Folded-Normal distribution

###### Parameters

| Parameter | Type     | Default value         |
| --------- | -------- | --------------------- |
| `mu`      | `number` | `normalDefault.mu`    |
| `sigma`   | `number` | `normalDefault.sigma` |

###### Returns

[`FoldedNormal`](#foldednormal)

###### Example

```ts
const x = new FoldedNormal(0, 1);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsNormal>.constructor`

#### Properties

| Property                          | Modifier    | Type           | Description    |
| --------------------------------- | ----------- | -------------- | -------------- |
| <a id="params-10"></a> `params`   | `protected` | `ParamsNormal` | -              |
| <a id="support-10"></a> `support` | `protected` | `Interval`     | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `q`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-12`       |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value | Description                                |
| ------------------- | --------------------------------- | ------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`           | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `{}`          | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type           |
| --------- | -------------- |
| `params`  | `ParamsNormal` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### FRatio

#### Extends

- `Distribution`<`ParamsDegreesOfFreedom2`>

#### Constructors

##### Constructor

> **new FRatio**(`df1`, `df2`): [`FRatio`](#fratio)

The F distribution

###### Parameters

| Parameter | Type     | Default value             |
| --------- | -------- | ------------------------- |
| `df1`     | `number` | `degreesOfFreedomDefault` |
| `df2`     | `number` | `degreesOfFreedomDefault` |

###### Returns

[`FRatio`](#fratio)

###### Example

```ts
const x = new FRatio(10, 20);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsDegreesOfFreedom2>.constructor`

#### Properties

| Property                          | Modifier    | Type                      | Description    |
| --------------------------------- | ----------- | ------------------------- | -------------- |
| <a id="params-11"></a> `params`   | `protected` | `ParamsDegreesOfFreedom2` | -              |
| <a id="support-11"></a> `support` | `protected` | `Interval`                | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `x`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-20`       |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value | Description                                |
| ------------------- | --------------------------------- | ------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`           | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `{}`          | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type                      |
| --------- | ------------------------- |
| `params`  | `ParamsDegreesOfFreedom2` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Gamma

#### Extends

- `Distribution`<`ParamsShapeScale`>

#### Constructors

##### Constructor

> **new Gamma**(`shape`, `scale`): [`Gamma`](#gamma)

The Gamma distribution

###### Parameters

| Parameter | Type     | Default value             |
| --------- | -------- | ------------------------- |
| `shape`   | `number` | `shapeScaleDefault.shape` |
| `scale`   | `number` | `shapeScaleDefault.scale` |

###### Returns

[`Gamma`](#gamma)

###### Example

```ts
const x = new ChiSquared(1, 1);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsShapeScale>.constructor`

#### Properties

| Property                          | Modifier    | Type               | Description    |
| --------------------------------- | ----------- | ------------------ | -------------- |
| <a id="lgf"></a> `lgf`            | `protected` | `number`           | -              |
| <a id="params-12"></a> `params`   | `protected` | `ParamsShapeScale` | -              |
| <a id="support-12"></a> `support` | `protected` | `Interval`         | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `x`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-12`       |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `q`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-12`       |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value | Description                                |
| ------------------- | --------------------------------- | ------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`           | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `{}`          | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type               |
| --------- | ------------------ |
| `params`  | `ParamsShapeScale` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Geometric

#### Extends

- `Distribution`<`ParamsBernoulli`>

#### Constructors

##### Constructor

> **new Geometric**(`p`): [`Geometric`](#geometric)

The Geometric distribution

###### Parameters

| Parameter | Type     | Default value      |
| --------- | -------- | ------------------ |
| `p`       | `number` | `bernoulliDefault` |

###### Returns

[`Geometric`](#geometric)

###### Example

```ts
const x = new Geometric(0.8);
x.pdf(1);
x.cdf(1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsBernoulli>.constructor`

#### Properties

| Property                          | Modifier    | Type       | Default value      | Description    |
| --------------------------------- | ----------- | ---------- | ------------------ | -------------- |
| <a id="logq"></a> `logq`          | `protected` | `number`   | `undefined`        | -              |
| <a id="params-13"></a> `params`   | `protected` | `number`   | `bernoulliDefault` | -              |
| <a id="support-13"></a> `support` | `protected` | `Interval` | `undefined`        | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### setParameters()

> **setParameters**(`p`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type     | Default value      |
| --------- | -------- | ------------------ |
| `p`       | `number` | `bernoulliDefault` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### HyperbolicSecant

#### Extends

- `Distribution`<`undefined`>

#### Constructors

##### Constructor

> **new HyperbolicSecant**(): [`HyperbolicSecant`](#hyperbolicsecant)

The Hyperbolic Secant distribution

###### Returns

[`HyperbolicSecant`](#hyperbolicsecant)

###### Example

```ts
const x = new HyperbolicSecant();
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<undefined>.constructor`

#### Properties

| Property                          | Modifier    | Type        | Default value | Description    |
| --------------------------------- | ----------- | ----------- | ------------- | -------------- |
| <a id="params-14"></a> `params`   | `protected` | `undefined` | `undefined`   | -              |
| <a id="support-14"></a> `support` | `protected` | `Interval`  | `undefined`   | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### setParameters()

> **setParameters**(): `void`

Sets the parameters of the distribution

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Hypergeometric

#### Extends

- `Distribution`<`ParamsHypergeometric`>

#### Constructors

##### Constructor

> **new Hypergeometric**(`N`, `K`, `n`): [`Hypergeometric`](#hypergeometric)

The Hypergeometric distribution

###### Parameters

| Parameter | Type     | Default value             |
| --------- | -------- | ------------------------- |
| `N`       | `number` | `hypergeometricDefault.N` |
| `K`       | `number` | `hypergeometricDefault.K` |
| `n`       | `number` | `hypergeometricDefault.n` |

###### Returns

[`Hypergeometric`](#hypergeometric)

###### Example

```ts
const x = new Hypergeometric(10, 5, 2);
x.pdf(1);
x.cdf(2);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsHypergeometric>.constructor`

#### Properties

| Property                          | Modifier    | Type                   | Description    |
| --------------------------------- | ----------- | ---------------------- | -------------- |
| <a id="lbc"></a> `lbc`            | `protected` | `number`               | -              |
| <a id="params-15"></a> `params`   | `protected` | `ParamsHypergeometric` | -              |
| <a id="support-15"></a> `support` | `protected` | `Interval`             | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `x`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-12`       |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`__namedParameters`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter           | Type                   |
| ------------------- | ---------------------- |
| `__namedParameters` | `ParamsHypergeometric` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Laplace

#### Extends

- `Distribution`<`ParamsLocationScale`>

#### Constructors

##### Constructor

> **new Laplace**(`location`, `scale`): [`Laplace`](#laplace)

The Laplace distribution

###### Parameters

| Parameter  | Type     | Default value                   |
| ---------- | -------- | ------------------------------- |
| `location` | `number` | `locationScaleDefault.location` |
| `scale`    | `number` | `locationScaleDefault.scale`    |

###### Returns

[`Laplace`](#laplace)

###### Example

```ts
const x = new Laplace(1, 1);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsLocationScale>.constructor`

#### Properties

| Property                          | Modifier    | Type                  | Description    |
| --------------------------------- | ----------- | --------------------- | -------------- |
| <a id="params-16"></a> `params`   | `protected` | `ParamsLocationScale` | -              |
| <a id="support-16"></a> `support` | `protected` | `Interval`            | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type                  |
| --------- | --------------------- |
| `params`  | `ParamsLocationScale` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Logarithmic

#### Extends

- `Distribution`<`ParamsBernoulli`>

#### Constructors

##### Constructor

> **new Logarithmic**(`p`): [`Logarithmic`](#logarithmic)

The Logarithmic distribution

###### Parameters

| Parameter | Type     | Default value      |
| --------- | -------- | ------------------ |
| `p`       | `number` | `bernoulliDefault` |

###### Returns

[`Logarithmic`](#logarithmic)

###### Example

```ts
const x = new Logarithmic(0.3);
x.pdf(4);
x.cdf(4);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsBernoulli>.constructor`

#### Properties

| Property                          | Modifier    | Type       | Default value      | Description    |
| --------------------------------- | ----------- | ---------- | ------------------ | -------------- |
| <a id="logq-1"></a> `logq`        | `protected` | `number`   | `undefined`        | -              |
| <a id="params-17"></a> `params`   | `protected` | `number`   | `bernoulliDefault` | -              |
| <a id="support-17"></a> `support` | `protected` | `Interval` | `undefined`        | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `x`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-20`       |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`p`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type     | Default value      |
| --------- | -------- | ------------------ |
| `p`       | `number` | `bernoulliDefault` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Logistic

#### Extends

- `Distribution`<`ParamsLocationScale`>

#### Constructors

##### Constructor

> **new Logistic**(`location`, `scale`): [`Logistic`](#logistic)

The Logistic distribution

###### Parameters

| Parameter  | Type     | Default value                   |
| ---------- | -------- | ------------------------------- |
| `location` | `number` | `locationScaleDefault.location` |
| `scale`    | `number` | `locationScaleDefault.scale`    |

###### Returns

[`Logistic`](#logistic)

###### Example

```ts
const x = new Logistic(2, 1);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsLocationScale>.constructor`

#### Properties

| Property                          | Modifier    | Type                  | Description    |
| --------------------------------- | ----------- | --------------------- | -------------- |
| <a id="params-18"></a> `params`   | `protected` | `ParamsLocationScale` | -              |
| <a id="support-18"></a> `support` | `protected` | `Interval`            | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type                  |
| --------- | --------------------- |
| `params`  | `ParamsLocationScale` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### LogLogistic

#### Extends

- `Distribution`<`ParamsShapeScale`>

#### Constructors

##### Constructor

> **new LogLogistic**(`scale`, `shape`): [`LogLogistic`](#loglogistic)

The Log-Logistic distribution

###### Parameters

| Parameter | Type     | Default value             |
| --------- | -------- | ------------------------- |
| `scale`   | `number` | `shapeScaleDefault.scale` |
| `shape`   | `number` | `shapeScaleDefault.shape` |

###### Returns

[`LogLogistic`](#loglogistic)

###### Example

```ts
const x = new LogLogistic(1, 2);
x.pdf(0.1);
x.cdf(0.1);
x.quantile([0.1, 0.5]);
x.random(10);
```

###### Overrides

`Distribution<ParamsShapeScale>.constructor`

#### Properties

| Property                          | Modifier    | Type               | Description    |
| --------------------------------- | ----------- | ------------------ | -------------- |
| <a id="params-19"></a> `params`   | `protected` | `ParamsShapeScale` | -              |
| <a id="support-19"></a> `support` | `protected` | `Interval`         | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type               |
| --------- | ------------------ |
| `params`  | `ParamsShapeScale` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### ~~skewness()~~

> **skewness**(): `number`

###### Returns

`number`

###### Deprecated

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### LogNormal

#### Extends

- `Distribution`<`ParamsNormal`>

#### Constructors

##### Constructor

> **new LogNormal**(`mu`, `sigma`): [`LogNormal`](#lognormal)

The Log-Normal distribution

###### Parameters

| Parameter | Type     | Default value         |
| --------- | -------- | --------------------- |
| `mu`      | `number` | `normalDefault.mu`    |
| `sigma`   | `number` | `normalDefault.sigma` |

###### Returns

[`LogNormal`](#lognormal)

###### Example

```ts
const x = new LogNormal(0, 1);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsNormal>.constructor`

#### Properties

| Property                          | Modifier    | Type           | Description    |
| --------------------------------- | ----------- | -------------- | -------------- |
| <a id="params-20"></a> `params`   | `protected` | `ParamsNormal` | -              |
| <a id="support-20"></a> `support` | `protected` | `Interval`     | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value | Description                                |
| ------------------- | --------------------------------- | ------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`           | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `{}`          | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type           |
| --------- | -------------- |
| `params`  | `ParamsNormal` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### NegativeBinomial

#### Extends

- `Distribution`<`ParamsBinomial`>

#### Constructors

##### Constructor

> **new NegativeBinomial**(`n`, `p`): [`NegativeBinomial`](#negativebinomial)

The Negative Binomial distribution

###### Parameters

| Parameter | Type     | Default value       |
| --------- | -------- | ------------------- |
| `n`       | `number` | `binomialDefault.n` |
| `p`       | `number` | `binomialDefault.p` |

###### Returns

[`NegativeBinomial`](#negativebinomial)

###### Example

```ts
const x = new NegativeBinomial(10, 0.5);
x.pdf(5);
x.cdf(5);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsBinomial>.constructor`

#### Properties

| Property                          | Modifier    | Type             | Description    |
| --------------------------------- | ----------- | ---------------- | -------------- |
| <a id="params-21"></a> `params`   | `protected` | `ParamsBinomial` | -              |
| <a id="support-21"></a> `support` | `protected` | `Interval`       | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `x`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-20`       |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `q`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-20`       |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value | Description                                |
| ------------------- | --------------------------------- | ------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`           | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `{}`          | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type             |
| --------- | ---------------- |
| `params`  | `ParamsBinomial` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Normal

#### Extends

- `Distribution`<`ParamsNormal`>

#### Constructors

##### Constructor

> **new Normal**(`mu`, `sigma`): [`Normal`](#normal)

The Normal distribution

###### Parameters

| Parameter | Type     | Default value         |
| --------- | -------- | --------------------- |
| `mu`      | `number` | `normalDefault.mu`    |
| `sigma`   | `number` | `normalDefault.sigma` |

###### Returns

[`Normal`](#normal)

###### Example

```ts
const x = new Normal(0, 1);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsNormal>.constructor`

#### Properties

| Property                          | Modifier    | Type           | Description    |
| --------------------------------- | ----------- | -------------- | -------------- |
| <a id="params-22"></a> `params`   | `protected` | `ParamsNormal` | -              |
| <a id="support-22"></a> `support` | `protected` | `Interval`     | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value | Description                                |
| ------------------- | --------------------------------- | ------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`           | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `{}`          | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type           |
| --------- | -------------- |
| `params`  | `ParamsNormal` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Pareto

#### Extends

- `Distribution`<`ParamsShapeScale`>

#### Constructors

##### Constructor

> **new Pareto**(`scale`, `shape`): [`Pareto`](#pareto)

The Pareto distribution

###### Parameters

| Parameter | Type     | Default value             |
| --------- | -------- | ------------------------- |
| `scale`   | `number` | `shapeScaleDefault.scale` |
| `shape`   | `number` | `shapeScaleDefault.shape` |

###### Returns

[`Pareto`](#pareto)

###### Example

```ts
const x = new Pareto(1, 2);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsShapeScale>.constructor`

#### Properties

| Property                          | Modifier    | Type               | Description    |
| --------------------------------- | ----------- | ------------------ | -------------- |
| <a id="params-23"></a> `params`   | `protected` | `ParamsShapeScale` | -              |
| <a id="support-23"></a> `support` | `protected` | `Interval`         | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type               |
| --------- | ------------------ |
| `params`  | `ParamsShapeScale` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Poisson

#### Extends

- `Distribution`<`ParamsRate`>

#### Constructors

##### Constructor

> **new Poisson**(`rate`): [`Poisson`](#poisson)

The Poisson distribution

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `rate`    | `number` | `rateDefault` |

###### Returns

[`Poisson`](#poisson)

###### Example

```ts
const x = new Poisson(1);
x.pdf(2);
x.cdf(2);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsRate>.constructor`

#### Properties

| Property                          | Modifier    | Type       | Default value | Description    |
| --------------------------------- | ----------- | ---------- | ------------- | -------------- |
| <a id="params-24"></a> `params`   | `protected` | `number`   | `rateDefault` | -              |
| <a id="support-24"></a> `support` | `protected` | `Interval` | `undefined`   | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `x`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-12`       |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `q`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-12`       |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`rate`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `rate`    | `number` | `rateDefault` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Semicircle

#### Extends

- `Distribution`<`ParamsRadius`>

#### Constructors

##### Constructor

> **new Semicircle**(`radius`): [`Semicircle`](#semicircle)

The Semicircle distribution

###### Parameters

| Parameter | Type     | Default value   |
| --------- | -------- | --------------- |
| `radius`  | `number` | `radiusDefault` |

###### Returns

[`Semicircle`](#semicircle)

###### Example

```ts
const x = new Semicircle(1);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsRadius>.constructor`

#### Properties

| Property                                   | Modifier    | Type       | Default value   | Description    |
| ------------------------------------------ | ----------- | ---------- | --------------- | -------------- |
| <a id="denom"></a> `denom`                 | `protected` | `number`   | `undefined`     | -              |
| <a id="params-25"></a> `params`            | `protected` | `number`   | `radiusDefault` | -              |
| <a id="radiussquared"></a> `radiusSquared` | `protected` | `number`   | `undefined`     | -              |
| <a id="support-25"></a> `support`          | `protected` | `Interval` | `undefined`     | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `q`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-20`       |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value | Description                                |
| ------------------- | --------------------------------- | ------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`           | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `{}`          | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`radius`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type     | Default value   |
| --------- | -------- | --------------- |
| `radius`  | `number` | `radiusDefault` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### StudentsT

#### Extends

- `Distribution`<`ParamsDegreesOfFreedom`>

#### Constructors

##### Constructor

> **new StudentsT**(`df`): [`StudentsT`](#studentst)

The Students-T distribution

###### Parameters

| Parameter | Type     | Default value             |
| --------- | -------- | ------------------------- |
| `df`      | `number` | `degreesOfFreedomDefault` |

###### Returns

[`StudentsT`](#studentst)

###### Example

```ts
const x = new StudentsT(10);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsDegreesOfFreedom>.constructor`

#### Properties

| Property                          | Modifier    | Type       | Default value             | Description    |
| --------------------------------- | ----------- | ---------- | ------------------------- | -------------- |
| <a id="params-26"></a> `params`   | `protected` | `number`   | `degreesOfFreedomDefault` | -              |
| <a id="support-26"></a> `support` | `protected` | `Interval` | `undefined`               | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     | Default value |
| --------- | -------- | ------------- |
| `x`       | `number` | `undefined`   |
| `eps`     | `number` | `1e-20`       |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`df`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type     | Default value             |
| --------- | -------- | ------------------------- |
| `df`      | `number` | `degreesOfFreedomDefault` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Triangular

#### Extends

- `Distribution`<`ParamsBoundMid`>

#### Constructors

##### Constructor

> **new Triangular**(`a`, `b`, `mid`): [`Triangular`](#triangular)

The Triangular distribution

###### Parameters

| Parameter | Type     | Default value       |
| --------- | -------- | ------------------- |
| `a`       | `number` | `boundMidDefault.a` |
| `b`       | `number` | `boundMidDefault.b` |
| `mid`     | `number` | `...`               |

###### Returns

[`Triangular`](#triangular)

###### Example

```ts
const x = new Triangular(0, 1, 0.5);
x.pdf(0.4);
x.cdf(0.5);
x.quantile(0.1);
x.random(10);
```

###### Overrides

`Distribution<ParamsBoundMid>.constructor`

#### Properties

| Property                          | Modifier    | Type             | Description    |
| --------------------------------- | ----------- | ---------------- | -------------- |
| <a id="params-27"></a> `params`   | `protected` | `ParamsBoundMid` | -              |
| <a id="support-27"></a> `support` | `protected` | `Interval`       | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type             |
| --------- | ---------------- |
| `params`  | `ParamsBoundMid` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Uniform

#### Extends

- `Distribution`<`ParamsBound`>

#### Constructors

##### Constructor

> **new Uniform**(`a`, `b`): [`Uniform`](#uniform)

The Uniform (continuous) distribution

###### Parameters

| Parameter | Type     | Default value    |
| --------- | -------- | ---------------- |
| `a`       | `number` | `boundDefault.a` |
| `b`       | `number` | `boundDefault.b` |

###### Returns

[`Uniform`](#uniform)

###### Example

```ts
const x = new Uniform(0, 1);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsBound>.constructor`

#### Properties

| Property                          | Modifier    | Type          | Description    |
| --------------------------------- | ----------- | ------------- | -------------- |
| <a id="density"></a> `density`    | `protected` | `number`      | -              |
| <a id="params-28"></a> `params`   | `protected` | `ParamsBound` | -              |
| <a id="support-28"></a> `support` | `protected` | `Interval`    | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type          |
| --------- | ------------- |
| `params`  | `ParamsBound` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### UniformDiscrete

#### Extends

- `Distribution`<`ParamsBound`>

#### Constructors

##### Constructor

> **new UniformDiscrete**(`a`, `b`): [`UniformDiscrete`](#uniformdiscrete)

The Uniform (discrete) distribution

###### Parameters

| Parameter | Type     | Default value    |
| --------- | -------- | ---------------- |
| `a`       | `number` | `boundDefault.a` |
| `b`       | `number` | `boundDefault.b` |

###### Returns

[`UniformDiscrete`](#uniformdiscrete)

###### Example

```ts
const x = new UniformDiscrete(0, 10);
x.pdf(4);
x.cdf(5);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsBound>.constructor`

#### Properties

| Property                          | Modifier    | Type          | Description    |
| --------------------------------- | ----------- | ------------- | -------------- |
| <a id="params-29"></a> `params`   | `protected` | `ParamsBound` | -              |
| <a id="support-29"></a> `support` | `protected` | `Interval`    | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type          |
| --------- | ------------- |
| `params`  | `ParamsBound` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### UQuadratic

#### Extends

- `Distribution`<`ParamsBound`>

#### Constructors

##### Constructor

> **new UQuadratic**(`a`, `b`): [`UQuadratic`](#uquadratic)

The U-Quadratic distribution

###### Parameters

| Parameter | Type     | Default value    |
| --------- | -------- | ---------------- |
| `a`       | `number` | `boundDefault.a` |
| `b`       | `number` | `boundDefault.b` |

###### Returns

[`UQuadratic`](#uquadratic)

###### Example

```ts
const x = new UQuadratic(0, 1);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsBound>.constructor`

#### Properties

| Property                          | Modifier    | Type          | Description    |
| --------------------------------- | ----------- | ------------- | -------------- |
| <a id="alpha"></a> `alpha`        | `protected` | `number`      | -              |
| <a id="beta-1"></a> `beta`        | `protected` | `number`      | -              |
| <a id="params-30"></a> `params`   | `protected` | `ParamsBound` | -              |
| <a id="support-30"></a> `support` | `protected` | `Interval`    | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type          |
| --------- | ------------- |
| `params`  | `ParamsBound` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Weibull

#### Extends

- `Distribution`<`ParamsShapeScale`>

#### Constructors

##### Constructor

> **new Weibull**(`scale`, `shape`): [`Weibull`](#weibull)

The Weibull distribution

###### Parameters

| Parameter | Type     | Default value             |
| --------- | -------- | ------------------------- |
| `scale`   | `number` | `shapeScaleDefault.scale` |
| `shape`   | `number` | `shapeScaleDefault.shape` |

###### Returns

[`Weibull`](#weibull)

###### Example

```ts
const x = new Weibull(1, 2);
x.pdf(0.1);
x.cdf(0.1);
x.quantile(0.5);
x.random(10);
```

###### Overrides

`Distribution<ParamsShapeScale>.constructor`

#### Properties

| Property                          | Modifier    | Type               | Description    |
| --------------------------------- | ----------- | ------------------ | -------------- |
| <a id="params-31"></a> `params`   | `protected` | `ParamsShapeScale` | -              |
| <a id="support-31"></a> `support` | `protected` | `Interval`         | **`Internal`** |

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.cdf`

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.cornishFisherExpansion`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Distribution.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Distribution.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `x`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `q`       | `number` |

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `q`        | `number` |
| `startK`   | `number` |
| `startCDF` | `number` |

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

| Parameter           | Type                              | Default value          | Description                                |
| ------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| `n`                 | `number`                          | `1`                    | the number of observations to be generated |
| `__namedParameters` | [`RandomOptions`](#randomoptions) | `randomOptionsDefault` | -                                          |

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

| Parameter | Type               |
| --------- | ------------------ |
| `params`  | `ParamsShapeScale` |

###### Returns

`void`

###### Overrides

`Distribution.setParameters`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### standardDeviation()

> **standardDeviation**(): `number`

###### Returns

`number`

the square root of the variance

###### Inherited from

`Distribution.standardDeviation`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

## Interfaces

### RandomOptions

#### Properties

| Property                      | Type                                           | Default value  | Description                                |
| ----------------------------- | ---------------------------------------------- | -------------- | ------------------------------------------ |
| <a id="eps"></a> `eps?`       | `number`                                       | `1e-12`        | Epsilon, used during comparisons of floats |
| <a id="method"></a> `method?` | `string`                                       | `undefined`    | -                                          |
| <a id="rand"></a> `rand?`     | [`RandomGenerator`](random.md#randomgenerator) | `new Random()` | An RNG                                     |
