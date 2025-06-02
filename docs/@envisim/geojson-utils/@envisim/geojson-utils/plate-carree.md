[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geojson-utils](../../README.md) / @envisim/geojson-utils/plate-carree

# @envisim/geojson-utils/plate-carree

## Contents

- [Functions](#functions)
  - [areaOfRing()](#areaofring)
  - [distance()](#distance)
  - [intermediate()](#intermediate)

## Functions

### areaOfRing()

> **areaOfRing**(`ring`): `number`

Computes the area of a polygon ring where the segments are
defined as \[lon1 + t \* (lon2 - lon1), lat1 + t \* (lat2 - lat1)], for
0 <= t <= 1.

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

`ring`

</td>
<td>

[`Position`](geojson.md#position)\[]

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the area in square meters.

---

### distance()

> **distance**(`p1`, `p2`): `number`

Computes the plate carrée distance between two points

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

`p1`

</td>
<td>

[`Position`](geojson.md#position)

</td>
<td>

the first point

</td>
</tr>
<tr>
<td>

`p2`

</td>
<td>

[`Position`](geojson.md#position)

</td>
<td>

the second point

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the distance in meters

---

### intermediate()

> **intermediate**(`p1`, `p2`, `fraction`): [`Position2`](geojson.md#position2)

Computes a position on the segment at a fraction of the length of the
segment, where the segment is of type plate carrée.

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

`p1`

</td>
<td>

[`Position`](geojson.md#position)

</td>
<td>

start point \[lon,lat]

</td>
</tr>
<tr>
<td>

`p2`

</td>
<td>

[`Position`](geojson.md#position)

</td>
<td>

end point \[lon,lat]

</td>
</tr>
<tr>
<td>

`fraction`

</td>
<td>

`number`

</td>
<td>

the fraction of the length

</td>
</tr>
</tbody>
</table>

#### Returns

[`Position2`](geojson.md#position2)

the position on the segment

#### Throws

ValidationError if number is not in the interval \[0,1]
