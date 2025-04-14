[![npm package](https://img.shields.io/npm/v/@envisim/random?label=%40envisim%2Frandom)](https://npmjs.com/package/@envisim/random)

# @envisim/random

A TypeScript library with a seedable high-entropy random number generator.

Implements the Gibson Research Corporations [UHE PRNG](https://www.grc.com/otg/uheprng.htm)
algorithm.

## Installation

```bash
npm install @envisim/random
```

## Usage

```typescript
import { Random } from "@envisim/random";

// Example usage with seed
const rand = new Random(12345);
rand.random(); // Generate a random float on the interval [0, 1)
```
