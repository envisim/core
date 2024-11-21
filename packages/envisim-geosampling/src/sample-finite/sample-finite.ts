import * as sampling from '@envisim/sampling';
import {
  type AreaObject,
  type DistributiveCollection,
  type LineObject,
  type PointObject,
  PropertyRecord,
} from '@envisim/geojson-utils';
import {ColumnVector} from '@envisim/matrix';
import type {Random} from '@envisim/random';

import {SamplingError} from '../sampling-error.js';
import {ErrorType} from '../utils/index.js';
import {
  balancingMatrixFromLayer,
  drawprobsFromLayer,
  inclprobsFromLayer,
  spreadMatrixFromLayer,
} from './utils.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SAMPLE_FINITE_SIMPLE_METHODS = [
  'srswr',
  'srswor',
  'systematic',
  'randomSystematic',
  'poissonSampling',
  'rpm',
  'spm',
  'sampford',
  'pareto',
  'brewer',
  'ppswr',
] as const;
const SAMPLE_FINITE_SPATIALLY_BALANCED_METHODS = ['lpm1', 'lpm2', 'scps'] as const;
const SAMPLE_FINITE_BALANCED_METHODS = ['cube'] as const;
const SAMPLE_FINITE_DOUBLY_BALANCED_METHODS = ['localCube'] as const;

export interface SampleFiniteOptions {
  /**
   * The name of the sampling method to call from sampling
   */
  methodName:
    | (typeof SAMPLE_FINITE_SIMPLE_METHODS)[number]
    | (typeof SAMPLE_FINITE_SPATIALLY_BALANCED_METHODS)[number]
    | (typeof SAMPLE_FINITE_BALANCED_METHODS)[number]
    | (typeof SAMPLE_FINITE_DOUBLY_BALANCED_METHODS)[number];
  /**
   * The sample size to use. Should be non-negative integer.
   */
  sampleSize: number;
  /**
   * The id of the numerical property to use to compute probabilities.
   */
  probabilitiesFrom?: string;
  /**
   * Compute probabilities from size.
   * @defaultValue `false`
   */
  probabilitiesFromSize?: boolean;
  /**
   * An array of id's of properties to use to spread the sample.
   * This apply to lpm1, lpm2, scps, localCube.
   */
  spreadOn?: string[];
  /**
   * An array of id's of properties to use to balance the sample.
   * This apply to cube and localCube.
   */
  balanceOn?: string[];
  /**
   * Optional spread using geographical coordinates.
   * This apply to lpm1, lpm2, scps, localCube.
   */
  spreadGeo?: boolean;
  /**
   * An instance of {@link random.Random}
   * @defaultValue `new Random()`
   */
  rand?: Random;
}

/**
 * Returns the following errors:
 * - {@link SamplingError.SAMPLE_SIZE_NOT_NON_NEGATIVE_INTEGER}
 * - {@link SamplingError.PROBABILITIES_FROM_DO_NOT_EXIST}
 * - {@link SamplingError.PROBABILITIES_FROM_NOT_NUMERICAL}
 * - {@link SamplingError.SPATIALLY_BALANCED_MUST_USE_SPREAD}
 * - {@link SamplingError.SPREAD_ON_DO_NOT_EXIST}
 * - {@link SamplingError.BALANCE_MUST_USE_BALANCE}
 * - {@link SamplingError.BALANCE_ON_DO_NOT_EXIST}
 *
 * @returns `null` if check passes
 */
export function sampleFiniteOptionsCheck(
  {
    methodName,
    sampleSize,
    probabilitiesFrom,
    // probabilitiesFromSize,
    spreadOn,
    balanceOn,
    spreadGeo,
  }: SampleFiniteOptions,
  // primitive: GeometricPrimitive,
  properties: PropertyRecord,
): ErrorType<typeof SamplingError> {
  if (!Number.isInteger(sampleSize) || sampleSize < 0) {
    // sampleSize must be a non negative integer
    return SamplingError.SAMPLE_SIZE_NOT_NON_NEGATIVE_INTEGER;
  }

  if (probabilitiesFrom !== undefined) {
    const property = properties.getId(probabilitiesFrom);
    if (property === null) {
      // probabilitiesFrom must exist on propertyRecord
      return SamplingError.PROBABILITIES_FROM_DO_NOT_EXIST;
    }

    if (!PropertyRecord.propertyIsNumerical(property)) {
      // probabilitiesFrom must be a numerical property
      return SamplingError.PROBABILITIES_FROM_NOT_NUMERICAL;
    }
  }

  // Checks for spatially balanced methods
  if (
    (SAMPLE_FINITE_SPATIALLY_BALANCED_METHODS as ReadonlyArray<string>).includes(methodName) ||
    (SAMPLE_FINITE_DOUBLY_BALANCED_METHODS as ReadonlyArray<string>).includes(methodName)
  ) {
    if (spreadOn === undefined) {
      if (spreadGeo === undefined) {
        // Must use either spreadOn or spreadGeo
        return SamplingError.SPATIALLY_BALANCED_MUST_USE_SPREAD;
      }
    } else {
      if (!spreadOn.every((prop) => Object.hasOwn(properties, prop))) {
        // spredOn entries must exist on propertyRecord
        return SamplingError.SPREAD_ON_DO_NOT_EXIST;
      }
    }
  }

  // Checks for balanced methods
  if (
    (SAMPLE_FINITE_BALANCED_METHODS as ReadonlyArray<string>).includes(methodName) ||
    (SAMPLE_FINITE_DOUBLY_BALANCED_METHODS as ReadonlyArray<string>).includes(methodName)
  ) {
    if (!balanceOn) {
      // Must use balanceOn
      return SamplingError.BALANCE_MUST_USE_BALANCE;
    }
    if (!balanceOn.every((prop) => Object.hasOwn(properties, prop))) {
      // balanceOn entries must exist on propertyRecord
      return SamplingError.BALANCE_ON_DO_NOT_EXIST;
    }
  }

  return null;
}

/**
 * Select a sample from a layer using sampling methods for a finite
 * population.
 *
 * @param collection
 * @param opts
 */
// export function sampleFinite<T extends AreaObject | LineObject | PointObject>(
//   collection: FeatureCollection<T>,
//   opts: SampleFiniteOptions,
// ): FeatureCollection<T> {
export function sampleFinite<T extends AreaObject | LineObject | PointObject>(
  collection: DistributiveCollection<T>,
  opts: SampleFiniteOptions,
): DistributiveCollection<T> {
  const optionsError = sampleFiniteOptionsCheck(opts, collection.propertyRecord);
  if (optionsError !== null) {
    throw new RangeError(`sampleFinite error: ${optionsError}`);
  }

  let idx: number[];
  let mu: number[];
  let n: number;
  const N = collection.size();
  let probabilities: ColumnVector;

  // Select the correct method, and save indices of the FeatureCollection
  switch (opts.methodName) {
    // Standard
    case 'srswr':
    case 'srswor':
      n = opts.methodName === 'srswr' ? opts.sampleSize : Math.min(opts.sampleSize, N);
      // Compute expected number of inclusions / inclusion probabilities
      mu = Array.from<number>({length: N}).fill(n / N);

      // Get selected indexes
      idx = sampling[opts.methodName]({n, N, rand: opts.rand});
      break;

    // Standard w/ incprobs
    case 'systematic':
    case 'randomSystematic':
    case 'poissonSampling':
    case 'rpm':
    case 'spm':
    case 'sampford':
    case 'pareto':
    case 'brewer':
      // Compute expected number of inclusions / inclusion probabilities
      mu = inclprobsFromLayer(collection, opts).toArray();

      // Get selected indexes
      idx = sampling[opts.methodName]({
        probabilities: mu,
        rand: opts.rand,
      });
      break;

    // Standard w/ drawprob
    case 'ppswr':
      n = opts.sampleSize; // TODO: Check if methods do corrections to n

      // Compute expected number of inclusions / inclusion probabilities
      probabilities = drawprobsFromLayer(collection, opts);
      mu = probabilities.multiply(n, false).toArray();

      // Get selected indexes
      idx = sampling[opts.methodName]({
        probabilities: probabilities,
        n: opts.sampleSize,
        rand: opts.rand,
      });
      break;

    // Spreading
    case 'lpm1':
    case 'lpm2':
    case 'scps':
      // Compute expected number of inclusions / inclusion probabilities
      mu = inclprobsFromLayer(collection, opts).toArray();

      // Get selected indexes
      idx = sampling[opts.methodName]({
        probabilities: mu,
        auxiliaries: spreadMatrixFromLayer(collection, opts.spreadOn ?? [], opts.spreadGeo),
        rand: opts.rand,
      });
      break;

    // Balancing
    case 'cube':
      // Compute expected number of inclusions / inclusion probabilities
      mu = inclprobsFromLayer(collection, opts).toArray();

      // Get selected indexes
      idx = sampling[opts.methodName]({
        probabilities: mu,
        balancing: balancingMatrixFromLayer(collection, opts.balanceOn ?? []),
        rand: opts.rand,
      });
      break;

    // Balancing + spreading
    case 'localCube':
      // Compute expected number of inclusions / inclusion probabilities
      mu = inclprobsFromLayer(collection, opts).toArray();

      // Get selected indexes
      idx = sampling[opts.methodName]({
        probabilities: mu,
        balancing: balancingMatrixFromLayer(collection, opts.balanceOn ?? []),
        auxiliaries: spreadMatrixFromLayer(collection, opts.spreadOn ?? [], opts.spreadGeo),
        rand: opts.rand,
      });
      break;

    // Default throw
    default:
      throw new TypeError('method is not valid');
  }

  const newCollection = collection.copyEmpty(false);
  // Add _designWeight to propertyRecord if it does not exist
  newCollection.propertyRecord.addDesignWeight();

  idx.forEach((i) => {
    newCollection.addGeometry(
      collection.features[i].geometry,
      {
        ...collection.features[i].properties,
        _designWeight: collection.features[i].getSpecialPropertyDesignWeight() / mu[i],
      },
      false,
    );
  });

  return newCollection;
}
