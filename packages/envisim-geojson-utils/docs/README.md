**@envisim/geojson-utils**

---

[@envisim/geojson-utils]() /

# @envisim/geojson-utils

## Classes

| Class                                                      | Description                                                                      |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [BoundingBox](README/classes/BoundingBox.md)               | -                                                                                |
| [GeometricPrimitive](README/classes/GeometricPrimitive.md) | -                                                                                |
| [IntersectList](README/classes/IntersectList.md)           | A class for calulating and keeping track of the intersection points of segments. |
| [Segment](README/classes/Segment.md)                       | -                                                                                |

## Type Aliases

| Type Alias                                                                | Description |
| ------------------------------------------------------------------------- | ----------- |
| [GeometricPrimitiveArea](README/type-aliases/GeometricPrimitiveArea.md)   | -           |
| [GeometricPrimitiveLine](README/type-aliases/GeometricPrimitiveLine.md)   | -           |
| [GeometricPrimitiveNone](README/type-aliases/GeometricPrimitiveNone.md)   | -           |
| [GeometricPrimitivePoint](README/type-aliases/GeometricPrimitivePoint.md) | -           |
| [GeometricPrimitiveUnion](README/type-aliases/GeometricPrimitiveUnion.md) | -           |

## Variables

| Variable                                       | Description |
| ---------------------------------------------- | ----------- |
| [Geodesic](README/variables/Geodesic.md)       | -           |
| [PlateCarree](README/variables/PlateCarree.md) | -           |
| [Rhumb](README/variables/Rhumb.md)             | -           |

## Functions

| Function                                                                         | Description                                                                                                                                               |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [areaOfPolygonLonLat](README/functions/areaOfPolygonLonLat.md)                   | Computes the plate carrée area of a Polygon (not MultiPolygon)                                                                                            |
| [azimuthalEquidistant](README/functions/azimuthalEquidistant.md)                 | Azimuthal Equidistant projection based on the reference coordinate provided as argument.                                                                  |
| [bboxFromPositions](README/functions/bboxFromPositions.md)                       | -                                                                                                                                                         |
| [bboxFromPositionsUnwrapped](README/functions/bboxFromPositionsUnwrapped.md)     | -                                                                                                                                                         |
| [bboxInBBox](README/functions/bboxInBBox.md)                                     | Checks if two bounding boxes overlap.                                                                                                                     |
| [copyCoordinates](README/functions/copyCoordinates.md)                           | -                                                                                                                                                         |
| [cutAreaGeometry](README/functions/cutAreaGeometry.md)                           | Cuts an AreaGeometry on the antimeridian                                                                                                                  |
| [cutLineGeometry](README/functions/cutLineGeometry.md)                           | Cuts a LineGeometry on the antimeridian                                                                                                                   |
| [getPositionsForCircle](README/functions/getPositionsForCircle.md)               | Computes positions needed to find bounding box of a PointCircle.                                                                                          |
| [intersectPolygons](README/functions/intersectPolygons.md)                       | Assumes that `polygons` consists of two sets of non-overlapping polygon(s).                                                                               |
| [lengthOfLineString](README/functions/lengthOfLineString.md)                     | Computes the approximate length of a LineString, where each segment is of type plate carrée.                                                              |
| [longitudeCenter](README/functions/longitudeCenter.md)                           | -                                                                                                                                                         |
| [longitudeDistance](README/functions/longitudeDistance.md)                       | -                                                                                                                                                         |
| [midpoint](README/functions/midpoint.md)                                         | -                                                                                                                                                         |
| [midpointRaw](README/functions/midpointRaw.md)                                   | -                                                                                                                                                         |
| [moveCoordsAroundEarth](README/functions/moveCoordsAroundEarth.md)               | Moves rings that starts on the west side of the meridian (-180 -- 0) to the positive counterpart (180--360)                                               |
| [normalizeLongitude](README/functions/normalizeLongitude.md)                     | -                                                                                                                                                         |
| [pointInMultiPolygonPosition](README/functions/pointInMultiPolygonPosition.md)   | Checks if a point is in a MultiPolygon. Note: Not for Polygon.                                                                                            |
| [pointInSinglePolygonPosition](README/functions/pointInSinglePolygonPosition.md) | Checks if a point is in a Polygon. Note: Not for MultiPolygon.                                                                                            |
| [rerollPolygons](README/functions/rerollPolygons.md)                             | An unrolled polygon is a polygon which may exist outside the boundaries of normal earth (-180, 180), as if the earth(s) was unrolled on a sheet of paper. |
| [ringToSegments](README/functions/ringToSegments.md)                             | -                                                                                                                                                         |
| [segmentsToPolygon](README/functions/segmentsToPolygon.md)                       | -                                                                                                                                                         |
| [unionOfBBoxes](README/functions/unionOfBBoxes.md)                               | -                                                                                                                                                         |
