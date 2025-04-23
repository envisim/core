[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geosampling](README.md) / sample-continuous

# sample-continuous

## Interfaces

### SampleFeaturesOnAreasOptions\<G\>

#### Extends

- `OptionsPointsOnAreas`

#### Type Parameters

| Type Parameter                                                                   |
| -------------------------------------------------------------------------------- |
| `G` _extends_ [`SingleTypeObject`](../geojson-utils/geojson.md#singletypeobject) |

#### Properties

| Property                                              | Type                                              | Default value   | Description                                                                                                                          |
| ----------------------------------------------------- | ------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="modelgeometry"></a> `modelGeometry`            | `G`                                               | `undefined`     | A model feature of points or lines or areas to be placed on the selected points.                                                     |
| <a id="pointselection"></a> `pointSelection?`         | `"independent"` \| `"systematic"`                 | `'independent'` | -                                                                                                                                    |
| <a id="pointspercircle"></a> `pointsPerCircle?`       | `number`                                          | `undefined`     | The number of vertices to create on the circle                                                                                       |
| <a id="rand"></a> `rand?`                             | [`RandomGenerator`](../random.md#randomgenerator) | `new Random()`  | An random number generator                                                                                                           |
| <a id="ratio"></a> `ratio?`                           | `number`                                          | `1.0`           | -                                                                                                                                    |
| <a id="rotationofgeometry"></a> `rotationOfGeometry?` | `number` \| `"random"`                            | `0.0`           | Optional rotation angle in degrees to rotate the model geometry. Random rotation is forced for line geometries -- option is ignored. |
| <a id="rotationofgrid"></a> `rotationOfGrid?`         | `number` \| `"random"`                            | `0.0`           | If true, then the grid will be rotated (systematic only)                                                                             |
| <a id="samplesize"></a> `sampleSize`                  | `number`                                          | `undefined`     | Prescribed sample size                                                                                                               |

---

### SamplePointsOnAreasOptions

#### Extends

- `OptionsPointsOnAreas`

#### Properties

| Property                                          | Type                                              | Default value   | Description                                              |
| ------------------------------------------------- | ------------------------------------------------- | --------------- | -------------------------------------------------------- |
| <a id="buffer"></a> `buffer?`                     | `number`                                          | `0.0`           | -                                                        |
| <a id="pointselection-1"></a> `pointSelection?`   | `"independent"` \| `"systematic"`                 | `'independent'` | -                                                        |
| <a id="pointspercircle-1"></a> `pointsPerCircle?` | `number`                                          | `undefined`     | The number of vertices to create on the circle           |
| <a id="rand-1"></a> `rand?`                       | [`RandomGenerator`](../random.md#randomgenerator) | `new Random()`  | An random number generator                               |
| <a id="ratio-1"></a> `ratio?`                     | `number`                                          | `1.0`           | -                                                        |
| <a id="rotationofgrid-1"></a> `rotationOfGrid?`   | `number` \| `"random"`                            | `0.0`           | If true, then the grid will be rotated (systematic only) |
| <a id="samplesize-1"></a> `sampleSize`            | `number`                                          | `undefined`     | Prescribed sample size                                   |

---

### SampleRelascopePointsOptions\<P\>

#### Extends

- `OptionsPointsOnAreas`

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Properties

| Property                                          | Type                                                                                          | Default value   | Description                                                                                                                                             |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="basecollection"></a> `baseCollection`      | [`FeatureCollection`](../geojson.md#featurecollection)\<[`Point`](../geojson.md#point), `P`\> | `undefined`     | The point layer to collect objects from.                                                                                                                |
| <a id="buffer-1"></a> `buffer?`                   | `number`                                                                                      | `0.0`           | -                                                                                                                                                       |
| <a id="factor"></a> `factor`                      | `number`                                                                                      | `undefined`     | The relascope factor to be used.                                                                                                                        |
| <a id="pointselection-2"></a> `pointSelection?`   | `"independent"` \| `"systematic"`                                                             | `'independent'` | -                                                                                                                                                       |
| <a id="pointspercircle-2"></a> `pointsPerCircle?` | `number`                                                                                      | `undefined`     | The number of vertices to create on the circle                                                                                                          |
| <a id="rand-2"></a> `rand?`                       | [`RandomGenerator`](../random.md#randomgenerator)                                             | `new Random()`  | An random number generator                                                                                                                              |
| <a id="ratio-2"></a> `ratio?`                     | `number`                                                                                      | `1.0`           | -                                                                                                                                                       |
| <a id="rotationofgrid-2"></a> `rotationOfGrid?`   | `number` \| `"random"`                                                                        | `0.0`           | If true, then the grid will be rotated (systematic only)                                                                                                |
| <a id="samplesize-2"></a> `sampleSize`            | `number`                                                                                      | `undefined`     | Prescribed sample size                                                                                                                                  |
| <a id="sizeproperty"></a> `sizeProperty`          | `P`                                                                                           | `undefined`     | The sizeProperty is the id of the proberty in the baseLayer that should be used as the size property and should be in meters (e.g. diameter in meters). |

---

### SampleSystematicBeltsOnAreas

#### Extends

- `OptionsCircleConversion`.`OptionsParallelLines`

#### Properties

| Property                                          | Type                                              | Default value | Description                                        |
| ------------------------------------------------- | ------------------------------------------------- | ------------- | -------------------------------------------------- |
| <a id="halfwidth"></a> `halfWidth`                | `number`                                          | `undefined`   | The half-width of the belt.                        |
| <a id="interspace"></a> `interspace`              | `number`                                          | `undefined`   | The distance in meters between the parallel lines. |
| <a id="pointspercircle-3"></a> `pointsPerCircle?` | `number`                                          | `undefined`   | The number of vertices to create on the circle     |
| <a id="rand-3"></a> `rand?`                       | [`RandomGenerator`](../random.md#randomgenerator) | `undefined`   | -                                                  |
| <a id="rotation"></a> `rotation?`                 | `number`                                          | `0.0`         | Optional fixed rotation angle in degrees.          |

---

### SampleSystematicDistanceLinesOptions

#### Extends

- `OptionsCircleConversion`.`OptionsParallelLines`.`OptionsDistancePoints`

#### Properties

| Property                                           | Type                                                                                     | Default value | Description                                                                        |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------- |
| <a id="basecollection-1"></a> `baseCollection`     | [`FeatureCollection`](../geojson.md#featurecollection)\<[`Point`](../geojson.md#point)\> | `undefined`   | The point layer to collect objects from.                                           |
| <a id="cutoff"></a> `cutoff`                       | `number`                                                                                 | `undefined`   | The cutoff distance in meters.                                                     |
| <a id="detectionfunction"></a> `detectionFunction` | `DetectionFunction`                                                                      | `undefined`   | The detection function giving the detection probability as a function of distance. |
| <a id="interspace-1"></a> `interspace`             | `number`                                                                                 | `undefined`   | The distance in meters between the parallel lines.                                 |
| <a id="pointspercircle-4"></a> `pointsPerCircle?`  | `number`                                                                                 | `undefined`   | The number of vertices to create on the circle                                     |
| <a id="rand-4"></a> `rand?`                        | [`RandomGenerator`](../random.md#randomgenerator)                                        | `undefined`   | -                                                                                  |
| <a id="rotation-1"></a> `rotation?`                | `number`                                                                                 | `0.0`         | Optional fixed rotation angle in degrees.                                          |

---

### SampleSystematicLinesOnAreas

#### Extends

- `OptionsCircleConversion`.`OptionsParallelLines`

#### Properties

| Property                                          | Type                                              | Default value | Description                                        |
| ------------------------------------------------- | ------------------------------------------------- | ------------- | -------------------------------------------------- |
| <a id="interspace-2"></a> `interspace`            | `number`                                          | `undefined`   | The distance in meters between the parallel lines. |
| <a id="pointspercircle-5"></a> `pointsPerCircle?` | `number`                                          | `undefined`   | The number of vertices to create on the circle     |
| <a id="rand-5"></a> `rand?`                       | [`RandomGenerator`](../random.md#randomgenerator) | `undefined`   | -                                                  |
| <a id="rotation-2"></a> `rotation?`               | `number`                                          | `0.0`         | Optional fixed rotation angle in degrees.          |

## Type Aliases

### SampleDistancePointsOptions

> **SampleDistancePointsOptions** = `OptionsPointsOnAreas` & `OptionsDistancePoints`

---

### SamplePointsOnLinesOptions

> **SamplePointsOnLinesOptions** = `OptionsBase`

---

### SamplePositionsInBbox

> **SamplePositionsInBbox** = `OptionsBase`

---

### SampleSystematicLinesOnLines

> **SampleSystematicLinesOnLines** = `object`

#### Properties

| Property                             | Type                                              | Default value  | Description                |
| ------------------------------------ | ------------------------------------------------- | -------------- | -------------------------- |
| <a id="dashlength"></a> `dashLength` | `number`                                          | `undefined`    | The dash length            |
| <a id="rand-6"></a> `rand?`          | [`RandomGenerator`](../random.md#randomgenerator) | `new Random()` | An random number generator |
| <a id="voidlength"></a> `voidLength` | `number`                                          | `undefined`    | The void length            |

## Functions

### effectiveHalfWidth()

> **effectiveHalfWidth**(`g`, `cutoff`): `number`

Computes the effective half width for distance sampling along a line.

#### Parameters

| Parameter | Type                | Description                                                                         |
| --------- | ------------------- | ----------------------------------------------------------------------------------- |
| `g`       | `DetectionFunction` | detection function (should return detection probability, given distance in meters). |
| `cutoff`  | `number`            | maximum detection distance in meters.                                               |

#### Returns

`number`

the effective half width in meters.

---

### effectiveRadius()

> **effectiveRadius**(`g`, `cutoff`): `number`

Computes the effective radius for distance sampling with points.

#### Parameters

| Parameter | Type                | Description                                                                         |
| --------- | ------------------- | ----------------------------------------------------------------------------------- |
| `g`       | `DetectionFunction` | detection function (should return detection probability, given distance in meters). |
| `cutoff`  | `number`            | maximum detection distance in meters.                                               |

#### Returns

`number`

the effective radius in meters.

---

### halfNormalDetectionFunction()

> **halfNormalDetectionFunction**(`sigma`): `DetectionFunction`

Returns a half normal detection function on [0, Infinity).

#### Parameters

| Parameter | Type     | Description          |
| --------- | -------- | -------------------- |
| `sigma`   | `number` | the sigma parameter. |

#### Returns

`DetectionFunction`

the half normal detection function.

---

### integrate()

> **integrate**(`f`, `a`, `b`, `n`): `number`

Integrate a function f from a to b.

#### Parameters

| Parameter | Type                | Default value | Description                                                 |
| --------- | ------------------- | ------------- | ----------------------------------------------------------- |
| `f`       | `IntegrateFunction` | `undefined`   | function to integrate.                                      |
| `a`       | `number`            | `undefined`   | lower limit a > -Infinity.                                  |
| `b`       | `number`            | `undefined`   | upper limit b > a and b < Infinity.                         |
| `n`       | `number`            | `100`         | optional, number of intervals will be 3n (default n = 100). |

#### Returns

`number`

number, f integrated from a to b.

---

### sampleAreaFeaturesOnAreas()

> **sampleAreaFeaturesOnAreas**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject), `never`\>

Select a sample of features/tracts on areas.

#### Parameters

| Parameter    | Type                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject)\>                        |
| `options`    | [`SampleFeaturesOnAreasOptions`](#samplefeaturesonareasoptions)\<[`AreaObject`](../geojson-utils/geojson.md#areaobject)\> |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject), `never`\>

---

### sampleAreaFeaturesOnAreasCheck()

> **sampleAreaFeaturesOnAreasCheck**(`options`): [`SampleError`](errors.md#sampleerror)

#### Parameters

| Parameter | Type                                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------- |
| `options` | [`SampleFeaturesOnAreasOptions`](#samplefeaturesonareasoptions)\<[`AreaObject`](../geojson-utils/geojson.md#areaobject)\> |

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleDistancePoints()

> **sampleDistancePoints**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)\<[`PointObject`](../geojson.md#pointobject)\>

Distance sampling with points. Selects a point sample on an area layer
and collect point objects from a base layer using a detection function
to (randomly) determine inclusion.

#### Parameters

| Parameter    | Type                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject)\> |
| `options`    | [`SampleDistancePointsOptions`](#sampledistancepointsoptions)                                      |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)\<[`PointObject`](../geojson.md#pointobject)\>

---

### sampleDistancePointsCheck()

> **sampleDistancePointsCheck**(`options`): [`SampleError`](errors.md#sampleerror)

#### Parameters

| Parameter | Type                                                          |
| --------- | ------------------------------------------------------------- |
| `options` | [`SampleDistancePointsOptions`](#sampledistancepointsoptions) |

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleLineFeaturesOnAreas()

> **sampleLineFeaturesOnAreas**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)\<[`LineObject`](../geojson.md#lineobject), `never`\>

#### Parameters

| Parameter    | Type                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject)\>                        |
| `options`    | [`SampleFeaturesOnAreasOptions`](#samplefeaturesonareasoptions)\<[`LineObject`](../geojson-utils/geojson.md#lineobject)\> |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)\<[`LineObject`](../geojson.md#lineobject), `never`\>

---

### sampleLineFeaturesOnAreasCheck()

> **sampleLineFeaturesOnAreasCheck**(`options`): [`SampleError`](errors.md#sampleerror)

#### Parameters

| Parameter | Type                                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------- |
| `options` | [`SampleFeaturesOnAreasOptions`](#samplefeaturesonareasoptions)\<[`LineObject`](../geojson-utils/geojson.md#lineobject)\> |

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### samplePointFeaturesOnAreas()

> **samplePointFeaturesOnAreas**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)\<[`PointObject`](../geojson.md#pointobject), `never`\>

#### Parameters

| Parameter    | Type                                                                                                                        |
| ------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject)\>                          |
| `options`    | [`SampleFeaturesOnAreasOptions`](#samplefeaturesonareasoptions)\<[`PointObject`](../geojson-utils/geojson.md#pointobject)\> |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)\<[`PointObject`](../geojson.md#pointobject), `never`\>

---

### samplePointFeaturesOnAreasCheck()

> **samplePointFeaturesOnAreasCheck**(`options`): [`SampleError`](errors.md#sampleerror)

#### Parameters

| Parameter | Type                                                                                                                        |
| --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `options` | [`SampleFeaturesOnAreasOptions`](#samplefeaturesonareasoptions)\<[`PointObject`](../geojson-utils/geojson.md#pointobject)\> |

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### samplePointsOnAreas()

> **samplePointsOnAreas**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)\<[`Point`](../geojson.md#point), `never`\>

Selects points on areas (if features have bbox, it is used in pointInPolygon
to reject point outside bbox if buffer is zero).

#### Parameters

| Parameter    | Type                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject)\> |
| `options`    | [`SamplePointsOnAreasOptions`](#samplepointsonareasoptions)                                        |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)\<[`Point`](../geojson.md#point), `never`\>

---

### samplePointsOnAreasCheck()

> **samplePointsOnAreasCheck**(`options`): [`SampleError`](errors.md#sampleerror)

#### Parameters

| Parameter | Type                                                        |
| --------- | ----------------------------------------------------------- |
| `options` | [`SamplePointsOnAreasOptions`](#samplepointsonareasoptions) |

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### samplePointsOnLines()

> **samplePointsOnLines**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)\<[`Point`](../geojson.md#point), `never`\>

Selects points according to method and sampleSize on a line layer.

#### Parameters

| Parameter    | Type                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)\<[`LineObject`](../geojson.md#lineobject)\> |
| `options`    | `OptionsBase`                                                                                      |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)\<[`Point`](../geojson.md#point), `never`\>

---

### samplePointsOnLinesCheck()

> **samplePointsOnLinesCheck**(`options`): [`SampleError`](errors.md#sampleerror)

#### Parameters

| Parameter | Type          |
| --------- | ------------- |
| `options` | `OptionsBase` |

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### samplePositionsInBbox()

> **samplePositionsInBbox**(`box`, `options`): [`Position`](../geojson-utils/geojson.md#position)[]

Generates uniform random positions in bounding box

#### Parameters

| Parameter | Type                                         | Description             |
| --------- | -------------------------------------------- | ----------------------- |
| `box`     | [`BBox`](../geojson-utils/geojson.md#bbox-7) | A GeoJSON bounding box. |
| `options` | `OptionsBase`                                | -                       |

#### Returns

[`Position`](../geojson-utils/geojson.md#position)[]

Array of GeoJSON positions.

---

### samplePositionsInBboxCheck()

> **samplePositionsInBboxCheck**(`options`): [`SampleError`](errors.md#sampleerror)

#### Parameters

| Parameter | Type          |
| --------- | ------------- |
| `options` | `OptionsBase` |

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleRelascopePoints()

> **sampleRelascopePoints**\<`P`\>(`collection`, `options`): `object`

Selects a point sample on an area frame and collect point objects from a base
layer using a relascope to determine inclusion. A buffer is needed for unbiased
estimation. The buffer should be set to the largest radius of the inclusion zones.
The largest radius depends on maximum value of sizeProperty and the factor of
the relascope, according to max(radius) = (50 \* max(sizePropertyValue)) / sqrt(factor).
Default buffer is zero, which gives a negative bias for estimates of positive
quantities.

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter    | Type                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject)\> |
| `options`    | [`SampleRelascopePointsOptions`](#samplerelascopepointsoptions)\<`P`\>                             |

#### Returns

`object`

an object containing the resulting sample, the relascope points and the area ratio

| Name          | Type                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------- |
| `areaRatio`   | `number`                                                                                      |
| `collection`  | [`FeatureCollection`](../geojson.md#featurecollection)\<[`Point`](../geojson.md#point), `P`\> |
| `pointSample` | [`FeatureCollection`](../geojson.md#featurecollection)\<[`Point`](../geojson.md#point)\>      |

---

### sampleRelascopePointsOptionsCheck()

> **sampleRelascopePointsOptionsCheck**\<`P`\>(`options`): [`SampleError`](errors.md#sampleerror)

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `P` _extends_ `string` |

#### Parameters

| Parameter | Type                                                                   |
| --------- | ---------------------------------------------------------------------- |
| `options` | [`SampleRelascopePointsOptions`](#samplerelascopepointsoptions)\<`P`\> |

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleSystematicBeltsOnAreas()

> **sampleSystematicBeltsOnAreas**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject)\>

Selects a systematic sample of belts on areas.

#### Parameters

| Parameter    | Type                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject)\> |
| `options`    | [`SampleSystematicBeltsOnAreas`](#samplesystematicbeltsonareas)                                    |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject)\>

---

### sampleSystematicBeltsOnAreasCheck()

> **sampleSystematicBeltsOnAreasCheck**(`options`): [`SampleError`](errors.md#sampleerror)

#### Parameters

| Parameter | Type                                                            |
| --------- | --------------------------------------------------------------- |
| `options` | [`SampleSystematicBeltsOnAreas`](#samplesystematicbeltsonareas) |

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleSystematicDistanceLines()

> **sampleSystematicDistanceLines**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)\<[`Point`](../geojson.md#point)\>

Distance sampling with line transects.
Selects a line sample on an area frame and collect point objects from a base
layer using a detection function to (randomly) determine inclusion.

#### Parameters

| Parameter    | Type                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject)\> |
| `options`    | [`SampleSystematicDistanceLinesOptions`](#samplesystematicdistancelinesoptions)                    |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)\<[`Point`](../geojson.md#point)\>

---

### sampleSystematicDistanceLinesCheck()

> **sampleSystematicDistanceLinesCheck**(`options`): [`SampleError`](errors.md#sampleerror)

#### Parameters

| Parameter | Type                                                                            |
| --------- | ------------------------------------------------------------------------------- |
| `options` | [`SampleSystematicDistanceLinesOptions`](#samplesystematicdistancelinesoptions) |

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleSystematicLinesOnAreas()

> **sampleSystematicLinesOnAreas**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)\<[`LineObject`](../geojson.md#lineobject)\>

Selects a sample of lines systematically over all areas.

#### Parameters

| Parameter    | Type                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)\<[`AreaObject`](../geojson.md#areaobject)\> |
| `options`    | [`SampleSystematicLinesOnAreas`](#samplesystematiclinesonareas)                                    |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)\<[`LineObject`](../geojson.md#lineobject)\>

---

### sampleSystematicLinesOnAreasCheck()

> **sampleSystematicLinesOnAreasCheck**(`options`): [`SampleError`](errors.md#sampleerror)

#### Parameters

| Parameter | Type                                                            |
| --------- | --------------------------------------------------------------- |
| `options` | [`SampleSystematicLinesOnAreas`](#samplesystematiclinesonareas) |

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleSystematicLinesOnLines()

> **sampleSystematicLinesOnLines**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)\<[`LineString`](../geojson.md#linestring), `never`\>

Selects systematic line dashes along a line layer. Each LineString recieves its
own random starting position of the dashes.

#### Parameters

| Parameter    | Type                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)\<[`LineObject`](../geojson.md#lineobject)\> |
| `options`    | [`SampleSystematicLinesOnLines`](#samplesystematiclinesonlines)                                    |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)\<[`LineString`](../geojson.md#linestring), `never`\>

---

### sampleSystematicLinesOnLinesCheck()

> **sampleSystematicLinesOnLinesCheck**(`options`): [`SampleError`](errors.md#sampleerror)

#### Parameters

| Parameter | Type                                                            |
| --------- | --------------------------------------------------------------- |
| `options` | [`SampleSystematicLinesOnLines`](#samplesystematiclinesonlines) |

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### uniformDetectionFunction()

> **uniformDetectionFunction**(): `DetectionFunction`

Returns a uniform detection function on [0, Infinity), i.e. the
detection probability is 1 if distance >= 0 and 0 otherwise.

#### Returns

`DetectionFunction`

the uniform detection function.
