[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / @envisim/geosampling/select-intersects

# @envisim/geosampling/select-intersects

## Contents

- [Functions](#functions)
  - [selectAreaIntersectsArea()](#selectareaintersectsarea)
  - [selectAreaIntersectsLine()](#selectareaintersectsline)
  - [selectAreaIntersectsPoint()](#selectareaintersectspoint)
  - [selectLineIntersectsArea()](#selectlineintersectsarea)
  - [selectPointIntersectsArea()](#selectpointintersectsarea)

## Functions

### selectAreaIntersectsArea()

> **selectAreaIntersectsArea**<`P`>(`frame`, `base`): [`FeatureCollection`](../../../geojson.md#featurecollection)<[`AreaObject`](../../../geojson.md#areaobject), `P`>

Select intersect of features as the new frame from base-collection.

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

`frame`

</td>
<td>

[`FeatureCollection`](../../../geojson.md#featurecollection)<[`AreaObject`](../../../geojson.md#areaobject)>

</td>
</tr>
<tr>
<td>

`base`

</td>
<td>

[`FeatureCollection`](../../../geojson.md#featurecollection)<[`AreaObject`](../../../geojson.md#areaobject), `P`>

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../../../geojson.md#featurecollection)<[`AreaObject`](../../../geojson.md#areaobject), `P`>

---

### selectAreaIntersectsLine()

> **selectAreaIntersectsLine**<`P`>(`frame`, `base`): [`FeatureCollection`](../../../geojson.md#featurecollection)<[`LineObject`](../../../geojson.md#lineobject), `P`>

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

`frame`

</td>
<td>

[`FeatureCollection`](../../../geojson.md#featurecollection)<[`LineObject`](../../../geojson.md#lineobject)>

</td>
</tr>
<tr>
<td>

`base`

</td>
<td>

[`FeatureCollection`](../../../geojson.md#featurecollection)<[`AreaObject`](../../../geojson.md#areaobject), `P`>

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../../../geojson.md#featurecollection)<[`LineObject`](../../../geojson.md#lineobject), `P`>

---

### selectAreaIntersectsPoint()

> **selectAreaIntersectsPoint**<`P`>(`frame`, `base`): [`FeatureCollection`](../../../geojson.md#featurecollection)<[`PointObject`](../../../geojson.md#pointobject), `P`>

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

`frame`

</td>
<td>

[`FeatureCollection`](../../../geojson.md#featurecollection)<[`PointObject`](../../../geojson.md#pointobject)>

</td>
</tr>
<tr>
<td>

`base`

</td>
<td>

[`FeatureCollection`](../../../geojson.md#featurecollection)<[`AreaObject`](../../../geojson.md#areaobject), `P`>

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../../../geojson.md#featurecollection)<[`PointObject`](../../../geojson.md#pointobject), `P`>

---

### selectLineIntersectsArea()

> **selectLineIntersectsArea**<`P`>(`frame`, `base`): [`FeatureCollection`](../../../geojson.md#featurecollection)<[`LineObject`](../../../geojson.md#lineobject), `P`>

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

`frame`

</td>
<td>

[`FeatureCollection`](../../../geojson.md#featurecollection)<[`AreaObject`](../../../geojson.md#areaobject)>

</td>
</tr>
<tr>
<td>

`base`

</td>
<td>

[`FeatureCollection`](../../../geojson.md#featurecollection)<[`LineObject`](../../../geojson.md#lineobject), `P`>

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../../../geojson.md#featurecollection)<[`LineObject`](../../../geojson.md#lineobject), `P`>

---

### selectPointIntersectsArea()

> **selectPointIntersectsArea**<`P`>(`frame`, `base`): [`FeatureCollection`](../../../geojson.md#featurecollection)<[`PointObject`](../../../geojson.md#pointobject), `P`>

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

`frame`

</td>
<td>

[`FeatureCollection`](../../../geojson.md#featurecollection)<[`AreaObject`](../../../geojson.md#areaobject)>

</td>
</tr>
<tr>
<td>

`base`

</td>
<td>

[`FeatureCollection`](../../../geojson.md#featurecollection)<[`PointObject`](../../../geojson.md#pointobject), `P`>

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../../../geojson.md#featurecollection)<[`PointObject`](../../../geojson.md#pointobject), `P`>
