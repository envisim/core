[![npm package](https://img.shields.io/npm/v/@envisim/distributions?label=%40envisim%2Fdistributions)](https://npmjs.com/package/@envisim/distributions)

# @envisim/distributions

A TypeScript library for working with various probability distributions.

## Installation

```bash
npm install @envisim/distributions @envisim/random
```

## Usage

Package exposes the following entry points:

- [`@envisim/distributions`](#default-entry-point)

### Default entry point

Import the desired distribution class and instantiate it with its specific parameters. You can then use its methods to evaluate the probability density/mass function (pdf), cumulative distribution function (cdf), quantile function, or generate random samples.

```typescript
import { Normal } from "@envisim/distributions";
import { Random } from "@envisim/random";

// Instantiate a standard normal distribution (mean=0, stddev=1)
const normalDist = new Normal(0, 1);

// Calculate pdf at x=0
normalDist.pdf(0); // approx. 0.3989

// Calculate cdf at x=0
normalDist.cdf(0); // 0.5

// Calculate the median (quantile at 0.5)
normalDist.quantile(0.5); // 0

// Get the mean and variance
normalDist.mean(); // 0
normalDist.variance(); // 1

// Generate an array of 3 random values
normalDist.random(3);

// Using a custom random number generator
const seededRand = new Random(12345); // Seeded generator
normalDist.random(3, { rand: seededRand });
```
