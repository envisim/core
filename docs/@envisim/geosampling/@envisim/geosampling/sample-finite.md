[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / @envisim/geosampling/sample-finite

# @envisim/geosampling/sample-finite

## Contents

- [Interfaces](#interfaces)
  - [SampleBalancedOptions\<P>](#samplebalancedoptionsp)
  - [SampleDoublyBalancedOptions\<P>](#sampledoublybalancedoptionsp)
  - [SampleFiniteOptions\<P>](#samplefiniteoptionsp)
  - [SampleFiniteOptionsWr\<P>](#samplefiniteoptionswrp)
  - [SampleSpatiallyBalancedOptions\<P>](#samplespatiallybalancedoptionsp)
- [Variables](#variables)
  - [SAMPLE_BALANCED_METHODS](#sample_balanced_methods)
  - [SAMPLE_DOUBLY_BALANCED_METHODS](#sample_doubly_balanced_methods)
  - [SAMPLE_FINITE_METHODS_WOR](#sample_finite_methods_wor)
  - [SAMPLE_FINITE_METHODS_WR](#sample_finite_methods_wr)
  - [SAMPLE_SPATIALLY_BALANCED_METHODS](#sample_spatially_balanced_methods)
- [Functions](#functions)
  - [sampleBalanced()](#samplebalanced)
  - [sampleBalancedCheck()](#samplebalancedcheck)
  - [sampleDoublyBalanced()](#sampledoublybalanced)
  - [sampleDoublyBalancedCheck()](#sampledoublybalancedcheck)
  - [sampleFinite()](#samplefinite)
  - [sampleFiniteCheck()](#samplefinitecheck)
  - [sampleFiniteWr()](#samplefinitewr)
  - [sampleSpatiallyBalanced()](#samplespatiallybalanced)
  - [sampleSpatiallyBalancedCheck()](#samplespatiallybalancedcheck)

## Interfaces

### SampleBalancedOptions\<P>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

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

<a id="balanceon"></a> `balanceOn`

</td>
<td>

`P`\[]

</td>
<td>

`undefined`

</td>
<td>

An array of id's of properties to use to balance the sample.
This apply to cube and localCube.

</td>
</tr>
<tr>
<td>

<a id="method"></a> `method`

</td>
<td>

`"cube"`

</td>
<td>

`undefined`

</td>
<td>

Method name

</td>
</tr>
<tr>
<td>

<a id="probabilities"></a> `probabilities?`

</td>
<td>

`P`

</td>
<td>

`undefined`

</td>
<td>

The id of the numerical property to use to compute probabilities.
'\_measure' calculates probabilities from measure.

</td>
</tr>
<tr>
<td>

<a id="rand"></a> `rand?`

</td>
<td>

[`RandomGenerator`](../../../random.md#randomgenerator)

</td>
<td>

`new Random()`

</td>
<td>

An RNG

</td>
</tr>
<tr>
<td>

<a id="samplesize"></a> `sampleSize`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The sample size to use. Should be non-negative integer.

</td>
</tr>
</tbody>
</table>

---

### SampleDoublyBalancedOptions\<P>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

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

<a id="balanceon-1"></a> `balanceOn`

</td>
<td>

`P`\[]

</td>
<td>

`undefined`

</td>
<td>

An array of id's of properties to use to balance the sample.
This apply to cube and localCube.

</td>
</tr>
<tr>
<td>

<a id="method-1"></a> `method`

</td>
<td>

`"local-cube"`

</td>
<td>

`undefined`

</td>
<td>

Method name

</td>
</tr>
<tr>
<td>

<a id="probabilities-1"></a> `probabilities?`

</td>
<td>

`P`

</td>
<td>

`undefined`

</td>
<td>

The id of the numerical property to use to compute probabilities.
'\_measure' calculates probabilities from measure.

</td>
</tr>
<tr>
<td>

<a id="rand-1"></a> `rand?`

</td>
<td>

[`RandomGenerator`](../../../random.md#randomgenerator)

</td>
<td>

`new Random()`

</td>
<td>

An RNG

</td>
</tr>
<tr>
<td>

<a id="samplesize-1"></a> `sampleSize`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The sample size to use. Should be non-negative integer.

</td>
</tr>
<tr>
<td>

<a id="spreadgeo"></a> `spreadGeo`

</td>
<td>

`boolean`

</td>
<td>

`undefined`

</td>
<td>

Optional spread using geographical coordinates.
This apply to lpm1, lpm2, scps, localCube.

</td>
</tr>
<tr>
<td>

<a id="spreadon"></a> `spreadOn`

</td>
<td>

`P`\[]

</td>
<td>

`undefined`

</td>
<td>

An array of id's of properties to use to spread the sample.
This apply to lpm1, lpm2, scps, localCube.

</td>
</tr>
</tbody>
</table>

---

### SampleFiniteOptions\<P>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

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

<a id="method-2"></a> `method`

</td>
<td>

`"systematic"` | `"srs"` | `"systematic-random"` | `"poisson-sampling"` | `"rpm"` | `"spm"` | `"sampford"` | `"pareto"` | `"brewer"`

</td>
<td>

`undefined`

</td>
<td>

Method name

</td>
</tr>
<tr>
<td>

<a id="probabilities-2"></a> `probabilities?`

</td>
<td>

`P`

</td>
<td>

`undefined`

</td>
<td>

The id of the numerical property to use to compute probabilities.
'\_measure' calculates probabilities from measure.

</td>
</tr>
<tr>
<td>

<a id="rand-2"></a> `rand?`

</td>
<td>

[`RandomGenerator`](../../../random.md#randomgenerator)

</td>
<td>

`new Random()`

</td>
<td>

An RNG

</td>
</tr>
<tr>
<td>

<a id="samplesize-2"></a> `sampleSize`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The sample size to use. Should be non-negative integer.

</td>
</tr>
</tbody>
</table>

---

### SampleFiniteOptionsWr\<P>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

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

<a id="method-3"></a> `method`

</td>
<td>

`"srs-wr"` | `"pps-wr"`

</td>
<td>

`undefined`

</td>
<td>

Method name

</td>
</tr>
<tr>
<td>

<a id="probabilities-3"></a> `probabilities?`

</td>
<td>

`P`

</td>
<td>

`undefined`

</td>
<td>

The id of the numerical property to use to compute probabilities.
'\_measure' calculates probabilities from measure.

</td>
</tr>
<tr>
<td>

<a id="rand-3"></a> `rand?`

</td>
<td>

[`RandomGenerator`](../../../random.md#randomgenerator)

</td>
<td>

`new Random()`

</td>
<td>

An RNG

</td>
</tr>
<tr>
<td>

<a id="samplesize-3"></a> `sampleSize`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The sample size to use. Should be non-negative integer.

</td>
</tr>
</tbody>
</table>

---

### SampleSpatiallyBalancedOptions\<P>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

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

<a id="method-4"></a> `method`

</td>
<td>

`"lpm1"` | `"lpm2"` | `"scps"`

</td>
<td>

`undefined`

</td>
<td>

Method name

</td>
</tr>
<tr>
<td>

<a id="probabilities-4"></a> `probabilities?`

</td>
<td>

`P`

</td>
<td>

`undefined`

</td>
<td>

The id of the numerical property to use to compute probabilities.
'\_measure' calculates probabilities from measure.

</td>
</tr>
<tr>
<td>

<a id="rand-4"></a> `rand?`

</td>
<td>

[`RandomGenerator`](../../../random.md#randomgenerator)

</td>
<td>

`new Random()`

</td>
<td>

An RNG

</td>
</tr>
<tr>
<td>

<a id="samplesize-4"></a> `sampleSize`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The sample size to use. Should be non-negative integer.

</td>
</tr>
<tr>
<td>

<a id="spreadgeo-1"></a> `spreadGeo`

</td>
<td>

`boolean`

</td>
<td>

`undefined`

</td>
<td>

Optional spread using geographical coordinates.
This apply to lpm1, lpm2, scps, localCube.

</td>
</tr>
<tr>
<td>

<a id="spreadon-1"></a> `spreadOn`

</td>
<td>

`P`\[]

</td>
<td>

`undefined`

</td>
<td>

An array of id's of properties to use to spread the sample.
This apply to lpm1, lpm2, scps, localCube.

</td>
</tr>
</tbody>
</table>

## Variables

### SAMPLE_BALANCED_METHODS

> `const` **SAMPLE_BALANCED_METHODS**: readonly \[`"cube"`]

---

### SAMPLE_DOUBLY_BALANCED_METHODS

> `const` **SAMPLE_DOUBLY_BALANCED_METHODS**: readonly \[`"local-cube"`]

---

### SAMPLE_FINITE_METHODS_WOR

> `const` **SAMPLE_FINITE_METHODS_WOR**: readonly \[`"srs"`, `"systematic"`, `"systematic-random"`, `"poisson-sampling"`, `"rpm"`, `"spm"`, `"sampford"`, `"pareto"`, `"brewer"`]

---

### SAMPLE_FINITE_METHODS_WR

> `const` **SAMPLE_FINITE_METHODS_WR**: readonly \[`"srs-wr"`, `"pps-wr"`]

---

### SAMPLE_SPATIALLY_BALANCED_METHODS

> `const` **SAMPLE_SPATIALLY_BALANCED_METHODS**: readonly \[`"lpm1"`, `"lpm2"`, `"scps"`]

## Functions

### sampleBalanced()

> **sampleBalanced**<`T`, `P`>(`collection`, `options`): [`FeatureCollection`](../../../geojson.md#featurecollection)<`T`, `P`>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`PureObject`](../../../geojson.md#pureobject)

</td>
</tr>
<tr>
<td>

`P` _extends_ `string`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`collection`

</td>
<td>

[`FeatureCollection`](../../../geojson.md#featurecollection)<`T`, `P`>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`SampleBalancedOptions`](#samplebalancedoptions)<`NoInfer`<`P`>>

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../../../geojson.md#featurecollection)<`T`, `P`>

---

### sampleBalancedCheck()

> **sampleBalancedCheck**<`P`>(`options`, `record`): [`EnvisimError`](../../../utils.md#envisimerror)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`SampleBalancedOptions`](#samplebalancedoptions)<`P`>

</td>
</tr>
<tr>
<td>

`record`

</td>
<td>

[`PropertyRecord`](../../../geojson.md#propertyrecord-1)<`P`>

</td>
</tr>
</tbody>
</table>

#### Returns

[`EnvisimError`](../../../utils.md#envisimerror)

---

### sampleDoublyBalanced()

> **sampleDoublyBalanced**<`T`, `P`>(`collection`, `options`): [`FeatureCollection`](../../../geojson.md#featurecollection)<`T`, `P`>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`PureObject`](../../../geojson.md#pureobject)

</td>
</tr>
<tr>
<td>

`P` _extends_ `string`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`collection`

</td>
<td>

[`FeatureCollection`](../../../geojson.md#featurecollection)<`T`, `P`>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`SampleDoublyBalancedOptions`](#sampledoublybalancedoptions)<`NoInfer`<`P`>>

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../../../geojson.md#featurecollection)<`T`, `P`>

---

### sampleDoublyBalancedCheck()

> **sampleDoublyBalancedCheck**<`P`>(`options`, `record`): [`EnvisimError`](../../../utils.md#envisimerror)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`SampleDoublyBalancedOptions`](#sampledoublybalancedoptions)<`NoInfer`<`P`>>

</td>
</tr>
<tr>
<td>

`record`

</td>
<td>

[`PropertyRecord`](../../../geojson.md#propertyrecord-1)<`P`>

</td>
</tr>
</tbody>
</table>

#### Returns

[`EnvisimError`](../../../utils.md#envisimerror)

---

### sampleFinite()

> **sampleFinite**<`T`, `P`>(`collection`, `options`): [`FeatureCollection`](../../../geojson.md#featurecollection)<`T`, `P`>

Select a sample from a layer using sampling methods for a finite population.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`PureObject`](../../../geojson.md#pureobject)

</td>
</tr>
<tr>
<td>

`P` _extends_ `string`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`collection`

</td>
<td>

[`FeatureCollection`](../../../geojson.md#featurecollection)<`T`, `P`>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`SampleFiniteOptions`](#samplefiniteoptions)<`NoInfer`<`P`>>

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../../../geojson.md#featurecollection)<`T`, `P`>

---

### sampleFiniteCheck()

> **sampleFiniteCheck**<`P`>(`options`, `record`): [`EnvisimError`](../../../utils.md#envisimerror)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`SampleFiniteOptions`](#samplefiniteoptions)<`NoInfer`<`P`>> | [`SampleFiniteOptionsWr`](#samplefiniteoptionswr)<`NoInfer`<`P`>>

</td>
</tr>
<tr>
<td>

`record`

</td>
<td>

[`PropertyRecord`](../../../geojson.md#propertyrecord-1)<`P`>

</td>
</tr>
</tbody>
</table>

#### Returns

[`EnvisimError`](../../../utils.md#envisimerror)

---

### sampleFiniteWr()

> **sampleFiniteWr**<`T`, `P`>(`collection`, `options`): [`FeatureCollection`](../../../geojson.md#featurecollection)<`T`, `P`>

Select a w/o replacement sample from a layer using sampling methods for a finite population.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`PureObject`](../../../geojson.md#pureobject)

</td>
</tr>
<tr>
<td>

`P` _extends_ `string`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`collection`

</td>
<td>

[`FeatureCollection`](../../../geojson.md#featurecollection)<`T`, `P`>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`SampleFiniteOptionsWr`](#samplefiniteoptionswr)<`NoInfer`<`P`>>

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../../../geojson.md#featurecollection)<`T`, `P`>

---

### sampleSpatiallyBalanced()

> **sampleSpatiallyBalanced**<`T`, `P`>(`collection`, `options`): [`FeatureCollection`](../../../geojson.md#featurecollection)<`T`, `P`>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`PureObject`](../../../geojson.md#pureobject)

</td>
</tr>
<tr>
<td>

`P` _extends_ `string`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`collection`

</td>
<td>

[`FeatureCollection`](../../../geojson.md#featurecollection)<`T`, `P`>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`SampleSpatiallyBalancedOptions`](#samplespatiallybalancedoptions)<`NoInfer`<`P`>>

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../../../geojson.md#featurecollection)<`T`, `P`>

---

### sampleSpatiallyBalancedCheck()

> **sampleSpatiallyBalancedCheck**<`P`>(`options`, `record`): [`EnvisimError`](../../../utils.md#envisimerror)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`P` _extends_ `string`

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`SampleSpatiallyBalancedOptions`](#samplespatiallybalancedoptions)<`P`>

</td>
</tr>
<tr>
<td>

`record`

</td>
<td>

[`PropertyRecord`](../../../geojson.md#propertyrecord-1)<`P`>

</td>
</tr>
</tbody>
</table>

#### Returns

[`EnvisimError`](../../../utils.md#envisimerror)
