[![npm package](https://img.shields.io/npm/v/@envisim/geojson?label=%40envisim%2Fgeojson)](https://npmjs.com/package/@envisim/geojson)

# @envisim/geojson

A TypeScript library that provides functionality for working with GeoJSON data.

## Installation

```bash
npm install @envisim/geojson
```

## Usage

Example of creating a GeoJSON Point feature:

```typescript
import { Point, Feature } from "@envisim/geojson";

// Create a Point geometry
const pointGeometry = new Point({ coordinates: [10, 20] }); // Longitude, Latitude

// Create properties for the feature
const properties = {
  name: "Example Point",
  value: 123,
};

// Create a Feature instance
const pointFeature = new Feature(pointGeometry, properties);

// Access geometry and properties
console.log("Feature type:", pointFeature.type); // Output: Feature
console.log("Geometry type:", pointFeature.geometry.type); // Output: Point
console.log("Coordinates:", pointFeature.geometry.coordinates); // Output: [10, 20]
console.log("Properties:", pointFeature.properties); // Output: { name: 'Example Point', value: 123 }
```
