[![npm package](https://img.shields.io/npm/v/@envisim/estimate?label=%40envisim%2Festimate)](https://npmjs.com/package/@envisim/estimate)

# @envisim/estimate

A TypeScript library that provides functionality for estimating various parameters.

This package provides various statistical estimators, often used in conjunction with sampling designs from `@envisim/sampling`.

## Installation

```bash
npm install @envisim/estimate
```

## Usage

The Horvitz-Thompson (HT) estimator is used to estimate the population total of a variable when units are sampled with unequal inclusion probabilities.

The formula is:
$$ \hat{Y}_{HT} = \sum_{i \in S} \frac{y_i}{\pi_i} $$
where $S$ is the set of sampled units, $y_i$ is the value of the variable of interest for unit $i$, and $\pi_i$ is the inclusion probability of unit $i$.

```typescript
import { horvitzThompson } from "@envisim/estimate";

// Example data from a sample (S)
const y = [10, 15, 8, 12]; // y_i values for the sampled units
const p = [0.2, 0.3, 0.1, 0.25]; // pi_i values for the sampled units

// Calculate the Horvitz-Thompson estimate of the population total
const estimatedTotal = horvitzThompson(y, p);

console.log(`Estimated Population Total (Horvitz-Thompson): ${estimatedTotal}`);
// Expected output: (10/0.2) + (15/0.3) + (8/0.1) + (12/0.25) = 50 + 50 + 80 + 48 = 228
```

This package also includes functions for other estimators (like Hansen-Hurwitz, Ratio Estimator) and variance calculations (e.g., `htVariance`, `hhVariance`). Refer to the source code or specific function documentation for details.
