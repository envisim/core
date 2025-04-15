[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [](../../README.md) / lengthOfLineString

# Function: lengthOfLineString()

> **lengthOfLineString**(`ls`): `number`

Computes the approximate length of a LineString, where each segment is
of type plate carrée.

## Parameters

| Parameter | Type                                                   | Description                 |
| --------- | ------------------------------------------------------ | --------------------------- |
| `ls`      | [`Position`](../../geojson/type-aliases/Position.md)[] | Coordinates of a LineString |

## Returns

`number`

the length of the LineString in meters.
