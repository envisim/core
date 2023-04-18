/** @module sampling */

// Exports
export {cube, localcube} from './cube.js';
export {sampford, pareto, brewer} from './pips.js';
export {lpm, lpm1, lpm2, randomPivotal} from './pivotal.js';
export {poisson, conditionalPoisson} from './poisson.js';
export {ppswr} from './pps.js';
export {scps} from './scps.js';
export {srs, srswor, srswr} from './srs.js';
export {systematic, randomSystematic} from './systematic.js';

// Distances
export {
  distanceEuclidean,
  distanceEuclidean2,
  distanceGS,
} from './distances.js';

// Types
export {
  IDistance,
  IOptions,
  optionsDefaultEps,
  optionsDefaultDistfun,
  optionsDefaultRand,
} from './types.js';
