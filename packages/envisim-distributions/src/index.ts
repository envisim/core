/**
 * @module @envisim/distributions
 */

export * from "./continuous/index.js";
export * from "./discrete/index.js";

export type { RandomOptions } from "./abstract-distribution.js";
export type { ContinuousDistribution, DiscreteDistribution } from "./types.js";
