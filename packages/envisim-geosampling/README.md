[![npm package](https://img.shields.io/npm/v/@envisim/geosampling?label=%40envisim%2Fgeosampling)](https://npmjs.com/package/@envisim/geosampling)

# @envisim/geosampling

A TypeScript library with functions for spatial sampling.

This package provides functions for various spatial sampling techniques.

## Installation

```bash
npm install @envisim/geosampling
```

## Usage

### Sampling Area Features on Areas

You can sample fixed-size area plots within a collection of areas defined in WGS84 coordinates (e.g., forest stands, administrative regions). The model geometry for the plots is defined in planar units (meters), and the library handles placing them correctly onto the WGS84 map.

```typescript
import type * as GJ from "@envisim/geojson-utils/geojson";
import { Random } from "@envisim/random";
import { Feature, FeatureCollection } from "@envisim/geojson";
// Import functions to define model geometry (in meters) and perform sampling
import {
  rectangularAreaGeometry,
  sampleAreaFeaturesOnAreas,
  SampleFeaturesOnAreasOptions,
} from "@envisim/geosampling/sample-continuous";

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
const modelGeometry = rectangularAreaGeometry(10.0, 10.0);

// 3. Select the sample
const sample = sampleAreaFeaturesOnAreas(frame, {
  pointSelection: "independent",
  sampleSize: 10,
  modelGeometry,
});
```

#### Explanation:

1.  We create a `FeatureCollection` containing the area where sampling will occur, using WGS84 longitude and latitude coordinates.
2.  We define the shape and size (model geometry) of the individual sample plots using functions like `rectangularAreaGeometry`. These dimensions are specified in **meters**.
3.  The `sampleAreaFeaturesOnAreas` function takes the WGS84 population areas and the meter-based model geometry options. It calculates the placement of the sample plots onto the WGS84 map, returning a new `FeatureCollection` containing the sampled plots with their coordinates now in WGS84. Each feature includes properties like `_designWeight` which might be useful for subsequent statistical analysis.
