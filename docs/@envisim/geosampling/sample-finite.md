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

| Type Parameter         | Default type |
| ---------------------- | ------------ |
| `P` _extends_ `string` | `string`     |

---

### SampleDoublyBalancedOptions\<P>

> **SampleDoublyBalancedOptions**<`P`> = `OptionsBase`<`P`, _typeof_ [`SAMPLE_DOUBLY_BALANCED_METHODS`](#sample_doubly_balanced_methods)\[`number`]> & `OptionsBalanced`<`P`> & `OptionsSpatiallyBalanced`<`P`>

#### Type Parameters

| Type Parameter         | Default type |
| ---------------------- | ------------ |
| `P` _extends_ `string` | `string`     |

---

### SampleFiniteOptions\<P>

> **SampleFiniteOptions**<`P`> = `OptionsBase`<`P`, _typeof_ [`SAMPLE_FINITE_METHODS_WOR`](#sample_finite_methods_wor)\[`number`]>

#### Type Parameters

| Type Parameter         | Default type |
| ---------------------- | ------------ |
| `P` _extends_ `string` | `string`     |

---

### SampleFiniteOptionsWr\<P>

> **SampleFiniteOptionsWr**<`P`> = `OptionsBase`<`P`, _typeof_ [`SAMPLE_FINITE_METHODS_WR`](#sample_finite_methods_wr)\[`number`]>

#### Type Parameters

| Type Parameter         | Default type |
| ---------------------- | ------------ |
| `P` _extends_ `string` | `string`     |

---

### SampleSpatiallyBalancedOptions\<P>

> **SampleSpatiallyBalancedOptions**<`P`> = `OptionsBase`<`P`, _typeof_ [`SAMPLE_SPATIALLY_BALANCED_METHODS`](#sample_spatially_balanced_methods)\[`number`]> & `OptionsSpatiallyBalanced`<`P`>

#### Type Parameters

| Type Parameter         | Default type |
| ---------------------- | ------------ |
| `P` _extends_ `string` | `string`     |

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

| Type Parameter                                         |
| ------------------------------------------------------ |
| `T` _extends_ [`PureObject`](../geojson.md#pureobject) |
| `P` _extends_ `string`                                 |

#### Parameters

| Parameter    | Type                                                              |
| ------------ | ----------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>  |
| `options`    | [`SampleBalancedOptions`](#samplebalancedoptions)<`NoInfer`<`P`>> |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

---

### sampleBalancedCheck()

> **sampleBalancedCheck**<`P`>(`options`, `record`): [`SampleError`](errors.md#sampleerror)

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | Type                                                    |
| --------- | ------------------------------------------------------- |
| `options` | [`SampleBalancedOptions`](#samplebalancedoptions)<`P`>  |
| `record`  | [`PropertyRecord`](../geojson.md#propertyrecord-1)<`P`> |

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleDoublyBalanced()

> **sampleDoublyBalanced**<`T`, `P`>(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

#### Type Parameters

| Type Parameter                                         |
| ------------------------------------------------------ |
| `T` _extends_ [`PureObject`](../geojson.md#pureobject) |
| `P` _extends_ `string`                                 |

#### Parameters

| Parameter    | Type                                                                          |
| ------------ | ----------------------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>              |
| `options`    | [`SampleDoublyBalancedOptions`](#sampledoublybalancedoptions)<`NoInfer`<`P`>> |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

---

### sampleDoublyBalancedCheck()

> **sampleDoublyBalancedCheck**<`P`>(`options`, `record`): [`SampleError`](errors.md#sampleerror)

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | Type                                                                          |
| --------- | ----------------------------------------------------------------------------- |
| `options` | [`SampleDoublyBalancedOptions`](#sampledoublybalancedoptions)<`NoInfer`<`P`>> |
| `record`  | [`PropertyRecord`](../geojson.md#propertyrecord-1)<`P`>                       |

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleFinite()

> **sampleFinite**<`T`, `P`>(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

Select a sample from a layer using sampling methods for a finite population.

#### Type Parameters

| Type Parameter                                         |
| ------------------------------------------------------ |
| `T` _extends_ [`PureObject`](../geojson.md#pureobject) |
| `P` _extends_ `string`                                 |

#### Parameters

| Parameter    | Type                                                             |
| ------------ | ---------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`> |
| `options`    | [`SampleFiniteOptions`](#samplefiniteoptions)<`NoInfer`<`P`>>    |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

---

### sampleFiniteCheck()

> **sampleFiniteCheck**<`P`>(`options`, `record`): [`SampleError`](errors.md#sampleerror)

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | Type                                                          |
| --------- | ------------------------------------------------------------- | ----------------------------------------------------------------- |
| `options` | [`SampleFiniteOptions`](#samplefiniteoptions)<`NoInfer`<`P`>> | [`SampleFiniteOptionsWr`](#samplefiniteoptionswr)<`NoInfer`<`P`>> |
| `record`  | [`PropertyRecord`](../geojson.md#propertyrecord-1)<`P`>       |

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleFiniteWr()

> **sampleFiniteWr**<`T`, `P`>(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

Select a w/o replacement sample from a layer using sampling methods for a finite population.

#### Type Parameters

| Type Parameter                                         |
| ------------------------------------------------------ |
| `T` _extends_ [`PureObject`](../geojson.md#pureobject) |
| `P` _extends_ `string`                                 |

#### Parameters

| Parameter    | Type                                                              |
| ------------ | ----------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>  |
| `options`    | [`SampleFiniteOptionsWr`](#samplefiniteoptionswr)<`NoInfer`<`P`>> |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

---

### sampleSpatiallyBalanced()

> **sampleSpatiallyBalanced**<`T`, `P`>(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

#### Type Parameters

| Type Parameter                                         |
| ------------------------------------------------------ |
| `T` _extends_ [`PureObject`](../geojson.md#pureobject) |
| `P` _extends_ `string`                                 |

#### Parameters

| Parameter    | Type                                                                                |
| ------------ | ----------------------------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>                    |
| `options`    | [`SampleSpatiallyBalancedOptions`](#samplespatiallybalancedoptions)<`NoInfer`<`P`>> |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<`T`, `P`>

---

### sampleSpatiallyBalancedCheck()

> **sampleSpatiallyBalancedCheck**<`P`>(`options`, `record`): [`SampleError`](errors.md#sampleerror)

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | Type                                                                     |
| --------- | ------------------------------------------------------------------------ |
| `options` | [`SampleSpatiallyBalancedOptions`](#samplespatiallybalancedoptions)<`P`> |
| `record`  | [`PropertyRecord`](../geojson.md#propertyrecord-1)<`P`>                  |

#### Returns

[`SampleError`](errors.md#sampleerror)
