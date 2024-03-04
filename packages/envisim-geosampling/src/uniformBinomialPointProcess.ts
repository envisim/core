import {AreaCollection, PointCollection} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {samplePointsOnAreas} from './samplePointsOnAreas.js';

/**
 * Generate points from a uniform Binomial point process
 * on areas of input AreaCollection. The points are generated
 * uniformly on a spherical model of the earth.
 *
 * @param collection
 * @param sampleSize number of points to generate.
 * @param opts an optional options object.
 * @param opts.rand an optional instance of Random.
 */
export function uniformBinomialPointProcess(
  collection: AreaCollection,
  sampleSize: number,
  opts: {rand?: Random} = {},
): PointCollection {
  const rand = opts.rand ?? new Random();
  const points = samplePointsOnAreas(collection, 'uniform', sampleSize, {
    buffer: 0,
    rand: rand,
  });
  // Remove _designWeight property
  points.forEach((feature) => {
    feature.properties = {};
  });
  return points;
}
