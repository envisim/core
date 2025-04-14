# @envisim/core

## Overview

The `@envisim/core` monorepo is a collection of TypeScript packages for various tasks, primarily focused on geospatial and statistical sampling functionalities. It includes multiple packages that can be used together or independently.

## Main Packages

This monorepo contains the following main packages:

- [`@envisim/distributions`](./packages/envisim-distributions): A library with 30+ probability distributions.
- [`@envisim/estimate`](./packages/envisim-estimate): Functions for design-based estimation.
- [`@envisim/geojson`](./packages/envisim-geojson): Classes and functions for working with GeoJSON objects.
- [`@envisim/geojson-utils`](./packages/envisim-geojson-utils): Utility functions for GeoJSON data manipulation and calculations.
- [`@envisim/geosampling`](./packages/envisim-geosampling): Tools for geospatial sampling.
- [`@envisim/matrix`](./packages/envisim-matrix): Matrix and vector operations.
- [`@envisim/random`](./packages/envisim-random): Random number generation utilities.
- [`@envisim/sampling`](./packages/envisim-sampling): General sampling algorithms.
- [`@envisim/utils`](./packages/envisim-utils): General utility functions used across packages.

Each package has its own `README.md` file with more information on installation and usage. Please refer to the individual package directories for more details.

## Installation and Development

This repository uses [pnpm](https://pnpm.io/) as the package manager and [Turbo](https://turbo.build/) for managing the monorepo build process.
