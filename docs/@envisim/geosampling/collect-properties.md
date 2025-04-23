[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geosampling](README.md) / collect-properties

# collect-properties

## Contents

- [Functions](#functions)
  - [collectProperties()](#collectproperties)
  - [collectPropertyRecord()](#collectpropertyrecord)

## Functions

### collectProperties()

> **collectProperties**<`PF`, `PB`, `GF`>(`frame`, `base`, `properties`): [`FeatureCollection`](../geojson.md#featurecollection)<`GF`, `string` | `PF`>

Collect properties to a frame layer from a base layer, given an
array of properties to be collected. Categorical properties are collected as
multiple numerical properties, one for each category.

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

`PF` _extends_ `string`

</td>
</tr>
<tr>
<td>

`PB` _extends_ `string`

</td>
</tr>
<tr>
<td>

`GF` _extends_ [`PureObject`](../geojson.md#pureobject)

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

[`FeatureCollection`](../geojson.md#featurecollection)<`GF`, `PF`>

</td>
</tr>
<tr>
<td>

`base`

</td>
<td>

[`FeatureCollection`](../geojson.md#featurecollection)<[`RetractingObject`](../geojson.md#retractingobject)<`GF`>, `PB`>

</td>
</tr>
<tr>
<td>

`properties`

</td>
<td>

[`PropertyRecord`](../geojson.md#propertyrecord-1)<`PB`> | `PB`\[]

</td>
</tr>
</tbody>
</table>

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<`GF`, `string` | `PF`>

collection

---

### collectPropertyRecord()

> **collectPropertyRecord**<`P`>(`propertyRecord`, `properties`): [`PropertyRecord`](../geojson.md#propertyrecord-1)<`string`>

Derives the resulting property record of collected properties.
This property record needs to be merged with the existing
property record for a complete record of properties available
after a collect operation. Merge is done automatically when
using collectProperties.

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
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`propertyRecord`

</td>
<td>

[`PropertyRecord`](../geojson.md#propertyrecord-1)<`P`>

</td>
<td>

the property record to collect from.

</td>
</tr>
<tr>
<td>

`properties`

</td>
<td>

`P`\[]

</td>
<td>

the ids of the properties to collect.

</td>
</tr>
</tbody>
</table>

#### Returns

[`PropertyRecord`](../geojson.md#propertyrecord-1)<`string`>

the property record collected properties.
