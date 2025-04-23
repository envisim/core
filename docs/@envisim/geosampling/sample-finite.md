[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geosampling](README.md) / sample-finite

# sample-finite

## Contents

- [Type Aliases](#type-aliases)
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

## Type Aliases

### SampleBalancedOptions\<P>

> **SampleBalancedOptions**<`P`> = `OptionsBase`<`P`, _typeof_ [`SAMPLE_BALANCED_METHODS`](#sample_balanced_methods)\[`number`]> & `OptionsBalanced`<`P`>

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

---

### SampleDoublyBalancedOptions\<P>

> **SampleDoublyBalancedOptions**<`P`> = `OptionsBase`<`P`, _typeof_ [`SAMPLE_DOUBLY_BALANCED_METHODS`](#sample_doubly_balanced_methods)\[`number`]> & `OptionsBalanced`<`P`> & `OptionsSpatiallyBalanced`<`P`>

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

---

### SampleFiniteOptions\<P>

> **SampleFiniteOptions**<`P`> = `OptionsBase`<`P`, _typeof_ [`SAMPLE_FINITE_METHODS_WOR`](#sample_finite_methods_wor)\[`number`]>

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

---

### SampleFiniteOptionsWr\<P>

> **SampleFiniteOptionsWr**<`P`> = `OptionsBase`<`P`, _typeof_ [`SAMPLE_FINITE_METHODS_WR`](#sample_finite_methods_wr)\[`number`]>

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

---

### SampleSpatiallyBalancedOptions\<P>

> **SampleSpatiallyBalancedOptions**<`P`> = `OptionsBase`<`P`, _typeof_ [`SAMPLE_SPATIALLY_BALANCED_METHODS`](#sample_spatially_balanced_methods)\[`number`]> & `OptionsSpatiallyBalanced`<`P`>

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

> **sampleBalanced**<`T`, `P`>(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

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

`T` _extends_ [`PureObject`](../geojson.md#pureobject)

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

[`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

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

[`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

---

### sampleBalancedCheck()

> **sampleBalancedCheck**<`P`>(`options`, `record`): [`SampleError`](errors.md#sampleerror)

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

[`PropertyRecord`](../geojson.md#propertyrecord-1)<`P`>

</td>
</tr>
</tbody>
</table>

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleDoublyBalanced()

> **sampleDoublyBalanced**<`T`, `P`>(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

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

`T` _extends_ [`PureObject`](../geojson.md#pureobject)

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

[`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

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

[`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

---

### sampleDoublyBalancedCheck()

> **sampleDoublyBalancedCheck**<`P`>(`options`, `record`): [`SampleError`](errors.md#sampleerror)

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

[`PropertyRecord`](../geojson.md#propertyrecord-1)<`P`>

</td>
</tr>
</tbody>
</table>

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleFinite()

> **sampleFinite**<`T`, `P`>(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

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

`T` _extends_ [`PureObject`](../geojson.md#pureobject)

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

[`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

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

[`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

---

### sampleFiniteCheck()

> **sampleFiniteCheck**<`P`>(`options`, `record`): [`SampleError`](errors.md#sampleerror)

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

[`PropertyRecord`](../geojson.md#propertyrecord-1)<`P`>

</td>
</tr>
</tbody>
</table>

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleFiniteWr()

> **sampleFiniteWr**<`T`, `P`>(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

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

`T` _extends_ [`PureObject`](../geojson.md#pureobject)

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

[`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

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

[`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

---

### sampleSpatiallyBalanced()

> **sampleSpatiallyBalanced**<`T`, `P`>(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

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

`T` _extends_ [`PureObject`](../geojson.md#pureobject)

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

[`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

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

[`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

---

### sampleSpatiallyBalancedCheck()

> **sampleSpatiallyBalancedCheck**<`P`>(`options`, `record`): [`SampleError`](errors.md#sampleerror)

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

[`PropertyRecord`](../geojson.md#propertyrecord-1)<`P`>

</td>
</tr>
</tbody>
</table>

#### Returns

[`SampleError`](errors.md#sampleerror)
