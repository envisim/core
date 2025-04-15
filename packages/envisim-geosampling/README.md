[![npm package](https://img.shields.io/npm/v/@envisim/geosampling?label=%40envisim%2Fgeosampling)](https://npmjs.com/package/@envisim/geosampling)

# @envisim/geosampling

A TypeScript library with functions for spatial sampling.

This package provides functions for various spatial sampling techniques.

## Installation

```bash
npm install @envisim/geosampling
```

## Usage

Package exposes the following entry points:

- [`@envisim/geosampling/sample-continuous`](#sampling-from-continuous-populations)
- [`@envisim/geosampling/sample-finite`](#sampling-from-finite-populations)
- [`@envisim/geosampling/model-geometry`](#model-geometries)
- [`@envisim/geosampling/collect-properties`](#collect-properties-from-collections)
- [`@envisim/geosampling/select-intersects`](#create-intersect-of-collections)
- [`@envisim/geosampling/point-processes`](#point-processes)
- [`@envisim/geosampling/errors`](#error-code-lists)

### Sampling from continuous populations

You can sample fixed-size area plots within a collection of areas defined in WGS84 coordinates (e.g., forest stands, administrative regions). The model geometry for the plots is defined in planar units (meters), and the library handles placing them correctly onto the WGS84 map.

```typescript
import { Feature, FeatureCollection, Polygon } from "@envisim/geojson";
import { rectangularAreaGeometry } from "@envisim/geosampling/model-geometry";
import { sampleAreaFeaturesOnAreas } from "@envisim/geosampling/sample-continuous";

// 1. Define the population area (sampling frame)
const polygon = Polygon.create([
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0],
  ],
]);

const frame = FeatureCollection.newArea([new Feature(polygon, {})]);

// 2. Define the sampling unit's model geometry
const modelGeometry = rectangularAreaGeometry(10.0);

// 3. Select the sample
sampleAreaFeaturesOnAreas(frame, {
  pointSelection: "independent",
  sampleSize: 10,
  modelGeometry,
});
```

#### Explanation:

1.  We create a `FeatureCollection` containing the area where sampling will occur, using WGS84 longitude and latitude coordinates.
2.  We define the shape and size (model geometry) of the individual sample plots using functions like `rectangularAreaGeometry`. These dimensions are specified in **meters**.
3.  The `sampleAreaFeaturesOnAreas` function takes the WGS84 population areas and the meter-based model geometry options. It calculates the placement of the sample plots onto the WGS84 map, returning a new `FeatureCollection` containing the sampled plots with their coordinates now in WGS84. Each feature includes properties like `_designWeight` which might be useful for subsequent statistical analysis.

### Sampling from finite populations

```typescript
import { Feature, FeatureCollection, Point } from "@envisim/geojson";
// Import functions to define model geometry (in meters) and perform sampling
import { sampleSpatiallyBalanced } from "@envisim/geosampling/sample-finite";

// 1. Define the sampling frame
const frame = FeatureCollection.newPoint([
  Point.create([0, 1]),
  Point.create([1, 2]),
  Point.create([2, 3]),
  Point.create([3, 4]),
  Point.create([4, 5]),
]);

// 2. Select the sample
sampleSpatiallyBalanced(frame, {
  method: "lpm2",
  sampleSize: 2,
  spreadOn: [],
  spreadGeo: true,
});
```

### Model geometries

```typescript
import { rectangularAreaGeometry } from "@envisim/geosampling/model-geometry";
// Create a 10 x 10 meter model geometry
rectangularAreaGeometry(10.0);
```

### Collect properties from collections

```typescript
import { collectProperties } from "@envisim/geosampling/collect-properties";
```

### Create intersect of collections

```typescript
import { selectAreaIntersectsArea } from "@envisim/geosampling/select-intersects";
```

### Point processes

```typescript
import { FeatureCollection, Polygon } from "@envisim/geojson";
import { uniformPoissonPointProcess } from "@envisim/geosampling/point-processes";

const frame = FeatureCollection.newArea([]);
frame.addGeometry(
  Polygon.create([
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      [0, 0],
    ],
  ]),
  {},
);

// Sample points uniformly on the frame, with an intensity of .00001 points per square meter.
uniformPoissonPointProcess(frame, { intensity: 0.00001 });
```

### Error code lists

Error code lists of geosampling procedures.
