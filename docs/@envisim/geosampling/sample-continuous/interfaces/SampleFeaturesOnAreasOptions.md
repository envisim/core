[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [sample-continuous](../README.md) / SampleFeaturesOnAreasOptions

# Interface: SampleFeaturesOnAreasOptions\<G\>

## theme_extends

- `OptionsPointsOnAreas`

## Type Parameters

| Type Parameter                      |
| ----------------------------------- |
| `G` _extends_ `GJ.SingleTypeObject` |

## Properties

| Property                                              | theme_type                        | theme_default_value | theme_description                                                                                                                    |
| ----------------------------------------------------- | --------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="modelgeometry"></a> `modelGeometry`            | `G`                               | `undefined`         | A model feature of points or lines or areas to be placed on the selected points.                                                     |
| <a id="pointselection"></a> `pointSelection?`         | `"independent"` \| `"systematic"` | `'independent'`     | -                                                                                                                                    |
| <a id="pointspercircle"></a> `pointsPerCircle?`       | `number`                          | `undefined`         | The number of vertices to create on the circle                                                                                       |
| <a id="rand"></a> `rand?`                             | `RandomGenerator`                 | `new Random()`      | An random number generator                                                                                                           |
| <a id="ratio"></a> `ratio?`                           | `number`                          | `1.0`               | -                                                                                                                                    |
| <a id="rotationofgeometry"></a> `rotationOfGeometry?` | `number` \| `"random"`            | `0.0`               | Optional rotation angle in degrees to rotate the model geometry. Random rotation is forced for line geometries -- option is ignored. |
| <a id="rotationofgrid"></a> `rotationOfGrid?`         | `number` \| `"random"`            | `0.0`               | If true, then the grid will be rotated (systematic only)                                                                             |
| <a id="samplesize"></a> `sampleSize`                  | `number`                          | `undefined`         | Prescribed sample size                                                                                                               |
