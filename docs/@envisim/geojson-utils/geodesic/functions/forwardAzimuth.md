[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geojson-utils](../../README.md) / [geodesic](../README.md) / forwardAzimuth

# Function: forwardAzimuth()

> **forwardAzimuth**(`p1`, `p2`): `number`

Computes the forward azimuth (angle from north) from the first point
to the second point for a geodesic path between the points.
The azimuth takes values in the range -180 to +180.

## Parameters

| Parameter | theme_type                                           | theme_description                             |
| --------- | ---------------------------------------------------- | --------------------------------------------- |
| `p1`      | [`Position`](../../geojson/type-aliases/Position.md) | point coordinates [lon,lat] for first point.  |
| `p2`      | [`Position`](../../geojson/type-aliases/Position.md) | point coordinates [lon,lat] for second point. |

## Returns

`number`

the forward azimuth in degrees.
