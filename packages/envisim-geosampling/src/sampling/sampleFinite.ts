import * as sampling from '@envisim/sampling';
import {
  AreaCollection,
  AreaFeature,
  Layer,
  LineCollection,
  LineFeature,
  PointCollection,
  PointFeature,
} from '@envisim/geojson-utils';
import type {Random} from '@envisim/random';
import {copy} from '@envisim/utils';

import {
  balancingMatrixFromLayer,
  drawprobsFromLayer,
  inclprobsFromLayer,
  spreadMatrixFromLayer,
} from './utils.js';

interface ISampleOptionsBase {
  methodName: string;
  rand: Random;
  sampleSize: number;
  probabilitiesFrom?: string | null;
}

export interface ISampleOptionsFinite extends ISampleOptionsBase {
  spreadOn?: string[];
  balanceOn?: string[];
  spreadGeo?: boolean;
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
>(layer: Layer<T>, opts: ISampleOptionsFinite): Layer<T> {
  let idx: number[];

  // Select the correct method, and save indices of the FeatureCollection
  switch (opts.methodName) {
    // Standard
    case 'srswr':
    case 'srswor':
      idx = sampling[opts.methodName](opts.sampleSize, layer.collection.size, {
        rand: opts.rand,
      });
      break;

    // Standard w/ incprobs
    case 'systematic':
    case 'randomSystematic':
    case 'poisson':
    case 'rpm':
    case 'spm':
    case 'sampford':
    case 'pareto':
    case 'brewer':
      idx = sampling[opts.methodName](inclprobsFromLayer(layer, opts), {
        rand: opts.rand,
      });
      break;

    // Standard w/ drawprob
    case 'ppswr':
      idx = sampling[opts.methodName](
        drawprobsFromLayer(layer, opts),
        opts.sampleSize,
        {rand: opts.rand},
      );
      break;

    // Spreading
    case 'lpm1':
    case 'lpm2':
    case 'scps':
      if (
        !Array.isArray(opts.spreadOn) ||
        (opts.spreadOn.length === 0 && !opts.spreadGeo)
      ) {
        idx = sampling['randomSystematic'](inclprobsFromLayer(layer, opts), {
          rand: opts.rand,
        });
      } else {
        idx = sampling[opts.methodName](
          inclprobsFromLayer(layer, opts),
          spreadMatrixFromLayer(layer, opts.spreadOn ?? [], opts.spreadGeo),
          {
            rand: opts.rand,
          },
        );
      }
      break;

    // Balancing
    case 'cube':
      if (!Array.isArray(opts.balanceOn) || opts.balanceOn.length === 0) {
        idx = sampling['randomSystematic'](inclprobsFromLayer(layer, opts), {
          rand: opts.rand,
        });
      } else {
        idx = sampling[opts.methodName](
          inclprobsFromLayer(layer, opts),
          balancingMatrixFromLayer(layer, opts.balanceOn ?? []),
          {rand: opts.rand},
        );
      }
      break;

    // Balancing + spreading
    case 'lcube':
      idx = sampling[opts.methodName](
        inclprobsFromLayer(layer, opts),
        balancingMatrixFromLayer(layer, opts.balanceOn ?? []),
        spreadMatrixFromLayer(layer, opts.spreadOn ?? [], opts.spreadGeo),
        {
          rand: opts.rand,
        },
      );
      break;

    // Default throw
    default:
      throw new TypeError('method is not valid');
  }

  if (Layer.isAreaLayer(layer)) {
    const features = idx.map((i) => layer.collection.features[i]);
    return new Layer(
      new AreaCollection({features}, false),
      copy(layer.propertyRecord),
      true,
    ) as Layer<T>;
  }

  if (Layer.isLineLayer(layer)) {
    const features = idx.map((i) => layer.collection.features[i]);
    return new Layer(
      new LineCollection({features}, false),
      copy(layer.propertyRecord),
      true,
    ) as Layer<T>;
  }

  if (Layer.isPointLayer(layer)) {
    const features = idx.map((i) => layer.collection.features[i]);
    return new Layer(
      new PointCollection({features}, false),
      copy(layer.propertyRecord),
      true,
    ) as Layer<T>;
  }

  throw new TypeError('expected layer');
}

/**
 * Select a stratified sample from a layer using sampling methods for a finite
 * population.
 *
 * @param layer
 * @param stratifyOn
 * @param opts
 */
export function sampleFiniteStratified<
  T extends AreaCollection | LineCollection | PointCollection,
>(
  layer: Layer<T>,
  stratifyOn: string,
  opts: ISampleOptionsFinite | ISampleOptionsFinite[],
): Layer<T> {
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
  const fixedOpts = Array.isArray(opts)
    ? opts
    : new Array(propertyObj.values.length).fill(opts);

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

  if (Layer.isAreaLayer(layer)) {
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
        fixedOpts[i] as ISampleOptionsFinite,
      ).collection.features;

      features = [...features, ...sampledFeatures];
    });

    return new Layer(
      new AreaCollection({features}, true),
      copy(layer.propertyRecord),
      true,
    ) as Layer<T>;
  }

  if (Layer.isLineLayer(layer)) {
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
        fixedOpts[i] as ISampleOptionsFinite,
      ).collection.features;

      features = [...features, ...sampledFeatures];
    });

    return new Layer(
      new LineCollection({features}, true),
      copy(layer.propertyRecord),
      true,
    ) as Layer<T>;
  }

  if (Layer.isPointLayer(layer)) {
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
        fixedOpts[i] as ISampleOptionsFinite,
      ).collection.features;

      features = [...features, ...sampledFeatures];
    });

    return new Layer(
      new PointCollection({features}, true),
      copy(layer.propertyRecord),
      true,
    ) as Layer<T>;
  }

  throw new TypeError('expected a layer');
}
