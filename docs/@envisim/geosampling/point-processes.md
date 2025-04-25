[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geosampling](README.md) / point-processes

# point-processes

## Contents

- [Interfaces](#interfaces)
  - [MaternClusterProcessOptions](#maternclusterprocessoptions)
  - [ThomasClusterProcessOptions](#thomasclusterprocessoptions)
  - [UniformBinomialPointProcessOptions](#uniformbinomialpointprocessoptions)
  - [UniformPoissonPointProcessOptions](#uniformpoissonpointprocessoptions)
- [Functions](#functions)
  - [maternClusterProcess()](#maternclusterprocess)
  - [thomasClusterProcess()](#thomasclusterprocess)
  - [uniformBinomialPointProcess()](#uniformbinomialpointprocess)
  - [uniformPoissonPointProcess()](#uniformpoissonpointprocess)

## Interfaces

### MaternClusterProcessOptions

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

<a id="intensityofparents"></a> `intensityOfParents`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The mean number of parent points per square meters.

</td>
</tr>
<tr>
<td>

<a id="meanofcluster"></a> `meanOfCluster`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The mean number of points in a cluster.

</td>
</tr>
<tr>
<td>

<a id="radiusofcluster"></a> `radiusOfCluster`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The radius in meters of a cluster.

</td>
</tr>
<tr>
<td>

<a id="rand"></a> `rand?`

</td>
<td>

[`Random`](../random.md#random)

</td>
<td>

`new Random()`

</td>
<td>

An RNG

</td>
</tr>
</tbody>
</table>

---

### ThomasClusterProcessOptions

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

<a id="intensityofparents-1"></a> `intensityOfParents`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The mean number of parent points per square meters.

</td>
</tr>
<tr>
<td>

<a id="meanofcluster-1"></a> `meanOfCluster`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The mean number of points in a cluster.

</td>
</tr>
<tr>
<td>

<a id="rand-1"></a> `rand?`

</td>
<td>

[`Random`](../random.md#random)

</td>
<td>

`new Random()`

</td>
<td>

An RNG

</td>
</tr>
<tr>
<td>

<a id="sigmaofcluster"></a> `sigmaOfCluster`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The standard deviation of distance to parent.

</td>
</tr>
</tbody>
</table>

---

### UniformBinomialPointProcessOptions

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

<a id="rand-2"></a> `rand?`

</td>
<td>

[`Random`](../random.md#random)

</td>
<td>

`new Random()`

</td>
<td>

An RNG

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

The number of points to generate.

</td>
</tr>
</tbody>
</table>

---

### UniformPoissonPointProcessOptions

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

<a id="intensity"></a> `intensity`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

The intensity as mean number of points per square meters.

</td>
</tr>
<tr>
<td>

<a id="rand-3"></a> `rand?`

</td>
<td>

[`Random`](../random.md#random)

</td>
<td>

`new Random()`

</td>
<td>

An RNG

</td>
</tr>
</tbody>
</table>

## Functions

### maternClusterProcess()

> **maternClusterProcess**(`collection`, `opts`): [`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

Generates points from a Matérn cluster point process
on an area collection.

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

`opts`

</td>
<td>

[`MaternClusterProcessOptions`](#maternclusterprocessoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

---

### thomasClusterProcess()

> **thomasClusterProcess**(`collection`, `opts`): [`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

Generates points from a Thomas cluster point process
on areas of input area collection.

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

`opts`

</td>
<td>

[`ThomasClusterProcessOptions`](#thomasclusterprocessoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

---

### uniformBinomialPointProcess()

> **uniformBinomialPointProcess**(`collection`, `opts`): [`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

Generate points from a uniform Binomial point process
on areas of input area collection. The points are generated
uniformly on a spherical model of the earth.

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

`opts`

</td>
<td>

[`UniformBinomialPointProcessOptions`](#uniformbinomialpointprocessoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

---

### uniformPoissonPointProcess()

> **uniformPoissonPointProcess**(`collection`, `opts`): [`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

Generates points from a uniform Poisson point process
on areas of input collection. Given the (Poisson distributed)
random number of points, the points are generated uniformly
on a spherical model of the earth.

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

`opts`

</td>
<td>

[`UniformPoissonPointProcessOptions`](#uniformpoissonpointprocessoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>
