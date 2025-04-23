[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson-utils](../README.md) / rhumb

# rhumb

## Functions

| Function                                                    | theme_description                                                                                                                                                                 |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [areaOfRing](functions/areaOfRing.md)                       | Computes the area of a rhumb polygon ring                                                                                                                                         |
| [destination](functions/destination.md)                     | Computes the destination point on a rhumb line given a point, a distance and an azimuth.                                                                                          |
| [distance](functions/distance.md)                           | Computes the distance in meters along a rhumb line between two point coordinates.                                                                                                 |
| [forwardAzimuth](functions/forwardAzimuth.md)               | Computes the forward azimuth (angle from north) from the first point to the second point for a rhumb line between the points. The azimuth takes values in the range -180 to +180. |
| [intermediate](functions/intermediate.md)                   | Computes an intermediate point on a rhumb line given a start point, an end point and the fraction of the distance.                                                                |
| [plateCarreeAreaOfRing](functions/plateCarreeAreaOfRing.md) | Computes the area of a polygon ring where the segments are defined as [lon1 + t * (lon2 - lon1), lat1 + t * (lat2 - lat1)], for 0 <= t <= 1.                                      |
