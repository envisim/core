[![npm package](https://img.shields.io/npm/v/@envisim/sampling?label=%40envisim%2Fsampling)](https://npmjs.com/package/@envisim/sampling)

# @envisim/sampling

A TypeScript library for finite population sampling.

## Installation

```bash
npm install @envisim/sampling
```

## Usage

Here's an example of how to use the package:

```typescript
import { srswor } from '@envisim/sampling';

// Example usage simple random sampling without replacement
const sample = srswor(5,10);
console.log(sample);
```

## Available Designs

### Basic designs
*   Simple random sampling without replacement (srswor)
*   Simple random sampling with replacement (srswr)
*   Poisson sampling (poissonSampling)
*   Conditional Poisson sampling (conditionalPoissonSampling)
*   Probabilities proportional to size with replacement (ppswr)
*   Systematic sampling (systematic)
*   Systematic sampling with initial randomization of order (randomSystematic)
*   Sampford (sampford)
*   Pareto (pareto)
*   Brewer (brewer)
*   Random pivotal method (rpm)
*   Sequential pivotal method (spm)

### Spatially balanced designs
*   Local pivotal method 1 (lpm1)
*   Local pivotal method 2 (lpm2)
*   Local correlated Poisson sampling (lcps)
*   Spatially correlated Poisson sampling (scps)
*   Spatially correlated Poisson sampling coordinated (scpsCoordinated)

### Balanced designs
*   Cube method (cube)

### Doubly balanced designs
*   Local cube method (localCube)

## Utils
*   NearestNeighbour
*   inclusionProbabilities
