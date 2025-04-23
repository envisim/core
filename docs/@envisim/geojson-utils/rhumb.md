[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geojson-utils](README.md) / rhumb

# rhumb

## Contents

- [Functions](#functions)
  - [areaOfRing()](#areaofring)
  - [destination()](#destination)
  - [distance()](#distance)
  - [forwardAzimuth()](#forwardazimuth)
  - [intermediate()](#intermediate)
  - [plateCarreeAreaOfRing()](#platecarreeareaofring)

## Functions

### areaOfRing()

> **areaOfRing**(`ring`): `number`

Computes the area of a rhumb polygon ring

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

### destination()

> **destination**(`origin`, `dist`, `azimuth`): [`Position2`](geojson.md#position2)

Computes the destination point on a rhumb line given a point,
a distance and an azimuth.

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

`origin`

</td>
<td>

[`Position`](geojson.md#position)

</td>
<td>

point coordinates \[lon,lat].

</td>
</tr>
<tr>
<td>

`dist`

</td>
<td>

`number`

</td>
<td>

the distance in meters.

</td>
</tr>
<tr>
<td>

`azimuth`

</td>
<td>

`number`

</td>
<td>

azimuth (angle) clockwise from north in degrees.

</td>
</tr>
</tbody>
</table>

#### Returns

[`Position2`](geojson.md#position2)

the coordinates \[lon,lat] of the destination point.

---

### distance()

> **distance**(`p1`, `p2`): `number`

Computes the distance in meters along a rhumb line between two point coordinates.

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

point coordinates \[lon,lat].

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

point coordinates \[lon,lat].

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the distance in meters.

---

### forwardAzimuth()

> **forwardAzimuth**(`p1`, `p2`): `number`

Computes the forward azimuth (angle from north) from the first point
to the second point for a rhumb line between the points.
The azimuth takes values in the range -180 to +180.

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

point coordinates \[lon,lat] for first point.

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

point coordinates \[lon,lat] for second point.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

the forward azimuth in degrees.

---

### intermediate()

> **intermediate**(`p1`, `p2`, `fraction`): [`Position2`](geojson.md#position2)

Computes an intermediate point on a rhumb line given a start point,
an end point and the fraction of the distance.

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

point coordinates \[lon,lat] for start point.

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

point coordinates \[lon,lat] for end point.

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

the fraction of distance between the points.

</td>
</tr>
</tbody>
</table>

#### Returns

[`Position2`](geojson.md#position2)

the coordinates \[lon,lat] of the intermediate point.

---

### plateCarreeAreaOfRing()

> **plateCarreeAreaOfRing**(`ring`): `number`

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
