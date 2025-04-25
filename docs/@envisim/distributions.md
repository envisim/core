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
  - [Interval](#interval)
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

- `Bounded`

#### Constructors

##### Constructor

> **new Arcsine**(`a?`, `b?`): [`Arcsine`](#arcsine)

The Arcsine distribution

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

`a?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`b?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Arcsine`](#arcsine)

###### Example

```ts
const x = new Arcsine(1, 1);
x.pdf(0.1);
x.cdf(0.1);
```

###### Overrides

`Bounded.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Bounded.cdf`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Bounded.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Bounded.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Bounded.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Bounded.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Inherited from

`Bounded.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Bounded.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Bounded.skewness`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Bounded.variance`

---

### BenfordMantissa

#### Extends

- `Distribution`

#### Constructors

##### Constructor

> **new BenfordMantissa**(`base?`): [`BenfordMantissa`](#benfordmantissa)

The Benford Mantissa distribution

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

`base?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`Distribution.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-1"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.cdf`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Distribution.sd`

##### ~~skewness()~~

> **skewness**(): `number`

###### Returns

`number`

###### Deprecated

###### Overrides

`Distribution.skewness`

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

- `Distribution`

#### Extended by

- [`Geometric`](#geometric)
- [`Logarithmic`](#logarithmic)

#### Constructors

##### Constructor

> **new Bernoulli**(`p?`): [`Bernoulli`](#bernoulli)

The Bernoulli distribution

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

`p?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Bernoulli`](#bernoulli)

###### Example

```ts
const x = new Bernoulli(0.9);
x.pdf(1);
x.quantile(0.5);
```

###### Overrides

`Distribution.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-2"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.cdf`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Distribution.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

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

- `Distribution`

#### Constructors

##### Constructor

> **new Beta**(`alpha?`, `beta?`): [`Beta`](#beta)

The Beta distribution

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

`alpha?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`beta?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`Distribution.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-3"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-20`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.cdf`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-20`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Distribution.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

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

- `Distribution`

#### Constructors

##### Constructor

> **new BetaPrime**(`alpha?`, `beta?`): [`BetaPrime`](#betaprime)

The Beta Prime distribution

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

`alpha?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`beta?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`Distribution.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-4"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-20`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.cdf`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-20`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Distribution.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

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

- `Distribution`

#### Constructors

##### Constructor

> **new Binomial**(`n?`, `p?`): [`Binomial`](#binomial)

The Binomial distribution

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

`n?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`p?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`Distribution.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-5"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-20`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.cdf`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-20`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Distribution.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

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

- `LocationScale`

#### Constructors

##### Constructor

> **new Cauchy**(`location?`, `scale?`): [`Cauchy`](#cauchy)

The Cauchy distribution

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

`location?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`scale?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`LocationScale.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-6"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.cdf`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`LocationScale.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`LocationScale.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Inherited from

`LocationScale.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`LocationScale.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`LocationScale.skewness`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`LocationScale.variance`

---

### ChiSquared

#### Extends

- `Distribution`

#### Constructors

##### Constructor

> **new ChiSquared**(`df?`): [`ChiSquared`](#chisquared)

The Chi-squared distribution

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

`df?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`Distribution.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-7"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-12`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.cdf`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`1e-12`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Distribution.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

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

- `Distribution`

#### Constructors

##### Constructor

> **new Exponential**(`rate?`): [`Exponential`](#exponential)

The Exponential distribution

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

`rate?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`Distribution.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-8"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.cdf`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Distribution.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

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

- `LocationScale`

#### Constructors

##### Constructor

> **new ExtremeValue**(`location?`, `scale?`): [`ExtremeValue`](#extremevalue)

The Extreme Value distribution

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

`location?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`scale?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`ExtremeValue`](#extremevalue)

###### Example

```ts
const x = new ExtremeValue(0, 1);
x.pdf(1);
x.quantile(0.5);
```

###### Overrides

`LocationScale.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-9"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.cdf`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`LocationScale.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`LocationScale.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Inherited from

`LocationScale.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`LocationScale.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`LocationScale.skewness`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`LocationScale.variance`

---

### FoldedNormal

#### Extends

- `LocationScale`

#### Constructors

##### Constructor

> **new FoldedNormal**(`mu?`, `sigma?`): [`FoldedNormal`](#foldednormal)

The Folded-Normal distribution

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

`mu?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`sigma?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`LocationScale.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-10"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.cdf`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`LocationScale.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`LocationScale.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-12`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

`LocationScale.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`LocationScale.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`LocationScale.skewness`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`LocationScale.variance`

---

### FRatio

#### Extends

- `Distribution`

#### Constructors

##### Constructor

> **new FRatio**(`df1?`, `df2?`): [`FRatio`](#fratio)

The F distribution

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

`df1?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`df2?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`Distribution.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-11"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-20`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.cdf`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Distribution.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

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

- `ShapeScale`

#### Constructors

##### Constructor

> **new Gamma**(`shape?`, `scale?`): [`Gamma`](#gamma)

The Gamma distribution

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

`shape?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`scale?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`ShapeScale.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-12"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-12`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`ShapeScale.cdf`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`ShapeScale.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`ShapeScale.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`ShapeScale.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-12`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`ShapeScale.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

`ShapeScale.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`ShapeScale.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`ShapeScale.skewness`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`ShapeScale.variance`

---

### Geometric

#### Extends

- [`Bernoulli`](#bernoulli)

#### Constructors

##### Constructor

> **new Geometric**(`p?`): [`Geometric`](#geometric)

The Geometric distribution

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

`p?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

[`Bernoulli`](#bernoulli).[`constructor`](#constructor-2)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-13"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`Bernoulli`](#bernoulli).[`cdf`](#cdf-4)

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

[`Bernoulli`](#bernoulli).[`mean`](#mean-4)

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

[`Bernoulli`](#bernoulli).[`mode`](#mode-4)

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`Bernoulli`](#bernoulli).[`pdf`](#pdf-4)

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`Bernoulli`](#bernoulli).[`quantile`](#quantile-4)

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Inherited from

[`Bernoulli`](#bernoulli).[`random`](#random-4)

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

[`Bernoulli`](#bernoulli).[`sd`](#sd-4)

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

[`Bernoulli`](#bernoulli).[`skewness`](#skewness-4)

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

[`Bernoulli`](#bernoulli).[`variance`](#variance-4)

---

### HyperbolicSecant

#### Extends

- `Distribution`

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

`Distribution.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-14"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.cdf`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Inherited from

`Distribution.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Distribution.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

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

- `Distribution`

#### Constructors

##### Constructor

> **new Hypergeometric**(`N?`, `K?`, `n?`): [`Hypergeometric`](#hypergeometric)

The Hypergeometric distribution

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

`N?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`K?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`n?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`Distribution.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-15"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-12`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.cdf`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Distribution.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Distribution.variance`

---

### Interval

#### Constructors

##### Constructor

> **new Interval**(`l`, `r`, `lo`, `ro`): [`Interval`](#interval)

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

`l`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`r`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`lo`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`ro`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Interval`](#interval)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="l"></a> `l`

</td>
<td>

`number`

</td>
<td>

`-Infinity`

</td>
<td>

Left endpoint

</td>
</tr>
<tr>
<td>

<a id="lo"></a> `lo`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

Left endpoint is open

</td>
</tr>
<tr>
<td>

<a id="r"></a> `r`

</td>
<td>

`number`

</td>
<td>

`Infinity`

</td>
<td>

Right endpoint

</td>
</tr>
<tr>
<td>

<a id="ro"></a> `ro`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

Right endpoint is open

</td>
</tr>
</tbody>
</table>

#### Methods

##### checkCDF()

> **checkCDF**(`x`): `null` | `number`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | `number`

##### checkCDFInt()

> **checkCDFInt**(`x`): `null` | `number`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | `number`

##### checkPDF()

> **checkPDF**(`x`): `null` | `number`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | `number`

##### checkPDFInt()

> **checkPDFInt**(`x`): `null` | `number`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | `number`

##### checkQuantile()

> **checkQuantile**(`q`): `null` | `number`

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` | `number`

##### isIn()

> **isIn**(`x`): `boolean`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### isInInt()

> **isInInt**(`x`): `boolean`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### isL()

> **isL**(`x`): `boolean`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### isLInt()

> **isLInt**(`x`): `boolean`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### isR()

> **isR**(`x`): `boolean`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### isRInt()

> **isRInt**(`x`): `boolean`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

---

### Laplace

#### Extends

- `LocationScale`

#### Constructors

##### Constructor

> **new Laplace**(`location?`, `scale?`): [`Laplace`](#laplace)

The Laplace distribution

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

`location?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`scale?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`LocationScale.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-16"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.cdf`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`LocationScale.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`LocationScale.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Inherited from

`LocationScale.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`LocationScale.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`LocationScale.skewness`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`LocationScale.variance`

---

### Logarithmic

#### Extends

- [`Bernoulli`](#bernoulli)

#### Constructors

##### Constructor

> **new Logarithmic**(`p?`): [`Logarithmic`](#logarithmic)

The Logarithmic distribution

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

`p?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

[`Bernoulli`](#bernoulli).[`constructor`](#constructor-2)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-17"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-20`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`Bernoulli`](#bernoulli).[`cdf`](#cdf-4)

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

[`Bernoulli`](#bernoulli).[`mean`](#mean-4)

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

[`Bernoulli`](#bernoulli).[`mode`](#mode-4)

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`Bernoulli`](#bernoulli).[`pdf`](#pdf-4)

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`Bernoulli`](#bernoulli).[`quantile`](#quantile-4)

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

[`Bernoulli`](#bernoulli).[`random`](#random-4)

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

[`Bernoulli`](#bernoulli).[`sd`](#sd-4)

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

[`Bernoulli`](#bernoulli).[`skewness`](#skewness-4)

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

[`Bernoulli`](#bernoulli).[`variance`](#variance-4)

---

### Logistic

#### Extends

- `LocationScale`

#### Constructors

##### Constructor

> **new Logistic**(`location?`, `scale?`): [`Logistic`](#logistic)

The Logistic distribution

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

`location?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`scale?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`LocationScale.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-18"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.cdf`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`LocationScale.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`LocationScale.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Inherited from

`LocationScale.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`LocationScale.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`LocationScale.skewness`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`LocationScale.variance`

---

### LogLogistic

#### Extends

- `ShapeScale`

#### Constructors

##### Constructor

> **new LogLogistic**(`shape?`, `scale?`): [`LogLogistic`](#loglogistic)

The Log-Logistic distribution

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

`shape?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`scale?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`ShapeScale.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-19"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`ShapeScale.cdf`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`ShapeScale.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`ShapeScale.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`ShapeScale.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`ShapeScale.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Inherited from

`ShapeScale.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`ShapeScale.sd`

##### ~~skewness()~~

> **skewness**(): `number`

###### Returns

`number`

###### Deprecated

###### Overrides

`ShapeScale.skewness`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`ShapeScale.variance`

---

### LogNormal

#### Extends

- `LocationScale`

#### Constructors

##### Constructor

> **new LogNormal**(`mu?`, `sigma?`): [`LogNormal`](#lognormal)

The Log-Normal distribution

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

`mu?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`sigma?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`LocationScale.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-20"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.cdf`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`LocationScale.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`LocationScale.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

`LocationScale.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`LocationScale.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`LocationScale.skewness`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`LocationScale.variance`

---

### NegativeBinomial

#### Extends

- `Distribution`

#### Constructors

##### Constructor

> **new NegativeBinomial**(`n?`, `p?`): [`NegativeBinomial`](#negativebinomial)

The Negative Binomial distribution

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

`n?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`p?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`Distribution.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-21"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-20`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.cdf`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-20`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Distribution.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

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

- `LocationScale`

#### Constructors

##### Constructor

> **new Normal**(`mu?`, `sigma?`): [`Normal`](#normal)

The Normal distribution

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

`mu?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`sigma?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`LocationScale.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-22"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.cdf`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`LocationScale.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`LocationScale.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`LocationScale.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

`LocationScale.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`LocationScale.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`LocationScale.skewness`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`LocationScale.variance`

---

### Pareto

#### Extends

- `ShapeScale`

#### Constructors

##### Constructor

> **new Pareto**(`shape?`, `scale?`): [`Pareto`](#pareto)

The Pareto distribution

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

`shape?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`scale?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`ShapeScale.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-23"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`ShapeScale.cdf`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`ShapeScale.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`ShapeScale.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`ShapeScale.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`ShapeScale.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Inherited from

`ShapeScale.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`ShapeScale.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`ShapeScale.skewness`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`ShapeScale.variance`

---

### Poisson

#### Extends

- `Distribution`

#### Constructors

##### Constructor

> **new Poisson**(`rate?`): [`Poisson`](#poisson)

The Poisson distribution

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

`rate?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`Distribution.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-24"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-12`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.cdf`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-12`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Distribution.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

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

- `Distribution`

#### Constructors

##### Constructor

> **new Semicircle**(`radius?`): [`Semicircle`](#semicircle)

The Semicircle distribution

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

`radius?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`Distribution.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-25"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.cdf`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`, `eps`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-20`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Distribution.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

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

- `Distribution`

#### Constructors

##### Constructor

> **new StudentsT**(`df?`): [`StudentsT`](#studentst)

The Students-T distribution

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

`df?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`Distribution.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-26"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`, `eps`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`eps`

</td>
<td>

`number`

</td>
<td>

`1e-20`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.cdf`

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Distribution.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

`Distribution.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Distribution.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Distribution.skewness`

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

- `BoundedMid`

#### Constructors

##### Constructor

> **new Triangular**(`a?`, `b?`, `mid?`): [`Triangular`](#triangular)

The Triangular distribution

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

`a?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`b?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`mid?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`BoundedMid.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-27"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`BoundedMid.cdf`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`BoundedMid.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`BoundedMid.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`BoundedMid.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`BoundedMid.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Inherited from

`BoundedMid.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`BoundedMid.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`BoundedMid.skewness`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`BoundedMid.variance`

---

### Uniform

#### Extends

- `Bounded`

#### Extended by

- [`UniformDiscrete`](#uniformdiscrete)

#### Constructors

##### Constructor

> **new Uniform**(`a?`, `b?`): [`Uniform`](#uniform)

The Uniform (continuous) distribution

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

`a?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`b?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`Bounded.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-28"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Bounded.cdf`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Bounded.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Bounded.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Bounded.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Bounded.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

`Bounded.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Bounded.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Bounded.skewness`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Bounded.variance`

---

### UniformDiscrete

#### Extends

- [`Uniform`](#uniform)

#### Constructors

##### Constructor

> **new UniformDiscrete**(`a?`, `b?`): [`UniformDiscrete`](#uniformdiscrete)

The Uniform (discrete) distribution

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

`a?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`b?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

[`Uniform`](#uniform).[`constructor`](#constructor-29)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-29"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`Uniform`](#uniform).[`cdf`](#cdf-56)

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Inherited from

[`Uniform`](#uniform).[`mean`](#mean-56)

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Inherited from

[`Uniform`](#uniform).[`mode`](#mode-56)

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`Uniform`](#uniform).[`pdf`](#pdf-56)

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

[`Uniform`](#uniform).[`quantile`](#quantile-56)

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Overrides

[`Uniform`](#uniform).[`random`](#random-56)

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

[`Uniform`](#uniform).[`sd`](#sd-56)

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Inherited from

[`Uniform`](#uniform).[`skewness`](#skewness-56)

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

[`Uniform`](#uniform).[`variance`](#variance-56)

---

### UQuadratic

#### Extends

- `Bounded`

#### Constructors

##### Constructor

> **new UQuadratic**(`a?`, `b?`): [`UQuadratic`](#uquadratic)

The U-Quadratic distribution

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

`a?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`b?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`Bounded.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-30"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Bounded.cdf`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`Bounded.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`Bounded.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Bounded.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`Bounded.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Inherited from

`Bounded.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`Bounded.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`Bounded.skewness`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`Bounded.variance`

---

### Weibull

#### Extends

- `ShapeScale`

#### Constructors

##### Constructor

> **new Weibull**(`shape?`, `scale?`): [`Weibull`](#weibull)

The Weibull distribution

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

`shape?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`scale?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

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

`ShapeScale.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="support-31"></a> `support`

</td>
<td>

[`Interval`](#interval)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cdf()

> **cdf**(`x`): `number`

The cumulative distribution function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`ShapeScale.cdf`

##### mean()

> **mean**(): `number`

the mean value

###### Returns

`number`

###### Overrides

`ShapeScale.mean`

##### mode()

> **mode**(): `number`

###### Returns

`number`

the mode

###### Overrides

`ShapeScale.mode`

##### pdf()

> **pdf**(`x`): `number`

The probability density/mass function evaluated at `x`.

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

`x`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`ShapeScale.pdf`

##### quantile()

> **quantile**(`q`): `number`

The quantile function evaluated at `q`.

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

`q`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Overrides

`ShapeScale.quantile`

##### random()

> **random**(`n`, `options`): `number`\[]

Generate random numbers from the distribution.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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

`1`

</td>
<td>

the number of observations to be generated

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`RANDOM_OPTIONS_DEFAULT`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

###### Returns

`number`\[]

###### Inherited from

`ShapeScale.random`

##### sd()

> **sd**(): `number`

standard deviation

###### Returns

`number`

###### Inherited from

`ShapeScale.sd`

##### skewness()

> **skewness**(): `number`

###### Returns

`number`

the skewness

###### Overrides

`ShapeScale.skewness`

##### variance()

> **variance**(): `number`

the variance

###### Returns

`number`

###### Overrides

`ShapeScale.variance`

## Interfaces

### RandomOptions

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="eps"></a> `eps?`

</td>
<td>

`number`

</td>
<td>

`1e-12`

</td>
<td>

Epsilon, used during comparisons of floats

</td>
</tr>
<tr>
<td>

<a id="method"></a> `method?`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="rand"></a> `rand`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

`new Random()`

</td>
<td>

A random generator

</td>
</tr>
</tbody>
</table>
