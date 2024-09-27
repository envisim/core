import * as sampling from '@envisim/sampling';
import {
  AreaCollection,
  GeometricPrimitive,
  Layer,
  LineCollection,
  PointCollection,
  PropertyRecord,
  createDesignWeightProperty,
} from '@envisim/geojson-utils';
import {ColumnVector} from '@envisim/matrix';
import type {Random} from '@envisim/random';
import {copy} from '@envisim/utils';

import {
  balancingMatrixFromLayer,
  drawprobsFromLayer,
  inclprobsFromLayer,
  spreadMatrixFromLayer,
} from './utils.js';

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
const SAMPLE_FINITE_SPATIALLY_BALANCED_METHODS = [
  'lpm1',
  'lpm2',
  'scps',
] as const;
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
 * - 10: sampleSize is not a non-negative integer
 * - 20: probabilitesFrom is set, but does not exist on propertyRecord
 * - 21: probabilitesFrom is not numerical
 * - 30: method is spatially balanced, but does not use spreadOn or spreadGeo
 * - 31: method is spatially balanced, but spreadOn does not exist on
 *       propertyRecord
 * - 40: method is balanced, but does not use balanceOn
 * - 41: method is balanced, but balanceOn does not exist on propertyRecord
 *
 * @returns `0` if check passes
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
): number {
  if (!Number.isInteger(sampleSize) || sampleSize < 0) {
    // sampleSize must be a non negative integer
    return 10;
  }

  if (probabilitiesFrom) {
    if (!Object.hasOwn(properties, probabilitiesFrom)) {
      // probabilitiesFrom must exist on propertyRecord
      return 20;
    }

    if (properties[probabilitiesFrom].type !== 'numerical') {
      // probabilitiesFrom must be a numerical property
      return 21;
    }
  }

  // Checks for spatially balanced methods
  if (
    (
      SAMPLE_FINITE_SPATIALLY_BALANCED_METHODS as ReadonlyArray<string>
    ).includes(methodName) ||
    (SAMPLE_FINITE_DOUBLY_BALANCED_METHODS as ReadonlyArray<string>).includes(
      methodName,
    )
  ) {
    if (!spreadOn) {
      if (!spreadGeo) {
        // Must use either spreadOn or spreadGeo
        return 30;
      }
    } else {
      if (!spreadOn.every((prop) => Object.hasOwn(properties, prop))) {
        // spredOn entries must exist on propertyRecord
        return 31;
      }
    }
  }

  // Checks for balanced methods
  if (
    (SAMPLE_FINITE_BALANCED_METHODS as ReadonlyArray<string>).includes(
      methodName,
    ) ||
    (SAMPLE_FINITE_DOUBLY_BALANCED_METHODS as ReadonlyArray<string>).includes(
      methodName,
    )
  ) {
    if (!balanceOn) {
      // Must use balanceOn
      return 40;
    }
    if (!balanceOn.every((prop) => Object.hasOwn(properties, prop))) {
      // balanceOn entries must exist on propertyRecord
      return 41;
    }
  }

  return 0;
}

/**
 * Select a sample from a layer using sampling methods for a finite
 * population.
 *
 * @param layer
 * @param opts
 */
export function sampleFinite<
  T extends
    | Layer<PointCollection>
    | Layer<LineCollection>
    | Layer<AreaCollection>,
>(layer: T, opts: SampleFiniteOptions): T {
  const optionsError = sampleFiniteOptionsCheck(opts, layer.propertyRecord);
  if (optionsError !== 0) {
    throw new RangeError(`sampleFinite error: ${optionsError}`);
  }

  let idx: number[];
  let mu: number[];
  let n: number;
  const N = layer.collection.size;
  let probabilities: ColumnVector;

  // Select the correct method, and save indices of the FeatureCollection
  switch (opts.methodName) {
    // Standard
    case 'srswr':
    case 'srswor':
      n =
        opts.methodName === 'srswr'
          ? opts.sampleSize
          : Math.min(opts.sampleSize, N);
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
      mu = inclprobsFromLayer(layer, opts).toArray();

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
      probabilities = drawprobsFromLayer(layer, opts);
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
      mu = inclprobsFromLayer(layer, opts).toArray();

      // Get selected indexes
      idx = sampling[opts.methodName]({
        probabilities: mu,
        auxiliaries: spreadMatrixFromLayer(
          layer,
          opts.spreadOn ?? [],
          opts.spreadGeo,
        ),
        rand: opts.rand,
      });
      break;

    // Balancing
    case 'cube':
      // Compute expected number of inclusions / inclusion probabilities
      mu = inclprobsFromLayer(layer, opts).toArray();

      // Get selected indexes
      idx = sampling[opts.methodName]({
        probabilities: mu,
        balancing: balancingMatrixFromLayer(layer, opts.balanceOn ?? []),
        rand: opts.rand,
      });
      break;

    // Balancing + spreading
    case 'localCube':
      // Compute expected number of inclusions / inclusion probabilities
      mu = inclprobsFromLayer(layer, opts).toArray();

      // Get selected indexes
      idx = sampling[opts.methodName]({
        probabilities: mu,
        balancing: balancingMatrixFromLayer(layer, opts.balanceOn ?? []),
        auxiliaries: spreadMatrixFromLayer(
          layer,
          opts.spreadOn ?? [],
          opts.spreadGeo,
        ),
        rand: opts.rand,
      });
      break;

    // Default throw
    default:
      throw new TypeError('method is not valid');
  }

  const propertyRecord = copy(layer.propertyRecord);
  // Add _designWeight to propertyRecord if it does not exist
  if (!Object.hasOwn(propertyRecord, '_designWeight')) {
    propertyRecord['_designWeight'] = createDesignWeightProperty();
  }

  let newLayer: T;
  if (Layer.isLayer(layer, GeometricPrimitive.POINT)) {
    newLayer = new Layer(
      new PointCollection({features: []}, true),
      propertyRecord,
      true,
    ) as T;
  } else if (Layer.isLayer(layer, GeometricPrimitive.LINE)) {
    newLayer = new Layer(
      new LineCollection({features: []}, true),
      propertyRecord,
      true,
    ) as T;
  } else if (Layer.isLayer(layer, GeometricPrimitive.AREA)) {
    newLayer = new Layer(
      new AreaCollection({features: []}, true),
      propertyRecord,
      true,
    ) as T;
  } else {
    throw new TypeError('layer not valid');
  }

  idx.forEach((i) => {
    const len = newLayer.collection.addFeature(
      // TS cannot ensure that layer and newLayer matches, but as we just
      // created them to match, we can skip this check here
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
      layer.collection.features[i] as any,
      false,
    );

    // Update design weight
    newLayer.collection.features[len - 1].editProperty(
      '_designWeight',
      (value) => value / mu[i],
      1.0,
    );
  });

  return newLayer;
}
