[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geosampling](README.md) / errors

# errors

## Contents

- [Type Aliases](#type-aliases)
  - [CollectError](#collecterror)
  - [SampleError](#sampleerror)
  - [SelectError](#selecterror)
- [Variables](#variables)
  - [COLLECT_ERROR_LIST](#collect_error_list)
  - [SAMPLE_ERROR_LIST](#sample_error_list)
  - [SELECT_ERROR_LIST](#select_error_list)

## Type Aliases

### CollectError

> **CollectError** = [`CollectError`](#collecterror)

---

### SampleError

> **SampleError** = [`SampleError`](#sampleerror)

---

### SelectError

> **SelectError** = [`SelectError`](#selecterror)

## Variables

### COLLECT_ERROR_LIST

> `const` **COLLECT_ERROR_LIST**: { `BASE_COLLECTION_MISSING`: `"collect-error-collection-is-missing"`; `LINE_EXPECTS_AREA`: `"collect-error-line-expects-area"`; `POINT_EXPECTS_AREA`: `"collect-error-point-expects-area"`; `PROPERTY_ID_COLLISION`: `"collect-error-property-is-missing"`; `PROPERTY_MISSING`: `"collect-error-property-is-missing"`; `PROPERTY_NOT_NUMERICAL`: `"collect-error-property-not-numerical"`; }

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="base_collection_missing"></a> `BASE_COLLECTION_MISSING`

</td>
<td>

`"collect-error-collection-is-missing"`

</td>
<td>

`"collect-error-collection-is-missing"`

</td>
</tr>
<tr>
<td>

<a id="line_expects_area"></a> `LINE_EXPECTS_AREA`

</td>
<td>

`"collect-error-line-expects-area"`

</td>
<td>

`"collect-error-line-expects-area"`

</td>
</tr>
<tr>
<td>

<a id="point_expects_area"></a> `POINT_EXPECTS_AREA`

</td>
<td>

`"collect-error-point-expects-area"`

</td>
<td>

`"collect-error-point-expects-area"`

</td>
</tr>
<tr>
<td>

<a id="property_id_collision"></a> `PROPERTY_ID_COLLISION`

</td>
<td>

`"collect-error-property-is-missing"`

</td>
<td>

`"collect-error-property-is-missing"`

</td>
</tr>
<tr>
<td>

<a id="property_missing"></a> `PROPERTY_MISSING`

</td>
<td>

`"collect-error-property-is-missing"`

</td>
<td>

`"collect-error-property-is-missing"`

</td>
</tr>
<tr>
<td>

<a id="property_not_numerical"></a> `PROPERTY_NOT_NUMERICAL`

</td>
<td>

`"collect-error-property-not-numerical"`

</td>
<td>

`"collect-error-property-not-numerical"`

</td>
</tr>
</tbody>
</table>

---

### SAMPLE_ERROR_LIST

> `const` **SAMPLE_ERROR_LIST**: { `BALANCE_ON_MISSING`: `"sample-error-balance-on-do-not-exist"`; `COLLECTION_MISSING`: `"sample-error-collection-do-not-exist"`; `CUTOFF_NOT_POSITIVE`: `"sample-error-cutoff-not-positive"`; `DASH_LENGTH_NOT_POSITIVE`: `"sample-error-dash-length-not-positive"`; `EXPECTED_AREA`: `"sample-error-expected-area"`; `EXPECTED_LINE`: `"sample-error-expected-line"`; `EXPECTED_POINT`: `"sample-error-expected-point"`; `FACTOR_NOT_POSITIVE`: `"sample-error-factor"`; `HALF_WIDTH_NOT_POSITIVE`: `"sample-error-half-width-not-positive"`; `INCORRECT_PRIMITIVE`: `"sample-error-incorrect-primitive"`; `MODEL_FEATURE_NOT_AREA`: `"sample-error-expected-model-feature-area"`; `MODEL_FEATURE_NOT_LINE`: `"sample-error-expected-model-feature-line"`; `MODEL_FEATURE_NOT_POINT`: `"sample-error-expected-model-feature-point"`; `POINTS_PER_CIRCLE_NOT_POSITIVE_INTEGER`: `"sample-error-points-per-circle"`; `PROBABILITIES_FROM_MISSING`: `"sample-error-probabilities-from-do-not-exist"`; `PROBABILITIES_FROM_NOT_NUMERICAL`: `"sample-error-probabilities-from-not-numerical"`; `RATIO_NOT_POSITIVE`: `"sample-error-ratio"`; `ROTATION_OF_GRID_ERROR`: `"sample-error-rotation-of-grid-incorrect"`; `ROTATION_OF_MODEL_FEATURE_ERROR`: `"sample-error-model-feature-rotation-incorrect"`; `SAMPLE_SIZE_NOT_NON_NEGATIVE_INTEGER`: `"sample-error-sample-size"`; `SEPARATION_NOT_POSITIVE`: `"sample-error-separation-not-positive"`; `SIZE_PROPERTY_MISSING`: `"sample-error-size-property-do-not-exist"`; `SIZE_PROPERTY_NOT_NUMERICAL`: `"sample-error-size-property-not-numerical"`; `SPREAD_ON_MISSING`: `"sample-error-spread-on-do-not-exist"`; `STRATIFY_MISSING`: `"sample-error-stratifying-property-do-not-exist"`; `STRATIFY_NO_VALUES`: `"sample-error-stratify-no-values"`; `STRATIFY_NOT_CATEGORICAL`: `"sample-error-stratifying-not-categorical"`; `STRATIFY_OPTIONS_LENGTH_MISMATCH`: `"sample-error-stratify-options-length-mismatch"`; }

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="balance_on_missing"></a> `BALANCE_ON_MISSING`

</td>
<td>

`"sample-error-balance-on-do-not-exist"`

</td>
<td>

`"sample-error-balance-on-do-not-exist"`

</td>
</tr>
<tr>
<td>

<a id="collection_missing"></a> `COLLECTION_MISSING`

</td>
<td>

`"sample-error-collection-do-not-exist"`

</td>
<td>

`"sample-error-collection-do-not-exist"`

</td>
</tr>
<tr>
<td>

<a id="cutoff_not_positive"></a> `CUTOFF_NOT_POSITIVE`

</td>
<td>

`"sample-error-cutoff-not-positive"`

</td>
<td>

`"sample-error-cutoff-not-positive"`

</td>
</tr>
<tr>
<td>

<a id="dash_length_not_positive"></a> `DASH_LENGTH_NOT_POSITIVE`

</td>
<td>

`"sample-error-dash-length-not-positive"`

</td>
<td>

`"sample-error-dash-length-not-positive"`

</td>
</tr>
<tr>
<td>

<a id="expected_area"></a> `EXPECTED_AREA`

</td>
<td>

`"sample-error-expected-area"`

</td>
<td>

`"sample-error-expected-area"`

</td>
</tr>
<tr>
<td>

<a id="expected_line"></a> `EXPECTED_LINE`

</td>
<td>

`"sample-error-expected-line"`

</td>
<td>

`"sample-error-expected-line"`

</td>
</tr>
<tr>
<td>

<a id="expected_point"></a> `EXPECTED_POINT`

</td>
<td>

`"sample-error-expected-point"`

</td>
<td>

`"sample-error-expected-point"`

</td>
</tr>
<tr>
<td>

<a id="factor_not_positive"></a> `FACTOR_NOT_POSITIVE`

</td>
<td>

`"sample-error-factor"`

</td>
<td>

`"sample-error-factor"`

</td>
</tr>
<tr>
<td>

<a id="half_width_not_positive"></a> `HALF_WIDTH_NOT_POSITIVE`

</td>
<td>

`"sample-error-half-width-not-positive"`

</td>
<td>

`"sample-error-half-width-not-positive"`

</td>
</tr>
<tr>
<td>

<a id="incorrect_primitive"></a> `INCORRECT_PRIMITIVE`

</td>
<td>

`"sample-error-incorrect-primitive"`

</td>
<td>

`"sample-error-incorrect-primitive"`

</td>
</tr>
<tr>
<td>

<a id="model_feature_not_area"></a> `MODEL_FEATURE_NOT_AREA`

</td>
<td>

`"sample-error-expected-model-feature-area"`

</td>
<td>

`"sample-error-expected-model-feature-area"`

</td>
</tr>
<tr>
<td>

<a id="model_feature_not_line"></a> `MODEL_FEATURE_NOT_LINE`

</td>
<td>

`"sample-error-expected-model-feature-line"`

</td>
<td>

`"sample-error-expected-model-feature-line"`

</td>
</tr>
<tr>
<td>

<a id="model_feature_not_point"></a> `MODEL_FEATURE_NOT_POINT`

</td>
<td>

`"sample-error-expected-model-feature-point"`

</td>
<td>

`"sample-error-expected-model-feature-point"`

</td>
</tr>
<tr>
<td>

<a id="points_per_circle_not_positive_integer"></a> `POINTS_PER_CIRCLE_NOT_POSITIVE_INTEGER`

</td>
<td>

`"sample-error-points-per-circle"`

</td>
<td>

`"sample-error-points-per-circle"`

</td>
</tr>
<tr>
<td>

<a id="probabilities_from_missing"></a> `PROBABILITIES_FROM_MISSING`

</td>
<td>

`"sample-error-probabilities-from-do-not-exist"`

</td>
<td>

`"sample-error-probabilities-from-do-not-exist"`

</td>
</tr>
<tr>
<td>

<a id="probabilities_from_not_numerical"></a> `PROBABILITIES_FROM_NOT_NUMERICAL`

</td>
<td>

`"sample-error-probabilities-from-not-numerical"`

</td>
<td>

`"sample-error-probabilities-from-not-numerical"`

</td>
</tr>
<tr>
<td>

<a id="ratio_not_positive"></a> `RATIO_NOT_POSITIVE`

</td>
<td>

`"sample-error-ratio"`

</td>
<td>

`"sample-error-ratio"`

</td>
</tr>
<tr>
<td>

<a id="rotation_of_grid_error"></a> `ROTATION_OF_GRID_ERROR`

</td>
<td>

`"sample-error-rotation-of-grid-incorrect"`

</td>
<td>

`"sample-error-rotation-of-grid-incorrect"`

</td>
</tr>
<tr>
<td>

<a id="rotation_of_model_feature_error"></a> `ROTATION_OF_MODEL_FEATURE_ERROR`

</td>
<td>

`"sample-error-model-feature-rotation-incorrect"`

</td>
<td>

`"sample-error-model-feature-rotation-incorrect"`

</td>
</tr>
<tr>
<td>

<a id="sample_size_not_non_negative_integer"></a> `SAMPLE_SIZE_NOT_NON_NEGATIVE_INTEGER`

</td>
<td>

`"sample-error-sample-size"`

</td>
<td>

`"sample-error-sample-size"`

</td>
</tr>
<tr>
<td>

<a id="separation_not_positive"></a> `SEPARATION_NOT_POSITIVE`

</td>
<td>

`"sample-error-separation-not-positive"`

</td>
<td>

`"sample-error-separation-not-positive"`

</td>
</tr>
<tr>
<td>

<a id="size_property_missing"></a> `SIZE_PROPERTY_MISSING`

</td>
<td>

`"sample-error-size-property-do-not-exist"`

</td>
<td>

`"sample-error-size-property-do-not-exist"`

</td>
</tr>
<tr>
<td>

<a id="size_property_not_numerical"></a> `SIZE_PROPERTY_NOT_NUMERICAL`

</td>
<td>

`"sample-error-size-property-not-numerical"`

</td>
<td>

`"sample-error-size-property-not-numerical"`

</td>
</tr>
<tr>
<td>

<a id="spread_on_missing"></a> `SPREAD_ON_MISSING`

</td>
<td>

`"sample-error-spread-on-do-not-exist"`

</td>
<td>

`"sample-error-spread-on-do-not-exist"`

</td>
</tr>
<tr>
<td>

<a id="stratify_missing"></a> `STRATIFY_MISSING`

</td>
<td>

`"sample-error-stratifying-property-do-not-exist"`

</td>
<td>

`"sample-error-stratifying-property-do-not-exist"`

</td>
</tr>
<tr>
<td>

<a id="stratify_no_values"></a> `STRATIFY_NO_VALUES`

</td>
<td>

`"sample-error-stratify-no-values"`

</td>
<td>

`"sample-error-stratify-no-values"`

</td>
</tr>
<tr>
<td>

<a id="stratify_not_categorical"></a> `STRATIFY_NOT_CATEGORICAL`

</td>
<td>

`"sample-error-stratifying-not-categorical"`

</td>
<td>

`"sample-error-stratifying-not-categorical"`

</td>
</tr>
<tr>
<td>

<a id="stratify_options_length_mismatch"></a> `STRATIFY_OPTIONS_LENGTH_MISMATCH`

</td>
<td>

`"sample-error-stratify-options-length-mismatch"`

</td>
<td>

`"sample-error-stratify-options-length-mismatch"`

</td>
</tr>
</tbody>
</table>

---

### SELECT_ERROR_LIST

> `const` **SELECT_ERROR_LIST**: { `BASE_COLLECTION_EXPECTED_AREA`: `"select-error-base-collection-is-not-area"`; `BASE_COLLECTION_EXPECTED_LINE`: `"select-error-base-collection-is-not-line"`; `BASE_COLLECTION_EXPECTED_POINT`: `"select-error-base-collection-is-not-point"`; `COLLECTION_MISSING`: `"select-error-collection-is-missing"`; `EXPECTED_AREA`: `"select-error-collection-is-not-area"`; `EXPECTED_LINE`: `"select-error-collection-is-not-line"`; `EXPECTED_POINT`: `"select-error-collection-is-not-point"`; }

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="base_collection_expected_area"></a> `BASE_COLLECTION_EXPECTED_AREA`

</td>
<td>

`"select-error-base-collection-is-not-area"`

</td>
<td>

`"select-error-base-collection-is-not-area"`

</td>
</tr>
<tr>
<td>

<a id="base_collection_expected_line"></a> `BASE_COLLECTION_EXPECTED_LINE`

</td>
<td>

`"select-error-base-collection-is-not-line"`

</td>
<td>

`"select-error-base-collection-is-not-line"`

</td>
</tr>
<tr>
<td>

<a id="base_collection_expected_point"></a> `BASE_COLLECTION_EXPECTED_POINT`

</td>
<td>

`"select-error-base-collection-is-not-point"`

</td>
<td>

`"select-error-base-collection-is-not-point"`

</td>
</tr>
<tr>
<td>

<a id="collection_missing-1"></a> `COLLECTION_MISSING`

</td>
<td>

`"select-error-collection-is-missing"`

</td>
<td>

`"select-error-collection-is-missing"`

</td>
</tr>
<tr>
<td>

<a id="expected_area-1"></a> `EXPECTED_AREA`

</td>
<td>

`"select-error-collection-is-not-area"`

</td>
<td>

`"select-error-collection-is-not-area"`

</td>
</tr>
<tr>
<td>

<a id="expected_line-1"></a> `EXPECTED_LINE`

</td>
<td>

`"select-error-collection-is-not-line"`

</td>
<td>

`"select-error-collection-is-not-line"`

</td>
</tr>
<tr>
<td>

<a id="expected_point-1"></a> `EXPECTED_POINT`

</td>
<td>

`"select-error-collection-is-not-point"`

</td>
<td>

`"select-error-collection-is-not-point"`

</td>
</tr>
</tbody>
</table>
