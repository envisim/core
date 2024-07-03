import * as sampling from '@envisim/sampling';
import {
  AreaCollection,
  AreaFeature,
  GeometricPrimitive,
  Layer,
  LineCollection,
  LineFeature,
  PointCollection,
  PointFeature,
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

export interface SampleFiniteStratifiedOptions {
  /**
   * The id of the categorical property to stratify on.
   */
  stratifyOn: string;
  strataOptions: SampleFiniteOptions | SampleFiniteOptions[];
}

export function sampleFiniteOptionsCheck<
  T extends AreaCollection | LineCollection | PointCollection,
>(
  layer: Layer<T>,
  {
    methodName,
    sampleSize,
    probabilitiesFrom,
    // probabilitiesFromSize,
    spreadOn,
    balanceOn,
    spreadGeo,
  }: SampleFiniteOptions,
): number {
  if (sampleSize < 0) {
    return 10;
  }
  if (
    probabilitiesFrom &&
    !Object.hasOwn(layer.propertyRecord, probabilitiesFrom)
  ) {
    return 20;
  }
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
        return 30;
      }
    } else {
      if (
        !spreadOn.every((prop) => Object.hasOwn(layer.propertyRecord, prop))
      ) {
        return 31;
      }
    }
  }

  if (
    (SAMPLE_FINITE_BALANCED_METHODS as ReadonlyArray<string>).includes(
      methodName,
    ) ||
    (SAMPLE_FINITE_DOUBLY_BALANCED_METHODS as ReadonlyArray<string>).includes(
      methodName,
    )
  ) {
    if (!balanceOn) {
      return 40;
    }
    if (!balanceOn.every((prop) => Object.hasOwn(layer.propertyRecord, prop))) {
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
  T extends AreaCollection | LineCollection | PointCollection,
>(layer: Layer<T>, opts: SampleFiniteOptions): Layer<T> {
  const optionsError = sampleFiniteOptionsCheck(layer, opts);
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
      n = opts.sampleSize;
      // Compute expected number of inclusions / inclusion probabilities
      mu = new Array(N).fill(n / N) as number[];

      // Get selected indexes
      idx = sampling[opts.methodName]({n, N, rand: opts.rand});

      break;
    case 'srswor':
      n = Math.min(opts.sampleSize, N);

      // Compute expected number of inclusions / inclusion probabilities
      mu = new Array(N).fill(n / N) as number[];

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
      if (
        !Array.isArray(opts.spreadOn) ||
        (opts.spreadOn.length === 0 && !opts.spreadGeo)
      ) {
        idx = sampling['rpm']({
          probabilities: mu,
          rand: opts.rand,
        });
      } else {
        idx = sampling[opts.methodName]({
          probabilities: mu,
          auxiliaries: spreadMatrixFromLayer(
            layer,
            opts.spreadOn ?? [],
            opts.spreadGeo,
          ),
          rand: opts.rand,
        });
      }
      break;

    // Balancing
    case 'cube':
      // Compute expected number of inclusions / inclusion probabilities
      mu = inclprobsFromLayer(layer, opts).toArray();

      // Get selected indexes
      if (!Array.isArray(opts.balanceOn) || opts.balanceOn.length === 0) {
        idx = sampling['rpm']({
          probabilities: mu,
          rand: opts.rand,
        });
      } else {
        idx = sampling[opts.methodName]({
          probabilities: mu,
          balancing: balancingMatrixFromLayer(layer, opts.balanceOn ?? []),
          rand: opts.rand,
        });
      }
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

  if (Layer.isLayer(layer, GeometricPrimitive.AREA)) {
    // To store selected features
    const features: AreaFeature[] = [];

    // For each selected feature
    idx.forEach((i) => {
      // Copy selected feature
      const frameFeature = layer.collection.features[i];
      const feature = new AreaFeature(frameFeature, false);

      // Fix _designWeight for selected feature
      if (Object.hasOwn(feature.properties, '_designWeight')) {
        feature.properties['_designWeight'] *= 1 / mu[i];
      } else {
        feature.properties['_designWeight'] = 1 / mu[i];
      }

      // Push new feature
      features.push(feature);
    });

    // Make the new layer
    const newLayer = new Layer(
      new AreaCollection({features}, true),
      copy(layer.propertyRecord),
      true,
    ) as Layer<T>;

    // Add _designWeight to propertyRecord if it does not exist
    if (!Object.hasOwn(newLayer.propertyRecord, '_designWeight')) {
      newLayer.propertyRecord['_designWeight'] = {
        type: 'numerical',
        id: '_designWeight',
        name: '_designWeight',
      };
    }

    return newLayer;
  }

  if (Layer.isLayer(layer, GeometricPrimitive.LINE)) {
    // To store selected features
    const features: LineFeature[] = [];

    // For each selected feature
    idx.forEach((i) => {
      // Copy selected feature
      const frameFeature = layer.collection.features[i];
      const feature = new LineFeature(frameFeature, false);

      // Fix _designWeight for selected feature
      if (Object.hasOwn(feature.properties, '_designWeight')) {
        feature.properties['_designWeight'] *= 1 / mu[i];
      } else {
        feature.properties['_designWeight'] = 1 / mu[i];
      }

      // Push new feature
      features.push(feature);
    });

    // Make the new layer
    const newLayer = new Layer(
      new LineCollection({features}, true),
      copy(layer.propertyRecord),
      true,
    ) as Layer<T>;

    // Add _designWeight to propertyRecord if it does not exist
    if (!Object.hasOwn(newLayer.propertyRecord, '_designWeight')) {
      newLayer.propertyRecord['_designWeight'] = {
        type: 'numerical',
        id: '_designWeight',
        name: '_designWeight',
      };
    }

    return newLayer;
  }

  if (Layer.isLayer(layer, GeometricPrimitive.POINT)) {
    // To store selected features
    const features: PointFeature[] = [];

    // For each selected feature
    idx.forEach((i) => {
      // Copy selected feature
      const frameFeature = layer.collection.features[i];
      const feature = new PointFeature(frameFeature, false);

      // Fix _designWeight for selected feature
      if (Object.hasOwn(feature.properties, '_designWeight')) {
        feature.properties['_designWeight'] *= 1 / mu[i];
      } else {
        feature.properties['_designWeight'] = 1 / mu[i];
      }

      // Push new feature
      features.push(feature);
    });

    // Make the new layer
    const newLayer = new Layer(
      new PointCollection({features}, true),
      copy(layer.propertyRecord),
      true,
    ) as Layer<T>;

    // Add _designWeight to propertyRecord if it does not exist
    if (!Object.hasOwn(newLayer.propertyRecord, '_designWeight')) {
      newLayer.propertyRecord['_designWeight'] = {
        type: 'numerical',
        id: '_designWeight',
        name: '_designWeight',
      };
    }

    return newLayer;
  }

  throw new TypeError('expected layer');
}

/**
 * Select a stratified sample from a layer using sampling methods for a finite
 * population.
 *
 * @param layer
 * @param opts
 */
export function sampleFiniteStratified<
  T extends AreaCollection | LineCollection | PointCollection,
>(layer: Layer<T>, opts: SampleFiniteStratifiedOptions): Layer<T> {
  const {stratifyOn, strataOptions} = opts;
  if (!(stratifyOn in layer.propertyRecord))
    throw new Error(
      'stratification is not possible as property record does not contain the required property',
    );

  // The current property object
  const propertyObj = layer.propertyRecord[stratifyOn];

  // We only allow stratification on categorical variables
  if (propertyObj.type !== 'categorical')
    throw new Error(
      'stratification is only possible to perform on categorical properties',
    );

  // Make an array of opts if it is not provided as an array
  const fixedOpts = Array.isArray(strataOptions)
    ? strataOptions
    : new Array(propertyObj.values.length).fill(strataOptions);

  // Make sure it is of correct length
  if (fixedOpts.length !== propertyObj.values.length) {
    throw new Error(
      'length of provided opts array does not match number of strata',
    );
  }

  /*
   * For each value of the property, run sampleFinite.
   * Merge the returning features into a single array.
   */

  if (Layer.isLayer(layer, GeometricPrimitive.AREA)) {
    let features: AreaFeature[] = [];

    propertyObj.values.forEach((_v, i) => {
      const stratumFeatures = layer.collection.features.filter(
        (f) => f.properties[stratifyOn] === i,
      );

      const stratumLayer = new Layer(
        new AreaCollection({features: stratumFeatures}, true),
        layer.propertyRecord,
        true,
      );

      const sampledFeatures = sampleFinite(
        stratumLayer,
        fixedOpts[i] as SampleFiniteOptions,
      ).collection.features;

      features = [...features, ...sampledFeatures];
    });

    // Make the new layer
    const newLayer = new Layer(
      new AreaCollection({features}, true),
      copy(layer.propertyRecord),
      true,
    ) as Layer<T>;

    // Add _designWeight to propertyRecord if it does not exist
    if (!Object.hasOwn(newLayer.propertyRecord, '_designWeight')) {
      newLayer.propertyRecord['_designWeight'] = {
        type: 'numerical',
        id: '_designWeight',
        name: '_designWeight',
      };
    }

    return newLayer;
  }

  if (Layer.isLayer(layer, GeometricPrimitive.LINE)) {
    let features: LineFeature[] = [];

    propertyObj.values.forEach((_v, i) => {
      const stratumFeatures = layer.collection.features.filter(
        (f) => f.properties[stratifyOn] === i,
      );

      const stratumLayer = new Layer(
        new LineCollection({features: stratumFeatures}, true),
        layer.propertyRecord,
        true,
      );

      const sampledFeatures = sampleFinite(
        stratumLayer,
        fixedOpts[i] as SampleFiniteOptions,
      ).collection.features;

      features = [...features, ...sampledFeatures];
    });

    // Make the new layer
    const newLayer = new Layer(
      new LineCollection({features}, true),
      copy(layer.propertyRecord),
      true,
    ) as Layer<T>;

    // Add _designWeight to propertyRecord if it does not exist
    if (!Object.hasOwn(newLayer.propertyRecord, '_designWeight')) {
      newLayer.propertyRecord['_designWeight'] = {
        type: 'numerical',
        id: '_designWeight',
        name: '_designWeight',
      };
    }

    return newLayer;
  }

  if (Layer.isLayer(layer, GeometricPrimitive.POINT)) {
    let features: PointFeature[] = [];

    propertyObj.values.forEach((_v, i) => {
      const stratumFeatures = layer.collection.features.filter(
        (f) => f.properties[stratifyOn] === i,
      );

      const stratumLayer = new Layer(
        new PointCollection({features: stratumFeatures}, true),
        layer.propertyRecord,
        true,
      );

      const sampledFeatures = sampleFinite(
        stratumLayer,
        fixedOpts[i] as SampleFiniteOptions,
      ).collection.features;

      features = [...features, ...sampledFeatures];
    });

    // Make the new layer
    const newLayer = new Layer(
      new PointCollection({features}, true),
      copy(layer.propertyRecord),
      true,
    ) as Layer<T>;

    // Add _designWeight to propertyRecord if it does not exist
    if (!Object.hasOwn(newLayer.propertyRecord, '_designWeight')) {
      newLayer.propertyRecord['_designWeight'] = {
        type: 'numerical',
        id: '_designWeight',
        name: '_designWeight',
      };
    }

    return newLayer;
  }

  throw new TypeError('expected a layer');
}
