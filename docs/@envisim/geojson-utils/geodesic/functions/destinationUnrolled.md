[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geojson-utils](../../README.md) / [geodesic](../README.md) / destinationUnrolled

# Function: destinationUnrolled()

> **destinationUnrolled**(`point`, `dist`, `azimuth`): [`Position2`](../../geojson/type-aliases/Position2.md)

Computes the destination point on a geodesic path given a point,
a distance and an azimuth.

## Parameters

| Parameter | theme_type                                           | theme_description                                |
| --------- | ---------------------------------------------------- | ------------------------------------------------ |
| `point`   | [`Position`](../../geojson/type-aliases/Position.md) | point coordinates [lon,lat].                     |
| `dist`    | `number`                                             | the distance in meters.                          |
| `azimuth` | `number`                                             | azimuth (angle) clockwise from north in degrees. |

## Returns

[`Position2`](../../geojson/type-aliases/Position2.md)

the coordinates [lon,lat] of the destination point.
