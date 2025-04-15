[![npm package](https://img.shields.io/npm/v/@envisim/geojson?label=%40envisim%2Fgeojson)](https://npmjs.com/package/@envisim/geojson)

# @envisim/geojson

A TypeScript library that provides functionality for working with GeoJSON data.

## Installation

```bash
npm install @envisim/geojson
```

## Usage

Example of creating a GeoJSON Line feature:

```typescript
import { Feature, LineString } from "@envisim/geojson";

// Create a LineString, from a vector of coordinates ([Longitude, Latitude] pairs)
const lineString = LineString.create([
  [10, 20],
  [10, 30],
]);

// Calculate the length of the linstering
lineString.length();

// Create properties for the feature
const properties = {
  value: 123,
};

// Create a Feature instance
const lineFeature = new Feature(lineString, properties);

// Get the measure of the geometry
lineFeature.measure();
```

## See also

- [GeoJSON.org](https://geojson.org)
