[![npm package](https://img.shields.io/npm/v/@envisim/geojson-utils?label=%40envisim%2Fgeojson-utils)](https://npmjs.com/package/@envisim/geojson-utils)

# @envisim/geojson-utils

A TypeScript library with utility functions for working with GeoJSON data.

## Installation

```bash
npm install @envisim/geojson-utils
```

## Usage

Package exposes the following entry points:

- [`@envisim/geojson-utils`](#default-entry-point)
- [`@envisim/geojson-utils/geojson`](#geojson-types)
- [`@envisim/geojson-utils/type-guards`](#type-guards)
- [`@envisim/geojson-utils/geodesic`](#geodesic-segments)
- [`@envisim/geojson-utils/plate-carree`](#platé-carrée-segments)
- [`@envisim/geojson-utils/rhumb`](#rhumb-segments)

### Default entry point

```typescript
import { normalizeLongitude } from "@envisim/geojson-utils";

// Normalize the longitude to (-180, 180]
normalizeLongitude(150.0); //  150.0
normalizeLongitude(190.0); // -170.0
```

### GeoJSON types

```typescript
import type * as GJ from "@envisim/geojson-utils/geojson";
const p: GJ.Position = [0, 1];
```

### Type guards

Type guards for GeoJSON types.

```typescript
import { isCircle } from "@envisim/geojson-utils/type-guards";
const circle = { type: "Point", radius: 2, coordinates: [0, 0] };
isCircle(circle);
```

### Geodesic segments

[Geodesic segment](https://en.wikipedia.org/wiki/Geodesics_on_an_ellipsoid) operations using [`geographiclib-geodesic`](https://npmjs.com/package/geographiclib-geodesic).

```typescript
import { distance } from "@envisim/geojson-utils/geodesic";
distance([0, 0], [1, 0]);
```

### Platé carrée segments

[Platé carrée](https://en.wikipedia.org/wiki/Equirectangular_projection) segment operations.

```typescript
import { distance } from "@envisim/geojson-utils/plate-carree";
distance([0, 0], [1, 0]);
```

### Rhumb segments

[Rhumb](https://en.wikipedia.org/wiki/Rhumb_line) segment operations.

```typescript
import { distance } from "@envisim/geojson-utils/rhumb";
distance([0, 0], [1, 0]);
```
