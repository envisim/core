# envisim/geojson

A TypeScript library that provides functionality for working with GeoJSON data. This package is part of the [`@envisim/core`](../..) monorepo.

## Installation

Within the monorepo, this package is typically linked via the pnpm workspace.

For external use, install it using your preferred package manager:

```bash
# npm
npm install @envisim/geojson

# yarn
yarn add @envisim/geojson

# pnpm
pnpm add @envisim/geojson
```

## Usage

Here's a basic example of creating a GeoJSON Point feature:

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
