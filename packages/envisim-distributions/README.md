[![npm package](https://img.shields.io/npm/v/@envisim/distributions?label=%40envisim%2Fdistributions)](https://npmjs.com/package/@envisim/distributions)

# @envisim/distributions

A TypeScript library for working with various probability distributions.

## Installation

```bash
npm install @envisim/distributions @envisim/random
```

## Usage

Import the desired distribution class and instantiate it with its specific parameters. You can then use its methods to evaluate the probability density/mass function (pdf), cumulative distribution function (cdf), quantile function, or generate random samples.

```typescript
import { Normal } from '@envisim/distributions';
import { Random } from '@envisim/random';

// Instantiate a standard normal distribution (mean=0, stddev=1)
const normalDist = new Normal(0, 1);

// Calculate pdf at x=0
console.log('pdf at 0:', normalDist.pdf(0)); // Output: ~0.3989

// Calculate cdf at x=0
console.log('cdf at 0:', normalDist.cdf(0)); // Output: 0.5

// Calculate the median (quantile at 0.5)
console.log('median:', normalDist.quantile(0.5)); // Output: 0

// Get the mean and variance
console.log('mean:', normalDist.mean()); // Output: 0
console.log('variance:', normalDist.variance()); // Output: 1

// Generate 3 random samples
console.log('random samples:', normalDist.random(3)); // Output: [num1, num2, num3]

// --- Using a custom random number generator ---
const customRand = new Random(12345); // Seeded generator
const samplesWithCustomRand = normalDist.random(3, { rand: customRand });
console.log('Samples with custom rng:', samplesWithCustomRand);

```

## Available Distributions

### Continuous Distributions

*   Arcsine
*   BenfordMantissa
*   Beta
*   Cauchy
*   ChiSquared
*   Exponential
*   ExtremeValue (Gumbel)
*   FRatio
*   Gamma
*   HyperbolicSecant
*   Laplace
*   Logistic
*   Normal (Gaussian)
*   Pareto
*   Semicircle
*   StudentsT
*   UQuadratic
*   Uniform
*   Weibull

### Discrete Distributions

*   Bernoulli
*   Binomial
*   Geometric
*   Hypergeometric
*   Logarithmic
*   Poisson
*   UniformDiscrete
