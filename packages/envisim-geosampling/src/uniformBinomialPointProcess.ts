import {AreaCollection, Layer, PointCollection} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {samplePointsOnAreas} from './samplePointsOnAreas.js';

/**
 * Generate points from a uniform Binomial point process
 * on areas of input area layer. The points are generated
 * uniformly on a spherical model of the earth.
 *
 * @param layer an area layer
 * @param sampleSize number of points to generate.
 * @param opts an optional options object.
 * @param opts.rand an optional instance of Random.
 */
export function uniformBinomialPointProcess(
  layer: Layer<AreaCollection>,
  sampleSize: number,
  opts: {rand?: Random} = {},
): Layer<PointCollection> {
  const rand = opts.rand ?? new Random();
  const pointsLayer = samplePointsOnAreas(layer, 'uniform', sampleSize, {
    buffer: 0,
    rand: rand,
  });
  // Remove _designWeight property
  pointsLayer.collection.forEach((feature) => {
    feature.properties = {};
  });
  pointsLayer.propertyRecord = {};
  return pointsLayer;
}
