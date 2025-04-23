[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [sample-continuous](../README.md) / SampleRelascopePointsOptions

# Interface: SampleRelascopePointsOptions\<P\>

## theme_extends

- `OptionsPointsOnAreas`

## Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

## Properties

| Property                                        | theme_type                          | theme_default_value | theme_description                                                                                                                                       |
| ----------------------------------------------- | ----------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="basecollection"></a> `baseCollection`    | `FeatureCollection`\<`Point`, `P`\> | `undefined`         | The point layer to collect objects from.                                                                                                                |
| <a id="buffer"></a> `buffer?`                   | `number`                            | `0.0`               | -                                                                                                                                                       |
| <a id="factor"></a> `factor`                    | `number`                            | `undefined`         | The relascope factor to be used.                                                                                                                        |
| <a id="pointselection"></a> `pointSelection?`   | `"independent"` \| `"systematic"`   | `'independent'`     | -                                                                                                                                                       |
| <a id="pointspercircle"></a> `pointsPerCircle?` | `number`                            | `undefined`         | The number of vertices to create on the circle                                                                                                          |
| <a id="rand"></a> `rand?`                       | `RandomGenerator`                   | `new Random()`      | An random number generator                                                                                                                              |
| <a id="ratio"></a> `ratio?`                     | `number`                            | `1.0`               | -                                                                                                                                                       |
| <a id="rotationofgrid"></a> `rotationOfGrid?`   | `number` \| `"random"`              | `0.0`               | If true, then the grid will be rotated (systematic only)                                                                                                |
| <a id="samplesize"></a> `sampleSize`            | `number`                            | `undefined`         | Prescribed sample size                                                                                                                                  |
| <a id="sizeproperty"></a> `sizeProperty`        | `P`                                 | `undefined`         | The sizeProperty is the id of the proberty in the baseLayer that should be used as the size property and should be in meters (e.g. diameter in meters). |
