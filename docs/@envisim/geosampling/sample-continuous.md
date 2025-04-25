[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geosampling](README.md) / sample-continuous

# sample-continuous

## Contents

- [Interfaces](#interfaces)
  - [SampleFeaturesOnAreasOptions\<G>](#samplefeaturesonareasoptionsg)
  - [SamplePointsOnAreasOptions](#samplepointsonareasoptions)
  - [SampleRelascopePointsOptions\<P>](#samplerelascopepointsoptionsp)
  - [SampleSystematicBeltsOnAreas](#samplesystematicbeltsonareas)
  - [SampleSystematicDistanceLinesOptions](#samplesystematicdistancelinesoptions)
  - [SampleSystematicLinesOnAreas](#samplesystematiclinesonareas)
- [Type Aliases](#type-aliases)
  - [SampleDistancePointsOptions](#sampledistancepointsoptions)
  - [SamplePointsOnLinesOptions](#samplepointsonlinesoptions)
  - [SamplePositionsInBbox](#samplepositionsinbbox)
  - [SampleSystematicLinesOnLines](#samplesystematiclinesonlines)
- [Functions](#functions)
  - [effectiveHalfWidth()](#effectivehalfwidth)
  - [effectiveRadius()](#effectiveradius)
  - [halfNormalDetectionFunction()](#halfnormaldetectionfunction)
  - [integrate()](#integrate)
  - [sampleAreaFeaturesOnAreas()](#sampleareafeaturesonareas)
  - [sampleAreaFeaturesOnAreasCheck()](#sampleareafeaturesonareascheck)
  - [sampleDistancePoints()](#sampledistancepoints)
  - [sampleDistancePointsCheck()](#sampledistancepointscheck)
  - [sampleLineFeaturesOnAreas()](#samplelinefeaturesonareas)
  - [sampleLineFeaturesOnAreasCheck()](#samplelinefeaturesonareascheck)
  - [samplePointFeaturesOnAreas()](#samplepointfeaturesonareas)
  - [samplePointFeaturesOnAreasCheck()](#samplepointfeaturesonareascheck)
  - [samplePointsOnAreas()](#samplepointsonareas)
  - [samplePointsOnAreasCheck()](#samplepointsonareascheck)
  - [samplePointsOnLines()](#samplepointsonlines)
  - [samplePointsOnLinesCheck()](#samplepointsonlinescheck)
  - [samplePositionsInBbox()](#samplepositionsinbbox-1)
  - [samplePositionsInBboxCheck()](#samplepositionsinbboxcheck)
  - [sampleRelascopePoints()](#samplerelascopepoints)
  - [sampleRelascopePointsOptionsCheck()](#samplerelascopepointsoptionscheck)
  - [sampleSystematicBeltsOnAreas()](#samplesystematicbeltsonareas-1)
  - [sampleSystematicBeltsOnAreasCheck()](#samplesystematicbeltsonareascheck)
  - [sampleSystematicDistanceLines()](#samplesystematicdistancelines)
  - [sampleSystematicDistanceLinesCheck()](#samplesystematicdistancelinescheck)
  - [sampleSystematicLinesOnAreas()](#samplesystematiclinesonareas-1)
  - [sampleSystematicLinesOnAreasCheck()](#samplesystematiclinesonareascheck)
  - [sampleSystematicLinesOnLines()](#samplesystematiclinesonlines-1)
  - [sampleSystematicLinesOnLinesCheck()](#samplesystematiclinesonlinescheck)
  - [uniformDetectionFunction()](#uniformdetectionfunction)

## Interfaces

### SampleFeaturesOnAreasOptions\<G>

#### Extends

- `OptionsPointsOnAreas`

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

`G` _extends_ [`SingleTypeObject`](../geojson-utils/geojson.md#singletypeobject)

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

<a id="modelgeometry"></a> `modelGeometry`

</td>
<td>

`G`

</td>
<td>

`undefined`

</td>
<td>

A model feature of points or lines or areas to be placed on the selected points.

</td>
</tr>
<tr>
<td>

<a id="pointselection"></a> `pointSelection?`

</td>
<td>

`"independent"` | `"systematic"`

</td>
<td>

`'independent'`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="pointspercircle"></a> `pointsPerCircle?`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The number of vertices to create on the circle

</td>
</tr>
<tr>
<td>

<a id="rand"></a> `rand?`

</td>
<td>

[`RandomGenerator`](../random.md#randomgenerator)

</td>
<td>

`new Random()`

</td>
<td>

An random number generator

</td>
</tr>
<tr>
<td>

<a id="ratio"></a> `ratio?`

</td>
<td>

`number`

</td>
<td>

`1.0`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="rotationofgeometry"></a> `rotationOfGeometry?`

</td>
<td>

`number` | `"random"`

</td>
<td>

`0.0`

</td>
<td>

Optional rotation angle in degrees to rotate the model geometry.
Random rotation is forced for line geometries -- option is ignored.

</td>
</tr>
<tr>
<td>

<a id="rotationofgrid"></a> `rotationOfGrid?`

</td>
<td>

`number` | `"random"`

</td>
<td>

`0.0`

</td>
<td>

If true, then the grid will be rotated (systematic only)

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

Prescribed sample size

</td>
</tr>
</tbody>
</table>

---

### SamplePointsOnAreasOptions

#### Extends

- `OptionsPointsOnAreas`

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

<a id="buffer"></a> `buffer?`

</td>
<td>

`number`

</td>
<td>

`0.0`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="pointselection-1"></a> `pointSelection?`

</td>
<td>

`"independent"` | `"systematic"`

</td>
<td>

`'independent'`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="pointspercircle-1"></a> `pointsPerCircle?`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The number of vertices to create on the circle

</td>
</tr>
<tr>
<td>

<a id="rand-1"></a> `rand?`

</td>
<td>

[`RandomGenerator`](../random.md#randomgenerator)

</td>
<td>

`new Random()`

</td>
<td>

An random number generator

</td>
</tr>
<tr>
<td>

<a id="ratio-1"></a> `ratio?`

</td>
<td>

`number`

</td>
<td>

`1.0`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="rotationofgrid-1"></a> `rotationOfGrid?`

</td>
<td>

`number` | `"random"`

</td>
<td>

`0.0`

</td>
<td>

If true, then the grid will be rotated (systematic only)

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

Prescribed sample size

</td>
</tr>
</tbody>
</table>

---

### SampleRelascopePointsOptions\<P>

#### Extends

- `OptionsPointsOnAreas`

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

<a id="basecollection"></a> `baseCollection`

</td>
<td>

[`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `P`>

</td>
<td>

`undefined`

</td>
<td>

The point layer to collect objects from.

</td>
</tr>
<tr>
<td>

<a id="buffer-1"></a> `buffer?`

</td>
<td>

`number`

</td>
<td>

`0.0`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="factor"></a> `factor`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The relascope factor to be used.

</td>
</tr>
<tr>
<td>

<a id="pointselection-2"></a> `pointSelection?`

</td>
<td>

`"independent"` | `"systematic"`

</td>
<td>

`'independent'`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="pointspercircle-2"></a> `pointsPerCircle?`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The number of vertices to create on the circle

</td>
</tr>
<tr>
<td>

<a id="rand-2"></a> `rand?`

</td>
<td>

[`RandomGenerator`](../random.md#randomgenerator)

</td>
<td>

`new Random()`

</td>
<td>

An random number generator

</td>
</tr>
<tr>
<td>

<a id="ratio-2"></a> `ratio?`

</td>
<td>

`number`

</td>
<td>

`1.0`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="rotationofgrid-2"></a> `rotationOfGrid?`

</td>
<td>

`number` | `"random"`

</td>
<td>

`0.0`

</td>
<td>

If true, then the grid will be rotated (systematic only)

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

Prescribed sample size

</td>
</tr>
<tr>
<td>

<a id="sizeproperty"></a> `sizeProperty`

</td>
<td>

`P`

</td>
<td>

`undefined`

</td>
<td>

The sizeProperty is the id of the proberty in the baseLayer that should
be used as the size property and should be in meters (e.g. diameter in meters).

</td>
</tr>
</tbody>
</table>

---

### SampleSystematicBeltsOnAreas

#### Extends

- `OptionsCircleConversion`.`OptionsParallelLines`

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

<a id="halfwidth"></a> `halfWidth`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The half-width of the belt.

</td>
</tr>
<tr>
<td>

<a id="interspace"></a> `interspace`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The distance in meters between the parallel lines.

</td>
</tr>
<tr>
<td>

<a id="pointspercircle-3"></a> `pointsPerCircle?`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The number of vertices to create on the circle

</td>
</tr>
<tr>
<td>

<a id="rand-3"></a> `rand?`

</td>
<td>

[`RandomGenerator`](../random.md#randomgenerator)

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="rotation"></a> `rotation?`

</td>
<td>

`number`

</td>
<td>

`0.0`

</td>
<td>

Optional fixed rotation angle in degrees.

</td>
</tr>
</tbody>
</table>

---

### SampleSystematicDistanceLinesOptions

#### Extends

- `OptionsCircleConversion`.`OptionsParallelLines`.`OptionsDistancePoints`

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

<a id="basecollection-1"></a> `baseCollection`

</td>
<td>

[`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point)>

</td>
<td>

`undefined`

</td>
<td>

The point layer to collect objects from.

</td>
</tr>
<tr>
<td>

<a id="cutoff"></a> `cutoff`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The cutoff distance in meters.

</td>
</tr>
<tr>
<td>

<a id="detectionfunction"></a> `detectionFunction`

</td>
<td>

`DetectionFunction`

</td>
<td>

`undefined`

</td>
<td>

The detection function giving the detection probability as a
function of distance.

</td>
</tr>
<tr>
<td>

<a id="interspace-1"></a> `interspace`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The distance in meters between the parallel lines.

</td>
</tr>
<tr>
<td>

<a id="pointspercircle-4"></a> `pointsPerCircle?`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The number of vertices to create on the circle

</td>
</tr>
<tr>
<td>

<a id="rand-4"></a> `rand?`

</td>
<td>

[`RandomGenerator`](../random.md#randomgenerator)

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="rotation-1"></a> `rotation?`

</td>
<td>

`number`

</td>
<td>

`0.0`

</td>
<td>

Optional fixed rotation angle in degrees.

</td>
</tr>
</tbody>
</table>

---

### SampleSystematicLinesOnAreas

#### Extends

- `OptionsCircleConversion`.`OptionsParallelLines`

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

<a id="interspace-2"></a> `interspace`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The distance in meters between the parallel lines.

</td>
</tr>
<tr>
<td>

<a id="pointspercircle-5"></a> `pointsPerCircle?`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The number of vertices to create on the circle

</td>
</tr>
<tr>
<td>

<a id="rand-5"></a> `rand?`

</td>
<td>

[`RandomGenerator`](../random.md#randomgenerator)

</td>
<td>

`undefined`

</td>
<td>

‐

</td>
</tr>
<tr>
<td>

<a id="rotation-2"></a> `rotation?`

</td>
<td>

`number`

</td>
<td>

`0.0`

</td>
<td>

Optional fixed rotation angle in degrees.

</td>
</tr>
</tbody>
</table>

## Type Aliases

### SampleDistancePointsOptions

> **SampleDistancePointsOptions** = [`SampleDistancePointsOptions`](#sampledistancepointsoptions)

---

### SamplePointsOnLinesOptions

> **SamplePointsOnLinesOptions** = `OptionsBase`

---

### SamplePositionsInBbox

> **SamplePositionsInBbox** = `OptionsBase`

---

### SampleSystematicLinesOnLines

> **SampleSystematicLinesOnLines** = { `dashLength`: `number`; `rand`: [`RandomGenerator`](../random.md#randomgenerator); `voidLength`: `number`; }

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

<a id="dashlength"></a> `dashLength`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The dash length

</td>
</tr>
<tr>
<td>

<a id="rand-6"></a> `rand?`

</td>
<td>

[`RandomGenerator`](../random.md#randomgenerator)

</td>
<td>

`new Random()`

</td>
<td>

An random number generator

</td>
</tr>
<tr>
<td>

<a id="voidlength"></a> `voidLength`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The void length

</td>
</tr>
</tbody>
</table>

## Functions

### effectiveHalfWidth()

> **effectiveHalfWidth**(`g`, `cutoff`): `number`

Computes the effective half width for distance sampling along a line.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`g`

</td>
<td>

`DetectionFunction`

</td>
<td>

detection function (should return detection probability, given distance in meters).

</td>
</tr>
<tr>
<td>

`cutoff`

</td>
<td>

`number`

</td>
<td>

maximum detection distance in meters.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the effective half width in meters.

---

### effectiveRadius()

> **effectiveRadius**(`g`, `cutoff`): `number`

Computes the effective radius for distance sampling with points.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`g`

</td>
<td>

`DetectionFunction`

</td>
<td>

detection function (should return detection probability, given distance in meters).

</td>
</tr>
<tr>
<td>

`cutoff`

</td>
<td>

`number`

</td>
<td>

maximum detection distance in meters.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the effective radius in meters.

---

### halfNormalDetectionFunction()

> **halfNormalDetectionFunction**(`sigma`): `DetectionFunction`

Returns a half normal detection function on \[0, Infinity).

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`sigma`

</td>
<td>

`number`

</td>
<td>

the sigma parameter.

</td>
</tr>
</tbody>
</table>

#### Returns

`DetectionFunction`

the half normal detection function.

---

### integrate()

> **integrate**(`f`, `a`, `b`, `n`): `number`

Integrate a function f from a to b.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`f`

</td>
<td>

`IntegrateFunction`

</td>
<td>

`undefined`

</td>
<td>

function to integrate.

</td>
</tr>
<tr>
<td>

`a`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

lower limit a > -Infinity.

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

upper limit b > a and b < Infinity.

</td>
</tr>
<tr>
<td>

`n`

</td>
<td>

`number`

</td>
<td>

`100`

</td>
<td>

optional, number of intervals will be 3n (default n = 100).

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

number, f integrated from a to b.

---

### sampleAreaFeaturesOnAreas()

> **sampleAreaFeaturesOnAreas**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject), `never`>

Select a sample of features/tracts on areas.

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

[`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject)>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`SampleFeaturesOnAreasOptions`](#samplefeaturesonareasoptions)<[`AreaObject`](../geojson-utils/geojson.md#areaobject)>

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject), `never`>

---

### sampleAreaFeaturesOnAreasCheck()

> **sampleAreaFeaturesOnAreasCheck**(`options`): [`SampleError`](errors.md#sampleerror)

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

[`SampleFeaturesOnAreasOptions`](#samplefeaturesonareasoptions)<[`AreaObject`](../geojson-utils/geojson.md#areaobject)>

</td>
</tr>
</tbody>
</table>

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleDistancePoints()

> **sampleDistancePoints**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<[`PointObject`](../geojson.md#pointobject)>

Distance sampling with points. Selects a point sample on an area layer
and collect point objects from a base layer using a detection function
to (randomly) determine inclusion.

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

[`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject)>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`SampleDistancePointsOptions`](#sampledistancepointsoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`PointObject`](../geojson.md#pointobject)>

---

### sampleDistancePointsCheck()

> **sampleDistancePointsCheck**(`options`): [`SampleError`](errors.md#sampleerror)

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

[`SampleDistancePointsOptions`](#sampledistancepointsoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleLineFeaturesOnAreas()

> **sampleLineFeaturesOnAreas**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<[`LineObject`](../geojson.md#lineobject), `never`>

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

[`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject)>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`SampleFeaturesOnAreasOptions`](#samplefeaturesonareasoptions)<[`LineObject`](../geojson-utils/geojson.md#lineobject)>

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`LineObject`](../geojson.md#lineobject), `never`>

---

### sampleLineFeaturesOnAreasCheck()

> **sampleLineFeaturesOnAreasCheck**(`options`): [`SampleError`](errors.md#sampleerror)

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

[`SampleFeaturesOnAreasOptions`](#samplefeaturesonareasoptions)<[`LineObject`](../geojson-utils/geojson.md#lineobject)>

</td>
</tr>
</tbody>
</table>

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### samplePointFeaturesOnAreas()

> **samplePointFeaturesOnAreas**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<[`PointObject`](../geojson.md#pointobject), `never`>

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

[`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject)>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`SampleFeaturesOnAreasOptions`](#samplefeaturesonareasoptions)<[`PointObject`](../geojson-utils/geojson.md#pointobject)>

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`PointObject`](../geojson.md#pointobject), `never`>

---

### samplePointFeaturesOnAreasCheck()

> **samplePointFeaturesOnAreasCheck**(`options`): [`SampleError`](errors.md#sampleerror)

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

[`SampleFeaturesOnAreasOptions`](#samplefeaturesonareasoptions)<[`PointObject`](../geojson-utils/geojson.md#pointobject)>

</td>
</tr>
</tbody>
</table>

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### samplePointsOnAreas()

> **samplePointsOnAreas**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

Selects points on areas (if features have bbox, it is used in pointInPolygon
to reject point outside bbox if buffer is zero).

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

[`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject)>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`SamplePointsOnAreasOptions`](#samplepointsonareasoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

---

### samplePointsOnAreasCheck()

> **samplePointsOnAreasCheck**(`options`): [`SampleError`](errors.md#sampleerror)

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

[`SamplePointsOnAreasOptions`](#samplepointsonareasoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### samplePointsOnLines()

> **samplePointsOnLines**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

Selects points according to method and sampleSize on a line layer.

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

[`FeatureCollection`](../geojson.md#featurecollection)<[`LineObject`](../geojson.md#lineobject)>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`OptionsBase`

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

---

### samplePointsOnLinesCheck()

> **samplePointsOnLinesCheck**(`options`): [`SampleError`](errors.md#sampleerror)

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

`OptionsBase`

</td>
</tr>
</tbody>
</table>

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### samplePositionsInBbox()

> **samplePositionsInBbox**(`box`, `options`): [`Position`](../geojson-utils/geojson.md#position)\[]

Generates uniform random positions in bounding box

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`box`

</td>
<td>

[`BBox`](../geojson-utils/geojson.md#bbox-7)

</td>
<td>

A GeoJSON bounding box.

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`OptionsBase`

</td>
<td>

‐

</td>
</tr>
</tbody>
</table>

#### Returns

[`Position`](../geojson-utils/geojson.md#position)\[]

Array of GeoJSON positions.

---

### samplePositionsInBboxCheck()

> **samplePositionsInBboxCheck**(`options`): [`SampleError`](errors.md#sampleerror)

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

`OptionsBase`

</td>
</tr>
</tbody>
</table>

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleRelascopePoints()

> **sampleRelascopePoints**<`P`>(`collection`, `options`): { `areaRatio`: `number`; `collection`: [`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `P`>; `pointSample`: [`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point)>; }

Selects a point sample on an area frame and collect point objects from a base
layer using a relascope to determine inclusion. A buffer is needed for unbiased
estimation. The buffer should be set to the largest radius of the inclusion zones.
The largest radius depends on maximum value of sizeProperty and the factor of
the relascope, according to max(radius) = (50 \* max(sizePropertyValue)) / sqrt(factor).
Default buffer is zero, which gives a negative bias for estimates of positive
quantities.

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

`collection`

</td>
<td>

[`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject)>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`SampleRelascopePointsOptions`](#samplerelascopepointsoptions)<`P`>

</td>
</tr>
</tbody>
</table>

#### Returns

{ `areaRatio`: `number`; `collection`: [`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `P`>; `pointSample`: [`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point)>; }

an object containing the resulting sample, the relascope points and the area ratio

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`areaRatio`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`collection`

</td>
<td>

[`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `P`>

</td>
</tr>
<tr>
<td>

`pointSample`

</td>
<td>

[`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point)>

</td>
</tr>
</tbody>
</table>

---

### sampleRelascopePointsOptionsCheck()

> **sampleRelascopePointsOptionsCheck**<`P`>(`options`): [`SampleError`](errors.md#sampleerror)

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

[`SampleRelascopePointsOptions`](#samplerelascopepointsoptions)<`P`>

</td>
</tr>
</tbody>
</table>

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleSystematicBeltsOnAreas()

> **sampleSystematicBeltsOnAreas**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject)>

Selects a systematic sample of belts on areas.

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

[`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject)>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`SampleSystematicBeltsOnAreas`](#samplesystematicbeltsonareas)

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject)>

---

### sampleSystematicBeltsOnAreasCheck()

> **sampleSystematicBeltsOnAreasCheck**(`options`): [`SampleError`](errors.md#sampleerror)

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

[`SampleSystematicBeltsOnAreas`](#samplesystematicbeltsonareas)

</td>
</tr>
</tbody>
</table>

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleSystematicDistanceLines()

> **sampleSystematicDistanceLines**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point)>

Distance sampling with line transects.
Selects a line sample on an area frame and collect point objects from a base
layer using a detection function to (randomly) determine inclusion.

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

[`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject)>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`SampleSystematicDistanceLinesOptions`](#samplesystematicdistancelinesoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point)>

---

### sampleSystematicDistanceLinesCheck()

> **sampleSystematicDistanceLinesCheck**(`options`): [`SampleError`](errors.md#sampleerror)

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

[`SampleSystematicDistanceLinesOptions`](#samplesystematicdistancelinesoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleSystematicLinesOnAreas()

> **sampleSystematicLinesOnAreas**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<[`LineObject`](../geojson.md#lineobject)>

Selects a sample of lines systematically over all areas.

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

[`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject)>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`SampleSystematicLinesOnAreas`](#samplesystematiclinesonareas)

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`LineObject`](../geojson.md#lineobject)>

---

### sampleSystematicLinesOnAreasCheck()

> **sampleSystematicLinesOnAreasCheck**(`options`): [`SampleError`](errors.md#sampleerror)

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

[`SampleSystematicLinesOnAreas`](#samplesystematiclinesonareas)

</td>
</tr>
</tbody>
</table>

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### sampleSystematicLinesOnLines()

> **sampleSystematicLinesOnLines**(`collection`, `options`): [`FeatureCollection`](../geojson.md#featurecollection)<[`LineString`](../geojson.md#linestring), `never`>

Selects systematic line dashes along a line layer. Each LineString recieves its
own random starting position of the dashes.

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

[`FeatureCollection`](../geojson.md#featurecollection)<[`LineObject`](../geojson.md#lineobject)>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`SampleSystematicLinesOnLines`](#samplesystematiclinesonlines)

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`LineString`](../geojson.md#linestring), `never`>

---

### sampleSystematicLinesOnLinesCheck()

> **sampleSystematicLinesOnLinesCheck**(`options`): [`SampleError`](errors.md#sampleerror)

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

[`SampleSystematicLinesOnLines`](#samplesystematiclinesonlines)

</td>
</tr>
</tbody>
</table>

#### Returns

[`SampleError`](errors.md#sampleerror)

---

### uniformDetectionFunction()

> **uniformDetectionFunction**(): `DetectionFunction`

Returns a uniform detection function on \[0, Infinity), i.e. the
detection probability is 1 if distance >= 0 and 0 otherwise.

#### Returns

`DetectionFunction`

the uniform detection function.
