[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [sample-continuous](../README.md) / SamplePointsOnAreasOptions

# Interface: SamplePointsOnAreasOptions

## theme_extends

- `OptionsPointsOnAreas`

## Properties

| Property                                        | theme_type                        | theme_default_value | theme_description                                        |
| ----------------------------------------------- | --------------------------------- | ------------------- | -------------------------------------------------------- |
| <a id="buffer"></a> `buffer?`                   | `number`                          | `0.0`               | -                                                        |
| <a id="pointselection"></a> `pointSelection?`   | `"independent"` \| `"systematic"` | `'independent'`     | -                                                        |
| <a id="pointspercircle"></a> `pointsPerCircle?` | `number`                          | `undefined`         | The number of vertices to create on the circle           |
| <a id="rand"></a> `rand?`                       | `RandomGenerator`                 | `new Random()`      | An random number generator                               |
| <a id="ratio"></a> `ratio?`                     | `number`                          | `1.0`               | -                                                        |
| <a id="rotationofgrid"></a> `rotationOfGrid?`   | `number` \| `"random"`            | `0.0`               | If true, then the grid will be rotated (systematic only) |
| <a id="samplesize"></a> `sampleSize`            | `number`                          | `undefined`         | Prescribed sample size                                   |
