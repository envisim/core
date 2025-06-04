import type * as Continuous from "./continuous/index.js";
import type * as Discrete from "./discrete/index.js";

export type ContinuousDistribution = InstanceType<(typeof Continuous)[keyof typeof Continuous]>;
export type DiscreteDistribution = InstanceType<(typeof Discrete)[keyof typeof Discrete]>;
