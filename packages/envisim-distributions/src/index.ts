/**
 *
 * Each distribution-class exposes the following static methods:
 * - `pdf`(`x`: `number` \| {@link matrix.TArrayLike | `TArrayLike`}, `params`)
 *  the probability density/mass function evaluated at `x`.
 * - `cdf`(`x`: `number` \| {@link matrix.TArrayLike | `TArrayLike`}, `params`)
 *  the cumulative probability function evaluated at `x`.
 * - `quantile`(`x`: `number` \| {@link matrix.TArrayLike | `TArrayLike`}, `params`)
 *  the quantile function evaluated at `x`.
 * - `random`(`n`: `number`, `params`, {@link IRandomOptions | `options`}): `number[]`
 *  an array of `n` random numbers drawn from the distribution.
 *
 * The `pdf`, `cdf`, and `quantile` methods returns the same type as the provided `x`.
 *
 * Each distribution-class exposes the following methods:
 * - `setParameters`(`params`) - sets the parameters of the instance
 * - `mean`(), `variance`(), `mode`(), `skewness`(),
 * - `pdf`(`x`: `number` \| {@link matrix.TArrayLike | `TArrayLike`})
 * - `cdf`(`x`: `number` \| {@link matrix.TArrayLike | `TArrayLike`})
 * - `quantile`(`x`: `number` \| {@link matrix.TArrayLike | `TArrayLike`})
 * - `random`(`n`: `number`, {@link IRandomOptions | `options`}): `number[]`
 *
 * @module distributions
 */

export {Arcsine, arcsine} from './arcsine.js';
export {BenfordMantissa, benfordMantissa} from './benfordmantissa.js';
export {Bernoulli, bernoulli} from './bernoulli.js';
export {Beta, beta, BetaPrime, betaPrime} from './beta.js';
export {
  Binomial,
  binomial,
  NegativeBinomial,
  negativeBinomial,
} from './binomial.js';
export {Cauchy, cauchy} from './cauchy.js';
export {ChiSquared, chiSquared} from './chisquared.js';
export {Exponential, exponential} from './exponential.js';
export {ExtremeValue, extremeValue} from './extremevalue.js';
export {FRatio, fRatio} from './f.js';
export {Gamma, gamma} from './gamma.js';
export {Geometric, geometric} from './geometric.js';
export {HyperbolicSecant, hyperbolicSecant} from './hyperbolicsecant.js';
export {Hypergeometric, hypergeometric} from './hypergeometric.js';
export {Laplace, laplace} from './laplace.js';
export {Logarithmic, logarithmic} from './logarithmic.js';
export {Logistic, logistic, LogLogistic, logLogistic} from './logistic.js';
export {
  Normal,
  normal,
  LogNormal,
  logNormal,
  FoldedNormal,
  foldedNormal,
} from './normal.js';
export {Pareto, pareto} from './pareto.js';
export {Poisson, poisson} from './poisson.js';
export {Semicircle, semicircle} from './semicircle.js';
export {StudentsT, studentsT} from './studentst.js';
export {
  Triangular,
  triangular,
  Uniform,
  uniform,
  UniformDiscrete,
  uniformDiscrete,
} from './uniform.js';
export {UQuadratic, uQuadratic} from './uquadratic.js';
export {Weibull, weibull} from './weibull.js';

export type {
  IRandomOptions,
  // Params
  IBenfordMantissaParams,
  IBernoulliParams,
  IBetaParams,
  IBinomialParams,
  IBoundParams,
  IBoundMidParams,
  IDf1Params,
  IDf2Params,
  IHypergeometricParams,
  ILocationScaleParams,
  INormalParams,
  IRadiusParams,
  IRateParams,
  IShapeScaleParams,
} from './types.js';
