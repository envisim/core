# envisim/random

A TypeScript library with a seedable high-entropy random number generator. This package is part of the [`@envisim/core`](../..) monorepo.

## Installation

Within the monorepo, this package is typically linked via the pnpm workspace.

For external use, install it using your preferred package manager:

```bash
# npm
npm install @envisim/random

# yarn
yarn add @envisim/random

# pnpm
pnpm add @envisim/random
```
## Usage

Here's an example of how to use the package:

```typescript
import { Random } from '@envisim/random';

// Example usage with seed
const rand = new Random(12345); 
console.log(rand.random());
```
