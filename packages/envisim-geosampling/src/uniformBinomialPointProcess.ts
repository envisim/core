import {
  AreaCollection,
  GeometricPrimitive,
  Layer,
  PointCollection,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {samplePointsOnAreas} from './samplePointsOnAreas.js';

export interface UniformBinomialPointProcessOptions {
  layer: Layer<AreaCollection>;
  sampleSize: number;
  rand?: Random;
}

/**
 * Generate points from a uniform Binomial point process
 * on areas of input area layer. The points are generated
 * uniformly on a spherical model of the earth.
 *
 * @param opts an options object.
 */
export function uniformBinomialPointProcess(
  opts: UniformBinomialPointProcessOptions,
): Layer<PointCollection> {
  Layer.assert(opts.layer, GeometricPrimitive.AREA);
  const pointsLayer = samplePointsOnAreas({...opts, method: 'independent'});
  // Remove _designWeight property
  pointsLayer.collection.forEach((feature) => {
    feature.properties = {};
  });
  pointsLayer.propertyRecord = {};
  return pointsLayer;
}
