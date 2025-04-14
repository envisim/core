[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [](../../README.md) / rerollPolygons

# Function: rerollPolygons()

> **rerollPolygons**(`polygons`): [`Position2`](../../geojson/type-aliases/Position2.md)[][][]

Defined in: antimeridian.ts:214

An unrolled polygon is a polygon which may exist outside the boundaries of normal earth
(-180, 180), as if the earth(s) was unrolled on a sheet of paper.

This function takes polygons with unrolled coordinates and, rolls them into (-180, 180). The
function assumes that no polygon exists solely on the left earth (-540, -180), or the right
earth, (180, 540), but that the following polygons may exist:

- overlapping -180,
- solely in normal earth (-180, 180),
- overlapping 180.

## Parameters

### polygons

[`Position2`](../../geojson/type-aliases/Position2.md)[][][]

## Returns

[`Position2`](../../geojson/type-aliases/Position2.md)[][][]
