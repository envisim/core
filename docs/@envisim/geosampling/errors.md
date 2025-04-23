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

> **CollectError** = `ErrorType`<_typeof_ [`COLLECT_ERROR_LIST`](#collect_error_list)>

---

### SampleError

> **SampleError** = `ErrorType`<_typeof_ [`SAMPLE_ERROR_LIST`](#sample_error_list)>

---

### SelectError

> **SelectError** = `ErrorType`<_typeof_ [`SELECT_ERROR_LIST`](#select_error_list)>

## Variables

### COLLECT_ERROR_LIST

> `const` **COLLECT_ERROR_LIST**: { `BASE_COLLECTION_MISSING`: `"collect-error-collection-is-missing"`; `LINE_EXPECTS_AREA`: `"collect-error-line-expects-area"`; `POINT_EXPECTS_AREA`: `"collect-error-point-expects-area"`; `PROPERTY_ID_COLLISION`: `"collect-error-property-is-missing"`; `PROPERTY_MISSING`: `"collect-error-property-is-missing"`; `PROPERTY_NOT_NUMERICAL`: `"collect-error-property-not-numerical"`; }

#### Type declaration

| Name                                                           | Type                                     | Default value                            |
| -------------------------------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| <a id="base_collection_missing"></a> `BASE_COLLECTION_MISSING` | `"collect-error-collection-is-missing"`  | `'collect-error-collection-is-missing'`  |
| <a id="line_expects_area"></a> `LINE_EXPECTS_AREA`             | `"collect-error-line-expects-area"`      | `'collect-error-line-expects-area'`      |
| <a id="point_expects_area"></a> `POINT_EXPECTS_AREA`           | `"collect-error-point-expects-area"`     | `'collect-error-point-expects-area'`     |
| <a id="property_id_collision"></a> `PROPERTY_ID_COLLISION`     | `"collect-error-property-is-missing"`    | `'collect-error-property-is-missing'`    |
| <a id="property_missing"></a> `PROPERTY_MISSING`               | `"collect-error-property-is-missing"`    | `'collect-error-property-is-missing'`    |
| <a id="property_not_numerical"></a> `PROPERTY_NOT_NUMERICAL`   | `"collect-error-property-not-numerical"` | `'collect-error-property-not-numerical'` |

---

### SAMPLE_ERROR_LIST

> `const` **SAMPLE_ERROR_LIST**: { `BALANCE_ON_MISSING`: `"sample-error-balance-on-do-not-exist"`; `COLLECTION_MISSING`: `"sample-error-collection-do-not-exist"`; `CUTOFF_NOT_POSITIVE`: `"sample-error-cutoff-not-positive"`; `DASH_LENGTH_NOT_POSITIVE`: `"sample-error-dash-length-not-positive"`; `EXPECTED_AREA`: `"sample-error-expected-area"`; `EXPECTED_LINE`: `"sample-error-expected-line"`; `EXPECTED_POINT`: `"sample-error-expected-point"`; `FACTOR_NOT_POSITIVE`: `"sample-error-factor"`; `HALF_WIDTH_NOT_POSITIVE`: `"sample-error-half-width-not-positive"`; `INCORRECT_PRIMITIVE`: `"sample-error-incorrect-primitive"`; `MODEL_FEATURE_NOT_AREA`: `"sample-error-expected-model-feature-area"`; `MODEL_FEATURE_NOT_LINE`: `"sample-error-expected-model-feature-line"`; `MODEL_FEATURE_NOT_POINT`: `"sample-error-expected-model-feature-point"`; `POINTS_PER_CIRCLE_NOT_POSITIVE_INTEGER`: `"sample-error-points-per-circle"`; `PROBABILITIES_FROM_MISSING`: `"sample-error-probabilities-from-do-not-exist"`; `PROBABILITIES_FROM_NOT_NUMERICAL`: `"sample-error-probabilities-from-not-numerical"`; `RATIO_NOT_POSITIVE`: `"sample-error-ratio"`; `ROTATION_OF_GRID_ERROR`: `"sample-error-rotation-of-grid-incorrect"`; `ROTATION_OF_MODEL_FEATURE_ERROR`: `"sample-error-model-feature-rotation-incorrect"`; `SAMPLE_SIZE_NOT_NON_NEGATIVE_INTEGER`: `"sample-error-sample-size"`; `SEPARATION_NOT_POSITIVE`: `"sample-error-separation-not-positive"`; `SIZE_PROPERTY_MISSING`: `"sample-error-size-property-do-not-exist"`; `SIZE_PROPERTY_NOT_NUMERICAL`: `"sample-error-size-property-not-numerical"`; `SPREAD_ON_MISSING`: `"sample-error-spread-on-do-not-exist"`; `STRATIFY_MISSING`: `"sample-error-stratifying-property-do-not-exist"`; `STRATIFY_NO_VALUES`: `"sample-error-stratify-no-values"`; `STRATIFY_NOT_CATEGORICAL`: `"sample-error-stratifying-not-categorical"`; `STRATIFY_OPTIONS_LENGTH_MISMATCH`: `"sample-error-stratify-options-length-mismatch"`; }

#### Type declaration

| Name                                                                                         | Type                                               | Default value                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| <a id="balance_on_missing"></a> `BALANCE_ON_MISSING`                                         | `"sample-error-balance-on-do-not-exist"`           | `'sample-error-balance-on-do-not-exist'`           |
| <a id="collection_missing"></a> `COLLECTION_MISSING`                                         | `"sample-error-collection-do-not-exist"`           | `'sample-error-collection-do-not-exist'`           |
| <a id="cutoff_not_positive"></a> `CUTOFF_NOT_POSITIVE`                                       | `"sample-error-cutoff-not-positive"`               | `'sample-error-cutoff-not-positive'`               |
| <a id="dash_length_not_positive"></a> `DASH_LENGTH_NOT_POSITIVE`                             | `"sample-error-dash-length-not-positive"`          | `'sample-error-dash-length-not-positive'`          |
| <a id="expected_area"></a> `EXPECTED_AREA`                                                   | `"sample-error-expected-area"`                     | `'sample-error-expected-area'`                     |
| <a id="expected_line"></a> `EXPECTED_LINE`                                                   | `"sample-error-expected-line"`                     | `'sample-error-expected-line'`                     |
| <a id="expected_point"></a> `EXPECTED_POINT`                                                 | `"sample-error-expected-point"`                    | `'sample-error-expected-point'`                    |
| <a id="factor_not_positive"></a> `FACTOR_NOT_POSITIVE`                                       | `"sample-error-factor"`                            | `'sample-error-factor'`                            |
| <a id="half_width_not_positive"></a> `HALF_WIDTH_NOT_POSITIVE`                               | `"sample-error-half-width-not-positive"`           | `'sample-error-half-width-not-positive'`           |
| <a id="incorrect_primitive"></a> `INCORRECT_PRIMITIVE`                                       | `"sample-error-incorrect-primitive"`               | `'sample-error-incorrect-primitive'`               |
| <a id="model_feature_not_area"></a> `MODEL_FEATURE_NOT_AREA`                                 | `"sample-error-expected-model-feature-area"`       | `'sample-error-expected-model-feature-area'`       |
| <a id="model_feature_not_line"></a> `MODEL_FEATURE_NOT_LINE`                                 | `"sample-error-expected-model-feature-line"`       | `'sample-error-expected-model-feature-line'`       |
| <a id="model_feature_not_point"></a> `MODEL_FEATURE_NOT_POINT`                               | `"sample-error-expected-model-feature-point"`      | `'sample-error-expected-model-feature-point'`      |
| <a id="points_per_circle_not_positive_integer"></a> `POINTS_PER_CIRCLE_NOT_POSITIVE_INTEGER` | `"sample-error-points-per-circle"`                 | `'sample-error-points-per-circle'`                 |
| <a id="probabilities_from_missing"></a> `PROBABILITIES_FROM_MISSING`                         | `"sample-error-probabilities-from-do-not-exist"`   | `'sample-error-probabilities-from-do-not-exist'`   |
| <a id="probabilities_from_not_numerical"></a> `PROBABILITIES_FROM_NOT_NUMERICAL`             | `"sample-error-probabilities-from-not-numerical"`  | `'sample-error-probabilities-from-not-numerical'`  |
| <a id="ratio_not_positive"></a> `RATIO_NOT_POSITIVE`                                         | `"sample-error-ratio"`                             | `'sample-error-ratio'`                             |
| <a id="rotation_of_grid_error"></a> `ROTATION_OF_GRID_ERROR`                                 | `"sample-error-rotation-of-grid-incorrect"`        | `'sample-error-rotation-of-grid-incorrect'`        |
| <a id="rotation_of_model_feature_error"></a> `ROTATION_OF_MODEL_FEATURE_ERROR`               | `"sample-error-model-feature-rotation-incorrect"`  | `'sample-error-model-feature-rotation-incorrect'`  |
| <a id="sample_size_not_non_negative_integer"></a> `SAMPLE_SIZE_NOT_NON_NEGATIVE_INTEGER`     | `"sample-error-sample-size"`                       | `'sample-error-sample-size'`                       |
| <a id="separation_not_positive"></a> `SEPARATION_NOT_POSITIVE`                               | `"sample-error-separation-not-positive"`           | `'sample-error-separation-not-positive'`           |
| <a id="size_property_missing"></a> `SIZE_PROPERTY_MISSING`                                   | `"sample-error-size-property-do-not-exist"`        | `'sample-error-size-property-do-not-exist'`        |
| <a id="size_property_not_numerical"></a> `SIZE_PROPERTY_NOT_NUMERICAL`                       | `"sample-error-size-property-not-numerical"`       | `'sample-error-size-property-not-numerical'`       |
| <a id="spread_on_missing"></a> `SPREAD_ON_MISSING`                                           | `"sample-error-spread-on-do-not-exist"`            | `'sample-error-spread-on-do-not-exist'`            |
| <a id="stratify_missing"></a> `STRATIFY_MISSING`                                             | `"sample-error-stratifying-property-do-not-exist"` | `'sample-error-stratifying-property-do-not-exist'` |
| <a id="stratify_no_values"></a> `STRATIFY_NO_VALUES`                                         | `"sample-error-stratify-no-values"`                | `'sample-error-stratify-no-values'`                |
| <a id="stratify_not_categorical"></a> `STRATIFY_NOT_CATEGORICAL`                             | `"sample-error-stratifying-not-categorical"`       | `'sample-error-stratifying-not-categorical'`       |
| <a id="stratify_options_length_mismatch"></a> `STRATIFY_OPTIONS_LENGTH_MISMATCH`             | `"sample-error-stratify-options-length-mismatch"`  | `'sample-error-stratify-options-length-mismatch'`  |

---

### SELECT_ERROR_LIST

> `const` **SELECT_ERROR_LIST**: { `BASE_COLLECTION_EXPECTED_AREA`: `"select-error-base-collection-is-not-area"`; `BASE_COLLECTION_EXPECTED_LINE`: `"select-error-base-collection-is-not-line"`; `BASE_COLLECTION_EXPECTED_POINT`: `"select-error-base-collection-is-not-point"`; `COLLECTION_MISSING`: `"select-error-collection-is-missing"`; `EXPECTED_AREA`: `"select-error-collection-is-not-area"`; `EXPECTED_LINE`: `"select-error-collection-is-not-line"`; `EXPECTED_POINT`: `"select-error-collection-is-not-point"`; }

#### Type declaration

| Name                                                                         | Type                                          | Default value                                 |
| ---------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| <a id="base_collection_expected_area"></a> `BASE_COLLECTION_EXPECTED_AREA`   | `"select-error-base-collection-is-not-area"`  | `'select-error-base-collection-is-not-area'`  |
| <a id="base_collection_expected_line"></a> `BASE_COLLECTION_EXPECTED_LINE`   | `"select-error-base-collection-is-not-line"`  | `'select-error-base-collection-is-not-line'`  |
| <a id="base_collection_expected_point"></a> `BASE_COLLECTION_EXPECTED_POINT` | `"select-error-base-collection-is-not-point"` | `'select-error-base-collection-is-not-point'` |
| <a id="collection_missing-1"></a> `COLLECTION_MISSING`                       | `"select-error-collection-is-missing"`        | `'select-error-collection-is-missing'`        |
| <a id="expected_area-1"></a> `EXPECTED_AREA`                                 | `"select-error-collection-is-not-area"`       | `'select-error-collection-is-not-area'`       |
| <a id="expected_line-1"></a> `EXPECTED_LINE`                                 | `"select-error-collection-is-not-line"`       | `'select-error-collection-is-not-line'`       |
| <a id="expected_point-1"></a> `EXPECTED_POINT`                               | `"select-error-collection-is-not-point"`      | `'select-error-collection-is-not-point'`      |
