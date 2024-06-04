import {
  AreaCollection,
  GeometricPrimitive,
  Layer,
  PointCollection,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {samplePointsOnAreas} from './samplePointsOnAreas.js';

interface UniformBinomialPointProcessOptions {
  /**
   * The number of points to generate.
   */
  sampleSize: number;
  /**
   * An instance of {@link random.Random}
   * @defaultValue `new Random()`
   */
  rand?: Random;
}

/**
 * Generate points from a uniform Binomial point process
 * on areas of input area layer. The points are generated
 * uniformly on a spherical model of the earth.
 *
 * @param layer
 * @param opts
 */
export function uniformBinomialPointProcess(
  layer: Layer<AreaCollection>,
  {sampleSize, rand = new Random()}: UniformBinomialPointProcessOptions,
): Layer<PointCollection> {
  Layer.assert(layer, GeometricPrimitive.AREA);

  const pointsLayer = samplePointsOnAreas(layer, {
    method: 'independent',
    sampleSize,
    rand,
  });
  // Remove _designWeight property
  pointsLayer.collection.forEach((feature) => {
    feature.properties = {};
  });
  pointsLayer.propertyRecord = {};
  return pointsLayer;
}
