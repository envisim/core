[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geosampling](README.md) / point-processes

# point-processes

## Contents

- [Functions](#functions)
  - [maternClusterProcess()](#maternclusterprocess)
  - [thomasClusterProcess()](#thomasclusterprocess)
  - [uniformBinomialPointProcess()](#uniformbinomialpointprocess)
  - [uniformPoissonPointProcess()](#uniformpoissonpointprocess)

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

`MaternClusterProcessOptions`

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

`ThomasClusterProcessOptions`

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

`UniformBinomialPointProcessOptions`

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

`UniformPoissonProcessOptions`

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>
