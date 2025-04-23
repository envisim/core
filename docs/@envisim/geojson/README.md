[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / @envisim/geojson

# @envisim/geojson

## Classes

| Class                                             | theme_description |
| ------------------------------------------------- | ----------------- |
| [Circle](classes/Circle.md)                       | -                 |
| [Feature](classes/Feature.md)                     | -                 |
| [FeatureCollection](classes/FeatureCollection.md) | -                 |
| [LineString](classes/LineString.md)               | -                 |
| [MultiCircle](classes/MultiCircle.md)             | -                 |
| [MultiLineString](classes/MultiLineString.md)     | -                 |
| [MultiPoint](classes/MultiPoint.md)               | -                 |
| [MultiPolygon](classes/MultiPolygon.md)           | -                 |
| [Point](classes/Point.md)                         | -                 |
| [Polygon](classes/Polygon.md)                     | -                 |
| [PropertyRecord](classes/PropertyRecord.md)       | -                 |

## Interfaces

| Interface                                                          | theme_description |
| ------------------------------------------------------------------ | ----------------- |
| [CategoricalProperty](interfaces/CategoricalProperty.md)           | -                 |
| [CirclesToPolygonsOptions](interfaces/CirclesToPolygonsOptions.md) | -                 |
| [NumericalProperty](interfaces/NumericalProperty.md)               | -                 |

## Type Aliases

| Type Alias                                                   | theme_description |
| ------------------------------------------------------------ | ----------------- |
| [AreaObject](type-aliases/AreaObject.md)                     | -                 |
| [DecreasingObject](type-aliases/DecreasingObject.md)         | -                 |
| [FeatureProperties](type-aliases/FeatureProperties.md)       | -                 |
| [IncreasingObject](type-aliases/IncreasingObject.md)         | -                 |
| [LineObject](type-aliases/LineObject.md)                     | -                 |
| [ObjectOfPrimitive](type-aliases/ObjectOfPrimitive.md)       | -                 |
| [PointObject](type-aliases/PointObject.md)                   | -                 |
| [PrimitiveOfObject](type-aliases/PrimitiveOfObject.md)       | -                 |
| [Property](type-aliases/Property.md)                         | -                 |
| [PropertyList](type-aliases/PropertyList.md)                 | -                 |
| [PureObject](type-aliases/PureObject.md)                     | -                 |
| [RetractingObject](type-aliases/RetractingObject.md)         | -                 |
| [SpecialPropertyNames](type-aliases/SpecialPropertyNames.md) | -                 |

## Functions

| Function                                                                  | theme_description                                                                                                                                                                            |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [convexHull](functions/convexHull.md)                                     | Computes the convex hull from a collection using Andrew's monotone chain algorithm. If the hull polygon crosses the antimeridian, then the resulting collection will contain a multipolygon. |
| [intersectAreaAreaGeometries](functions/intersectAreaAreaGeometries.md)   | Intersect of two areas.                                                                                                                                                                      |
| [intersectLineAreaGeometries](functions/intersectLineAreaGeometries.md)   | Intersect between a line and an area.                                                                                                                                                        |
| [intersectLineLineGeometries](functions/intersectLineLineGeometries.md)   | Intersect of two lines: the crossing-points between the lines in the two features.                                                                                                           |
| [intersectPointAreaGeometries](functions/intersectPointAreaGeometries.md) | Intersection of points and area.                                                                                                                                                             |
| [perimeter](functions/perimeter.md)                                       | -                                                                                                                                                                                            |
| [toAreaObject](functions/toAreaObject.md)                                 | -                                                                                                                                                                                            |
| [toLineObject](functions/toLineObject.md)                                 | -                                                                                                                                                                                            |
| [toPointObject](functions/toPointObject.md)                               | -                                                                                                                                                                                            |
| [union](functions/union.md)                                               | -                                                                                                                                                                                            |
