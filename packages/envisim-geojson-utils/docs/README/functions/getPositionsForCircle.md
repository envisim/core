[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [](../../README.md) / getPositionsForCircle

# Function: getPositionsForCircle()

> **getPositionsForCircle**(`point`, `radius`): [`Position`](../../geojson/type-aliases/Position.md)[]

Defined in: bbox.ts:95

Computes positions needed to find bounding box of a PointCircle.

## Parameters

### point

[`Position`](../../geojson/type-aliases/Position.md)

A position.

### radius

`number`

The radius in meters.

## Returns

[`Position`](../../geojson/type-aliases/Position.md)[]

- An array with four positions [top,right,bottom,left].
