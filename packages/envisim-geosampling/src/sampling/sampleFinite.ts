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
import {copy} from '@envisim/utils';

import type {IPropsStratification, ISampleOptionsFinite} from './types.js';
import {
  balancingMatrixFromLayerProps,
  drawprobsFromLayer,
  inclprobsFromLayer,
  spreadMatrixFromLayerProps,
} from './utils.js';

/**
 * Select a sample from a layer using sampling methods for a finite
 * population.
 *
 * @param methodName the name of the method to use
 * @param layer
 * @param sampleOptions
 */
function sampleFinite<
  T extends AreaCollection | LineCollection | PointCollection,
>(
  methodName: string,
  layer: Layer<T>,
  sampleOptions: ISampleOptionsFinite,
): Layer<T> {
  let idx: number[];

  // Select the correct method, and save indices of the FeatureCollection
  switch (methodName) {
    // Standard
    case 'srswr':
    case 'srswor':
      idx = sampling[methodName](
        sampleOptions.sampleSize,
        layer.collection.size,
        {rand: sampleOptions.rand},
      );
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
      idx = sampling[methodName](inclprobsFromLayer(layer, sampleOptions), {
        rand: sampleOptions.rand,
      });
      break;

    // Standard w/ drawprob
    case 'ppswr':
      idx = sampling[methodName](
        drawprobsFromLayer(layer, sampleOptions),
        sampleOptions.sampleSize,
        {rand: sampleOptions.rand},
      );
      break;

    // Spreading
    case 'lpm1':
    case 'lpm2':
    case 'scps':
      if (
        !Array.isArray(sampleOptions.spreadOn) ||
        (sampleOptions.spreadOn.length === 0 && !sampleOptions.spreadGeo)
      ) {
        idx = sampling['randomSystematic'](
          inclprobsFromLayer(layer, sampleOptions),
          {
            rand: sampleOptions.rand,
          },
        );
      } else {
        idx = sampling[methodName](
          inclprobsFromLayer(layer, sampleOptions),
          spreadMatrixFromLayerProps(
            layer,
            sampleOptions.spreadOn ?? [],
            sampleOptions.spreadGeo,
          ),
          {
            rand: sampleOptions.rand,
          },
        );
      }
      break;

    // Balancing
    case 'cube':
      if (
        !Array.isArray(sampleOptions.balanceOn) ||
        sampleOptions.balanceOn.length === 0
      ) {
        idx = sampling['randomSystematic'](
          inclprobsFromLayer(layer, sampleOptions),
          {
            rand: sampleOptions.rand,
          },
        );
      } else {
        idx = sampling[methodName](
          inclprobsFromLayer(layer, sampleOptions),
          balancingMatrixFromLayerProps(layer, sampleOptions.balanceOn ?? []),
          {rand: sampleOptions.rand},
        );
      }
      break;

    // Balancing + spreading
    case 'lcube':
      idx = sampling[methodName](
        inclprobsFromLayer(layer, sampleOptions),
        balancingMatrixFromLayerProps(layer, sampleOptions.balanceOn ?? []),
        spreadMatrixFromLayerProps(
          layer,
          sampleOptions.spreadOn ?? [],
          sampleOptions.spreadGeo,
        ),
        {
          rand: sampleOptions.rand,
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
export {sampleFinite};

/**
 * Select a stratified sample from a layer using sampling methods for a finite
 * population.
 *
 * @param methodName the name of the method to use
 * @param layer
 * @param sampleOptions
 * @param stratification
 */
function sampleFiniteStratified<
  T extends AreaCollection | LineCollection | PointCollection,
>(
  methodName: string,
  layer: Layer<T>,
  sampleOptions: ISampleOptionsFinite,
  stratification: IPropsStratification,
): Layer<T> {
  if (!(stratification.stratify in layer.propertyRecord))
    throw new Error(
      'stratification is not possible as property record does not contain the required property',
    );

  // The ID of the property
  const property = stratification.stratify;
  // The current property object
  const propertyObj = layer.propertyRecord[property];

  // We only allow stratification on categorical variables
  if (propertyObj.type !== 'categorical')
    throw new Error(
      'stratification is only possible to perform on categorical properties',
    );

  const sampleSizeFallback: number =
    sampleOptions.sampleSize / propertyObj.values.length;

  /*
   * For each value of the property, run sampleFinite.
   * If sampleSize is not defined on stratification, use sampleSizeFallback.
   * Merge the returning FeatureCollections
   */

  if (Layer.isAreaLayer(layer)) {
    let features: AreaFeature[] = [];
    propertyObj.values.forEach((_v, i) => {
      const stratumFeatures = layer.collection.features.filter(
        (f) => f.properties[property] === i,
      );
      const stratumLayer = new Layer(
        new AreaCollection({features: stratumFeatures}, true),
        layer.propertyRecord,
        true,
      );
      const sampledFeatures = sampleFinite(methodName, stratumLayer, {
        ...sampleOptions,
        sampleSize: stratification.sampleSize[i] ?? sampleSizeFallback,
      }).collection.features;
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
        (f) => f.properties[property] === i,
      );
      const stratumLayer = new Layer(
        new LineCollection({features: stratumFeatures}, true),
        layer.propertyRecord,
        true,
      );
      const sampledFeatures = sampleFinite(methodName, stratumLayer, {
        ...sampleOptions,
        sampleSize: stratification.sampleSize[i] ?? sampleSizeFallback,
      }).collection.features;
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
        (f) => f.properties[property] === i,
      );
      const stratumLayer = new Layer(
        new PointCollection({features: stratumFeatures}, true),
        layer.propertyRecord,
        true,
      );
      const sampledFeatures = sampleFinite(methodName, stratumLayer, {
        ...sampleOptions,
        sampleSize: stratification.sampleSize[i] ?? sampleSizeFallback,
      }).collection.features;
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

export {sampleFiniteStratified};
