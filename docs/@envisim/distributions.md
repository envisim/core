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

`a`

</td>
<td>

`number`

</td>
<td>

`boundDefault.a`

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`number`

</td>
<td>

`boundDefault.b`

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

`Distribution<ParamsBound>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params"></a> `params`

</td>
<td>

`protected`

</td>
<td>

{ `a`: `number`; `b`: `number`; }

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`params.a`

</td>
<td>

`public`

</td>
<td>

`number`

</td>
<td>

Left bound

</td>
</tr>
<tr>
<td>

`params.b`

</td>
<td>

`public`

</td>
<td>

`number`

</td>
<td>

Right bound

</td>
</tr>
<tr>
<td>

<a id="range"></a> `range`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

**`Internal`**

</td>
</tr>
<tr>
<td>

<a id="support"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`params`

</td>
<td>

{ `a`: `number`; `b`: `number`; }

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

`params.a`

</td>
<td>

`number`

</td>
<td>

Left bound

</td>
</tr>
<tr>
<td>

`params.b`

</td>
<td>

`number`

</td>
<td>

Right bound

</td>
</tr>
</tbody>
</table>

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

`base`

</td>
<td>

`number`

</td>
<td>

`benfordMantissaDefault`

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

`Distribution<ParamsBenfordMantissa>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="logbase"></a> `logBase`

</td>
<td>

`protected`

</td>
<td>

`number`

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

<a id="params-1"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

`benfordMantissaDefault`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-1"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

`undefined`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`base`): `void`

Sets the parameters of the distribution

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

`base`

</td>
<td>

`number`

</td>
<td>

`benfordMantissaDefault`

</td>
</tr>
</tbody>
</table>

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

`p`

</td>
<td>

`number`

</td>
<td>

`bernoulliDefault`

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

`Distribution<ParamsBernoulli>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-2"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

`bernoulliDefault`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-2"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

`undefined`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`p`): `void`

Sets the parameters of the distribution

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

`p`

</td>
<td>

`number`

</td>
<td>

`bernoulliDefault`

</td>
</tr>
</tbody>
</table>

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

`alpha`

</td>
<td>

`number`

</td>
<td>

`betaDefault.alpha`

</td>
</tr>
<tr>
<td>

`beta`

</td>
<td>

`number`

</td>
<td>

`betaDefault.beta`

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

`Distribution<ParamsBeta>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="lbf"></a> `lbf`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="params-3"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsBeta`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-3"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`{}`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsBeta`

</td>
</tr>
</tbody>
</table>

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

`alpha`

</td>
<td>

`number`

</td>
<td>

`betaDefault.alpha`

</td>
</tr>
<tr>
<td>

`beta`

</td>
<td>

`number`

</td>
<td>

`betaDefault.beta`

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

`Distribution<ParamsBeta>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="lbf-1"></a> `lbf`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="params-4"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsBeta`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-4"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`{}`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsBeta`

</td>
</tr>
</tbody>
</table>

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

`n`

</td>
<td>

`number`

</td>
<td>

`binomialDefault.n`

</td>
</tr>
<tr>
<td>

`p`

</td>
<td>

`number`

</td>
<td>

`binomialDefault.p`

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

`Distribution<ParamsBinomial>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-5"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsBinomial`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-5"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`{}`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsBinomial`

</td>
</tr>
</tbody>
</table>

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

`location`

</td>
<td>

`number`

</td>
<td>

`locationScaleDefault.location`

</td>
</tr>
<tr>
<td>

`scale`

</td>
<td>

`number`

</td>
<td>

`locationScaleDefault.scale`

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

`Distribution<ParamsLocationScale>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-6"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsLocationScale`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-6"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsLocationScale`

</td>
</tr>
</tbody>
</table>

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

`df`

</td>
<td>

`number`

</td>
<td>

`degreesOfFreedomDefault`

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

`Distribution<ParamsDegreesOfFreedom>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-7"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

`degreesOfFreedomDefault`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-7"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

`undefined`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`{}`

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

##### setParameters()

> **setParameters**(`df`): `void`

Sets the parameters of the distribution

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

`df`

</td>
<td>

`number`

</td>
<td>

`degreesOfFreedomDefault`

</td>
</tr>
</tbody>
</table>

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

`rate`

</td>
<td>

`number`

</td>
<td>

`rateDefault`

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

`Distribution<ParamsRate>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-8"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

`rateDefault`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-8"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

`undefined`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`rate`): `void`

Sets the parameters of the distribution

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

`rate`

</td>
<td>

`number`

</td>
<td>

`rateDefault`

</td>
</tr>
</tbody>
</table>

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

`location`

</td>
<td>

`number`

</td>
<td>

`locationScaleDefault.location`

</td>
</tr>
<tr>
<td>

`scale`

</td>
<td>

`number`

</td>
<td>

`locationScaleDefault.scale`

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

`Distribution<ParamsLocationScale>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-9"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsLocationScale`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-9"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsLocationScale`

</td>
</tr>
</tbody>
</table>

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

`mu`

</td>
<td>

`number`

</td>
<td>

`normalDefault.mu`

</td>
</tr>
<tr>
<td>

`sigma`

</td>
<td>

`number`

</td>
<td>

`normalDefault.sigma`

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

`Distribution<ParamsNormal>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-10"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsNormal`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-10"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`{}`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsNormal`

</td>
</tr>
</tbody>
</table>

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

`df1`

</td>
<td>

`number`

</td>
<td>

`degreesOfFreedomDefault`

</td>
</tr>
<tr>
<td>

`df2`

</td>
<td>

`number`

</td>
<td>

`degreesOfFreedomDefault`

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

`Distribution<ParamsDegreesOfFreedom2>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-11"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsDegreesOfFreedom2`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-11"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`{}`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsDegreesOfFreedom2`

</td>
</tr>
</tbody>
</table>

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

`shape`

</td>
<td>

`number`

</td>
<td>

`shapeScaleDefault.shape`

</td>
</tr>
<tr>
<td>

`scale`

</td>
<td>

`number`

</td>
<td>

`shapeScaleDefault.scale`

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

`Distribution<ParamsShapeScale>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="lgf"></a> `lgf`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="params-12"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsShapeScale`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-12"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`{}`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsShapeScale`

</td>
</tr>
</tbody>
</table>

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

`p`

</td>
<td>

`number`

</td>
<td>

`bernoulliDefault`

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

`Distribution<ParamsBernoulli>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="logq"></a> `logq`

</td>
<td>

`protected`

</td>
<td>

`number`

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

<a id="params-13"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

`bernoulliDefault`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-13"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

`undefined`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`p`): `void`

Sets the parameters of the distribution

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

`p`

</td>
<td>

`number`

</td>
<td>

`bernoulliDefault`

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-14"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`undefined`

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

<a id="support-14"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

`undefined`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

`N`

</td>
<td>

`number`

</td>
<td>

`hypergeometricDefault.N`

</td>
</tr>
<tr>
<td>

`K`

</td>
<td>

`number`

</td>
<td>

`hypergeometricDefault.K`

</td>
</tr>
<tr>
<td>

`n`

</td>
<td>

`number`

</td>
<td>

`hypergeometricDefault.n`

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

`Distribution<ParamsHypergeometric>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="lbc"></a> `lbc`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="params-15"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsHypergeometric`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-15"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`__namedParameters`): `void`

Sets the parameters of the distribution

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

`__namedParameters`

</td>
<td>

`ParamsHypergeometric`

</td>
</tr>
</tbody>
</table>

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

`location`

</td>
<td>

`number`

</td>
<td>

`locationScaleDefault.location`

</td>
</tr>
<tr>
<td>

`scale`

</td>
<td>

`number`

</td>
<td>

`locationScaleDefault.scale`

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

`Distribution<ParamsLocationScale>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-16"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsLocationScale`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-16"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsLocationScale`

</td>
</tr>
</tbody>
</table>

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

`p`

</td>
<td>

`number`

</td>
<td>

`bernoulliDefault`

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

`Distribution<ParamsBernoulli>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="logq-1"></a> `logq`

</td>
<td>

`protected`

</td>
<td>

`number`

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

<a id="params-17"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

`bernoulliDefault`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-17"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

`undefined`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`p`): `void`

Sets the parameters of the distribution

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

`p`

</td>
<td>

`number`

</td>
<td>

`bernoulliDefault`

</td>
</tr>
</tbody>
</table>

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

`location`

</td>
<td>

`number`

</td>
<td>

`locationScaleDefault.location`

</td>
</tr>
<tr>
<td>

`scale`

</td>
<td>

`number`

</td>
<td>

`locationScaleDefault.scale`

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

`Distribution<ParamsLocationScale>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-18"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsLocationScale`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-18"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsLocationScale`

</td>
</tr>
</tbody>
</table>

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

`scale`

</td>
<td>

`number`

</td>
<td>

`shapeScaleDefault.scale`

</td>
</tr>
<tr>
<td>

`shape`

</td>
<td>

`number`

</td>
<td>

`shapeScaleDefault.shape`

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

`Distribution<ParamsShapeScale>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-19"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsShapeScale`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-19"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsShapeScale`

</td>
</tr>
</tbody>
</table>

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

`mu`

</td>
<td>

`number`

</td>
<td>

`normalDefault.mu`

</td>
</tr>
<tr>
<td>

`sigma`

</td>
<td>

`number`

</td>
<td>

`normalDefault.sigma`

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

`Distribution<ParamsNormal>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-20"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsNormal`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-20"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`{}`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsNormal`

</td>
</tr>
</tbody>
</table>

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

`n`

</td>
<td>

`number`

</td>
<td>

`binomialDefault.n`

</td>
</tr>
<tr>
<td>

`p`

</td>
<td>

`number`

</td>
<td>

`binomialDefault.p`

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

`Distribution<ParamsBinomial>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-21"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsBinomial`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-21"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`{}`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsBinomial`

</td>
</tr>
</tbody>
</table>

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

`mu`

</td>
<td>

`number`

</td>
<td>

`normalDefault.mu`

</td>
</tr>
<tr>
<td>

`sigma`

</td>
<td>

`number`

</td>
<td>

`normalDefault.sigma`

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

`Distribution<ParamsNormal>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-22"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsNormal`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-22"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`{}`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsNormal`

</td>
</tr>
</tbody>
</table>

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

`scale`

</td>
<td>

`number`

</td>
<td>

`shapeScaleDefault.scale`

</td>
</tr>
<tr>
<td>

`shape`

</td>
<td>

`number`

</td>
<td>

`shapeScaleDefault.shape`

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

`Distribution<ParamsShapeScale>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-23"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsShapeScale`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-23"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsShapeScale`

</td>
</tr>
</tbody>
</table>

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

`rate`

</td>
<td>

`number`

</td>
<td>

`rateDefault`

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

`Distribution<ParamsRate>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-24"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

`rateDefault`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-24"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

`undefined`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`rate`): `void`

Sets the parameters of the distribution

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

`rate`

</td>
<td>

`number`

</td>
<td>

`rateDefault`

</td>
</tr>
</tbody>
</table>

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

`radius`

</td>
<td>

`number`

</td>
<td>

`radiusDefault`

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

`Distribution<ParamsRadius>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="denom"></a> `denom`

</td>
<td>

`protected`

</td>
<td>

`number`

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

<a id="params-25"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

`radiusDefault`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="radiussquared"></a> `radiusSquared`

</td>
<td>

`protected`

</td>
<td>

`number`

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

<a id="support-25"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

`undefined`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`{}`

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

##### setParameters()

> **setParameters**(`radius`): `void`

Sets the parameters of the distribution

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

`radius`

</td>
<td>

`number`

</td>
<td>

`radiusDefault`

</td>
</tr>
</tbody>
</table>

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

`df`

</td>
<td>

`number`

</td>
<td>

`degreesOfFreedomDefault`

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

`Distribution<ParamsDegreesOfFreedom>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-26"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

`degreesOfFreedomDefault`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-26"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

`undefined`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`df`): `void`

Sets the parameters of the distribution

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

`df`

</td>
<td>

`number`

</td>
<td>

`degreesOfFreedomDefault`

</td>
</tr>
</tbody>
</table>

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

`a`

</td>
<td>

`number`

</td>
<td>

`boundMidDefault.a`

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`number`

</td>
<td>

`boundMidDefault.b`

</td>
</tr>
<tr>
<td>

`mid`

</td>
<td>

`number`

</td>
<td>

`...`

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

`Distribution<ParamsBoundMid>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-27"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsBoundMid`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-27"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsBoundMid`

</td>
</tr>
</tbody>
</table>

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

`a`

</td>
<td>

`number`

</td>
<td>

`boundDefault.a`

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`number`

</td>
<td>

`boundDefault.b`

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

`Distribution<ParamsBound>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="density"></a> `density`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="params-28"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsBound`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-28"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsBound`

</td>
</tr>
</tbody>
</table>

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

`a`

</td>
<td>

`number`

</td>
<td>

`boundDefault.a`

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`number`

</td>
<td>

`boundDefault.b`

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

`Distribution<ParamsBound>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-29"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsBound`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-29"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsBound`

</td>
</tr>
</tbody>
</table>

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

`a`

</td>
<td>

`number`

</td>
<td>

`boundDefault.a`

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`number`

</td>
<td>

`boundDefault.b`

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

`Distribution<ParamsBound>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="alpha"></a> `alpha`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="beta-1"></a> `beta`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="params-30"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsBound`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-30"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsBound`

</td>
</tr>
</tbody>
</table>

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

`scale`

</td>
<td>

`number`

</td>
<td>

`shapeScaleDefault.scale`

</td>
</tr>
<tr>
<td>

`shape`

</td>
<td>

`number`

</td>
<td>

`shapeScaleDefault.shape`

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

`Distribution<ParamsShapeScale>.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="params-31"></a> `params`

</td>
<td>

`protected`

</td>
<td>

`ParamsShapeScale`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="support-31"></a> `support`

</td>
<td>

`protected`

</td>
<td>

`Interval`

</td>
<td>

**`Internal`**

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

##### cornishFisherExpansion()

> `protected` **cornishFisherExpansion**(`x`): `number`

**`Internal`**

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

##### quantileCF()

> `protected` **quantileCF**(`q`, `startK`, `startCDF`): `number`

**`Internal`**

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

`startK`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`startCDF`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Inherited from

`Distribution.quantileCF`

##### random()

> **random**(`n`, `__namedParameters`): `number`\[]

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

`__namedParameters`

</td>
<td>

[`RandomOptions`](#randomoptions)

</td>
<td>

`randomOptionsDefault`

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

##### setParameters()

> **setParameters**(`params`): `void`

Sets the parameters of the distribution

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

`params`

</td>
<td>

`ParamsShapeScale`

</td>
</tr>
</tbody>
</table>

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

<a id="rand"></a> `rand?`

</td>
<td>

[`RandomGenerator`](random.md#randomgenerator)

</td>
<td>

`new Random()`

</td>
<td>

An RNG

</td>
</tr>
</tbody>
</table>
