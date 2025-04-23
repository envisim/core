[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [sample-continuous](../README.md) / SampleSystematicDistanceLinesOptions

# Interface: SampleSystematicDistanceLinesOptions

## theme_extends

- `OptionsCircleConversion`.`OptionsParallelLines`.`OptionsDistancePoints`

## Properties

| Property                                           | theme_type                     | theme_default_value | theme_description                                                                  |
| -------------------------------------------------- | ------------------------------ | ------------------- | ---------------------------------------------------------------------------------- |
| <a id="basecollection"></a> `baseCollection`       | `FeatureCollection`\<`Point`\> | `undefined`         | The point layer to collect objects from.                                           |
| <a id="cutoff"></a> `cutoff`                       | `number`                       | `undefined`         | The cutoff distance in meters.                                                     |
| <a id="detectionfunction"></a> `detectionFunction` | `DetectionFunction`            | `undefined`         | The detection function giving the detection probability as a function of distance. |
| <a id="interspace"></a> `interspace`               | `number`                       | `undefined`         | The distance in meters between the parallel lines.                                 |
| <a id="pointspercircle"></a> `pointsPerCircle?`    | `number`                       | `undefined`         | The number of vertices to create on the circle                                     |
| <a id="rand"></a> `rand?`                          | `RandomGenerator`              | `undefined`         | -                                                                                  |
| <a id="rotation"></a> `rotation?`                  | `number`                       | `0.0`               | Optional fixed rotation angle in degrees.                                          |
